const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let user = users.filter((user) => {
        return user.username === username;
    });
    if(user){return true};
    
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let user = users.filter ((user => {
        return (user.username === username , user.password === password);
    }));
    if(user){return true};
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  
  let user = req.body.username;
  let password = req.body.password;
  if(!user || !password){
    return res.status(404).json({ message: "Error logging in" });
  }
  if(authenticatedUser(user , password)){
    let accesstoken = jwt.sign({data:password}, "verify",{expiresIn: 60*60});
  
    req.session.authorization ={ accesstoken, user}

    return res.status(200).json({message: "User successfully logged in"});
  } else {
    return res.status(200).json({message: "User can not logged in"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let book = books[isbn];
  if(book) {
    let review = req.body.review;
    if(review){
        book.review = review;
    }
    books[isbn]= book;
    res.send(`Book with the isbn ${isbn} updated.`);
  }
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
