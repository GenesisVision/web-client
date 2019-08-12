import "./regulator.scss";

import classNames from "classnames";
import * as React from "react";

interface IRegulatorProps {
  minValue?: number;
  value: number;
  handleUp(event: React.MouseEvent<HTMLElement>): void;
  handleDown(event: React.MouseEvent<HTMLElement>): void;
  children: JSX.Element;
}

const Regulator: React.FC<IRegulatorProps> = ({
  minValue = 0,
  value,
  handleUp,
  handleDown,
  children
}) => {
  return (
    <div
      className={classNames("regulator", {
        "regulator--mute": value === minValue
      })}
    >
      <div
        className="regulator__button regulator__button--minus"
        onClick={e => value > minValue && handleDown(e)}
      >
        &minus;
      </div>
      <div className="regulator__indicator">{children}</div>
      <div className="regulator__button" onClick={handleUp}>
        +
      </div>
    </div>
  );
};
export default Regulator;
