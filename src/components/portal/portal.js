import { Component } from "react";
import * as ReactDOM from "react-dom";

export default class Portal extends Component {
  componentDidMount() {
    document.addEventListener("click", this.handleClose);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClose);
  }

  handleClose = () => {
    if (typeof this.props.onClose === "function") {
      this.props.onClose();
    }
  };

  render() {
    return ReactDOM.createPortal(this.props.children, document.body);
  }
}
