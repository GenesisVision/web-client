import * as React from "react";

import styles from "./tag-item.module.scss";

const _TagCircle: React.FC<Props> = ({ backgroundColor }) => (
  <div className={styles["tag-circle"]} style={{ backgroundColor }} />
);

interface Props {
  backgroundColor: string;
}

const TagCircle = React.memo(_TagCircle);
export default TagCircle;
