import {
  FundAssetCurrencyItem,
  FundAssetRemoveButton,
  FundAssetRow
} from "components/fund-asset/fund-asset.styles";
import { FundAssetViewType } from "components/fund-asset/fund-asset.types";
import { RowItem } from "components/row-item/row-item";
import { Currency, FundAssetInfo } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";

interface Props extends FundAssetInfo {
  name?: string;
  bottomOffset?: boolean;
  currency: Currency;
  type: FundAssetViewType;
  last: boolean;
  removable?: boolean;
  lightTheme?: boolean;
  removeHandle?: (
    currency: Currency
  ) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
  lightTheme,
  asset,
  name,
  ...other
}) => {
  const currencyName =
    type === "large" ? name || asset : type !== "short" ? currency : "";

  switch (type) {
    case "text":
      return (
        <div {...other}>
          {currency}
          {!last && <span>,&nbsp;</span>}
        </div>
      );
    default:
      return (
        <RowItem size={"small"} bottomOffset={bottomOffset}>
          <FundAssetRow {...other} lightTheme={lightTheme}>
            <RowItem size={"small"}>
              <FundAssetCurrencyItem
                url={url}
                logo={logoUrl}
                small
                name={!!currency && currencyName}
                symbol={currency}
                type={type}
                showTitle={false}
              />
            </RowItem>
            {percent !== undefined && (
              <NumberFormat value={percent} suffix="%" displayType="text" />
            )}
            {percent > mandatoryFundPercent && removable && removeHandle && (
              <FundAssetRemoveButton onClick={removeHandle(currency)}>
                +
              </FundAssetRemoveButton>
            )}
          </FundAssetRow>
        </RowItem>
      );
  }
};

const FundAsset = React.memo(_FundAsset);
export default FundAsset;
