import clsx from "clsx";
import { Center } from "components/center/center";
import * as React from "react";

import styles from "./statistic-item-list.module.scss";

export const StatisticItemList: React.FC<Props &
  React.HTMLAttributes<HTMLDivElement>> = ({
  wrap = true,
  children,
  className,
  vertical
}) => (
  <Center
    wrap={wrap}
    className={clsx(styles["statistics-item-list"], className, {
      [styles["statistics-item-list--vertical"]]: vertical
    })}
  >
    {children}
  </Center>
);

interface Props {
  wrap?: boolean;
  vertical?: boolean;
  className?: string;
}
