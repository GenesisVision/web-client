import "./pie-container.scss";

import React from "react";
import { translate } from "react-i18next";

import Pie from "./pie";

export interface IPieContainer {
  color: string;
  value: Date | number;
}

const PieContainer: React.SFC<IPieContainer> = ({ color, value }) => {
  return (
    <div className="pie-container">
      <Pie start={0} end={100} value={value} color={color} />
      <div className="pie-container__value-container">
        <div className="pie-container__value">{value}%</div>
      </div>
    </div>
  );
};

export default translate()(PieContainer);
