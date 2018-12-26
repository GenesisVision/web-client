import "./icon.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export const Icon = ({
  type,
  className,
  onClick,
  primary,
  secondary,
  children,
  rotate,
  selected
}) => {
  return (
    <span
      className={classnames("icon", `icon--${type}`, className, {
        "icon--primary": primary,
        "icon--secondary": secondary,
        "icon--rotate": rotate,
        "icon--selected": selected
      })}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  rotate: PropTypes.bool,
  selected: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};
