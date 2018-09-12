import PropTypes from "prop-types";
import React, { Component } from "react";

class ErrorHandler extends Component {
  state = {
    hasError: false
  };
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.info(error, info);
  }
  render() {
    return this.props.children;
  }
}

ErrorHandler.propTypes = {};

export default ErrorHandler;
