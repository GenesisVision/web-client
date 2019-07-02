import "./pie-container.scss";

import * as React from "react";

import Pie, { PIE_DIRECTION } from "./pie";

export interface IPieContainer {
  color: string;
  label: string;
  value: Date | number;
  pieDirection?: PIE_DIRECTION;
  className?: string;
}

const _PieContainer: React.FC<IPieContainer> = ({
  label,
  color,
  value,
  pieDirection
}) => (
  <div className="pie-container">
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
