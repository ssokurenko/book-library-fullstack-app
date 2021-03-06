const mongoose = require('mongoose');
const Schema = mongoose.Schema();

var bookModel = new mongoose.Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  genre: {
    type: String
  },
  isRead: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Book', bookModel);
