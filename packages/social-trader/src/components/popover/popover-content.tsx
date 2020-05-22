import classNames from "classnames";
import React from "react";

import styles from "./popover-content.module.scss";

export const PopoverContent: React.FC<Props &
  React.HTMLAttributes<HTMLDivElement>> = ({
  type,
  children,
  className,
  leftAlign
}) => {
  return (
    <div
      className={classNames(styles["popover-content"], className, {
        [styles["popover-content__list--left-align"]]: leftAlign,
        [styles["popover-content__list"]]: type === "list"
      })}
    >
      {children}
    </div>
  );
};

interface Props {
  leftAlign?: boolean;
  className?: string;
  type?: "list";
}

export const PopoverContentListItem: React.FC = ({ children }) => {
  return <div className={styles["popover-content__list-item"]}>{children}</div>;
};
