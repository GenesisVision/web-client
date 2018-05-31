import React from "react";
import PropTypes from "prop-types";
import Tag from "./tag/tag";
import "./tag-list.css";

const TagList = ({ tags }) => {
  return (
    <div className="tag-list">{tags.map(x => <Tag key={x} tag={x} />)}</div>
  );
};

TagList.propTypes = {
  tags: PropTypes.array.isRequired
};

export default TagList;
