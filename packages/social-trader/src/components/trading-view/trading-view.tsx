import React, { PureComponent } from "react";

declare global {
  interface Window {
    TradingView?: any;
  }
}

export enum BarStyles {
  BARS = 0,
  CANDLES = 1,
  HOLLOW_CANDLES = 9,
  HEIKIN_ASHI = 8,
  LINE = 2,
  AREA = 3,
  RENKO = 4,
  LINE_BREAK = 7,
  KAGI = 5,
  POINT_AND_FIGURE = 6
}

export enum IntervalTypes {
  D = "D",
  W = "W"
}

export enum RangeTypes {
  YTD = "ytd",
  ALL = "all"
}

export enum Themes {
  LIGHT = "Light",
  DARK = "Dark"
}

const SCRIPT_ID = "tradingview-widget-script";
const CONTAINER_ID = "tradingview-widget";

export default class TradingViewWidget extends PureComponent<TradingViewProps> {
  static defaultProps = {
    allow_symbol_change: true,
    autosize: false,
    enable_publishing: false,
    height: 610,
    hideideas: true,
    hide_legend: false,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    interval: IntervalTypes.D,
    locale: "en",
    save_image: true,
    show_popup_button: false,
    style: BarStyles.CANDLES,
    theme: Themes.LIGHT,
    timezone: "Etc/UTC",
    toolbar_bg: "#F1F3F6",
    widgetType: "widget",
    width: 980,
    withdateranges: false
  };

  containerId = `${CONTAINER_ID}-${Math.random()}`;

  componentDidMount = () => this.appendScript(this.initWidget);

  componentDidUpdate = () => {
    this.cleanWidget();
    this.initWidget();
  };

  canUseDOM = () =>
    !!(
      typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
    );

  appendScript = (onload: () => void) => {
    if (!this.canUseDOM()) {
      onload();
      return;
    }

    if (this.scriptExists()) {
      if (typeof window.TradingView === "undefined") {
        this.updateOnloadListener(onload);
        return;
      }
      onload();
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://s3.tradingview.com/tv.js";
    script.onload = onload;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  getScriptElement = () => document.getElementById(SCRIPT_ID);

  scriptExists = () => this.getScriptElement() !== null;

  updateOnloadListener = (onload: () => void) => {
    const script = this.getScriptElement();
    if (!script) return;
    const oldOnload = script.onload;
    return (script.onload = event => {
      // @ts-ignore
      oldOnload && oldOnload();
      onload();
    });
  };

  initWidget = () => {
    if (
      typeof window.TradingView === "undefined" ||
      !document.getElementById(this.containerId)
    )
      return;

    const { widgetType, ...widgetConfig } = this.props;
    const config = { ...widgetConfig, container_id: this.containerId };

    if (config.autosize) {
      //@ts-ignore
      delete config.width;
      //@ts-ignore
      delete config.height;
    }

    if (config.popup_width && typeof config.popup_width === "number") {
      config.popup_width = config.popup_width.toString();
    }

    if (config.popup_height && typeof config.popup_height === "number") {
      config.popup_height = config.popup_height.toString();
    }

    new window.TradingView[widgetType](config);
  };

  cleanWidget = () => {
    if (!this.canUseDOM()) return;
    const el = document.getElementById(this.containerId);
    if (el) {
      el.innerHTML = "";
    }
  };

  getStyle = () => {
    if (!this.props.autosize) return {};
    return {
      width: "100%",
      height: "100%"
    };
  };

  render = () => <article id={this.containerId} style={this.getStyle()} />;
}

type TradingViewProps = {
  allow_symbol_change?: boolean;
  autosize?: boolean;
  calendar?: boolean;
  details?: boolean;
  enable_publishing?: boolean;
  height?: number;
  hideideas?: boolean;
  hide_legend?: boolean;
  hide_side_toolbar?: boolean;
  hide_top_toolbar?: boolean;
  hotlist?: boolean;
  interval?:
    | IntervalTypes
    | "1"
    | "3"
    | "5"
    | "15"
    | "30"
    | "60"
    | "120"
    | "180";
  locale?: string;
  news?: string[];
  no_referral_id?: boolean;
  popup_height?: number | string;
  popup_width?: number | string;
  range?: RangeTypes | "1d" | "5d" | "1m" | "3m" | "6m" | "12m" | "60m";

  referral_id?: string;
  save_image?: boolean;
  show_popup_button?: boolean;
  studies?: string[];
  style?: BarStyles;
  symbol: string;
  theme?: Themes;
  timezone?: string;
  toolbar_bg?: string;
  watchlist?: string[];
  widgetType: string;
  width: number;
  withdateranges: boolean;
};
