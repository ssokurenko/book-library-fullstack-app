const should = require('should');
const sinon = require('sinon');

describe('Book controller tests', () => {
  describe('Post', () => {
    const MockBook = function() {
      this.save = function() {};
    }
    const booksController = require('../controllers/booksController')(MockBook);

    it('should create a new book', () => {
      const request = {
        body: {
          title: "New Book",
          genre: "Sci-fi",
          author: "John Doe"
        }
      }

      const response = {
        status: sinon.spy(),
        send: sinon.spy()
      }

      booksController.post(request, response);

      response.status.calledWith(201).should.equal(true, 'Status should be 201');
    });

    it('should not allow an emtpy title on POST', () => {
      const request = {
        body: {
          author: "John Doe"
        }
      };

      const response = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      booksController.post(request, response);

      response.status.calledWith(400).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
      response.send.calledWith('Title is required').should.equal(true);
      
    });
  }); 
});
