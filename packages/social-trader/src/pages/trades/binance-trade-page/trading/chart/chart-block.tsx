import { DefaultBlock } from "components/default.block/default.block";
import {
  $backgroundColor,
  $negativeColor,
  $positiveColor,
  $textAccentColor
} from "components/gv-styles/gv-colors/gv-colors";
import { SIZES } from "constants/constants";
import { LanguageCode } from "pages/trades/binance-trade-page/trading/chart/charting_library/charting_library.min";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./chart.module.scss";
import Datafeed from "./datafeed";

export const ChartBlock: React.FC = () => {
  const [t, options] = useTranslation();
  const TradingInfo = React.useContext(TradingInfoContext);
  const { symbol, exchangeInfo } = TradingInfo;
  React.useEffect(() => {
    import("./charting_library/charting_library.min").then(TradingView => {
      new TradingView.widget({
        custom_css_url: "/static/charting_library/style.css",
        symbol: `${symbol.baseAsset}${symbol.quoteAsset}`,
        interval: "1D",
        autosize: true,
        container_id: "tv_chart_container",
        theme: "Dark",
        toolbar_bg: $backgroundColor,
        datafeed: Datafeed({
          symbols: exchangeInfo?.symbols || []
        }),
        locale: options.language as LanguageCode,
        library_path: "/static/charting_library/",
        disabled_features: [
          "header_symbol_search",
          "header_compare",
          "header_screenshot",
          "timeframes_toolbar"
        ],
        enabled_features: ["hide_left_toolbar_by_default"],
        overrides: {
          "scalesProperties.textColor": $textAccentColor,
          "paneProperties.background": $backgroundColor,
          "mainSeriesProperties.candleStyle.drawBorder": false,
          "mainSeriesProperties.hollowCandleStyle.drawBorder": false,
          "mainSeriesProperties.haStyle.drawBorder": false,
          "mainSeriesProperties.candleStyle.upColor": $positiveColor,
          "mainSeriesProperties.candleStyle.downColor": $negativeColor,
          "mainSeriesProperties.candleStyle.wickUpColor": $positiveColor,
          "mainSeriesProperties.candleStyle.wickDownColor": $negativeColor,
          "mainSeriesProperties.candleStyle.borderUpColor": $positiveColor,
          "mainSeriesProperties.candleStyle.borderDownColor": $negativeColor,
          "mainSeriesProperties.hollowCandleStyle.upColor": $positiveColor,
          "mainSeriesProperties.hollowCandleStyle.downColor": $negativeColor,
          "mainSeriesProperties.hollowCandleStyle.wickUpColor": $positiveColor,
          "mainSeriesProperties.hollowCandleStyle.wickDownColor": $negativeColor,
          "mainSeriesProperties.hollowCandleStyle.borderUpColor": $positiveColor,
          "mainSeriesProperties.hollowCandleStyle.borderDownColor": $negativeColor,
          "mainSeriesProperties.haStyle.upColor": $positiveColor,
          "mainSeriesProperties.haStyle.downColor": $negativeColor,
          "mainSeriesProperties.haStyle.wickUpColor": $positiveColor,
          "mainSeriesProperties.haStyle.wickDownColor": $negativeColor,
          "mainSeriesProperties.haStyle.borderUpColor": $positiveColor,
          "mainSeriesProperties.haStyle.borderDownColor": $negativeColor,
          "mainSeriesProperties.barStyle.borderUpColor": $positiveColor,
          "mainSeriesProperties.barStyle.borderDownColor": $negativeColor,
          "mainSeriesProperties.lineStyle.color": $positiveColor,
          "mainSeriesProperties.areaStyle.linecolor": $positiveColor,
          "mainSeriesProperties.baselineStyle.topLineColor": $positiveColor,
          "mainSeriesProperties.baselineStyle.bottomLineColor": $negativeColor
        }
      });
    });
  }, [Object.values(symbol), exchangeInfo?.symbols]);
  return (
    <DefaultBlock
      size={SIZES.SMALL}
      roundedBorder={false}
      bordered
      className={styles.chart}
    >
      <div id="tv_chart_container" className={styles.chart_container} />
    </DefaultBlock>
  );
};
