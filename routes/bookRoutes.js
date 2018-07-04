const express = require('express');

const routes = function(Book) {
  const router = express.Router();

  router.route('/')
    .post(function(request, response) {
      const newBook = new Book(request.body);
      newBook.save();
      response.status(201).send(newBook);
    })
    .get(function(request, response) {

      let query = {};

      if (request.query.genre) {
        query = request.query;
      }

      request.query;
      Book.find(query, function(error, books) {
        if (error) {
          response.status(500).send(error);
          return;
        }

        response.json(books);
      });
    });

  router.use(
    '/:bookId',
    function(request, response, next) {
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
    .get(function(request, response) {
      response.json(request.book);
    })
    .put(function(request, response) {
      request.book.title = request.body.title;
      request.book.author = request.body.author;
      request.book.genre = request.body.genre;
      request.book.isRead = request.body.isRead;
      request.book.save(function (error) {
        if (error) {
          response.status(500).send(error);
          return;
        }
        
        response.json(request.book);
      })
    })
    .patch(function(request, response) {
      if (request.body._id) {
        delete request.body._id;
      }

      for (let item in request.body) {
        request.book[item] = request.body[item] || request.book[item];
      }

      request.book.save(function (error) {
        if (error) {
          response.status(500).send(error);
          return;
        }

        response.json(request.book);
      });
    })
    .delete(function(request, response) {
      request.book.remove(function(error) {
        if (error) {
          response.status(500).send(error);
          return;
        }

        response.status(204).send('Removed');
      });
    });

  return router;
}

module.exports = routes;
