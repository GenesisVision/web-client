import "rc-slider/assets/index.css";

import { Range } from "rc-slider";
import React from "react";

const LevelFilter = ({ value }) => {
  const onChange = e => {
    var t = e;
  };
  return (
    <div style={{ width: "200px", height: "50px", margin: "0 25px" }}>
      <Range
        dots
        min={1}
        max={7}
        marks={new Array(7).fill(0).reduce((prev, curr, idx) => {
          prev[idx + 1] = idx + 1;
          return prev;
        }, {})}
        value={value}
        onChange={onChange}
        pushable
      />
    </div>
  );
};

export default LevelFilter;
