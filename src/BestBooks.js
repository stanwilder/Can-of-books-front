import axios from 'axios';
import React from 'react';
import './BestBooks.css'
import { Carousel } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: false
    }
  }

  getBooks = async () => {
    try { let results = await axios.get(`${process.env.REACT_APP_SERVER}/books`)
    this.setState({
      books: results.data,
      error: false
    })

    } catch(error) {
      this.setState({
        error: true
      })

    }
  }
  componentDidMount() {
    this.getBooks();
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
      </>
    )
  }
}

export default BestBooks;
