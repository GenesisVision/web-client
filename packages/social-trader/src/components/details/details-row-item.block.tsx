import "./details.scss";

import * as React from "react";

export const DetailsRowItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => {
  return <div className="details__row-item">{children}</div>;
};
