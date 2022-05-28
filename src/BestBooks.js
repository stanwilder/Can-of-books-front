import axios from 'axios';
import React from 'react';
import BookFormModal from './BookFormModal'
import './BestBooks.css'
import { Carousel, Button } from 'react-bootstrap';
import DeleteButton from './DeleteButton';
import UpdateButton from './UpdateButton';
import UpdateBookForm from './UpdateBookForm'
import { withAuth0 } from "@auth0/auth0-react"

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: false,
      isModalDisplaying: false,
      isFormDisplaying: false
    }
  }

  getBooks = async () => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      console.log(jwt);
      try {
        let results = await axios.get(`${process.env.REACT_APP_SERVER}/books`)
        this.setState({
          books: results.data,
          error: false,
        })
      } catch (error) {
        this.setState({
          error: true
        })
      }
    }
    }

  postBooks = async (newBook) => {
    try {
      let createdBook = await axios.post(`${process.env.REACT_APP_SERVER}/books`, newBook)
      this.setState({
        books: [...this.state.books, createdBook.data]
      })
    } catch (error) {
      console.log('An error exists:', error.response.data)
    }
  }

  deleteBook = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/books/${id}`)
      let updatedBooks = this.state.books.filter(book => book._id !== id)
      this.setState({
        books: updatedBooks,
      })
    } catch (error) {
      console.log('An error exists:', error.response.data)
    }
  }

  updateBook = async (bookToUpdate) => {
    try {
      let updatedBook = await axios.put(`${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`, bookToUpdate)
      let newBooksArray = this.state.books.map(existingBooks => {
        return existingBooks._id === bookToUpdate._id
          ? updatedBook.data
          : existingBooks
      });
      this.setState({
        books: newBooksArray
      });
    } catch (error) {
      console.log('An error occurred:', error.response.data);
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  handleButtonClick = (e) => {
    e.preventDefault();
    this.setState({
      isModalDisplaying: true
    })
  }

  closeModalHandler = () => {
    this.setState({
      isModalDisplaying: false
    });
  };

  openFormClick = (e) => {
    e.preventDefault();
    this.setState({
      isFormDisplaying: true
    })
  }

  closeFormHandler = () => {
    this.setState({
      isFormDisplaying: false
    })
  }

  render() {
    let bookItem = this.state.books.map((book, idx) => (
      <Carousel.Item key={idx}>
        <img
          className='d-block w-100 p-3'
          src='img/Books.jpeg'
          alt={book.title}
        />
        <Carousel.Caption>
          <DeleteButton
            id={book._id}
            deleteBook={this.deleteBook}
          />
          <UpdateButton
            id={book._id}
            openFormClick={this.openFormClick}
          />
          <UpdateBookForm
            id={book._id}
            title={book.title}
            description={book.description}
            recommended={book.recommended}
            isFormDisplaying={this.state.isFormDisplaying}
            updateBook={this.updateBook}
            closeFormHandler={this.closeFormHandler}
          />
          <div
            style={{ backgroundColor: 'teal', borderRadius: '5px', width: '80%', margin: 'auto', padding: '5px' }}>
            <h3>Book Title: {book.title}</h3>
            <p>{book.description}</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    ))

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>
            {bookItem}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
        <Button
          type="button"
          onClick={this.handleButtonClick}
        >
          Add Book
        </Button>
        <BookFormModal
          isModalDisplaying={this.state.isModalDisplaying}
          closeModal={this.closeModalHandler}
          postBooks={this.postBooks}
        />
      </>
    )
  }
}

export default withAuth0(BestBooks);
