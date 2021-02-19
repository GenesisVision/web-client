import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import { BlurableLabeledValue } from "components/labeled-value/blurable-labeled-value";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { ResponsiveContainer } from "components/responsive-container/responsive-container";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
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
import { diffDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";

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
  return (
    <SymbolSummarySmallView
      data={symbolData!}
      loaderData={getTickerSymbolLoaderData()}
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
  console.log(serverTime, serverTime && new Date(serverTime.date));
  const renderSymbol = () => (
    <h5>
      {baseAsset}/{quoteAsset}
    </h5>
  );
  return (
    <Center>
      <RowItem size={"large"}>
        <ResponsiveContainer
          enabledScreens={["tablet", "landscape-tablet", "desktop"]}
        >
          <MarketWatchTooltipButton>{renderSymbol()}</MarketWatchTooltipButton>
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
              $<MonoText>{formatCurrencyValue(usdRate, "USD")}</MonoText>
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
                  labelText={"Mark Price"}
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
            <LabeledValue
              size={"xsmall"}
              label={
                <TooltipLabel
                  labelText={"Funding/8h"}
                  tooltipContent={
                    "The payment rate exchanged between the buyer and seller for the next funding."
                  }
                />
              }
            >
              {serverTime && (
                <Text size={"xsmall"}>
                  <Text wrap={false}>
                    <MonoText>{+markPrice.fundingRate * 100} % </MonoText>
                  </Text>
                  <MonoText>
                    {diffDate(
                      new Date(serverTime.date),
                      markPrice.nextFundingTime
                    ).format("HH:mm:ss")}
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
              size={"xsmall"}
              color={+priceChangePercent > 0 ? "green" : "red"}
            >
              {terminalMoneyFormat({ amount: priceChange, tickSize })}{" "}
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
                suffix={` ${baseAsset}`}
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
                suffix={` ${quoteAsset}`}
              />
            </MonoText>
          </Text>
        </LabeledValue>
      </RowItem>
      <RowItem>
        <AccountSelectorContainer currentAccount={exchangeAccountId} />
      </RowItem>
    </Center>
  );
};
export const SymbolSummarySmallView = withBlurLoader(
  React.memo(_SymbolSummarySmallView)
);
