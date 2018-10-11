import React, { Component } from "react";
import PropTypes from "prop-types";
import { GVButton } from "gv-react-components";

class UploadButton extends Component {
  input = React.createRef();
  handleChange = event => {
    console.info(event.target.files);
  };
  render() {
    return (
      <>
        <input
          type="file"
          ref={this.input}
          style={{ display: "none" }}
          onChange={this.handleChange}
        />
        <GVButton
          variant="outlined"
          onClick={() => {
            this.input.current.click();
          }}
        >
          Upload file
        </GVButton>
      </>
    );
  }
}

UploadButton.propTypes = {};

export default UploadButton;
