import React from "react";

import styles from "./filter.module.scss";

export const FilterTitle: React.FC = ({ children }) => {
  return <div className={styles["filter-title"]}>{children}</div>;
};
