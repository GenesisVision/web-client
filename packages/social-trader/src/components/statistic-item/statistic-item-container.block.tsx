import "./statistic-item.scss";

import classNames from "classnames";
import React from "react";

export const StatisticItemContainerBlock: React.FC<Props> = ({
  bottomContent,
  className,
  children,
  withPadding = true,
  half,
  small
}) => {
  return (
    <div
      className={classNames(
        {
          "statistics-item-container--bottom-content": bottomContent,
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
  bottomContent?: boolean;
  withPadding?: boolean;
  small?: boolean;
  half?: boolean;
  className?: string;
}
