import React from "react";

import styles from "./details-statistics.module.scss";

export const DetailsStatisticColumn: React.FC = ({ children }) => {
  return <div className={styles["details-statistics__column"]}>{children}</div>;
};
