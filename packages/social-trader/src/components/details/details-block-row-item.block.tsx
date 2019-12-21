import "./details.scss";

import * as React from "react";

export const DetailsBlockRowItem: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children }) => {
  return <div className="details__row-item">{children}</div>;
};
