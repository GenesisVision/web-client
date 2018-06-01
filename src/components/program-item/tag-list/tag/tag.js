import React from "react";
import PropTypes from "prop-types";
import "./tag.css";

const Tag = ({ tag }) => {
  return <div className="tag">{tag}</div>;
};

Tag.propTypes = {
  tag: PropTypes.string.isRequired
};

export default Tag;
