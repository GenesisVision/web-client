import { CurrencyItem } from "components/currency-item/currency-item";
import React from "react";
import { CurrencyEnum } from "utils/types";

export const getCurrencySourceSelectItems = (
  items: CurrencySourceSelectItemsType
): JSX.Element[] =>
  items.map(({ logo, currency, title, id }) => (
    <option value={id} key={id}>
      <CurrencyItem
        symbol={currency}
        logo={logo}
        name={`${title ? `${title} | ` : ""}${currency}`}
        small
        clickable={false}
      />
    </option>
  ));

export type CurrencySourceSelectItemsType = Array<CurrencySourceSelectItemType>;
export interface CurrencySourceSelectItemType {
  id: string;
  currency: CurrencyEnum;
  logo?: string;
  title?: string;
}
