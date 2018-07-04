const express = require('express');

const routes = function(Book) {
  const router = express.Router();
  const booksController = require('../controllers/booksController')(Book);
  const booksBookIdController = require('../controllers/booksBookIdController')();

  router.route('/')
    .post(booksController.post)
    .get(booksController.get);

  router.use(
    '/:bookId',
    (request, response, next) => {
      Book.findById(
        request.params.bookId,
        function(error, book) {
          if (error) {
            response.status(500).send(error);
            return;
          }

          if (book) {
            request.book = book;
            next();
          } else {
            response.status(401).send('The book is not found');
          }
        }
      );
    });

  router.route('/:bookId')
    .get(booksBookIdController.get)
    .put(booksBookIdController.put)
    .patch(booksBookIdController.patch)
    .delete(booksBookIdController.delete);

  return router;
}

module.exports = routes;
