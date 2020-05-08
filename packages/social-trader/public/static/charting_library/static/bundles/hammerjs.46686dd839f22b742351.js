(window.webpackJsonp = window.webpackJsonp || []).push([
  ["hammerjs"],
  {
    be1f: function(t, e, i) {
      var n, s;
      i.r(e),
        (n = i("yLV6")),
        (s = i.n(n)),
        i.d(e, "HammerJS", function() {
          return s.a;
        });
    },
    yLV6: function(t, e, i) {
      var n;
      !(function(s, r, o, a) {
        function h(t, e, i) {
          return setTimeout(f(t, i), e);
        }
        function u(t, e, i) {
          return !!Array.isArray(t) && (c(t, i[e], i), !0);
        }
        function c(t, e, i) {
          var n;
          if (t)
            if (t.forEach) t.forEach(e, i);
            else if (t.length !== a)
              for (n = 0; n < t.length; ) e.call(i, t[n], n, t), n++;
            else for (n in t) t.hasOwnProperty(n) && e.call(i, t[n], n, t);
        }
        function l(t, e, i) {
          var n = "DEPRECATED METHOD: " + e + "\n" + i + " AT \n";
          return function() {
            var e = new Error("get-stack-trace"),
              i =
                e && e.stack
                  ? e.stack
                      .replace(/^[^\(]+?[\n$]/gm, "")
                      .replace(/^\s+at\s+/gm, "")
                      .replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@")
                  : "Unknown Stack Trace",
              r = s.console && (s.console.warn || s.console.log);
            return r && r.call(s.console, n, i), t.apply(this, arguments);
          };
        }
        function p(t, e, i) {
          var n,
            s = e.prototype;
          ((n = t.prototype = Object.create(s)).constructor = t),
            (n._super = s),
            i && et(n, i);
        }
        function f(t, e) {
          return function() {
            return t.apply(e, arguments);
          };
        }
        function d(t, e) {
          return typeof t == ce ? t.apply((e && e[0]) || a, e) : t;
        }
        function v(t, e) {
          return t === a ? e : t;
        }
        function m(t, e, i) {
          c(E(e), function(e) {
            t.addEventListener(e, i, !1);
          });
        }
        function g(t, e, i) {
          c(E(e), function(e) {
            t.removeEventListener(e, i, !1);
          });
        }
        function T(t, e) {
          for (; t; ) {
            if (t == e) return !0;
            t = t.parentNode;
          }
          return !1;
        }
        function y(t, e) {
          return t.indexOf(e) > -1;
        }
        function E(t) {
          return t.trim().split(/\s+/g);
        }
        function I(t, e, i) {
          if (t.indexOf && !i) return t.indexOf(e);
          for (var n = 0; n < t.length; ) {
            if ((i && t[n][i] == e) || (!i && t[n] === e)) return n;
            n++;
          }
          return -1;
        }
        function A(t) {
          return Array.prototype.slice.call(t, 0);
        }
        function b(t, e, i) {
          for (var n, s = [], r = [], o = 0; o < t.length; )
            I(r, (n = e ? t[o][e] : t[o])) < 0 && s.push(t[o]), (r[o] = n), o++;
          return (
            i &&
              (s = e
                ? s.sort(function(t, i) {
                    return t[e] > i[e];
                  })
                : s.sort()),
            s
          );
        }
        function S(t, e) {
          for (
            var i, n, s = e[0].toUpperCase() + e.slice(1), r = 0;
            r < he.length;

          ) {
            if ((n = (i = he[r]) ? i + s : e) in t) return n;
            r++;
          }
          return a;
        }
        function _(t) {
          var e = t.ownerDocument || t;
          return e.defaultView || e.parentWindow || s;
        }
        function C(t, e) {
          var i = this;
          (this.manager = t),
            (this.callback = e),
            (this.element = t.element),
            (this.target = t.options.inputTarget),
            (this.domHandler = function(e) {
              d(t.options.enable, [t]) && i.handler(e);
            }),
            this.init();
        }
        function w(t, e, i) {
          var n = i.pointers.length,
            s = i.changedPointers.length,
            r = e & dt && n - s == 0,
            o = e & (mt | gt) && n - s == 0;
          (i.isFirst = !!r),
            (i.isFinal = !!o),
            r && (t.session = {}),
            (i.eventType = e),
            (function(t, e) {
              var i,
                n,
                s,
                r,
                o,
                h,
                u = t.session,
                c = e.pointers,
                l = c.length;
              u.firstInput || (u.firstInput = P(e));
              l > 1 && !u.firstMultiple
                ? (u.firstMultiple = P(e))
                : 1 === l && (u.firstMultiple = !1);
              (i = u.firstInput),
                (n = u.firstMultiple),
                (s = n ? n.center : i.center),
                (r = e.center = D(c));
              (e.timeStamp = fe()),
                (e.deltaTime = e.timeStamp - i.timeStamp),
                (e.angle = M(s, r)),
                (e.distance = R(s, r)),
                (function(t, e) {
                  var i = e.center,
                    n = t.offsetDelta || {},
                    s = t.prevDelta || {},
                    r = t.prevInput || {};
                  (e.eventType !== dt && r.eventType !== mt) ||
                    ((s = t.prevDelta = { x: r.deltaX || 0, y: r.deltaY || 0 }),
                    (n = t.offsetDelta = { x: i.x, y: i.y }));
                  (e.deltaX = s.x + (i.x - n.x)),
                    (e.deltaY = s.y + (i.y - n.y));
                })(u, e),
                (e.offsetDirection = O(e.deltaX, e.deltaY));
              o = x(e.deltaTime, e.deltaX, e.deltaY);
              (e.overallVelocityX = o.x),
                (e.overallVelocityY = o.y),
                (e.overallVelocity = pe(o.x) > pe(o.y) ? o.x : o.y),
                (e.scale = n
                  ? ((p = n.pointers),
                    (f = c),
                    R(f[0], f[1], wt) / R(p[0], p[1], wt))
                  : 1),
                (e.rotation = n
                  ? (function(t, e) {
                      return M(e[1], e[0], wt) + M(t[1], t[0], wt);
                    })(n.pointers, c)
                  : 0),
                (e.maxPointers = u.prevInput
                  ? e.pointers.length > u.prevInput.maxPointers
                    ? e.pointers.length
                    : u.prevInput.maxPointers
                  : e.pointers.length),
                (function(t, e) {
                  var i,
                    n,
                    s,
                    r,
                    o,
                    h,
                    u,
                    c = t.lastInterval || e,
                    l = e.timeStamp - c.timeStamp;
                  e.eventType != gt && (l > ft || c.velocity === a)
                    ? ((o = e.deltaX - c.deltaX),
                      (h = e.deltaY - c.deltaY),
                      (u = x(l, o, h)),
                      (n = u.x),
                      (s = u.y),
                      (i = pe(u.x) > pe(u.y) ? u.x : u.y),
                      (r = O(o, h)),
                      (t.lastInterval = e))
                    : ((i = c.velocity),
                      (n = c.velocityX),
                      (s = c.velocityY),
                      (r = c.direction));
                  (e.velocity = i),
                    (e.velocityX = n),
                    (e.velocityY = s),
                    (e.direction = r);
                })(u, e);
              var p, f;
              h = t.element;
              T(e.srcEvent.target, h) && (h = e.srcEvent.target);
              e.target = h;
            })(t, i),
            t.emit("hammer.input", i),
            t.recognize(i),
            (t.session.prevInput = i);
        }
        function P(t) {
          for (var e = [], i = 0; i < t.pointers.length; )
            (e[i] = {
              clientX: le(t.pointers[i].clientX),
              clientY: le(t.pointers[i].clientY)
            }),
              i++;
          return {
            timeStamp: fe(),
            pointers: e,
            center: D(e),
            deltaX: t.deltaX,
            deltaY: t.deltaY
          };
        }
        function D(t) {
          var e,
            i,
            n,
            s = t.length;
          if (1 === s) return { x: le(t[0].clientX), y: le(t[0].clientY) };
          for (e = 0, i = 0, n = 0; n < s; )
            (e += t[n].clientX), (i += t[n].clientY), n++;
          return { x: le(e / s), y: le(i / s) };
        }
        function x(t, e, i) {
          return { x: e / t || 0, y: i / t || 0 };
        }
        function O(t, e) {
          return t === e
            ? Tt
            : pe(t) >= pe(e)
            ? t < 0
              ? yt
              : Et
            : e < 0
            ? It
            : At;
        }
        function R(t, e, i) {
          i || (i = Ct);
          var n = e[i[0]] - t[i[0]],
            s = e[i[1]] - t[i[1]];
          return Math.sqrt(n * n + s * s);
        }
        function M(t, e, i) {
          i || (i = Ct);
          var n = e[i[0]] - t[i[0]],
            s = e[i[1]] - t[i[1]];
          return (180 * Math.atan2(s, n)) / Math.PI;
        }
        function z() {
          (this.evEl = Dt),
            (this.evWin = xt),
            (this.pressed = !1),
            C.apply(this, arguments);
        }
        function N() {
          (this.evEl = Mt),
            (this.evWin = zt),
            C.apply(this, arguments),
            (this.store = this.manager.session.pointerEvents = []);
        }
        function X() {
          (this.evTarget = Xt),
            (this.evWin = Yt),
            (this.started = !1),
            C.apply(this, arguments);
        }
        function Y() {
          (this.evTarget = Wt), (this.targetIds = {}), C.apply(this, arguments);
        }
        function F() {
          C.apply(this, arguments);
          var t = f(this.handler, this);
          (this.touch = new Y(this.manager, t)),
            (this.mouse = new z(this.manager, t)),
            (this.primaryTouch = null),
            (this.lastTouches = []);
        }
        function W(t) {
          var e,
            i,
            n = t.changedPointers[0];
          n.identifier === this.primaryTouch &&
            ((e = { x: n.clientX, y: n.clientY }),
            this.lastTouches.push(e),
            (i = this.lastTouches),
            setTimeout(function() {
              var t = i.indexOf(e);
              t > -1 && i.splice(t, 1);
            }, kt));
        }
        function k(t, e) {
          (this.manager = t), this.set(e);
        }
        function q(t) {
          (this.options = et({}, this.defaults, t || {})),
            (this.id = st++),
            (this.manager = null),
            (this.options.enable = v(this.options.enable, !0)),
            (this.state = $t),
            (this.simultaneous = {}),
            (this.requireFail = []);
        }
        function L(t) {
          return t & ie
            ? "cancel"
            : t & te
            ? "end"
            : t & Qt
            ? "move"
            : t & Kt
            ? "start"
            : "";
        }
        function H(t) {
          return t == At
            ? "down"
            : t == It
            ? "up"
            : t == yt
            ? "left"
            : t == Et
            ? "right"
            : "";
        }
        function V(t, e) {
          var i = e.manager;
          return i ? i.get(t) : t;
        }
        function U() {
          q.apply(this, arguments);
        }
        function j() {
          U.apply(this, arguments), (this.pX = null), (this.pY = null);
        }
        function G() {
          U.apply(this, arguments);
        }
        function J() {
          q.apply(this, arguments), (this._timer = null), (this._input = null);
        }
        function Z() {
          U.apply(this, arguments);
        }
        function B() {
          U.apply(this, arguments);
        }
        function $() {
          q.apply(this, arguments),
            (this.pTime = !1),
            (this.pCenter = !1),
            (this._timer = null),
            (this._input = null),
            (this.count = 0);
        }
        function K(t, e) {
          return (
            ((e = e || {}).recognizers = v(e.recognizers, K.defaults.preset)),
            new Q(t, e)
          );
        }
        function Q(t, e) {
          var i;
          (this.options = et({}, K.defaults, e || {})),
            (this.options.inputTarget = this.options.inputTarget || t),
            (this.handlers = {}),
            (this.session = {}),
            (this.recognizers = []),
            (this.oldCssProps = {}),
            (this.element = t),
            (this.input = new ((i = this).options.inputClass ||
              (at ? N : ht ? Y : ot ? F : z))(i, w)),
            (this.touchAction = new k(this, this.options.touchAction)),
            tt(this, !0),
            c(
              this.options.recognizers,
              function(t) {
                var e = this.add(new t[0](t[1]));
                t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3]);
              },
              this
            );
        }
        function tt(t, e) {
          var i,
            n = t.element;
          n.style &&
            (c(t.options.cssProps, function(s, r) {
              (i = S(n.style, r)),
                e
                  ? ((t.oldCssProps[i] = n.style[i]), (n.style[i] = s))
                  : (n.style[i] = t.oldCssProps[i] || "");
            }),
            e || (t.oldCssProps = {}));
        }
        var et,
          it,
          nt,
          st,
          rt,
          ot,
          at,
          ht,
          ut,
          ct,
          lt,
          pt,
          ft,
          dt,
          vt,
          mt,
          gt,
          Tt,
          yt,
          Et,
          It,
          At,
          bt,
          St,
          _t,
          Ct,
          wt,
          Pt,
          Dt,
          xt,
          Ot,
          Rt,
          Mt,
          zt,
          Nt,
          Xt,
          Yt,
          Ft,
          Wt,
          kt,
          qt,
          Lt,
          Ht,
          Vt,
          Ut,
          jt,
          Gt,
          Jt,
          Zt,
          Bt,
          $t,
          Kt,
          Qt,
          te,
          ee,
          ie,
          ne,
          se,
          re,
          oe,
          ae,
          he = ["", "webkit", "Moz", "MS", "ms", "o"],
          ue = r.createElement("div"),
          ce = "function",
          le = Math.round,
          pe = Math.abs,
          fe = Date.now;
        (et =
          "function" != typeof Object.assign
            ? function(t) {
                var e, i, n, s;
                if (t === a || null === t)
                  throw new TypeError(
                    "Cannot convert undefined or null to object"
                  );
                for (e = Object(t), i = 1; i < arguments.length; i++)
                  if ((n = arguments[i]) !== a && null !== n)
                    for (s in n) n.hasOwnProperty(s) && (e[s] = n[s]);
                return e;
              }
            : Object.assign),
          (it = l(
            function(t, e, i) {
              for (var n = Object.keys(e), s = 0; s < n.length; )
                (!i || (i && t[n[s]] === a)) && (t[n[s]] = e[n[s]]), s++;
              return t;
            },
            "extend",
            "Use `assign`."
          )),
          (nt = l(
            function(t, e) {
              return it(t, e, !0);
            },
            "merge",
            "Use `assign`."
          )),
          (st = 1),
          (rt = /mobile|tablet|ip(ad|hone|od)|android/i),
          (ot = "ontouchstart" in s),
          (at = S(s, "PointerEvent") !== a),
          (ht = ot && rt.test(navigator.userAgent)),
          (ut = "touch"),
          (ct = "pen"),
          (lt = "mouse"),
          (pt = "kinect"),
          (ft = 25),
          (dt = 1),
          (vt = 2),
          (mt = 4),
          (gt = 8),
          (Tt = 1),
          (_t = (bt = (yt = 2) | (Et = 4)) | (St = (It = 8) | (At = 16))),
          (Ct = ["x", "y"]),
          (wt = ["clientX", "clientY"]),
          (C.prototype = {
            handler: function() {},
            init: function() {
              this.evEl && m(this.element, this.evEl, this.domHandler),
                this.evTarget && m(this.target, this.evTarget, this.domHandler),
                this.evWin && m(_(this.element), this.evWin, this.domHandler);
            },
            destroy: function() {
              this.evEl && g(this.element, this.evEl, this.domHandler),
                this.evTarget && g(this.target, this.evTarget, this.domHandler),
                this.evWin && g(_(this.element), this.evWin, this.domHandler);
            }
          }),
          (Pt = { mousedown: dt, mousemove: vt, mouseup: mt }),
          (Dt = "mousedown"),
          (xt = "mousemove mouseup"),
          p(z, C, {
            handler: function(t) {
              var e = Pt[t.type];
              e & dt && 0 === t.button && (this.pressed = !0),
                e & vt && 1 !== t.which && (e = mt),
                this.pressed &&
                  (e & mt && (this.pressed = !1),
                  this.callback(this.manager, e, {
                    pointers: [t],
                    changedPointers: [t],
                    pointerType: lt,
                    srcEvent: t
                  }));
            }
          }),
          (Ot = {
            pointerdown: dt,
            pointermove: vt,
            pointerup: mt,
            pointercancel: gt,
            pointerout: gt
          }),
          (Rt = { 2: ut, 3: ct, 4: lt, 5: pt }),
          (Mt = "pointerdown"),
          (zt = "pointermove pointerup pointercancel"),
          s.MSPointerEvent &&
            !s.PointerEvent &&
            ((Mt = "MSPointerDown"),
            (zt = "MSPointerMove MSPointerUp MSPointerCancel")),
          p(N, C, {
            handler: function(t) {
              var e = this.store,
                i = !1,
                n = t.type.toLowerCase().replace("ms", ""),
                s = Ot[n],
                r = Rt[t.pointerType] || t.pointerType,
                o = r == ut,
                a = I(e, t.pointerId, "pointerId");
              s & dt && (0 === t.button || o)
                ? a < 0 && (e.push(t), (a = e.length - 1))
                : s & (mt | gt) && (i = !0),
                a < 0 ||
                  ((e[a] = t),
                  this.callback(this.manager, s, {
                    pointers: e,
                    changedPointers: [t],
                    pointerType: r,
                    srcEvent: t
                  }),
                  i && e.splice(a, 1));
            }
          }),
          (Nt = {
            touchstart: dt,
            touchmove: vt,
            touchend: mt,
            touchcancel: gt
          }),
          (Xt = "touchstart"),
          (Yt = "touchstart touchmove touchend touchcancel"),
          p(X, C, {
            handler: function(t) {
              var e,
                i = Nt[t.type];
              i === dt && (this.started = !0),
                this.started &&
                  ((e = function(t, e) {
                    var i = A(t.touches),
                      n = A(t.changedTouches);
                    return (
                      e & (mt | gt) && (i = b(i.concat(n), "identifier", !0)),
                      [i, n]
                    );
                  }.call(this, t, i)),
                  i & (mt | gt) &&
                    e[0].length - e[1].length == 0 &&
                    (this.started = !1),
                  this.callback(this.manager, i, {
                    pointers: e[0],
                    changedPointers: e[1],
                    pointerType: ut,
                    srcEvent: t
                  }));
            }
          }),
          (Ft = {
            touchstart: dt,
            touchmove: vt,
            touchend: mt,
            touchcancel: gt
          }),
          (Wt = "touchstart touchmove touchend touchcancel"),
          p(Y, C, {
            handler: function(t) {
              var e = Ft[t.type],
                i = function(t, e) {
                  var i,
                    n,
                    s,
                    r,
                    o,
                    a = A(t.touches),
                    h = this.targetIds;
                  if (e & (dt | vt) && 1 === a.length)
                    return (h[a[0].identifier] = !0), [a, a];
                  if (
                    ((s = A(t.changedTouches)),
                    (r = []),
                    (o = this.target),
                    (n = a.filter(function(t) {
                      return T(t.target, o);
                    })),
                    e === dt)
                  )
                    for (i = 0; i < n.length; ) (h[n[i].identifier] = !0), i++;
                  for (i = 0; i < s.length; )
                    h[s[i].identifier] && r.push(s[i]),
                      e & (mt | gt) && delete h[s[i].identifier],
                      i++;
                  return r.length
                    ? [b(n.concat(r), "identifier", !0), r]
                    : void 0;
                }.call(this, t, e);
              i &&
                this.callback(this.manager, e, {
                  pointers: i[0],
                  changedPointers: i[1],
                  pointerType: ut,
                  srcEvent: t
                });
            }
          }),
          (kt = 2500),
          (qt = 25),
          p(F, C, {
            handler: function(t, e, i) {
              var n = i.pointerType == ut,
                s = i.pointerType == lt;
              if (
                !(
                  s &&
                  i.sourceCapabilities &&
                  i.sourceCapabilities.firesTouchEvents
                )
              ) {
                if (n)
                  (function(t, e) {
                    t & dt
                      ? ((this.primaryTouch = e.changedPointers[0].identifier),
                        W.call(this, e))
                      : t & (mt | gt) && W.call(this, e);
                  }.call(this, e, i));
                else if (
                  s &&
                  function(t) {
                    var e,
                      i,
                      n,
                      s,
                      r = t.srcEvent.clientX,
                      o = t.srcEvent.clientY;
                    for (e = 0; e < this.lastTouches.length; e++)
                      if (
                        ((i = this.lastTouches[e]),
                        (n = Math.abs(r - i.x)),
                        (s = Math.abs(o - i.y)),
                        n <= qt && s <= qt)
                      )
                        return !0;
                    return !1;
                  }.call(this, i)
                )
                  return;
                this.callback(t, e, i);
              }
            },
            destroy: function() {
              this.touch.destroy(), this.mouse.destroy();
            }
          }),
          (Lt = S(ue.style, "touchAction")),
          (Vt = "compute"),
          (Ut = "auto"),
          (jt = "manipulation"),
          (Gt = "none"),
          (Jt = "pan-x"),
          (Zt = "pan-y"),
          (Bt =
            !!(Ht = Lt !== a) &&
            ((oe = {}),
            (ae = s.CSS && s.CSS.supports),
            [
              "auto",
              "manipulation",
              "pan-y",
              "pan-x",
              "pan-x pan-y",
              "none"
            ].forEach(function(t) {
              oe[t] = !ae || s.CSS.supports("touch-action", t);
            }),
            oe)),
          (k.prototype = {
            set: function(t) {
              t == Vt && (t = this.compute()),
                Ht &&
                  this.manager.element.style &&
                  Bt[t] &&
                  (this.manager.element.style[Lt] = t),
                (this.actions = t.toLowerCase().trim());
            },
            update: function() {
              this.set(this.manager.options.touchAction);
            },
            compute: function() {
              var t = [];
              return (
                c(this.manager.recognizers, function(e) {
                  d(e.options.enable, [e]) &&
                    (t = t.concat(e.getTouchAction()));
                }),
                (function(t) {
                  var e, i;
                  return y(t, Gt)
                    ? Gt
                    : ((e = y(t, Jt)),
                      (i = y(t, Zt)),
                      e && i
                        ? Gt
                        : e || i
                        ? e
                          ? Jt
                          : Zt
                        : y(t, jt)
                        ? jt
                        : Ut);
                })(t.join(" "))
              );
            },
            preventDefaults: function(t) {
              var e,
                i,
                n,
                s,
                r,
                o,
                a,
                h = t.srcEvent,
                u = t.offsetDirection;
              if (this.manager.session.prevented) h.preventDefault();
              else if (
                ((i = y((e = this.actions), Gt) && !Bt[Gt]),
                (n = y(e, Zt) && !Bt[Zt]),
                (s = y(e, Jt) && !Bt[Jt]),
                !(
                  (i &&
                    ((r = 1 === t.pointers.length),
                    (o = t.distance < 2),
                    (a = t.deltaTime < 250),
                    r && o && a)) ||
                  (s && n)
                ))
              )
                return i || (n && u & bt) || (s && u & St)
                  ? this.preventSrc(h)
                  : void 0;
            },
            preventSrc: function(t) {
              (this.manager.session.prevented = !0), t.preventDefault();
            }
          }),
          ($t = 1),
          (Kt = 2),
          (Qt = 4),
          (ee = te = 8),
          (ie = 16),
          (ne = 32),
          (q.prototype = {
            defaults: {},
            set: function(t) {
              return (
                et(this.options, t),
                this.manager && this.manager.touchAction.update(),
                this
              );
            },
            recognizeWith: function(t) {
              if (u(t, "recognizeWith", this)) return this;
              var e = this.simultaneous;
              return (
                e[(t = V(t, this)).id] ||
                  ((e[t.id] = t), t.recognizeWith(this)),
                this
              );
            },
            dropRecognizeWith: function(t) {
              return u(t, "dropRecognizeWith", this)
                ? this
                : ((t = V(t, this)), delete this.simultaneous[t.id], this);
            },
            requireFailure: function(t) {
              if (u(t, "requireFailure", this)) return this;
              var e = this.requireFail;
              return (
                -1 === I(e, (t = V(t, this))) &&
                  (e.push(t), t.requireFailure(this)),
                this
              );
            },
            dropRequireFailure: function(t) {
              if (u(t, "dropRequireFailure", this)) return this;
              t = V(t, this);
              var e = I(this.requireFail, t);
              return e > -1 && this.requireFail.splice(e, 1), this;
            },
            hasRequireFailures: function() {
              return this.requireFail.length > 0;
            },
            canRecognizeWith: function(t) {
              return !!this.simultaneous[t.id];
            },
            emit: function(t) {
              function e(e) {
                i.manager.emit(e, t);
              }
              var i = this,
                n = this.state;
              n < te && e(i.options.event + L(n)),
                e(i.options.event),
                t.additionalEvent && e(t.additionalEvent),
                n >= te && e(i.options.event + L(n));
            },
            tryEmit: function(t) {
              if (this.canEmit()) return this.emit(t);
              this.state = ne;
            },
            canEmit: function() {
              for (var t = 0; t < this.requireFail.length; ) {
                if (!(this.requireFail[t].state & (ne | $t))) return !1;
                t++;
              }
              return !0;
            },
            recognize: function(t) {
              var e = et({}, t);
              if (!d(this.options.enable, [this, e]))
                return this.reset(), void (this.state = ne);
              this.state & (ee | ie | ne) && (this.state = $t),
                (this.state = this.process(e)),
                this.state & (Kt | Qt | te | ie) && this.tryEmit(e);
            },
            process: function(t) {},
            getTouchAction: function() {},
            reset: function() {}
          }),
          p(U, q, {
            defaults: { pointers: 1 },
            attrTest: function(t) {
              var e = this.options.pointers;
              return 0 === e || t.pointers.length === e;
            },
            process: function(t) {
              var e = this.state,
                i = t.eventType,
                n = e & (Kt | Qt),
                s = this.attrTest(t);
              return n && (i & gt || !s)
                ? e | ie
                : n || s
                ? i & mt
                  ? e | te
                  : e & Kt
                  ? e | Qt
                  : Kt
                : ne;
            }
          }),
          p(j, U, {
            defaults: {
              event: "pan",
              threshold: 10,
              pointers: 1,
              direction: _t
            },
            getTouchAction: function() {
              var t = this.options.direction,
                e = [];
              return t & bt && e.push(Zt), t & St && e.push(Jt), e;
            },
            directionTest: function(t) {
              var e = this.options,
                i = !0,
                n = t.distance,
                s = t.direction,
                r = t.deltaX,
                o = t.deltaY;
              return (
                s & e.direction ||
                  (e.direction & bt
                    ? ((s = 0 === r ? Tt : r < 0 ? yt : Et),
                      (i = r != this.pX),
                      (n = Math.abs(t.deltaX)))
                    : ((s = 0 === o ? Tt : o < 0 ? It : At),
                      (i = o != this.pY),
                      (n = Math.abs(t.deltaY)))),
                (t.direction = s),
                i && n > e.threshold && s & e.direction
              );
            },
            attrTest: function(t) {
              return (
                U.prototype.attrTest.call(this, t) &&
                (this.state & Kt ||
                  (!(this.state & Kt) && this.directionTest(t)))
              );
            },
            emit: function(t) {
              (this.pX = t.deltaX), (this.pY = t.deltaY);
              var e = H(t.direction);
              e && (t.additionalEvent = this.options.event + e),
                this._super.emit.call(this, t);
            }
          }),
          p(G, U, {
            defaults: { event: "pinch", threshold: 0, pointers: 2 },
            getTouchAction: function() {
              return [Gt];
            },
            attrTest: function(t) {
              return (
                this._super.attrTest.call(this, t) &&
                (Math.abs(t.scale - 1) > this.options.threshold ||
                  this.state & Kt)
              );
            },
            emit: function(t) {
              if (1 !== t.scale) {
                var e = t.scale < 1 ? "in" : "out";
                t.additionalEvent = this.options.event + e;
              }
              this._super.emit.call(this, t);
            }
          }),
          p(J, q, {
            defaults: { event: "press", pointers: 1, time: 251, threshold: 9 },
            getTouchAction: function() {
              return [Ut];
            },
            process: function(t) {
              var e = this.options,
                i = t.pointers.length === e.pointers,
                n = t.distance < e.threshold,
                s = t.deltaTime > e.time;
              if (
                ((this._input = t), !n || !i || (t.eventType & (mt | gt) && !s))
              )
                this.reset();
              else if (t.eventType & dt)
                this.reset(),
                  (this._timer = h(
                    function() {
                      (this.state = ee), this.tryEmit();
                    },
                    e.time,
                    this
                  ));
              else if (t.eventType & mt) return ee;
              return ne;
            },
            reset: function() {
              clearTimeout(this._timer);
            },
            emit: function(t) {
              this.state === ee &&
                (t && t.eventType & mt
                  ? this.manager.emit(this.options.event + "up", t)
                  : ((this._input.timeStamp = fe()),
                    this.manager.emit(this.options.event, this._input)));
            }
          }),
          p(Z, U, {
            defaults: { event: "rotate", threshold: 0, pointers: 2 },
            getTouchAction: function() {
              return [Gt];
            },
            attrTest: function(t) {
              return (
                this._super.attrTest.call(this, t) &&
                (Math.abs(t.rotation) > this.options.threshold ||
                  this.state & Kt)
              );
            }
          }),
          p(B, U, {
            defaults: {
              event: "swipe",
              threshold: 10,
              velocity: 0.3,
              direction: bt | St,
              pointers: 1
            },
            getTouchAction: function() {
              return j.prototype.getTouchAction.call(this);
            },
            attrTest: function(t) {
              var e,
                i = this.options.direction;
              return (
                i & (bt | St)
                  ? (e = t.overallVelocity)
                  : i & bt
                  ? (e = t.overallVelocityX)
                  : i & St && (e = t.overallVelocityY),
                this._super.attrTest.call(this, t) &&
                  i & t.offsetDirection &&
                  t.distance > this.options.threshold &&
                  t.maxPointers == this.options.pointers &&
                  pe(e) > this.options.velocity &&
                  t.eventType & mt
              );
            },
            emit: function(t) {
              var e = H(t.offsetDirection);
              e && this.manager.emit(this.options.event + e, t),
                this.manager.emit(this.options.event, t);
            }
          }),
          p($, q, {
            defaults: {
              event: "tap",
              pointers: 1,
              taps: 1,
              interval: 300,
              time: 250,
              threshold: 9,
              posThreshold: 10
            },
            getTouchAction: function() {
              return [jt];
            },
            process: function(t) {
              var e,
                i,
                n = this.options,
                s = t.pointers.length === n.pointers,
                r = t.distance < n.threshold,
                o = t.deltaTime < n.time;
              if ((this.reset(), t.eventType & dt && 0 === this.count))
                return this.failTimeout();
              if (r && o && s) {
                if (t.eventType != mt) return this.failTimeout();
                if (
                  ((e = !this.pTime || t.timeStamp - this.pTime < n.interval),
                  (i =
                    !this.pCenter ||
                    R(this.pCenter, t.center) < n.posThreshold),
                  (this.pTime = t.timeStamp),
                  (this.pCenter = t.center),
                  i && e ? (this.count += 1) : (this.count = 1),
                  (this._input = t),
                  0 === this.count % n.taps)
                )
                  return this.hasRequireFailures()
                    ? ((this._timer = h(
                        function() {
                          (this.state = ee), this.tryEmit();
                        },
                        n.interval,
                        this
                      )),
                      Kt)
                    : ee;
              }
              return ne;
            },
            failTimeout: function() {
              return (
                (this._timer = h(
                  function() {
                    this.state = ne;
                  },
                  this.options.interval,
                  this
                )),
                ne
              );
            },
            reset: function() {
              clearTimeout(this._timer);
            },
            emit: function() {
              this.state == ee &&
                ((this._input.tapCount = this.count),
                this.manager.emit(this.options.event, this._input));
            }
          }),
          (K.VERSION = "2.0.7"),
          (K.defaults = {
            domEvents: !1,
            touchAction: Vt,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [
              [Z, { enable: !1 }],
              [G, { enable: !1 }, ["rotate"]],
              [B, { direction: bt }],
              [j, { direction: bt }, ["swipe"]],
              [$],
              [$, { event: "doubletap", taps: 2 }, ["tap"]],
              [J]
            ],
            cssProps: {
              userSelect: "none",
              touchSelect: "none",
              touchCallout: "none",
              contentZooming: "none",
              userDrag: "none",
              tapHighlightColor: "rgba(0,0,0,0)"
            }
          }),
          (se = 1),
          (re = 2),
          (Q.prototype = {
            set: function(t) {
              return (
                et(this.options, t),
                t.touchAction && this.touchAction.update(),
                t.inputTarget &&
                  (this.input.destroy(),
                  (this.input.target = t.inputTarget),
                  this.input.init()),
                this
              );
            },
            stop: function(t) {
              this.session.stopped = t ? re : se;
            },
            recognize: function(t) {
              var e,
                i,
                n,
                s,
                r = this.session;
              if (!r.stopped)
                for (
                  this.touchAction.preventDefaults(t),
                    i = this.recognizers,
                    (!(n = r.curRecognizer) || (n && n.state & ee)) &&
                      (n = r.curRecognizer = null),
                    s = 0;
                  s < i.length;

                )
                  (e = i[s]),
                    r.stopped === re || (n && e != n && !e.canRecognizeWith(n))
                      ? e.reset()
                      : e.recognize(t),
                    !n && e.state & (Kt | Qt | te) && (n = r.curRecognizer = e),
                    s++;
            },
            get: function(t) {
              var e, i;
              if (t instanceof q) return t;
              for (e = this.recognizers, i = 0; i < e.length; i++)
                if (e[i].options.event == t) return e[i];
              return null;
            },
            add: function(t) {
              if (u(t, "add", this)) return this;
              var e = this.get(t.options.event);
              return (
                e && this.remove(e),
                this.recognizers.push(t),
                (t.manager = this),
                this.touchAction.update(),
                t
              );
            },
            remove: function(t) {
              var e, i;
              return u(t, "remove", this)
                ? this
                : ((t = this.get(t)) &&
                    -1 !== (i = I((e = this.recognizers), t)) &&
                    (e.splice(i, 1), this.touchAction.update()),
                  this);
            },
            on: function(t, e) {
              if (t !== a && e !== a) {
                var i = this.handlers;
                return (
                  c(E(t), function(t) {
                    (i[t] = i[t] || []), i[t].push(e);
                  }),
                  this
                );
              }
            },
            off: function(t, e) {
              if (t !== a) {
                var i = this.handlers;
                return (
                  c(E(t), function(t) {
                    e ? i[t] && i[t].splice(I(i[t], e), 1) : delete i[t];
                  }),
                  this
                );
              }
            },
            emit: function(t, e) {
              var i, n;
              if (
                (this.options.domEvents &&
                  (function(t, e) {
                    var i = r.createEvent("Event");
                    i.initEvent(t, !0, !0),
                      (i.gesture = e),
                      e.target.dispatchEvent(i);
                  })(t, e),
                (i = this.handlers[t] && this.handlers[t].slice()) && i.length)
              )
                for (
                  e.type = t,
                    e.preventDefault = function() {
                      e.srcEvent.preventDefault();
                    },
                    n = 0;
                  n < i.length;

                )
                  i[n](e), n++;
            },
            destroy: function() {
              this.element && tt(this, !1),
                (this.handlers = {}),
                (this.session = {}),
                this.input.destroy(),
                (this.element = null);
            }
          }),
          et(K, {
            INPUT_START: dt,
            INPUT_MOVE: vt,
            INPUT_END: mt,
            INPUT_CANCEL: gt,
            STATE_POSSIBLE: $t,
            STATE_BEGAN: Kt,
            STATE_CHANGED: Qt,
            STATE_ENDED: te,
            STATE_RECOGNIZED: ee,
            STATE_CANCELLED: ie,
            STATE_FAILED: ne,
            DIRECTION_NONE: Tt,
            DIRECTION_LEFT: yt,
            DIRECTION_RIGHT: Et,
            DIRECTION_UP: It,
            DIRECTION_DOWN: At,
            DIRECTION_HORIZONTAL: bt,
            DIRECTION_VERTICAL: St,
            DIRECTION_ALL: _t,
            Manager: Q,
            Input: C,
            TouchAction: k,
            TouchInput: Y,
            MouseInput: z,
            PointerEventInput: N,
            TouchMouseInput: F,
            SingleTouchInput: X,
            Recognizer: q,
            AttrRecognizer: U,
            Tap: $,
            Pan: j,
            Swipe: B,
            Pinch: G,
            Rotate: Z,
            Press: J,
            on: m,
            off: g,
            each: c,
            merge: nt,
            extend: it,
            assign: et,
            inherit: p,
            bindFn: f,
            prefixed: S
          }),
          ((void 0 !== s
            ? s
            : "undefined" != typeof self
            ? self
            : {}
          ).Hammer = K),
          (n = function() {
            return K;
          }.call(e, i, e, t)) === a || (t.exports = n);
      })(window, document);
    }
  }
]);
