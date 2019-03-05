import "./regulator.scss";

import classNames from "classnames";
import * as React from "react";

interface IRegulatorProps {
  value: number;
  handleUp(event: React.MouseEvent<HTMLElement>): void;
  handleDown(event: React.MouseEvent<HTMLElement>): void;
  children: JSX.Element;
}

const Regulator: React.FC<IRegulatorProps> = ({
  value,
  handleUp,
  handleDown,
  children
}) => {
  return (
    <div
      className={classNames("regulator", {
        "regulator--mute": value === 0
      })}
    >
      <div className="regulator__button" onClick={handleDown}>
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
