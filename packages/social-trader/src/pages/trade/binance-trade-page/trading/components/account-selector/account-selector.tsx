import { CurrencySourceSelectItemType } from "components/currency-source-select/currency-source-select-items";
import { CurrencySourceSelectElement } from "components/currency-source-select/currency-source-select.element";
import { ISelectChangeEvent } from "components/select/select";
import { ExchangeAsset } from "gv-api-web";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import {
  stringifySymbolFromToParam,
  useUpdateTerminalUrlParams
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import React, { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

export interface IAccountSelectorProps {
  currentAccount?: string;
  items: ExchangeAsset[];
}

const mapExchangeAssetToCurrencySourceSelectItem = ({
  title,
  balance,
  currency,
  id,
  asset
}: ExchangeAsset): CurrencySourceSelectItemType => ({
  asset,
  available: balance,
  id,
  currency,
  logoUrl: asset?.logoUrl,
  title
});

const _AccountSelector: React.FC<IAccountSelectorProps> = ({
  currentAccount,
  items
}) => {
  const { symbol } = useContext(TerminalInfoContext);
  const { updateUrl } = useUpdateTerminalUrlParams();
  const [t] = useTranslation();
  const [account, setAccount] = useState(currentAccount);

  const onChange = useCallback(
    (event: ISelectChangeEvent) => {
      const id = event.target.value;
      setAccount(id);
      updateUrl({
        url: stringifySymbolFromToParam(symbol),
        reloadPage: true,
        updates: { id }
      });
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
