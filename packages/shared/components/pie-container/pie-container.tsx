import "./pie-container.scss";

import * as React from "react";
import { translate } from "react-i18next";

import Pie, { PIE_DIRECTION } from "./pie";

export interface IPieContainer {
  color: string;
  value: Date | number;
  pieDirection?: PIE_DIRECTION;
}

const _PieContainer: React.FC<IPieContainer> = ({
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
      <div className="pie-container__value">{value}%</div>
    </div>
  </div>
);

const PieContainer = React.memo(translate()(_PieContainer));
export default PieContainer;
