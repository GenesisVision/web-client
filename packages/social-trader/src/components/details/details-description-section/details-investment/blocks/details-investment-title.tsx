import "./details-investment-block.scss";

import React from "react";

const _DetailsInvestmentHeading: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return (
    <div className="details-investment-heading">
      <h5>{children}</h5>
    </div>
  );
};

export const DetailsInvestmentHeading = React.memo(_DetailsInvestmentHeading);
