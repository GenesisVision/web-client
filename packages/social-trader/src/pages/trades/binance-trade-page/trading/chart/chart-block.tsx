import { DefaultBlock } from "components/default.block/default.block";
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
        symbol: `${symbol.baseAsset}${symbol.quoteAsset}`,
        interval: "1D", // default interval
        // fullscreen: true,
        autosize: true,
        container_id: "tv_chart_container",
        theme: "Dark",
        datafeed: Datafeed({
          symbols: exchangeInfo?.symbols || []
        }),
        locale: options.language as LanguageCode,
        library_path: "/static/charting_library/"
      });
    });
  }, [Object.values(symbol)]);
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
