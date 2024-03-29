import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { withBlurLoader } from "decorators/with-blur-loader";
import { AccountSelectorContainer } from "pages/trade/binance-trade-page/trading/components/account-selector/account-selector.container";
import { MonoText } from "pages/trade/binance-trade-page/trading/components/mono-text/mono-text";
import { TerminalDefaultBlock } from "pages/trade/binance-trade-page/trading/components/terminal-default-block/terminal-default-block";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TradeStatefulValue } from "pages/trade/binance-trade-page/trading/components/trade-stateful-value/trade-stateful-value";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { MarketWatchTooltipButton } from "pages/trade/binance-trade-page/trading/market-watch/market-watch.tooltip";
import {
  getTickerSymbolLoaderData,
  useSymbolData
} from "pages/trade/binance-trade-page/trading/symbol-summary/symbol-summary.helpers";
import { SymbolSummaryData } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";

import TerminalTitle from "../components/terminal-title/terminal-title";
import styles from "./symbol-summary.module.scss";
import { SymbolSummaryCountdown } from "./symbol-summary-countdown";

interface Props {
  data: SymbolSummaryData;
}

export const SymbolSummaryContainer: React.FC = () => {
  const { terminalType } = useContext(TerminalInfoContext);
  const symbolData = useSymbolData();
  return (
    <SymbolSummaryView
      data={symbolData!}
      loaderData={getTickerSymbolLoaderData(terminalType)}
    />
  );
};

const SymbolSummaryLine: React.FC<{ label: string | JSX.Element }> = React.memo(
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
    serverTime,
    usdRate,
    markPrice,
    tickerData: {
      eventTime,
      lastPrice,
      baseAsset,
      quoteAsset,
      priceChangePercent,
      priceChange,
      highPrice,
      lowPrice,
      quoteVolume,
      baseVolume
    }
  }
}) => {
  const { exchangeAccountId, stepSize, tickSize } = useContext(
    TerminalInfoContext
  );
  return (
    <TerminalTitle amount={lastPrice}>
      <TerminalDefaultBlock>
        <Row>
          <AccountSelectorContainer currentAccount={exchangeAccountId} />
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
                    thousandSeparator={","}
                    value={terminalMoneyFormat({ amount: lastPrice, tickSize })}
                    trigger={eventTime}
                  />
                </MonoText>
              </h4>
            </Row>
            {usdRate && (
              <Row>
                <Text muted>
                  <MonoText>
                    <NumberFormat
                      value={formatCurrencyValue(usdRate, "USD")}
                      thousandSeparator={","}
                      displayType="text"
                      prefix={"$"}
                    />
                  </MonoText>
                </Text>
              </Row>
            )}
          </RowItem>
          <RowItem wide>
            {markPrice && (
              <>
                <SymbolSummaryLine
                  label={
                    <TooltipLabel
                      labelText={"Mark"}
                      tooltipContent={
                        "The latest mark price for this contract. This is the price used for PNL and margin calculations, and may differ from the last price for the purposes of avoiding price manipulation."
                      }
                    />
                  }
                >
                  <MonoText>
                    <NumberFormat
                      value={terminalMoneyFormat({
                        amount: markPrice.markPrice,
                        tickSize
                      })}
                      thousandSeparator={","}
                      displayType="text"
                    />
                  </MonoText>
                </SymbolSummaryLine>
                <SymbolSummaryLine label={"Index"}>
                  <MonoText>
                    <NumberFormat
                      value={terminalMoneyFormat({
                        amount: markPrice.indexPrice,
                        tickSize
                      })}
                      thousandSeparator={","}
                      displayType="text"
                    />
                  </MonoText>
                </SymbolSummaryLine>
                <SymbolSummaryLine
                  label={
                    <TooltipLabel
                      labelText={"Funding / Countdown"}
                      tooltipContent={
                        "The payment rate exchanged between the buyer and seller for the next funding. During the funding rate cycle (every 8 hours), the premium index will be calculated every minute and the time-weighted average value will be used to calculate the funding rate."
                      }
                    />
                  }
                >
                  {serverTime && (
                    <MonoText>
                      <NumberFormat
                        value={+markPrice.fundingRate * 100}
                        fixedDecimalScale
                        decimalScale={4}
                        suffix={"%"}
                        displayType="text"
                      />{" "}
                      <SymbolSummaryCountdown
                        nextFundingTime={markPrice.nextFundingTime}
                        serverTime={serverTime.date}
                      />
                    </MonoText>
                  )}
                </SymbolSummaryLine>
              </>
            )}
            <SymbolSummaryLine label={"24h Change"}>
              <MonoText>
                <Text
                  wrap={false}
                  size={"xlarge"}
                  color={+priceChangePercent > 0 ? "green" : "red"}
                >
                  <NumberFormat
                    value={terminalMoneyFormat({
                      amount: priceChange,
                      tickSize
                    })}
                    thousandSeparator={","}
                    displayType="text"
                  />{" "}
                  {terminalMoneyFormat({
                    amount: priceChangePercent,
                    digits: 2
                  })}{" "}
                  %
                </Text>
              </MonoText>
            </SymbolSummaryLine>
            <SymbolSummaryLine label={"24h High"}>
              <MonoText>
                {highPrice
                  ? terminalMoneyFormat({ amount: highPrice, tickSize })
                  : 0}
              </MonoText>
            </SymbolSummaryLine>
            <SymbolSummaryLine label={"24h Low"}>
              <MonoText>
                {lowPrice
                  ? terminalMoneyFormat({ amount: lowPrice, tickSize })
                  : 0}
              </MonoText>
            </SymbolSummaryLine>
            <SymbolSummaryLine label={`24h Volume (${baseAsset})`}>
              <MonoText>
                <NumberFormat
                  value={terminalMoneyFormat({
                    amount: baseVolume,
                    tickSize: stepSize
                  })}
                  thousandSeparator={","}
                  displayType="text"
                />
              </MonoText>
            </SymbolSummaryLine>
            <SymbolSummaryLine label={`24h Volume (${quoteAsset})`}>
              <MonoText>
                <NumberFormat
                  value={terminalMoneyFormat({
                    amount: quoteVolume,
                    tickSize: tickSize
                  })}
                  thousandSeparator={","}
                  displayType="text"
                />
              </MonoText>
            </SymbolSummaryLine>
          </RowItem>
        </Row>
      </TerminalDefaultBlock>
    </TerminalTitle>
  );
};
export const SymbolSummaryView = withBlurLoader(React.memo(_SymbolSummaryView));
