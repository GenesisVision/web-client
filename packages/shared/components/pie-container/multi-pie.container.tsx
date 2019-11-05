import "./pie-container.scss";

import classNames from "classnames";
import React from "react";

import Pie from "./pie";

const _MultiPieContainer: React.FC<Props> = ({ data, over }) => {
  let sum = 0;
  return (
    <div className="multi-pie-container">
      {data.map(({ value, color, name }, i) => {
        const begin = sum;
        sum += value;
        return (
          <div
            className={classNames("multi-pie-container__chart", {
              "multi-pie-container__chart--over": over === name
            })}
          >
            <Pie
              key={i}
              begin={(360 / 100) * begin}
              end={100}
              value={value}
              color={color}
              withSubstrate={false}
            />
          </div>
        );
      })}
    </div>
  );
};

interface Props {
  over?: string;
  data: any[];
}

const MultiPieContainer = React.memo(_MultiPieContainer);
export default MultiPieContainer;
