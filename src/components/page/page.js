import * as classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import DocumentTitle from "react-document-title";
const Page = ({ className, children, title }) => {
  return (
    <DocumentTitle title={title}>
      <div className={classnames("page", className)}>{children}</div>
    </DocumentTitle>
  );
};

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string.isRequired
};

export default Page;
