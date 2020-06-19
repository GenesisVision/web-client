import classNames from "classnames";
import * as React from "react";

import Pie, { PIE_DIRECTION } from "./pie";
import styles from "./pie-container.module.scss";

export interface IPieContainer {
  small?: boolean;
  color: string;
  label: string;
  value: Date | number;
  pieDirection?: PIE_DIRECTION;
  className?: string;
}

const _PieContainer: React.FC<IPieContainer> = ({
  small,
  label,
  color,
  value,
  pieDirection
}) => (
  <div
    className={classNames(styles["pie-container"], {
      [styles["pie-container--small"]]: small
    })}
  >
    <Pie
      start={0}
      end={100}
      value={value}
      color={color}
      pieDirection={pieDirection}
    />
    <div className={styles["pie-container__value-container"]}>{label}</div>
  </div>
);

const PieContainer = React.memo(_PieContainer);
export default PieContainer;
