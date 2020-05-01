import { Center } from "components/center/center";
import { ColoredText } from "components/colored-text/colored-text";
import { DefaultBlock } from "components/default.block/default.block";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
import { SIZES } from "constants/constants";
import { withBlurLoader } from "decorators/with-blur-loader";
import { MonoText } from "pages/trades/binance-trade-page/trading/components/mono-text/mono-text";
import { TradeStatefulValue } from "pages/trades/binance-trade-page/trading/components/trade-stateful-value/trade-stateful-value";
import {
  getTickerSymbolLoaderData,
  useSymbolData
} from "pages/trades/binance-trade-page/trading/symbol-summary/symbol-summary.helpers";
import { MergedTickerSymbolType } from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";

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
  return (
    <Center>
      <RowItem large>
        <h3>
          {baseAsset}/{quoteAsset}
        </h3>
      </RowItem>
      <RowItem>
        <Row>
          <h4>
            <MonoText>
              <TradeStatefulValue
                value={(+lastPrice).toFixed(divider)}
                trigger={eventTime}
              />
            </MonoText>
          </h4>
        </Row>
        <Row small>
          <MutedText>
            <MonoText>{(+lastPrice).toFixed(divider)}</MonoText>
          </MutedText>
        </Row>
      </RowItem>
      <RowItem>
        <StatisticItemInner label={"24 Change"}>
          <MonoText>
            <ColoredText color={+priceChangePercent > 0 ? "green" : "red"}>
              {(+priceChange).toFixed(divider)}{" "}
              {(+priceChangePercent).toFixed(divider)} %
            </ColoredText>
          </MonoText>
        </StatisticItemInner>
      </RowItem>
      <RowItem>
        <StatisticItemInner isPending={!high} label={"24 High"}>
          <MonoText>{(+high).toFixed(divider)}</MonoText>
        </StatisticItemInner>
      </RowItem>
      <RowItem>
        <StatisticItemInner isPending={!low} label={"24 Low"}>
          <MonoText>{(+low).toFixed(divider)}</MonoText>
        </StatisticItemInner>
      </RowItem>
      <RowItem>
        <StatisticItemInner label={"24 Volume"}>
          <MonoText>
            {(+volume).toFixed(divider)} {quoteAsset}
          </MonoText>
        </StatisticItemInner>
      </RowItem>
    </Center>
  );
};
export const SymbolSummarySmallView = withBlurLoader(
  React.memo(_SymbolSummarySmallView)
);
