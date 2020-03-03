import { CurrencyItemWithAmount } from "components/currency-item/currency-item-with-amount";
import React from "react";
import { CurrencyEnum } from "utils/types";

export const getCurrencySourceSelectItems = (
  items: CurrencySourceSelectItemsType
): JSX.Element[] =>
  items.map(({ logo, currency, title, id, available }) => (
    <option value={id} key={id}>
      <CurrencyItemWithAmount
        available={available}
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
  available?: number;
  id: string;
  currency: CurrencyEnum;
  logo?: string;
  title?: string;
}
