import { DefaultBlock } from "components/default.block/default.block";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { SIZES } from "constants/constants";
import { withBlurLoader } from "decorators/with-blur-loader";
import { MonoText } from "pages/trades/binance-trade-page/trading/components/mono-text/mono-text";
import { terminalMoneyFormat } from "pages/trades/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TradeStatefulValue } from "pages/trades/binance-trade-page/trading/components/trade-stateful-value/trade-stateful-value";
import { MarketWatchTooltipButton } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.tooltip";
import {
  getTickerSymbolLoaderData,
  useSymbolData
} from "pages/trades/binance-trade-page/trading/symbol-summary/symbol-summary.helpers";
import { TerminalTypeSwitcher } from "pages/trades/binance-trade-page/trading/symbol-summary/terminal-type-switcher";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { MergedTickerSymbolType } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext } from "react";

import styles from "./symbol-summary.module.scss";

interface Props {
  data: MergedTickerSymbolType;
}

export const SymbolSummaryContainer: React.FC = () => {
  const { symbolData } = useSymbolData();
  return (
    <SymbolSummaryView
      data={symbolData!}
      loaderData={getTickerSymbolLoaderData()}
    />
  );
};

const SymbolSummaryLine: React.FC<{ label: string }> = React.memo(
  ({ label, children }) => {
    return (
      <Row className={styles["symbol-summary__line"]}>
        <RowItem className={styles["symbol-summary__label"]}>
          <Text muted>{label}</Text>
        </RowItem>
        <RowItem>{children}</RowItem>
      </Row>
    );
  }
);

const _SymbolSummaryView: React.FC<Props> = ({
  data: {
    eventTime,
    lastPrice,
    baseAsset,
    quoteAsset,
    priceChangePercent,
    priceChange,
    high,
    low,
    volume
  }
}) => {
  const { stepSize, tickSize } = useContext(TradingInfoContext);
  return (
    <DefaultBlock size={SIZES.SMALL} roundedBorder={false} bordered>
      <Row>
        <TerminalTypeSwitcher />
      </Row>
      <Row center={false}>
        <RowItem>
          <Row>
            <MarketWatchTooltipButton>
              <h3>
                {baseAsset}/{quoteAsset}
              </h3>
            </MarketWatchTooltipButton>
          </Row>
          <Row>
            <h4>
              <MonoText>
                <TradeStatefulValue
                  value={terminalMoneyFormat({ amount: lastPrice, tickSize })}
                  trigger={eventTime}
                />
              </MonoText>
            </h4>
          </Row>
          <Row>
            <Text muted>
              <MonoText>
                {terminalMoneyFormat({ amount: lastPrice, tickSize })}
              </MonoText>
            </Text>
          </Row>
        </RowItem>
        <RowItem wide>
          <SymbolSummaryLine label={"24 Change"}>
            <MonoText>
              <Text color={+priceChangePercent > 0 ? "green" : "red"}>
                {terminalMoneyFormat({ amount: priceChange, tickSize })}{" "}
                {terminalMoneyFormat({ amount: priceChangePercent, digits: 2 })}{" "}
                %
              </Text>
            </MonoText>
          </SymbolSummaryLine>
          <SymbolSummaryLine label={"24 High"}>
            <MonoText>
              {high ? terminalMoneyFormat({ amount: high, tickSize }) : 0}
            </MonoText>
          </SymbolSummaryLine>
          <SymbolSummaryLine label={"24 Low"}>
            <MonoText>
              {low ? terminalMoneyFormat({ amount: low, tickSize }) : 0}
            </MonoText>
          </SymbolSummaryLine>
          <SymbolSummaryLine label={"24 Volume"}>
            <MonoText>
              {terminalMoneyFormat({ amount: volume, tickSize: stepSize })}{" "}
              {quoteAsset}
            </MonoText>
          </SymbolSummaryLine>
        </RowItem>
      </Row>
    </DefaultBlock>
  );
};
export const SymbolSummaryView = withBlurLoader(React.memo(_SymbolSummaryView));
