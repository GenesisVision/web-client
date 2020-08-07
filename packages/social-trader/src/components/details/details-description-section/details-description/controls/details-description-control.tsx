import clsx from "clsx";
import Link, { ToType } from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

import styles from "./details-description-control.module.scss";

interface IDetailsDescriptionControlProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  className?: string;
  onClick?: VoidFunction;
  to?: ToType;
}
const DetailsDescriptionControl: React.FC<IDetailsDescriptionControlProps> = ({
  children,
  text,
  className,
  onClick,
  to
}) => {
  return (
    <Link
      className={clsx(styles["details-description-control--button"], className)}
      onClick={onClick}
      to={to}
    >
      <Row className={styles["details-description-control"]}>
        <RowItem className={styles["details-description-control__text"]}>
          {text}
        </RowItem>
        {children}
      </Row>
    </Link>
  );
};

export default DetailsDescriptionControl;
