import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import authService from "services/auth-service";
import filesService from "shared/services/file-service";

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
      <Fragment>
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
      </Fragment>
    );
  }
}

UploadButton.propTypes = {
  onLoad: PropTypes.func
};

export default UploadButton;
