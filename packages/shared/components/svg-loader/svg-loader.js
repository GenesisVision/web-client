import "./svg-loader.scss";

import React from "react";
import uuid from "uuid";

const SvgLoader = ({ width, height, children }) => {
  const id = uuid.v4();
  return (
    <svg
      className="svg-loader"
      width={`${width}px`}
      height={`${height}px`}
      viewBox={`0 0 ${width} ${height}`}
      version="1.1"
    >
      <defs>
        <linearGradient
          y1="12.7132022%"
          x1="72.5860102%"
          y2="86.5416861%"
          x2="72.5860102%"
          id="linearGradient"
        >
          <stop stopColor="#FFFFFF" stopOpacity="0" offset="0" />
          <stop stopColor="#FFFFFF" stopOpacity="0.3" offset="0.5" />
          <stop stopColor="#FFFFFF" stopOpacity="0" offset="1" />
        </linearGradient>
        <mask id={id}>
          <rect
            className="svg-loader__cube"
            fill="url(#linearGradient)"
            x="0"
            y="0"
            width={`${width}px`}
            height={`${height}px`}
          />
        </mask>
      </defs>
      <g className="svg-loader__path">{children}</g>
      <g className="svg-loader__path-mask" mask={`url(#${id})`}>
        {children}
      </g>
    </svg>
  );
};

export default SvgLoader;
