import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

class BookFormModal extends React.Component {


handleBookSubmit = (e) => {
  e.preventDefault();
  let newBook = {
    title: e.target.title.value,
    description: e.target.description.value,
    recommended: e.target.recommended.checked,
  }
  this.props.postBooks(newBook);
  this.props.closeModal();
}

  render() {

    return (
      <>
        <Modal
          show={this.props.isModalDisplaying}
          onHide={this.props.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleBookSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="text" id="title"/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description of Book</Form.Label>
                <Form.Control type="text" id="description"/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="recommended"
                  label="Do you recommend the book?"
                />
              </Form.Group>
              <Button 
                variant="primary" 
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default BookFormModal