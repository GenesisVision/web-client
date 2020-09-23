import React from "react";

import styles from "./mono-text.module.scss";

export const MonoText: React.FC = ({ children }) => {
  return <span className={styles["mono-text"]}>{children}</span>;
};
