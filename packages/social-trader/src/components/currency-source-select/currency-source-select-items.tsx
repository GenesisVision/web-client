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
  items: CurrencySourceSelectItemsType,
  options?: { showName?: boolean; showSymbol?: boolean }
): JSX.Element[] =>
  items.map(({ logoUrl, currency, title, id, available, asset }) => {
    const name = asset
      ? asset.title
      : options?.showName
      ? title
      : `${title ? `${title} | ` : ""}${currency}`;
    const logo = asset?.logoUrl || logoUrl;
    const availableValue =
      available !== undefined
        ? formatCurrencyValue(+available, currency)
        : undefined;
    return (
      <option value={id} key={id}>
        <CurrencyItemWithAmount
          showSymbol={options?.showSymbol}
          showName={options?.showName}
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
