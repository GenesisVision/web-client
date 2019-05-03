import "./fund-assets-ratio.scss";

import classNames from "classnames";
import { FundAssetPartWithIcon } from "gv-api-web";
import * as React from "react";

export const calcPercent = (
  value: number,
  start: number = 0,
  end: number = 100
): number => {
  let duration = end - start;
  let progress = value - start;
  if (duration === 0 || progress < 0) return 0;
  if (progress > duration) return 100;
  return (progress * 100) / duration;
};

const _FundAssetRatio: React.FC<Props> = ({
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
        className={classNames(
          "fund-asset-ratio fund-asset-ratio--line",
          className
        )}
      >
        {values.map((item: FundAssetPartWithIcon, idx: number) => {
          newLevel += item.percent;
          ZIndex--;
          return (
            <div
              key={idx}
              className={classNames("fund-asset-ratio--item-line")}
              onMouseOver={handleHover(item.asset)}
              onMouseLeave={handleLeave}
              style={{
                width: `${calcPercent(newLevel)}%`,
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
          className={classNames("fund-asset-ratio__value", {
            "fund-asset-ratio__value--full":
              values.reduce(
                (sum: number, item: FundAssetPartWithIcon): number =>
                  sum + item.percent,
                0
              ) === 100
          })}
        >
          100%
        </div>
      </div>
    </div>
  );
};

export interface Props {
  className?: string;
  valueClassName?: string;
  values: FundAssetPartWithIcon[];
  handleHover(
    asset: string
  ): (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleLeave(): void;
}

const FundAssetRatio = React.memo(_FundAssetRatio);
export default FundAssetRatio;
