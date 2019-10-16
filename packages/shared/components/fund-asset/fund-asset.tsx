import "./fund-asset.scss";

import classNames from "classnames";
import * as React from "react";
import NumberFormat from "react-number-format";
import { CurrencyItem } from "shared/components/currency-item/currency-item";
import { CurrencyEnum, PlatformAssetFull } from "shared/utils/types";

const _FundAsset: React.FC<Props> = ({
  mandatoryFundPercent,
  name,
  percent,
  currency,
  type,
  last,
  removable,
  removeHandle,
  icon,
  className,
  ...other
}) => {
  const currencyName =
    type === FUND_ASSET_TYPE.LARGE
      ? name
      : type !== FUND_ASSET_TYPE.SHORT
      ? currency
      : "";
  const currencyClassName =
    type === FUND_ASSET_TYPE.LARGE
      ? "fund-asset__currency-full"
      : type !== FUND_ASSET_TYPE.SHORT
      ? "fund-asset__currency-short"
      : "";
  switch (type) {
    case FUND_ASSET_TYPE.TEXT:
      return (
        <div {...other}>
          {currency}
          {!last && <span>,&nbsp;</span>}
        </div>
      );
    default:
      return (
        <div
          {...other}
          className={classNames(
            "fund-asset",
            "fund-asset--default",
            className,
            {
              "fund-asset--large": type === FUND_ASSET_TYPE.LARGE
            }
          )}
        >
          <CurrencyItem
            logo={icon}
            small
            name={!!currency && currencyName}
            className={classNames("fund-asset__currency", currencyClassName)}
          />
          <div className="fund-asset__percent">
            <NumberFormat value={percent} suffix="%" displayType="text" />
          </div>
          {percent > mandatoryFundPercent && removable && removeHandle && (
            <div
              className="fund-asset__remove-button"
              onClick={removeHandle(currency)}
            >
              +
            </div>
          )}
        </div>
      );
  }
};

export enum FUND_ASSET_TYPE {
  LARGE = "large",
  MIDDLE = "middle",
  SHORT = "short",
  TEXT = "text"
}

interface Props extends PlatformAssetFull {
  currency: CurrencyEnum;
  type: FUND_ASSET_TYPE;
  last: boolean;
  removable?: boolean;
  removeHandle?(
    currency: CurrencyEnum
  ): (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

const FundAsset = React.memo(_FundAsset);
export default FundAsset;
