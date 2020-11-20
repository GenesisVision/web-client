import { CurrencySourceSelectItemType } from "components/currency-source-select/currency-source-select-items";
import { CurrencySourceSelectElement } from "components/currency-source-select/currency-source-select.element";
import { ISelectChangeEvent } from "components/select/select";
import { ExchangeAsset } from "gv-api-web";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export interface IAccountSelectorProps {
  currentAccount?: string;
  items: ExchangeAsset[];
}

const mapExchangeAssetToCurrencySourceSelectItem = ({
  title,
  balance,
  currency,
  credentials,
  asset
}: ExchangeAsset): CurrencySourceSelectItemType => ({
  asset,
  available: balance,
  id: credentials.apiKey,
  currency,
  logoUrl: asset?.logoUrl,
  title
});

const _AccountSelector: React.FC<IAccountSelectorProps> = ({
  currentAccount,
  items
}) => {
  const [t] = useTranslation();
  const [account, setAccount] = useState(currentAccount);

  const onChange = useCallback(
    (event: ISelectChangeEvent) => {
      setAccount(event.target.value);
    },
    [setAccount]
  );

  return (
    <CurrencySourceSelectElement
      wide
      value={account}
      name={""}
      label={t("Account")}
      items={items.map(mapExchangeAssetToCurrencySourceSelectItem)}
      onChange={onChange}
    />
  );
};

export const AccountSelector = React.memo(_AccountSelector);
