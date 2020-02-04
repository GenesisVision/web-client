import "./details-row-item.block.scss";

import * as React from "react";

export const DetailsBlockRowItem: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return <div className="details-row-item">{children}</div>;
};
