const booksController = function (Book) {
  const _post = (request, response) => {
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

  const _get = (request, response) => {

    let query = {};

    if (request.query.genre) {
      query = request.query;
    }

    request.query;
    Book.find(query, (error, books) => {
      if (error) {
        response.status(500).send(error);
        return;
      }

      const extendedBooks = [];

      books.forEach(book => {
        let theBook = book.toJSON();
        theBook.links={};
        theBook.links.self = '//' + request.headers.host + '/api/books/' + theBook._id;
        extendedBooks.push(theBook);
      })

      response.json(extendedBooks);
    });
  };

  return {
    post: _post,
    get: _get
  }
};

module.exports = booksController;
