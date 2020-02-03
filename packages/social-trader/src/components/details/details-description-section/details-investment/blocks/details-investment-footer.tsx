import "./details-investment-block.scss";

import React from "react";

const _DetailsInvestmentFooter: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return <div className="details-investment-footer">{children}</div>;
};
export const DetailsInvestmentFooter = React.memo(_DetailsInvestmentFooter);
