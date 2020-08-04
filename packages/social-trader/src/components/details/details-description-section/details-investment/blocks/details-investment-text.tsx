import { Text } from "components/text/text";
import React from "react";

import styles from "./details-investment-block.module.scss";

const _DetailsInvestmentText: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return (
    <div className={styles["details-investment-text"]}>
      <Text muted preWrap>
        {children}
      </Text>
    </div>
  );
};

export const DetailsInvestmentText = React.memo(_DetailsInvestmentText);
