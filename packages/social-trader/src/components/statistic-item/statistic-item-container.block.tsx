import classNames from "classnames";
import React from "react";

import styles from "./statistic-item.module.scss";

export const StatisticItemContainerBlock: React.FC<IStatisticItemContainerBlockProps> = ({
  bottomContent,
  className,
  children,
  withPadding = true,
  half
}) => {
  return (
    <div
      className={classNames(
        {
          [styles["statistics-item-container--bottom-content"]]: bottomContent,
          [styles["statistics-item-container--with-padding"]]: withPadding,
          [styles["statistics-item-container--half"]]: half
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export interface IStatisticItemContainerBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  bottomContent?: boolean;
  withPadding?: boolean;
  half?: boolean;
  className?: string;
}
