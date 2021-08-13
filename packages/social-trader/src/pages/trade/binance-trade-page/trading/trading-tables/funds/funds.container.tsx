import { useAccountCurrency } from "hooks/account-currency.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import {
  NormalizedFunds,
  normalizeFundsList,
  sortFundsFunc,
  updateUsdValues
} from "pages/trade/binance-trade-page/trading/trading-tables/funds/funds.helpers";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { Funds } from "./funds";

export const FundsContainer: React.FC = () => {
  const currency = useAccountCurrency();
  const { accountInfo } = useContext(TerminalInfoContext);

  const [list, setList] = useState<NormalizedFunds>({});

  useEffect(() => {
    if (!accountInfo) return;
    const list = normalizeFundsList(accountInfo.balances);
    updateUsdValues(list, currency).then(data => {
      setList(data);
    });
  }, [accountInfo]);

  const items = useMemo(
    () =>
      Object.values(list)
        .sort(sortFundsFunc)
        .filter(({ free, locked }) => free - locked !== 0),
    [list]
  );

  return <Funds items={items} />;
};
