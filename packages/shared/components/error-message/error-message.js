import "./error-message.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export const DEFAULT = "DEFAULT";
export const OVER = "OVER";
export const MESSAGE_TYPES = [OVER, DEFAULT];

const ErrorMessage = ({ error, className, type }) => {
  return (
    <div
      className={classnames("error-message", className, {
        "error-message--over": type === OVER
      })}
    >
      {error}
    </div>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(MESSAGE_TYPES)
};

export default ErrorMessage;
