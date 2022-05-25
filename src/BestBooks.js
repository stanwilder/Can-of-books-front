import axios from 'axios';
import React from 'react';
import BookFormModal from './BookFormModal'
import './BestBooks.css'
import { Carousel, Button } from 'react-bootstrap';
import DeleteButton from './DeleteButton';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: false,
      isModalDisplaying: false,
    }
  }

  getBooks = async () => {
    try {
      let results = await axios.get(`${process.env.REACT_APP_SERVER}/books`)
      this.setState({
        books: results.data,
        error: false,
        isModalDisplaying: false
      })
    } catch (error) {
      this.setState({
        error: true
      })
    }
  }

  postBooks = async (newBook) => {
    try {
      let createdBook = await axios.post(`${process.env.REACT_APP_SERVER}/books`, newBook)
      this.setState({
        books: [...this.state.books,createdBook.data]
      })
    } catch (error) {
      console.log('An error exists:', error.response.data)
    }
  }

  deleteBook = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/books/${id}`)
      let updatedBooks = this.state.books.filter(book => book._id !== id)
      console.log(id);
      this.setState({
        books: updatedBooks,
      })
    } catch (error) {
      console.log('An error exists:', error.response.data)
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
          deleteBook={this.deleteBook}
          id={book._id}
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

export default BestBooks;
