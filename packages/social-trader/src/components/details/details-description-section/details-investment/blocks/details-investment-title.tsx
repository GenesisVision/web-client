import { MutedText } from "components/muted-text/muted-text";
import React from "react";

import styles from "./details-investment-block.module.scss";

const _DetailsInvestmentHeading: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return (
    <div className={styles["details-investment-heading"]}>
      <MutedText>
        <h5>{children}</h5>
      </MutedText>
    </div>
  );
};

export const DetailsInvestmentHeading = React.memo(_DetailsInvestmentHeading);
