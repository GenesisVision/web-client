import { Center } from "components/center/center";
import React from "react";

const _DetailsInvestmentFooter: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return <Center className="details-investment-footer">{children}</Center>;
};
export const DetailsInvestmentFooter = React.memo(_DetailsInvestmentFooter);
