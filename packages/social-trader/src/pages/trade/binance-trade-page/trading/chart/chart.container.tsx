import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSockets } from "services/websocket.service";
import {
  $backgroundColor,
  $negativeColor,
  $positiveColor,
  $textAccentColor
} from "utils/style/colors";

import styles from "./chart.module.scss";
import TradingView, { Timezone } from "./charting_library/charting_library.min";
import { Datafeed } from "./datafeed";

export const ChartContainer: React.FC = () => {
  const { symbol, exchangeInfo, terminalType } = useContext(
    TerminalInfoContext
  );
  const [widget, setWidget] = useState<TradingView.IChartingLibraryWidget>();
  const { connectSocket } = useSockets();
  const { getServerTime, getKlines, klineSocket } = useContext(
    TerminalMethodsContext
  );

  const emptyCallback = useCallback(() => {}, []);

  useEffect(() => {
    import("./charting_library/charting_library.min").then(TradingView => {
      if (!exchangeInfo) return;
      let timezone = "Asia/Shanghai" as Timezone;
      try {
        timezone = Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone;
      } catch (e) {}

      const widget = new TradingView.widget({
        custom_css_url: "/static/charting_library/style.css",
        symbol: `${symbol.baseAsset}${symbol.quoteAsset}`,
        interval:
          window.localStorage.getItem(
            "tradingview.chart.lastUsedTimeBasedResolution"
          ) || "1D",
        autosize: true,
        container_id: "tv_chart_container",
        theme: "Dark",
        timezone,
        toolbar_bg: $backgroundColor,
        datafeed: Datafeed({
          symbols: exchangeInfo ? exchangeInfo.symbols : [],
          getServerTime,
          getKlines,
          klineSocket: klineSocket(connectSocket)
        }),
        locale: "en",
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
      setWidget(widget);
    });
  }, [exchangeInfo?.symbols, terminalType]);

  useEffect(() => {
    if (!widget) return;

    widget.onChartReady(() => {
      const { interval } = widget.symbolInterval();
      widget.setSymbol(
        `${symbol.baseAsset}${symbol.quoteAsset}`,
        interval,
        emptyCallback
      );
      if (widget.chart().getAllStudies().length === 0)
        widget.chart().createStudy("Volume", false, false, [99]);
    });
  }, [widget, symbol.quoteAsset, symbol.baseAsset, emptyCallback]);

  return <div id="tv_chart_container" className={styles.chart_container} />;
};
