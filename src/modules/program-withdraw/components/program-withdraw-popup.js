import PropTypes from "prop-types";
import React, { Component } from "react";

class ProgramWithdrawPopup extends Component {
  componentWillMount() {
    this.props.fetchInfo();
  }

  render() {
    return <div />;
  }
}

ProgramWithdrawPopup.propTypes = {
  fetchInfo: PropTypes.func
};

export default ProgramWithdrawPopup;
