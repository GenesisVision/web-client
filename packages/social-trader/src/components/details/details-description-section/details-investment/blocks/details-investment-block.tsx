import React from "react";

const _DetailsInvestmentBlock: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return (
    <div className="details-investment-container">
      <div className="details-investment-block details-investment-block--investment">
        {children}
      </div>
    </div>
  );
};
export const DetailsInvestmentBlock = React.memo(_DetailsInvestmentBlock);
