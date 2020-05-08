(window.webpackJsonp = window.webpackJsonp || []).push([
  [29],
  {
    L9lC: function(t, e, o) {
      (function(t) {
        function i(t, e, o, i, n) {
          l.call(this, t, e),
            (this._study = o),
            (this._showOnlyConfirmInputs = i),
            (this._symbolSearchZindex = n),
            this.prepareLayout(),
            (this._$symbolSearchPopup = null);
        }
        var n = o("DxCR"),
          s = n.UppercaseTransformer,
          r = n.SymbolBinder,
          a = n.BarTimeBinder,
          p = n.SessionBinder,
          l = n.PropertyPage,
          d = n.GreateTransformer,
          u = n.LessTransformer,
          h = n.ToIntTransformer,
          c = n.ToFloatTransformer,
          f = n.SymbolInfoSymbolTransformer,
          y = n.SimpleComboBinder,
          m = n.BooleanBinder,
          v = n.SimpleStringBinder,
          _ = o("zXvd").NumericFormatter,
          b = o("0YCj"),
          w = o("uOxu").getLogger("Chart.Study.PropertyPage.Inputs"),
          g = o("pZll").symbolSearchUIService;
        inherit(i, l),
          (i.prototype._addSessionEditor = function(t, e, o, i) {
            var n, s, r, a, l, d;
            "session" === o.type
              ? ((n = function(t, e) {
                  var o,
                    i = $("<td/>");
                  i.appendTo(t),
                    i.css("padding-left", "0px"),
                    i.css("padding-right", "0px"),
                    (o = $("<input>")).attr("type", "text"),
                    o.addClass("ticker"),
                    o.css("width", "40px"),
                    o.attr("id", e),
                    o.appendTo(i);
                }),
                (s = function(t, e, o) {
                  var i,
                    n = $("<td/>");
                  n.css("padding-left", o),
                    n.css("padding-right", o),
                    n.appendTo(t),
                    (i = $("<div/>")).appendTo(n),
                    i.append(e),
                    i.css("font-size", "150%");
                }),
                (r = $("<table/>")).appendTo(t),
                (a = $("<tr/>")).appendTo(r),
                (l = [
                  "start_hours",
                  "start_minutes",
                  "end_hours",
                  "end_minutes"
                ]),
                n.call(this, a, l[0]),
                s.call(this, a, ":", 0),
                n.call(this, a, l[1]),
                s.call(this, a, "-", 4),
                n.call(this, a, l[2]),
                s.call(this, a, ":", 0),
                n.call(this, a, l[3]),
                (d = !1),
                this.bindControl(new p(a, l, e, d, this.model(), i)))
              : w.logError("Session editor adding FAILED: wrong input type.");
          }),
          (i.prototype.prepareControl = function(e, o, i) {
            var n,
              s,
              r,
              a,
              p,
              l,
              d,
              u,
              h,
              c,
              f,
              y,
              m,
              v,
              _,
              C,
              x,
              T,
              S,
              k,
              I,
              O = this,
              P = null,
              E = null,
              L = null;
            if ("resolution" === e.type)
              P = $(
                '<select><option value="1">1</option><option value="3">3</option><option value="5">5</option><option value="15">15</option><option value="30">30</option><option value="45">45</option><option value="60">1' +
                  window.t("h", { context: "interval_short" }) +
                  '</option><option value="120">2' +
                  window.t("h", { context: "interval_short" }) +
                  '</option><option value="180">3' +
                  window.t("h", { context: "interval_short" }) +
                  '</option><option value="D">1' +
                  window.t("D", { context: "interval_short" }) +
                  '</option><option value="W">1' +
                  window.t("W", { context: "interval_short" }) +
                  "</option></select>"
              );
            else if ("symbol" === e.type)
              (P = $('<input class="symbol-edit single">')),
                g().bindToInput(P, {
                  onPopupOpen: function(t) {
                    (this._$symbolSearchPopup = t),
                      this._symbolSearchZindex &&
                        t.css("z-index", this._symbolSearchZindex);
                  }.bind(this),
                  onPopupClose: function() {
                    this._$symbolSearchPopup = null;
                  }.bind(this),
                  callback: function(t) {
                    e.value = t;
                  }
                }),
                o.attr("colspan", 5);
            else if ("session" === e.type)
              this._addSessionEditor(o, this._property.inputs[e.id], e, i);
            else if ("source" === e.type) {
              for (
                n = {},
                  s = {
                    open: window.t("open"),
                    high: window.t("high"),
                    low: window.t("low"),
                    close: window.t("close"),
                    hl2: window.t("hl2"),
                    hlc3: window.t("hlc3"),
                    ohlc4: window.t("ohlc4")
                  },
                  r = Object.keys(s),
                  a = 0;
                a < r.length;
                ++a
              )
                n[r[a]] || (n[r[a]] = r[a]);
              if ((p = this._study && this._study.isChildStudy()))
                for (u in ((l = this._study.source().title(!0, null, !0)),
                (d = b.getChildSourceInputTitles(
                  e,
                  this._study.source().metaInfo(),
                  l
                )),
                n))
                  d[u] && (n[u] = 1 === Object.keys(d).length ? l : d[u]);
              if (
                t.enabled("study_on_study") &&
                this._study &&
                b.isSourceInput(e) &&
                (p || b.canBeChild(this._study.metaInfo()))
              ) {
                for (
                  h = (h = [this._study]).concat(this._study.getAllChildren()),
                    c = this._model.model().allStudies(),
                    f = 0;
                  f < c.length;
                  ++f
                )
                  if (((y = c[f]), -1 === h.indexOf(y) && y.canHaveChildren()))
                    if (
                      ((m = y.title(!0, null, !0)),
                      (v = y.sourceId() || "#" + y.id()),
                      (C = (_ = y.metaInfo()).styles),
                      1 === (x = _.plots || []).length)
                    )
                      n[v + "$0"] = m;
                    else
                      for (a = 0; a < x.length; ++a)
                        (T = x[a]),
                          ~b.CHILD_STUDY_ALLOWED_PLOT_TYPES.indexOf(T.type) &&
                            (n[v + "$" + a] =
                              m +
                              ": " +
                              ((C && C[T.id] && C[T.id].title) || T.id));
                (E = (function(t) {
                  return function(e) {
                    var o,
                      i,
                      n,
                      s = this,
                      r = null;
                    if (0 === e.indexOf("#")) {
                      if (
                        ((o = e.slice(1, e.indexOf("$"))),
                        null === (i = O._model.model().getStudyById(o)))
                      )
                        return void w.logError("Can not get Study by id " + o);
                      if (
                        (i.isStarted() || i.start(null, !0),
                        !(n = i.sourceId()))
                      )
                        return void w.logError(
                          "Can not get source id for " + i.metaInfo().id
                        );
                      r = e.replace(/^[^\$]+/, n);
                    }
                    (!~e.indexOf("$") && !~e.indexOf("#")) ||
                      O._study.isStarted() ||
                      O._study.start(null, !0),
                      O._study.testInputValue(t, e)
                        ? s.setValueToProperty(r || s.value())
                        : s.setValue(O._property.inputs[t.id].value());
                  };
                })(e)),
                  (L = (function(t) {
                    return function(e) {
                      var o, i, n, s;
                      if (
                        t.hasOwnProperty(e) ||
                        0 === e.indexOf("#") ||
                        !~e.indexOf("$")
                      )
                        return e;
                      for (
                        o = e.slice(0, e.indexOf("$")),
                          i = O._model.model().allStudies(),
                          n = 0;
                        n < i.length;
                        ++n
                      )
                        if ((s = i[n]).sourceId() === o) {
                          e = e.replace(/^[^\$]+/, "#" + s.id());
                          break;
                        }
                      return e;
                    };
                  })(n));
              }
              for (S in ((P = $(document.createElement("select"))), n))
                (k = s[S] || n[S]),
                  $("<option>")
                    .attr("value", S)
                    .text(k)
                    .appendTo(P);
              o.addClass("js-value-cell");
            } else
              e.options
                ? ((P = $("<select/>")),
                  (I = e.optionsTitles),
                  e.options.forEach(function(t) {
                    var e = t,
                      o = (I && I[e]) || e,
                      i = $.t(o, { context: "input" });
                    $("<option value='" + e + "'>" + i + "</option>").appendTo(
                      P
                    );
                  }))
                : ((P = $("<input/>")),
                  "bool" === e.type
                    ? P.attr("type", "checkbox")
                    : P.attr("type", "text"));
            return (
              P &&
                (P.appendTo(o),
                P.is(":checkbox") ||
                  "symbol" === e.type ||
                  P.css("width", "100px")),
              { valueEditor: P, valueSetter: E, propertyChangedHook: L }
            );
          }),
          (i.prototype._symbolInfoBySymbolProperty = function(t) {
            return this._study.resolvedSymbolInfoBySymbol(t.value());
          }),
          (i.prototype._sortInputs = function(t) {
            return t;
          }),
          (i.prototype.prepareLayoutImpl = function(t, e) {
            function o(t) {
              return new _().format(t);
            }
            var i,
              n,
              p,
              l,
              b,
              w,
              g,
              C,
              x,
              T,
              S,
              k,
              I,
              O,
              P,
              E,
              L,
              B,
              V = this._sortInputs(t.inputs);
            for (i = 0; i < V.length; i++)
              "first_visible_bar_time" !== (p = (n = V[i]).id) &&
                "last_visible_bar_time" !== p &&
                "time" !== n.type &&
                (n.isHidden ||
                  (this._showOnlyConfirmInputs && !n.confirm) ||
                  (void 0 === n.groupId &&
                    ((b =
                      "Change " +
                      (l =
                        n.name ||
                        p.toLowerCase().replace(/\b\w/g, function(t) {
                          return t.toUpperCase();
                        }))),
                    (w = $("<tr/>")).appendTo(e),
                    (g = $("<td/>")).appendTo(w),
                    g.addClass("propertypage-name-label"),
                    g.text(window.t(l, { context: "input" })),
                    (C = $("<td/>")).appendTo(w),
                    (x = this.prepareControl(n, C, b)),
                    (T = x.valueEditor),
                    (S = x.valueSetter),
                    (k = x.propertyChangedHook),
                    n.options
                      ? this.bindControl(
                          new y(
                            T,
                            this._property.inputs[p],
                            null,
                            !0,
                            this.model(),
                            b,
                            S,
                            k
                          )
                        )
                      : "bar_time" === n.type
                      ? ((I = 10),
                        this.bindControl(
                          new a(
                            T,
                            this._property.inputs[p],
                            !0,
                            this.model(),
                            b,
                            this.model().mainSeries(),
                            I
                          )
                        ),
                        T.addClass("ticker"))
                      : "integer" === n.type
                      ? ((O = [h(n.defval)]),
                        (0 === n.min || n.min) && O.push(d(n.min)),
                        (0 === n.max || n.max) && O.push(u(n.max)),
                        this.bindControl(
                          new v(
                            T,
                            this._property.inputs[p],
                            O,
                            !1,
                            this.model(),
                            b
                          )
                        ),
                        T.addClass("ticker"),
                        isFinite(n.step) &&
                          n.step > 0 &&
                          T.attr("data-step", n.step))
                      : "float" === n.type
                      ? ((O = [c(n.defval)]),
                        (0 === n.min || n.min) && O.push(d(n.min)),
                        (0 === n.max || n.max) && O.push(u(n.max)),
                        (P = new v(
                          T,
                          this._property.inputs[p],
                          O,
                          !1,
                          this.model(),
                          b
                        )).addFormatter(o),
                        this.bindControl(P),
                        T.addClass("ticker"),
                        isFinite(n.step) &&
                          n.step > 0 &&
                          T.attr("data-step", n.step))
                      : "text" === n.type
                      ? this.bindControl(
                          new v(
                            T,
                            this._property.inputs[p],
                            null,
                            !1,
                            this.model(),
                            b
                          )
                        )
                      : "bool" === n.type
                      ? this.bindControl(
                          new m(
                            T,
                            this._property.inputs[p],
                            !0,
                            this.model(),
                            b
                          )
                        )
                      : "resolution" === n.type
                      ? this.bindControl(
                          new y(
                            T,
                            this._property.inputs[p],
                            s,
                            !0,
                            this.model(),
                            "Change Interval"
                          )
                        )
                      : "symbol" === n.type &&
                        ((E = this._symbolInfoBySymbolProperty.bind(
                          this,
                          this._property.inputs[p]
                        )),
                        (L = f(E, this._property.inputs[p])),
                        (B = new r(
                          T,
                          this._property.inputs[p],
                          !0,
                          this.model(),
                          "Change Symbol",
                          L,
                          this._study.symbolsResolved()
                        )),
                        this.bindControl(B)))));
            this._property.offset &&
              ((l = this._property.offset.title
                ? this._property.offset.title.value()
                : window.t("Offset")),
              (T = this.addOffsetEditorRow(e, l)),
              (O = [h(this._property.offset.val)]).push(
                d(this._property.offset.min)
              ),
              O.push(u(this._property.offset.max)),
              this.bindControl(
                new v(
                  T,
                  this._property.offset.val,
                  O,
                  !1,
                  this.model(),
                  "Undo " + l
                )
              )),
              this._property.offsets &&
                $.each(
                  t.plots,
                  function(t, o) {
                    var i, n, s;
                    this._property.offsets[o.id] &&
                      ((void 0 !==
                        (i = this._property.offsets[o.id]).isHidden &&
                        i.isHidden.value()) ||
                        ((n = i.title.value()),
                        (T = this.addOffsetEditorRow(e, n)),
                        (s = [h(i.val)]).push(d(i.min)),
                        s.push(u(i.max)),
                        this.bindControl(
                          new v(T, i.val, s, !1, this.model(), "Undo " + n)
                        )));
                  }.bind(this)
                );
          }),
          (i.prototype.prepareLayout = function() {
            (this._table = $("<table/>")),
              this._table.addClass("property-page"),
              this._table.attr("cellspacing", "0"),
              this._table.attr("cellpadding", "2");
            var t = this._study.metaInfo();
            this.prepareLayoutImpl(t, this._table), this.loadData();
          }),
          (i.prototype.symbolSearchPopup = function() {
            return this._$symbolSearchPopup;
          }),
          (i.prototype.widget = function() {
            return this._table;
          }),
          (e.StudyInputsPropertyPage = i);
      }.call(this, o("Kxc7")));
    },
    PVgW: function(t, e, o) {
      function i(t) {
        return (
          (t = Math.abs(t)),
          !Object(l.isInteger)(t) &&
            t > 1 &&
            (t = parseFloat(t.toString().replace(/^.+\./, "0."))),
          0 < t && t < 1
            ? Math.pow(
                10,
                null ===
                  (i = String(t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/))
                  ? 0
                  : ((e = i[1] ? i[1].length : 0),
                    (o = i[2] ? parseInt(i[2], 0) : 0),
                    Math.max(0, e - o))
              )
            : 1
        );
        var e, o, i;
      }
      function n(t, e) {
        var o, n, s, r, a;
        t.trigger("tvticker-beforechange"),
          (n = (o = t.data("TVTicker")) && o.step),
          (s = 0),
          (s = o.parser
            ? o.parser(t.val())
            : Object(l.isInteger)(n)
            ? parseInt(t.val(), 10)
            : parseFloat(t.val())),
          isNaN(s) && (s = 0),
          (r = i(n)),
          (a = e(s, Math.max(r, i(s)))),
          o.formatter && (a = o.formatter(a)),
          t.val(a),
          t.change();
      }
      function s(t) {
        var e = t.data("TVTicker"),
          o = e && e.step,
          i = e && e.max;
        n(t, function(t, e) {
          var n = (Math.round(t * e) + Math.round(o * e)) / e;
          return void 0 !== i && null !== i && i < n && (n = t), n;
        });
      }
      function r(t) {
        var e = t.data("TVTicker"),
          o = e && e.step,
          i = e && e.min;
        n(t, function(t, e) {
          var n = (Math.round(t * e) - Math.round(o * e)) / e;
          return void 0 !== i && null !== i && n < i && (n = t), n;
        });
      }
      var a, p, l, d;
      o.r(e),
        (a = o("P5fv")),
        (p = o("si6p")),
        (l = o("ogJP")),
        (d = o("R4+T")),
        ($.fn.TVTicker = function(t) {
          return (
            void 0 === t && (t = {}),
            this.each(function() {
              var e,
                o,
                i,
                n = !1,
                a = $(this),
                p = a.data("TVTicker");
              p ? (n = !0) : (p = { step: Number(a.data("step")) || 1 }),
                "step" in t && (p.step = Number(t.step) || p.step),
                "min" in t && (p.min = t.min),
                "max" in t && (p.max = t.max),
                "formatter" in t && (p.formatter = t.formatter),
                "parser" in t && (p.parser = t.parser),
                a.data("TVTicker", p),
                n ||
                  ((e = $('<div class="tv-ticker">').appendTo(a.parent())),
                  (o = $('<div class="tv-ticker__btn tv-ticker__btn--up">')
                    .html(d)
                    .appendTo(e)),
                  (i = $('<div class="tv-ticker__btn tv-ticker__btn--down">')
                    .html(d)
                    .appendTo(e)),
                  e.on("mousedown", function(t) {
                    t.preventDefault(), a.focus();
                  }),
                  o.click(function() {
                    a.is(":disabled") || s(a);
                  }),
                  i.click(function() {
                    a.is(":disabled") || r(a);
                  }),
                  a.keydown(function(t) {
                    a.is(":disabled") ||
                      (38 === t.keyCode
                        ? o.addClass("i-active")
                        : 40 === t.keyCode && i.addClass("i-active"));
                  }),
                  a.keyup(function(t) {
                    a.is(":disabled") ||
                      (38 === t.keyCode
                        ? (s(a), o.removeClass("i-active"))
                        : 40 === t.keyCode &&
                          (r(a), i.removeClass("i-active")));
                  }),
                  a.mousewheel(function(t) {
                    t.deltaY * (t.deltaFactor / 100) > 0
                      ? o.click()
                      : i.click();
                  }));
            })
          );
        });
    },
    "R4+T": function(t, e) {
      t.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 8" width="16" height="8"><path fill="currentColor" d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"/></svg>';
    },
    "y1L/": function(t, e, o) {}
  }
]);
