import "./sorting-header.scss";

import classnames from "classnames";
import React from "react";

const SortingHeader = ({ isSelected, isAsc, className, onClick, children }) => {
  return (
    <div
      className={classnames("sorting-header", className, {
        "sorting-header--asc": isSelected && isAsc,
        "sorting-header--desc": isSelected && !isAsc
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default SortingHeader;
