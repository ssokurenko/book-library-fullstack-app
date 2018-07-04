const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const db = mongoose.connect(config.mongoConnection);

var Book = require('./models/bookModel');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const booksRouter = require('./routes/bookRoutes')(Book);

const port = process.env.PORT || 3000;

app.use('/api/books', booksRouter);

app.listen(port, function () {
  console.log('The Server is running on PORT: ' + port);
});
