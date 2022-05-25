import React from "react";
import { Button } from "react-bootstrap";


class DeleteButton extends React.Component {



render() {
  return (
    <>
      <Button
        type="button"
        onClick={() => this.props.deleteBook(this.props.id)}>
        Delete Book
      </Button>

    </>
  )
}

}






export default DeleteButton;
