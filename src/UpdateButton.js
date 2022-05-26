import React from "react";
import { Button } from "react-bootstrap";


class UpdateButton extends React.Component {


  render() {
    return (
      <>
        <Button
          type="button"
          onClick={this.props.openFormClick}
        >
          Update Book
        </Button>
      </>
    )
  }
}

export default UpdateButton;
