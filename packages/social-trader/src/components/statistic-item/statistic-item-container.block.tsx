import "./statistic-item.scss";

import classNames from "classnames";
import React from "react";

export const StatisticItemContainerBlock: React.FC<Props> = ({
  className,
  children,
  withPadding = true,
  half,
  small
}) => {
  return (
    <div
      className={classNames(
        "statistics-item-container",
        {
          "statistics-item-container--with-padding": withPadding,
          "statistics-item-container--half": half,
          "statistics-item-container--small": small
        },
        className
      )}
    >
      {children}
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  withPadding?: boolean;
  small?: boolean;
  half?: boolean;
  className?: string;
}
