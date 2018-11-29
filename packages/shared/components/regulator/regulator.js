import "./regulator.scss";

import classnames from "classnames";
import React from "react";

const Regulator = ({ value, handleUp, handleDown, children }) => {
  return (
    <div
      className={classnames("regulator", {
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
