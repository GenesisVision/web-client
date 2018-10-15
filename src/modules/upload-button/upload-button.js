import React, { Component } from "react";
import PropTypes from "prop-types";
import { GVButton } from "gv-react-components";
import filesService from "shared/services/file-service";
import authService from "services/auth-service";

class UploadButton extends Component {
  input = React.createRef();
  state = {
    isPending: false
  };
  handleChange = event => {
    const file = event.target.files[0];
    this.setState({ isPending: true });
    filesService.uploadFile(file, authService.getAuthArg()).then(id => {
      this.setState({ isPending: false });
      this.handleLoad(id, file);
    });
  };
  handleLoad = (id, file) => {
    const f = { name: file.name, size: file.size, id };
    if (this.props.onLoad) {
      this.props.onLoad(f);
    }
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

UploadButton.propTypes = {
  onLoad: PropTypes.func
};

export default UploadButton;
