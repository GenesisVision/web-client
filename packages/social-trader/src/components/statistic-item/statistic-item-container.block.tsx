import "./statistic-item.scss";

import classNames from "classnames";
import React from "react";

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
          "statistics-item-container--bottom-content": bottomContent,
          "statistics-item-container--with-padding": withPadding,
          "statistics-item-container--half": half
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
