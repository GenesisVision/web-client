import "./pie-container.scss";

import classNames from "classnames";
import * as React from "react";

import Pie, { PIE_DIRECTION } from "./pie";

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
    className={classNames("pie-container", { "pie-container--small": small })}
  >
    <Pie
      start={0}
      end={100}
      value={value}
      color={color}
      pieDirection={pieDirection}
    />
    <div className="pie-container__value-container">
      <div className="pie-container__value">{label}</div>
    </div>
  </div>
);

const PieContainer = React.memo(_PieContainer);
export default PieContainer;
