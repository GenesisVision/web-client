import "./regulator.scss";

import classNames from "classnames";
import React from "react";

const Regulator = ({ value, handleUp, handleDown, children }) => {
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
