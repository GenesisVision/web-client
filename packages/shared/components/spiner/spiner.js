import "./spinner.scss";

import PropTypes from "prop-types";
import React from "react";

const Spinner = ({ isShown }) =>
  isShown ? (
    <div className="gv-spinner__wrapper">
      <div className="gv-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  ) : null;

Spinner.propTypes = {
  isShown: PropTypes.bool
};

export default Spinner;
