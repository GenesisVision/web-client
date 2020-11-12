import { Center } from "components/center/center";
import { DoubleButton } from "components/double-button/double-button";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { WalletIcon } from "components/icon/wallet-icon";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { useAlerts } from "hooks/alert.hook";
import useApiRequest from "hooks/api-request.hook";
import useTab from "hooks/tab.hook";
import { TerminalDefaultBlock } from "pages/trade/binance-trade-page/trading/components/terminal-default-block/terminal-default-block";
import { StopLimitTradeForm } from "pages/trade/binance-trade-page/trading/place-order/stop-limit-trade-form";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/terminal-methods.context";
import { getSymbol } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  OrderSide,
  OrderType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { TradingPriceContext } from "pages/trade/binance-trade-page/trading/trading-price.context";
import React, { useCallback, useContext, useState } from "react";

import { LimitTradeForm } from "./limit-trade-form";
import { MarketTradeForm } from "./market-trade-form";
import {
  generateMessage,
  getBalance,
  getBalancesLoaderData,
  IPlaceOrderFormValues,
  TRADE_FORM_FIELDS
} from "./place-order.helpers";
import styles from "./place-order.module.scss";

const _PlaceOrder: React.FC = () => {
  const { successAlert } = useAlerts();
  const { tradeRequest } = useContext(TerminalMethodsContext);
  const { price } = useContext(TradingPriceContext);

  const {
    terminalType,
    exchangeAccountId,
    exchangeInfo,
    accountInfo,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);

  const [side, setSide] = useState<OrderSide>("Buy");
  const { tab, setTab } = useTab<OrderType>("Limit");

  const { sendRequest, status } = useApiRequest({
    request: tradeRequest
  });

  const handleSubmit = useCallback(
    (values: IPlaceOrderFormValues) => {
      return sendRequest({
        ...values,
        accountId: exchangeAccountId,
        side,
        type: tab,
        symbol: getSymbol(baseAsset, quoteAsset)
      }).then(() => {
        const message = generateMessage({
          quantity: values[TRADE_FORM_FIELDS.quantity],
          side,
          type: tab,
          symbol: getSymbol(baseAsset, quoteAsset)
        });
        successAlert(message);
      });
    },
    [
      exchangeAccountId,
      sendRequest,
      tradeRequest,
      baseAsset,
      quoteAsset,
      side,
      tab
    ]
  );

  const walletAsset =
    side === "Buy" || terminalType === "futures" ? quoteAsset : baseAsset;
  const balance = accountInfo
    ? getBalance(accountInfo.balances, walletAsset)
    : 0;
  const balances = accountInfo
    ? accountInfo.balances
    : getBalancesLoaderData(quoteAsset);

  return (
    <TerminalDefaultBlock>
      <Row>
        <DoubleButton
          size={"small"}
          first={{
            selected: side === "Buy",
            enable: side !== "Buy",
            handleClick: () => setSide("Buy"),
            label: "BUY"
          }}
          second={{
            color: "danger",
            selected: side === "Sell",
            enable: side !== "Sell",
            handleClick: () => setSide("Sell"),
            label: "SELL"
          }}
        />
      </Row>
      <Row>
        <GVTabs value={tab} onChange={setTab}>
          <GVTab value={"Limit"} label={"LIMIT"} />
          <GVTab value={"Market"} label={"MARKET"} />
          <GVTab value={"TakeProfitLimit"} label={"STOP LIMIT"} />
        </GVTabs>
      </Row>
      <Row>
        <RowItem size={"small"}>
          <Center className={styles["place-order__wallet-icon"]}>
            <WalletIcon />
          </Center>
        </RowItem>
        <RowItem>
          <Text muted>
            {balance} {walletAsset}
          </Text>
        </RowItem>
      </Row>
      {exchangeInfo && (
        <Row>
          {tab === "Limit" && (
            <LimitTradeForm
              status={status}
              exchangeInfo={exchangeInfo}
              balances={balances}
              outerPrice={+price}
              onSubmit={handleSubmit}
              side={side}
            />
          )}
          {tab === "Market" && (
            <MarketTradeForm
              status={status}
              exchangeInfo={exchangeInfo}
              balances={balances}
              outerPrice={+price}
              onSubmit={handleSubmit}
              side={side}
            />
          )}
          {tab === "TakeProfitLimit" && (
            <StopLimitTradeForm
              status={status}
              exchangeInfo={exchangeInfo}
              balances={balances}
              outerPrice={+price}
              onSubmit={handleSubmit}
              side={side}
            />
          )}
        </Row>
      )}
    </TerminalDefaultBlock>
  );
};

export const PlaceOrder = React.memo(_PlaceOrder);
