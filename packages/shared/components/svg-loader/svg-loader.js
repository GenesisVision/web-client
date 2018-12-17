import "./svg-loader.scss";

import React from "react";

const SvgLoader = ({
  id,
  width,
  height,
  children
}) => (
  <svg className="svg-loader" width={`${width}px`} height={`${height}px`} viewBox={`0 0 ${ width } ${ height }`} version="1.1">
    <defs>
      <linearGradient y1="12.7132022%" x1="72.5860102%" y2="86.5416861%" x2="72.5860102%" id="linearGradient-1">
        <stop stopColor="#FFFFFF" stopOpacity="0" offset="0"></stop>
        <stop stopColor="#FFFFFF" stopOpacity="0.5" offset="0.5"></stop>
        <stop stopColor="#FFFFFF" stopOpacity="0" offset="1"></stop>
      </linearGradient>
      <mask id={`mask-element-${ id }`}>
        <rect className="svg-loader__cube" fill="url(#linearGradient-1)" x="0" y="0" width={`${width}px`} height={`${height}px`}></rect>
      </mask>
    </defs>
    <g className="svg-loader__path">
      {children}
    </g>
    <g className="svg-loader__path-mask" mask={`url(#mask-element-${ id })`}>
      {children}
    </g>
  </svg>
);

export default SvgLoader;
