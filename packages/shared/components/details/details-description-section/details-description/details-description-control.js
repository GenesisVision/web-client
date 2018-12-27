import "./details-description-control.scss";

import classnames from "classnames";
import React from "react";

const DetailsDescriptionControl = ({
  t,
  children,
  text,
  tag: Tag,
  className,
  onClick,
  to
}) => {
  return (
    <Tag
      className={classnames("details-description-control", className)}
      onClick={onClick}
      to={to}
    >
      <div className="details-description-control__text">{text}</div>
      {children}
    </Tag>
  );
};

export default DetailsDescriptionControl;
