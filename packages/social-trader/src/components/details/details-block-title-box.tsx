import React from "react";

import styles from "./details-block-title-box.module.scss";

const DetailsBlockTitleBox: React.FC<Props> = ({ children }) => {
  return <div className={styles["details-block-title-box"]}>{children}</div>;
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default DetailsBlockTitleBox;
