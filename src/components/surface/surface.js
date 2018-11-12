import "./surface.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Surface = ({ className, children }) => {
  return <div className={classnames("surface", className)}>{children}</div>;
};

Surface.propTypes = {
  className: PropTypes.string
};

export default Surface;
