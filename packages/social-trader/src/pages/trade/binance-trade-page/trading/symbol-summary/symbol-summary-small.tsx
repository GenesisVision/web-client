import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import { BlurableLabeledValue } from "components/labeled-value/blurable-labeled-value";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { ResponsiveContainer } from "components/responsive-container/responsive-container";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { withBlurLoader } from "decorators/with-blur-loader";
import { AccountSelectorContainer } from "pages/trade/binance-trade-page/trading/components/account-selector/account-selector.container";
import { MonoText } from "pages/trade/binance-trade-page/trading/components/mono-text/mono-text";
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

export const SymbolSummarySmallBlock: React.FC = () => {
  return (
    <DefaultBlock size={"small"} roundedBorder={false} bordered>
      <SymbolSummarySmallContainer />
    </DefaultBlock>
  );
};

export const SymbolSummarySmallContainer: React.FC = () => {
  const symbolData = useSymbolData();
  const { terminalType } = useContext(TerminalInfoContext);
  return (
    <SymbolSummarySmallView
      data={symbolData!}
      loaderData={getTickerSymbolLoaderData(terminalType)}
    />
  );
};

const _SymbolSummarySmallView: React.FC<Props> = ({
  data: {
    serverTime,
    usdRate,
    markPrice,
    tickerData: {
      eventTime,
      closeTime,
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

  const renderSymbol = () => (
    <h5>
      {baseAsset}/{quoteAsset}
    </h5>
  );
  return (
    <TerminalTitle amount={lastPrice} trigger={+closeTime}>
      <Center className={styles["symbol-summary__wrapper"]}>
        <RowItem size={"large"}>
          <ResponsiveContainer
            enabledScreens={["tablet", "landscape-tablet", "desktop"]}
          >
            <MarketWatchTooltipButton>
              {renderSymbol()}
            </MarketWatchTooltipButton>
          </ResponsiveContainer>
          <ResponsiveContainer enabledScreens={["large-desktop"]}>
            {renderSymbol()}
          </ResponsiveContainer>
        </RowItem>
        <RowItem>
          <Row>
            <h4>
              <MonoText>
                <TradeStatefulValue
                  thousandSeparator={","}
                  value={terminalMoneyFormat({
                    amount: lastPrice,
                    tickSize
                  })}
                  trigger={eventTime}
                />
              </MonoText>
            </h4>
          </Row>
          {usdRate && (
            <Row size={"xsmall"}>
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
        {markPrice && (
          <>
            <RowItem>
              <LabeledValue
                size={"xsmall"}
                label={
                  <TooltipLabel
                    labelText={"Mark"}
                    vertical={VERTICAL_POPOVER_POS.BOTTOM}
                    tooltipContent={
                      "The latest mark price for this contract. This is the price used for PNL and margin calculations, and may differ from the last price for the purposes of avoiding price manipulation."
                    }
                  />
                }
              >
                <Text size={"xsmall"}>
                  <MonoText>
                    {terminalMoneyFormat({
                      amount: markPrice.markPrice,
                      tickSize
                    })}
                  </MonoText>
                </Text>
              </LabeledValue>
            </RowItem>
            <RowItem>
              <LabeledValue size={"xsmall"} label={"Index"}>
                <Text size={"xsmall"}>
                  <MonoText>
                    {terminalMoneyFormat({
                      amount: markPrice.indexPrice,
                      tickSize
                    })}
                  </MonoText>
                </Text>
              </LabeledValue>
            </RowItem>
            <RowItem>
              <LabeledValue
                size={"xsmall"}
                label={
                  <TooltipLabel
                    labelText={"Funding / Countdown"}
                    vertical={VERTICAL_POPOVER_POS.BOTTOM}
                    tooltipContent={
                      "The payment rate exchanged between the buyer and seller for the next funding. During the funding rate cycle (every 8 hours), the premium index will be calculated every minute and the time-weighted average value will be used to calculate the funding rate."
                    }
                  />
                }
              >
                {serverTime && (
                  <Text size={"xsmall"}>
                    <Text wrap={false}>
                      <MonoText>
                        <NumberFormat
                          value={+markPrice.fundingRate * 100}
                          fixedDecimalScale
                          decimalScale={4}
                          suffix={"%"}
                          displayType="text"
                        />{" "}
                      </MonoText>
                    </Text>
                    <MonoText>
                      <SymbolSummaryCountdown
                        nextFundingTime={markPrice.nextFundingTime}
                        serverTime={serverTime.date}
                      />
                    </MonoText>
                  </Text>
                )}
              </LabeledValue>
            </RowItem>
          </>
        )}
        <RowItem>
          <LabeledValue size={"xsmall"} label={"24h Change"}>
            <MonoText>
              <Text
                wrap={false}
                size={"xsmall"}
                color={+priceChangePercent > 0 ? "green" : "red"}
              >
                <NumberFormat
                  value={terminalMoneyFormat({ amount: priceChange, tickSize })}
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
          </LabeledValue>
        </RowItem>
        <RowItem>
          <BlurableLabeledValue
            size={"xsmall"}
            tag={"span"}
            isPending={!highPrice}
            label={"24h High"}
          >
            <Text size={"xsmall"}>
              <MonoText>
                <NumberFormat
                  value={terminalMoneyFormat({
                    amount: highPrice,
                    tickSize
                  })}
                  thousandSeparator={","}
                  displayType="text"
                />
              </MonoText>
            </Text>
          </BlurableLabeledValue>
        </RowItem>
        <RowItem>
          <BlurableLabeledValue
            size={"xsmall"}
            tag={"span"}
            isPending={!lowPrice}
            label={"24h Low"}
          >
            <Text size={"xsmall"}>
              <MonoText>
                <NumberFormat
                  value={terminalMoneyFormat({
                    amount: lowPrice,
                    tickSize
                  })}
                  thousandSeparator={","}
                  displayType="text"
                />
              </MonoText>
            </Text>
          </BlurableLabeledValue>
        </RowItem>
        <RowItem>
          <LabeledValue size={"xsmall"} label={`24h Volume (${baseAsset})`}>
            <Text size={"xsmall"}>
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
            </Text>
          </LabeledValue>
        </RowItem>
        <RowItem>
          <LabeledValue size={"xsmall"} label={`24h Volume (${quoteAsset})`}>
            <Text size={"xsmall"}>
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
            </Text>
          </LabeledValue>
        </RowItem>
        <RowItem>
          <AccountSelectorContainer currentAccount={exchangeAccountId} />
        </RowItem>
      </Center>
    </TerminalTitle>
  );
};
export const SymbolSummarySmallView = withBlurLoader(
  React.memo(_SymbolSummarySmallView)
);
