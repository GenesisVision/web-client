import SvgLoader from "components/svg-loader/svg-loader";
import * as React from "react";

const LevelCalculatorPopupLoader = () => {
  return (
    <div>
      <div className="level-calculator-popup__header">
        <SvgLoader height={150} width={600}>
          <rect x="0" y="0" rx="0" ry="0" width="150" height="30" />
          <rect x="0" y="50" rx="0" ry="0" width="80" height="15" />
          <rect x="0" y="70" rx="0" ry="0" width="200" height="30" />
          <rect x="480" y="0" rx="0" ry="0" width="60" height="30" />
          <rect x="570" y="0" rx="0" ry="0" width="20" height="30" />
        </SvgLoader>
      </div>
      <div className="level-calculator-popup__controls">
        <SvgLoader height={180} width={600}>
          <rect x="0" y="0" rx="0" ry="0" width="270" height="55" />
          <rect x="0" y="95" rx="0" ry="0" width="270" height="55" />
          <rect x="320" y="0" rx="0" ry="0" width="270" height="55" />
          <rect x="320" y="95" rx="0" ry="0" width="270" height="55" />
        </SvgLoader>
      </div>
      <div className="level-calculator-popup__controls">
        <SvgLoader height={180} width={600}>
          <rect x="0" y="0" rx="0" ry="0" width="270" height="55" />
          <rect x="0" y="95" rx="0" ry="0" width="270" height="55" />
          <rect x="320" y="0" rx="0" ry="0" width="270" height="55" />
          <rect x="320" y="95" rx="0" ry="0" width="270" height="55" />
        </SvgLoader>
      </div>
      <div className="level-calculator-popup__level-progress">
        <SvgLoader height={60} width={600}>
          <rect x="0" y="0" rx="0" ry="0" width="570" height="60" />
        </SvgLoader>
      </div>
    </div>
  );
};

export default LevelCalculatorPopupLoader;
