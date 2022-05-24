import axios from 'axios';
import React from 'react';
import { Carousel } from 'react-bootstrap';
// import Carousel from 'react-bootstrap/Carousel';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks = async () => {
    try { let results = await axios.get(`${process.env.REACT_APP_SERVER}/books`)
    this.setState({
      books: results.data,
    })

    } catch(error) {
      /* TODO: Make a GET request to your API to fetch all the books from the database  */

    }
  }
  componentDidMount() {
    this.getBooks();
  }

  render() {
    let bookItem = this.state.books.map((book, idx) => (
      <Carousel.Item key={idx}>
        <img
        className='d-block w-100'
        src='img/Books.jpeg'
        alt={book.title}/>
      </Carousel.Item>
    ))

    /* TODO: render all the books in a Carousel */

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
