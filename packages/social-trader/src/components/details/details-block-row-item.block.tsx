import * as React from "react";

import styles from "./details-row-item.block.module.scss";

export const DetailsBlockRowItem: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return <div className={styles["details-row-item"]}>{children}</div>;
};
