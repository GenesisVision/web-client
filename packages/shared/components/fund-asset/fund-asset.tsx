import "./fund-asset.scss";

import classNames from "classnames";
import { FundAssetPartWithIcon } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import FundAssetImage from "shared/components/avatar/fund-asset-image/fund-asset-image";
import {
  CURRENCIES,
  CURRENCY_VALUES
} from "shared/modules/currency-select/currency-select.constants";

export const FUND_ASSET_TYPE_old = {
  large: "large",
  middle: "middle",
  short: "short",
  text: "text"
};

export enum FUND_ASSET_TYPE {
  LARGE = "large",
  MIDDLE = "middle",
  SHORT = "short",
  TEXT = "text"
}

interface IFundAssetProps {
  currency: CURRENCIES;
  type: FUND_ASSET_TYPE;
  last: boolean;
  removable?: boolean;
  removeHandle?(
    currency: CURRENCIES
  ): (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

class FundAsset extends React.Component<
  IFundAssetProps & FundAssetPartWithIcon
> {
  render() {
    const {
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
    } = this.props;
    return (
      (type === FUND_ASSET_TYPE.TEXT && (
        <div {...other}>
          {currency}
          &nbsp;
          <NumberFormat value={percent} suffix="%" displayType="text" />
          {!last && <span>,&nbsp;</span>}
        </div>
      )) || (
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
          <FundAssetImage url={icon} alt={currency} />

          {currency && (
            <div className="fund-asset__currencies">
              {type === FUND_ASSET_TYPE.LARGE && (
                <div className="fund-asset__currency-full">
                  {name || CURRENCY_VALUES[currency]}
                </div>
              )}
              {type !== FUND_ASSET_TYPE.SHORT && (
                <div className="fund-asset__currency-short">{currency}</div>
              )}
            </div>
          )}
          <div className="fund-asset__percent">
            <NumberFormat value={percent} suffix="%" displayType="text" />
          </div>
          {removable && removeHandle && (
            <div
              className="fund-asset__remove-button"
              onClick={removeHandle(currency)}
            >
              +
            </div>
          )}
        </div>
      )
    );
  }
}

export default FundAsset;
