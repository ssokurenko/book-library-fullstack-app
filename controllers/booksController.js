const booksController = function (Book) {
  const _post = function(request, response) {
    const newBook = new Book(request.body);

    if (!request.body.title) {
      response.status(400);
      response.send('Title is required');
      return;
    }

    newBook.save();
    response.status(201);
    response.send(newBook);
  }

  const _get = function(request, response) {

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
  };

  return {
    post: _post,
    get: _get
  }
};

module.exports = booksController;
