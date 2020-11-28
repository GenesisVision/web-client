import { CurrencyItemWithAmount } from "components/currency-item/currency-item-with-amount";
import { AssetDetails } from "gv-api-web";
import React from "react";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

export type CurrencySourceSelectItemsType = Array<CurrencySourceSelectItemType>;
export interface CurrencySourceSelectItemType {
  asset?: AssetDetails;
  available?: number;
  id: string;
  currency: CurrencyEnum;
  logoUrl?: string;
  title?: string;
}

export const getCurrencySourceSelectItems = (
  items: CurrencySourceSelectItemsType
): JSX.Element[] =>
  items.map(({ logoUrl, currency, title, id, available, asset }) => {
    const name = asset
      ? asset.title
      : `${title ? `${title} | ` : ""}${currency}`;
    const logo = asset ? asset.logoUrl : logoUrl;
    const availableValue =
      available !== undefined
        ? +formatCurrencyValue(+available, currency)
        : undefined;
    return (
      <option value={id} key={id}>
        <CurrencyItemWithAmount
          available={availableValue}
          symbol={currency}
          logo={logo}
          name={name}
          small
          clickable={false}
        />
      </option>
    );
  });
