import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

class UpdateBookForm extends React.Component {


  handleUpdateBookSubmit = (e) => {
    e.preventDefault();
    let bookToUpdate = {
      title: e.target.title.value || this.props.title,
      description: e.target.description.value || this.props.description,
      recommended: e.target.recommended.checked || this.props.recommended,
      _id: this.props.id,
    }
    this.props.updateBook(bookToUpdate)
    this.props.closeFormHandler();
  }


  render() {

    return (
      <>
        <Modal
        show={this.props.isFormDisplaying}
        onHide={this.props.closeFormHandler}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={this.handleUpdateBookSubmit}
            >
              <Form.Group className="mb-3">
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  type="text"
                  id="title"
                  placeholder={this.props.title}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description of Book</Form.Label>
                <Form.Control
                  type="text"
                  id="description"
                  placeholder={this.props.description}
                />
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
                Save Book Updates
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closeFormHandler}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default UpdateBookForm