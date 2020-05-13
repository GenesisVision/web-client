import { Row } from "components/row/row";
import React from "react";

import styles from "./header.module.scss";

const HeaderIcon: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => <Row className={styles["header__icon"]}>{children}</Row>;

export default HeaderIcon;
