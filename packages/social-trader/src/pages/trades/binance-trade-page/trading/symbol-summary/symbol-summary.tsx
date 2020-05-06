import { ColoredText } from "components/colored-text/colored-text";
import { DefaultBlock } from "components/default.block/default.block";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
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

import styles from "./symbol-summary.module.scss";

interface Props {
  divider: number;
  data: MergedTickerSymbolType;
}

export const SymbolSummaryContainer: React.FC = () => {
  const { symbolData, divider } = useSymbolData();
  return (
    <SymbolSummaryView
      divider={divider!}
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
          <MutedText>{label}</MutedText>
        </RowItem>
        <RowItem>{children}</RowItem>
      </Row>
    );
  }
);

const _SymbolSummaryView: React.FC<Props> = ({
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
    <DefaultBlock size={SIZES.SMALL} roundedBorder={false} bordered>
      <Row center={false}>
        <RowItem>
          <Row>
            <MarketWatchTooltipButton
              baseAsset={baseAsset}
              quoteAsset={quoteAsset}
            />
          </Row>
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
          <Row>
            <MutedText>
              <MonoText>{(+lastPrice).toFixed(divider)}</MonoText>
            </MutedText>
          </Row>
        </RowItem>
        <RowItem wide>
          <SymbolSummaryLine label={"24 Change"}>
            <MonoText>
              <ColoredText color={+priceChangePercent > 0 ? "green" : "red"}>
                {(+priceChange).toFixed(divider)}{" "}
                {(+priceChangePercent).toFixed(divider)} %
              </ColoredText>
            </MonoText>
          </SymbolSummaryLine>
          <SymbolSummaryLine label={"24 High"}>
            <MonoText>{high ? (+high).toFixed(divider) : 0}</MonoText>
          </SymbolSummaryLine>
          <SymbolSummaryLine label={"24 Low"}>
            <MonoText>{low ? (+low).toFixed(divider) : 0}</MonoText>
          </SymbolSummaryLine>
          <SymbolSummaryLine label={"24 Volume"}>
            <MonoText>
              {(+volume).toFixed(divider)} {quoteAsset}
            </MonoText>
          </SymbolSummaryLine>
        </RowItem>
      </Row>
    </DefaultBlock>
  );
};
export const SymbolSummaryView = withBlurLoader(React.memo(_SymbolSummaryView));
