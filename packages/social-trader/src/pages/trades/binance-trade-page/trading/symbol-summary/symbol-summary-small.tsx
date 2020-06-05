import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import { ResponsiveContainer } from "components/responsive-container/responsive-container";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
import { Text } from "components/text/text";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
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
import { SymbolSummaryData } from "pages/trades/binance-trade-page/trading/terminal.types";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import React, { useContext } from "react";
import { diffDate } from "utils/dates";

interface Props {
  data: SymbolSummaryData;
}

export const SymbolSummarySmallBlock: React.FC = () => {
  return (
    <DefaultBlock size={SIZES.SMALL} roundedBorder={false} bordered>
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
    markPrice,
    tickerData: {
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
  }
}) => {
  const { stepSize, tickSize } = useContext(TradingInfoContext);
  const renderSymbol = () => (
    <h5>
      {baseAsset}/{quoteAsset}
    </h5>
  );
  return (
    <Center>
      <RowItem large>
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
        <Row small>
          <Text size={"xsmall"} muted>
            <MonoText>
              {terminalMoneyFormat({ amount: lastPrice, tickSize })}
            </MonoText>
          </Text>
        </Row>
      </RowItem>
      {markPrice && (
        <>
          <RowItem>
            <StatisticItemInner
              size={"small"}
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
            </StatisticItemInner>
          </RowItem>
          <RowItem>
            <StatisticItemInner
              size={"small"}
              label={
                <TooltipLabel
                  labelText={"Funding/8h"}
                  tooltipContent={
                    "The payment rate exchanged between the buyer and seller for the next funding."
                  }
                />
              }
            >
              <Text size={"xsmall"}>
                <MonoText>
                  {+markPrice.lastFundingRate} %{" "}
                  {diffDate(new Date(), markPrice.nextFundingTime).format(
                    "HH:mm:ss"
                  )}
                </MonoText>
              </Text>
            </StatisticItemInner>
          </RowItem>
        </>
      )}
      <RowItem>
        <StatisticItemInner size={"small"} label={"24 Change"}>
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
        </StatisticItemInner>
      </RowItem>
      <RowItem>
        <StatisticItemInner size={"small"} isPending={!high} label={"24 High"}>
          <Text size={"xsmall"}>
            <MonoText>
              {terminalMoneyFormat({ amount: high, tickSize })}
            </MonoText>
          </Text>
        </StatisticItemInner>
      </RowItem>
      <RowItem>
        <StatisticItemInner size={"small"} isPending={!low} label={"24 Low"}>
          <Text size={"xsmall"}>
            <MonoText>
              {terminalMoneyFormat({ amount: low, tickSize })}
            </MonoText>
          </Text>
        </StatisticItemInner>
      </RowItem>
      <RowItem>
        <StatisticItemInner size={"small"} label={"24 Volume"}>
          <Text size={"xsmall"}>
            <MonoText>
              {terminalMoneyFormat({ amount: volume, tickSize: stepSize })}{" "}
              {quoteAsset}
            </MonoText>
          </Text>
        </StatisticItemInner>
      </RowItem>
      <RowItem>
        <TerminalTypeSwitcher />
      </RowItem>
    </Center>
  );
};
export const SymbolSummarySmallView = withBlurLoader(
  React.memo(_SymbolSummarySmallView)
);
