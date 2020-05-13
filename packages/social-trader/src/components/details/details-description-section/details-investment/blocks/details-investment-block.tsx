import React from "react";

import styles from "./details-investment-block.module.scss";

const _DetailsInvestmentBlock: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return (
    <div className={styles["details-investment-container"]}>
      <div
        className={
          styles[
            "details-investment-block details-investment-block--investment"
          ]
        }
      >
        {children}
      </div>
    </div>
  );
};
export const DetailsInvestmentBlock = React.memo(_DetailsInvestmentBlock);
