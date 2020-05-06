import { Center } from "components/center/center";
import { ColoredText } from "components/colored-text/colored-text";
import { DefaultBlock } from "components/default.block/default.block";
import { MutedText } from "components/muted-text/muted-text";
import { ResponsiveContainer } from "components/responsive-container/responsive-container";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
import { SIZES } from "constants/constants";
import { withBlurLoader } from "decorators/with-blur-loader";
import { MonoText } from "pages/trades/binance-trade-page/trading/components/mono-text/mono-text";
import { TradeStatefulValue } from "pages/trades/binance-trade-page/trading/components/trade-stateful-value/trade-stateful-value";
import { MarketWatchTooltipButton } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.tooltip";
import {
  getTickerSymbolLoaderData,
  useSymbolData
} from "pages/trades/binance-trade-page/trading/symbol-summary/symbol-summary.helpers";
import { MergedTickerSymbolType } from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";
import { formatValue } from "utils/formatter";

interface Props {
  divider: number;
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
  const { symbolData, divider } = useSymbolData();
  return (
    <SymbolSummarySmallView
      divider={divider!}
      data={symbolData!}
      loaderData={getTickerSymbolLoaderData()}
    />
  );
};

const _SymbolSummarySmallView: React.FC<Props> = ({
  divider,
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
                value={formatValue(+lastPrice, divider)}
                trigger={eventTime}
              />
            </MonoText>
          </h4>
        </Row>
        <Row small>
          <MutedText>
            <MonoText>{formatValue(+lastPrice, divider)}</MonoText>
          </MutedText>
        </Row>
      </RowItem>
      <RowItem>
        <StatisticItemInner label={"24 Change"}>
          <MonoText>
            <ColoredText color={+priceChangePercent > 0 ? "green" : "red"}>
              {formatValue(+priceChange, divider)}{" "}
              {formatValue(+priceChangePercent, divider)} %
            </ColoredText>
          </MonoText>
        </StatisticItemInner>
      </RowItem>
      <RowItem>
        <StatisticItemInner isPending={!high} label={"24 High"}>
          <MonoText>{formatValue(+high, divider)}</MonoText>
        </StatisticItemInner>
      </RowItem>
      <RowItem>
        <StatisticItemInner isPending={!low} label={"24 Low"}>
          <MonoText>{formatValue(+low, divider)}</MonoText>
        </StatisticItemInner>
      </RowItem>
      <RowItem>
        <StatisticItemInner label={"24 Volume"}>
          <MonoText>
            {formatValue(+volume, divider)} {quoteAsset}
          </MonoText>
        </StatisticItemInner>
      </RowItem>
    </Center>
  );
};
export const SymbolSummarySmallView = withBlurLoader(
  React.memo(_SymbolSummarySmallView)
);
