import "./pie-container.scss";

import classNames from "classnames";
import React, { useCallback } from "react";

import { MultiPie } from "./pie";

const _MultiPieContainer: React.FC<Props> = ({ data, over, setOverItem }) => {
  const handleOver = useCallback(
    name => () => {
      setOverItem && setOverItem(name);
    },
    []
  );
  const handleLeave = useCallback(() => {
    setOverItem && setOverItem(undefined);
  }, []);
  let sum = 0;
  const dataWithBegin = data.map(item => {
    const begin = (360 / 100) * sum;
    sum += item.value;
    return { ...item, begin, end: 100 };
  });
  return (
    <div className="multi-pie-container">
      <div className={classNames("multi-pie-container__chart")}>
        <MultiPie
          over={over}
          circles={dataWithBegin}
          onMouseOver={handleOver}
          onMouseLeave={handleLeave}
          withSubstrate={false}
        />
      </div>
    </div>
  );
};

interface Props {
  setOverItem?: (name?: string) => void;
  over?: string;
  data: any[];
}

const MultiPieContainer = React.memo(_MultiPieContainer);
export default MultiPieContainer;
