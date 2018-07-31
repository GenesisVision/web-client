import "./form.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Form = ({ className, children, ...props }) => {
  return (
    <form className={classnames("form", className)} {...props}>
      {children}
    </form>
  );
};

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired
};

export default Form;
