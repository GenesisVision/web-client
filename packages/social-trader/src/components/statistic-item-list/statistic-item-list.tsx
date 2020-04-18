import classNames from "classnames";
import { Center } from "components/center/center";
import * as React from "react";

import "./statistic-item-list.scss";

export const StatisticItemList: React.FC<Props &
  React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  vertical
}) => (
  <Center
    wrap
    className={classNames("statistics-item-list", className, {
      "statistics-item-list--vertical": vertical
    })}
  >
    {children}
  </Center>
);

interface Props {
  vertical?: boolean;
  className?: string;
}
