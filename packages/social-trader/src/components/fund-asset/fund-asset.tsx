import classNames from "classnames";
import { CurrencyItem } from "components/currency-item/currency-item";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Currency, FundAssetInfo } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";

import styles from "./fund-asset.module.scss";

export enum FUND_ASSET_TYPE {
  LARGE = "large",
  MIDDLE = "middle",
  SHORT = "short",
  TEXT = "text"
}

const _FundAsset: React.FC<Props> = ({
  bottomOffset = true,
  url,
  current: percent,
  target: mandatoryFundPercent,
  currency,
  type,
  last,
  removable,
  removeHandle,
  logoUrl,
  className,
  asset: name,
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
      ? styles["fund-asset__currency-full"]
      : type !== FUND_ASSET_TYPE.SHORT
      ? styles["fund-asset__currency-short"]
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
        <RowItem small bottomOffset={bottomOffset}>
          <Row
            {...other}
            className={classNames(
              styles["fund-asset"],
              styles["fund-asset--default"],
              className,
              {
                [styles["fund-asset--large"]]: type === FUND_ASSET_TYPE.LARGE
              }
            )}
          >
            <RowItem small>
              <CurrencyItem
                url={url}
                logo={logoUrl}
                small
                name={!!currency && currencyName}
                symbol={currency}
                className={classNames(
                  styles["fund-asset__currency"],
                  currencyClassName
                )}
              />
            </RowItem>
            {percent !== undefined && (
              <NumberFormat value={percent} suffix="%" displayType="text" />
            )}
            {percent > mandatoryFundPercent && removable && removeHandle && (
              <div
                className={styles["fund-asset__remove-button"]}
                onClick={removeHandle(currency)}
              >
                +
              </div>
            )}
          </Row>
        </RowItem>
      );
  }
};

interface Props extends FundAssetInfo {
  bottomOffset?: boolean;
  currency: Currency;
  type: FUND_ASSET_TYPE;
  last: boolean;
  removable?: boolean;
  removeHandle?: (
    currency: Currency
  ) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

const FundAsset = React.memo(_FundAsset);
export default FundAsset;
