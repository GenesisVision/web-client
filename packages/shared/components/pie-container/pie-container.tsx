import "./pie-container.scss";

import React from "react";
import { translate } from "react-i18next";

import Pie, { PIE_DIRECTION } from "./pie";

export interface IPieContainer {
  color: string;
  value: Date | number;
  pieDirection?: PIE_DIRECTION;
}

const PieContainer: React.SFC<IPieContainer> = ({
  color,
  value,
  pieDirection
}) => {
  return (
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
};

export default translate()(PieContainer);
