const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  let user = req.body.username;
  let password = req.body.password;
  if(user && password){
    if((user)){
        users.push({"username": user, "password": password});
        return res.status(201).json({message: "User created Successfully"});
    } else {
        return res.status(404).json({message: "User already exist"});
    }
  }

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const booksByAuthor = Object.values(books).filter(book => 
        book.author.toLowerCase() === author.toLowerCase()
    );
    if (booksByAuthor.length > 0) {
        // Send the array of matching books
        return res.status(200).json(booksByAuthor);
    } else {
        // No books found with that title
        return res.status(404).json({message: "No books found with that title."});
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const booksByTitle = Object.values(books).filter(book => 
        book.title.toLowerCase() === title.toLowerCase()
    );
    if (booksByTitle.length > 0) {
        // Send the array of matching books
        return res.status(200).json(booksByTitle);
    } else {
        // No books found with that title
        return res.status(404).json({message: "No books found with that title."});
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
});

module.exports.general = public_users;
