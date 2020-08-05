import { Center } from "components/center/center";
import React from "react";

import styles from "./details-investment-block.module.scss";

const _DetailsInvestmentFooter: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return (
    <Center className={styles["details-investment-footer"]}>{children}</Center>
  );
};

export const DetailsInvestmentFooter = React.memo(_DetailsInvestmentFooter);
