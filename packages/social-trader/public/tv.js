/* eslint-disable */
(function() {
  if (
    window.TradingView &&
    window.TradingView.host &&
    !window.TradingView.reoloadTvjs
  ) {
    return;
  }
  var COLORS = {};
  COLORS["color-brand"] = "#2196f3";
  COLORS["color-gull-gray"] = "#9db2bd";
  COLORS["color-scooter"] = "#38acdb";
  COLORS["color-curious-blue"] = "#299dcd";
  var TradingView = {
    host:
      window.location.host.match(/tradingview\.com|pyrrosinvestment\.com/i) ==
      null
        ? "https://s.tradingview.com"
        : "https://www.tradingview.com",
    ideasHost: "https://www.tradingview.com",
    chatHost: "https://www.tradingview.com",
    embedStylesForCopyright: function() {
      var styleElement = document.createElement("style");
      styleElement.innerHTML =
        ".tradingview-widget-copyright {font-size: 13px !important; line-height: 32px !important; text-align: center !important; vertical-align: middle !important; font-family: 'Trebuchet MS', Arial, sans-serif !important; color: " +
        COLORS["color-gull-gray"] +
        " !important;} .tradingview-widget-copyright .blue-text {color: " +
        COLORS["color-brand"] +
        " !important;} .tradingview-widget-copyright a {text-decoration: none !important; color: " +
        COLORS["color-gull-gray"] +
        " !important;} .tradingview-widget-copyright a:visited {color: " +
        COLORS["color-gull-gray"] +
        " !important;} .tradingview-widget-copyright a:hover .blue-text {color: " +
        COLORS["color-scooter"] +
        " !important;} .tradingview-widget-copyright a:active .blue-text {color: " +
        COLORS["color-curious-blue"] +
        " !important;} .tradingview-widget-copyright a:visited .blue-text {color: " +
        COLORS["color-brand"] +
        " !important;}";
      return styleElement;
    },
    embedStylesForFullHeight: function(height, hasCopyright, container_id) {
      var containerHeight = hasCopyright
        ? "calc(" + height + " - 32px)"
        : height;
      var containerElemChild = document.querySelector("#" + container_id);
      var containerElem = containerElemChild.parentElement;
      containerElem.style.height = containerHeight;
      containerElemChild.style.height = "100%";
    },
    gId: function() {
      return (
        "tradingview_" +
        (((1 + Math.random()) * 1048576) | 0).toString(16).substring(1)
      );
    },
    isPersentHeight: function(suffix) {
      return suffix === "%";
    },
    getSuffix: function(value) {
      var match = value.toString().match(/(\%|px|em|ex)/);
      return match ? match[0] : "px";
    },
    hasCopyright: function(container_id) {
      var widgetContainerElement = document.getElementById(container_id);
      var embedContainerElement =
        widgetContainerElement && widgetContainerElement.parentElement;
      if (embedContainerElement) {
        return !!embedContainerElement.querySelector(
          ".tradingview-widget-copyright"
        );
      }
      return false;
    },
    calculateWidgetHeight: function(widgetHeight, container_id) {
      var newWidgetHeight = parseInt(widgetHeight);
      var suffix = this.getSuffix(widgetHeight);
      var isPersentHeight = this.isPersentHeight(suffix);
      var hasCopyright = container_id && this.hasCopyright(container_id);
      if (isPersentHeight && container_id) {
        this.embedStylesForFullHeight(
          newWidgetHeight + suffix,
          hasCopyright,
          container_id
        );
        if (hasCopyright) {
          return 100 + suffix;
        }
      }
      if (hasCopyright) {
        return "calc(" + newWidgetHeight + suffix + " - 32px)";
      }
      return newWidgetHeight + suffix;
    },
    onready: function(callback) {
      if (window.addEventListener) {
        window.addEventListener("DOMContentLoaded", callback, false);
      } else {
        window.attachEvent("onload", callback);
      }
    },
    css: function(css_content) {
      var head = document.getElementsByTagName("head")[0];
      var style = document.createElement("style");
      var rules;
      style.type = "text/css";
      if (style.styleSheet) {
        style.styleSheet.cssText = css_content;
      } else {
        rules = document.createTextNode(css_content);
        style.appendChild(rules);
      }
      head.appendChild(style);
    },
    bindEvent: function(o, ev, fn) {
      if (o.addEventListener) {
        o.addEventListener(ev, fn, false);
      } else if (o.attachEvent) {
        o.attachEvent("on" + ev, fn);
      }
    },
    unbindEvent: function(o, ev, fn) {
      if (o.removeEventListener) {
        o.removeEventListener(ev, fn, false);
      } else if (o.detachEvent) {
        o.detachEvent("on" + ev, fn);
      }
    },
    cloneSimpleObject: function(obj) {
      if (null == obj || "object" != typeof obj) {
        return obj;
      }
      var copy = obj.constructor();
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = obj[attr];
        }
      }
      return copy;
    },
    isArray: function(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    },
    isMobileDevice: (function() {
      var ret = {
        Android: /Android/i.test(navigator.userAgent),
        BlackBerry: /BlackBerry/i.test(navigator.userAgent),
        iOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
        Opera: /Opera Mini/i.test(navigator.userAgent)
      };
      ret.any = ret.Android || ret.BlackBerry || ret.iOS || ret.Opera;
      return ret;
    })(),
    generateUtmForUrlParams: function(options) {
      return (
        "utm_source=" +
        encodeURI(window.location.hostname) +
        "&utm_medium=" +
        (TradingView.hasCopyright(options.container)
          ? "widget_new"
          : "widget") +
        (options.type ? "&utm_campaign=" + options.type : "") +
        (options.type && options.type === "chart"
          ? "&utm_term=" + encodeURIComponent(options.symbol)
          : "")
      );
    },
    WidgetAbstract: function() {},
    MiniWidget: function(options) {
      this.id = TradingView.gId();
      this.options = {
        whitelabel: options.whitelabel || "",
        width:
          TradingView.WidgetAbstract.prototype.fixSize(options.width) || 300,
        height:
          TradingView.WidgetAbstract.prototype.fixSize(options.height) || 400,
        symbols: options.symbols,
        tabs: options.tabs || "",
        symbols_description: options.symbols_description || "",
        customer: options.customer || "",
        container: options.container_id || "",
        greyText: options.greyText || "",
        large_chart_url: options.large_chart_url || "",
        large_chart_target: options.large_chart_target || "",
        gridLineColor: options.gridLineColor || "",
        fontColor: options.fontColor || "",
        underLineColor: options.underLineColor || "",
        trendLineColor: options.trendLineColor || "",
        timeAxisBackgroundColor: options.timeAxisBackgroundColor || "",
        activeTickerBackgroundColor: options.activeTickerBackgroundColor || "",
        noGraph: options.noGraph || false,
        locale: options.locale,
        styleTickerActiveBg: options.styleTickerActiveBg || "",
        styleTabActiveBorderColor: options.styleTabActiveBorderColor || "",
        styleTickerBodyFontSize: options.styleTickerBodyFontSize || "",
        styleTickerBodyFontWeight: options.styleTickerBodyFontWeight || "",
        styleTickerHeadFontSize: options.styleTickerHeadFontSize || "",
        styleTickerHeadFontWeight: options.styleTickerHeadFontWeight || "",
        styleTickerChangeDownColor: options.styleTickerChangeDownColor || "",
        styleTickerChangeUpColor: options.styleTickerChangeUpColor || "",
        styleTickerLastDownBg: options.styleTickerLastDownBg || "",
        styleTickerLastUpBg: options.styleTickerLastUpBg || "",
        styleTickerSymbolColor: options.styleTickerSymbolColor || "",
        styleTickerSymbolHoverTextDecoration:
          options.styleTickerSymbolHoverTextDecoration || "",
        styleTickerActiveSymbolTextDecoration:
          options.styleTickerActiveSymbolTextDecoration || "",
        styleTabsActiveBorderColor: options.styleTabsActiveBorderColor || "",
        styleTabsNoBorder: options.styleTabsNoBorder || "",
        styleWidgetNoBorder: options.styleWidgetNoBorder || ""
      };
      this.createWidget();
    },
    MediumWidget: function(options) {
      this.id = TradingView.gId();
      var widgetHeight = TradingView.calculateWidgetHeight(
        options.height || 400,
        options.container_id
      );
      this.options = {
        container: options.container_id || "",
        width:
          TradingView.WidgetAbstract.prototype.fixSize(options.width) || "",
        height:
          TradingView.WidgetAbstract.prototype.fixSize(widgetHeight) || "",
        symbols: options.symbols,
        greyText: options.greyText || "",
        symbols_description: options.symbols_description || "",
        large_chart_url: options.large_chart_url || "",
        customer: options.customer || "",
        gridLineColor: options.gridLineColor || "",
        fontColor: options.fontColor || "",
        underLineColor: options.underLineColor || "",
        trendLineColor: options.trendLineColor || "",
        timeAxisBackgroundColor: options.timeAxisBackgroundColor || "",
        chartOnly: !!options.chartOnly,
        locale: options.locale,
        whitelabel: !!options.whitelabel || "",
        colorTheme: options.colorTheme,
        isTransparent: options.isTransparent
      };
      this.createWidget();
    },
    widget: function(options) {
      this.id = options.id || TradingView.gId();
      var _url_params = TradingView.getUrlParams();
      var _symbol =
        options.tvwidgetsymbol ||
        _url_params.tvwidgetsymbol ||
        _url_params.symbol ||
        options.symbol ||
        "NASDAQ:AAPL";
      var _logo = options.logo || "";
      if (_logo.src) {
        _logo = _logo.src;
      }
      if (_logo) {
        _logo.replace(".png", "");
      }
      var widgetHeight = TradingView.calculateWidgetHeight(
        options.height || 500,
        options.container_id
      );
      this.options = {
        whitelabel: options.whitelabel || "",
        width: options.width || 800,
        height: widgetHeight,
        symbol: _symbol,
        interval: options.interval || "1",
        range: options.range || "",
        timezone: options.timezone || "",
        autosize: options.autosize,
        hide_top_toolbar: options.hide_top_toolbar,
        hide_side_toolbar: options.hide_side_toolbar,
        hide_legend: options.hide_legend,
        allow_symbol_change: options.allow_symbol_change,
        save_image:
          options.save_image !== undefined ? options.save_image : true,
        container: options.container_id || "",
        toolbar_bg: options.toolbar_bg || "f4f7f9",
        watchlist: options.watchlist || [],
        editablewatchlist: !!options.editablewatchlist,
        studies: options.studies || [],
        theme: options.theme || "",
        style: options.style || "",
        extended_hours:
          options.extended_hours === undefined
            ? undefined
            : +options.extended_hours,
        details: !!options.details,
        news: !!options.news,
        calendar: !!options.calendar,
        hotlist: !!options.hotlist,
        hideideas: !!options.hideideas,
        hideideasbutton: !!options.hideideasbutton,
        widgetbar_width: +options.widgetbar_width || undefined,
        withdateranges: options.withdateranges || "",
        customer: options.customer || _logo || "",
        venue: options.venue,
        symbology: options.symbology,
        logo: _logo,
        show_popup_button: !!options.show_popup_button,
        popup_height: options.popup_height || "",
        popup_width: options.popup_width || "",
        studies_overrides: options.studies_overrides,
        overrides: options.overrides,
        enabled_features: options.enabled_features,
        disabled_features: options.disabled_features,
        publish_source: options.publish_source || "",
        enable_publishing: options.enable_publishing,
        whotrades: options.whotrades || undefined,
        locale: options.locale,
        referral_id: options.referral_id,
        no_referral_id: options.no_referral_id,
        ref_landing_page: options.ref_landing_page,
        fundamental: options.fundamental,
        percentage: options.percentage,
        hidevolume: options.hidevolume,
        padding: options.padding,
        greyText: options.greyText || "",
        horztouchdrag: options.horztouchdrag,
        verttouchdrag: options.verttouchdrag
      };
      if (options.cme) {
        this.options.customer = "cme";
      }
      if (options.news && options.news.length) {
        this.options.news_vendors = [];
        for (var i = 0; i < options.news.length; i++) {
          switch (options.news[i]) {
            case "headlines":
            case "stocktwits":
              this.options.news_vendors.push(options.news[i]);
          }
        }
        if (!this.options.news_vendors) {
          delete this.options.news_vendors;
        }
      }
      if (isFinite(options.widgetbar_width) && options.widgetbar_width > 0) {
        this.options.widgetbar_width = options.widgetbar_width;
      }
      this._ready_handlers = [];
      this.create();
    },
    chart: function(options) {
      this.id = TradingView.gId();
      this.options = {
        width: options.width || 640,
        height: options.height || 500,
        container: options.container_id || "",
        realtime: options.realtime,
        chart: options.chart,
        locale: options.locale,
        type: "chart",
        autosize: options.autosize,
        mobileStatic: options.mobileStatic
      };
      this._ready_handlers = [];
      this.create();
    },
    stream: function(options) {
      this.id = TradingView.gId();
      this.options = {
        width: options.width || 640,
        height: options.height || 500,
        container: options.container_id || "",
        stream: options.stream,
        locale: options.locale,
        autosize: options.autosize
      };
      this.create();
    },
    EventsWidget: function(options) {
      this.id = TradingView.gId();
      this.options = {
        container: options.container_id || "",
        width: options.width || 486,
        height: options.height || 670,
        currency: options.currencyFilter || "",
        importance: options.importanceFilter || "",
        type: "economic-calendar"
      };
      this.createWidget(options);
    },
    IdeasStreamWidget: function(options) {
      this.id = TradingView.gId();
      this.options = {
        container: options.container_id || "",
        width: options.width || 486,
        height: options.height || 670,
        symbol: options.symbol || "",
        username: options.username || "",
        mode: options.mode || "",
        publishSource: options.publishSource || "",
        sort: options.sort || "trending",
        stream: options.stream,
        interval: options.interval,
        time: options.time,
        waitSymbol: options.waitSymbol,
        hideDescription: options.hideDescription,
        startingCount: options.startingCount,
        bgColor: options.bgColor || "",
        headerColor: options.headerColor || "",
        borderColor: options.borderColor || "",
        locale: options.locale,
        type: "ideas-stream"
      };
      this._ready_handlers = [];
      this.createWidget(options);
    },
    IdeaWidget: function(options) {
      this.id = TradingView.gId();
      this.options = {
        container: options.container_id || "",
        width: options.width || 486,
        height: options.height || 670,
        idea: options.idea || "",
        chartUrl: options.chartUrl || "",
        whotrades: options.whotrades || undefined,
        locale: options.locale,
        type: "idea"
      };
      this.createWidget(options);
    },
    ChatWidgetEmbed: function(options) {
      this.id = TradingView.gId();
      this.options = {
        container: options.container_id || "",
        width: options.width || 400,
        height: options.height || 500,
        room: options.room || "",
        whotrades: options.whotrades || undefined,
        locale: options.locale,
        type: "chat-embed"
      };
      this.createWidget(options);
    },
    UserInfoWidget: function(options) {
      this.options = {
        container: options.container_id || "",
        width: options.width || 1040,
        height: options.height || 340,
        username: options.username || "",
        locale: options.locale,
        type: "user-info"
      };
      this.createWidget(options);
    },
    QuotesProvider: function(options) {
      var id = TradingView.gId();
      var options = {
        container: options.container_id,
        symbols: options.symbols || [],
        type: "quotes-provider"
      };
      var widget_url =
        TradingView.host +
        "/embed-quotes-provider/?" +
        TradingView.generateUtmForUrlParams(options);
      var widget_html =
        "<iframe" +
        ' id="' +
        id +
        '"' +
        ' src="' +
        widget_url +
        '"' +
        ' width="0" height="0"' +
        ' frameborder="0" allowTransparency="true" scrolling="no"></iframe>';
      var iframe;
      var postMessage;
      addWidget(widget_html, options.container);
      iframe = document.getElementById(id);
      postMessage = TradingView.postMessageWrapper(iframe.contentWindow, id);
      TradingView.bindEvent(iframe, "load", function() {
        options.symbols.forEach(resolveSymbol);
      });
      function resolveSymbol(symbolObj) {
        var symbol = symbolObj.symbol;
        var success = symbolObj.success;
        var error = symbolObj.error;
        if (!symbol || !(success && error)) {
          return;
        }
        postMessage.post(iframe.contentWindow, "resolveSymbol", {
          symbol: symbol
        });
        if (success) {
          postMessage.on("success" + symbol, function(data) {
            success(data);
          });
        }
        if (error) {
          postMessage.on("error" + symbol, function(data) {
            error(data);
          });
        }
      }
    }
  };
  TradingView.DependenciesManager = function() {};
  TradingView.DependenciesManager.prototype.scripts = {};
  TradingView.DependenciesManager.prototype._loaded = function(script) {
    for (var i in this.scripts[script].callbacks) {
      this.scripts[script].callbacks[i]();
    }
    this.scripts[script].status = true;
    this.scripts[script].callbacks = {};
  };
  TradingView.DependenciesManager.prototype.depends = function(
    scripts,
    cbid,
    cb
  ) {
    for (var i = 0; i < scripts.length; i++) {
      if (
        this.scripts[scripts[i]] &&
        this.scripts[scripts[i]].status === true
      ) {
        cb();
      } else if (
        this.scripts[scripts[i]] &&
        this.scripts[scripts[i]].status === false
      ) {
        this.scripts[scripts[i]].callbacks[cbid] = cb;
      } else {
        this.scripts[scripts[i]] = {
          status: false,
          script: document.createElement("script"),
          callbacks: {}
        };
        this.scripts[scripts[i]].callbacks[cbid] = cb;
        this.scripts[scripts[i]].script.onload = this._loaded.bind(
          this,
          scripts[i]
        );
        this.scripts[scripts[i]].script.src = TradingView.host + scripts[i];
        document.body.appendChild(this.scripts[scripts[i]].script);
      }
    }
  };
  TradingView.dependenciesManager = new TradingView.DependenciesManager();
  TradingView.WidgetAbstract.prototype = {
    fixSize: function(size) {
      return /^[0-9]+(\.|,[0-9])*$/.test(size) ? size + "px" : size;
    },
    width: function() {
      if (this.options.autosize) {
        return "100%";
      }
      return TradingView.WidgetAbstract.prototype.fixSize(this.options.width);
    },
    height: function() {
      if (this.options.autosize) {
        return "100%";
      }
      return TradingView.WidgetAbstract.prototype.fixSize(this.options.height);
    },
    addWrapperFrame: function(widgetCode, logoCode, widgetBgColor) {
      var height = TradingView.WidgetAbstract.prototype.height.call(this);
      var width = TradingView.WidgetAbstract.prototype.width.call(this);
      var widgetBgColor = widgetBgColor || "transparent";
      return (
        '<div id="' +
        this.id +
        '-wrapper" style="' +
        "position: relative;" +
        "box-sizing: content-box;" +
        "width: " +
        width +
        ";" +
        "height: " +
        height +
        ";" +
        "margin: 0 auto !important;" +
        "padding: 0 !important;" +
        "font-family:Arial,sans-serif;" +
        '">' +
        '<div style="' +
        "width: " +
        width +
        ";" +
        "height: " +
        height +
        ";" +
        "background: " +
        widgetBgColor +
        ";" +
        "padding: 0 !important;" +
        '">' +
        widgetCode +
        "</div>" +
        (logoCode || "") +
        "</div>"
      );
    },
    addFooterLogo: function(widgetCode, options) {
      var greyText = (options || {}).greyText || "powered by";
      var linkText = (options || {}).linkText || "tradingview.com";
      var href = (options || {}).href || "https://www.tradingview.com/";
      return TradingView.WidgetAbstract.prototype.addWrapperFrame.call(
        this,
        widgetCode,
        '<div style="' +
          "position:absolute;" +
          "display: block;" +
          "box-sizing: content-box;" +
          "height: 24px;" +
          "width: " +
          TradingView.WidgetAbstract.prototype.width.call(this) +
          ";" +
          "bottom: 0;" +
          "left: 0;" +
          "margin: 0;" +
          "padding: 0;" +
          "font-family: Arial,sans-serif;" +
          '">' +
          '<div style="' +
          "display: block;" +
          "margin: 0 1px 1px 1px;" +
          "line-height: 7px;" +
          "box-sizing: content-box;" +
          "height: 11px;" +
          "padding: 6px 10px;" +
          "text-align: right;" +
          "background: #fff;" +
          '">' +
          "<a" +
          ' href="' +
          href +
          "?" +
          TradingView.generateUtmForUrlParams(this.options) +
          '"' +
          ' target="_blank"' +
          ' style="' +
          "color: #0099d4;" +
          "text-decoration: none;" +
          "font-size: 11px;" +
          '"' +
          ">" +
          '<span style="' +
          "color: #b4b4b4;" +
          "font-size: 11px;" +
          '">' +
          greyText +
          "</span> " +
          linkText +
          "</a>" +
          "</div>" +
          "</div>",
        "#fff"
      );
    }
  };
  TradingView.UserInfoWidget.prototype = {
    createWidget: function() {
      var widget_html = this.widgetCode();
      addWidget(widget_html, this.options.container);
    },
    widgetCode: function() {
      var query = TradingView.createUrlParams({
        username: this.options.username,
        locale: this.options.locale
      });
      this.options.type = "user-info";
      var utm =
        "&" +
        TradingView.generateUtmForUrlParams(this.options, {
          type: "UserInfoWidget"
        });
      var widget_url =
        TradingView.ideasHost + "/user-info-widget/?" + query + utm;
      return (
        "<iframe" +
        ' src="' +
        widget_url +
        '"' +
        (this.options.width ? ' width="' + this.options.width + '"' : "") +
        (this.options.height ? ' height="' + this.options.height + '"' : "") +
        ' frameborder="0" allowTransparency="true" scrolling="no"></iframe>'
      );
    }
  };
  TradingView.ChatWidgetEmbed.prototype = {
    createWidget: function() {
      var widget_code = this.widgetCode();
      widget_code = TradingView.WidgetAbstract.prototype.addFooterLogo.call(
        this,
        widget_code
      );
      addWidget(widget_code, this.options.container);
    },
    widgetCode: function() {
      var room = this.options.room
        ? "#" + encodeURIComponent(this.options.room)
        : "";
      var query =
        "&" +
        TradingView.createUrlParams({
          whotrades: this.options.whotrades,
          locale: this.options.locale
        });
      var utm = TradingView.generateUtmForUrlParams(this.options, {
        type: "UserInfoWidget"
      });
      var widget_url =
        TradingView.chatHost + "/chatwidgetembed/?" + utm + query + room;
      return (
        "<iframe" +
        ' src="' +
        widget_url +
        '"' +
        (this.options.width ? ' width="' + this.options.width + '"' : "") +
        (this.options.height ? ' height="' + this.options.height + '"' : "") +
        ' frameborder="0" allowTransparency="true" scrolling="no"></iframe>'
      );
    }
  };
  TradingView.IdeaWidget.prototype = {
    createWidget: function() {
      var widget_html = this.widgetCode();
      addWidget(widget_html, this.options.container);
      var self = this;
      var c = document.getElementById(this.id);
      this.postMessage = TradingView.postMessageWrapper(
        c.contentWindow,
        this.id
      );
      this.postMessage.on(
        "resize",
        function(data) {
          if (data.id === self.id) {
            c.style.height = data.height + "px";
          }
        },
        true
      );
    },
    widgetCode: function() {
      var query = TradingView.createUrlParams({
        id: this.id,
        width: this.options.width,
        height: this.options.height,
        idea: this.options.idea,
        chart_url: this.options.chartUrl,
        whotrades: this.options.whotrades,
        locale: this.options.locale
      });
      this.options.type = "idea";
      var utm = "&" + TradingView.generateUtmForUrlParams(this.options);
      var widget_url = TradingView.ideasHost + "/idea-popup/?" + query + utm;
      return (
        '<iframe id="' +
        this.id +
        '"' +
        ' src="' +
        widget_url +
        '"' +
        ' width="' +
        this.options.width +
        '"' +
        (this.options.height ? ' height="' + this.options.height + '"' : "") +
        ' frameborder="0" allowTransparency="true" scrolling="no"></iframe>'
      );
    },
    getSymbol: function(callback) {
      this.postMessage.on("symbolInfo", callback);
    }
  };
  TradingView.EventsWidget.prototype = {
    createWidget: function() {
      var widget_html = this.widgetCode();
      addWidget(widget_html, this.options.container);
    },
    widgetCode: function() {
      var query = TradingView.createUrlParams({
        currency: this.options.currency,
        importance: this.options.importance
      });
      this.options.type = "events";
      var utm = "&" + TradingView.generateUtmForUrlParams(this.options);
      var widget_url = TradingView.host + "/eventswidgetembed/?" + query + utm;
      return (
        '<iframe src="' +
        widget_url +
        '"' +
        ' width="' +
        this.options.width +
        '"' +
        (this.options.height ? ' height="' + this.options.height + '"' : "") +
        ' frameborder="0" scrolling="no"></iframe>'
      );
    }
  };
  TradingView.IdeasStreamWidget.prototype = {
    createWidget: function() {
      var widget_html = this.widgetCode();
      addWidget(widget_html, this.options.container);
      var self = this;
      var c = document.getElementById(this.id);
      this.postMessage = TradingView.postMessageWrapper(
        c.contentWindow,
        this.id
      );
      TradingView.bindEvent(c, "load", function() {
        self._ready = true;
        for (var i = self._ready_handlers.length; i--; ) {
          self._ready_handlers[i].call(self);
        }
      });
      self.postMessage.on(
        "resize",
        function(data) {
          if (data.id === self.id) {
            var minHeight = 450;
            var height = Math.max(data.height, minHeight);
            c.style.height = height + "px";
          }
        },
        true
      );
    },
    widgetCode: function() {
      var options = this.options;
      var query = TradingView.createUrlParams({
        id: this.id,
        width: options.width,
        height: options.height,
        symbol: options.symbol,
        username: options.username,
        mode: options.mode,
        publish_source: options.publishSource,
        sort: options.sort,
        stream: options.stream,
        interval: options.interval,
        time: options.time,
        wait_symbol: options.waitSymbol,
        hide_desc: options.hideDescription,
        s_count: options.startingCount,
        bg_color: options.bgColor,
        h_color: options.headerColor,
        borderColor: options.borderColor,
        locale: options.locale
      });
      var utm = TradingView.generateUtmForUrlParams(this.options) + "&";
      var widget_url = TradingView.host + "/ideaswidgetembed/?" + utm + query;
      return (
        '<iframe id="' +
        this.id +
        '"' +
        ' src="' +
        widget_url +
        '"' +
        ' width="' +
        options.width +
        '"' +
        (options.height ? ' height="' + options.height + '"' : "") +
        ' frameborder="0" allowTransparency="true" scrolling="no"></iframe>'
      );
    },
    setSymbol: function(symbol) {
      var c = document.getElementById(this.id);
      this.postMessage.post(c.contentWindow, "setSymbol", symbol);
    },
    ready: function(callback) {
      if (this._ready) {
        callback.call(this);
      } else {
        this._ready_handlers.push(callback);
      }
    }
  };
  TradingView.MiniWidget.prototype = {
    createWidget: function() {
      var widget_code = this.widgetCode();
      var options = this.options;
      if (!options.noLogoOverlay && !options.whitelabel) {
        var greyText = this.options.greyText || "Quotes by";
        widget_code = TradingView.WidgetAbstract.prototype.addFooterLogo.call(
          this,
          widget_code,
          { greyText: greyText, linkText: "TradingView" }
        );
      }
      addWidget(widget_code, options.container);
    },
    widgetCode: function() {
      var symbols = "";
      var tabs = "";
      var symbols_description = "";
      var site_path = "/miniwidgetembed/";
      var width = this.options.width
        ? "&width=" + encodeURIComponent(this.options.width)
        : "";
      var height = this.options.height
        ? "&height=" + encodeURIComponent(this.options.height)
        : "";
      var no_graph = this.options.noGraph
        ? "&noGraph=" + encodeURIComponent(this.options.noGraph)
        : "";
      var locale = this.options.locale
        ? "&locale=" + encodeURIComponent(this.options.locale)
        : "";
      var whitelabel = this.options.whitelabel ? "&whitelabel=1" : "";
      this.options.type = "market-overview";
      var utm = "&" + TradingView.generateUtmForUrlParams(this.options);
      var plain_params_list = [
        "large_chart_url",
        "large_chart_target",
        "gridLineColor",
        "fontColor",
        "underLineColor",
        "trendLineColor",
        "activeTickerBackgroundColor",
        "timeAxisBackgroundColor",
        "locale",
        "styleTickerActiveBg",
        "styleTabActiveBorderColor",
        "styleTickerBodyFontSize",
        "styleTickerBodyFontWeight",
        "styleTickerHeadFontSize",
        "styleTickerHeadFontWeight",
        "styleTickerChangeDownColor",
        "styleTickerChangeUpColor",
        "styleTickerLastDownBg",
        "styleTickerLastUpBg",
        "styleTickerSymbolColor",
        "styleTickerSymbolHoverTextDecoration",
        "styleTickerActiveSymbolTextDecoration",
        "styleTabsActiveBorderColor",
        "styleTabsNoBorder",
        "styleWidgetNoBorder"
      ];
      var plain_params = "";
      for (var i = plain_params_list.length - 1; i >= 0; i--) {
        var param_name = plain_params_list[i];
        var param_value = this.options[param_name];
        plain_params += param_value
          ? "&" + param_name + "=" + encodeURIComponent(param_value)
          : "";
      }
      var prepareSymbols = function(symbols) {
        var _symbols = [];
        for (var i = 0; i < symbols.length; i++) {
          var _s = symbols[i];
          if (TradingView.isArray(_s)) {
            var customSymbolName = encodeURIComponent(_s[0]);
            var trueSymbolName = encodeURIComponent(_s[1]);
            _symbols.push(customSymbolName);
            symbols_description +=
              "&" + customSymbolName + "=" + trueSymbolName;
          } else if (typeof _s === "string") {
            _symbols.push(encodeURIComponent(_s));
          }
        }
        return _symbols.join(",");
      };
      if (this.options.tabs) {
        for (var i = 0, tl = this.options.tabs.length; i < tl; i++) {
          var tab = this.options.tabs[i];
          if (this.options.symbols[tab]) {
            symbols +=
              (symbols ? "&" : "") +
              encodeURIComponent(tab) +
              "=" +
              prepareSymbols(this.options.symbols[tab]);
          }
        }
        tabs = "&tabs=" + encodeURIComponent(this.options.tabs.join(","));
      } else {
        if (this.options.symbols) {
          symbols = "symbols=" + prepareSymbols(this.options.symbols);
        }
      }
      if (this.options.symbols_description) {
        for (var key in this.options.symbols_description) {
          symbols_description +=
            "&" +
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(this.options.symbols_description[key]);
        }
      }
      if (this.options.customer) {
        site_path = "/" + this.options.customer + site_path;
      }
      var widget_url =
        TradingView.host +
        site_path +
        "?" +
        symbols +
        tabs +
        symbols_description +
        plain_params +
        width +
        height +
        no_graph +
        locale +
        whitelabel +
        utm;
      return (
        '<iframe id="' +
        this.id +
        '"' +
        ' src="' +
        widget_url +
        '"' +
        ' width="' +
        this.options.width +
        '"' +
        (this.options.height ? ' height="' + this.options.height + '"' : "") +
        ' frameborder="0"' +
        ' allowTransparency="true"' +
        ' scrolling="no"' +
        ' style="margin: 0 !important; padding: 0 !important;"' +
        "></iframe>"
      );
    },
    remove: function() {
      var widget = document.getElementById("tradingview_widget");
      widget.parentNode.removeChild(widget);
    }
  };
  TradingView.MediumWidget.prototype = {
    createWidget: function() {
      var widget_code = this.widgetCode();
      addWidget(widget_code, this.options.container);
    },
    widgetCode: function() {
      var symbols_description = "";
      var symbols = "symbols=" + prepareSymbols(this.options.symbols);
      var width = "&width=" + encodeURIComponent(this.options.width);
      var height = "&height=" + encodeURIComponent(this.options.height);
      var colorTheme =
        "&colorTheme=" + encodeURIComponent(this.options.colorTheme);
      this.options.type = "symbol-overview";
      var utm = "&" + TradingView.generateUtmForUrlParams(this.options);
      function prepareSymbols(symbols) {
        var _symbols = [];
        for (var i = 0; i < symbols.length; i++) {
          var _s = symbols[i];
          if (TradingView.isArray(_s)) {
            var customSymbolName = encodeURIComponent(_s[0]);
            var trueSymbolName = encodeURIComponent(_s[1]);
            _symbols.push(customSymbolName);
            if (_s.length === 2) {
              symbols_description +=
                "&" + customSymbolName + "=" + trueSymbolName;
            }
          } else if (typeof _s === "string") {
            _symbols.push(encodeURIComponent(_s));
          }
        }
        return _symbols.join(",");
      }
      var plain_params_list = [
        "gridLineColor",
        "fontColor",
        "underLineColor",
        "trendLineColor",
        "activeTickerBackgroundColor",
        "timeAxisBackgroundColor",
        "locale"
      ];
      var plain_params = "";
      for (var i = plain_params_list.length - 1; i >= 0; i--) {
        var param_name = plain_params_list[i];
        var param_value = this.options[param_name];
        plain_params += param_value
          ? "&" + param_name + "=" + encodeURIComponent(param_value)
          : "";
      }
      var chart_only = this.options.chartOnly ? "&chartOnly=1" : "";
      var whitelabel = this.options.whitelabel ? "&whitelabel=1" : "";
      var isTransparent = this.options.isTransparent ? "&isTransparent=1" : "";
      var site_path = "/mediumwidgetembed/";
      if (this.options.customer) {
        site_path = "/" + this.options.customer + site_path;
      }
      var widget_url =
        TradingView.host +
        site_path +
        "?" +
        symbols +
        symbols_description +
        plain_params +
        chart_only +
        whitelabel +
        width +
        height +
        colorTheme +
        isTransparent +
        utm;
      return (
        '<iframe id="' +
        this.id +
        '"' +
        ' src="' +
        widget_url +
        '"' +
        ' style="' +
        "margin: 0 !important; " +
        "padding: 0 !important; " +
        (this.options.width ? "width: " + this.options.width + "; " : "") +
        (this.options.height ? "height: " + this.options.height + ";" : "") +
        '"' +
        ' frameborder="0" allowTransparency="true" scrolling="no"></iframe>'
      );
    },
    remove: function() {
      var widget = document.getElementById("tradingview_widget");
      widget.parentNode.removeChild(widget);
    }
  };
  TradingView.widget.prototype = {
    create: function() {
      this.options.type = this.options.fundamental ? "fundamental" : "chart";
      var widget_html = this.render();
      var self = this;
      if (!this.options.noLogoOverlay) {
        widget_html = TradingView.WidgetAbstract.prototype.addWrapperFrame.call(
          this,
          widget_html
        );
      }
      addWidget(widget_html, this.options.container);
      var oldStyleCopyright = document.getElementById("tradingview-copyright");
      oldStyleCopyright &&
        oldStyleCopyright.parentElement &&
        oldStyleCopyright.parentElement.removeChild(oldStyleCopyright);
      this.iframe = document.getElementById(this.id);
      this.postMessage = TradingView.postMessageWrapper(
        this.iframe.contentWindow,
        this.id
      );
      TradingView.bindEvent(this.iframe, "load", function() {
        self.postMessage.get("widgetReady", {}, function() {
          var i;
          self._ready = true;
          for (i = self._ready_handlers.length; i--; ) {
            self._ready_handlers[i].call(self);
          }
        });
      });
      self.postMessage.on("logoCreated", function(data) {
        if (
          data.left &&
          data.bottom &&
          data.width &&
          data.height &&
          data.href
        ) {
          if (self._logoOverlay) {
            self._logoOverlay.parentNode.removeChild(self._logoOverlay);
            delete self._logoOverlay;
          }
          var a = document.createElement("a");
          if (data.text) {
            a.innerHTML = data.text;
            a.style.color = "transparent";
          }
          a.style.position = "absolute";
          a.style.display = "inline-block";
          a.style.left = data.left;
          a.style.bottom = data.bottom;
          a.style.width = data.width;
          a.style.height = data.height;
          a.style.backgroundColor = "transparent";
          a.style.pointerEvents = "none";
          a.href = data.href;
          a.setAttribute("target", "_blank");
          self._logoOverlay = a;
          document.getElementById(self.id + "-wrapper").appendChild(a);
        }
      });
      self.postMessage.on("setLogoOverlayVisibility", function(data) {
        if (self._logoOverlay && data && typeof data.visible == "boolean") {
          self._logoOverlay.style.display = data.visible
            ? "inline-block"
            : "none";
        }
      });
      self.postMessage.on("openChartInPopup", function(data) {
        var urlOptions = TradingView.cloneSimpleObject(self.options);
        var chartProps = ["symbol", "interval"];
        for (var i = chartProps.length - 1; i >= 0; i--) {
          var name = chartProps[i];
          var value = data[name];
          if (value) {
            urlOptions[name] = value;
          }
        }
        urlOptions.show_popup_button = false;
        var width = self.options.popup_width || 900;
        var height = self.options.popup_height || 600;
        var left = (screen.width - width) / 2;
        var top = (screen.height - height) / 2;
        var popup = window.open(
          self.generateUrl(urlOptions),
          "_blank",
          "resizable=yes, top=" +
            top +
            ", left=" +
            left +
            ", width=" +
            width +
            ", height=" +
            height
        );
        if (popup) {
          popup.opener = null;
        }
      });
    },
    ready: function(callback) {
      if (this._ready) {
        callback.call(this);
      } else {
        this._ready_handlers.push(callback);
      }
    },
    render: function() {
      var url = this.generateUrl();
      return (
        "<iframe" +
        ' id="' +
        this.id +
        '"' +
        ' src="' +
        url +
        '"' +
        ' style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;"' +
        ' frameborder="0" allowTransparency="true" scrolling="no" allowfullscreen></iframe>'
      );
    },
    generateUrl: function(options) {
      var options = options || this.options;
      var site_path;
      if (options.customer === "cme") {
        site_path = "/cmewidgetembed/";
      } else if (options.customer) {
        site_path = "/" + options.customer + "/widgetembed/";
      } else {
        site_path = "/widgetembed/";
      }
      function argZeroOneEmpty(name, argNameOverride) {
        argNameOverride = argNameOverride || name;
        return options[name] === undefined
          ? ""
          : "&" +
              encodeURIComponent(argNameOverride) +
              "=" +
              (options[name] ? "1" : "0");
      }
      function arg(name, content, argNameOverride) {
        argNameOverride = argNameOverride || name;
        return options[name] ? "&" + argNameOverride + "=" + content : "";
      }
      function jsonArg(name, content, defaultValue) {
        defaultValue = defaultValue || {};
        return (
          "&" +
          name +
          "=" +
          (options[name]
            ? encodeURIComponent(JSON.stringify(content))
            : encodeURIComponent(JSON.stringify(defaultValue)))
        );
      }
      function studiesArg() {
        if (!options.studies || !TradingView.isArray(options.studies)) {
          return "";
        }
        if (typeof options.studies[0] === "string") {
          return arg("studies", encodeURIComponent(options.studies.join("")));
        }
        return jsonArg("studies", options.studies);
      }
      var host = options.enable_publishing
        ? TradingView.ideasHost
        : TradingView.host;
      var url =
        host +
        site_path +
        "?frameElementId=" +
        this.id +
        "&symbol=" +
        encodeURIComponent(options.symbol) +
        "&interval=" +
        encodeURIComponent(options.interval) +
        (options.range ? "&range=" + encodeURIComponent(options.range) : "") +
        (options.whitelabel ? "&whitelabel=1" : "") +
        (options.hide_top_toolbar ? "&hidetoptoolbar=1" : "") +
        (options.hide_legend ? "&hidelegend=1" : "") +
        argZeroOneEmpty("hide_side_toolbar", "hidesidetoolbar") +
        argZeroOneEmpty("allow_symbol_change", "symboledit") +
        argZeroOneEmpty("save_image", "saveimage") +
        "&toolbarbg=" +
        options.toolbar_bg.replace("#", "") +
        (options.watchlist && options.watchlist.length && options.watchlist.join
          ? "&watchlist=" + encodeURIComponent(options.watchlist.join(""))
          : "") +
        arg("editablewatchlist", "1") +
        arg("details", "1") +
        arg("calendar", "1") +
        arg("hotlist", "1") +
        arg("news", "1") +
        studiesArg() +
        (options.news_vendors
          ? "&newsvendors=" + encodeURIComponent(options.news_vendors.join(""))
          : "") +
        argZeroOneEmpty("horztouchdrag") +
        argZeroOneEmpty("verttouchdrag") +
        arg("widgetbar_width", options.widgetbar_width, "widgetbarwidth") +
        arg("hideideas", "1") +
        arg("theme", encodeURIComponent(options.theme)) +
        arg("style", encodeURIComponent(options.style)) +
        (options.extended_hours === undefined
          ? ""
          : "&extended_hours=" + options.extended_hours) +
        arg("timezone", encodeURIComponent(options.timezone)) +
        arg("hideideasbutton", "1") +
        arg("withdateranges", "1") +
        arg("hidevolume", "1") +
        (options.padding === undefined ? "" : "&padding=" + options.padding) +
        arg("show_popup_button", "1", "showpopupbutton") +
        jsonArg("studies_overrides", options.studies_overrides, {}) +
        jsonArg("overrides", options.overrides, {}) +
        jsonArg("enabled_features", options.enabled_features, []) +
        jsonArg("disabled_features", options.disabled_features, []) +
        (options.show_popup_button ? "&showpopupbutton=1" : "") +
        (options.publish_source
          ? "&publishsource=" + encodeURIComponent(options.publish_source)
          : "") +
        (options.enable_publishing
          ? "&enablepublishing=" + encodeURIComponent(options.enable_publishing)
          : "") +
        (options.venue ? "&venue=" + encodeURIComponent(options.venue) : "") +
        (options.symbology
          ? "&symbology=" + encodeURIComponent(options.symbology)
          : "") +
        (options.whotrades
          ? "&whotrades=" + encodeURIComponent(options.whotrades)
          : "") +
        (options.locale ? "&locale=" + options.locale : "") +
        (options.referral_id ? "&referral_id=" + options.referral_id : "") +
        (options.no_referral_id ? "&no_referral_id=1" : "") +
        (options.ref_landing_page
          ? "&ref_landing_page=" + options.ref_landing_page
          : "") +
        (options.fundamental
          ? "&fundamental=" + encodeURIComponent(options.fundamental)
          : "") +
        (options.percentage
          ? "&percentage=" + encodeURIComponent(options.percentage)
          : "") +
        "&utm_source=" +
        encodeURI(window.location.hostname) +
        "&utm_medium=" +
        (TradingView.hasCopyright(options.container)
          ? "widget_new"
          : "widget") +
        (options.type ? "&utm_campaign=" + options.type : "") +
        (options.type && options.type === "chart"
          ? "&utm_term=" + encodeURIComponent(options.symbol)
          : "");
      return url;
    },
    image: function(callback) {
      this.postMessage.get("imageURL", {}, function(id) {
        var link = TradingView.host + "/x/" + id + "/";
        callback(link);
      });
    },
    subscribeToQuote: function(callback) {
      var c = document.getElementById(this.id);
      this.postMessage.post(c.contentWindow, "quoteSubscribe");
      this.postMessage.on("quoteUpdate", callback);
    },
    getSymbolInfo: function(callback) {
      this.postMessage.get("symbolInfo", {}, callback);
    },
    remove: function() {
      var widget = document.getElementById(this.id);
      widget.parentNode.removeChild(widget);
    },
    reload: function() {
      var widget = document.getElementById(this.id);
      var parent = widget.parentNode;
      parent.removeChild(widget);
      parent.innerHTML = this.render();
    }
  };
  TradingView.chart.prototype = {
    create: function() {
      this.isMobile = TradingView.isMobileDevice.any;
      var chart_html = this.render();
      var self = this;
      var c;
      if (!TradingView.chartCssAttached) {
        TradingView.css(this.renderCss());
        TradingView.chartCssAttached = true;
      }
      addWidget(chart_html, this.options.container);
      c = document.getElementById(this.id);
      TradingView.bindEvent(c, "load", function() {
        var i;
        self._ready = true;
        for (i = self._ready_handlers.length; i--; ) {
          self._ready_handlers[i].call(self);
        }
      });
      TradingView.onready(function() {
        var rf = false;
        if (
          document.querySelector &&
          document.querySelector('a[href$="/v/' + self.options.chart + '/"]')
        ) {
          rf = true;
        }
        if (!rf) {
          var anchors = document.getElementsByTagName("a");
          var re_short = new RegExp("/v/" + self.options.chart + "/$");
          var re_full = new RegExp(
            "/chart/([0-9a-zA-Z:+*-/()]+)/" + self.options.chart
          );
          for (var i = 0; i < anchors.length; i++) {
            if (
              re_short.test(anchors[i].href) ||
              re_full.test(anchors[i].href)
            ) {
              rf = true;
              break;
            }
          }
        }
        if (rf) {
          c.src += "#nolinks";
          c.name = "nolinks";
        }
      });
      this.postMessage = TradingView.postMessageWrapper(
        c.contentWindow,
        this.id
      );
      this.postMessage.on(
        "toggleFullscreen",
        function(data) {
          if (c.contentWindow === this.source) {
            self.toggleFullscreen(data.value);
          }
        },
        true
      );
    },
    ready: TradingView.widget.prototype.ready,
    renderCss: function() {
      return ".tradingview-widget {position: relative;}";
    },
    render: function() {
      var url =
        this.options.mobileStatic && this.isMobile
          ? TradingView.host + "/embed-static/"
          : TradingView.host + "/embed/";
      var queryString =
        "?method=script" +
        (this.options.locale
          ? "&locale=" + encodeURIComponent(this.options.locale)
          : "");
      this.options.type = "chart";
      return (
        '<div class="tradingview-widget" ' +
        (this.options.autosize
          ? ' style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;"'
          : ' style="width:' +
            this.options.width +
            "px;" +
            " height:" +
            this.options.height +
            'px;"') +
        ">" +
        '<iframe id="' +
        this.id +
        '"' +
        ' src="' +
        url +
        this.options.chart +
        "/" +
        queryString +
        "&" +
        TradingView.generateUtmForUrlParams(this.options) +
        '"' +
        (this.options.autosize
          ? ' style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;"'
          : ' width="' +
            this.options.width +
            '"' +
            ' height="' +
            this.options.height +
            '"') +
        ' frameborder="0" allowTransparency="true" scrolling="no"></iframe>' +
        "</div>"
      );
    },
    toggleFullscreen: function(isFullScreen) {
      var frame = document.getElementById(this.id);
      if (!isFullScreen) {
        frame.style.position = "static";
        if (this.options.autosize) {
          frame.style.width = "100%";
          frame.style.height = "100%";
        } else {
          frame.style.width = this.options.width + "px";
          frame.style.height = this.options.height + "px";
        }
        frame.style.maxWidth = "none";
        frame.style.maxHeight = "none";
        frame.style.zIndex = "auto";
        frame.style.backgroundColor = "transparent";
      } else {
        frame.style.position = "fixed";
        frame.style.width = "100vw";
        frame.style.maxWidth = "100%";
        frame.style.height = "100vh";
        frame.style.maxHeight = "100%";
        frame.style.left = "0px";
        frame.style.top = "0px";
        frame.style.zIndex = "1000000";
        frame.style.backgroundColor = "#fff";
      }
    },
    getSymbolInfo: function(callback) {
      this.postMessage.get("symbolInfo", {}, callback);
    }
  };
  TradingView.stream.prototype = {
    create: function() {
      this.isMobile = TradingView.isMobileDevice.any;
      var chart_html = this.render();
      addWidget(chart_html, this.options.container);
    },
    render: function() {
      var queryString =
        "?" +
        (this.options.locale
          ? "&locale=" + encodeURIComponent(this.options.locale)
          : "");
      this.options.type = "chart";
      return (
        '<div class="tradingview-widget" ' +
        (this.options.autosize
          ? ' style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;"'
          : ' style="width:' +
            this.options.width +
            "px;" +
            " height:" +
            this.options.height +
            'px;"') +
        ">" +
        '<iframe id="' +
        this.id +
        '"' +
        ' src="' +
        TradingView.host +
        this.options.stream +
        "/embed/" +
        queryString +
        "&" +
        TradingView.generateUtmForUrlParams(this.options) +
        '"' +
        (this.options.autosize
          ? ' style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;"'
          : ' width="' +
            this.options.width +
            '"' +
            ' height="' +
            this.options.height +
            '"') +
        ' frameborder="0" allowTransparency="true" scrolling="no"></iframe>' +
        "</div>"
      );
    }
  };
  TradingView.showSignIn = function(options, callback) {
    TradingView.dependenciesManager.depends(
      ["/static/bundles/spinner.js"],
      "authWidget",
      function() {
        var shadowBox = document.createElement("div");
        var spinnerContainer = document.createElement("div");
        shadowBox.appendChild(spinnerContainer);
        new window.Spinner()
          .setStyle({ color: "#00A2E2", opacity: "0" })
          .spin(spinnerContainer);
        shadowBox.style.cssText =
          "position: fixed;" +
          "left: 0;" +
          "top: 0;" +
          "width: 100%;" +
          "height: 100%;" +
          "background: rgba(0, 0, 0, 0.5);" +
          "z-index: 120;" +
          "-webkit-transform: translate3d(0, 0, 0);";
        shadowBox.addEventListener("click", function() {
          document.body.removeChild(shadowBox);
        });
        document.body.appendChild(shadowBox);
        var id = TradingView.gId();
        var query = TradingView.createUrlParams({
          id: id,
          utmSourceOverride: options.utmSourceOverride
        });
        var widget_url = TradingView.ideasHost + "/authwidget/?" + query;
        var iframeOptions = { width: "470px", height: "650px" };
        var widget_html =
          '<iframe id="' +
          id +
          '"' +
          ' src="' +
          widget_url +
          '"' +
          ' width="' +
          iframeOptions.width +
          '"' +
          (iframeOptions.height
            ? ' height="' + iframeOptions.height + '"'
            : "") +
          ' frameborder="0" allowTransparency="true" scrolling="no"></iframe>';
        var container = document.createElement("div");
        container.innerHTML = widget_html;
        container.style.cssText =
          "position: absolute;" +
          "left: 50%;" +
          "top: 50%;" +
          "margin-top: -325px;" +
          "margin-left: -235px;";
        shadowBox.appendChild(container);
        var c = document.getElementById(id);
        var postMessage = TradingView.postMessageWrapper(c.contentWindow, id);
        var onClose = function(data) {
          if (data.id === id) {
            document.body.removeChild(shadowBox);
            if (data.user) {
              callback(data.user);
            }
            postMessage.off("close", onClose);
          }
        };
        postMessage.on("close", onClose, true);
        postMessage.on("widgetLoad", function() {
          spinnerContainer.style.display = "none";
        });
      }
    );
  };
  TradingView.isSignedIn = function(options, callback) {
    var id = TradingView.gId();
    var query = TradingView.createUrlParams({ id: id });
    var widget_url = TradingView.ideasHost + "/isauthwidget/?" + query;
    var widget_html =
      '<iframe id="' +
      id +
      '"' +
      ' src="' +
      widget_url +
      '"' +
      ' frameborder="0" allowTransparency="true" scrolling="no"></iframe>';
    var container = document.createElement("div");
    container.innerHTML = widget_html;
    document.body.appendChild(container);
    var c = document.getElementById(id);
    var postMessage = TradingView.postMessageWrapper(c.contentWindow, id);
    var onClose = function(data) {
      if (data.id === id) {
        document.body.removeChild(container);
        callback(data.user);
        postMessage.off("close", onClose);
      }
    };
    postMessage.on("close", onClose, true);
  };
  TradingView.onLoginStateChange = function(options, callback) {
    var id = TradingView.gId();
    var query = TradingView.createUrlParams({ id: id });
    var widget_url = TradingView.ideasHost + "/loginstatewidget/?" + query;
    var widget_html =
      '<iframe id="' +
      id +
      '"' +
      ' src="' +
      widget_url +
      '"' +
      ' frameborder="0" allowTransparency="true" scrolling="no"></iframe>';
    var container = document.createElement("div");
    container.innerHTML = widget_html;
    document.body.appendChild(container);
    var c = document.getElementById(id);
    var postMessage = TradingView.postMessageWrapper(c.contentWindow, id);
    var onLoginStateChange = function(data) {
      if (data.id === id) {
        callback(data.user);
      }
    };
    postMessage.on("loginStateChange", onLoginStateChange, true);
  };
  TradingView.postMessageWrapper = (function() {
    var get_handlers = {};
    var on_handlers = {};
    var client_targets = {};
    var on_target;
    var call_id = 0;
    var post_id = 0;
    var provider_id = "TradingView";
    if (window.addEventListener) {
      window.addEventListener("message", function(e) {
        var msg;
        try {
          msg = JSON.parse(e.data);
        } catch (error) {
          return;
        }
        if (!msg || !msg.provider || msg.provider !== provider_id) {
          return;
        }
        msg.source = e.source;
        if (msg.type === "get") {
          if (!on_handlers[msg.name]) {
            return;
          }
          on_handlers[msg.name].forEach(function(on_handler) {
            if (typeof on_handler === "function") {
              on_handler.call(msg, msg.data, function(result) {
                var reply = {
                  id: msg.id,
                  type: "on",
                  name: msg.name,
                  client_id: msg.client_id,
                  data: result,
                  provider: provider_id
                };
                on_target.postMessage(JSON.stringify(reply), "*");
              });
            }
          });
        } else if (msg.type === "on") {
          if (
            get_handlers[msg.client_id] &&
            get_handlers[msg.client_id][msg.id]
          ) {
            get_handlers[msg.client_id][msg.id].call(msg, msg.data);
            delete get_handlers[msg.client_id][msg.id];
          }
        } else if (msg.type === "post") {
          if (!on_handlers[msg.name]) {
            return;
          }
          on_handlers[msg.name].forEach(function(on_handler) {
            if (typeof on_handler === "function") {
              on_handler.call(msg, msg.data, function() {});
            }
          });
        }
      });
    }
    return function(target, client_id) {
      get_handlers[client_id] = {};
      client_targets[client_id] = target;
      on_target = target;
      return {
        on: function(name, callback, keepPrevious) {
          if (!on_handlers[name] || !keepPrevious) {
            on_handlers[name] = [];
          }
          on_handlers[name].push(callback);
        },
        off: function(name, callback) {
          if (!on_handlers[name]) {
            return false;
          }
          var index = on_handlers[name].indexOf(callback);
          if (index > -1) {
            on_handlers[name].splice(index, 1);
          }
        },
        get: function(name, data, callback) {
          var msg = {
            id: call_id++,
            type: "get",
            name: name,
            client_id: client_id,
            data: data,
            provider: provider_id
          };
          get_handlers[client_id][msg.id] = callback;
          client_targets[client_id].postMessage(JSON.stringify(msg), "*");
        },
        post: function(target, name, data) {
          var msg = {
            id: post_id++,
            type: "post",
            name: name,
            data: data,
            provider: provider_id
          };
          if (target && typeof target.postMessage === "function") {
            target.postMessage(JSON.stringify(msg), "*");
          }
        }
      };
    };
  })();
  TradingView.getUrlParams = function() {
    var pl = /\+/g;
    var search = /([^&=]+)=?([^&]*)/g;
    var query = window.location.search.substring(1);
    var match = search.exec(query);
    var decode = function(s) {
      return decodeURIComponent(s.replace(pl, " "));
    };
    var result = {};
    while (match) {
      result[decode(match[1])] = decode(match[2]);
      match = search.exec(query);
    }
    return result;
  };
  TradingView.createUrlParams = function(data) {
    var result = [];
    for (var d in data) {
      if (data.hasOwnProperty(d) && data[d] != null) {
        result.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
      }
    }
    return result.join("&");
  };
  var addWidget = function(widgetHtml, containerId) {
    var container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = widgetHtml;
      var copyrightElement =
        container.parentElement &&
        container.parentElement.querySelector(".tradingview-widget-copyright");
      if (copyrightElement) {
        copyrightElement.style.width = container.querySelector(
          "iframe"
        ).style.width;
      }
    } else {
      document.write(widgetHtml);
    }
    document.body.appendChild(TradingView.embedStylesForCopyright());
  };
  var merge = function(obj1, obj2) {
    for (var i in obj2) {
      if ("object" !== typeof obj2[i] || !obj1.hasOwnProperty(i)) {
        obj1[i] = obj2[i];
      } else {
        merge(obj1[i], obj2[i]);
      }
    }
    return obj1;
  };
  if (window.TradingView) {
    merge(window.TradingView, TradingView);
  } else {
    window.TradingView = TradingView;
  }
})();
