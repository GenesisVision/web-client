import PropTypes from "prop-types";
import React from "react";
import DocumentTitle from "react-document-title";
import { translate } from "react-i18next";

const Page = ({ t, title, children }) => {
  return (
    <DocumentTitle title={t("app.title") + title}>{children}</DocumentTitle>
  );
};

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string.isRequired
};

export default translate()(Page);
