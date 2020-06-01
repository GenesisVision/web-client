import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import { ResponsiveContainer } from "components/responsive-container/responsive-container";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
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

interface Props {
  data: MergedTickerSymbolType;
}

export const SymbolSummarySmallBlock: React.FC = () => {
  return (
    <DefaultBlock size={SIZES.SMALL} roundedBorder={false} bordered>
      <SymbolSummarySmallContainer />
    </DefaultBlock>
  );
};

export const SymbolSummarySmallContainer: React.FC = () => {
  const { symbolData } = useSymbolData();
  return (
    <SymbolSummarySmallView
      data={symbolData!}
      loaderData={getTickerSymbolLoaderData()}
    />
  );
};

const _SymbolSummarySmallView: React.FC<Props> = ({
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
  const renderSymbol = () => (
    <h3>
      {baseAsset}/{quoteAsset}
    </h3>
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
          <Text muted>
            <MonoText>
              {terminalMoneyFormat({ amount: lastPrice, tickSize })}
            </MonoText>
          </Text>
        </Row>
      </RowItem>
      <RowItem>
        <StatisticItemInner label={"24 Change"}>
          <MonoText>
            <Text color={+priceChangePercent > 0 ? "green" : "red"}>
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
        <StatisticItemInner isPending={!high} label={"24 High"}>
          <MonoText>{terminalMoneyFormat({ amount: high, tickSize })}</MonoText>
        </StatisticItemInner>
      </RowItem>
      <RowItem>
        <StatisticItemInner isPending={!low} label={"24 Low"}>
          <MonoText>{terminalMoneyFormat({ amount: low, tickSize })}</MonoText>
        </StatisticItemInner>
      </RowItem>
      <RowItem>
        <StatisticItemInner label={"24 Volume"}>
          <MonoText>
            {terminalMoneyFormat({ amount: volume, tickSize: stepSize })}{" "}
            {quoteAsset}
          </MonoText>
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
