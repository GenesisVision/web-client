(window.webpackJsonp = window.webpackJsonp || []).push([
  [15],
  {
    "5qpw": function(t, o, e) {
      function i(t) {
        return t in $.fn
          ? Promise.resolve()
          : (s ||
              (s = new Promise(function(t) {
                Promise.all([e.e(57), e.e("lazy-jquery-ui")])
                  .then(
                    function(o) {
                      e("ONnG"), t();
                    }.bind(null, e)
                  )
                  .catch(e.oe);
              })),
            s);
      }
      function n(t) {
        return new l(t);
      }
      var a, s, l;
      e.r(o),
        e.d(o, "LazyJqueryUI", function() {
          return l;
        }),
        e.d(o, "lazyJqueryUI", function() {
          return n;
        }),
        (a = e("P5fv")),
        (l = (function() {
          function t(t) {
            this._$elem = t;
          }
          return (
            (t.prototype.draggable = function() {
              var t = arguments,
                o = this._$elem;
              return i("draggable").then(function() {
                return o.draggable.apply(o, t);
              });
            }),
            (t.prototype.resizable = function() {
              var t = arguments,
                o = this._$elem;
              return i("resizable").then(function() {
                return o.resizable.apply(o, t);
              });
            }),
            (t.prototype.sortable = function() {
              var t = arguments,
                o = this._$elem;
              return i("sortable").then(function() {
                return o.sortable.apply(o, t);
              });
            }),
            (t.prototype.datepicker = function() {
              var t = arguments,
                o = this._$elem;
              return i("datepicker").then(function() {
                return o.datepicker.apply(o, t);
              });
            }),
            t
          );
        })());
    },
    BhuR: function(t, o) {
      t.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 9" width="9px" height="9px"><path d="M2 1L1 2l2.5 2.5L1 7l1 1 2.5-2.5L7 8l1-1-2.5-2.5L8 2 7 1 4.5 3.5z"/></svg>';
    },
    GAqT: function(t, o, e) {
      (function(o, i) {
        var n,
          a = e("Hr11").max,
          s = e("5qpw").lazyJqueryUI,
          l = e("jAh7").getRootOverlapManager;
        e("PVgW"),
          (n = {
            modalDialog: null,
            dialogs: [],
            NOTIFICATION_ANIMATION_START_OFFSET: "-33px",
            _constrainDraggableOptionsIfNeeded: function(t) {
              return (
                o.enabled("constraint_dialogs_movement") &&
                  (t.containment = ".chart-page"),
                t
              );
            },
            showNotice: function(t, o, e) {
              var a, s, l, d, r, c;
              return (
                "object" == typeof o && ((e = o), (o = "")),
                (a = (e = e || {}).doNotCloseOnBgClick || !1),
                (s = e.html || ""),
                (l = e.width || "400px"),
                ((d = {}).noClose = e.noClose || null),
                (d.addClass = e.modalDialogClass || null),
                n.createModalDialog(t, d),
                (r = e.centerCaption ? "caption-big-center" : "caption-big"),
                n.modalDialog.find("._tv-dialog").css("width", l),
                (c = e.customButtonCaption ? e.customButtonCaption : $.t("OK")),
                n.modalDialog.find("._tv-dialog-content").html(
                  i.render(
                    '<div class="main"><div class="{{captionClassName}} {{classSuffix}}">{{text}}' +
                      s +
                      '</div>{{^removeOkButton}}<div class="buttons"><input type="button" class="_tv-button ok" value="' +
                      c +
                      '"/></div>{{/removeOkButton}}</div>',
                    {
                      captionClassName: r,
                      classSuffix: e.classSuffix || "",
                      text: o,
                      removeOkButton: e && e.removeOkButton
                    }
                  )
                ),
                n.modalDialog.find("._tv-button.ok").on("click", function() {
                  n.destroy(), e.onOkButtonClick && e.onOkButtonClick();
                }),
                n.positionDialog(),
                n.applyHandlers(!1, {
                  doNotCloseOnBgClickIfShadowbox: a,
                  beforeDestroy: e.onClose
                }),
                n.modalDialog
              );
            },
            showCustomDialog: function(t) {
              function o(t) {
                n.destroy(), t.preventDefault();
              }
              return (
                n.createModalDialog(t.title || $.t("Dialog"), { addClass: "" }),
                n.modalDialog
                  .find("._tv-dialog")
                  .css("width", t.width || "400px"),
                n.modalDialog
                  .find("._tv-dialog-content")
                  .html(
                    '<div class="main">' + (t.html || $.t("Content")) + "</div>"
                  ),
                n.modalDialog.find(".ok").click(o),
                n.modalDialog.find("form").submit(o),
                n.modalDialog.find(".cancel").click(o),
                n.modalDialog.find("._tv-dialog-title-close").click(o),
                n.positionDialog(),
                n.applyHandlers(),
                n.modalDialog
              );
            },
            createModalDialog: function(t, o) {
              var e, i;
              return (
                (o = o || {}),
                null !== n.modalDialog && n.destroy(),
                (n.modalDialog = $(
                  '<div class="_tv-dialog-shadowbox"><div class="_tv-dialog _tv-dialog-modal' +
                    (o.addClass ? " " + o.addClass : "") +
                    '">' +
                    (o.noHeader
                      ? ""
                      : '<div class="_tv-dialog-title">' +
                        (o.noClose
                          ? ""
                          : '<a class="_tv-dialog-title-close"></a>') +
                        '<span class="_tv-dialog-title-text">' +
                        t +
                        "</span></div>") +
                    '<div class="_tv-dialog-error"><span class="message"></span></div><div class="_tv-dialog-message"><span class="message"></span></div><div class="_tv-dialog-content"></div></div></div>'
                )
                  .appendTo($("body"))
                  .data("title", t)),
                n._addMessageCloseButton(
                  n.modalDialog.find("._tv-dialog-error")
                ),
                n._addMessageCloseButton(
                  n.modalDialog.find("._tv-dialog-message")
                ),
                o.noShadowBox && n.modalDialog.addClass("transparent"),
                o.addClass && n.modalDialog.addClass(o.addClass),
                o.width &&
                  n.modalDialog.find("._tv-dialog").css({ width: o.width }),
                o.content &&
                  n.modalDialog.find("._tv-dialog-content").html(o.content),
                (e = $(".fancybox-overlay")).length &&
                  ((i = e.css("z-index")),
                  $("._tv-dialog-shadowbox").css("z-index", i + 1)),
                o.draggable &&
                  s(n.modalDialog).draggable(
                    n._constrainDraggableOptionsIfNeeded({
                      handle: n.modalDialog.find("._tv-dialog-title")
                    })
                  ),
                o.zIndex && n.modalDialog.css("z-index", o.zIndex),
                n.modalDialog
              );
            },
            _addMessageCloseButton: function(t) {
              var o = $(e("BhuR")).attr({
                class: "close",
                title: $.t("Close message")
              });
              t.append(o),
                $(o).on("click", function() {
                  t.animate(
                    {
                      marginTop: n.NOTIFICATION_ANIMATION_START_OFFSET,
                      opacity: 0
                    },
                    "fast",
                    function() {
                      t.hide();
                    }
                  );
                });
            },
            createDialog: function(t, o) {
              var e, d, r, c, u, g;
              return n.isOpen(t)
                ? ((e = n.get(t)).find("._tv-dialog-content").html(""),
                  e.data("new", !1),
                  e)
                : ((d = (o = o || {}).ownerDocument || document),
                  (c = (r = l(d)).ensureWindow(t, { position: "relative" })),
                  (e = $(
                    i.render(
                      '<div class="_tv-dialog _tv-dialog-nonmodal {{&addClass}}"><div class="_tv-dialog-title{{#hideTitle}} _tv-dialog-title-hidden{{/hideTitle}}{{#hideCloseCross}} _tv-dialog-title-no-close{{/hideCloseCross}}">{{^hideTitle}} {{&title}}{{/hideTitle}}{{^hideCloseCross}}<a class="_tv-dialog-title-close"></a>{{/hideCloseCross}}</div><div class="_tv-dialog-error"><span class="message"></span></div><div class="_tv-dialog-message"><span class="message"></span></div><div class="_tv-dialog-content"></div></div>',
                      {
                        addClass: o.addClass || "",
                        hideTitle: o.hideTitle,
                        hideCloseCross: o.hideCloseCross,
                        title: t
                      }
                    ),
                    d
                  ).appendTo(c)),
                  n._addMessageCloseButton(e.find("._tv-dialog-error")),
                  n._addMessageCloseButton(e.find("._tv-dialog-message")),
                  o.width && e.css({ width: o.width }),
                  o.content && e.find("._tv-dialog-content").html(o.content),
                  (u = 0),
                  (u = o.zIndex
                    ? o.zIndex
                    : n.dialogs && n.dialogs.length
                    ? a(
                        $.map(n.dialogs, function(t) {
                          return parseInt((t.dialog || t).css("z-index"), 10);
                        })
                      ) + 1
                    : 110),
                  e.css("z-index", u),
                  e.data("new", !0),
                  e.data("title", t),
                  e.data("id", n.dialogs.length + 1),
                  n.dialogs.push({
                    title: t,
                    dialog: e,
                    id: n.dialogs.length + 1
                  }),
                  e.on("mousedown touchstart", function() {
                    r.moveToTop(t);
                  }),
                  (g = {
                    start: function(t, o) {
                      var e,
                        i,
                        a = o.helper.css("z-index"),
                        s = 0,
                        l = null;
                      for (e = 0; e < n.dialogs.length; e++)
                        (i = n.dialogs[e].dialog.css("z-index")) > s &&
                          ((s = i), (l = n.dialogs[e].dialog));
                      o.helper.css("z-index", s), l.css("z-index", a);
                    }
                  }),
                  o.dragHandle
                    ? (g.handle = o.dragHandle)
                    : o.hideTitle || (g.handle = "._tv-dialog-title"),
                  o.dragOptions && $.extend(g, o.dragOptions),
                  s(e).draggable(n._constrainDraggableOptionsIfNeeded(g)),
                  e);
            },
            positionDialog: function(t, o, e) {
              function i() {
                a.css("margin-left", -Math.round(a.outerWidth() / 2) + "px"),
                  a.css("margin-top", -Math.round(a.outerHeight() / 2) + "px");
              }
              var a, s, l, d, r, c, u, g, p, f;
              (e = e || {}),
                (o = o || e.position),
                t
                  ? ((l = (s = t.prop("ownerDocument")).defaultView),
                    (d = t.width()),
                    (r = t.height()),
                    (c = $(l).width()),
                    (u = $(l).height()),
                    o && o.top && o.left
                      ? ((p = e.forcePosition
                          ? o.left
                          : Math.max(2, Math.min(c - d - 4, o.left)) + "px"),
                        (g = e.forcePosition
                          ? o.top
                          : Math.max(2, Math.min(u - r - 4, o.top)) + "px"))
                      : o && o.considerScroll
                      ? ((f = $(s)),
                        (p = Math.round((c - d) / 2 + f.scrollLeft()) + "px"),
                        (g = Math.round((u - r) / 2 + f.scrollTop()) + "px"))
                      : ((p = Math.round((c - d) / 2) + "px"),
                        (g = Math.round((u - r) / 2) + "px")),
                    e.fadeIn
                      ? t
                          .css({ left: p, top: g })
                          .hide()
                          .fadeIn("fast")
                      : e.smooth
                      ? t.animate({ left: p, top: g })
                      : t.css({ left: p, top: g }))
                  : ((t = n.modalDialog),
                    (a = t.find("._tv-dialog")),
                    i(),
                    a.resize(i));
            },
            applyHandlers: function(t, o) {
              var e,
                i,
                a,
                s = !t || t === this.modalDialog;
              (o = o || {}),
                (e = s
                  ? function() {
                      n.destroy();
                    }
                  : function() {
                      n.destroy(t.data("title"));
                    }),
                (t = t || n.modalDialog.find("._tv-dialog")),
                (i = t.prop("ownerDocument")),
                o.beforeDestroy && t.on("destroy", o.beforeDestroy),
                t
                  .find(
                    "._tv-dialog-title ._tv-dialog-title-close, .js-dialog-close"
                  )
                  .on("click", function(t) {
                    o.closeHandler && "function" == typeof o.closeHandler
                      ? o.closeHandler(t)
                      : e();
                  }),
                o.doNotCloseOnBgClick ||
                  setTimeout(function() {
                    $(i).on("mousedown.closeDialog", function(n) {
                      var a = $(n.target)
                        .parents()
                        .andSelf();
                      a.is(t) ||
                        (o.doNotCloseOnBgClickIfShadowbox &&
                          a.is(
                            "._tv-dialog-shadowbox, .tv-dialog__modal-wrap"
                          )) ||
                        a.is(
                          ".colorpicker, .charts-popup-list, ._tv-dialog, .tvcolorpicker-popup, .symbol-edit-popup, .ui-datepicker, .clockpicker-popover, .pac-container, .context-menu-wrapper"
                        ) ||
                        ($(i).off("mousedown.closeDialog"), e());
                    });
                  }, 0),
                t.find('input[type="checkbox"]').change(function() {
                  var t = $(this),
                    o = t.next("._tv-dialog-checkbox-mask");
                  o.toggleClass("disabled", t.prop("disabled")).toggleClass(
                    "_tv-dialog-checkbox-mask-active",
                    t.is(":checked")
                  );
                }),
                (a = t
                  .find('input[type="text"]')
                  .focus(function() {
                    $(this).addClass("_tv-dialog-content-textactive");
                  })
                  .blur(function() {
                    $(this).removeClass("_tv-dialog-content-textactive");
                  })
                  .first()),
                Modernizr.mobiletouch || o.notFocusFirst || a.focus(),
                t
                  .find('input[type="password"]')
                  .focus(function() {
                    $(this).addClass("_tv-dialog-content-textactive");
                  })
                  .blur(function() {
                    $(this).removeClass("_tv-dialog-content-textactive");
                  }),
                t
                  .find("textarea")
                  .focus(function() {
                    $(this).addClass("_tv-dialog-content-textareaactive");
                  })
                  .blur(function() {
                    $(this).removeClass("_tv-dialog-content-textareaactive");
                  }),
                t.find("._tv-dialog-checkbox-mask").click(function() {
                  var t = $(this).prev();
                  t.prop("disabled") ||
                    (t.prop("checked", !t[0].checked), t.change());
                }),
                o.doNotCloseOnEsc ||
                  $(i).bind("keyup.hideDialog", function(o) {
                    if (27 === o.keyCode)
                      return t ? n.destroy(t.data("title")) : n.destroy(), !1;
                  }),
                o.processEnterButton &&
                  $(i).bind("keyup.confirmAndCloseDialog", function(t) {
                    13 === t.keyCode &&
                      "textarea" !== t.target.tagName.toLowerCase() &&
                      (o.processEnterButton.click(),
                      $(i).unbind("keyup.confirmAndCloseDialog"));
                  });
            },
            showError: function(t, o, e) {
              n.showMessage(t, o, $.extend(e || {}, { isError: !0 }));
            },
            showMessage: function(t, o, e) {
              var i, a, s;
              o || (o = $("._tv-dialog")),
                (i = (e = e || {}).isError
                  ? "_tv-dialog-error"
                  : "_tv-dialog-message"),
                (s = (a = o.find("." + i)).find(".message")),
                e.html
                  ? s.html("string" == typeof e.html ? e.html : t)
                  : s.text(t),
                s
                  .css("width", o.width())
                  .toggleClass("selectable", Boolean(e.selectable)),
                a
                  .toggleClass("with-close", Boolean(e.withClose))
                  .css({
                    marginTop: n.NOTIFICATION_ANIMATION_START_OFFSET,
                    opacity: "0"
                  })
                  .show()
                  .animate({ marginTop: 0, opacity: 1 }, "fast"),
                e.withClose ||
                  (e.hideWithoutAnimation
                    ? a.on(
                        "touchstartoutside mousedownoutside keydownoutside",
                        function t() {
                          a.hide(),
                            a.off(
                              "touchstartoutside mousedownoutside keydownoutside",
                              t
                            );
                        }
                      )
                    : a.on(
                        "touchstartoutside mousedownoutside keydownoutside",
                        function t() {
                          a.animate(
                            {
                              marginTop: n.NOTIFICATION_ANIMATION_START_OFFSET,
                              opacity: 0
                            },
                            "fast",
                            function() {
                              a.hide();
                            }
                          ),
                            a.off(
                              "touchstartoutside mousedownoutside keydownoutside",
                              t
                            );
                        }
                      ));
            },
            isOpen: function(t) {
              for (var o = 0; o < n.dialogs.length; o++)
                if (n.dialogs[o].title === t) return !0;
              return !1;
            },
            get: function(t) {
              for (var o = 0; o < n.dialogs.length; o++)
                if (n.dialogs[o].title === t) return n.dialogs[o].dialog;
            },
            destroy: function(t, o) {
              var e,
                i = null;
              if (t && "string" == typeof t)
                for (e = 0; e < n.dialogs.length; e++)
                  n.dialogs[e].title === t &&
                    ((i = n.dialogs[e].dialog.prop("ownerDocument")),
                    n.dialogs[e].dialog
                      .find(".apply-common-tooltip")
                      .mouseout(),
                    n.dialogs[e].dialog.trigger("destroy", o),
                    $(document).unbind("mouseup.hideDialog" + n.dialogs[e].id),
                    $("input", n.dialogs[e].dialog).blur(),
                    n.dialogs[e].dialog.remove(),
                    n.dialogs.splice(e, 1),
                    l(i).unregisterWindow(t));
              else
                n.modalDialog &&
                  ((i = n.modalDialog.prop("ownerDocument")),
                  n.modalDialog.find(".apply-common-tooltip").mouseout(),
                  n.modalDialog.find("._tv-dialog").trigger("destroy"),
                  n.modalDialog.remove(),
                  (n.modalDialog = null));
              $(i).unbind("keyup.hideDialog"),
                $(i).unbind("keyup.confirmAndCloseDialog");
            },
            resizeContent: function(t, o, e) {
              var i, n;
              null == e && (e = 20),
                (t += e),
                (i = parseInt($("body").height(), 10)),
                (n = o.height()),
                t > i && ((n -= t - i), (n = Math.max(0, n)), o.height(n));
            }
          }),
          (t.exports.TVOldDialogs = n);
      }.call(this, e("Kxc7"), e("OiQe")));
    },
    PVgW: function(t, o, e) {
      function i(t) {
        return (
          (t = Math.abs(t)),
          !Object(r.isInteger)(t) &&
            t > 1 &&
            (t = parseFloat(t.toString().replace(/^.+\./, "0."))),
          0 < t && t < 1
            ? Math.pow(
                10,
                null ===
                  (i = String(t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/))
                  ? 0
                  : ((o = i[1] ? i[1].length : 0),
                    (e = i[2] ? parseInt(i[2], 0) : 0),
                    Math.max(0, o - e))
              )
            : 1
        );
        var o, e, i;
      }
      function n(t, o) {
        var e, n, a, s, l;
        t.trigger("tvticker-beforechange"),
          (n = (e = t.data("TVTicker")) && e.step),
          (a = 0),
          (a = e.parser
            ? e.parser(t.val())
            : Object(r.isInteger)(n)
            ? parseInt(t.val(), 10)
            : parseFloat(t.val())),
          isNaN(a) && (a = 0),
          (s = i(n)),
          (l = o(a, Math.max(s, i(a)))),
          e.formatter && (l = e.formatter(l)),
          t.val(l),
          t.change();
      }
      function a(t) {
        var o = t.data("TVTicker"),
          e = o && o.step,
          i = o && o.max;
        n(t, function(t, o) {
          var n = (Math.round(t * o) + Math.round(e * o)) / o;
          return void 0 !== i && null !== i && i < n && (n = t), n;
        });
      }
      function s(t) {
        var o = t.data("TVTicker"),
          e = o && o.step,
          i = o && o.min;
        n(t, function(t, o) {
          var n = (Math.round(t * o) - Math.round(e * o)) / o;
          return void 0 !== i && null !== i && n < i && (n = t), n;
        });
      }
      var l, d, r, c;
      e.r(o),
        (l = e("P5fv")),
        (d = e("si6p")),
        (r = e("ogJP")),
        (c = e("R4+T")),
        ($.fn.TVTicker = function(t) {
          return (
            void 0 === t && (t = {}),
            this.each(function() {
              var o,
                e,
                i,
                n = !1,
                l = $(this),
                d = l.data("TVTicker");
              d ? (n = !0) : (d = { step: Number(l.data("step")) || 1 }),
                "step" in t && (d.step = Number(t.step) || d.step),
                "min" in t && (d.min = t.min),
                "max" in t && (d.max = t.max),
                "formatter" in t && (d.formatter = t.formatter),
                "parser" in t && (d.parser = t.parser),
                l.data("TVTicker", d),
                n ||
                  ((o = $('<div class="tv-ticker">').appendTo(l.parent())),
                  (e = $('<div class="tv-ticker__btn tv-ticker__btn--up">')
                    .html(c)
                    .appendTo(o)),
                  (i = $('<div class="tv-ticker__btn tv-ticker__btn--down">')
                    .html(c)
                    .appendTo(o)),
                  o.on("mousedown", function(t) {
                    t.preventDefault(), l.focus();
                  }),
                  e.click(function() {
                    l.is(":disabled") || a(l);
                  }),
                  i.click(function() {
                    l.is(":disabled") || s(l);
                  }),
                  l.keydown(function(t) {
                    l.is(":disabled") ||
                      (38 === t.keyCode
                        ? e.addClass("i-active")
                        : 40 === t.keyCode && i.addClass("i-active"));
                  }),
                  l.keyup(function(t) {
                    l.is(":disabled") ||
                      (38 === t.keyCode
                        ? (a(l), e.removeClass("i-active"))
                        : 40 === t.keyCode &&
                          (s(l), i.removeClass("i-active")));
                  }),
                  l.mousewheel(function(t) {
                    t.deltaY * (t.deltaFactor / 100) > 0
                      ? e.click()
                      : i.click();
                  }));
            })
          );
        });
    },
    "R4+T": function(t, o) {
      t.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 8" width="16" height="8"><path fill="currentColor" d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"/></svg>';
    },
    jAh7: function(t, o, e) {
      function i(t) {
        var o, e, i;
        return (
          void 0 === t && (t = document),
          null !== (o = t.getElementById("overlap-manager-root"))
            ? Object(n.ensureDefined)(l.get(o))
            : ((e = new s(t)),
              (i = (function(t) {
                var o = t.createElement("div");
                return (
                  (o.style.position = "absolute"),
                  (o.style.zIndex = (150).toString()),
                  (o.style.top = "0px"),
                  (o.style.left = "0px"),
                  (o.id = "overlap-manager-root"),
                  o
                );
              })(t)),
              l.set(i, e),
              e.setContainer(i),
              t.body.appendChild(i),
              e)
        );
      }
      var n, a, s, l;
      e.r(o),
        e.d(o, "OverlapManager", function() {
          return s;
        }),
        e.d(o, "getRootOverlapManager", function() {
          return i;
        }),
        (n = e("Eyy1")),
        (a = (function() {
          function t() {
            this._storage = [];
          }
          return (
            (t.prototype.add = function(t) {
              this._storage.push(t);
            }),
            (t.prototype.remove = function(t) {
              this._storage = this._storage.filter(function(o) {
                return t !== o;
              });
            }),
            (t.prototype.has = function(t) {
              return this._storage.includes(t);
            }),
            (t.prototype.getItems = function() {
              return this._storage;
            }),
            t
          );
        })()),
        (s = (function() {
          function t(t) {
            void 0 === t && (t = document),
              (this._storage = new a()),
              (this._windows = new Map()),
              (this._index = 0),
              (this._document = t),
              (this._container = t.createDocumentFragment());
          }
          return (
            (t.prototype.setContainer = function(t) {
              var o = this._container,
                e = null === t ? this._document.createDocumentFragment() : t;
              !(function(t, o) {
                Array.from(t.childNodes).forEach(function(t) {
                  t.nodeType === Node.ELEMENT_NODE && o.appendChild(t);
                });
              })(o, e),
                (this._container = e);
            }),
            (t.prototype.registerWindow = function(t) {
              this._storage.has(t) || this._storage.add(t);
            }),
            (t.prototype.ensureWindow = function(t, o) {
              var e, i;
              return (
                void 0 === o && (o = { position: "fixed" }),
                void 0 !== (e = this._windows.get(t))
                  ? e
                  : (this.registerWindow(t),
                    ((i = this._document.createElement("div")).style.position =
                      o.position),
                    (i.style.zIndex = this._index.toString()),
                    (i.dataset.id = t),
                    this._container.appendChild(i),
                    this._windows.set(t, i),
                    ++this._index,
                    i)
              );
            }),
            (t.prototype.unregisterWindow = function(t) {
              this._storage.remove(t);
              var o = this._windows.get(t);
              void 0 !== o &&
                (null !== o.parentElement && o.parentElement.removeChild(o),
                this._windows.delete(t));
            }),
            (t.prototype.getZindex = function(t) {
              var o = this.ensureWindow(t);
              return parseInt(o.style.zIndex || "0");
            }),
            (t.prototype.moveToTop = function(t) {
              this.getZindex(t) !== this._index &&
                (this.ensureWindow(t).style.zIndex = (++this
                  ._index).toString());
            }),
            (t.prototype.removeWindow = function(t) {
              this.unregisterWindow(t);
            }),
            t
          );
        })()),
        (l = new WeakMap());
    },
    "y1L/": function(t, o, e) {},
    zjLg: function(t, o, e) {}
  }
]);