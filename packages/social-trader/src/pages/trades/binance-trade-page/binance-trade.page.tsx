import Page from "components/page/page";
import { BinanceTradeContainer } from "pages/trades/binance-trade-page/binance-trade.container";
import React from "react";
import { useTranslation } from "react-i18next";

import "../trades.scss";

export const BinanceTrade: React.FC = () => {
  const [t] = useTranslation();
  const title = t("binance trade");

  return (
    <Page showTitle title={title}>
      <BinanceTradeContainer />
    </Page>
  );
};
