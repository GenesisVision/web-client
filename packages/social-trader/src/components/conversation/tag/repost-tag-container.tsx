import styles from "components/conversation/tag/tag-components.module.scss";
import React from "react";

export const RepostTagContainer: React.FC = ({ children }) => {
  return <div className={styles["repost-tag-container"]}>{children}</div>;
};
