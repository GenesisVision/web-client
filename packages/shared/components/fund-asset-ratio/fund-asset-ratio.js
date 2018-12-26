import "./fund-assets-ratio.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export interface GVProgramPeriodProps {
  start: Date | number;
  end: Date | number;
  className?: string;
  valueClassName?: string;
}

export const calcPercent = (value: number, start: number, end: number) => {
  let duration = end - start;
  let progress = value - start;
  if (duration === 0 || progress < 0) return 0;
  if (progress > duration) return 100;
  return (progress * 100) / duration;
};

const FundAssetRatio: React.SFC<GVProgramPeriodProps> = ({
  start,
  end,
  values,
  className,
  valueClassName,
  handleHover,
  handleLeave
}) => {
  let ZIndex = values.length;
  let newLevel = 0;
  return (
    <div className="fund-asset-ratio-container">
      <div
        className={classnames(
          "fund-asset-ratio fund-asset-ratio--line",
          className
        )}
      >
        {values.map((item, idx) => {
          newLevel += item.percent;
          ZIndex--;
          return (
            <div
              key={idx}
              className={classnames(
                "fund-asset-ratio--item-line",
                valueClassName
              )}
              onMouseOver={handleHover(item.asset)}
              onMouseLeave={handleLeave}
              style={{
                width: `${calcPercent(newLevel, start, end)}%`,
                background: item.color,
                zIndex: ZIndex
              }}
            />
          );
        })}
      </div>
      <div className="fund-asset-ratio__values">
        <div className="fund-asset-ratio__value">0%</div>
        <div
          className={classnames("fund-asset-ratio__value", {
            "fund-asset-ratio__value--full":
              values.reduce((sum, item) => sum + item.percent, 0) === 100
          })}
        >
          100%
        </div>
      </div>
    </div>
  );
};

FundAssetRatio.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  className: PropTypes.string,
  valueClassName: PropTypes.string
};

export default FundAssetRatio;
