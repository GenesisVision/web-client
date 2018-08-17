import "./tag.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Tag = ({ type, children, round }) => {
  return (
    <span
      className={classnames("tag", {
        [`tag--${type}`]: type,
        "tag--round": round
      })}
    >
      {children}
    </span>
  );
};

Tag.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.node
  ]),
  round: PropTypes.bool,
  type: PropTypes.oneOf(["success", "danger", "warning"])
};

export default Tag;
