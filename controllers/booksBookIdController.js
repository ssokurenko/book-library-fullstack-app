const booksBookIdController = function () {
  const _get = function(request, response) {
    response.json(request.book);
  }

  const _put = function(request, response) {
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
  };

  const _patch = function(request, response) {
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
  };

  const _delete = function (request, response) {
    request.book.remove(function(error) {
      if (error) {
        response.status(500).send(error);
        return;
      }

      response.status(204).send('Removed');
    });
  };

  return {
    get: _get,
    put: _put,
    patch: _patch,
    delete: _delete
  }
}

module.exports = booksBookIdController;
