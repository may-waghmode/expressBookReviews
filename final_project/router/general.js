const express = require('express');
const public_users = express.Router();
const books = require('./booksdb.js');

public_users.get('/', async (req, res) => {
  try {
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve books' });
  }
});

public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    const book = books[req.params.isbn];
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve book' });
  }
});

public_users.get('/author/:author', async (req, res) => {
  try {
    const author = req.params.author.toLowerCase();
    const results = Object.values(books).filter(
      book => book.author.toLowerCase() === author
    );
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Unable to search by author' });
  }
});

public_users.get('/title/:title', async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();
    const results = Object.values(books).filter(
      book => book.title.toLowerCase().includes(title)
    );
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Unable to search by title' });
  }
});

public_users.get('/review/:isbn', async (req, res) => {
  try {
    const book = books[req.params.isbn];
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book.reviews || {});
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve reviews' });
  }
});

module.exports = public_users;