import { DefaultBlock } from "components/default.block/default.block";
import { SIZES } from "constants/constants";
import React from "react";

import styles from "./chart.module.scss";

export const ChartBlock: React.FC = () => {
  return (
    <DefaultBlock
      size={SIZES.SMALL}
      roundedBorder={false}
      bordered
      className={styles["chart"]}
    >
      Chart
    </DefaultBlock>
  );
};
