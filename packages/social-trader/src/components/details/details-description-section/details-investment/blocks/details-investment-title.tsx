import { Text } from "components/text/text";
import React from "react";

import styles from "./details-investment-block.module.scss";

const _DetailsInvestmentHeading: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return (
    <div className={styles["details-investment-heading"]}>
      <Text muted>
        <h5>{children}</h5>
      </Text>
    </div>
  );
};

export const DetailsInvestmentHeading = React.memo(_DetailsInvestmentHeading);
