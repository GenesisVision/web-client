(window.webpackJsonp = window.webpackJsonp || []).push([
  ["objecttreedialog"],
  {
    "7XZl": function(t, e, o) {
      var i, s, n, r, l, a;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.DropdownView = void 0),
        (i = (function() {
          function t(t, e) {
            var o, i;
            for (o = 0; o < e.length; o++)
              ((i = e[o]).enumerable = i.enumerable || !1),
                (i.configurable = !0),
                "value" in i && (i.writable = !0),
                Object.defineProperty(t, i.key, i);
          }
          return function(e, o, i) {
            return o && t(e.prototype, o), i && t(e, i), e;
          };
        })()),
        o("TkT6"),
        (s = o("29gu")),
        (n = o("sFgq")),
        (r = o("wmOI")),
        (l = (function(t) {
          var e, o;
          if (t && t.__esModule) return t;
          if (((e = {}), null != t))
            for (o in t)
              Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
          return (e.default = t), e;
        })(r)),
        (a = e.DropdownView = (function() {
          function t(e) {
            var o = this,
              i =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
            !(function(t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, t),
              (this.$el = e),
              (this.$wrap = i.$wrap || e.find(".tv-dropdown-behavior__button")),
              (this.$body = i.$body || e.find(".tv-dropdown-behavior__body")),
              (this.notCloseWithCtrl =
                !!i.notCloseWithCtrl && i.notCloseWithCtrl),
              (this.closeWithEsc = void 0 === i.closeWithEsc || i.closeWithEsc),
              this.closeWithEsc && this.$el.attr("tabIndex", 0),
              (e.data("scroll") || i.scroll) &&
                ((this.$scroll = this.$body.find(
                  ".tv-dropdown-behavior__scroll"
                )),
                (this.$inScroll = this.$scroll.find(
                  ".tv-dropdown-behavior__inscroll"
                )),
                (this.scroll = new n.SidebarCustomScroll(
                  this.$scroll,
                  this.$inScroll,
                  { showTopShadow: !1, showBottomShadow: !1 }
                )),
                (this.$scrollBar = this.scroll.getScrollBar()),
                this.$scrollBar &&
                  this.$scrollBar.on(
                    "mousedown.tv-dropdown-view-scroll",
                    function() {
                      o.offClickOutside(),
                        $(document).on(
                          "mouseup.tv-dropdown-view-scroll",
                          function() {
                            o.onClickOutside(),
                              $(document).off(
                                "mouseup.tv-dropdown-view-scroll"
                              );
                          }
                        );
                    }
                  )),
              (e.data("adaptBody") || i.adaptBody) && (this._adaptBody = !0),
              (e.data("adaptOnlyInScrollHeight") ||
                i.adaptOnlyInScrollHeight) &&
                (this._adaptOnlyInScrollHeight = !0),
              (this._fitScreen = e.data("fitScreen") || i.fitScreen),
              this.$wrap
                .add(e.find(".js-dropdown-toggle"))
                .on("click", function(t) {
                  $(t.currentTarget).hasClass("js-prevent-dropdown") ||
                    o.toggle();
                });
          }
          return (
            i(t, [
              {
                key: "toggle",
                value: function() {
                  this.opened ? this.close(!0) : this.open();
                }
              },
              {
                key: "open",
                value: function() {
                  var t = this;
                  this.opened ||
                    this.disabled ||
                    this.readonly ||
                    (this.$el.trigger("beforeOpenMenu"),
                    this.$body.removeClass("i-hidden").addClass("i-opened"),
                    this.$wrap.addClass("i-dropped"),
                    this.$el.addClass("i-opened"),
                    "horz" === this._fitScreen && this.fitHorizontally(),
                    this._adaptBody && this.adaptBody(),
                    this.onClickOutside(),
                    this.$el.trigger("updateScroll"),
                    this.$el.trigger("afterOpenMenu"),
                    (this.opened = !0),
                    this.closeWithEsc &&
                      this.$el.on("keypress keyup", function(e) {
                        e.keyCode === l.ESC && t.close(!0);
                      }));
                }
              },
              {
                key: "onClickOutside",
                value: function() {
                  var t = this;
                  setTimeout(function() {
                    t.$body.on("clickoutside", function() {
                      t.close(!0);
                    });
                  }, 0);
                }
              },
              {
                key: "offClickOutside",
                value: function() {
                  this.$body.off("clickoutside");
                }
              },
              {
                key: "close",
                value: function() {
                  var t =
                    arguments.length > 0 &&
                    void 0 !== arguments[0] &&
                    arguments[0];
                  !this.opened ||
                    this.disabled ||
                    this.readonly ||
                    (!t &&
                      this.notCloseWithCtrl &&
                      (window.event.ctrlKey || window.event.metaKey)) ||
                    (this.offClickOutside(),
                    this.$wrap.removeClass("i-dropped"),
                    this.$el.trigger("beforeCloseMenu"),
                    this.$body.removeClass("i-opened").addClass("i-hidden"),
                    this.$el.removeClass("i-opened"),
                    this.closeWithEsc && this.$el.off("keypress keyup"),
                    (this.opened = !1),
                    this.$el.trigger("afterCloseMenu"));
                }
              },
              {
                key: "isOpened",
                value: function() {
                  return this.opened;
                }
              },
              {
                key: "updateScroll",
                value: function() {
                  this.scroll &&
                    (this.scroll.updateScrollBar(),
                    this.scroll.scrollToStart());
                }
              },
              {
                key: "enable",
                value: function() {
                  this.$wrap.removeClass("i-disabled"), (this.disabled = !1);
                }
              },
              {
                key: "disable",
                value: function() {
                  this.$wrap.addClass("i-disabled"), (this.disabled = !0);
                }
              },
              {
                key: "setReadonly",
                value: function(t) {
                  this.readonly = t;
                }
              },
              {
                key: "adaptBody",
                value: function() {
                  function t() {
                    d.height("auto");
                  }
                  var e,
                    o,
                    i,
                    s,
                    n,
                    r,
                    l,
                    a = 15,
                    c = 25,
                    d = this.$body,
                    h = this.$wrap.get(0).getBoundingClientRect(),
                    u = window.innerHeight,
                    p = this.$inScroll.outerHeight(!0),
                    _ = parseFloat(d.css("padding-top"));
                  if (
                    ((p += _),
                    (p += e = parseFloat(d.css("padding-bottom"))),
                    this._adaptOnlyInScrollHeight)
                  )
                    return (
                      (i = (o = d.find(".js-dropdown-dummy"))
                        ? parseFloat(o.css("padding-bottom")) +
                          parseFloat(o.css("margin-bottom"))
                        : 0),
                      (s = h.top + h.height + i),
                      void this.$el
                        .find(".tv-dropdown-behavior__scroll")
                        .css("maxHeight", u - e - s - c)
                    );
                  (n = h.top + p + c <= u),
                    (r = p + a <= h.bottom),
                    (l = void 0),
                    n
                      ? ((l = 0 - _), t())
                      : r
                      ? ((l = -p + e), t())
                      : ((l = -h.top + a), u <= p && d.height(u - a - c)),
                    d.css("top", l);
                }
              },
              {
                key: "fitHorizontally",
                value: function() {
                  var t, e, o, i;
                  this.$body.css("marginLeft", 0),
                    (t = document.body.getBoundingClientRect()),
                    (e = parseFloat($(document.body).css("paddingRight"))),
                    ((o = this.$body.offset()).right =
                      o.left + this.$body.outerWidth()),
                    (i = Math.max(
                      Math.min(0, t.right - e - o.right),
                      t.left - o.left
                    )) && this.$body.css("marginLeft", i);
                }
              },
              {
                key: "destroy",
                value: function() {
                  this.scroll && this.scroll.destroy(),
                    this.offClickOutside(),
                    this.$el.find(".js-dropdown-toggle").off("click"),
                    this.$wrap.off("click");
                }
              }
            ]),
            t
          );
        })()),
        ($.fn.tvDropdown = (0, s.createTvBlockWithInstance)(
          "tv-dropdown",
          function(t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            return new a(t, e);
          }
        ));
    },
    "9IRQ": function(t, e, o) {},
    FhAp: function(t, e, o) {
      function i(t, e, o, i) {
        (this._sourcesPropertiesGetter = t),
          (this._chartModel = o),
          (this._items = null),
          (this._scroll = null),
          (this._selectedItemIds = []),
          (this._$tabContainer = i.addClass("tv-objects-tree-dialog-tab")),
          (this._$contentWrapper = $(
            '<div class="tv-objects-tree-dialog-tab__content">'
          ).appendTo(this._$tabContainer)),
          (this._list = new n(this._chartModel, e)),
          this._list.setItemActivateListener(
            this._onActiveSourceChanged.bind(this)
          ),
          (this._sourceRemovedHandler = this._onSourceRemoved.bind(this)),
          (this._sourcesRemovedHandler = this._onSourcesRemoved.bind(this)),
          (this._icons = null),
          (this._destroyed = !1);
        var s = l.getAllSourcesIcons();
        null !== s
          ? this.setIcons(s)
          : l.loadAllSourcesIcons().then(
              function(t) {
                this._destroyed ||
                  (this.setIcons(t),
                  null !== this._items && this._updateView());
              }.bind(this)
            );
      }
      var s = o("sFgq").SidebarCustomScroll,
        n = o("YbvJ").ObjectTreeItemsController,
        r = o("c2JX").Spinner,
        l = o("ihdJ");
      o("sgSB"),
        (i.prototype._removeSourceFromView = function(t) {}),
        (i.prototype._removeSourcesFromView = function(t) {}),
        (i.prototype._renderViewInternal = function(t) {}),
        (i.prototype._updateView = function() {}),
        (i.prototype.destroy = function() {
          this._unsubscribeListeners(), (this._destroyed = !0);
        }),
        (i.prototype.setIcons = function(t) {
          this._icons = t;
        }),
        (i.prototype.getIcon = function(t) {
          var e, o;
          return null !== t && "loadSvg" === t.type
            ? null === this._icons
              ? null
              : ((e = t.svgId.split(".")),
                (o = this._icons[e[0]][e[1]])
                  ? { type: "svg", svgCode: o }
                  : null)
            : t;
        }),
        (i.prototype.initView = function() {
          (this._selectedItemIds = this._chartModel
            .selection()
            .sources()
            .map(function(t) {
              return t.id();
            })),
            this._subscribeListeners(),
            this._renderView(null),
            this._addScroll();
        }),
        (i.prototype._sourceForId = function(t) {
          return this._chartModel.dataSourceForId(t);
        }),
        (i.prototype._selectedSourceIds = function() {
          return this._selectedItemIds;
        }),
        (i.prototype._onActiveSourceChanged = function(t) {
          var e = this;
          e._chartModel.selectionMacro(function(o) {
            o.clearSelection(),
              t.length
                ? (e._selectedItemIds = t.map(function(t) {
                    return o.addSourceToSelection(t), t.id();
                  }))
                : (e._selectedItemIds = []);
          });
        }),
        (i.prototype._getItemForSourceId = function(t) {
          return this._$contentWrapper.find("#" + t);
        }),
        (i.prototype._markItemForSource = function(t, e) {
          t.attr("id", e.id());
        }),
        (i.prototype._getSourceIdForItem = function(t) {
          return t.attr("id");
        }),
        (i.prototype._getSourceForItem = function(t) {
          return this._sourceForId(this._getSourceIdForItem(t));
        }),
        (i.prototype._listAccessor = function() {
          return this._list;
        }),
        (i.prototype._showSpinner = function() {
          (this.spinner = new r().spin(this._$tabContainer.get(0))),
            this._$contentWrapper.css("visibility", "hidden");
        }),
        (i.prototype._hideSpinner = function() {
          this.spinner &&
            (this.spinner.stop(),
            this._$contentWrapper.css("visibility", "visible"));
        }),
        (i.prototype._onSourceRemoved = function(t) {
          void 0 !== t &&
            (this._removeSourceFromView(t), this._scroll.updateScrollBar());
        }),
        (i.prototype._onSourcesRemoved = function(t) {
          Array.isArray(t) &&
            (this._removeSourcesFromView(t), this._scroll.updateScrollBar());
        }),
        (i.prototype._subscribeListeners = function() {
          this._chartModel.on("removeSource", this._sourceRemovedHandler),
            this._chartModel.on("removeSources", this._sourcesRemovedHandler);
        }),
        (i.prototype._unsubscribeListeners = function() {
          this._chartModel.removeListener(
            "removeSource",
            this._sourceRemovedHandler
          ),
            this._chartModel.removeListener(
              "removeSources",
              this._sourcesRemovedHandler
            );
        }),
        (i.prototype._getItems = function() {
          return this._items;
        }),
        (i.prototype._reloadItems = function() {
          this._items = this._sourcesPropertiesGetter();
        }),
        (i.prototype._renderView = function(t) {
          this._$contentWrapper.empty(),
            this._hideSpinner(),
            this._showSpinner(),
            this._reloadItems(),
            this._renderViewInternal(
              function() {
                this._hideSpinner(), t && t();
              }.bind(this)
            );
        }),
        (i.prototype._addScroll = function() {
          this._scroll = new s(this._$tabContainer, this._$contentWrapper, {
            showTopShadow: !1,
            showBottomShadow: !1,
            scrollMarginTop: 0
          });
        }),
        (t.exports = i);
    },
    "Nd//": function(t, e, o) {
      (function(e, i) {
        function s(t) {
          this._$filter = $(e.render(n, { filters: this._getActions() }))
            .appendTo(t)
            .tvDropdown();
          var o = this;
          this._$filter.on(
            Modernizr.mobiletouch ? "touchend" : "click",
            ".js-dropdown-item",
            function(t) {
              o._$filter.tvDropdown("close"),
                o._$filter
                  .find(".js-dropdown-item.i-active")
                  .removeClass("i-active"),
                $(this).addClass("i-active");
            }
          ),
            this._$filter.on("afterCloseMenu", function() {
              o.setValue(
                o._$filter.find(".js-dropdown-item.i-active").attr("data-name")
              );
            }),
            this._$filter.on("beforeOpenMenu", function() {
              o._$filter.find(".js-dropdown-item").each(function() {
                var t = $(this);
                t.toggleClass("i-active", t.attr("data-name") === o._value);
              });
            }),
            (this.onChange = new i()),
            this.setValue("all"),
            this._$filter
              .find('.js-dropdown-item[data-name="' + this._value + '"]')
              .addClass("i-active");
        }
        var n,
          r = o("GVHu").Study,
          l = o("qJq3").Series,
          a = o("Ss5c").LineDataSource;
        o("m/4m"),
          o("r4yL"),
          o("hHCs"),
          o("7XZl"),
          (n =
            '<div class="tv-dropdown tv-dropdown-behavior"><div class="tv-dropdown-behavior__button js-dropdown-toggle tv-objects-tree-tab-filter__button"><span class="js-filter-title"></span><span class="tv-caret"></span></div><div class="tv-dropdown__body tv-dropdown-behavior__body i-hidden">{{#filters}}<div class="tv-dropdown-behavior__item"><div class="tv-dropdown__item js-dropdown-item" data-name="{{name}}">{{title}}</div></div>{{/filters}}</div></div>'),
          (s.prototype.value = function() {
            return this._value;
          }),
          (s.prototype.setValue = function(t) {
            if (t !== this._value) {
              this._value = t;
              var e = this._getActions().filter(function(e) {
                return e.name === t;
              })[0];
              this._$filter.find(".js-filter-title").text(e.title),
                this.onChange.fire(t);
            }
          }),
          (s.prototype.applyToGroup = function(t) {
            var e, o, i, s, n;
            if ("all" === this._value) return t;
            for (e = [], o = 0; o < t.length; o++)
              (i = t[o]),
                (s = TradingView.isInherited(i.datasource.constructor, l)),
                (n = TradingView.isInherited(
                  i.datasource.constructor,
                  "drawings" === this._value ? r : a
                )),
                (!s && n) || e.push(i);
            return e;
          }),
          (s.prototype._getActions = function() {
            return [
              { name: "all", title: $.t("All") },
              { name: "drawings", title: $.t("Drawings") },
              { name: "studies", title: $.t("Studies") }
            ];
          }),
          (t.exports.ObjectsTreeTabFilter = s);
      }.call(this, o("OiQe"), o("aIyQ")));
    },
    ORzW: function(t, e) {
      t.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M0 2.006C0 .898.897 0 2.006 0h9.988C13.102 0 14 .897 14 2.006v9.988A2.005 2.005 0 0 1 11.994 14H2.006A2.005 2.005 0 0 1 0 11.994V2.006zM6 6H3v2h8V6H6z"/></svg>';
    },
    PKFu: function(t, e) {
      t.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M0 2.006C0 .898.897 0 2.006 0h9.988C13.102 0 14 .897 14 2.006v9.988A2.005 2.005 0 0 1 11.994 14H2.006A2.005 2.005 0 0 1 0 11.994V2.006zM5.586 7L3.293 4.707 2.586 4 4 2.586l.707.707L7 5.586l2.293-2.293.707-.707L11.414 4l-.707.707L8.414 7l2.293 2.293.707.707L10 11.414l-.707-.707L7 8.414l-2.293 2.293-.707.707L2.586 10l.707-.707L5.586 7z"/></svg>';
    },
    SDvV: function(t, e, o) {
      (function(e) {
        function i(t, e) {
          (this.options = t || {}),
            (this._chartWidget = t.chartWidget),
            (this._model = e);
        }
        function s(t, e) {
          e.__init || (t.initView(), (e.__init = !0));
        }
        var n,
          r = o("zqKs"),
          l = o("uaE4"),
          a = o("Ss5c").LineDataSource,
          c = o("NhD9").createTabbedDialog,
          d = o("tITk").trackEvent;
        o("fe7E"),
          (n = null),
          (i.prototype.getSourceProperties = function() {
            var t,
              e,
              o,
              i,
              s,
              n,
              r,
              l = {
                groups: [],
                drawings: [],
                currentSymbol: this._model.mainSeries().symbol()
              };
            for (t = 0; t < this._model.panes().length; t++) {
              for (
                o = [],
                  i = (e = this._model.panes()[t]).orderedSources(),
                  s = 0;
                s < i.length;
                s++
              )
                (n = i[s]).showInObjectTree() &&
                  o.push({ datasource: n, name: n.title() });
              for (r = e.dataSources(), s = 0; s < r.length; s++)
                (n = r[s]) instanceof a &&
                  n.showInObjectTree() &&
                  l.drawings.push({
                    datasource: n,
                    name: n.title(),
                    symbol: n.symbol()
                  });
              o.length && l.groups.push({ children: o });
            }
            return l;
          }),
          (i.prototype.show = function() {
            var t, o, i, a, h, u, p, _, v, m;
            d("GUI", "Objects Tree"),
              (t = []),
              (o = $()),
              (i = $("<div>")),
              (a = this.getSourceProperties.bind(this)),
              (h = $("<div>")),
              (u = new r(a, this._chartWidget, this._model, h, i)),
              (o = o.add(i)),
              t.push({
                customControl: i,
                name: $.t("Object Tree"),
                page: h,
                onActivate: s.bind(null, u)
              }),
              (p = null),
              e.enabled("support_manage_drawings") &&
                ((_ = $("<div>")),
                (v = $("<div>")),
                (p = new l(a, this._chartWidget, this._model, v, _)),
                (o = o.add(_)),
                t.push({
                  customControl: _,
                  name: $.t("Manage Drawings"),
                  page: v,
                  onActivate: s.bind(null, p)
                })),
              (m = c({
                tabs: t,
                width: 520,
                tabStateSaveKey: "ObjectsTreeDialog.tab",
                activeTab: (function(t) {
                  switch (t) {
                    case "manage-drawings":
                      return 1;
                    case "objects-tree":
                    default:
                      return 0;
                  }
                })(this.options.activeTab),
                customControlsContainerAddClass:
                  "tv-objects-tree-dialog__custom-controls-container",
                customControls: o,
                destroyOnClose: !0,
                height: 480,
                withScroll: !1,
                contentAddClass: "js-dialog__scroll-wrap",
                isClickOutFn: function(t) {
                  if (
                    $(t.target)
                      .parents()
                      .andSelf()
                      .is(
                        '._tv-dialog, .colorpicker, .tvcolorpicker-popup, .symbol-edit-popup, .context-menu, .js-dialog, [data-name="indicator-properties-dialog"]'
                      )
                  )
                    return !1;
                }
              })).tabs.tabChanged.subscribe(null, function(e) {
                t[e].onActivate(t[e]);
                for (var o = 0; o < t.length; ++o)
                  t[o].customControl.toggleClass("i-hidden", e !== o);
                m.tabs.checkScrollArrows(!0);
              }),
              t[m.tabs.index()].onActivate(t[m.tabs.index()]),
              m.dialog.on("beforeClose", function() {
                u.destroy(), p && p.destroy(), (n = null);
              }),
              n && n.close(),
              (n = m.dialog),
              m.dialog.open();
          }),
          (t.exports.ObjectTreeDialog = i);
      }.call(this, o("Kxc7")));
    },
    TkT6: function(t, e, o) {},
    Y2e0: function(t, e) {
      t.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M0 2.006C0 .898.897 0 2.006 0h9.988C13.102 0 14 .897 14 2.006v9.988A2.005 2.005 0 0 1 11.994 14H2.006A2.005 2.005 0 0 1 0 11.994V2.006zM7 11c3.314 0 6-4 6-4s-2.686-4-6-4-6 4-6 4 2.686 4 6 4zm0-2c-1.111 0-2-.889-2-2s.889-2 2-2 2 .889 2 2-.906 2-2 2z"/></svg>';
    },
    YbvJ: function(t, e, o) {
      (function(e, i) {
        function s(t, e) {
          (this._chartWidget = e),
            (this._chartModel = t),
            (this._$activeItem = null),
            (this._nodeExpandCollapseCallback = null),
            (this._nodeRemoveCallback = null),
            (this._itemActivateCallback = null);
        }
        var n,
          r,
          l,
          a,
          c,
          d,
          h,
          u,
          p,
          _ = o("Ss5c").LineDataSource,
          v = o("kSsA"),
          m = o("5qpw").lazyJqueryUI;
        o("q8W4"),
          (n = o("yB98")),
          (r = o("cJvP")),
          (l = o("ORzW")),
          (a = o("gPdB")),
          (c = o("Y2e0")),
          (d = o("f7DG")),
          (h = o("PKFu")),
          (u = o("QloM").TabNames),
          (p =
            '<div class="tv-objects-tree-item {{#largeLeftPadding}}tv-objects-tree-item--large-left-padding{{/largeLeftPadding}}">{{#draggable}}<div class="tv-objects-tree-item__drag-icon js-drag-icon">' +
            n +
            '</div>{{/draggable}}{{#treeNode}}<div class="tv-objects-tree-item__control-buttons tv-objects-tree-item__control-buttons--left"><span class="tv-objects-tree-item__button tv-objects-tree-item__button--expand">' +
            r +
            '</span><span class="tv-objects-tree-item__button tv-objects-tree-item__button--collapse">' +
            l +
            '</span></div>{{/treeNode}}{{^treeNode}}<div class="tv-objects-tree-item__icon js-icon-container"></div>{{/treeNode}}<div class="tv-objects-tree-item__title {{#wideTitle}}tv-objects-tree-item__title--wide{{/wideTitle}} js-title-container"></div><div class="tv-objects-tree-item__control-buttons">{{#lockUnlockIcon}}<span class="tv-objects-tree-item__button tv-objects-tree-item__button--lock js-lock-unlock-btn">' +
            a +
            '</span>{{/lockUnlockIcon}}{{#showHideIcon}}<span class="tv-objects-tree-item__button js-show-hide-btn">' +
            c +
            "</span>{{/showHideIcon}}{{^treeNode}}" +
            (e.enabled("property_pages")
              ? '<span class="tv-objects-tree-item__button js-format-btn">' +
                d +
                "</span>"
              : "") +
            '{{/treeNode}}<span class="tv-objects-tree-item__button js-remove-btn">' +
            h +
            "</span></div></div>"),
          (s.prototype.setItemActivateListener = function(t) {
            this._itemActivateCallback = t;
          }),
          (s.prototype.setNodeExpandCollapseCallback = function(t) {
            this._nodeExpandCollapseCallback = t;
          }),
          (s.prototype.setNodeRemoveCallback = function(t) {
            this._nodeRemoveCallback = t;
          }),
          (s.prototype.activateItem = function(t, e, o) {
            (o && o.originalEvent.defaultPrevented) ||
              (this._$activeItem &&
                0 !== this._$activeItem.length &&
                this._$activeItem.removeClass("i-active"),
              (this._$activeItem = t),
              this._$activeItem &&
                0 !== this._$activeItem.length &&
                this._$activeItem.addClass("i-active"),
              this._itemActivateCallback &&
                this._itemActivateCallback(e ? [e] : []));
          }),
          (s.prototype.createSortableForItemsList = function(t, e, o) {
            m(t).sortable({
              scroll: !0,
              scrollSensitivity: 100,
              scrollSpeed: 100,
              axis: "y",
              handle: ".js-drag-icon",
              placeholder:
                "tv-objects-tree-item tv-objects-tree-item--placeholder",
              start: e,
              stop: o
            });
          }),
          (s.prototype.createTreeNodeItem = function(t, e, o) {
            var s = $(
              i.render(p, {
                draggable: !1,
                lockUnlockIcon: !1,
                formatIcon: !1,
                showHideIcon: !1,
                treeNode: !0,
                title: t,
                wideTitle: !0
              })
            );
            return (
              this.updateNodeItem(s, t, e, o),
              s.click(this._onNodeToggleExpandCollapse.bind(this, s, t)),
              s
                .find(".js-remove-btn")
                .attr("title", $.t("Delete all drawing for this symbol"))
                .click(
                  function(e) {
                    e.preventDefault(),
                      this._nodeRemoveCallback &&
                        this._nodeRemoveCallback(s, t);
                  }.bind(this)
                ),
              s
            );
          }),
          (s.prototype.createItem = function(t, e, o) {
            var s, n, r;
            return (
              (e = e || {}),
              (s = t.datasource),
              (n = !1),
              (r = $(
                i.render(p, {
                  draggable: e.draggable,
                  lockUnlockIcon: e.lockUnlock,
                  showHideIcon: e.showHide,
                  editAlert: n,
                  treeNode: !1,
                  largeLeftPadding: e.largeLeftPadding
                })
              )),
              this.updateItem(r, t, o),
              r.click(this.activateItem.bind(this, r, s)),
              s.userEditEnabled() &&
                (e.lockUnlock &&
                  this._setupLockUnlockButton(r.find(".js-lock-unlock-btn"), s),
                e.showHide &&
                  this._setupItemPropertyButton(
                    r.find(".js-show-hide-btn"),
                    s,
                    "visible",
                    $.t("Show/Hide"),
                    "Show/Hide ",
                    !0
                  ),
                n &&
                  this._setupEditAlertButton(r.find(".js-edit-alert-btn"), s),
                this._setupFormatButton(r.find(".js-format-btn"), s),
                this._canShowEditObjectDialog(s) &&
                  (r.dblclick(
                    function() {
                      this._chartWidget.showChartPropertiesForSource(s);
                    }.bind(this)
                  ),
                  e.addContextMenu &&
                    r.on(
                      "contextmenu",
                      function(t) {
                        this._showContextMenu(t, s), t.preventDefault();
                      }.bind(this)
                    )),
                this._setupItemRemoveButton(r.find(".js-remove-btn"), s)),
              r
            );
          }),
          (s.prototype.updateNodeItem = function(t, e, o, i) {
            var s = t.find(".js-title-container");
            s.toggleClass("i-bold", i.isCurrent),
              (s[0].innerHTML = e + " (" + o.length + ")");
          }),
          (s.prototype.updateItem = function(t, e, o) {
            (t.find(".js-title-container")[0].innerHTML = TradingView.clean(
              $.t(e.name)
            )),
              this._setDataSourceIcon(t, o),
              this._setItemVisible(t, e.datasource);
          }),
          (s.prototype._showContextMenu = function(t, o) {
            if (e.enabled("objects_tree_context_menu")) {
              var i = this._chartWidget.paneByState(
                this._chartModel.paneForSource(o)
              );
              this._chartModel.selectionMacro(function(t) {
                t.clearSelection(), t.addSourceToSelection(o);
              }),
                i.showContextMenuForSelection(t);
            }
          }),
          (s.prototype._canShowEditObjectDialog = function(t) {
            return (
              !(t instanceof _ && !t.isActualSymbol()) &&
              (t !== this._chartModel.mainSeries() ||
                !this._chartWidget ||
                !this._chartWidget.onWidget()) &&
              (v.hasStylesPropertyPage(t) || v.hasInputsPropertyPage(t))
            );
          }),
          (s.prototype._setupLockUnlockButton = function(t, e) {
            TradingView.isInherited(e.constructor, _)
              ? this._setupItemPropertyButton(
                  t,
                  e,
                  "frozen",
                  $.t("Lock/Unlock"),
                  "Lock/Unlock ",
                  !1
                )
              : t.addClass("i-hidden");
          }),
          (s.prototype._setupEditAlertButton = function(t, e) {}),
          (s.prototype._setupFormatButton = function(t, e) {
            this._canShowEditObjectDialog(e)
              ? t.attr("title", $.t("Format")).click(
                  function() {
                    this._chartWidget.showChartPropertiesForSource(e, u.style);
                  }.bind(this)
                )
              : t.addClass("i-hidden");
          }),
          (s.prototype._setItemVisible = function(t, e) {
            var o = e.properties().visible.value();
            t.toggleClass("i-prop-hidden", !o);
          }),
          (s.prototype._setDataSourceIcon = function(t, e) {
            var o = t.find(".js-icon-container").empty();
            o.removeClass("i-text-icon i-empty"),
              null === e
                ? o.addClass("i-empty")
                : "svg" === e.type
                ? $(e.svgCode)
                    .attr({ width: 20, height: 20 })
                    .appendTo(o)
                : "text" === e.type &&
                  (o.addClass("i-text-icon"), o.text(e.text)),
              t.prepend(o);
          }),
          (s.prototype._onItemPropertyButtonClicked = function(t, e) {
            this._chartModel.setProperty(t, !t.value(), e);
          }),
          (s.prototype._onItemPropertyChanged = function(t, e, o) {
            t.toggleClass("i-active", e ? !o.value() : o.value());
          }),
          (s.prototype._syncStateAndSubscribe = function(t, e, o) {
            e.subscribe(null, this._onItemPropertyChanged.bind(this, t, o)),
              this._onItemPropertyChanged(t, o, e);
          }),
          (s.prototype._setupItemPropertyButton = function(t, e, o, i, s, n) {
            t.attr("title", i).click(
              function(t) {
                this._onItemPropertyButtonClicked(
                  e.properties()[o],
                  s + e.title()
                );
              }.bind(this)
            ),
              this._syncStateAndSubscribe(t, e.properties()[o], n);
          }),
          (s.prototype._setupItemRemoveButton = function(t, e) {
            if (e !== this._chartModel.mainSeries() && e.isUserDeletable()) {
              var o = this;
              t.attr("title", $.t("Delete")).click(function(t) {
                t.preventDefault(), o._chartModel.removeSource(e);
              });
            } else t.addClass("i-transparent");
          }),
          (s.prototype._onNodeToggleExpandCollapse = function(t, e) {
            var o = "i-expanded",
              i = t.hasClass(o);
            t.toggleClass(o, !i),
              this._nodeExpandCollapseCallback &&
                this._nodeExpandCollapseCallback(t, e, !i);
          }),
          (t.exports.ObjectTreeItemsController = s);
      }.call(this, o("Kxc7"), o("OiQe")));
    },
    cJvP: function(t, e) {
      t.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M0 2.006C0 .898.897 0 2.006 0h9.988C13.102 0 14 .897 14 2.006v9.988A2.005 2.005 0 0 1 11.994 14H2.006A2.005 2.005 0 0 1 0 11.994V2.006zm8 1.19H6v3H3v2h3v3h2v-3h3v-2H8v-3z"/></svg>';
    },
    f7DG: function(t, e) {
      t.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M0 2.006C0 .898.897 0 2.006 0h9.988C13.102 0 14 .897 14 2.006v9.988A2.005 2.005 0 0 1 11.994 14H2.006A2.005 2.005 0 0 1 0 11.994V2.006zm11.119 4.28s-.357 0-.452-.334a3.415 3.415 0 0 0-.334-.81c-.143-.309.096-.547.096-.547l.357-.357c.143-.143.143-.38 0-.548l-.476-.476c-.143-.143-.381-.143-.548 0l-.357.357s-.238.239-.548.096a3.415 3.415 0 0 0-.81-.334c-.333-.095-.333-.452-.333-.452v-.5A.376.376 0 0 0 7.334 2h-.667a.376.376 0 0 0-.381.381v.5s0 .357-.334.452c-.285.072-.547.19-.81.334-.309.143-.547-.096-.547-.096l-.357-.357c-.143-.143-.38-.143-.548 0l-.476.476c-.143.143-.143.381 0 .548l.357.357s.239.238.096.548a3.415 3.415 0 0 0-.334.81c-.095.309-.452.333-.452.333h-.5a.376.376 0 0 0-.381.38v.667c0 .215.167.381.381.381h.5s.357 0 .452.334c.072.285.19.547.334.81.143.309-.096.547-.096.547l-.357.357c-.143.143-.143.38 0 .548l.476.476c.143.143.381.143.548 0l.357-.357s.238-.239.548-.096c.262.143.524.262.81.334.309.095.333.452.333.452v.5c0 .214.166.381.38.381h.667a.376.376 0 0 0 .381-.381v-.5s0-.357.334-.452c.285-.072.547-.19.81-.334.309-.143.547.096.547.096l.357.357c.143.143.38.143.548 0l.476-.476c.143-.143.143-.381 0-.548l-.357-.357s-.239-.238-.096-.548c.143-.262.262-.524.334-.81.095-.309.452-.333.452-.333h.5a.376.376 0 0 0 .381-.38v-.667a.376.376 0 0 0-.381-.381h-.5zM7 9c-1.111 0-2-.889-2-2s.889-2 2-2 2 .889 2 2-.906 2-2 2z"/></svg>';
    },
    fe7E: function(t, e, o) {},
    gPdB: function(t, e) {
      t.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16" width="12px" height="16px"><path fill-rule="evenodd" d="M10.5 5.333h-.75V3.81C9.75 1.707 8.07 0 6 0 3.93 0 2.25 1.707 2.25 3.81v1.523H1.5c-.825 0-1.5.686-1.5 1.524v7.62C0 15.313.675 16 1.5 16h9c.825 0 1.5-.686 1.5-1.524V6.857c0-.838-.675-1.524-1.5-1.524zM6 12c-.825 0-1.5-.675-1.5-1.5S5.175 9 6 9s1.5.675 1.5 1.5S6.825 12 6 12zm2.325-6.75h-4.65v-1.5A2.326 2.326 0 0 1 6 1.425 2.326 2.326 0 0 1 8.325 3.75v1.5z"/></svg>';
    },
    hHCs: function(t, e, o) {},
    ihdJ: function(t, e, o) {
      function i() {
        var t = o.c.zxD0;
        return t
          ? Promise.resolve(t.exports.lineToolsIcons)
          : o
              .e("line-tools-icons")
              .then(o.bind(null, "zxD0"))
              .then(function(t) {
                return t.lineToolsIcons;
              });
      }
      function s() {
        var t = o.c.EsZh;
        return t
          ? Promise.resolve(t.exports.SERIES_ICONS)
          : o
              .e("series-icons-map")
              .then(o.bind(null, "EsZh"))
              .then(function(t) {
                return t.SERIES_ICONS;
              });
      }
      function n() {
        var t, e;
        return (
          null === h &&
            ((t = Object(l.retries)(i, 2)
              .then(function(t) {
                return t;
              })
              .catch(function(t) {
                return c.logWarn(t), {};
              })),
            (e = Object(l.retries)(s, 2)
              .then(function(t) {
                return t;
              })
              .catch(function(t) {
                return c.logWarn(t), {};
              })),
            (h = Promise.all([t, e]))),
          h.then(function(t) {
            return (d = { linetool: t[0], series: t[1] });
          })
        );
      }
      function r() {
        return d;
      }
      var l, a, c, d, h;
      o.r(e),
        o.d(e, "loadAllSourcesIcons", function() {
          return n;
        }),
        o.d(e, "getAllSourcesIcons", function() {
          return r;
        }),
        (l = o("mpWx")),
        (a = o("uOxu")),
        (c = Object(a.getLogger)("DataSourcesIcons")),
        (d = null),
        (h = null);
    },
    "m/4m": function(t, e, o) {},
    q42M: function(t, e, o) {},
    q8W4: function(t, e, o) {},
    r4yL: function(t, e, o) {},
    sgSB: function(t, e, o) {},
    uaE4: function(t, e, o) {
      function i(t, e, o, i, n) {
        s.call(this, t, e, o, i),
          (this._clearRemoveNodeTimerId = null),
          (this._$emptyListMessage = $(
            '<div class="tv-manage-drawings-tab__empty-drawings">'
          ).text($.t("No drawings yet"))),
          this._$emptyListMessage.appendTo(this._$tabContainer),
          (this._$totalValueContainer = $("<div>").appendTo(n));
      }
      var s = o("FhAp");
      o("9IRQ"),
        inherit(i, s),
        (i.prototype.destroy = function() {
          this._clearRemoveNodeTimer(), s.prototype.destroy.call(this);
        }),
        (i.prototype.initView = function() {
          this._listAccessor().setNodeExpandCollapseCallback(
            this._renderViewForSymbol.bind(this)
          ),
            this._listAccessor().setNodeRemoveCallback(
              this._onNodeRemoveClick.bind(this)
            ),
            s.prototype.initView.call(this);
        }),
        (i.prototype._clearRemoveNodeTimer = function() {
          clearInterval(this._clearRemoveNodeTimerId),
            (this._clearRemoveNodeTimerId = null);
        }),
        (i.prototype._renderViewForSymbol = function(t, e, o) {
          var i,
            s,
            n,
            r,
            l,
            a,
            c = "tv-manage-drawings-tab__symbol-drawings";
          if (t.next().hasClass(c))
            return (
              t.next().toggleClass("i-expanded", o),
              void this._scroll.updateScrollBar()
            );
          for (
            i = $('<div class="i-expanded ' + c + '">'),
              s = this._symbolDrawingsMap[e],
              n = 0;
            n < s.length;
            ++n
          )
            (r = s[n]),
              (l = this.getIcon(r.datasource.getSourceIcon())),
              (a = this._listAccessor().createItem(
                r,
                {
                  showHide: !1,
                  lockUnlock: !1,
                  draggable: !1,
                  largeLeftPadding: !0,
                  addContextMenu: !1
                },
                l
              )),
              this._markItemForSource(a, r.datasource),
              i.append(a);
          i.insertAfter(t), this._scroll.updateScrollBar();
        }),
        (i.prototype._createSymbolItem = function(t) {
          var e = this._list.createTreeNodeItem(t, this._symbolDrawingsMap[t], {
            isCurrent: this._getItems().currentSymbol === t
          });
          e.attr("data-symbol", t), this._$contentWrapper.append(e);
        }),
        (i.prototype._updateView = function() {
          var t, e, o, i, s;
          for (
            this._reloadItems(), t = this._getItems().drawings, e = 0;
            e < t.length;
            ++e
          )
            (o = t[e]),
              (i = this.getIcon(o.datasource.getSourceIcon())),
              (s = this._getItemForSourceId(o.datasource.id())),
              this._listAccessor().updateItem(s, o, i);
        }),
        (i.prototype._renderViewInternal = function(t) {
          var e, o, i;
          for (
            this._symbolDrawingsMap = {}, e = this._getItems().drawings, o = 0;
            o < e.length;
            o++
          )
            (i = e[o]),
              (this._symbolDrawingsMap[i.symbol] =
                this._symbolDrawingsMap[i.symbol] || []),
              this._symbolDrawingsMap[i.symbol].push(i);
          Object.keys(this._symbolDrawingsMap)
            .sort(
              function(t, e) {
                return this._symbolDrawingsMap[t].length <
                  this._symbolDrawingsMap[e].length
                  ? 1
                  : -1;
              }.bind(this)
            )
            .forEach(this._createSymbolItem.bind(this)),
            this._renderEmptyListMessageIfNeeded(),
            this._updateTotalCounter(),
            t();
        }),
        (i.prototype._updateTotalCounter = function() {
          var t = 0;
          Object.keys(this._symbolDrawingsMap).forEach(
            function(e) {
              t += 0 | this._symbolDrawingsMap[e].length;
            }.bind(this)
          ),
            this._$totalValueContainer.text($.t("Total") + ": " + t),
            this._$totalValueContainer.toggleClass("i-hidden", 0 === t);
        }),
        (i.prototype._renderEmptyListMessageIfNeeded = function() {
          this._$emptyListMessage.toggleClass(
            "js-hidden",
            0 !== Object.keys(this._symbolDrawingsMap).length
          );
        }),
        (i.prototype._removeSourceFromView = function(t) {
          var e,
            o,
            i,
            s = this._getItemForSourceId(t);
          0 !== s.length
            ? (this._selectedSourceIds().includes(t) &&
                this._listAccessor().activateItem(null, null),
              (i = (o = (e = s.parent()).prev()).attr("data-symbol")),
              (this._symbolDrawingsMap[i] = this._symbolDrawingsMap[i].filter(
                function(e) {
                  return e.datasource.id() !== t;
                }
              )),
              0 === this._symbolDrawingsMap[i].length
                ? (e.remove(),
                  o.remove(),
                  delete this._symbolDrawingsMap[i],
                  this._renderEmptyListMessageIfNeeded())
                : (s.remove(),
                  this._listAccessor().updateNodeItem(
                    o,
                    i,
                    this._symbolDrawingsMap[i],
                    { isCurrent: this._getItems().currentSymbol === i }
                  )),
              this._updateTotalCounter())
            : this._renderView(null);
        }),
        (i.prototype._onNodeRemoveClick = function(t, e) {
          if (!this._clearRemoveNodeTimerId) {
            e = t.attr("data-symbol");
            this._chartModel.beginUndoMacro(
              $.t("Remove all line tools for ") + e
            ),
              (this._clearRemoveNodeTimerId = setInterval(
                function() {
                  var t = this._symbolDrawingsMap[e],
                    o = t.splice(0, 200).map(function(t) {
                      return t.datasource;
                    });
                  this._chartModel.removeLineTools(o),
                    0 === t.length &&
                      (this._chartModel.endUndoMacro(),
                      this._clearRemoveNodeTimer());
                }.bind(this),
                50
              ));
          }
        }),
        (i.prototype._removeSourcesFromView = function(t) {
          this._renderView(
            function() {
              this._scroll.scrollToStart();
            }.bind(this)
          );
        }),
        (t.exports = i);
    },
    yB98: function(t, e) {
      t.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 12"><path fill-rule="evenodd" d="M0 0h2v2H0V0zm4 0h2v2H4V0zM0 5h2v2H0V5zm4 0h2v2H4V5zm-4 5h2v2H0v-2zm4 0h2v2H4v-2z"/></svg>';
    },
    zqKs: function(t, e, o) {
      function i(t, e, o, i, s) {
        n.call(this, t, e, o, i),
          (this._delayedRenderIntervals = {}),
          (this._$filterContainer = s),
          (this._boundUpdateView = this._updateView.bind(this)),
          (this._boundRenderView = this._renderView.bind(this, null)),
          (this._zorderChangedHandler = this._onZorderChanged.bind(this));
      }
      var s = o("Nd//").ObjectsTreeTabFilter,
        n = o("FhAp");
      o("q42M"),
        inherit(i, n),
        (i.prototype.destroy = function() {
          Object.keys(this._delayedRenderIntervals).forEach(function(t) {
            clearInterval(t);
          }),
            (this._delayedRenderIntervals = null),
            n.prototype.destroy.call(this);
        }),
        (i.prototype.initView = function() {
          (this._filter = new s(this._$filterContainer)),
            this._filter.onChange.subscribe(
              this,
              function() {
                this._renderView(this._scroll.scrollToStart.bind(this._scroll));
              }.bind(this)
            ),
            n.prototype.initView.call(this);
        }),
        (i.prototype._addSortableToList = function(t, e) {
          var o = 0;
          this._listAccessor().createSortableForItemsList(
            t,
            function(t, e) {
              o = e.item.index();
            },
            function(t, i) {
              var s,
                n,
                r,
                l,
                a,
                c,
                d,
                h,
                u,
                p = i.item.index();
              if (o !== p) {
                for (
                  s = o > p ? i.item.next() : i.item.prev(),
                    n = this._getSourceIdForItem(i.item),
                    r = this._getSourceIdForItem(s),
                    l = -1,
                    a = -1,
                    c = 0;
                  c < e.length;
                  ++c
                )
                  (d = e[c]).datasource.id() === n
                    ? (l = c)
                    : d.datasource.id() === r && (a = c);
                for (
                  h = this._chartModel.dataSourceForId(n),
                    this._chartModel.removeListener(
                      "changeZOrder",
                      this._zorderChangedHandler
                    ),
                    this._chartModel.beginUndoMacro(
                      "Change " + h.title() + " Z order"
                    ),
                    u = l > a ? 1 : -1,
                    c = 0;
                  c < Math.abs(l - a);
                  c++
                )
                  this._chartModel.changeZOrder([h], u);
                this._chartModel.endUndoMacro(),
                  this._chartModel.on(
                    "changeZOrder",
                    this._zorderChangedHandler
                  );
              }
            }.bind(this)
          );
        }),
        (i.prototype._getNewSelectedIdOnRemoval = function(t) {
          var e = t.next();
          0 === e.length && (e = t.prev()),
            this._listAccessor().activateItem(e, this._getSourceForItem(e));
        }),
        (i.prototype._moveItemUp = function(t) {
          var e = t.prev();
          e.length && (t.insertBefore(e), this._scroll.scrollTo(t));
        }),
        (i.prototype._moveItemDown = function(t) {
          var e = t.next();
          e.length && (t.insertAfter(e), this._scroll.scrollTo(t));
        }),
        (i.prototype._removeSourceFromView = function(t) {
          var e,
            o = this._getItemForSourceId(t),
            i = this._selectedSourceIds().includes(t);
          i &&
            ((this._selectedItemIds = this._selectedItemIds.filter(function(e) {
              return e !== t;
            })),
            this._getNewSelectedIdOnRemoval(o)),
            1 === (e = o.parent()).children().length ? e.remove() : o.remove(),
            this._selectedSourceIds().length &&
              i &&
              this._scroll.scrollTo(
                this._getItemForSourceId(this._selectedSourceIds()[0])
              );
        }),
        (i.prototype._removeSourcesFromView = function(t) {
          this._renderView(
            function() {
              this._scroll.scrollToStart();
            }.bind(this)
          );
        }),
        (i.prototype._onZorderChanged = function(t, e) {
          if (t)
            if (e) {
              var o = this._getItemForSourceId(t.id());
              1 === e ? this._moveItemUp(o) : this._moveItemDown(o);
            } else
              this._renderView(
                function() {
                  this._scroll.scrollTo(this._getItemForSourceId(t.id()));
                }.bind(this)
              );
        }),
        (i.prototype._subscribeListeners = function() {
          n.prototype._subscribeListeners.call(this),
            this._chartModel.on("setProperty", this._boundUpdateView),
            this._chartModel.on("cloneLineTool", this._boundRenderView),
            this._chartModel.on("setChartStyleProperty", this._boundUpdateView),
            this._chartModel.on("changeZOrder", this._zorderChangedHandler),
            this._chartModel.on("moveSource", this._boundRenderView);
        }),
        (i.prototype._unsubscribeListeners = function() {
          n.prototype._unsubscribeListeners.call(this),
            this._chartModel.removeListener(
              "setProperty",
              this._boundUpdateView
            ),
            this._chartModel.removeListener(
              "cloneLineTool",
              this._boundRenderView
            ),
            this._chartModel.removeListener(
              "setChartStyleProperty",
              this._boundUpdateView
            ),
            this._chartModel.removeListener(
              "changeZOrder",
              this._zorderChangedHandler
            ),
            this._chartModel.removeListener(
              "moveSource",
              this._boundRenderView
            );
        }),
        (i.prototype._updateView = function() {
          var t, e, o, i, s, n, r;
          for (
            this._reloadItems(), t = this._getItems().groups, e = 0;
            e < t.length;
            ++e
          )
            if ((o = t[e]).children.length)
              for (i = o.children.length - 1; i >= 0; --i)
                (s = o.children[i]),
                  0 !==
                    (n = this._getItemForSourceId(s.datasource.id())).length &&
                    ((r = this.getIcon(s.datasource.getSourceIcon())),
                    this._listAccessor().updateItem(n, s, r));
        }),
        (i._groupRenderSize = 50),
        (i.prototype._renderGroup = function(t) {
          var e, o;
          (t = t || {}),
            (e = 0),
            (o = setInterval(
              function() {
                var s = t.items.slice(e, e + i._groupRenderSize);
                s.forEach(
                  function(e) {
                    var o = this.getIcon(e.datasource.getSourceIcon()),
                      i = this._list.createItem(
                        e,
                        {
                          lockUnlock: t.showLocks,
                          showHide: !0,
                          draggable: !0,
                          addContextMenu: !0
                        },
                        o
                      );
                    this._markItemForSource(i, e.datasource),
                      this._selectedSourceIds().includes(e.datasource.id()) &&
                        this._listAccessor().activateItem(i, e.datasource),
                      t.$group.append(i);
                  }.bind(this)
                ),
                  (e += i._groupRenderSize),
                  s.length ||
                    (clearInterval(o),
                    delete this._delayedRenderIntervals[o],
                    --this._fillListGroupsCount,
                    0 === this._fillListGroupsCount && t.callback());
              }.bind(this),
              100
            )),
            (this._delayedRenderIntervals[o] = !0);
        }),
        (i.prototype._renderViewInternal = function(t) {
          var e,
            o,
            i,
            s,
            n =
              "studies" !== this._filter.value() && this._items.drawings.length;
          for (
            this._fillListGroupsCount = 0, e = this._getItems().groups, o = 0;
            o < e.length;
            o++
          )
            (i = this._filter.applyToGroup(e[o].children)).length &&
              ((s = $('<div class="tv-objects-tree-tab__group">').appendTo(
                this._$contentWrapper
              )),
              this._addSortableToList(s, e[o].children),
              i.reverse(),
              this._renderGroup({
                showLocks: n,
                callback: t,
                items: i,
                $group: s
              }),
              this._fillListGroupsCount++);
        }),
        (t.exports = i);
    }
  }
]);
