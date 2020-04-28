import { DefaultBlock } from "components/default.block/default.block";
import React from "react";

import styles from "./chart.module.scss";

export const ChartBlock: React.FC = () => {
  return (
    <DefaultBlock roundedBorder={false} bordered className={styles["chart"]}>
      Chart
    </DefaultBlock>
  );
};
