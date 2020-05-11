import { DefaultBlock } from "components/default.block/default.block";
import { SIZES } from "constants/constants";
import dynamic from "next/dynamic";
import Head from "next/head";
import { LanguageCode } from "pages/trades/binance-trade-page/trading/chart/charting_library/charting_library.min";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./chart.module.scss";
// import TradingView from "./charting_library/charting_library.min";
import Datafeed from "./datafeed";

// const TradingView = dynamic(
//   () => import("./charting_library/charting_library.min"),
//   { ssr: false }
// );

export const ChartBlock: React.FC = () => {
  const [t, options] = useTranslation();
  const TradingInfo = React.useContext(TradingInfoContext);
  // console.info(TradingInfo);
  const { symbol, exchangeInfo } = TradingInfo;
  React.useEffect(() => {
    // console.info(options.language);
    import("./charting_library/charting_library.min").then(TradingView => {
      new TradingView.widget({
        symbol: `${symbol.baseAsset}${symbol.quoteAsset}`,
        interval: "1d", // default interval
        fullscreen: false, // displays the chart in the fullscreen mode
        container_id: "tv_chart_container",
        theme: "Dark",
        datafeed: Datafeed({
          symbols: exchangeInfo?.symbols || []
        }),
        locale: options.language as LanguageCode,
        library_path: "/static/charting_library/"
      });
    });
    //@ts-ignore
    // new TradingView.widget({
    //   symbol: "Bitfinex:BTC/USD", // default symbol
    //   interval: "1D", // default interval
    //   fullscreen: true, // displays the chart in the fullscreen mode
    //   container_id: "tv_chart_container",
    //   datafeed: Datafeed
    //   // library_path: "../charting_library_clonned_data/charting_library/"
    // });
  }, [Object.values(symbol)]);
  return (
    <DefaultBlock
      size={SIZES.SMALL}
      roundedBorder={false}
      bordered
      className={styles["chart"]}
    >
      {/*<Head>*/}
      {/*  <script src={"/static/charting_library/charting_library.min.js"} />*/}
      {/*</Head>*/}
      <div id="tv_chart_container">hello</div>
    </DefaultBlock>
  );
};
