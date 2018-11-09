import "./input.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Input = ({ className, ...props }) => {
  return <input className={classnames("input", className)} {...props} />;
};

Input.propTypes = {
  className: PropTypes.string
};

export default Input;
