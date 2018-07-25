import * as classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Page = ({ className, children }) => {
  return <div className={classnames("page", className)}>{children}</div>;
};

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default Page;
