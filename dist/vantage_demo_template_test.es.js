var Xr = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
};
var h = (t, e, r) => (Xr(t, e, "read from private field"), r ? r.call(t) : e.get(t)), O = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, C = (t, e, r, n) => (Xr(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r);
var yr = (t, e, r, n) => ({
  set _(s) {
    C(t, e, s, r);
  },
  get _() {
    return h(t, e, n);
  }
}), T = (t, e, r) => (Xr(t, e, "access private method"), r);
import * as v from "react";
import Ua, { useState as re, useEffect as Y, useMemo as Se, useRef as Lr, useCallback as xo, createContext as Eo, useContext as gn, memo as Co, useReducer as So } from "react";
import { createPortal as Ao } from "react-dom";
var je = /* @__PURE__ */ ((t) => (t[t.SINGLE_SELECT = 0] = "SINGLE_SELECT", t[t.MULTI_SELECT = 1] = "MULTI_SELECT", t))(je || {});
class Ro {
  toggleFilters(e, r) {
    const n = r[0];
    return e.some(
      (a) => a.slug === n.slug
    ) ? [] : [n];
  }
}
class No {
  toggleFilters(e, r) {
    const [n, s] = r.reduce(
      (a, i) => {
        const [o, l] = [0, 1];
        return e.includes(i) ? (a[l].push(i), a) : (a[o].push(i), a);
      },
      [[], []]
    );
    return [
      // Deactivate some
      ...e.filter(
        (a) => !s.includes(a)
      ),
      // Activate some
      ...n
    ];
  }
}
const Oo = {
  [je.SINGLE_SELECT]: new Ro(),
  [je.MULTI_SELECT]: new No()
}, Po = ({
  filterType: t,
  getAvailableFilters: e,
  getPopularFilters: r
}) => {
  const [n, s] = re([]), [a, i] = re([]);
  Y(() => {
    e().then((c) => {
      s(c);
    });
  }, []);
  const o = (c) => {
    i(
      Oo[t].toggleFilters(
        a,
        c
      )
    );
  }, l = () => {
    const c = a.reduce((m, g) => (m[g.categorySlug] || (m[g.categorySlug] = []), m[g.categorySlug].push(
      // eslint-disable-next-line no-useless-escape
      `${g.categorySlug}:"${g.slug}"`
    ), m), {}), d = Object.keys(c).map((m) => `(${c[m].join(" OR ")})`).join(" AND ");
    return d.includes("AND") ? `(${d})` : d;
  }, f = () => {
    i([]);
  };
  return {
    availableFilters: n,
    popularFilters: n && r ? r(n) : [],
    activeFilters: a,
    setActiveFilters: i,
    toggleFilters: o,
    getFilterString: l,
    clearActiveFilters: f
  };
};
var It = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(t) {
    return this.listeners.add(t), this.onSubscribe(), () => {
      this.listeners.delete(t), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, Ot = typeof window > "u" || "Deno" in window;
function fe() {
}
function To(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function yn(t) {
  return typeof t == "number" && t >= 0 && t !== 1 / 0;
}
function Fa(t, e) {
  return Math.max(t + (e || 0) - Date.now(), 0);
}
function Rs(t, e) {
  const {
    type: r = "all",
    exact: n,
    fetchStatus: s,
    predicate: a,
    queryKey: i,
    stale: o
  } = t;
  if (i) {
    if (n) {
      if (e.queryHash !== Bn(i, e.options))
        return !1;
    } else if (!Qt(e.queryKey, i))
      return !1;
  }
  if (r !== "all") {
    const l = e.isActive();
    if (r === "active" && !l || r === "inactive" && l)
      return !1;
  }
  return !(typeof o == "boolean" && e.isStale() !== o || typeof s < "u" && s !== e.state.fetchStatus || a && !a(e));
}
function Ns(t, e) {
  const { exact: r, status: n, predicate: s, mutationKey: a } = t;
  if (a) {
    if (!e.options.mutationKey)
      return !1;
    if (r) {
      if (qt(e.options.mutationKey) !== qt(a))
        return !1;
    } else if (!Qt(e.options.mutationKey, a))
      return !1;
  }
  return !(n && e.state.status !== n || s && !s(e));
}
function Bn(t, e) {
  return ((e == null ? void 0 : e.queryKeyHashFn) || qt)(t);
}
function qt(t) {
  return JSON.stringify(
    t,
    (e, r) => wn(r) ? Object.keys(r).sort().reduce((n, s) => (n[s] = r[s], n), {}) : r
  );
}
function Qt(t, e) {
  return t === e ? !0 : typeof t != typeof e ? !1 : t && e && typeof t == "object" && typeof e == "object" ? !Object.keys(e).some((r) => !Qt(t[r], e[r])) : !1;
}
function qn(t, e) {
  if (t === e)
    return t;
  const r = Os(t) && Os(e);
  if (r || wn(t) && wn(e)) {
    const n = r ? t.length : Object.keys(t).length, s = r ? e : Object.keys(e), a = s.length, i = r ? [] : {};
    let o = 0;
    for (let l = 0; l < a; l++) {
      const f = r ? l : s[l];
      i[f] = qn(t[f], e[f]), i[f] === t[f] && o++;
    }
    return n === a && o === n ? t : i;
  }
  return e;
}
function bn(t, e) {
  if (t && !e || e && !t)
    return !1;
  for (const r in t)
    if (t[r] !== e[r])
      return !1;
  return !0;
}
function Os(t) {
  return Array.isArray(t) && t.length === Object.keys(t).length;
}
function wn(t) {
  if (!Ps(t))
    return !1;
  const e = t.constructor;
  if (typeof e > "u")
    return !0;
  const r = e.prototype;
  return !(!Ps(r) || !r.hasOwnProperty("isPrototypeOf"));
}
function Ps(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function Ma(t) {
  return new Promise((e) => {
    setTimeout(e, t);
  });
}
function Ts(t) {
  Ma(0).then(t);
}
function xn(t, e, r) {
  return typeof r.structuralSharing == "function" ? r.structuralSharing(t, e) : r.structuralSharing !== !1 ? qn(t, e) : e;
}
function Do(t, e, r = 0) {
  const n = [...t, e];
  return r && n.length > r ? n.slice(1) : n;
}
function Io(t, e, r = 0) {
  const n = [e, ...t];
  return r && n.length > r ? n.slice(0, -1) : n;
}
var _e, Te, lt, Aa, ko = (Aa = class extends It {
  constructor() {
    super();
    O(this, _e, void 0);
    O(this, Te, void 0);
    O(this, lt, void 0);
    C(this, lt, (e) => {
      if (!Ot && window.addEventListener) {
        const r = () => e();
        return window.addEventListener("visibilitychange", r, !1), () => {
          window.removeEventListener("visibilitychange", r);
        };
      }
    });
  }
  onSubscribe() {
    h(this, Te) || this.setEventListener(h(this, lt));
  }
  onUnsubscribe() {
    var e;
    this.hasListeners() || ((e = h(this, Te)) == null || e.call(this), C(this, Te, void 0));
  }
  setEventListener(e) {
    var r;
    C(this, lt, e), (r = h(this, Te)) == null || r.call(this), C(this, Te, e((n) => {
      typeof n == "boolean" ? this.setFocused(n) : this.onFocus();
    }));
  }
  setFocused(e) {
    h(this, _e) !== e && (C(this, _e, e), this.onFocus());
  }
  onFocus() {
    this.listeners.forEach((e) => {
      e();
    });
  }
  isFocused() {
    var e;
    return typeof h(this, _e) == "boolean" ? h(this, _e) : ((e = globalThis.document) == null ? void 0 : e.visibilityState) !== "hidden";
  }
}, _e = new WeakMap(), Te = new WeakMap(), lt = new WeakMap(), Aa), Or = new ko(), ct, De, ut, Ra, Lo = (Ra = class extends It {
  constructor() {
    super();
    O(this, ct, !0);
    O(this, De, void 0);
    O(this, ut, void 0);
    C(this, ut, (e) => {
      if (!Ot && window.addEventListener) {
        const r = () => e(!0), n = () => e(!1);
        return window.addEventListener("online", r, !1), window.addEventListener("offline", n, !1), () => {
          window.removeEventListener("online", r), window.removeEventListener("offline", n);
        };
      }
    });
  }
  onSubscribe() {
    h(this, De) || this.setEventListener(h(this, ut));
  }
  onUnsubscribe() {
    var e;
    this.hasListeners() || ((e = h(this, De)) == null || e.call(this), C(this, De, void 0));
  }
  setEventListener(e) {
    var r;
    C(this, ut, e), (r = h(this, De)) == null || r.call(this), C(this, De, e(this.setOnline.bind(this)));
  }
  setOnline(e) {
    h(this, ct) !== e && (C(this, ct, e), this.listeners.forEach((n) => {
      n(e);
    }));
  }
  isOnline() {
    return h(this, ct);
  }
}, ct = new WeakMap(), De = new WeakMap(), ut = new WeakMap(), Ra), Pr = new Lo();
function Uo(t) {
  return Math.min(1e3 * 2 ** t, 3e4);
}
function Ur(t) {
  return (t ?? "online") === "online" ? Pr.isOnline() : !0;
}
var Va = class {
  constructor(t) {
    this.revert = t == null ? void 0 : t.revert, this.silent = t == null ? void 0 : t.silent;
  }
};
function Jr(t) {
  return t instanceof Va;
}
function ja(t) {
  let e = !1, r = 0, n = !1, s, a, i;
  const o = new Promise((b, y) => {
    a = b, i = y;
  }), l = (b) => {
    var y;
    n || (g(new Va(b)), (y = t.abort) == null || y.call(t));
  }, f = () => {
    e = !0;
  }, c = () => {
    e = !1;
  }, d = () => !Or.isFocused() || t.networkMode !== "always" && !Pr.isOnline(), m = (b) => {
    var y;
    n || (n = !0, (y = t.onSuccess) == null || y.call(t, b), s == null || s(), a(b));
  }, g = (b) => {
    var y;
    n || (n = !0, (y = t.onError) == null || y.call(t, b), s == null || s(), i(b));
  }, E = () => new Promise((b) => {
    var y;
    s = (w) => {
      const R = n || !d();
      return R && b(w), R;
    }, (y = t.onPause) == null || y.call(t);
  }).then(() => {
    var b;
    s = void 0, n || (b = t.onContinue) == null || b.call(t);
  }), S = () => {
    if (n)
      return;
    let b;
    try {
      b = t.fn();
    } catch (y) {
      b = Promise.reject(y);
    }
    Promise.resolve(b).then(m).catch((y) => {
      var U;
      if (n)
        return;
      const w = t.retry ?? (Ot ? 0 : 3), R = t.retryDelay ?? Uo, I = typeof R == "function" ? R(r, y) : R, N = w === !0 || typeof w == "number" && r < w || typeof w == "function" && w(r, y);
      if (e || !N) {
        g(y);
        return;
      }
      r++, (U = t.onFail) == null || U.call(t, r, y), Ma(I).then(() => {
        if (d())
          return E();
      }).then(() => {
        e ? g(y) : S();
      });
    });
  };
  return Ur(t.networkMode) ? S() : E().then(S), {
    promise: o,
    cancel: l,
    continue: () => (s == null ? void 0 : s()) ? o : Promise.resolve(),
    cancelRetry: f,
    continueRetry: c
  };
}
function Fo() {
  let t = [], e = 0, r = (c) => {
    c();
  }, n = (c) => {
    c();
  };
  const s = (c) => {
    let d;
    e++;
    try {
      d = c();
    } finally {
      e--, e || o();
    }
    return d;
  }, a = (c) => {
    e ? t.push(c) : Ts(() => {
      r(c);
    });
  }, i = (c) => (...d) => {
    a(() => {
      c(...d);
    });
  }, o = () => {
    const c = t;
    t = [], c.length && Ts(() => {
      n(() => {
        c.forEach((d) => {
          r(d);
        });
      });
    });
  };
  return {
    batch: s,
    batchCalls: i,
    schedule: a,
    setNotifyFunction: (c) => {
      r = c;
    },
    setBatchNotifyFunction: (c) => {
      n = c;
    }
  };
}
var z = Fo(), Ke, Na, Ba = (Na = class {
  constructor() {
    O(this, Ke, void 0);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), yn(this.gcTime) && C(this, Ke, setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(t) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      t ?? (Ot ? 1 / 0 : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    h(this, Ke) && (clearTimeout(h(this, Ke)), C(this, Ke, void 0));
  }
}, Ke = new WeakMap(), Na), dt, ft, ce, Ie, ue, G, Yt, We, ht, xr, me, Ee, Oa, Mo = (Oa = class extends Ba {
  constructor(e) {
    super();
    O(this, ht);
    O(this, me);
    O(this, dt, void 0);
    O(this, ft, void 0);
    O(this, ce, void 0);
    O(this, Ie, void 0);
    O(this, ue, void 0);
    O(this, G, void 0);
    O(this, Yt, void 0);
    O(this, We, void 0);
    C(this, We, !1), C(this, Yt, e.defaultOptions), T(this, ht, xr).call(this, e.options), C(this, G, []), C(this, ce, e.cache), this.queryKey = e.queryKey, this.queryHash = e.queryHash, C(this, dt, e.state || Vo(this.options)), this.state = h(this, dt), this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  optionalRemove() {
    !h(this, G).length && this.state.fetchStatus === "idle" && h(this, ce).remove(this);
  }
  setData(e, r) {
    const n = xn(this.state.data, e, this.options);
    return T(this, me, Ee).call(this, {
      data: n,
      type: "success",
      dataUpdatedAt: r == null ? void 0 : r.updatedAt,
      manual: r == null ? void 0 : r.manual
    }), n;
  }
  setState(e, r) {
    T(this, me, Ee).call(this, { type: "setState", state: e, setStateOptions: r });
  }
  cancel(e) {
    var n;
    const r = h(this, Ie);
    return (n = h(this, ue)) == null || n.cancel(e), r ? r.then(fe).catch(fe) : Promise.resolve();
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  reset() {
    this.destroy(), this.setState(h(this, dt));
  }
  isActive() {
    return h(this, G).some(
      (e) => e.options.enabled !== !1
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 && !this.isActive();
  }
  isStale() {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || h(this, G).some((e) => e.getCurrentResult().isStale);
  }
  isStaleByTime(e = 0) {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || !Fa(this.state.dataUpdatedAt, e);
  }
  onFocus() {
    var r;
    const e = h(this, G).find((n) => n.shouldFetchOnWindowFocus());
    e == null || e.refetch({ cancelRefetch: !1 }), (r = h(this, ue)) == null || r.continue();
  }
  onOnline() {
    var r;
    const e = h(this, G).find((n) => n.shouldFetchOnReconnect());
    e == null || e.refetch({ cancelRefetch: !1 }), (r = h(this, ue)) == null || r.continue();
  }
  addObserver(e) {
    h(this, G).includes(e) || (h(this, G).push(e), this.clearGcTimeout(), h(this, ce).notify({ type: "observerAdded", query: this, observer: e }));
  }
  removeObserver(e) {
    h(this, G).includes(e) && (C(this, G, h(this, G).filter((r) => r !== e)), h(this, G).length || (h(this, ue) && (h(this, We) ? h(this, ue).cancel({ revert: !0 }) : h(this, ue).cancelRetry()), this.scheduleGc()), h(this, ce).notify({ type: "observerRemoved", query: this, observer: e }));
  }
  getObserversCount() {
    return h(this, G).length;
  }
  invalidate() {
    this.state.isInvalidated || T(this, me, Ee).call(this, { type: "invalidate" });
  }
  fetch(e, r) {
    var f, c, d, m;
    if (this.state.fetchStatus !== "idle") {
      if (this.state.dataUpdatedAt && (r != null && r.cancelRefetch))
        this.cancel({ silent: !0 });
      else if (h(this, Ie))
        return (f = h(this, ue)) == null || f.continueRetry(), h(this, Ie);
    }
    if (e && T(this, ht, xr).call(this, e), !this.options.queryFn) {
      const g = h(this, G).find((E) => E.options.queryFn);
      g && T(this, ht, xr).call(this, g.options);
    }
    process.env.NODE_ENV !== "production" && (Array.isArray(this.options.queryKey) || console.error(
      "As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']"
    ));
    const n = new AbortController(), s = {
      queryKey: this.queryKey,
      meta: this.meta
    }, a = (g) => {
      Object.defineProperty(g, "signal", {
        enumerable: !0,
        get: () => (C(this, We, !0), n.signal)
      });
    };
    a(s);
    const i = () => this.options.queryFn ? (C(this, We, !1), this.options.persister ? this.options.persister(
      this.options.queryFn,
      s,
      this
    ) : this.options.queryFn(
      s
    )) : Promise.reject(
      new Error(`Missing queryFn: '${this.options.queryHash}'`)
    ), o = {
      fetchOptions: r,
      options: this.options,
      queryKey: this.queryKey,
      state: this.state,
      fetchFn: i
    };
    a(o), (c = this.options.behavior) == null || c.onFetch(
      o,
      this
    ), C(this, ft, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((d = o.fetchOptions) == null ? void 0 : d.meta)) && T(this, me, Ee).call(this, { type: "fetch", meta: (m = o.fetchOptions) == null ? void 0 : m.meta });
    const l = (g) => {
      var E, S, b, y;
      Jr(g) && g.silent || T(this, me, Ee).call(this, {
        type: "error",
        error: g
      }), Jr(g) || ((S = (E = h(this, ce).config).onError) == null || S.call(
        E,
        g,
        this
      ), (y = (b = h(this, ce).config).onSettled) == null || y.call(
        b,
        this.state.data,
        g,
        this
      )), this.isFetchingOptimistic || this.scheduleGc(), this.isFetchingOptimistic = !1;
    };
    return C(this, ue, ja({
      fn: o.fetchFn,
      abort: n.abort.bind(n),
      onSuccess: (g) => {
        var E, S, b, y;
        if (typeof g > "u") {
          process.env.NODE_ENV !== "production" && console.error(
            `Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`
          ), l(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        this.setData(g), (S = (E = h(this, ce).config).onSuccess) == null || S.call(E, g, this), (y = (b = h(this, ce).config).onSettled) == null || y.call(
          b,
          g,
          this.state.error,
          this
        ), this.isFetchingOptimistic || this.scheduleGc(), this.isFetchingOptimistic = !1;
      },
      onError: l,
      onFail: (g, E) => {
        T(this, me, Ee).call(this, { type: "failed", failureCount: g, error: E });
      },
      onPause: () => {
        T(this, me, Ee).call(this, { type: "pause" });
      },
      onContinue: () => {
        T(this, me, Ee).call(this, { type: "continue" });
      },
      retry: o.options.retry,
      retryDelay: o.options.retryDelay,
      networkMode: o.options.networkMode
    })), C(this, Ie, h(this, ue).promise), h(this, Ie);
  }
}, dt = new WeakMap(), ft = new WeakMap(), ce = new WeakMap(), Ie = new WeakMap(), ue = new WeakMap(), G = new WeakMap(), Yt = new WeakMap(), We = new WeakMap(), ht = new WeakSet(), xr = function(e) {
  this.options = { ...h(this, Yt), ...e }, this.updateGcTime(this.options.gcTime);
}, me = new WeakSet(), Ee = function(e) {
  const r = (n) => {
    switch (e.type) {
      case "failed":
        return {
          ...n,
          fetchFailureCount: e.failureCount,
          fetchFailureReason: e.error
        };
      case "pause":
        return {
          ...n,
          fetchStatus: "paused"
        };
      case "continue":
        return {
          ...n,
          fetchStatus: "fetching"
        };
      case "fetch":
        return {
          ...n,
          fetchFailureCount: 0,
          fetchFailureReason: null,
          fetchMeta: e.meta ?? null,
          fetchStatus: Ur(this.options.networkMode) ? "fetching" : "paused",
          ...!n.dataUpdatedAt && {
            error: null,
            status: "pending"
          }
        };
      case "success":
        return {
          ...n,
          data: e.data,
          dataUpdateCount: n.dataUpdateCount + 1,
          dataUpdatedAt: e.dataUpdatedAt ?? Date.now(),
          error: null,
          isInvalidated: !1,
          status: "success",
          ...!e.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
      case "error":
        const s = e.error;
        return Jr(s) && s.revert && h(this, ft) ? { ...h(this, ft), fetchStatus: "idle" } : {
          ...n,
          error: s,
          errorUpdateCount: n.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: n.fetchFailureCount + 1,
          fetchFailureReason: s,
          fetchStatus: "idle",
          status: "error"
        };
      case "invalidate":
        return {
          ...n,
          isInvalidated: !0
        };
      case "setState":
        return {
          ...n,
          ...e.state
        };
    }
  };
  this.state = r(this.state), z.batch(() => {
    h(this, G).forEach((n) => {
      n.onQueryUpdate();
    }), h(this, ce).notify({ query: this, type: "updated", action: e });
  });
}, Oa);
function Vo(t) {
  const e = typeof t.initialData == "function" ? t.initialData() : t.initialData, r = typeof e < "u", n = r ? typeof t.initialDataUpdatedAt == "function" ? t.initialDataUpdatedAt() : t.initialDataUpdatedAt : 0;
  return {
    data: e,
    dataUpdateCount: 0,
    dataUpdatedAt: r ? n ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: r ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var ge, Pa, jo = (Pa = class extends It {
  constructor(e = {}) {
    super();
    O(this, ge, void 0);
    this.config = e, C(this, ge, /* @__PURE__ */ new Map());
  }
  build(e, r, n) {
    const s = r.queryKey, a = r.queryHash ?? Bn(s, r);
    let i = this.get(a);
    return i || (i = new Mo({
      cache: this,
      queryKey: s,
      queryHash: a,
      options: e.defaultQueryOptions(r),
      state: n,
      defaultOptions: e.getQueryDefaults(s)
    }), this.add(i)), i;
  }
  add(e) {
    h(this, ge).has(e.queryHash) || (h(this, ge).set(e.queryHash, e), this.notify({
      type: "added",
      query: e
    }));
  }
  remove(e) {
    const r = h(this, ge).get(e.queryHash);
    r && (e.destroy(), r === e && h(this, ge).delete(e.queryHash), this.notify({ type: "removed", query: e }));
  }
  clear() {
    z.batch(() => {
      this.getAll().forEach((e) => {
        this.remove(e);
      });
    });
  }
  get(e) {
    return h(this, ge).get(e);
  }
  getAll() {
    return [...h(this, ge).values()];
  }
  find(e) {
    const r = { exact: !0, ...e };
    return this.getAll().find(
      (n) => Rs(r, n)
    );
  }
  findAll(e = {}) {
    const r = this.getAll();
    return Object.keys(e).length > 0 ? r.filter((n) => Rs(e, n)) : r;
  }
  notify(e) {
    z.batch(() => {
      this.listeners.forEach((r) => {
        r(e);
      });
    });
  }
  onFocus() {
    z.batch(() => {
      this.getAll().forEach((e) => {
        e.onFocus();
      });
    });
  }
  onOnline() {
    z.batch(() => {
      this.getAll().forEach((e) => {
        e.onOnline();
      });
    });
  }
}, ge = new WeakMap(), Pa), ye, Xt, ie, pt, be, Oe, Ta, Bo = (Ta = class extends Ba {
  constructor(e) {
    super();
    O(this, be);
    O(this, ye, void 0);
    O(this, Xt, void 0);
    O(this, ie, void 0);
    O(this, pt, void 0);
    this.mutationId = e.mutationId, C(this, Xt, e.defaultOptions), C(this, ie, e.mutationCache), C(this, ye, []), this.state = e.state || qo(), this.setOptions(e.options), this.scheduleGc();
  }
  setOptions(e) {
    this.options = { ...h(this, Xt), ...e }, this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(e) {
    h(this, ye).includes(e) || (h(this, ye).push(e), this.clearGcTimeout(), h(this, ie).notify({
      type: "observerAdded",
      mutation: this,
      observer: e
    }));
  }
  removeObserver(e) {
    C(this, ye, h(this, ye).filter((r) => r !== e)), this.scheduleGc(), h(this, ie).notify({
      type: "observerRemoved",
      mutation: this,
      observer: e
    });
  }
  optionalRemove() {
    h(this, ye).length || (this.state.status === "pending" ? this.scheduleGc() : h(this, ie).remove(this));
  }
  continue() {
    var e;
    return ((e = h(this, pt)) == null ? void 0 : e.continue()) ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(e) {
    var s, a, i, o, l, f, c, d, m, g, E, S, b, y, w, R, I, N, U, j;
    const r = () => (C(this, pt, ja({
      fn: () => this.options.mutationFn ? this.options.mutationFn(e) : Promise.reject(new Error("No mutationFn found")),
      onFail: (M, q) => {
        T(this, be, Oe).call(this, { type: "failed", failureCount: M, error: q });
      },
      onPause: () => {
        T(this, be, Oe).call(this, { type: "pause" });
      },
      onContinue: () => {
        T(this, be, Oe).call(this, { type: "continue" });
      },
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode
    })), h(this, pt).promise), n = this.state.status === "pending";
    try {
      if (!n) {
        T(this, be, Oe).call(this, { type: "pending", variables: e }), await ((a = (s = h(this, ie).config).onMutate) == null ? void 0 : a.call(
          s,
          e,
          this
        ));
        const q = await ((o = (i = this.options).onMutate) == null ? void 0 : o.call(i, e));
        q !== this.state.context && T(this, be, Oe).call(this, {
          type: "pending",
          context: q,
          variables: e
        });
      }
      const M = await r();
      return await ((f = (l = h(this, ie).config).onSuccess) == null ? void 0 : f.call(
        l,
        M,
        e,
        this.state.context,
        this
      )), await ((d = (c = this.options).onSuccess) == null ? void 0 : d.call(c, M, e, this.state.context)), await ((g = (m = h(this, ie).config).onSettled) == null ? void 0 : g.call(
        m,
        M,
        null,
        this.state.variables,
        this.state.context,
        this
      )), await ((S = (E = this.options).onSettled) == null ? void 0 : S.call(E, M, null, e, this.state.context)), T(this, be, Oe).call(this, { type: "success", data: M }), M;
    } catch (M) {
      try {
        throw await ((y = (b = h(this, ie).config).onError) == null ? void 0 : y.call(
          b,
          M,
          e,
          this.state.context,
          this
        )), await ((R = (w = this.options).onError) == null ? void 0 : R.call(
          w,
          M,
          e,
          this.state.context
        )), await ((N = (I = h(this, ie).config).onSettled) == null ? void 0 : N.call(
          I,
          void 0,
          M,
          this.state.variables,
          this.state.context,
          this
        )), await ((j = (U = this.options).onSettled) == null ? void 0 : j.call(
          U,
          void 0,
          M,
          e,
          this.state.context
        )), M;
      } finally {
        T(this, be, Oe).call(this, { type: "error", error: M });
      }
    }
  }
}, ye = new WeakMap(), Xt = new WeakMap(), ie = new WeakMap(), pt = new WeakMap(), be = new WeakSet(), Oe = function(e) {
  const r = (n) => {
    switch (e.type) {
      case "failed":
        return {
          ...n,
          failureCount: e.failureCount,
          failureReason: e.error
        };
      case "pause":
        return {
          ...n,
          isPaused: !0
        };
      case "continue":
        return {
          ...n,
          isPaused: !1
        };
      case "pending":
        return {
          ...n,
          context: e.context,
          data: void 0,
          failureCount: 0,
          failureReason: null,
          error: null,
          isPaused: !Ur(this.options.networkMode),
          status: "pending",
          variables: e.variables,
          submittedAt: Date.now()
        };
      case "success":
        return {
          ...n,
          data: e.data,
          failureCount: 0,
          failureReason: null,
          error: null,
          status: "success",
          isPaused: !1
        };
      case "error":
        return {
          ...n,
          data: void 0,
          error: e.error,
          failureCount: n.failureCount + 1,
          failureReason: e.error,
          isPaused: !1,
          status: "error"
        };
    }
  };
  this.state = r(this.state), z.batch(() => {
    h(this, ye).forEach((n) => {
      n.onMutationUpdate(e);
    }), h(this, ie).notify({
      mutation: this,
      type: "updated",
      action: e
    });
  });
}, Ta);
function qo() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var de, Jt, ze, Da, Qo = (Da = class extends It {
  constructor(e = {}) {
    super();
    O(this, de, void 0);
    O(this, Jt, void 0);
    O(this, ze, void 0);
    this.config = e, C(this, de, []), C(this, Jt, 0);
  }
  build(e, r, n) {
    const s = new Bo({
      mutationCache: this,
      mutationId: ++yr(this, Jt)._,
      options: e.defaultMutationOptions(r),
      state: n
    });
    return this.add(s), s;
  }
  add(e) {
    h(this, de).push(e), this.notify({ type: "added", mutation: e });
  }
  remove(e) {
    C(this, de, h(this, de).filter((r) => r !== e)), this.notify({ type: "removed", mutation: e });
  }
  clear() {
    z.batch(() => {
      h(this, de).forEach((e) => {
        this.remove(e);
      });
    });
  }
  getAll() {
    return h(this, de);
  }
  find(e) {
    const r = { exact: !0, ...e };
    return h(this, de).find(
      (n) => Ns(r, n)
    );
  }
  findAll(e = {}) {
    return h(this, de).filter(
      (r) => Ns(e, r)
    );
  }
  notify(e) {
    z.batch(() => {
      this.listeners.forEach((r) => {
        r(e);
      });
    });
  }
  resumePausedMutations() {
    return C(this, ze, (h(this, ze) ?? Promise.resolve()).then(() => {
      const e = h(this, de).filter((r) => r.state.isPaused);
      return z.batch(
        () => e.reduce(
          (r, n) => r.then(() => n.continue().catch(fe)),
          Promise.resolve()
        )
      );
    }).then(() => {
      C(this, ze, void 0);
    })), h(this, ze);
  }
}, de = new WeakMap(), Jt = new WeakMap(), ze = new WeakMap(), Da);
function _o(t) {
  return {
    onFetch: (e, r) => {
      const n = async () => {
        var E, S, b, y, w;
        const s = e.options, a = (b = (S = (E = e.fetchOptions) == null ? void 0 : E.meta) == null ? void 0 : S.fetchMore) == null ? void 0 : b.direction, i = ((y = e.state.data) == null ? void 0 : y.pages) || [], o = ((w = e.state.data) == null ? void 0 : w.pageParams) || [], l = { pages: [], pageParams: [] };
        let f = !1;
        const c = (R) => {
          Object.defineProperty(R, "signal", {
            enumerable: !0,
            get: () => (e.signal.aborted ? f = !0 : e.signal.addEventListener("abort", () => {
              f = !0;
            }), e.signal)
          });
        }, d = e.options.queryFn || (() => Promise.reject(
          new Error(`Missing queryFn: '${e.options.queryHash}'`)
        )), m = async (R, I, N) => {
          if (f)
            return Promise.reject();
          if (I == null && R.pages.length)
            return Promise.resolve(R);
          const U = {
            queryKey: e.queryKey,
            pageParam: I,
            direction: N ? "backward" : "forward",
            meta: e.options.meta
          };
          c(U);
          const j = await d(
            U
          ), { maxPages: M } = e.options, q = N ? Io : Do;
          return {
            pages: q(R.pages, j, M),
            pageParams: q(R.pageParams, I, M)
          };
        };
        let g;
        if (a && i.length) {
          const R = a === "backward", I = R ? Ko : Ds, N = {
            pages: i,
            pageParams: o
          }, U = I(s, N);
          g = await m(N, U, R);
        } else {
          g = await m(
            l,
            o[0] ?? s.initialPageParam
          );
          const R = t ?? i.length;
          for (let I = 1; I < R; I++) {
            const N = Ds(s, g);
            g = await m(g, N);
          }
        }
        return g;
      };
      e.options.persister ? e.fetchFn = () => {
        var s, a;
        return (a = (s = e.options).persister) == null ? void 0 : a.call(
          s,
          n,
          {
            queryKey: e.queryKey,
            meta: e.options.meta,
            signal: e.signal
          },
          r
        );
      } : e.fetchFn = n;
    }
  };
}
function Ds(t, { pages: e, pageParams: r }) {
  const n = e.length - 1;
  return t.getNextPageParam(
    e[n],
    e,
    r[n],
    r
  );
}
function Ko(t, { pages: e, pageParams: r }) {
  var n;
  return (n = t.getPreviousPageParam) == null ? void 0 : n.call(
    t,
    e[0],
    e,
    r[0],
    r
  );
}
var W, ke, Le, mt, vt, Ue, gt, yt, Ia, Wo = (Ia = class {
  constructor(t = {}) {
    O(this, W, void 0);
    O(this, ke, void 0);
    O(this, Le, void 0);
    O(this, mt, void 0);
    O(this, vt, void 0);
    O(this, Ue, void 0);
    O(this, gt, void 0);
    O(this, yt, void 0);
    C(this, W, t.queryCache || new jo()), C(this, ke, t.mutationCache || new Qo()), C(this, Le, t.defaultOptions || {}), C(this, mt, /* @__PURE__ */ new Map()), C(this, vt, /* @__PURE__ */ new Map()), C(this, Ue, 0);
  }
  mount() {
    yr(this, Ue)._++, h(this, Ue) === 1 && (C(this, gt, Or.subscribe(() => {
      Or.isFocused() && (this.resumePausedMutations(), h(this, W).onFocus());
    })), C(this, yt, Pr.subscribe(() => {
      Pr.isOnline() && (this.resumePausedMutations(), h(this, W).onOnline());
    })));
  }
  unmount() {
    var t, e;
    yr(this, Ue)._--, h(this, Ue) === 0 && ((t = h(this, gt)) == null || t.call(this), C(this, gt, void 0), (e = h(this, yt)) == null || e.call(this), C(this, yt, void 0));
  }
  isFetching(t) {
    return h(this, W).findAll({ ...t, fetchStatus: "fetching" }).length;
  }
  isMutating(t) {
    return h(this, ke).findAll({ ...t, status: "pending" }).length;
  }
  getQueryData(t) {
    var e;
    return (e = h(this, W).find({ queryKey: t })) == null ? void 0 : e.state.data;
  }
  ensureQueryData(t) {
    const e = this.getQueryData(t.queryKey);
    return e !== void 0 ? Promise.resolve(e) : this.fetchQuery(t);
  }
  getQueriesData(t) {
    return this.getQueryCache().findAll(t).map(({ queryKey: e, state: r }) => {
      const n = r.data;
      return [e, n];
    });
  }
  setQueryData(t, e, r) {
    const n = h(this, W).find({ queryKey: t }), s = n == null ? void 0 : n.state.data, a = To(e, s);
    if (typeof a > "u")
      return;
    const i = this.defaultQueryOptions({ queryKey: t });
    return h(this, W).build(this, i).setData(a, { ...r, manual: !0 });
  }
  setQueriesData(t, e, r) {
    return z.batch(
      () => this.getQueryCache().findAll(t).map(({ queryKey: n }) => [
        n,
        this.setQueryData(n, e, r)
      ])
    );
  }
  getQueryState(t) {
    var e;
    return (e = h(this, W).find({ queryKey: t })) == null ? void 0 : e.state;
  }
  removeQueries(t) {
    const e = h(this, W);
    z.batch(() => {
      e.findAll(t).forEach((r) => {
        e.remove(r);
      });
    });
  }
  resetQueries(t, e) {
    const r = h(this, W), n = {
      type: "active",
      ...t
    };
    return z.batch(() => (r.findAll(t).forEach((s) => {
      s.reset();
    }), this.refetchQueries(n, e)));
  }
  cancelQueries(t = {}, e = {}) {
    const r = { revert: !0, ...e }, n = z.batch(
      () => h(this, W).findAll(t).map((s) => s.cancel(r))
    );
    return Promise.all(n).then(fe).catch(fe);
  }
  invalidateQueries(t = {}, e = {}) {
    return z.batch(() => {
      if (h(this, W).findAll(t).forEach((n) => {
        n.invalidate();
      }), t.refetchType === "none")
        return Promise.resolve();
      const r = {
        ...t,
        type: t.refetchType ?? t.type ?? "active"
      };
      return this.refetchQueries(r, e);
    });
  }
  refetchQueries(t = {}, e) {
    const r = {
      ...e,
      cancelRefetch: (e == null ? void 0 : e.cancelRefetch) ?? !0
    }, n = z.batch(
      () => h(this, W).findAll(t).filter((s) => !s.isDisabled()).map((s) => {
        let a = s.fetch(void 0, r);
        return r.throwOnError || (a = a.catch(fe)), s.state.fetchStatus === "paused" ? Promise.resolve() : a;
      })
    );
    return Promise.all(n).then(fe);
  }
  fetchQuery(t) {
    const e = this.defaultQueryOptions(t);
    typeof e.retry > "u" && (e.retry = !1);
    const r = h(this, W).build(this, e);
    return r.isStaleByTime(e.staleTime) ? r.fetch(e) : Promise.resolve(r.state.data);
  }
  prefetchQuery(t) {
    return this.fetchQuery(t).then(fe).catch(fe);
  }
  fetchInfiniteQuery(t) {
    return t.behavior = _o(t.pages), this.fetchQuery(t);
  }
  prefetchInfiniteQuery(t) {
    return this.fetchInfiniteQuery(t).then(fe).catch(fe);
  }
  resumePausedMutations() {
    return h(this, ke).resumePausedMutations();
  }
  getQueryCache() {
    return h(this, W);
  }
  getMutationCache() {
    return h(this, ke);
  }
  getDefaultOptions() {
    return h(this, Le);
  }
  setDefaultOptions(t) {
    C(this, Le, t);
  }
  setQueryDefaults(t, e) {
    h(this, mt).set(qt(t), {
      queryKey: t,
      defaultOptions: e
    });
  }
  getQueryDefaults(t) {
    const e = [...h(this, mt).values()];
    let r = {};
    return e.forEach((n) => {
      Qt(t, n.queryKey) && (r = { ...r, ...n.defaultOptions });
    }), r;
  }
  setMutationDefaults(t, e) {
    h(this, vt).set(qt(t), {
      mutationKey: t,
      defaultOptions: e
    });
  }
  getMutationDefaults(t) {
    const e = [...h(this, vt).values()];
    let r = {};
    return e.forEach((n) => {
      Qt(t, n.mutationKey) && (r = { ...r, ...n.defaultOptions });
    }), r;
  }
  defaultQueryOptions(t) {
    if (t != null && t._defaulted)
      return t;
    const e = {
      ...h(this, Le).queries,
      ...(t == null ? void 0 : t.queryKey) && this.getQueryDefaults(t.queryKey),
      ...t,
      _defaulted: !0
    };
    return e.queryHash || (e.queryHash = Bn(
      e.queryKey,
      e
    )), typeof e.refetchOnReconnect > "u" && (e.refetchOnReconnect = e.networkMode !== "always"), typeof e.throwOnError > "u" && (e.throwOnError = !!e.suspense), typeof e.networkMode > "u" && e.persister && (e.networkMode = "offlineFirst"), e;
  }
  defaultMutationOptions(t) {
    return t != null && t._defaulted ? t : {
      ...h(this, Le).mutations,
      ...(t == null ? void 0 : t.mutationKey) && this.getMutationDefaults(t.mutationKey),
      ...t,
      _defaulted: !0
    };
  }
  clear() {
    h(this, W).clear(), h(this, ke).clear();
  }
}, W = new WeakMap(), ke = new WeakMap(), Le = new WeakMap(), mt = new WeakMap(), vt = new WeakMap(), Ue = new WeakMap(), gt = new WeakMap(), yt = new WeakMap(), Ia), ne, Q, bt, $, Ge, wt, we, Zt, xt, Et, He, Ye, Fe, Xe, Je, Bt, $t, En, er, Cn, tr, Sn, rr, An, nr, Rn, sr, Nn, ar, On, kr, Qa, ka, qa = (ka = class extends It {
  constructor(e, r) {
    super();
    O(this, Je);
    O(this, $t);
    O(this, er);
    O(this, tr);
    O(this, rr);
    O(this, nr);
    O(this, sr);
    O(this, ar);
    O(this, kr);
    O(this, ne, void 0);
    O(this, Q, void 0);
    O(this, bt, void 0);
    O(this, $, void 0);
    O(this, Ge, void 0);
    O(this, wt, void 0);
    O(this, we, void 0);
    O(this, Zt, void 0);
    O(this, xt, void 0);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    O(this, Et, void 0);
    O(this, He, void 0);
    O(this, Ye, void 0);
    O(this, Fe, void 0);
    O(this, Xe, void 0);
    C(this, Q, void 0), C(this, bt, void 0), C(this, $, void 0), C(this, Xe, /* @__PURE__ */ new Set()), C(this, ne, e), this.options = r, C(this, we, null), this.bindMethods(), this.setOptions(r);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (h(this, Q).addObserver(this), Is(h(this, Q), this.options) ? T(this, Je, Bt).call(this) : this.updateResult(), T(this, rr, An).call(this));
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return Pn(
      h(this, Q),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return Pn(
      h(this, Q),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), T(this, nr, Rn).call(this), T(this, sr, Nn).call(this), h(this, Q).removeObserver(this);
  }
  setOptions(e, r) {
    const n = this.options, s = h(this, Q);
    if (this.options = h(this, ne).defaultQueryOptions(e), bn(n, this.options) || h(this, ne).getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: h(this, Q),
      observer: this
    }), typeof this.options.enabled < "u" && typeof this.options.enabled != "boolean")
      throw new Error("Expected enabled to be a boolean");
    this.options.queryKey || (this.options.queryKey = n.queryKey), T(this, ar, On).call(this);
    const a = this.hasListeners();
    a && ks(
      h(this, Q),
      s,
      this.options,
      n
    ) && T(this, Je, Bt).call(this), this.updateResult(r), a && (h(this, Q) !== s || this.options.enabled !== n.enabled || this.options.staleTime !== n.staleTime) && T(this, $t, En).call(this);
    const i = T(this, er, Cn).call(this);
    a && (h(this, Q) !== s || this.options.enabled !== n.enabled || i !== h(this, Fe)) && T(this, tr, Sn).call(this, i);
  }
  getOptimisticResult(e) {
    const r = h(this, ne).getQueryCache().build(h(this, ne), e), n = this.createResult(r, e);
    return Go(this, n) && (C(this, $, n), C(this, wt, this.options), C(this, Ge, h(this, Q).state)), n;
  }
  getCurrentResult() {
    return h(this, $);
  }
  trackResult(e) {
    const r = {};
    return Object.keys(e).forEach((n) => {
      Object.defineProperty(r, n, {
        configurable: !1,
        enumerable: !0,
        get: () => (h(this, Xe).add(n), e[n])
      });
    }), r;
  }
  getCurrentQuery() {
    return h(this, Q);
  }
  refetch({ ...e } = {}) {
    return this.fetch({
      ...e
    });
  }
  fetchOptimistic(e) {
    const r = h(this, ne).defaultQueryOptions(e), n = h(this, ne).getQueryCache().build(h(this, ne), r);
    return n.isFetchingOptimistic = !0, n.fetch().then(() => this.createResult(n, r));
  }
  fetch(e) {
    return T(this, Je, Bt).call(this, {
      ...e,
      cancelRefetch: e.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), h(this, $)));
  }
  createResult(e, r) {
    var U;
    const n = h(this, Q), s = this.options, a = h(this, $), i = h(this, Ge), o = h(this, wt), f = e !== n ? e.state : h(this, bt), { state: c } = e;
    let { error: d, errorUpdatedAt: m, fetchStatus: g, status: E } = c, S = !1, b;
    if (r._optimisticResults) {
      const j = this.hasListeners(), M = !j && Is(e, r), q = j && ks(e, n, r, s);
      (M || q) && (g = Ur(e.options.networkMode) ? "fetching" : "paused", c.dataUpdatedAt || (E = "pending")), r._optimisticResults === "isRestoring" && (g = "idle");
    }
    if (r.select && typeof c.data < "u")
      if (a && c.data === (i == null ? void 0 : i.data) && r.select === h(this, Zt))
        b = h(this, xt);
      else
        try {
          C(this, Zt, r.select), b = r.select(c.data), b = xn(a == null ? void 0 : a.data, b, r), C(this, xt, b), C(this, we, null);
        } catch (j) {
          C(this, we, j);
        }
    else
      b = c.data;
    if (typeof r.placeholderData < "u" && typeof b > "u" && E === "pending") {
      let j;
      if (a != null && a.isPlaceholderData && r.placeholderData === (o == null ? void 0 : o.placeholderData))
        j = a.data;
      else if (j = typeof r.placeholderData == "function" ? r.placeholderData(
        (U = h(this, Et)) == null ? void 0 : U.state.data,
        h(this, Et)
      ) : r.placeholderData, r.select && typeof j < "u")
        try {
          j = r.select(j), C(this, we, null);
        } catch (M) {
          C(this, we, M);
        }
      typeof j < "u" && (E = "success", b = xn(
        a == null ? void 0 : a.data,
        j,
        r
      ), S = !0);
    }
    h(this, we) && (d = h(this, we), b = h(this, xt), m = Date.now(), E = "error");
    const y = g === "fetching", w = E === "pending", R = E === "error", I = w && y;
    return {
      status: E,
      fetchStatus: g,
      isPending: w,
      isSuccess: E === "success",
      isError: R,
      isInitialLoading: I,
      isLoading: I,
      data: b,
      dataUpdatedAt: c.dataUpdatedAt,
      error: d,
      errorUpdatedAt: m,
      failureCount: c.fetchFailureCount,
      failureReason: c.fetchFailureReason,
      errorUpdateCount: c.errorUpdateCount,
      isFetched: c.dataUpdateCount > 0 || c.errorUpdateCount > 0,
      isFetchedAfterMount: c.dataUpdateCount > f.dataUpdateCount || c.errorUpdateCount > f.errorUpdateCount,
      isFetching: y,
      isRefetching: y && !w,
      isLoadingError: R && c.dataUpdatedAt === 0,
      isPaused: g === "paused",
      isPlaceholderData: S,
      isRefetchError: R && c.dataUpdatedAt !== 0,
      isStale: Qn(e, r),
      refetch: this.refetch
    };
  }
  updateResult(e) {
    const r = h(this, $), n = this.createResult(h(this, Q), this.options);
    if (C(this, Ge, h(this, Q).state), C(this, wt, this.options), h(this, Ge).data !== void 0 && C(this, Et, h(this, Q)), bn(n, r))
      return;
    C(this, $, n);
    const s = {}, a = () => {
      if (!r)
        return !0;
      const { notifyOnChangeProps: i } = this.options, o = typeof i == "function" ? i() : i;
      if (o === "all" || !o && !h(this, Xe).size)
        return !0;
      const l = new Set(
        o ?? h(this, Xe)
      );
      return this.options.throwOnError && l.add("error"), Object.keys(h(this, $)).some((f) => {
        const c = f;
        return h(this, $)[c] !== r[c] && l.has(c);
      });
    };
    (e == null ? void 0 : e.listeners) !== !1 && a() && (s.listeners = !0), T(this, kr, Qa).call(this, { ...s, ...e });
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && T(this, rr, An).call(this);
  }
}, ne = new WeakMap(), Q = new WeakMap(), bt = new WeakMap(), $ = new WeakMap(), Ge = new WeakMap(), wt = new WeakMap(), we = new WeakMap(), Zt = new WeakMap(), xt = new WeakMap(), Et = new WeakMap(), He = new WeakMap(), Ye = new WeakMap(), Fe = new WeakMap(), Xe = new WeakMap(), Je = new WeakSet(), Bt = function(e) {
  T(this, ar, On).call(this);
  let r = h(this, Q).fetch(
    this.options,
    e
  );
  return e != null && e.throwOnError || (r = r.catch(fe)), r;
}, $t = new WeakSet(), En = function() {
  if (T(this, nr, Rn).call(this), Ot || h(this, $).isStale || !yn(this.options.staleTime))
    return;
  const r = Fa(
    h(this, $).dataUpdatedAt,
    this.options.staleTime
  ) + 1;
  C(this, He, setTimeout(() => {
    h(this, $).isStale || this.updateResult();
  }, r));
}, er = new WeakSet(), Cn = function() {
  return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(h(this, Q)) : this.options.refetchInterval) ?? !1;
}, tr = new WeakSet(), Sn = function(e) {
  T(this, sr, Nn).call(this), C(this, Fe, e), !(Ot || this.options.enabled === !1 || !yn(h(this, Fe)) || h(this, Fe) === 0) && C(this, Ye, setInterval(() => {
    (this.options.refetchIntervalInBackground || Or.isFocused()) && T(this, Je, Bt).call(this);
  }, h(this, Fe)));
}, rr = new WeakSet(), An = function() {
  T(this, $t, En).call(this), T(this, tr, Sn).call(this, T(this, er, Cn).call(this));
}, nr = new WeakSet(), Rn = function() {
  h(this, He) && (clearTimeout(h(this, He)), C(this, He, void 0));
}, sr = new WeakSet(), Nn = function() {
  h(this, Ye) && (clearInterval(h(this, Ye)), C(this, Ye, void 0));
}, ar = new WeakSet(), On = function() {
  const e = h(this, ne).getQueryCache().build(h(this, ne), this.options);
  if (e === h(this, Q))
    return;
  const r = h(this, Q);
  C(this, Q, e), C(this, bt, e.state), this.hasListeners() && (r == null || r.removeObserver(this), e.addObserver(this));
}, kr = new WeakSet(), Qa = function(e) {
  z.batch(() => {
    e.listeners && this.listeners.forEach((r) => {
      r(h(this, $));
    }), h(this, ne).getQueryCache().notify({
      query: h(this, Q),
      type: "observerResultsUpdated"
    });
  });
}, ka);
function zo(t, e) {
  return e.enabled !== !1 && !t.state.dataUpdatedAt && !(t.state.status === "error" && e.retryOnMount === !1);
}
function Is(t, e) {
  return zo(t, e) || t.state.dataUpdatedAt > 0 && Pn(t, e, e.refetchOnMount);
}
function Pn(t, e, r) {
  if (e.enabled !== !1) {
    const n = typeof r == "function" ? r(t) : r;
    return n === "always" || n !== !1 && Qn(t, e);
  }
  return !1;
}
function ks(t, e, r, n) {
  return r.enabled !== !1 && (t !== e || n.enabled === !1) && (!r.suspense || t.state.status !== "error") && Qn(t, r);
}
function Qn(t, e) {
  return t.isStaleByTime(e.staleTime);
}
function Go(t, e) {
  return !bn(t.getCurrentResult(), e);
}
function Ls(t, e) {
  return t.filter((r) => !e.includes(r));
}
function Ho(t, e, r) {
  const n = t.slice(0);
  return n[e] = r, n;
}
var Ze, Ct, St, oe, At, Rt, Nt, Er, ir, Tn, or, Dn, lr, In, cr, kn, La, Yo = (La = class extends It {
  constructor(e, r, n) {
    super();
    O(this, Nt);
    O(this, ir);
    O(this, or);
    O(this, lr);
    O(this, cr);
    O(this, Ze, void 0);
    O(this, Ct, void 0);
    O(this, St, void 0);
    O(this, oe, void 0);
    O(this, At, void 0);
    O(this, Rt, void 0);
    C(this, Ze, e), C(this, St, r), C(this, At, n), C(this, oe, []), T(this, Nt, Er).call(this, []), this.setQueries(r, n);
  }
  onSubscribe() {
    this.listeners.size === 1 && h(this, oe).forEach((e) => {
      e.subscribe((r) => {
        T(this, lr, In).call(this, e, r);
      });
    });
  }
  onUnsubscribe() {
    this.listeners.size || this.destroy();
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), h(this, oe).forEach((e) => {
      e.destroy();
    });
  }
  setQueries(e, r, n) {
    C(this, St, e), C(this, At, r), z.batch(() => {
      const s = h(this, oe), a = T(this, or, Dn).call(this, h(this, St));
      a.forEach(
        (f) => f.observer.setOptions(f.defaultedQueryOptions, n)
      );
      const i = a.map((f) => f.observer), o = i.map(
        (f) => f.getCurrentResult()
      ), l = i.some(
        (f, c) => f !== s[c]
      );
      s.length === i.length && !l || (C(this, oe, i), T(this, Nt, Er).call(this, o), this.hasListeners() && (Ls(s, i).forEach((f) => {
        f.destroy();
      }), Ls(i, s).forEach((f) => {
        f.subscribe((c) => {
          T(this, lr, In).call(this, f, c);
        });
      }), T(this, cr, kn).call(this)));
    });
  }
  getCurrentResult() {
    return h(this, Rt);
  }
  getQueries() {
    return h(this, oe).map((e) => e.getCurrentQuery());
  }
  getObservers() {
    return h(this, oe);
  }
  getOptimisticResult(e) {
    const r = T(this, or, Dn).call(this, e), n = r.map(
      (s) => s.observer.getOptimisticResult(s.defaultedQueryOptions)
    );
    return [
      n,
      (s) => T(this, ir, Tn).call(this, s ?? n),
      () => r.map((s, a) => {
        const i = n[a];
        return s.defaultedQueryOptions.notifyOnChangeProps ? i : s.observer.trackResult(i);
      })
    ];
  }
}, Ze = new WeakMap(), Ct = new WeakMap(), St = new WeakMap(), oe = new WeakMap(), At = new WeakMap(), Rt = new WeakMap(), Nt = new WeakSet(), Er = function(e) {
  C(this, Ct, e), C(this, Rt, T(this, ir, Tn).call(this, e));
}, ir = new WeakSet(), Tn = function(e) {
  var n;
  const r = (n = h(this, At)) == null ? void 0 : n.combine;
  return r ? qn(h(this, Rt), r(e)) : e;
}, or = new WeakSet(), Dn = function(e) {
  const r = h(this, oe), n = new Map(
    r.map((d) => [d.options.queryHash, d])
  ), s = e.map(
    (d) => h(this, Ze).defaultQueryOptions(d)
  ), a = s.flatMap((d) => {
    const m = n.get(d.queryHash);
    return m != null ? [{ defaultedQueryOptions: d, observer: m }] : [];
  }), i = new Set(
    a.map((d) => d.defaultedQueryOptions.queryHash)
  ), o = s.filter(
    (d) => !i.has(d.queryHash)
  ), l = (d) => {
    const m = h(this, Ze).defaultQueryOptions(d);
    return h(this, oe).find(
      (E) => E.options.queryHash === m.queryHash
    ) ?? new qa(h(this, Ze), m);
  }, f = o.map((d) => ({
    defaultedQueryOptions: d,
    observer: l(d)
  })), c = (d, m) => s.indexOf(d.defaultedQueryOptions) - s.indexOf(m.defaultedQueryOptions);
  return a.concat(f).sort(c);
}, lr = new WeakSet(), In = function(e, r) {
  const n = h(this, oe).indexOf(e);
  n !== -1 && (T(this, Nt, Er).call(this, Ho(h(this, Ct), n, r)), T(this, cr, kn).call(this));
}, cr = new WeakSet(), kn = function() {
  z.batch(() => {
    this.listeners.forEach((e) => {
      e(h(this, Ct));
    });
  });
}, La), _a = v.createContext(
  void 0
), Xo = (t) => {
  const e = v.useContext(_a);
  if (t)
    return t;
  if (!e)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return e;
}, Jo = ({
  client: t,
  children: e
}) => (v.useEffect(() => (t.mount(), () => {
  t.unmount();
}), [t]), /* @__PURE__ */ v.createElement(_a.Provider, { value: t }, e)), Ka = v.createContext(!1), Zo = () => v.useContext(Ka);
Ka.Provider;
function $o() {
  let t = !1;
  return {
    clearReset: () => {
      t = !1;
    },
    reset: () => {
      t = !0;
    },
    isReset: () => t
  };
}
var el = v.createContext($o()), tl = () => v.useContext(el);
function rl(t, e) {
  return typeof t == "function" ? t(...e) : !!t;
}
var nl = (t, e) => {
  (t.suspense || t.throwOnError) && (e.isReset() || (t.retryOnMount = !1));
}, sl = (t) => {
  v.useEffect(() => {
    t.clearReset();
  }, [t]);
}, al = ({
  result: t,
  errorResetBoundary: e,
  throwOnError: r,
  query: n
}) => t.isError && !e.isReset() && !t.isFetching && rl(r, [t.error, n]), il = (t) => {
  t.suspense && typeof t.staleTime != "number" && (t.staleTime = 1e3);
}, ol = (t, e) => t.isLoading && t.isFetching && !e, Us = (t, e) => (t == null ? void 0 : t.suspense) && e.isPending, Fs = (t, e, r) => e.fetchOptimistic(t).catch(() => {
  r.clearReset();
});
function Wa({
  queries: t,
  ...e
}, r) {
  const n = Xo(r), s = Zo(), a = tl(), i = v.useMemo(
    () => t.map((S) => {
      const b = n.defaultQueryOptions(S);
      return b._optimisticResults = s ? "isRestoring" : "optimistic", b;
    }),
    [t, n, s]
  );
  i.forEach((S) => {
    il(S), nl(S, a);
  }), sl(a);
  const [o] = v.useState(
    () => new Yo(
      n,
      i,
      e
    )
  ), [l, f, c] = o.getOptimisticResult(i);
  v.useSyncExternalStore(
    v.useCallback(
      (S) => s ? () => {
      } : o.subscribe(z.batchCalls(S)),
      [o, s]
    ),
    () => o.getCurrentResult(),
    () => o.getCurrentResult()
  ), v.useEffect(() => {
    o.setQueries(
      i,
      e,
      {
        listeners: !1
      }
    );
  }, [i, e, o]);
  const m = l.some(
    (S, b) => Us(i[b], S)
  ) ? l.flatMap((S, b) => {
    const y = i[b];
    if (y) {
      const w = new qa(n, y);
      if (Us(y, S))
        return Fs(y, w, a);
      ol(S, s) && Fs(y, w, a);
    }
    return [];
  }) : [];
  if (m.length > 0)
    throw o.setQueries(
      i,
      e,
      {
        listeners: !1
      }
    ), Promise.all(m);
  const g = o.getQueries(), E = l.find(
    (S, b) => {
      var y;
      return al({
        result: S,
        errorResetBoundary: a,
        throwOnError: ((y = i[b]) == null ? void 0 : y.throwOnError) ?? !1,
        query: g[b]
      });
    }
  );
  if (E != null && E.error)
    throw E.error;
  return f(c());
}
function za(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var _n = { exports: {} }, Ga = function(e, r) {
  return function() {
    for (var s = new Array(arguments.length), a = 0; a < s.length; a++)
      s[a] = arguments[a];
    return e.apply(r, s);
  };
}, ll = Ga, Kn = Object.prototype.toString, Wn = function(t) {
  return function(e) {
    var r = Kn.call(e);
    return t[r] || (t[r] = r.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function tt(t) {
  return t = t.toLowerCase(), function(r) {
    return Wn(r) === t;
  };
}
function zn(t) {
  return Array.isArray(t);
}
function Tr(t) {
  return typeof t > "u";
}
function cl(t) {
  return t !== null && !Tr(t) && t.constructor !== null && !Tr(t.constructor) && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
}
var Ha = tt("ArrayBuffer");
function ul(t) {
  var e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && Ha(t.buffer), e;
}
function dl(t) {
  return typeof t == "string";
}
function fl(t) {
  return typeof t == "number";
}
function Ya(t) {
  return t !== null && typeof t == "object";
}
function Cr(t) {
  if (Wn(t) !== "object")
    return !1;
  var e = Object.getPrototypeOf(t);
  return e === null || e === Object.prototype;
}
var hl = tt("Date"), pl = tt("File"), ml = tt("Blob"), vl = tt("FileList");
function Gn(t) {
  return Kn.call(t) === "[object Function]";
}
function gl(t) {
  return Ya(t) && Gn(t.pipe);
}
function yl(t) {
  var e = "[object FormData]";
  return t && (typeof FormData == "function" && t instanceof FormData || Kn.call(t) === e || Gn(t.toString) && t.toString() === e);
}
var bl = tt("URLSearchParams");
function wl(t) {
  return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
}
function xl() {
  return typeof navigator < "u" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window < "u" && typeof document < "u";
}
function Hn(t, e) {
  if (!(t === null || typeof t > "u"))
    if (typeof t != "object" && (t = [t]), zn(t))
      for (var r = 0, n = t.length; r < n; r++)
        e.call(null, t[r], r, t);
    else
      for (var s in t)
        Object.prototype.hasOwnProperty.call(t, s) && e.call(null, t[s], s, t);
}
function Ln() {
  var t = {};
  function e(s, a) {
    Cr(t[a]) && Cr(s) ? t[a] = Ln(t[a], s) : Cr(s) ? t[a] = Ln({}, s) : zn(s) ? t[a] = s.slice() : t[a] = s;
  }
  for (var r = 0, n = arguments.length; r < n; r++)
    Hn(arguments[r], e);
  return t;
}
function El(t, e, r) {
  return Hn(e, function(s, a) {
    r && typeof s == "function" ? t[a] = ll(s, r) : t[a] = s;
  }), t;
}
function Cl(t) {
  return t.charCodeAt(0) === 65279 && (t = t.slice(1)), t;
}
function Sl(t, e, r, n) {
  t.prototype = Object.create(e.prototype, n), t.prototype.constructor = t, r && Object.assign(t.prototype, r);
}
function Al(t, e, r) {
  var n, s, a, i = {};
  e = e || {};
  do {
    for (n = Object.getOwnPropertyNames(t), s = n.length; s-- > 0; )
      a = n[s], i[a] || (e[a] = t[a], i[a] = !0);
    t = Object.getPrototypeOf(t);
  } while (t && (!r || r(t, e)) && t !== Object.prototype);
  return e;
}
function Rl(t, e, r) {
  t = String(t), (r === void 0 || r > t.length) && (r = t.length), r -= e.length;
  var n = t.indexOf(e, r);
  return n !== -1 && n === r;
}
function Nl(t) {
  if (!t)
    return null;
  var e = t.length;
  if (Tr(e))
    return null;
  for (var r = new Array(e); e-- > 0; )
    r[e] = t[e];
  return r;
}
var Ol = function(t) {
  return function(e) {
    return t && e instanceof t;
  };
}(typeof Uint8Array < "u" && Object.getPrototypeOf(Uint8Array)), X = {
  isArray: zn,
  isArrayBuffer: Ha,
  isBuffer: cl,
  isFormData: yl,
  isArrayBufferView: ul,
  isString: dl,
  isNumber: fl,
  isObject: Ya,
  isPlainObject: Cr,
  isUndefined: Tr,
  isDate: hl,
  isFile: pl,
  isBlob: ml,
  isFunction: Gn,
  isStream: gl,
  isURLSearchParams: bl,
  isStandardBrowserEnv: xl,
  forEach: Hn,
  merge: Ln,
  extend: El,
  trim: wl,
  stripBOM: Cl,
  inherits: Sl,
  toFlatObject: Al,
  kindOf: Wn,
  kindOfTest: tt,
  endsWith: Rl,
  toArray: Nl,
  isTypedArray: Ol,
  isFileList: vl
}, at = X;
function Ms(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var Xa = function(e, r, n) {
  if (!r)
    return e;
  var s;
  if (n)
    s = n(r);
  else if (at.isURLSearchParams(r))
    s = r.toString();
  else {
    var a = [];
    at.forEach(r, function(l, f) {
      l === null || typeof l > "u" || (at.isArray(l) ? f = f + "[]" : l = [l], at.forEach(l, function(d) {
        at.isDate(d) ? d = d.toISOString() : at.isObject(d) && (d = JSON.stringify(d)), a.push(Ms(f) + "=" + Ms(d));
      }));
    }), s = a.join("&");
  }
  if (s) {
    var i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}, Pl = X;
function Fr() {
  this.handlers = [];
}
Fr.prototype.use = function(e, r, n) {
  return this.handlers.push({
    fulfilled: e,
    rejected: r,
    synchronous: n ? n.synchronous : !1,
    runWhen: n ? n.runWhen : null
  }), this.handlers.length - 1;
};
Fr.prototype.eject = function(e) {
  this.handlers[e] && (this.handlers[e] = null);
};
Fr.prototype.forEach = function(e) {
  Pl.forEach(this.handlers, function(n) {
    n !== null && e(n);
  });
};
var Tl = Fr, Dl = X, Il = function(e, r) {
  Dl.forEach(e, function(s, a) {
    a !== r && a.toUpperCase() === r.toUpperCase() && (e[r] = s, delete e[a]);
  });
}, Ja = X;
function Pt(t, e, r, n, s) {
  Error.call(this), this.message = t, this.name = "AxiosError", e && (this.code = e), r && (this.config = r), n && (this.request = n), s && (this.response = s);
}
Ja.inherits(Pt, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var Za = Pt.prototype, $a = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED"
  // eslint-disable-next-line func-names
].forEach(function(t) {
  $a[t] = { value: t };
});
Object.defineProperties(Pt, $a);
Object.defineProperty(Za, "isAxiosError", { value: !0 });
Pt.from = function(t, e, r, n, s, a) {
  var i = Object.create(Za);
  return Ja.toFlatObject(t, i, function(l) {
    return l !== Error.prototype;
  }), Pt.call(i, t.message, e, r, n, s), i.name = t.name, a && Object.assign(i, a), i;
};
var kt = Pt, ei = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, pe = X;
function kl(t, e) {
  e = e || new FormData();
  var r = [];
  function n(a) {
    return a === null ? "" : pe.isDate(a) ? a.toISOString() : pe.isArrayBuffer(a) || pe.isTypedArray(a) ? typeof Blob == "function" ? new Blob([a]) : Buffer.from(a) : a;
  }
  function s(a, i) {
    if (pe.isPlainObject(a) || pe.isArray(a)) {
      if (r.indexOf(a) !== -1)
        throw Error("Circular reference detected in " + i);
      r.push(a), pe.forEach(a, function(l, f) {
        if (!pe.isUndefined(l)) {
          var c = i ? i + "." + f : f, d;
          if (l && !i && typeof l == "object") {
            if (pe.endsWith(f, "{}"))
              l = JSON.stringify(l);
            else if (pe.endsWith(f, "[]") && (d = pe.toArray(l))) {
              d.forEach(function(m) {
                !pe.isUndefined(m) && e.append(c, n(m));
              });
              return;
            }
          }
          s(l, c);
        }
      }), r.pop();
    } else
      e.append(i, n(a));
  }
  return s(t), e;
}
var ti = kl, Zr, Vs;
function Ll() {
  if (Vs)
    return Zr;
  Vs = 1;
  var t = kt;
  return Zr = function(r, n, s) {
    var a = s.config.validateStatus;
    !s.status || !a || a(s.status) ? r(s) : n(new t(
      "Request failed with status code " + s.status,
      [t.ERR_BAD_REQUEST, t.ERR_BAD_RESPONSE][Math.floor(s.status / 100) - 4],
      s.config,
      s.request,
      s
    ));
  }, Zr;
}
var $r, js;
function Ul() {
  if (js)
    return $r;
  js = 1;
  var t = X;
  return $r = t.isStandardBrowserEnv() ? (
    // Standard browser envs support document.cookie
    function() {
      return {
        write: function(n, s, a, i, o, l) {
          var f = [];
          f.push(n + "=" + encodeURIComponent(s)), t.isNumber(a) && f.push("expires=" + new Date(a).toGMTString()), t.isString(i) && f.push("path=" + i), t.isString(o) && f.push("domain=" + o), l === !0 && f.push("secure"), document.cookie = f.join("; ");
        },
        read: function(n) {
          var s = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
          return s ? decodeURIComponent(s[3]) : null;
        },
        remove: function(n) {
          this.write(n, "", Date.now() - 864e5);
        }
      };
    }()
  ) : (
    // Non standard browser env (web workers, react-native) lack needed support.
    function() {
      return {
        write: function() {
        },
        read: function() {
          return null;
        },
        remove: function() {
        }
      };
    }()
  ), $r;
}
var Fl = function(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}, Ml = function(e, r) {
  return r ? e.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : e;
}, Vl = Fl, jl = Ml, ri = function(e, r) {
  return e && !Vl(r) ? jl(e, r) : r;
}, en, Bs;
function Bl() {
  if (Bs)
    return en;
  Bs = 1;
  var t = X, e = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  return en = function(n) {
    var s = {}, a, i, o;
    return n && t.forEach(n.split(`
`), function(f) {
      if (o = f.indexOf(":"), a = t.trim(f.substr(0, o)).toLowerCase(), i = t.trim(f.substr(o + 1)), a) {
        if (s[a] && e.indexOf(a) >= 0)
          return;
        a === "set-cookie" ? s[a] = (s[a] ? s[a] : []).concat([i]) : s[a] = s[a] ? s[a] + ", " + i : i;
      }
    }), s;
  }, en;
}
var tn, qs;
function ql() {
  if (qs)
    return tn;
  qs = 1;
  var t = X;
  return tn = t.isStandardBrowserEnv() ? (
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function() {
      var r = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a"), s;
      function a(i) {
        var o = i;
        return r && (n.setAttribute("href", o), o = n.href), n.setAttribute("href", o), {
          href: n.href,
          protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
          host: n.host,
          search: n.search ? n.search.replace(/^\?/, "") : "",
          hash: n.hash ? n.hash.replace(/^#/, "") : "",
          hostname: n.hostname,
          port: n.port,
          pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
        };
      }
      return s = a(window.location.href), function(o) {
        var l = t.isString(o) ? a(o) : o;
        return l.protocol === s.protocol && l.host === s.host;
      };
    }()
  ) : (
    // Non standard browser envs (web workers, react-native) lack needed support.
    function() {
      return function() {
        return !0;
      };
    }()
  ), tn;
}
var rn, Qs;
function Mr() {
  if (Qs)
    return rn;
  Qs = 1;
  var t = kt, e = X;
  function r(n) {
    t.call(this, n ?? "canceled", t.ERR_CANCELED), this.name = "CanceledError";
  }
  return e.inherits(r, t, {
    __CANCEL__: !0
  }), rn = r, rn;
}
var nn, _s;
function Ql() {
  return _s || (_s = 1, nn = function(e) {
    var r = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return r && r[1] || "";
  }), nn;
}
var sn, Ks;
function Ws() {
  if (Ks)
    return sn;
  Ks = 1;
  var t = X, e = Ll(), r = Ul(), n = Xa, s = ri, a = Bl(), i = ql(), o = ei, l = kt, f = Mr(), c = Ql();
  return sn = function(m) {
    return new Promise(function(E, S) {
      var b = m.data, y = m.headers, w = m.responseType, R;
      function I() {
        m.cancelToken && m.cancelToken.unsubscribe(R), m.signal && m.signal.removeEventListener("abort", R);
      }
      t.isFormData(b) && t.isStandardBrowserEnv() && delete y["Content-Type"];
      var N = new XMLHttpRequest();
      if (m.auth) {
        var U = m.auth.username || "", j = m.auth.password ? unescape(encodeURIComponent(m.auth.password)) : "";
        y.Authorization = "Basic " + btoa(U + ":" + j);
      }
      var M = s(m.baseURL, m.url);
      N.open(m.method.toUpperCase(), n(M, m.params, m.paramsSerializer), !0), N.timeout = m.timeout;
      function q() {
        if (N) {
          var J = "getAllResponseHeaders" in N ? a(N.getAllResponseHeaders()) : null, Z = !w || w === "text" || w === "json" ? N.responseText : N.response, ee = {
            data: Z,
            status: N.status,
            statusText: N.statusText,
            headers: J,
            config: m,
            request: N
          };
          e(function(rt) {
            E(rt), I();
          }, function(rt) {
            S(rt), I();
          }, ee), N = null;
        }
      }
      if ("onloadend" in N ? N.onloadend = q : N.onreadystatechange = function() {
        !N || N.readyState !== 4 || N.status === 0 && !(N.responseURL && N.responseURL.indexOf("file:") === 0) || setTimeout(q);
      }, N.onabort = function() {
        N && (S(new l("Request aborted", l.ECONNABORTED, m, N)), N = null);
      }, N.onerror = function() {
        S(new l("Network Error", l.ERR_NETWORK, m, N, N)), N = null;
      }, N.ontimeout = function() {
        var Z = m.timeout ? "timeout of " + m.timeout + "ms exceeded" : "timeout exceeded", ee = m.transitional || o;
        m.timeoutErrorMessage && (Z = m.timeoutErrorMessage), S(new l(
          Z,
          ee.clarifyTimeoutError ? l.ETIMEDOUT : l.ECONNABORTED,
          m,
          N
        )), N = null;
      }, t.isStandardBrowserEnv()) {
        var Re = (m.withCredentials || i(M)) && m.xsrfCookieName ? r.read(m.xsrfCookieName) : void 0;
        Re && (y[m.xsrfHeaderName] = Re);
      }
      "setRequestHeader" in N && t.forEach(y, function(Z, ee) {
        typeof b > "u" && ee.toLowerCase() === "content-type" ? delete y[ee] : N.setRequestHeader(ee, Z);
      }), t.isUndefined(m.withCredentials) || (N.withCredentials = !!m.withCredentials), w && w !== "json" && (N.responseType = m.responseType), typeof m.onDownloadProgress == "function" && N.addEventListener("progress", m.onDownloadProgress), typeof m.onUploadProgress == "function" && N.upload && N.upload.addEventListener("progress", m.onUploadProgress), (m.cancelToken || m.signal) && (R = function(J) {
        N && (S(!J || J && J.type ? new f() : J), N.abort(), N = null);
      }, m.cancelToken && m.cancelToken.subscribe(R), m.signal && (m.signal.aborted ? R() : m.signal.addEventListener("abort", R))), b || (b = null);
      var qe = c(M);
      if (qe && ["http", "https", "file"].indexOf(qe) === -1) {
        S(new l("Unsupported protocol " + qe + ":", l.ERR_BAD_REQUEST, m));
        return;
      }
      N.send(b);
    });
  }, sn;
}
var an, zs;
function _l() {
  return zs || (zs = 1, an = null), an;
}
var H = X, Gs = Il, Hs = kt, Kl = ei, Wl = ti, zl = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function Ys(t, e) {
  !H.isUndefined(t) && H.isUndefined(t["Content-Type"]) && (t["Content-Type"] = e);
}
function Gl() {
  var t;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (t = Ws()), t;
}
function Hl(t, e, r) {
  if (H.isString(t))
    try {
      return (e || JSON.parse)(t), H.trim(t);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(t);
}
var Vr = {
  transitional: Kl,
  adapter: Gl(),
  transformRequest: [function(e, r) {
    if (Gs(r, "Accept"), Gs(r, "Content-Type"), H.isFormData(e) || H.isArrayBuffer(e) || H.isBuffer(e) || H.isStream(e) || H.isFile(e) || H.isBlob(e))
      return e;
    if (H.isArrayBufferView(e))
      return e.buffer;
    if (H.isURLSearchParams(e))
      return Ys(r, "application/x-www-form-urlencoded;charset=utf-8"), e.toString();
    var n = H.isObject(e), s = r && r["Content-Type"], a;
    if ((a = H.isFileList(e)) || n && s === "multipart/form-data") {
      var i = this.env && this.env.FormData;
      return Wl(a ? { "files[]": e } : e, i && new i());
    } else if (n || s === "application/json")
      return Ys(r, "application/json"), Hl(e);
    return e;
  }],
  transformResponse: [function(e) {
    var r = this.transitional || Vr.transitional, n = r && r.silentJSONParsing, s = r && r.forcedJSONParsing, a = !n && this.responseType === "json";
    if (a || s && H.isString(e) && e.length)
      try {
        return JSON.parse(e);
      } catch (i) {
        if (a)
          throw i.name === "SyntaxError" ? Hs.from(i, Hs.ERR_BAD_RESPONSE, this, null, this.response) : i;
      }
    return e;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: _l()
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
H.forEach(["delete", "get", "head"], function(e) {
  Vr.headers[e] = {};
});
H.forEach(["post", "put", "patch"], function(e) {
  Vr.headers[e] = H.merge(zl);
});
var Yn = Vr, Yl = X, Xl = Yn, Jl = function(e, r, n) {
  var s = this || Xl;
  return Yl.forEach(n, function(i) {
    e = i.call(s, e, r);
  }), e;
}, on, Xs;
function ni() {
  return Xs || (Xs = 1, on = function(e) {
    return !!(e && e.__CANCEL__);
  }), on;
}
var Js = X, ln = Jl, Zl = ni(), $l = Yn, ec = Mr();
function cn(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new ec();
}
var tc = function(e) {
  cn(e), e.headers = e.headers || {}, e.data = ln.call(
    e,
    e.data,
    e.headers,
    e.transformRequest
  ), e.headers = Js.merge(
    e.headers.common || {},
    e.headers[e.method] || {},
    e.headers
  ), Js.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function(s) {
      delete e.headers[s];
    }
  );
  var r = e.adapter || $l.adapter;
  return r(e).then(function(s) {
    return cn(e), s.data = ln.call(
      e,
      s.data,
      s.headers,
      e.transformResponse
    ), s;
  }, function(s) {
    return Zl(s) || (cn(e), s && s.response && (s.response.data = ln.call(
      e,
      s.response.data,
      s.response.headers,
      e.transformResponse
    ))), Promise.reject(s);
  });
}, ae = X, si = function(e, r) {
  r = r || {};
  var n = {};
  function s(c, d) {
    return ae.isPlainObject(c) && ae.isPlainObject(d) ? ae.merge(c, d) : ae.isPlainObject(d) ? ae.merge({}, d) : ae.isArray(d) ? d.slice() : d;
  }
  function a(c) {
    if (ae.isUndefined(r[c])) {
      if (!ae.isUndefined(e[c]))
        return s(void 0, e[c]);
    } else
      return s(e[c], r[c]);
  }
  function i(c) {
    if (!ae.isUndefined(r[c]))
      return s(void 0, r[c]);
  }
  function o(c) {
    if (ae.isUndefined(r[c])) {
      if (!ae.isUndefined(e[c]))
        return s(void 0, e[c]);
    } else
      return s(void 0, r[c]);
  }
  function l(c) {
    if (c in r)
      return s(e[c], r[c]);
    if (c in e)
      return s(void 0, e[c]);
  }
  var f = {
    url: i,
    method: i,
    data: i,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: l
  };
  return ae.forEach(Object.keys(e).concat(Object.keys(r)), function(d) {
    var m = f[d] || a, g = m(d);
    ae.isUndefined(g) && m !== l || (n[d] = g);
  }), n;
}, un, Zs;
function ai() {
  return Zs || (Zs = 1, un = {
    version: "0.27.2"
  }), un;
}
var rc = ai().version, Pe = kt, Xn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(t, e) {
  Xn[t] = function(n) {
    return typeof n === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
var $s = {};
Xn.transitional = function(e, r, n) {
  function s(a, i) {
    return "[Axios v" + rc + "] Transitional option '" + a + "'" + i + (n ? ". " + n : "");
  }
  return function(a, i, o) {
    if (e === !1)
      throw new Pe(
        s(i, " has been removed" + (r ? " in " + r : "")),
        Pe.ERR_DEPRECATED
      );
    return r && !$s[i] && ($s[i] = !0, console.warn(
      s(
        i,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), e ? e(a, i, o) : !0;
  };
};
function nc(t, e, r) {
  if (typeof t != "object")
    throw new Pe("options must be an object", Pe.ERR_BAD_OPTION_VALUE);
  for (var n = Object.keys(t), s = n.length; s-- > 0; ) {
    var a = n[s], i = e[a];
    if (i) {
      var o = t[a], l = o === void 0 || i(o, a, t);
      if (l !== !0)
        throw new Pe("option " + a + " must be " + l, Pe.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new Pe("Unknown option " + a, Pe.ERR_BAD_OPTION);
  }
}
var sc = {
  assertOptions: nc,
  validators: Xn
}, ii = X, ac = Xa, ea = Tl, ta = tc, jr = si, ic = ri, oi = sc, it = oi.validators;
function Tt(t) {
  this.defaults = t, this.interceptors = {
    request: new ea(),
    response: new ea()
  };
}
Tt.prototype.request = function(e, r) {
  typeof e == "string" ? (r = r || {}, r.url = e) : r = e || {}, r = jr(this.defaults, r), r.method ? r.method = r.method.toLowerCase() : this.defaults.method ? r.method = this.defaults.method.toLowerCase() : r.method = "get";
  var n = r.transitional;
  n !== void 0 && oi.assertOptions(n, {
    silentJSONParsing: it.transitional(it.boolean),
    forcedJSONParsing: it.transitional(it.boolean),
    clarifyTimeoutError: it.transitional(it.boolean)
  }, !1);
  var s = [], a = !0;
  this.interceptors.request.forEach(function(g) {
    typeof g.runWhen == "function" && g.runWhen(r) === !1 || (a = a && g.synchronous, s.unshift(g.fulfilled, g.rejected));
  });
  var i = [];
  this.interceptors.response.forEach(function(g) {
    i.push(g.fulfilled, g.rejected);
  });
  var o;
  if (!a) {
    var l = [ta, void 0];
    for (Array.prototype.unshift.apply(l, s), l = l.concat(i), o = Promise.resolve(r); l.length; )
      o = o.then(l.shift(), l.shift());
    return o;
  }
  for (var f = r; s.length; ) {
    var c = s.shift(), d = s.shift();
    try {
      f = c(f);
    } catch (m) {
      d(m);
      break;
    }
  }
  try {
    o = ta(f);
  } catch (m) {
    return Promise.reject(m);
  }
  for (; i.length; )
    o = o.then(i.shift(), i.shift());
  return o;
};
Tt.prototype.getUri = function(e) {
  e = jr(this.defaults, e);
  var r = ic(e.baseURL, e.url);
  return ac(r, e.params, e.paramsSerializer);
};
ii.forEach(["delete", "get", "head", "options"], function(e) {
  Tt.prototype[e] = function(r, n) {
    return this.request(jr(n || {}, {
      method: e,
      url: r,
      data: (n || {}).data
    }));
  };
});
ii.forEach(["post", "put", "patch"], function(e) {
  function r(n) {
    return function(a, i, o) {
      return this.request(jr(o || {}, {
        method: e,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: i
      }));
    };
  }
  Tt.prototype[e] = r(), Tt.prototype[e + "Form"] = r(!0);
});
var oc = Tt, dn, ra;
function lc() {
  if (ra)
    return dn;
  ra = 1;
  var t = Mr();
  function e(r) {
    if (typeof r != "function")
      throw new TypeError("executor must be a function.");
    var n;
    this.promise = new Promise(function(i) {
      n = i;
    });
    var s = this;
    this.promise.then(function(a) {
      if (s._listeners) {
        var i, o = s._listeners.length;
        for (i = 0; i < o; i++)
          s._listeners[i](a);
        s._listeners = null;
      }
    }), this.promise.then = function(a) {
      var i, o = new Promise(function(l) {
        s.subscribe(l), i = l;
      }).then(a);
      return o.cancel = function() {
        s.unsubscribe(i);
      }, o;
    }, r(function(i) {
      s.reason || (s.reason = new t(i), n(s.reason));
    });
  }
  return e.prototype.throwIfRequested = function() {
    if (this.reason)
      throw this.reason;
  }, e.prototype.subscribe = function(n) {
    if (this.reason) {
      n(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(n) : this._listeners = [n];
  }, e.prototype.unsubscribe = function(n) {
    if (this._listeners) {
      var s = this._listeners.indexOf(n);
      s !== -1 && this._listeners.splice(s, 1);
    }
  }, e.source = function() {
    var n, s = new e(function(i) {
      n = i;
    });
    return {
      token: s,
      cancel: n
    };
  }, dn = e, dn;
}
var fn, na;
function cc() {
  return na || (na = 1, fn = function(e) {
    return function(n) {
      return e.apply(null, n);
    };
  }), fn;
}
var hn, sa;
function uc() {
  if (sa)
    return hn;
  sa = 1;
  var t = X;
  return hn = function(r) {
    return t.isObject(r) && r.isAxiosError === !0;
  }, hn;
}
var aa = X, dc = Ga, Sr = oc, fc = si, hc = Yn;
function li(t) {
  var e = new Sr(t), r = dc(Sr.prototype.request, e);
  return aa.extend(r, Sr.prototype, e), aa.extend(r, e), r.create = function(s) {
    return li(fc(t, s));
  }, r;
}
var se = li(hc);
se.Axios = Sr;
se.CanceledError = Mr();
se.CancelToken = lc();
se.isCancel = ni();
se.VERSION = ai().version;
se.toFormData = ti;
se.AxiosError = kt;
se.Cancel = se.CanceledError;
se.all = function(e) {
  return Promise.all(e);
};
se.spread = cc();
se.isAxiosError = uc();
_n.exports = se;
_n.exports.default = se;
var pc = _n.exports, mc = pc;
const Lt = /* @__PURE__ */ za(mc);
var _t = /* @__PURE__ */ ((t) => (t[t.PUBLISHER = 0] = "PUBLISHER", t[t.PRODUCT = 1] = "PRODUCT", t))(_t || {}), ot = /* @__PURE__ */ ((t) => (t[t.VANTAGE_API = 0] = "VANTAGE_API", t[t.CUSTOM_API = 1] = "CUSTOM_API", t[t.CDN_API = 2] = "CDN_API", t))(ot || {});
const vc = {
  template: _t.PRODUCT,
  defaultAccuracy: "0.5",
  defaultSearchQuery: "Type in anything you want and explore magic...",
  vantageSearchURL: "https://api.vanta.ge/v1/search",
  branding: {
    logoUrl: "https://img.logoipsum.com/327.svg",
    title: "Empower your search!",
    colors: {
      primary: "#BFC9CA",
      secondary: "#F8C471"
    }
  },
  filter: {
    type: je.SINGLE_SELECT
  },
  customerApiType: {
    getFilters: () => Promise.resolve([])
  },
  shingling: {
    documentMatchScoreWeight: 0,
    queryMatchScoreWeight: 0,
    cosineSimilarityScoreWeight: 1
  }
};
function ci(t, e) {
  for (const r of Object.keys(e)) {
    const n = r, s = e[n];
    if (typeof s == "object" && !Array.isArray(s) && s !== null) {
      t[n] || (t[n] = {}), ci(t[n], s);
      continue;
    }
    s !== void 0 && (t[n] = s);
  }
  return t;
}
const gc = (t) => t.customerAPI.type === ot.CUSTOM_API || !t.customFieldTransformer ? t : {
  ...t,
  customFieldTransformer: Object.entries(
    t.customFieldTransformer
  ).reduce((e, r) => typeof r[1] == "string" ? (e[r[0]] = {
    fieldName: r[1]
  }, e) : (e[r[0]] = r[1], e), {})
}, ui = (t) => {
  let e = t.collectionId;
  Array.isArray(e) || (e = [e]);
  const r = gc(
    t
  );
  return ci(vc, {
    ...r,
    collectionIds: e
  });
}, yc = () => Promise.resolve([]), bc = async (t) => Lt.get("https://demo-api.dev-a.dev.vantagediscovery.com/api/v1/items", {
  params: {
    ids: t,
    clientId: "smartcat",
    clientNamespace: "bookopolis-vukan"
  }
}).then((e) => e.data), wc = {
  template: _t.PRODUCT,
  accountId: "smartcat",
  collectionId: ["bookopolis-vukan"],
  apiKey: "$2a$10$gEKEUssU5o1rpOcYOf/V..ruQZTEmiiNcV1ENkBQdgXQX8loQwXRe",
  vantageSearchURL: "https://api.dev-a.dev.vantagediscovery.com/v1/search",
  customerAPI: {
    type: ot.CUSTOM_API,
    getCustomerItems: bc,
    getFilters: yc
  },
  defaultSearchQuery: "Wonderland",
  branding: {
    logoUrl: "bookopolis/icons/bookopolis.png",
    title: "Empower your search!",
    colors: {
      primary: "#F3E1C459",
      secondary: "#EC7F00"
    }
  },
  filter: {
    type: je.MULTI_SELECT
  }
}, di = ui(wc), fi = (t, e) => ({
  request_id: 333666,
  collection: {
    account_id: t.customerId,
    collection_id: t.customerNamespace,
    accuracy: e.accuracy
  },
  pagination: {
    page: e.pageNumber,
    count: e.pageSize
  }
}), xc = (t, e) => ({
  ...fi(
    t,
    e
  ),
  text: e == null ? void 0 : e.query,
  filter: {
    boolean_filter: e.filters === "()" ? "" : e.filters
  },
  shingling: {
    cosine_similarity_score_weight: e.cosineSimilarityScoreWeight,
    document_match_score_weight: e.documentMatchScoreWeight,
    query_match_score_weight: e.queryMatchScoreWeight
  }
}), Ec = (t, e) => ({
  ...fi(
    t,
    e
  ),
  document_id: e.documentId,
  // TODO: delete once it is removed on backend
  filter: {
    boolean_filter: ""
  }
}), Cc = (t) => ({
  id: t.id,
  score: t.score
}), hi = (t) => ({
  results: t.results.map(
    (e) => Cc(e)
  ),
  executionTime: t.execution_time
}), Sc = `${di.vantageSearchURL}/morelikethis`, Ac = `${di.vantageSearchURL}/semantic`, Rc = async (t, e) => Lt.post(
  `${Ac}/`,
  xc(
    t,
    e
  ),
  { headers: { Authorization: t.apiKey } }
).then(
  (r) => hi(r.data)
), Nc = async (t, e) => Lt.post(
  `${Sc}/`,
  Ec(
    t,
    e
  ),
  { headers: { Authorization: t.apiKey } }
).then(
  (r) => hi(r.data)
), pi = {
  searchByQuery: Rc,
  searchMoreLikeThis: Nc
}, mi = {
  seachMoreLikeThis: (t, e, r) => ["SEARCH_MORE_LIKE_THIS", t, e, r],
  searchByQuery: (t, e) => [
    "SEARCH_BY_QUERY",
    t,
    e
  ]
}, vi = async (t, e) => {
  const r = (a) => {
    const i = t.find(
      (o) => a === o.id
    );
    return (i == null ? void 0 : i.score) || 0;
  };
  return (await e()).map((a) => ({
    ...a,
    score: r(a.id)
  }));
}, Oc = (t, e, r) => Wa({
  queries: t.map((n) => ({
    queryKey: mi.searchByQuery(
      n.customerId,
      n.customerNamespace
    ),
    queryFn: async () => {
      const s = await pi.searchByQuery(
        n,
        e
      ), a = r.getItemsByIds.bind(
        void 0,
        s.results.map((o) => o.id)
      ), i = await vi(
        s.results,
        s.results.length > 0 ? a : () => Promise.resolve([])
      );
      return i.sort((o, l) => l.score - o.score), [s.executionTime, i];
    }
  }))
}), Pc = (t, e, r) => Wa({
  queries: t.map((n) => ({
    queryKey: mi.seachMoreLikeThis(
      n.customerId,
      n.customerNamespace,
      e.documentId
    ),
    queryFn: async () => {
      const s = await pi.searchMoreLikeThis(
        n,
        e
      ), a = r.getItemsByIds.bind(
        void 0,
        s.results.map((o) => o.id)
      );
      if (s.results.length === 0)
        return [s.executionTime, 0];
      const i = await vi(
        s.results,
        s.results.length > 0 ? a : () => Promise.resolve([])
      );
      return i.sort((o, l) => l.score - o.score), [s.executionTime, i];
    },
    enabled: !!e.documentId
  }))
}), ia = {
  useSearchByConfiguration: Oc,
  useMoreLikeThisByConfiguration: Pc
}, Tc = (t, e) => {
  const r = e.split("[");
  let n = t[r[0]];
  for (const s of r.slice(1).map((a) => a.slice(0, -1)))
    n = n[s];
  return n;
}, Dc = (t, e) => {
  const r = e.split(".");
  let n = t;
  for (const s of r) {
    if (s.includes("[")) {
      n = Tc(n, s);
      continue;
    }
    n = n[s];
  }
  return n;
}, Ne = (t, e, r) => {
  if (!r)
    return e;
  const n = Dc(
    t,
    r.fieldName
  );
  return r.transformer ? r.transformer(n) : n;
}, Jn = (t, e) => ({
  id: Ne(t, t.id, e == null ? void 0 : e.id),
  description: Ne(
    t,
    t.description,
    e == null ? void 0 : e.description
  ),
  imageSrc: Ne(
    t,
    t.image_url,
    e == null ? void 0 : e.imageSrc
  ),
  title: Ne(
    t,
    t.title,
    e == null ? void 0 : e.title
  ),
  embeddingText: Ne(
    t,
    t.text,
    e == null ? void 0 : e.embeddingText
  ),
  externalUrl: Ne(
    t,
    t.url,
    e == null ? void 0 : e.externalUrl
  ),
  meta: {
    imageLabel: Ne(
      t,
      "",
      e == null ? void 0 : e.imageLabel
    ),
    subtitle: Ne(
      t,
      "",
      e == null ? void 0 : e.subtitle
    )
  }
}), Ic = async (t, e, r, n, s, a) => Lt.get(t, {
  params: {
    ids: s,
    clientId: r,
    clientNamespace: n
  },
  headers: { Authorization: e }
}).then(
  (i) => i.data.map(
    (o) => Jn(o, a)
  )
), kc = {
  getItemsByIds: Ic
}, Lc = async (t, e, r) => {
  const n = e.map(
    (s) => Lt.get(t.replace("${id}", s)).then(
      (a) => Jn(a.data, r)
    )
  );
  return Promise.all(n);
}, Uc = async (t) => {
  const e = t.map(
    (n) => Lt.get(n).then((s) => s.data)
  );
  return (await Promise.all(e)).flat(1);
}, oa = {
  getItemsByIds: Lc,
  getFilters: Uc
};
class Fc {
  constructor(e) {
    this.configuration = e;
  }
  getItemsByIds(e) {
    const r = this.configuration.customerAPI;
    return kc.getItemsByIds(
      r.apiPath,
      r.apiKey,
      r.accountPrefix || this.configuration.accountId,
      r.collectionPrefix ?? this.configuration.collectionIds[0],
      e,
      this.configuration.customFieldTransformer
    );
  }
  getFilters() {
    return this.configuration.customerAPI.getFilters();
  }
}
class Mc {
  constructor(e) {
    this.configuration = e;
  }
  getItemsByIds(e) {
    return this.configuration.customerAPI.getCustomerItems(e).then(
      (n) => n.map(
        (s) => Jn(
          s,
          this.configuration.customFieldTransformer
        )
      )
    );
  }
  getFilters() {
    return this.configuration.customerAPI.getFilters();
  }
}
class Vc {
  constructor(e) {
    this.configuration = e;
  }
  getItemsByIds(e) {
    const r = this.configuration.customerAPI;
    return oa.getItemsByIds(
      r.itemURLPattern,
      e,
      this.configuration.customFieldTransformer
    );
  }
  getFilters() {
    const e = this.configuration.customerAPI;
    return oa.getFilters(e.filterURL);
  }
}
const jc = (t) => ({
  [ot.VANTAGE_API]: new Fc(t),
  [ot.CUSTOM_API]: new Mc(t),
  [ot.CDN_API]: new Vc(t)
}), Bc = ({
  dataConfiguration: t
}) => {
  const e = Se(() => jc(t), [t]), r = Se(() => e[t.customerAPI.type], [e]);
  return {
    getItemsByIds: (a) => r.getItemsByIds(a),
    getFilters: () => r.getFilters()
  };
};
/**
 * @remix-run/router v1.14.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Kt() {
  return Kt = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, Kt.apply(this, arguments);
}
var Me;
(function(t) {
  t.Pop = "POP", t.Push = "PUSH", t.Replace = "REPLACE";
})(Me || (Me = {}));
const la = "popstate";
function qc(t) {
  t === void 0 && (t = {});
  function e(n, s) {
    let {
      pathname: a,
      search: i,
      hash: o
    } = n.location;
    return Un(
      "",
      {
        pathname: a,
        search: i,
        hash: o
      },
      // state defaults to `null` because `window.history.state` does
      s.state && s.state.usr || null,
      s.state && s.state.key || "default"
    );
  }
  function r(n, s) {
    return typeof s == "string" ? s : Wt(s);
  }
  return _c(e, r, null, t);
}
function k(t, e) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(e);
}
function ve(t, e) {
  if (!t) {
    typeof console < "u" && console.warn(e);
    try {
      throw new Error(e);
    } catch {
    }
  }
}
function Qc() {
  return Math.random().toString(36).substr(2, 8);
}
function ca(t, e) {
  return {
    usr: t.state,
    key: t.key,
    idx: e
  };
}
function Un(t, e, r, n) {
  return r === void 0 && (r = null), Kt({
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: ""
  }, typeof e == "string" ? Ut(e) : e, {
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: e && e.key || n || Qc()
  });
}
function Wt(t) {
  let {
    pathname: e = "/",
    search: r = "",
    hash: n = ""
  } = t;
  return r && r !== "?" && (e += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (e += n.charAt(0) === "#" ? n : "#" + n), e;
}
function Ut(t) {
  let e = {};
  if (t) {
    let r = t.indexOf("#");
    r >= 0 && (e.hash = t.substr(r), t = t.substr(0, r));
    let n = t.indexOf("?");
    n >= 0 && (e.search = t.substr(n), t = t.substr(0, n)), t && (e.pathname = t);
  }
  return e;
}
function _c(t, e, r, n) {
  n === void 0 && (n = {});
  let {
    window: s = document.defaultView,
    v5Compat: a = !1
  } = n, i = s.history, o = Me.Pop, l = null, f = c();
  f == null && (f = 0, i.replaceState(Kt({}, i.state, {
    idx: f
  }), ""));
  function c() {
    return (i.state || {
      idx: null
    }).idx;
  }
  function d() {
    o = Me.Pop;
    let b = c(), y = b == null ? null : b - f;
    f = b, l && l({
      action: o,
      location: S.location,
      delta: y
    });
  }
  function m(b, y) {
    o = Me.Push;
    let w = Un(S.location, b, y);
    r && r(w, b), f = c() + 1;
    let R = ca(w, f), I = S.createHref(w);
    try {
      i.pushState(R, "", I);
    } catch (N) {
      if (N instanceof DOMException && N.name === "DataCloneError")
        throw N;
      s.location.assign(I);
    }
    a && l && l({
      action: o,
      location: S.location,
      delta: 1
    });
  }
  function g(b, y) {
    o = Me.Replace;
    let w = Un(S.location, b, y);
    r && r(w, b), f = c();
    let R = ca(w, f), I = S.createHref(w);
    i.replaceState(R, "", I), a && l && l({
      action: o,
      location: S.location,
      delta: 0
    });
  }
  function E(b) {
    let y = s.location.origin !== "null" ? s.location.origin : s.location.href, w = typeof b == "string" ? b : Wt(b);
    return k(y, "No window.location.(origin|href) available to create URL for href: " + w), new URL(w, y);
  }
  let S = {
    get action() {
      return o;
    },
    get location() {
      return t(s, i);
    },
    listen(b) {
      if (l)
        throw new Error("A history only accepts one active listener");
      return s.addEventListener(la, d), l = b, () => {
        s.removeEventListener(la, d), l = null;
      };
    },
    createHref(b) {
      return e(s, b);
    },
    createURL: E,
    encodeLocation(b) {
      let y = E(b);
      return {
        pathname: y.pathname,
        search: y.search,
        hash: y.hash
      };
    },
    push: m,
    replace: g,
    go(b) {
      return i.go(b);
    }
  };
  return S;
}
var ua;
(function(t) {
  t.data = "data", t.deferred = "deferred", t.redirect = "redirect", t.error = "error";
})(ua || (ua = {}));
function Kc(t, e, r) {
  r === void 0 && (r = "/");
  let n = typeof e == "string" ? Ut(e) : e, s = $e(n.pathname || "/", r);
  if (s == null)
    return null;
  let a = gi(t);
  Wc(a);
  let i = null;
  for (let o = 0; i == null && o < a.length; ++o)
    i = eu(
      a[o],
      // Incoming pathnames are generally encoded from either window.location
      // or from router.navigate, but we want to match against the unencoded
      // paths in the route definitions.  Memory router locations won't be
      // encoded here but there also shouldn't be anything to decode so this
      // should be a safe operation.  This avoids needing matchRoutes to be
      // history-aware.
      ru(s)
    );
  return i;
}
function gi(t, e, r, n) {
  e === void 0 && (e = []), r === void 0 && (r = []), n === void 0 && (n = "");
  let s = (a, i, o) => {
    let l = {
      relativePath: o === void 0 ? a.path || "" : o,
      caseSensitive: a.caseSensitive === !0,
      childrenIndex: i,
      route: a
    };
    l.relativePath.startsWith("/") && (k(l.relativePath.startsWith(n), 'Absolute route path "' + l.relativePath + '" nested under path ' + ('"' + n + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), l.relativePath = l.relativePath.slice(n.length));
    let f = Ce([n, l.relativePath]), c = r.concat(l);
    a.children && a.children.length > 0 && (k(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      a.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + f + '".')
    ), gi(a.children, e, c, f)), !(a.path == null && !a.index) && e.push({
      path: f,
      score: Zc(f, a.index),
      routesMeta: c
    });
  };
  return t.forEach((a, i) => {
    var o;
    if (a.path === "" || !((o = a.path) != null && o.includes("?")))
      s(a, i);
    else
      for (let l of yi(a.path))
        s(a, i, l);
  }), e;
}
function yi(t) {
  let e = t.split("/");
  if (e.length === 0)
    return [];
  let [r, ...n] = e, s = r.endsWith("?"), a = r.replace(/\?$/, "");
  if (n.length === 0)
    return s ? [a, ""] : [a];
  let i = yi(n.join("/")), o = [];
  return o.push(...i.map((l) => l === "" ? a : [a, l].join("/"))), s && o.push(...i), o.map((l) => t.startsWith("/") && l === "" ? "/" : l);
}
function Wc(t) {
  t.sort((e, r) => e.score !== r.score ? r.score - e.score : $c(e.routesMeta.map((n) => n.childrenIndex), r.routesMeta.map((n) => n.childrenIndex)));
}
const zc = /^:\w+$/, Gc = 3, Hc = 2, Yc = 1, Xc = 10, Jc = -2, da = (t) => t === "*";
function Zc(t, e) {
  let r = t.split("/"), n = r.length;
  return r.some(da) && (n += Jc), e && (n += Hc), r.filter((s) => !da(s)).reduce((s, a) => s + (zc.test(a) ? Gc : a === "" ? Yc : Xc), n);
}
function $c(t, e) {
  return t.length === e.length && t.slice(0, -1).every((n, s) => n === e[s]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    t[t.length - 1] - e[e.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function eu(t, e) {
  let {
    routesMeta: r
  } = t, n = {}, s = "/", a = [];
  for (let i = 0; i < r.length; ++i) {
    let o = r[i], l = i === r.length - 1, f = s === "/" ? e : e.slice(s.length) || "/", c = Fn({
      path: o.relativePath,
      caseSensitive: o.caseSensitive,
      end: l
    }, f);
    if (!c)
      return null;
    Object.assign(n, c.params);
    let d = o.route;
    a.push({
      // TODO: Can this as be avoided?
      params: n,
      pathname: Ce([s, c.pathname]),
      pathnameBase: ou(Ce([s, c.pathnameBase])),
      route: d
    }), c.pathnameBase !== "/" && (s = Ce([s, c.pathnameBase]));
  }
  return a;
}
function Fn(t, e) {
  typeof t == "string" && (t = {
    path: t,
    caseSensitive: !1,
    end: !0
  });
  let [r, n] = tu(t.path, t.caseSensitive, t.end), s = e.match(r);
  if (!s)
    return null;
  let a = s[0], i = a.replace(/(.)\/+$/, "$1"), o = s.slice(1);
  return {
    params: n.reduce((f, c, d) => {
      let {
        paramName: m,
        isOptional: g
      } = c;
      if (m === "*") {
        let S = o[d] || "";
        i = a.slice(0, a.length - S.length).replace(/(.)\/+$/, "$1");
      }
      const E = o[d];
      return g && !E ? f[m] = void 0 : f[m] = nu(E || "", m), f;
    }, {}),
    pathname: a,
    pathnameBase: i,
    pattern: t
  };
}
function tu(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !0), ve(t === "*" || !t.endsWith("*") || t.endsWith("/*"), 'Route path "' + t + '" will be treated as if it were ' + ('"' + t.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + t.replace(/\*$/, "/*") + '".'));
  let n = [], s = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:(\w+)(\?)?/g, (i, o, l) => (n.push({
    paramName: o,
    isOptional: l != null
  }), l ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return t.endsWith("*") ? (n.push({
    paramName: "*"
  }), s += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? s += "\\/*$" : t !== "" && t !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, e ? void 0 : "i"), n];
}
function ru(t) {
  try {
    return decodeURI(t);
  } catch (e) {
    return ve(!1, 'The URL path "' + t + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + e + ").")), t;
  }
}
function nu(t, e) {
  try {
    return decodeURIComponent(t);
  } catch (r) {
    return ve(!1, 'The value for the URL param "' + e + '" will not be decoded because' + (' the string "' + t + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + r + ").")), t;
  }
}
function $e(t, e) {
  if (e === "/")
    return t;
  if (!t.toLowerCase().startsWith(e.toLowerCase()))
    return null;
  let r = e.endsWith("/") ? e.length - 1 : e.length, n = t.charAt(r);
  return n && n !== "/" ? null : t.slice(r) || "/";
}
function su(t, e) {
  e === void 0 && (e = "/");
  let {
    pathname: r,
    search: n = "",
    hash: s = ""
  } = typeof t == "string" ? Ut(t) : t;
  return {
    pathname: r ? r.startsWith("/") ? r : au(r, e) : e,
    search: lu(n),
    hash: cu(s)
  };
}
function au(t, e) {
  let r = e.replace(/\/+$/, "").split("/");
  return t.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function pn(t, e, r, n) {
  return "Cannot include a '" + t + "' character in a manually specified " + ("`to." + e + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function iu(t) {
  return t.filter((e, r) => r === 0 || e.route.path && e.route.path.length > 0);
}
function bi(t, e) {
  let r = iu(t);
  return e ? r.map((n, s) => s === t.length - 1 ? n.pathname : n.pathnameBase) : r.map((n) => n.pathnameBase);
}
function wi(t, e, r, n) {
  n === void 0 && (n = !1);
  let s;
  typeof t == "string" ? s = Ut(t) : (s = Kt({}, t), k(!s.pathname || !s.pathname.includes("?"), pn("?", "pathname", "search", s)), k(!s.pathname || !s.pathname.includes("#"), pn("#", "pathname", "hash", s)), k(!s.search || !s.search.includes("#"), pn("#", "search", "hash", s)));
  let a = t === "" || s.pathname === "", i = a ? "/" : s.pathname, o;
  if (i == null)
    o = r;
  else {
    let d = e.length - 1;
    if (!n && i.startsWith("..")) {
      let m = i.split("/");
      for (; m[0] === ".."; )
        m.shift(), d -= 1;
      s.pathname = m.join("/");
    }
    o = d >= 0 ? e[d] : "/";
  }
  let l = su(s, o), f = i && i !== "/" && i.endsWith("/"), c = (a || i === ".") && r.endsWith("/");
  return !l.pathname.endsWith("/") && (f || c) && (l.pathname += "/"), l;
}
const Ce = (t) => t.join("/").replace(/\/\/+/g, "/"), ou = (t) => t.replace(/\/+$/, "").replace(/^\/*/, "/"), lu = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, cu = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t;
function uu(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
const xi = ["post", "put", "patch", "delete"];
new Set(xi);
const du = ["get", ...xi];
new Set(du);
/**
 * React Router v6.21.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function zt() {
  return zt = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, zt.apply(this, arguments);
}
const Ft = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && (Ft.displayName = "DataRouter");
const Zn = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && (Zn.displayName = "DataRouterState");
const fu = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && (fu.displayName = "Await");
const he = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && (he.displayName = "Navigation");
const ur = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && (ur.displayName = "Location");
const Ae = /* @__PURE__ */ v.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (Ae.displayName = "Route");
const $n = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && ($n.displayName = "RouteError");
function hu(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e;
  dr() || (process.env.NODE_ENV !== "production" ? k(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : k(!1));
  let {
    basename: n,
    navigator: s
  } = v.useContext(he), {
    hash: a,
    pathname: i,
    search: o
  } = fr(t, {
    relative: r
  }), l = i;
  return n !== "/" && (l = i === "/" ? n : Ce([n, i])), s.createHref({
    pathname: l,
    search: o,
    hash: a
  });
}
function dr() {
  return v.useContext(ur) != null;
}
function Be() {
  return dr() || (process.env.NODE_ENV !== "production" ? k(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : k(!1)), v.useContext(ur).location;
}
const Ei = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Ci(t) {
  v.useContext(he).static || v.useLayoutEffect(t);
}
function Si() {
  let {
    isDataRoute: t
  } = v.useContext(Ae);
  return t ? Nu() : pu();
}
function pu() {
  dr() || (process.env.NODE_ENV !== "production" ? k(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : k(!1));
  let t = v.useContext(Ft), {
    basename: e,
    future: r,
    navigator: n
  } = v.useContext(he), {
    matches: s
  } = v.useContext(Ae), {
    pathname: a
  } = Be(), i = JSON.stringify(bi(s, r.v7_relativeSplatPath)), o = v.useRef(!1);
  return Ci(() => {
    o.current = !0;
  }), v.useCallback(function(f, c) {
    if (c === void 0 && (c = {}), process.env.NODE_ENV !== "production" && ve(o.current, Ei), !o.current)
      return;
    if (typeof f == "number") {
      n.go(f);
      return;
    }
    let d = wi(f, JSON.parse(i), a, c.relative === "path");
    t == null && e !== "/" && (d.pathname = d.pathname === "/" ? e : Ce([e, d.pathname])), (c.replace ? n.replace : n.push)(d, c.state, c);
  }, [e, n, i, a, t]);
}
function fr(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e, {
    future: n
  } = v.useContext(he), {
    matches: s
  } = v.useContext(Ae), {
    pathname: a
  } = Be(), i = JSON.stringify(bi(s, n.v7_relativeSplatPath));
  return v.useMemo(() => wi(t, JSON.parse(i), a, r === "path"), [t, i, a, r]);
}
function mu(t, e) {
  return vu(t, e);
}
function vu(t, e, r, n) {
  dr() || (process.env.NODE_ENV !== "production" ? k(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  ) : k(!1));
  let {
    navigator: s
  } = v.useContext(he), {
    matches: a
  } = v.useContext(Ae), i = a[a.length - 1], o = i ? i.params : {}, l = i ? i.pathname : "/", f = i ? i.pathnameBase : "/", c = i && i.route;
  if (process.env.NODE_ENV !== "production") {
    let w = c && c.path || "";
    Ri(l, !c || w.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + l + '" (under <Route path="' + w + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + w + '"> to <Route ') + ('path="' + (w === "/" ? "*" : w + "/*") + '">.'));
  }
  let d = Be(), m;
  if (e) {
    var g;
    let w = typeof e == "string" ? Ut(e) : e;
    f === "/" || (g = w.pathname) != null && g.startsWith(f) || (process.env.NODE_ENV !== "production" ? k(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + f + '" ') + ('but pathname "' + w.pathname + '" was given in the `location` prop.')) : k(!1)), m = w;
  } else
    m = d;
  let E = m.pathname || "/", S = f === "/" ? E : E.slice(f.length) || "/", b = Kc(t, {
    pathname: S
  });
  process.env.NODE_ENV !== "production" && (process.env.NODE_ENV !== "production" && ve(c || b != null, 'No routes matched location "' + m.pathname + m.search + m.hash + '" '), process.env.NODE_ENV !== "production" && ve(b == null || b[b.length - 1].route.element !== void 0 || b[b.length - 1].route.Component !== void 0 || b[b.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + m.pathname + m.search + m.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'));
  let y = xu(b && b.map((w) => Object.assign({}, w, {
    params: Object.assign({}, o, w.params),
    pathname: Ce([
      f,
      // Re-encode pathnames that were decoded inside matchRoutes
      s.encodeLocation ? s.encodeLocation(w.pathname).pathname : w.pathname
    ]),
    pathnameBase: w.pathnameBase === "/" ? f : Ce([
      f,
      // Re-encode pathnames that were decoded inside matchRoutes
      s.encodeLocation ? s.encodeLocation(w.pathnameBase).pathname : w.pathnameBase
    ])
  })), a, r, n);
  return e && y ? /* @__PURE__ */ v.createElement(ur.Provider, {
    value: {
      location: zt({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, m),
      navigationType: Me.Pop
    }
  }, y) : y;
}
function gu() {
  let t = Ru(), e = uu(t) ? t.status + " " + t.statusText : t instanceof Error ? t.message : JSON.stringify(t), r = t instanceof Error ? t.stack : null, n = "rgba(200,200,200, 0.5)", s = {
    padding: "0.5rem",
    backgroundColor: n
  }, a = {
    padding: "2px 4px",
    backgroundColor: n
  }, i = null;
  return process.env.NODE_ENV !== "production" && (console.error("Error handled by React Router default ErrorBoundary:", t), i = /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ v.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ v.createElement("code", {
    style: a
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ v.createElement("code", {
    style: a
  }, "errorElement"), " prop on your route."))), /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ v.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, e), r ? /* @__PURE__ */ v.createElement("pre", {
    style: s
  }, r) : null, i);
}
const yu = /* @__PURE__ */ v.createElement(gu, null);
class bu extends v.Component {
  constructor(e) {
    super(e), this.state = {
      location: e.location,
      revalidation: e.revalidation,
      error: e.error
    };
  }
  static getDerivedStateFromError(e) {
    return {
      error: e
    };
  }
  static getDerivedStateFromProps(e, r) {
    return r.location !== e.location || r.revalidation !== "idle" && e.revalidation === "idle" ? {
      error: e.error,
      location: e.location,
      revalidation: e.revalidation
    } : {
      error: e.error !== void 0 ? e.error : r.error,
      location: r.location,
      revalidation: e.revalidation || r.revalidation
    };
  }
  componentDidCatch(e, r) {
    console.error("React Router caught the following error during render", e, r);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ v.createElement(Ae.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ v.createElement($n.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function wu(t) {
  let {
    routeContext: e,
    match: r,
    children: n
  } = t, s = v.useContext(Ft);
  return s && s.static && s.staticContext && (r.route.errorElement || r.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = r.route.id), /* @__PURE__ */ v.createElement(Ae.Provider, {
    value: e
  }, n);
}
function xu(t, e, r, n) {
  var s;
  if (e === void 0 && (e = []), r === void 0 && (r = null), n === void 0 && (n = null), t == null) {
    var a;
    if ((a = r) != null && a.errors)
      t = r.matches;
    else
      return null;
  }
  let i = t, o = (s = r) == null ? void 0 : s.errors;
  if (o != null) {
    let c = i.findIndex((d) => d.route.id && (o == null ? void 0 : o[d.route.id]));
    c >= 0 || (process.env.NODE_ENV !== "production" ? k(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(o).join(",")) : k(!1)), i = i.slice(0, Math.min(i.length, c + 1));
  }
  let l = !1, f = -1;
  if (r && n && n.v7_partialHydration)
    for (let c = 0; c < i.length; c++) {
      let d = i[c];
      if ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (f = c), d.route.id) {
        let {
          loaderData: m,
          errors: g
        } = r, E = d.route.loader && m[d.route.id] === void 0 && (!g || g[d.route.id] === void 0);
        if (d.route.lazy || E) {
          l = !0, f >= 0 ? i = i.slice(0, f + 1) : i = [i[0]];
          break;
        }
      }
    }
  return i.reduceRight((c, d, m) => {
    let g, E = !1, S = null, b = null;
    r && (g = o && d.route.id ? o[d.route.id] : void 0, S = d.route.errorElement || yu, l && (f < 0 && m === 0 ? (Ri("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), E = !0, b = null) : f === m && (E = !0, b = d.route.hydrateFallbackElement || null)));
    let y = e.concat(i.slice(0, m + 1)), w = () => {
      let R;
      return g ? R = S : E ? R = b : d.route.Component ? R = /* @__PURE__ */ v.createElement(d.route.Component, null) : d.route.element ? R = d.route.element : R = c, /* @__PURE__ */ v.createElement(wu, {
        match: d,
        routeContext: {
          outlet: c,
          matches: y,
          isDataRoute: r != null
        },
        children: R
      });
    };
    return r && (d.route.ErrorBoundary || d.route.errorElement || m === 0) ? /* @__PURE__ */ v.createElement(bu, {
      location: r.location,
      revalidation: r.revalidation,
      component: S,
      error: g,
      children: w(),
      routeContext: {
        outlet: null,
        matches: y,
        isDataRoute: !0
      }
    }) : w();
  }, null);
}
var Ai = /* @__PURE__ */ function(t) {
  return t.UseBlocker = "useBlocker", t.UseRevalidator = "useRevalidator", t.UseNavigateStable = "useNavigate", t;
}(Ai || {}), Gt = /* @__PURE__ */ function(t) {
  return t.UseBlocker = "useBlocker", t.UseLoaderData = "useLoaderData", t.UseActionData = "useActionData", t.UseRouteError = "useRouteError", t.UseNavigation = "useNavigation", t.UseRouteLoaderData = "useRouteLoaderData", t.UseMatches = "useMatches", t.UseRevalidator = "useRevalidator", t.UseNavigateStable = "useNavigate", t.UseRouteId = "useRouteId", t;
}(Gt || {});
function es(t) {
  return t + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function Eu(t) {
  let e = v.useContext(Ft);
  return e || (process.env.NODE_ENV !== "production" ? k(!1, es(t)) : k(!1)), e;
}
function Cu(t) {
  let e = v.useContext(Zn);
  return e || (process.env.NODE_ENV !== "production" ? k(!1, es(t)) : k(!1)), e;
}
function Su(t) {
  let e = v.useContext(Ae);
  return e || (process.env.NODE_ENV !== "production" ? k(!1, es(t)) : k(!1)), e;
}
function ts(t) {
  let e = Su(t), r = e.matches[e.matches.length - 1];
  return r.route.id || (process.env.NODE_ENV !== "production" ? k(!1, t + ' can only be used on routes that contain a unique "id"') : k(!1)), r.route.id;
}
function Au() {
  return ts(Gt.UseRouteId);
}
function Ru() {
  var t;
  let e = v.useContext($n), r = Cu(Gt.UseRouteError), n = ts(Gt.UseRouteError);
  return e !== void 0 ? e : (t = r.errors) == null ? void 0 : t[n];
}
function Nu() {
  let {
    router: t
  } = Eu(Ai.UseNavigateStable), e = ts(Gt.UseNavigateStable), r = v.useRef(!1);
  return Ci(() => {
    r.current = !0;
  }), v.useCallback(function(s, a) {
    a === void 0 && (a = {}), process.env.NODE_ENV !== "production" && ve(r.current, Ei), r.current && (typeof s == "number" ? t.navigate(s) : t.navigate(s, zt({
      fromRouteId: e
    }, a)));
  }, [t, e]);
}
const fa = {};
function Ri(t, e, r) {
  !e && !fa[t] && (fa[t] = !0, process.env.NODE_ENV !== "production" && ve(!1, r));
}
function Ni(t) {
  process.env.NODE_ENV !== "production" ? k(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : k(!1);
}
function Ou(t) {
  let {
    basename: e = "/",
    children: r = null,
    location: n,
    navigationType: s = Me.Pop,
    navigator: a,
    static: i = !1,
    future: o
  } = t;
  dr() && (process.env.NODE_ENV !== "production" ? k(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : k(!1));
  let l = e.replace(/^\/*/, "/"), f = v.useMemo(() => ({
    basename: l,
    navigator: a,
    static: i,
    future: zt({
      v7_relativeSplatPath: !1
    }, o)
  }), [l, o, a, i]);
  typeof n == "string" && (n = Ut(n));
  let {
    pathname: c = "/",
    search: d = "",
    hash: m = "",
    state: g = null,
    key: E = "default"
  } = n, S = v.useMemo(() => {
    let b = $e(c, l);
    return b == null ? null : {
      location: {
        pathname: b,
        search: d,
        hash: m,
        state: g,
        key: E
      },
      navigationType: s
    };
  }, [l, c, d, m, g, E, s]);
  return process.env.NODE_ENV !== "production" && ve(S != null, '<Router basename="' + l + '"> is not able to match the URL ' + ('"' + c + d + m + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), S == null ? null : /* @__PURE__ */ v.createElement(he.Provider, {
    value: f
  }, /* @__PURE__ */ v.createElement(ur.Provider, {
    children: r,
    value: S
  }));
}
function Pu(t) {
  let {
    children: e,
    location: r
  } = t;
  return mu(Mn(e), r);
}
new Promise(() => {
});
function Mn(t, e) {
  e === void 0 && (e = []);
  let r = [];
  return v.Children.forEach(t, (n, s) => {
    if (!/* @__PURE__ */ v.isValidElement(n))
      return;
    let a = [...e, s];
    if (n.type === v.Fragment) {
      r.push.apply(r, Mn(n.props.children, a));
      return;
    }
    n.type !== Ni && (process.env.NODE_ENV !== "production" ? k(!1, "[" + (typeof n.type == "string" ? n.type : n.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : k(!1)), !n.props.index || !n.props.children || (process.env.NODE_ENV !== "production" ? k(!1, "An index route cannot have child routes.") : k(!1));
    let i = {
      id: n.props.id || a.join("-"),
      caseSensitive: n.props.caseSensitive,
      element: n.props.element,
      Component: n.props.Component,
      index: n.props.index,
      path: n.props.path,
      loader: n.props.loader,
      action: n.props.action,
      errorElement: n.props.errorElement,
      ErrorBoundary: n.props.ErrorBoundary,
      hasErrorBoundary: n.props.ErrorBoundary != null || n.props.errorElement != null,
      shouldRevalidate: n.props.shouldRevalidate,
      handle: n.props.handle,
      lazy: n.props.lazy
    };
    n.props.children && (i.children = Mn(n.props.children, a)), r.push(i);
  }), r;
}
/**
 * React Router DOM v6.21.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Dt() {
  return Dt = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, Dt.apply(this, arguments);
}
function rs(t, e) {
  if (t == null)
    return {};
  var r = {}, n = Object.keys(t), s, a;
  for (a = 0; a < n.length; a++)
    s = n[a], !(e.indexOf(s) >= 0) && (r[s] = t[s]);
  return r;
}
const Ar = "get", Rr = "application/x-www-form-urlencoded";
function Br(t) {
  return t != null && typeof t.tagName == "string";
}
function Tu(t) {
  return Br(t) && t.tagName.toLowerCase() === "button";
}
function Du(t) {
  return Br(t) && t.tagName.toLowerCase() === "form";
}
function Iu(t) {
  return Br(t) && t.tagName.toLowerCase() === "input";
}
function ku(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function Lu(t, e) {
  return t.button === 0 && // Ignore everything but left clicks
  (!e || e === "_self") && // Let browser handle "target=_blank" etc.
  !ku(t);
}
let br = null;
function Uu() {
  if (br === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), br = !1;
    } catch {
      br = !0;
    }
  return br;
}
const Fu = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function mn(t) {
  return t != null && !Fu.has(t) ? (process.env.NODE_ENV !== "production" && ve(!1, '"' + t + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + Rr + '"')), null) : t;
}
function Mu(t, e) {
  let r, n, s, a, i;
  if (Du(t)) {
    let o = t.getAttribute("action");
    n = o ? $e(o, e) : null, r = t.getAttribute("method") || Ar, s = mn(t.getAttribute("enctype")) || Rr, a = new FormData(t);
  } else if (Tu(t) || Iu(t) && (t.type === "submit" || t.type === "image")) {
    let o = t.form;
    if (o == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let l = t.getAttribute("formaction") || o.getAttribute("action");
    if (n = l ? $e(l, e) : null, r = t.getAttribute("formmethod") || o.getAttribute("method") || Ar, s = mn(t.getAttribute("formenctype")) || mn(o.getAttribute("enctype")) || Rr, a = new FormData(o, t), !Uu()) {
      let {
        name: f,
        type: c,
        value: d
      } = t;
      if (c === "image") {
        let m = f ? f + "." : "";
        a.append(m + "x", "0"), a.append(m + "y", "0");
      } else
        f && a.append(f, d);
    }
  } else {
    if (Br(t))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    r = Ar, n = null, s = Rr, i = t;
  }
  return a && s === "text/plain" && (i = a, a = void 0), {
    action: n,
    method: r.toLowerCase(),
    encType: s,
    formData: a,
    body: i
  };
}
const Vu = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "unstable_viewTransition"], ju = ["aria-current", "caseSensitive", "className", "end", "style", "to", "unstable_viewTransition", "children"], Bu = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "unstable_viewTransition"], Oi = /* @__PURE__ */ v.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (Oi.displayName = "ViewTransition");
const qu = /* @__PURE__ */ v.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (qu.displayName = "Fetchers");
const Qu = "startTransition", ha = v[Qu];
function _u(t) {
  let {
    basename: e,
    children: r,
    future: n,
    window: s
  } = t, a = v.useRef();
  a.current == null && (a.current = qc({
    window: s,
    v5Compat: !0
  }));
  let i = a.current, [o, l] = v.useState({
    action: i.action,
    location: i.location
  }), {
    v7_startTransition: f
  } = n || {}, c = v.useCallback((d) => {
    f && ha ? ha(() => l(d)) : l(d);
  }, [l, f]);
  return v.useLayoutEffect(() => i.listen(c), [i, c]), /* @__PURE__ */ v.createElement(Ou, {
    basename: e,
    children: r,
    location: o.location,
    navigationType: o.action,
    navigator: i,
    future: n
  });
}
process.env.NODE_ENV;
const Ku = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Wu = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, qr = /* @__PURE__ */ v.forwardRef(function(e, r) {
  let {
    onClick: n,
    relative: s,
    reloadDocument: a,
    replace: i,
    state: o,
    target: l,
    to: f,
    preventScrollReset: c,
    unstable_viewTransition: d
  } = e, m = rs(e, Vu), {
    basename: g
  } = v.useContext(he), E, S = !1;
  if (typeof f == "string" && Wu.test(f) && (E = f, Ku))
    try {
      let R = new URL(window.location.href), I = f.startsWith("//") ? new URL(R.protocol + f) : new URL(f), N = $e(I.pathname, g);
      I.origin === R.origin && N != null ? f = N + I.search + I.hash : S = !0;
    } catch {
      process.env.NODE_ENV !== "production" && ve(!1, '<Link to="' + f + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let b = hu(f, {
    relative: s
  }), y = Yu(f, {
    replace: i,
    state: o,
    target: l,
    preventScrollReset: c,
    relative: s,
    unstable_viewTransition: d
  });
  function w(R) {
    n && n(R), R.defaultPrevented || y(R);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ v.createElement("a", Dt({}, m, {
      href: E || b,
      onClick: S || a ? n : w,
      ref: r,
      target: l
    }))
  );
});
process.env.NODE_ENV !== "production" && (qr.displayName = "Link");
const zu = /* @__PURE__ */ v.forwardRef(function(e, r) {
  let {
    "aria-current": n = "page",
    caseSensitive: s = !1,
    className: a = "",
    end: i = !1,
    style: o,
    to: l,
    unstable_viewTransition: f,
    children: c
  } = e, d = rs(e, ju), m = fr(l, {
    relative: d.relative
  }), g = Be(), E = v.useContext(Zn), {
    navigator: S
  } = v.useContext(he), b = E != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  td(m) && f === !0, y = S.encodeLocation ? S.encodeLocation(m).pathname : m.pathname, w = g.pathname, R = E && E.navigation && E.navigation.location ? E.navigation.location.pathname : null;
  s || (w = w.toLowerCase(), R = R ? R.toLowerCase() : null, y = y.toLowerCase());
  const I = y !== "/" && y.endsWith("/") ? y.length - 1 : y.length;
  let N = w === y || !i && w.startsWith(y) && w.charAt(I) === "/", U = R != null && (R === y || !i && R.startsWith(y) && R.charAt(y.length) === "/"), j = {
    isActive: N,
    isPending: U,
    isTransitioning: b
  }, M = N ? n : void 0, q;
  typeof a == "function" ? q = a(j) : q = [a, N ? "active" : null, U ? "pending" : null, b ? "transitioning" : null].filter(Boolean).join(" ");
  let Re = typeof o == "function" ? o(j) : o;
  return /* @__PURE__ */ v.createElement(qr, Dt({}, d, {
    "aria-current": M,
    className: q,
    ref: r,
    style: Re,
    to: l,
    unstable_viewTransition: f
  }), typeof c == "function" ? c(j) : c);
});
process.env.NODE_ENV !== "production" && (zu.displayName = "NavLink");
const Gu = /* @__PURE__ */ v.forwardRef((t, e) => {
  let {
    fetcherKey: r,
    navigate: n,
    reloadDocument: s,
    replace: a,
    state: i,
    method: o = Ar,
    action: l,
    onSubmit: f,
    relative: c,
    preventScrollReset: d,
    unstable_viewTransition: m
  } = t, g = rs(t, Bu), E = $u(), S = ed(l, {
    relative: c
  }), b = o.toLowerCase() === "get" ? "get" : "post", y = (w) => {
    if (f && f(w), w.defaultPrevented)
      return;
    w.preventDefault();
    let R = w.nativeEvent.submitter, I = (R == null ? void 0 : R.getAttribute("formmethod")) || o;
    E(R || w.currentTarget, {
      fetcherKey: r,
      method: I,
      navigate: n,
      replace: a,
      state: i,
      relative: c,
      preventScrollReset: d,
      unstable_viewTransition: m
    });
  };
  return /* @__PURE__ */ v.createElement("form", Dt({
    ref: e,
    method: b,
    action: S,
    onSubmit: s ? f : y
  }, g));
});
process.env.NODE_ENV !== "production" && (Gu.displayName = "Form");
process.env.NODE_ENV;
var Dr;
(function(t) {
  t.UseScrollRestoration = "useScrollRestoration", t.UseSubmit = "useSubmit", t.UseSubmitFetcher = "useSubmitFetcher", t.UseFetcher = "useFetcher", t.useViewTransitionState = "useViewTransitionState";
})(Dr || (Dr = {}));
var pa;
(function(t) {
  t.UseFetcher = "useFetcher", t.UseFetchers = "useFetchers", t.UseScrollRestoration = "useScrollRestoration";
})(pa || (pa = {}));
function Hu(t) {
  return t + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function Pi(t) {
  let e = v.useContext(Ft);
  return e || (process.env.NODE_ENV !== "production" ? k(!1, Hu(t)) : k(!1)), e;
}
function Yu(t, e) {
  let {
    target: r,
    replace: n,
    state: s,
    preventScrollReset: a,
    relative: i,
    unstable_viewTransition: o
  } = e === void 0 ? {} : e, l = Si(), f = Be(), c = fr(t, {
    relative: i
  });
  return v.useCallback((d) => {
    if (Lu(d, r)) {
      d.preventDefault();
      let m = n !== void 0 ? n : Wt(f) === Wt(c);
      l(t, {
        replace: m,
        state: s,
        preventScrollReset: a,
        relative: i,
        unstable_viewTransition: o
      });
    }
  }, [f, l, c, n, s, r, t, a, i, o]);
}
function Xu() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let Ju = 0, Zu = () => "__" + String(++Ju) + "__";
function $u() {
  let {
    router: t
  } = Pi(Dr.UseSubmit), {
    basename: e
  } = v.useContext(he), r = Au();
  return v.useCallback(function(n, s) {
    s === void 0 && (s = {}), Xu();
    let {
      action: a,
      method: i,
      encType: o,
      formData: l,
      body: f
    } = Mu(n, e);
    if (s.navigate === !1) {
      let c = s.fetcherKey || Zu();
      t.fetch(c, r, s.action || a, {
        preventScrollReset: s.preventScrollReset,
        formData: l,
        body: f,
        formMethod: s.method || i,
        formEncType: s.encType || o,
        unstable_flushSync: s.unstable_flushSync
      });
    } else
      t.navigate(s.action || a, {
        preventScrollReset: s.preventScrollReset,
        formData: l,
        body: f,
        formMethod: s.method || i,
        formEncType: s.encType || o,
        replace: s.replace,
        state: s.state,
        fromRouteId: r,
        unstable_flushSync: s.unstable_flushSync,
        unstable_viewTransition: s.unstable_viewTransition
      });
  }, [t, e, r]);
}
function ed(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e, {
    basename: n
  } = v.useContext(he), s = v.useContext(Ae);
  s || (process.env.NODE_ENV !== "production" ? k(!1, "useFormAction must be used inside a RouteContext") : k(!1));
  let [a] = s.matches.slice(-1), i = Dt({}, fr(t || ".", {
    relative: r
  })), o = Be();
  if (t == null) {
    i.search = o.search;
    let l = new URLSearchParams(i.search);
    l.has("index") && l.get("index") === "" && (l.delete("index"), i.search = l.toString() ? "?" + l.toString() : "");
  }
  return (!t || t === ".") && a.route.index && (i.search = i.search ? i.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (i.pathname = i.pathname === "/" ? n : Ce([n, i.pathname])), Wt(i);
}
function td(t, e) {
  e === void 0 && (e = {});
  let r = v.useContext(Oi);
  r == null && (process.env.NODE_ENV !== "production" ? k(!1, "`unstable_useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : k(!1));
  let {
    basename: n
  } = Pi(Dr.useViewTransitionState), s = fr(t, {
    relative: e.relative
  });
  if (!r.isTransitioning)
    return !1;
  let a = $e(r.currentLocation.pathname, n) || r.currentLocation.pathname, i = $e(r.nextLocation.pathname, n) || r.nextLocation.pathname;
  return Fn(s.pathname, i) != null || Fn(s.pathname, a) != null;
}
const rd = (t, e) => ({
  ...t,
  collectionIds: [
    e.get("collectionId") ?? t.collectionIds.toString()
  ],
  defaultAccuracy: e.get("accuracy") ?? t.defaultAccuracy,
  shingling: {
    cosineSimilarityScoreWeight: Number(
      e.get("cosine_similarity_score_weight") ?? t.shingling.cosineSimilarityScoreWeight
    ),
    queryMatchScoreWeight: Number(
      e.get("query_match_score_weight") ?? t.shingling.queryMatchScoreWeight
    ),
    documentMatchScoreWeight: Number(
      e.get("document_match_score_weight") ?? t.shingling.documentMatchScoreWeight
    )
  }
});
function nd(t, e) {
  if (t == null)
    return t;
  if (t.length === 0 && (!e || e && t !== ""))
    return null;
  const r = t instanceof Array ? t[0] : t;
  return r == null ? r : !e && r === "" ? null : r;
}
function sd(t) {
  return t == null ? t : String(t);
}
function ad(t) {
  const e = nd(t, !0);
  return e == null ? e : String(e);
}
const Ir = {
  encode: sd,
  decode: ad
};
function id(t) {
  const e = new URLSearchParams(), r = Object.entries(t);
  for (const [n, s] of r)
    if (s !== void 0 && s !== null)
      if (Array.isArray(s))
        for (const a of s)
          e.append(n, a ?? "");
      else
        e.append(n, s);
  return e.toString();
}
'{}[],":'.split("").map((t) => [t, encodeURIComponent(t)]);
function od(t, e) {
  const r = {}, n = Object.keys(e);
  for (const s of n) {
    const a = e[s];
    t[s] ? r[s] = t[s].encode(e[s]) : r[s] = a == null ? a : String(a);
  }
  return r;
}
function ld(t) {
  const e = new URLSearchParams(t), r = {};
  for (let [n, s] of e)
    Object.prototype.hasOwnProperty.call(r, n) ? Array.isArray(r[n]) ? r[n].push(s) : r[n] = [r[n], s] : r[n] = s;
  return r;
}
class cd {
  constructor() {
    this.paramsMap = /* @__PURE__ */ new Map(), this.registeredParams = /* @__PURE__ */ new Map();
  }
  set(e, r, n, s) {
    this.paramsMap.set(e, {
      stringified: r,
      decoded: n,
      decode: s
    });
  }
  has(e, r, n) {
    if (!this.paramsMap.has(e))
      return !1;
    const s = this.paramsMap.get(e);
    return s ? s.stringified === r && (n == null || s.decode === n) : !1;
  }
  get(e) {
    var r;
    if (this.paramsMap.has(e))
      return (r = this.paramsMap.get(e)) == null ? void 0 : r.decoded;
  }
  registerParams(e) {
    for (const r of e) {
      const n = this.registeredParams.get(r) || 0;
      this.registeredParams.set(r, n + 1);
    }
  }
  unregisterParams(e) {
    for (const r of e) {
      const n = (this.registeredParams.get(r) || 0) - 1;
      n <= 0 ? (this.registeredParams.delete(r), this.paramsMap.has(r) && this.paramsMap.delete(r)) : this.registeredParams.set(r, n);
    }
  }
  clear() {
    this.paramsMap.clear(), this.registeredParams.clear();
  }
}
const Nr = new cd();
function ud(t, e) {
  var r, n, s;
  const a = {};
  let i = !1;
  const o = Object.keys(t);
  let l = o;
  if (e.includeKnownParams || e.includeKnownParams !== !1 && o.length === 0) {
    const c = Object.keys((r = e.params) != null ? r : {});
    l.push(...c);
  }
  for (const c of l) {
    const d = t[c];
    if (d != null && typeof d == "object") {
      a[c] = d;
      continue;
    }
    i = !0, a[c] = (s = (n = e.params) == null ? void 0 : n[c]) != null ? s : Ir;
  }
  return i ? a : t;
}
function Ti(t, e, r, n) {
  var s;
  if (!r || !e.length)
    return t;
  let a = { ...t }, i = !1;
  for (const o of e)
    Object.prototype.hasOwnProperty.call(a, o) || (a[o] = (s = r[o]) != null ? s : n, i = !0);
  return i ? a : t;
}
const dd = Object.prototype.hasOwnProperty;
function ma(t, e) {
  return t === e ? t !== 0 || e !== 0 || 1 / t === 1 / e : t !== t && e !== e;
}
function Di(t, e, r) {
  var n, s;
  if (ma(t, e))
    return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null)
    return !1;
  const a = Object.keys(t), i = Object.keys(e);
  if (a.length !== i.length)
    return !1;
  for (let o = 0; o < a.length; o++) {
    const l = (s = (n = r == null ? void 0 : r[a[o]]) == null ? void 0 : n.equals) != null ? s : ma;
    if (!dd.call(e, a[o]) || !l(t[a[o]], e[a[o]]))
      return !1;
  }
  return !0;
}
function Ii(t, e, r) {
  const n = {}, s = Object.keys(e);
  for (const a of s) {
    const i = e[a], o = t[a];
    let l;
    if (r.has(a, o, i.decode))
      l = r.get(a);
    else {
      if (l = i.decode(o), i.equals && r.has(a, o)) {
        const f = r.get(a);
        i.equals(l, f) && (l = f);
      }
      l !== void 0 && r.set(
        a,
        o,
        l,
        i.decode
      );
    }
    l === void 0 && i.default !== void 0 && (l = i.default), n[a] = l;
  }
  return n;
}
function fd() {
  let t;
  function e(r, n, s) {
    const a = Ii(
      r,
      n,
      s
    );
    return t != null && Di(t, a) ? t : (t = a, a);
  }
  return e;
}
function hd(t) {
  let e;
  for (const r in t)
    if (t[r].urlName) {
      const s = `${t[r].urlName}\0${r}`;
      e ? e.push(s) : e = [s];
    }
  return e ? e.join(`
`) : void 0;
}
function pd(t) {
  if (t)
    return Object.fromEntries(
      t.split(`
`).map((e) => e.split("\0"))
    );
}
function md(t, e) {
  var r;
  let n = {};
  for (const s in t)
    ((r = e[s]) == null ? void 0 : r.urlName) != null ? n[e[s].urlName] = t[s] : n[s] = t[s];
  return n;
}
let va, ga, ya, vn = {};
const ki = (t, e, r) => {
  if (va === e && ya === t && ga === r)
    return vn;
  va = e, ya = t;
  const n = t(e ?? "");
  ga = r;
  const s = pd(r);
  for (let [a, i] of Object.entries(n)) {
    s != null && s[a] && (delete n[a], a = s[a], n[a] = i);
    const o = vn[a];
    Di(i, o) && (n[a] = o);
  }
  return vn = n, n;
}, vd = {
  searchStringToObject: ld,
  objectToSearchString: id,
  updateType: "pushIn",
  includeKnownParams: void 0,
  includeAllParams: !1,
  removeDefaultsFromUrl: !1,
  enableBatching: !1,
  skipUpdateWhenNoChange: !0
};
function Li(t, e) {
  e == null && (e = {});
  const r = { ...t, ...e };
  return e.params && t.params && (r.params = { ...t.params, ...e.params }), r;
}
const Ui = {
  adapter: {},
  options: vd
}, Vn = v.createContext(
  Ui
);
function gd() {
  const t = v.useContext(Vn);
  if (t === void 0 || t === Ui)
    throw new Error("useQueryParams must be used within a QueryParamProvider");
  return t;
}
function ba({
  children: t,
  adapter: e,
  options: r
}) {
  const { adapter: n, options: s } = v.useContext(Vn), a = v.useMemo(() => ({
    adapter: e ?? n,
    options: Li(
      s,
      r
    )
  }), [e, r, n, s]);
  return /* @__PURE__ */ v.createElement(Vn.Provider, {
    value: a
  }, t);
}
function yd({
  children: t,
  adapter: e,
  options: r
}) {
  const n = e;
  return n ? /* @__PURE__ */ v.createElement(n, null, (s) => /* @__PURE__ */ v.createElement(ba, {
    adapter: s,
    options: r
  }, t)) : /* @__PURE__ */ v.createElement(ba, {
    options: r
  }, t);
}
function bd(t, e) {
  var r;
  for (const n in t)
    ((r = e[n]) == null ? void 0 : r.default) !== void 0 && t[n] !== void 0 && e[n].encode(
      e[n].default
    ) === t[n] && (t[n] = void 0);
}
function wd({
  changes: t,
  updateType: e,
  currentSearchString: r,
  paramConfigMap: n,
  options: s
}) {
  const { searchStringToObject: a, objectToSearchString: i } = s;
  e == null && (e = s.updateType);
  let o;
  const l = ki(
    a,
    r
  ), f = Ti(
    n,
    Object.keys(t),
    s.params
  );
  let c;
  if (typeof t == "function") {
    const m = Ii(
      l,
      f,
      Nr
    );
    c = t(m);
  } else
    c = t;
  o = od(f, c), s.removeDefaultsFromUrl && bd(o, f), o = md(o, f);
  let d;
  return e === "push" || e === "replace" ? d = i(o) : d = i({
    ...l,
    ...o
  }), d != null && d.length && d[0] !== "?" && (d = `?${d}`), d ?? "";
}
function xd({
  searchString: t,
  adapter: e,
  navigate: r,
  updateType: n
}) {
  const a = {
    ...e.location,
    search: t
  };
  r && (typeof n == "string" && n.startsWith("replace") ? e.replace(a) : e.push(a));
}
const Ed = (t) => t(), Cd = (t) => setTimeout(() => t(), 0), wr = [];
function Sd(t, { immediate: e } = {}) {
  wr.push(t);
  let r = e ? Ed : Cd;
  wr.length === 1 && r(() => {
    const n = wr.slice();
    wr.length = 0;
    const s = n[0].currentSearchString;
    let a;
    for (let i = 0; i < n.length; ++i) {
      const o = i === 0 ? n[i] : { ...n[i], currentSearchString: a };
      a = wd(o);
    }
    t.options.skipUpdateWhenNoChange && a === s || xd({
      searchString: a ?? "",
      adapter: n[n.length - 1].adapter,
      navigate: !0,
      updateType: n[n.length - 1].updateType
    });
  });
}
function Ad(t, e) {
  const { adapter: r, options: n } = gd(), [s] = re(fd), { paramConfigMap: a, options: i } = Nd(
    t,
    e
  ), o = Se(() => Li(n, i), [n, i]);
  let l = ud(
    a,
    o
  );
  const f = ki(
    o.searchStringToObject,
    r.location.search,
    hd(l)
  );
  o.includeAllParams && (l = Ti(
    l,
    Object.keys(f),
    o.params,
    Ir
  ));
  const c = s(
    f,
    l,
    Nr
  ), d = Object.keys(l).join("\0");
  Y(() => {
    const S = d.split("\0");
    return Nr.registerParams(S), () => {
      Nr.unregisterParams(S);
    };
  }, [d]);
  const m = {
    adapter: r,
    paramConfigMap: l,
    options: o
  }, g = Lr(m);
  g.current == null && (g.current = m), Y(() => {
    g.current.adapter = r, g.current.paramConfigMap = l, g.current.options = o;
  }, [r, l, o]);
  const [E] = re(() => (b, y) => {
    const { adapter: w, paramConfigMap: R, options: I } = g.current;
    y == null && (y = I.updateType), Sd(
      {
        changes: b,
        updateType: y,
        currentSearchString: w.location.search,
        paramConfigMap: R,
        options: I,
        adapter: w
      },
      { immediate: !I.enableBatching }
    );
  });
  return [c, E];
}
var Rd = Ad;
function Nd(t, e) {
  let r, n;
  return t === void 0 ? (r = {}, n = e) : Array.isArray(t) ? (r = Object.fromEntries(
    t.map((s) => [s, "inherit"])
  ), n = e) : (r = t, n = e), { paramConfigMap: r, options: n };
}
const wa = (t, e, r) => {
  const n = Se(
    () => ({ [t]: e ?? "inherit" }),
    [t, e]
  ), [s, a] = Rd(n, r), i = s[t], o = xo(
    (l, f) => a(typeof l == "function" ? (c) => {
      const d = l(c[t]);
      return { [t]: d };
    } : { [t]: l }, f),
    [t, a]
  );
  return [i, o];
}, Od = ({
  dataConfiguration: t,
  search: e,
  documentId: r
}) => {
  const n = Be(), s = new URLSearchParams(n.search), [a, i] = wa("search", Ir), [o, l] = wa(
    "document_id",
    Ir
  );
  return Y(() => {
    if (e != null && e.length) {
      i(e, "pushIn"), l(void 0, "replaceIn");
      return;
    }
  }, [e]), Y(() => {
    if (r != null && r.length) {
      l(r, "pushIn"), i(void 0, "replaceIn");
      return;
    }
  }, [r]), {
    dataConfiguration: rd(
      t,
      s
    ),
    search: a ?? "",
    documentId: o ?? ""
  };
};
var jn = { exports: {} }, Vt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xa;
function Pd() {
  if (xa)
    return Vt;
  xa = 1;
  var t = Ua, e = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, s = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(o, l, f) {
    var c, d = {}, m = null, g = null;
    f !== void 0 && (m = "" + f), l.key !== void 0 && (m = "" + l.key), l.ref !== void 0 && (g = l.ref);
    for (c in l)
      n.call(l, c) && !a.hasOwnProperty(c) && (d[c] = l[c]);
    if (o && o.defaultProps)
      for (c in l = o.defaultProps, l)
        d[c] === void 0 && (d[c] = l[c]);
    return { $$typeof: e, type: o, key: m, ref: g, props: d, _owner: s.current };
  }
  return Vt.Fragment = r, Vt.jsx = i, Vt.jsxs = i, Vt;
}
var jt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ea;
function Td() {
  return Ea || (Ea = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Ua, e = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), o = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), E = Symbol.iterator, S = "@@iterator";
    function b(u) {
      if (u === null || typeof u != "object")
        return null;
      var x = E && u[E] || u[S];
      return typeof x == "function" ? x : null;
    }
    var y = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(u) {
      {
        for (var x = arguments.length, A = new Array(x > 1 ? x - 1 : 0), D = 1; D < x; D++)
          A[D - 1] = arguments[D];
        R("error", u, A);
      }
    }
    function R(u, x, A) {
      {
        var D = y.ReactDebugCurrentFrame, V = D.getStackAddendum();
        V !== "" && (x += "%s", A = A.concat([V]));
        var B = A.map(function(F) {
          return String(F);
        });
        B.unshift("Warning: " + x), Function.prototype.apply.call(console[u], console, B);
      }
    }
    var I = !1, N = !1, U = !1, j = !1, M = !1, q;
    q = Symbol.for("react.module.reference");
    function Re(u) {
      return !!(typeof u == "string" || typeof u == "function" || u === n || u === a || M || u === s || u === f || u === c || j || u === g || I || N || U || typeof u == "object" && u !== null && (u.$$typeof === m || u.$$typeof === d || u.$$typeof === i || u.$$typeof === o || u.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      u.$$typeof === q || u.getModuleId !== void 0));
    }
    function qe(u, x, A) {
      var D = u.displayName;
      if (D)
        return D;
      var V = x.displayName || x.name || "";
      return V !== "" ? A + "(" + V + ")" : A;
    }
    function J(u) {
      return u.displayName || "Context";
    }
    function Z(u) {
      if (u == null)
        return null;
      if (typeof u.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof u == "function")
        return u.displayName || u.name || null;
      if (typeof u == "string")
        return u;
      switch (u) {
        case n:
          return "Fragment";
        case r:
          return "Portal";
        case a:
          return "Profiler";
        case s:
          return "StrictMode";
        case f:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof u == "object")
        switch (u.$$typeof) {
          case o:
            var x = u;
            return J(x) + ".Consumer";
          case i:
            var A = u;
            return J(A._context) + ".Provider";
          case l:
            return qe(u, u.render, "ForwardRef");
          case d:
            var D = u.displayName || null;
            return D !== null ? D : Z(u.type) || "Memo";
          case m: {
            var V = u, B = V._payload, F = V._init;
            try {
              return Z(F(B));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ee = Object.assign, Qe = 0, rt, as, is, os, ls, cs, us;
    function ds() {
    }
    ds.__reactDisabledLog = !0;
    function Yi() {
      {
        if (Qe === 0) {
          rt = console.log, as = console.info, is = console.warn, os = console.error, ls = console.group, cs = console.groupCollapsed, us = console.groupEnd;
          var u = {
            configurable: !0,
            enumerable: !0,
            value: ds,
            writable: !0
          };
          Object.defineProperties(console, {
            info: u,
            log: u,
            warn: u,
            error: u,
            group: u,
            groupCollapsed: u,
            groupEnd: u
          });
        }
        Qe++;
      }
    }
    function Xi() {
      {
        if (Qe--, Qe === 0) {
          var u = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ee({}, u, {
              value: rt
            }),
            info: ee({}, u, {
              value: as
            }),
            warn: ee({}, u, {
              value: is
            }),
            error: ee({}, u, {
              value: os
            }),
            group: ee({}, u, {
              value: ls
            }),
            groupCollapsed: ee({}, u, {
              value: cs
            }),
            groupEnd: ee({}, u, {
              value: us
            })
          });
        }
        Qe < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Qr = y.ReactCurrentDispatcher, _r;
    function hr(u, x, A) {
      {
        if (_r === void 0)
          try {
            throw Error();
          } catch (V) {
            var D = V.stack.trim().match(/\n( *(at )?)/);
            _r = D && D[1] || "";
          }
        return `
` + _r + u;
      }
    }
    var Kr = !1, pr;
    {
      var Ji = typeof WeakMap == "function" ? WeakMap : Map;
      pr = new Ji();
    }
    function fs(u, x) {
      if (!u || Kr)
        return "";
      {
        var A = pr.get(u);
        if (A !== void 0)
          return A;
      }
      var D;
      Kr = !0;
      var V = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var B;
      B = Qr.current, Qr.current = null, Yi();
      try {
        if (x) {
          var F = function() {
            throw Error();
          };
          if (Object.defineProperty(F.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(F, []);
            } catch (xe) {
              D = xe;
            }
            Reflect.construct(u, [], F);
          } else {
            try {
              F.call();
            } catch (xe) {
              D = xe;
            }
            u.call(F.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (xe) {
            D = xe;
          }
          u();
        }
      } catch (xe) {
        if (xe && D && typeof xe.stack == "string") {
          for (var L = xe.stack.split(`
`), te = D.stack.split(`
`), _ = L.length - 1, K = te.length - 1; _ >= 1 && K >= 0 && L[_] !== te[K]; )
            K--;
          for (; _ >= 1 && K >= 0; _--, K--)
            if (L[_] !== te[K]) {
              if (_ !== 1 || K !== 1)
                do
                  if (_--, K--, K < 0 || L[_] !== te[K]) {
                    var le = `
` + L[_].replace(" at new ", " at ");
                    return u.displayName && le.includes("<anonymous>") && (le = le.replace("<anonymous>", u.displayName)), typeof u == "function" && pr.set(u, le), le;
                  }
                while (_ >= 1 && K >= 0);
              break;
            }
        }
      } finally {
        Kr = !1, Qr.current = B, Xi(), Error.prepareStackTrace = V;
      }
      var st = u ? u.displayName || u.name : "", As = st ? hr(st) : "";
      return typeof u == "function" && pr.set(u, As), As;
    }
    function Zi(u, x, A) {
      return fs(u, !1);
    }
    function $i(u) {
      var x = u.prototype;
      return !!(x && x.isReactComponent);
    }
    function mr(u, x, A) {
      if (u == null)
        return "";
      if (typeof u == "function")
        return fs(u, $i(u));
      if (typeof u == "string")
        return hr(u);
      switch (u) {
        case f:
          return hr("Suspense");
        case c:
          return hr("SuspenseList");
      }
      if (typeof u == "object")
        switch (u.$$typeof) {
          case l:
            return Zi(u.render);
          case d:
            return mr(u.type, x, A);
          case m: {
            var D = u, V = D._payload, B = D._init;
            try {
              return mr(B(V), x, A);
            } catch {
            }
          }
        }
      return "";
    }
    var vr = Object.prototype.hasOwnProperty, hs = {}, ps = y.ReactDebugCurrentFrame;
    function gr(u) {
      if (u) {
        var x = u._owner, A = mr(u.type, u._source, x ? x.type : null);
        ps.setExtraStackFrame(A);
      } else
        ps.setExtraStackFrame(null);
    }
    function eo(u, x, A, D, V) {
      {
        var B = Function.call.bind(vr);
        for (var F in u)
          if (B(u, F)) {
            var L = void 0;
            try {
              if (typeof u[F] != "function") {
                var te = Error((D || "React class") + ": " + A + " type `" + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof u[F] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw te.name = "Invariant Violation", te;
              }
              L = u[F](x, F, D, A, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (_) {
              L = _;
            }
            L && !(L instanceof Error) && (gr(V), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", D || "React class", A, F, typeof L), gr(null)), L instanceof Error && !(L.message in hs) && (hs[L.message] = !0, gr(V), w("Failed %s type: %s", A, L.message), gr(null));
          }
      }
    }
    var to = Array.isArray;
    function Wr(u) {
      return to(u);
    }
    function ro(u) {
      {
        var x = typeof Symbol == "function" && Symbol.toStringTag, A = x && u[Symbol.toStringTag] || u.constructor.name || "Object";
        return A;
      }
    }
    function no(u) {
      try {
        return ms(u), !1;
      } catch {
        return !0;
      }
    }
    function ms(u) {
      return "" + u;
    }
    function vs(u) {
      if (no(u))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ro(u)), ms(u);
    }
    var Mt = y.ReactCurrentOwner, so = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, gs, ys, zr;
    zr = {};
    function ao(u) {
      if (vr.call(u, "ref")) {
        var x = Object.getOwnPropertyDescriptor(u, "ref").get;
        if (x && x.isReactWarning)
          return !1;
      }
      return u.ref !== void 0;
    }
    function io(u) {
      if (vr.call(u, "key")) {
        var x = Object.getOwnPropertyDescriptor(u, "key").get;
        if (x && x.isReactWarning)
          return !1;
      }
      return u.key !== void 0;
    }
    function oo(u, x) {
      if (typeof u.ref == "string" && Mt.current && x && Mt.current.stateNode !== x) {
        var A = Z(Mt.current.type);
        zr[A] || (w('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Z(Mt.current.type), u.ref), zr[A] = !0);
      }
    }
    function lo(u, x) {
      {
        var A = function() {
          gs || (gs = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", x));
        };
        A.isReactWarning = !0, Object.defineProperty(u, "key", {
          get: A,
          configurable: !0
        });
      }
    }
    function co(u, x) {
      {
        var A = function() {
          ys || (ys = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", x));
        };
        A.isReactWarning = !0, Object.defineProperty(u, "ref", {
          get: A,
          configurable: !0
        });
      }
    }
    var uo = function(u, x, A, D, V, B, F) {
      var L = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: u,
        key: x,
        ref: A,
        props: F,
        // Record the component responsible for creating this element.
        _owner: B
      };
      return L._store = {}, Object.defineProperty(L._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(L, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: D
      }), Object.defineProperty(L, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: V
      }), Object.freeze && (Object.freeze(L.props), Object.freeze(L)), L;
    };
    function fo(u, x, A, D, V) {
      {
        var B, F = {}, L = null, te = null;
        A !== void 0 && (vs(A), L = "" + A), io(x) && (vs(x.key), L = "" + x.key), ao(x) && (te = x.ref, oo(x, V));
        for (B in x)
          vr.call(x, B) && !so.hasOwnProperty(B) && (F[B] = x[B]);
        if (u && u.defaultProps) {
          var _ = u.defaultProps;
          for (B in _)
            F[B] === void 0 && (F[B] = _[B]);
        }
        if (L || te) {
          var K = typeof u == "function" ? u.displayName || u.name || "Unknown" : u;
          L && lo(F, K), te && co(F, K);
        }
        return uo(u, L, te, V, D, Mt.current, F);
      }
    }
    var Gr = y.ReactCurrentOwner, bs = y.ReactDebugCurrentFrame;
    function nt(u) {
      if (u) {
        var x = u._owner, A = mr(u.type, u._source, x ? x.type : null);
        bs.setExtraStackFrame(A);
      } else
        bs.setExtraStackFrame(null);
    }
    var Hr;
    Hr = !1;
    function Yr(u) {
      return typeof u == "object" && u !== null && u.$$typeof === e;
    }
    function ws() {
      {
        if (Gr.current) {
          var u = Z(Gr.current.type);
          if (u)
            return `

Check the render method of \`` + u + "`.";
        }
        return "";
      }
    }
    function ho(u) {
      {
        if (u !== void 0) {
          var x = u.fileName.replace(/^.*[\\\/]/, ""), A = u.lineNumber;
          return `

Check your code at ` + x + ":" + A + ".";
        }
        return "";
      }
    }
    var xs = {};
    function po(u) {
      {
        var x = ws();
        if (!x) {
          var A = typeof u == "string" ? u : u.displayName || u.name;
          A && (x = `

Check the top-level render call using <` + A + ">.");
        }
        return x;
      }
    }
    function Es(u, x) {
      {
        if (!u._store || u._store.validated || u.key != null)
          return;
        u._store.validated = !0;
        var A = po(x);
        if (xs[A])
          return;
        xs[A] = !0;
        var D = "";
        u && u._owner && u._owner !== Gr.current && (D = " It was passed a child from " + Z(u._owner.type) + "."), nt(u), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', A, D), nt(null);
      }
    }
    function Cs(u, x) {
      {
        if (typeof u != "object")
          return;
        if (Wr(u))
          for (var A = 0; A < u.length; A++) {
            var D = u[A];
            Yr(D) && Es(D, x);
          }
        else if (Yr(u))
          u._store && (u._store.validated = !0);
        else if (u) {
          var V = b(u);
          if (typeof V == "function" && V !== u.entries)
            for (var B = V.call(u), F; !(F = B.next()).done; )
              Yr(F.value) && Es(F.value, x);
        }
      }
    }
    function mo(u) {
      {
        var x = u.type;
        if (x == null || typeof x == "string")
          return;
        var A;
        if (typeof x == "function")
          A = x.propTypes;
        else if (typeof x == "object" && (x.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        x.$$typeof === d))
          A = x.propTypes;
        else
          return;
        if (A) {
          var D = Z(x);
          eo(A, u.props, "prop", D, u);
        } else if (x.PropTypes !== void 0 && !Hr) {
          Hr = !0;
          var V = Z(x);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", V || "Unknown");
        }
        typeof x.getDefaultProps == "function" && !x.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function vo(u) {
      {
        for (var x = Object.keys(u.props), A = 0; A < x.length; A++) {
          var D = x[A];
          if (D !== "children" && D !== "key") {
            nt(u), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", D), nt(null);
            break;
          }
        }
        u.ref !== null && (nt(u), w("Invalid attribute `ref` supplied to `React.Fragment`."), nt(null));
      }
    }
    function Ss(u, x, A, D, V, B) {
      {
        var F = Re(u);
        if (!F) {
          var L = "";
          (u === void 0 || typeof u == "object" && u !== null && Object.keys(u).length === 0) && (L += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var te = ho(V);
          te ? L += te : L += ws();
          var _;
          u === null ? _ = "null" : Wr(u) ? _ = "array" : u !== void 0 && u.$$typeof === e ? (_ = "<" + (Z(u.type) || "Unknown") + " />", L = " Did you accidentally export a JSX literal instead of a component?") : _ = typeof u, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", _, L);
        }
        var K = fo(u, x, A, V, B);
        if (K == null)
          return K;
        if (F) {
          var le = x.children;
          if (le !== void 0)
            if (D)
              if (Wr(le)) {
                for (var st = 0; st < le.length; st++)
                  Cs(le[st], u);
                Object.freeze && Object.freeze(le);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Cs(le, u);
        }
        return u === n ? vo(K) : mo(K), K;
      }
    }
    function go(u, x, A) {
      return Ss(u, x, A, !0);
    }
    function yo(u, x, A) {
      return Ss(u, x, A, !1);
    }
    var bo = yo, wo = go;
    jt.Fragment = n, jt.jsx = bo, jt.jsxs = wo;
  }()), jt;
}
process.env.NODE_ENV === "production" ? jn.exports = Pd() : jn.exports = Td();
var ns = jn.exports;
const p = ns.jsx, P = ns.jsxs, et = ns.Fragment, Fi = Eo({}), Ca = 20, Sa = 0, Dd = ({
  children: t,
  configuration: e
}) => {
  const r = Bc({
    dataConfiguration: e
  }), n = Po({
    filterType: e.filter.type,
    getAvailableFilters: r.getFilters,
    getPopularFilters: e.filter.getPopularFilters
  }), [s, a] = re(), [i, o] = re(), {
    dataConfiguration: l,
    search: f,
    documentId: c
  } = Od({
    dataConfiguration: e,
    search: s,
    documentId: i
  }), [d, m] = re(c ?? ""), [g, E] = re(f), [S, b] = re(!1), y = ia.useSearchByConfiguration(l.collectionIds.map((U) => ({
    apiKey: l.apiKey,
    customerId: l.accountId,
    customerNamespace: U
  })), {
    query: f.length > 0 ? f : l.defaultSearchQuery,
    accuracy: l.defaultAccuracy,
    filters: n.getFilterString(),
    pageNumber: l.pageNumber || Sa,
    pageSize: l.pageSize || Ca,
    ...l.shingling
  }, {
    getItemsByIds: r.getItemsByIds
  }), w = ia.useMoreLikeThisByConfiguration(l.collectionIds.map((U) => ({
    apiKey: l.apiKey,
    customerId: l.accountId,
    customerNamespace: U
  })), {
    documentId: d,
    accuracy: l.defaultAccuracy,
    pageNumber: l.pageNumber || Sa,
    pageSize: l.pageSize || Ca
  }, {
    getItemsByIds: r.getItemsByIds
  }), R = Se(() => {
    let U = y;
    return d && (U = w), U.map((j, M) => {
      const {
        data: q,
        isError: Re,
        isFetching: qe,
        isSuccess: J
      } = j;
      return {
        items: (q == null ? void 0 : q[1]) ?? [],
        executionTime: (q == null ? void 0 : q[0]) ?? 0,
        isError: Re,
        isLoading: qe,
        isSuccess: J,
        collectionId: e.collectionIds[M]
        // as per Tanstack useQueries configuration
      };
    });
  }, [y, w]), I = () => {
    for (const U of y)
      U.refetch();
  }, N = () => {
    for (const U of w)
      U.refetch();
  };
  return Y(() => {
    m(""), I();
  }, [n.activeFilters]), Y(() => {
    f.length > 0 ? (E(f), I()) : (c.length === 0 && E(l.defaultSearchQuery), I());
  }, [f]), Y(() => {
    m(c ?? ""), c.length > 0 ? (N(), E(c)) : (f.length > 0 && E(f), I());
  }, [c]), /* @__PURE__ */ p(Fi.Provider, {
    value: {
      filterActions: n,
      searchResults: R,
      demoActions: {
        performSearch: () => {
          m(""), a(g);
        },
        performMoreLikeThis: (U) => {
          o(U), m(U), E(U);
        },
        setQuery: E,
        setIsDeveloperViewToggled: b
      },
      variables: {
        query: g,
        isDeveloperViewToggled: S,
        moreLikeDocumentId: d
      },
      dataConfiguration: e
    },
    children: t
  });
};
function Mi() {
  return gn(Fi);
}
const Id = ({
  children: t
}) => {
  var e;
  const { navigator: r } = gn(he), n = Si(), s = (e = gn(Ft)) == null ? void 0 : e.router, a = Be();
  return t({
    replace(o) {
      n(o.search || "?", {
        replace: !0,
        state: o.state
      });
    },
    push(o) {
      n(o.search || "?", {
        replace: !1,
        state: o.state
      });
    },
    get location() {
      var o, l, f;
      return (f = (l = (o = s == null ? void 0 : s.state) == null ? void 0 : o.location) != null ? l : r == null ? void 0 : r.location) != null ? f : a;
    }
  });
}, Vi = ({
  content: t,
  children: e,
  onHover: r
}) => {
  var f;
  const [n, s] = re(!1), [a, i] = re([0, 0]), o = Lr(null);
  Y(() => {
    o != null && o.current && i(l(o));
  }, [(f = o.current) == null ? void 0 : f.clientHeight, n]);
  const l = (c) => {
    var d;
    if (c != null && c.current) {
      let [m, g] = [0, 0];
      return c.current.getBoundingClientRect().right + Math.abs(a[0]) > window.innerWidth && (m = -c.current.clientWidth), g = -(((d = c == null ? void 0 : c.current) == null ? void 0 : d.clientHeight) + 5), [m, g];
    }
    return a;
  };
  return Y(() => {
    o.current && (o.current.style.transform = `translate(${a[0]}px, ${a[1]}px)`);
  }, [a]), Y(() => {
    if (!o.current)
      return;
    const c = new ResizeObserver(() => {
      i(l(o));
    });
    return c.observe(o.current), () => c.disconnect();
  }, [o.current]), /* @__PURE__ */ P("div", {
    onMouseEnter: () => {
      s(!0), r && r();
    },
    onMouseLeave: () => {
      s(!1);
    },
    children: [n && /* @__PURE__ */ p("span", {
      ref: o,
      className: "absolute bg-white m-4 p-3 rounded-xl shadow-lg z-10 w-[320px] h-[200px] overflow-y-scroll",
      children: t
    }), /* @__PURE__ */ p("span", {
      className: "hover:cursor-pointer",
      children: e
    })]
  });
};
function kd({
  title: t,
  titleId: e,
  ...r
}, n) {
  return /* @__PURE__ */ v.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: n,
    "aria-labelledby": e
  }, r), t ? /* @__PURE__ */ v.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ v.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
  }));
}
const Ld = v.forwardRef(kd), Ud = Ld;
function Fd({
  title: t,
  titleId: e,
  ...r
}, n) {
  return /* @__PURE__ */ v.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: n,
    "aria-labelledby": e
  }, r), t ? /* @__PURE__ */ v.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ v.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4.5 15.75l7.5-7.5 7.5 7.5"
  }));
}
const Md = v.forwardRef(Fd), Vd = Md;
function jd({
  title: t,
  titleId: e,
  ...r
}, n) {
  return /* @__PURE__ */ v.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: n,
    "aria-labelledby": e
  }, r), t ? /* @__PURE__ */ v.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ v.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
  }));
}
const Bd = v.forwardRef(jd), ji = Bd;
function qd({
  title: t,
  titleId: e,
  ...r
}, n) {
  return /* @__PURE__ */ v.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: n,
    "aria-labelledby": e
  }, r), t ? /* @__PURE__ */ v.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ v.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
  }));
}
const Qd = v.forwardRef(qd), _d = Qd;
function Kd({
  title: t,
  titleId: e,
  ...r
}, n) {
  return /* @__PURE__ */ v.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: n,
    "aria-labelledby": e
  }, r), t ? /* @__PURE__ */ v.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ v.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
  }));
}
const Wd = v.forwardRef(Kd), Bi = Wd;
function zd({
  title: t,
  titleId: e,
  ...r
}, n) {
  return /* @__PURE__ */ v.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: n,
    "aria-labelledby": e
  }, r), t ? /* @__PURE__ */ v.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ v.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
  }));
}
const Gd = v.forwardRef(zd), qi = Gd;
function Hd({
  title: t,
  titleId: e,
  ...r
}, n) {
  return /* @__PURE__ */ v.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: n,
    "aria-labelledby": e
  }, r), t ? /* @__PURE__ */ v.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ v.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
  }));
}
const Yd = v.forwardRef(Hd), Xd = Yd;
function Jd({
  title: t,
  titleId: e,
  ...r
}, n) {
  return /* @__PURE__ */ v.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: n,
    "aria-labelledby": e
  }, r), t ? /* @__PURE__ */ v.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ v.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
  }));
}
const Zd = v.forwardRef(Jd), $d = Zd;
function ef({
  title: t,
  titleId: e,
  ...r
}, n) {
  return /* @__PURE__ */ v.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: n,
    "aria-labelledby": e
  }, r), t ? /* @__PURE__ */ v.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ v.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18L18 6M6 6l12 12"
  }));
}
const tf = v.forwardRef(ef), ss = tf, Qi = (t) => {
  const e = t.charAt(0) === "#" ? t.slice(1, 7) : t, r = Number.parseInt(e.slice(0, 2), 16), n = Number.parseInt(e.slice(2, 4), 16), s = Number.parseInt(e.slice(4, 6), 16);
  return (r + n + s) / (255 * 3) >= 0.5 ? "black" : "white";
}, rf = ({
  text: t
}) => /* @__PURE__ */ P("div", {
  className: "flex flex-col gap-2 p-2 min-w-sm",
  children: [/* @__PURE__ */ p("h1", {
    className: "font-semibold",
    children: "Research Indexed Text"
  }), t && /* @__PURE__ */ p("p", {
    className: "w-full",
    children: t
  })]
}), nf = ({
  id: t,
  imageSrc: e,
  searchAccuracy: r,
  title: n,
  subtitle: s,
  description: a,
  bottomRightLabel: i,
  primaryColor: o,
  secondaryColor: l,
  isDeveloperView: f,
  redirectUrl: c,
  infoContent: d,
  onMoreLikeThisClicked: m
}) => /* @__PURE__ */ P("article", {
  "data-testid": `product-card-${t}`,
  className: "flex flex-col gap-1 h-fit w-[300px] 3xl:w-[340px] box-border-2 shadow-md rounded-xl",
  children: [/* @__PURE__ */ p("a", {
    href: c,
    target: c ? "_blank" : "",
    rel: "external noreferrer",
    className: "relative cursor-pointer",
    children: /* @__PURE__ */ P("div", {
      className: "flex w-full justify-center bg-gray-50 rounded-lg",
      children: [/* @__PURE__ */ p("img", {
        src: e,
        alt: "product",
        "data-testid": "product-image",
        className: "relative rounded-lg h-[320px] w-full object-cover"
      }), f && /* @__PURE__ */ P("span", {
        "data-testid": "product-card-search-accuracy",
        style: {
          backgroundColor: o
        },
        className: "flex px-3.5 py-1.5 rounded-full gap-2 items-center justify-between top-3 left-3 absolute",
        children: [/* @__PURE__ */ p(ji, {
          className: "w-4 h-4"
        }), /* @__PURE__ */ p("p", {
          className: "text-white text-sm font-medium ",
          children: r == null ? void 0 : r.toFixed(4)
        })]
      }), i && /* @__PURE__ */ p("p", {
        className: "absolute bottom-3 right-3 px-2 py-0.5 text-sm bg-gray-600 rounded-lg text-white font-semibold",
        children: i
      })]
    })
  }), s && /* @__PURE__ */ p("span", {
    className: "px-4 pt-2",
    children: /* @__PURE__ */ p("p", {
      className: "text-gray-400 text-sm",
      children: s
    })
  }), /* @__PURE__ */ P("div", {
    className: "flex flex-col gap-4 px-4 pb-4 pt-2",
    children: [/* @__PURE__ */ P("section", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ p("span", {
        className: "h-6 line-clamp-1 font-bold text-base",
        children: n
      }), f && /* @__PURE__ */ p(Vi, {
        content: /* @__PURE__ */ p(rf, {
          text: d
        }),
        children: /* @__PURE__ */ p(Bi, {
          className: "h-5 w-5",
          color: o
        })
      })]
    }), /* @__PURE__ */ p("span", {
      className: "font-normal text-gray-500 line-clamp-3 min-h-[70px]",
      children: /* @__PURE__ */ p("p", {
        children: a || "Unavailable"
      })
    }), /* @__PURE__ */ p("span", {
      className: "flex w-full justify-end items-center gap-4",
      children: /* @__PURE__ */ p("button", {
        style: {
          backgroundColor: l,
          color: Qi(l)
        },
        onClick: m,
        className: 'flex shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition-width duration-200 w-8 hover:w-36 h-9 hover:after:content-["_More_Like_This"] hover:after:animate-fade-in-fast',
        children: /* @__PURE__ */ p("p", {
          className: "pr-2",
          children: "+"
        })
      })
    })]
  })]
}), sf = () => /* @__PURE__ */ P("svg", {
  width: "67",
  height: "67",
  viewBox: "0 0 67 67",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/* @__PURE__ */ p("path", {
    d: "M43.2708 39.0833H41.0654L40.2837 38.3296C43.1141 35.0466 44.6697 30.8554 44.6667 26.5208C44.6667 21.7083 42.7549 17.0928 39.3519 13.6898C35.9489 10.2868 31.3334 8.375 26.5208 8.375C16.9733 8.375 9.15666 15.745 8.45874 25.125H14.0979C14.7958 18.8437 20.0442 13.9583 26.5208 13.9583C33.4721 13.9583 39.0833 19.5696 39.0833 26.5208C39.0833 33.4721 33.4721 39.0833 26.5208 39.0833C26.0462 39.0833 25.5996 38.9996 25.125 38.9437V44.5829C25.5996 44.6387 26.0462 44.6667 26.5208 44.6667C31.0154 44.6667 35.1471 43.0196 38.3296 40.2837L39.0833 41.0654V43.2708L53.0417 57.2012L57.2012 53.0417L43.2708 39.0833Z",
    fill: "#333333"
  }), /* @__PURE__ */ p("path", {
    d: "M18.062 30.2058L11.1666 37.1012L4.27115 30.2058L2.28906 32.1879L9.18448 39.0833L2.28906 45.9787L4.27115 47.9608L11.1666 41.0654L18.062 47.9608L20.0441 45.9787L13.1486 39.0833L20.0441 32.1879L18.062 30.2058Z",
    fill: "#333333"
  })]
});
var _i = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(t) {
  (function() {
    var e = {}.hasOwnProperty;
    function r() {
      for (var n = [], s = 0; s < arguments.length; s++) {
        var a = arguments[s];
        if (a) {
          var i = typeof a;
          if (i === "string" || i === "number")
            n.push(a);
          else if (Array.isArray(a)) {
            if (a.length) {
              var o = r.apply(null, a);
              o && n.push(o);
            }
          } else if (i === "object") {
            if (a.toString !== Object.prototype.toString && !a.toString.toString().includes("[native code]")) {
              n.push(a.toString());
              continue;
            }
            for (var l in a)
              e.call(a, l) && a[l] && n.push(l);
          }
        }
      }
      return n.join(" ");
    }
    t.exports ? (r.default = r, t.exports = r) : window.classNames = r;
  })();
})(_i);
var af = _i.exports;
const Ve = /* @__PURE__ */ za(af), Ki = ({
  className: t = "h-6 w-6 text-white",
  color: e = "white"
}) => /* @__PURE__ */ p("svg", {
  className: Ve("animate-spin", t),
  xmlns: "http://www.w3.org/2000/svg",
  width: "46",
  height: "46",
  viewBox: "0 0 46 46",
  fill: "none",
  "data-testid": "spinner-icon",
  children: /* @__PURE__ */ p("path", {
    d: "M43.8333 22.9999C43.8333 11.4937 34.5062 2.16658 22.9999 2.16658C11.4937 2.16658 2.16658 11.4937 2.16658 22.9999C2.16658 34.5062 11.4937 43.8332 22.9999 43.8333",
    stroke: e,
    strokeWidth: "4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })
}), Wi = ({
  isLoading: t,
  isError: e,
  isSuccess: r,
  isNoResults: n,
  children: s,
  loadingMessage: a = "Loading",
  loadingSpinnerColor: i = "black"
}) => /* @__PURE__ */ P(et, {
  children: [t && /* @__PURE__ */ P("div", {
    className: "flex flex-col w-full items-center gap-4 my-10",
    children: [/* @__PURE__ */ p(Ki, {
      className: "w-12 h-12",
      color: i
    }), /* @__PURE__ */ p("p", {
      className: "text-2xl font-bold",
      children: `${a}...`
    }), /* @__PURE__ */ p("p", {
      children: "Whipping up the perfect data just for you — stay tuned!"
    })]
  }), n && /* @__PURE__ */ P("div", {
    className: "flex flex-col w-full items-center gap-4 my-10",
    children: [/* @__PURE__ */ p(sf, {}), /* @__PURE__ */ p("p", {
      className: "text-2xl font-bold",
      children: "No results found."
    }), /* @__PURE__ */ p("p", {
      children: "We couldn’t found find what you searched for. Try searching again."
    })]
  }), r && !e && !t && !n && s]
});
function zi({
  text: t,
  isEnabled: e,
  setIsEnabled: r,
  checkedColor: n = "#16a34a"
}) {
  return /* @__PURE__ */ p("div", {
    className: "flex flex-col items-center justify-center overflow-hidden",
    children: /* @__PURE__ */ P("label", {
      className: "inline-flex gap-4 relative items-center mr-5",
      children: [/* @__PURE__ */ p("input", {
        type: "checkbox",
        className: "sr-only peer cursor-pointer",
        checked: e,
        readOnly: !0
      }), /* @__PURE__ */ p("button", {
        onClick: () => {
          r(!e);
        },
        style: {
          backgroundColor: e ? n : ""
        },
        "data-testid": "toggle-button",
        className: "w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
      }), /* @__PURE__ */ p("span", {
        className: "text-sm font-medium text-gray-500 uppercase whitespace-nowrap",
        children: t
      })]
    })
  });
}
const of = () => {
  const [t, e] = re(!1);
  function r() {
    e(!t);
  }
  return [t, r];
}, Ht = ({
  title: t,
  isSelected: e,
  isCancelVisible: r,
  selectedColor: n = "black",
  textColor: s = "white",
  onClick: a,
  onCancel: i
}) => /* @__PURE__ */ p("button", {
  type: "button",
  className: Ve("px-3 py-2 border-[1px] rounded-xl", {
    "hover:bg-gray-50 border-gray-800": !e
  }),
  style: e ? {
    backgroundColor: n,
    color: s
  } : {},
  onClick: () => a && a(),
  children: /* @__PURE__ */ P("span", {
    className: "flex w-full justify-between items-center gap-3",
    children: [/* @__PURE__ */ p("p", {
      className: "flex w-full text-sm font-semibold uppercase whitespace-nowrap",
      children: t
    }), r && // This is intentional.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ p("span", {
      onClick: (o) => {
        o.preventDefault(), i && i();
      },
      className: "hover:pointer-cursor",
      "data-testid": `chip-close-${t}`,
      children: /* @__PURE__ */ p(ss, {
        className: `w-4 fill-${s}`
      })
    })]
  })
}), lf = ({
  isVisible: t,
  children: e,
  className: r,
  onCloseModal: n
}) => {
  const s = Lr(null), a = (i) => {
    t && s.current && !s.current.contains(i.target) && n();
  };
  return Y(() => (document.addEventListener("mousedown", a), () => {
    document.removeEventListener("mousedown", a);
  }), [t]), t ? Ao(/* @__PURE__ */ p("div", {
    "data-testid": "modal",
    className: "fixed top-0 left-0 w-full h-full z-10 bg-black bg-opacity-30 overflow-y-hidden",
    children: /* @__PURE__ */ p("span", {
      className: "flex w-full h-full justify-center items-center ",
      children: /* @__PURE__ */ p("section", {
        ref: s,
        className: r,
        children: e
      })
    })
  }), document.body) : /* @__PURE__ */ p(et, {});
}, cf = ({
  isModalVisible: t,
  toggleModal: e,
  useFilters: r
}) => {
  var c;
  const {
    activeFilters: n,
    setActiveFilters: s,
    availableFilters: a
  } = r, [i, o] = re(n);
  Y(() => {
    t && o(n);
  }, [n, t]);
  const l = Se(() => a.reduce((d, m) => (d[m.categorySlug] || (d[m.categorySlug] = []), d[m.categorySlug].push(m), d), {}), [a]), f = () => {
    e();
  };
  return /* @__PURE__ */ p(lf, {
    isVisible: t,
    className: "flex flex-col w-1/2 h-2/3 bg-white rounded-lg py-6 gap-5",
    onCloseModal: f,
    children: /* @__PURE__ */ P(et, {
      children: [/* @__PURE__ */ P("header", {
        className: "flex w-full px-6 justify-between",
        children: [/* @__PURE__ */ p("span", {
          className: "flex justify-center w-full",
          children: /* @__PURE__ */ p("h1", {
            className: "uppercase tracking-widest text-lg",
            children: "Recipe Filter"
          })
        }), /* @__PURE__ */ p("button", {
          onClick: () => {
            f();
          },
          className: "flex justify-end",
          children: /* @__PURE__ */ p(ss, {
            className: "w-5"
          })
        })]
      }), /* @__PURE__ */ p("hr", {}), /* @__PURE__ */ p("div", {
        className: "flex flex-col gap-5 overflow-y-scroll",
        children: (c = Object.entries(l)) == null ? void 0 : c.map((d) => /* @__PURE__ */ p(uf, {
          isFilterSelected: (m) => i.includes(m),
          onFilterClick: (m) => {
            i.includes(m) ? o(i.filter((g) => g.slug !== m.slug)) : o([...i, m]);
          },
          filterSection: d
        }, `${d[0]}`))
      }), /* @__PURE__ */ P("section", {
        className: "flex w-full justify-between px-6 py-2",
        children: [/* @__PURE__ */ p("button", {
          className: "underline text-gray-500",
          onClick: () => {
            o([]);
          },
          children: "Clear all"
        }), /* @__PURE__ */ p("button", {
          onClick: () => {
            s(i), f();
          },
          className: "px-6 py-2 text-white font-semibold bg-green-500 rounded-2xl",
          children: "Apply filters"
        })]
      })]
    })
  });
}, uf = ({
  filterSection: t,
  isFilterSelected: e,
  onFilterClick: r
}) => {
  const [n, s] = re(t[1].length > 10 ? !1 : void 0), a = () => {
    s(!n);
  };
  return /* @__PURE__ */ P(et, {
    children: [/* @__PURE__ */ P("section", {
      className: "flex flex-col gap-3 px-6",
      children: [/* @__PURE__ */ p("h1", {
        className: "text-lg font-semibold",
        children: t[1][0].categoryName
      }), /* @__PURE__ */ p("span", {
        className: "flex flex-wrap gap-4",
        children: (n ? t[1] : t[1].slice(0, 8)).map((i) => /* @__PURE__ */ p(Ht, {
          title: i.name,
          isSelected: e(i),
          selectedColor: "black",
          onClick: () => {
            r(i);
          }
        }, `${i.categorySlug}-${i.name}`))
      }), n !== void 0 && /* @__PURE__ */ p("span", {
        className: "flex justify-start pt-2",
        children: /* @__PURE__ */ P("button", {
          className: "underline font-bold",
          onClick: () => {
            a();
          },
          children: ["Show ", n ? "Less" : "More"]
        })
      })]
    }), /* @__PURE__ */ p("hr", {})]
  });
}, df = ({
  useFilters: t
}) => {
  const {
    activeFilters: e,
    toggleFilters: r,
    clearActiveFilters: n,
    popularFilters: s
  } = t, [a, i] = of();
  return /* @__PURE__ */ P("div", {
    className: "flex flex-col",
    children: [/* @__PURE__ */ P("div", {
      className: "px-24 flex w-full py-1 gap-4 items-center justify-between",
      children: [s.length > 0 ? /* @__PURE__ */ P("span", {
        className: "flex items-center gap-6",
        children: [/* @__PURE__ */ p("p", {
          className: "text-lg font-semibold whitespace-nowrap",
          children: "Most popular filters:"
        }), /* @__PURE__ */ p("span", {
          className: "flex flex-wrap gap-4",
          children: s.map((o) => /* @__PURE__ */ p(Ht, {
            title: o.name,
            isSelected: e.includes(o),
            onClick: () => r([o])
          }, `${o.categorySlug}-${o.name}`))
        })]
      }) : /* @__PURE__ */ p("span", {}), /* @__PURE__ */ p("span", {
        className: "flex gap-4",
        children: /* @__PURE__ */ p("button", {
          type: "button",
          className: "px-6 py-2 border-[1px] rounded-2xl border-gray-400 hover:bg-gray-50",
          "data-testid": "all-filters-button",
          onClick: () => i(),
          children: /* @__PURE__ */ P("span", {
            className: "flex justify-between items-center gap-2",
            children: [/* @__PURE__ */ p(_d, {
              className: "w-4 h-4"
            }), /* @__PURE__ */ p("p", {
              className: "flex font-medium uppercase tracking-wider",
              children: "Filters"
            })]
          })
        })
      }), /* @__PURE__ */ p(cf, {
        isModalVisible: a,
        toggleModal: i,
        useFilters: t
      })]
    }), e.length > 0 && /* @__PURE__ */ P("div", {
      className: "px-24 flex flex-row space-x-5 mt-8 pt-8 border-t",
      children: [/* @__PURE__ */ p("button", {
        className: "w-24 hover:underline text-left",
        onClick: () => {
          n();
        },
        children: "Reset all"
      }), /* @__PURE__ */ p("span", {
        className: "flex w-full gap-3",
        children: e.map((o) => /* @__PURE__ */ p(Ht, {
          title: o.name,
          isCancelVisible: !0,
          isSelected: !0,
          onCancel: () => r([o])
        }, `${o.categorySlug}-${o.name}`))
      })]
    })]
  });
}, ff = ({
  useFilters: t
}) => {
  const {
    activeFilters: e,
    toggleFilters: r,
    popularFilters: n
  } = t, s = e[0], a = (i) => i.name === (s == null ? void 0 : s.name);
  return n.length === 0 ? /* @__PURE__ */ p("span", {}) : /* @__PURE__ */ p("span", {
    className: "px-24 flex w-full py-1 gap-4 items-center justify-between",
    children: /* @__PURE__ */ P("span", {
      className: "flex items-center gap-6",
      children: [/* @__PURE__ */ p("p", {
        className: "text-lg font-semibold whitespace-nowrap",
        children: "Most popular categories:"
      }), /* @__PURE__ */ p("span", {
        className: "flex flex-wrap gap-4",
        children: n.map((i) => /* @__PURE__ */ p(Ht, {
          title: i.name,
          isSelected: a(i),
          onClick: () => r([i])
        }, `${i.name}`))
      })]
    })
  });
}, hf = ({
  className: t = "",
  style: e
}) => /* @__PURE__ */ p("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.1",
  id: "Layer_1",
  x: "0px",
  y: "0px",
  style: e,
  className: t,
  viewBox: "0 0 1880.5 595.3",
  children: /* @__PURE__ */ P("g", {
    children: [/* @__PURE__ */ p("path", {
      className: "st0",
      d: "M1682.9,432.6c-1.5-0.4-1.8-1.9-2.5-2.9c-13.7-20.4-27.3-40.8-40.9-61.2c-2.7-4-1.9-3.9-6.1-1.5   c-52.9,30.8-105.8,61.7-158.7,92.5c-1.7,1-3.2,2.1-5.8,2.8c37.2-123.1,74.3-245.7,111.4-368.2c0.2,0,0.5,0.1,0.7,0.1   c0.8,2.7,1.6,5.3,2.4,8c24.4,80.7,48.8,161.4,73.3,242.1c8.5,28.2,17,56.3,25.5,84.5C1682.5,430,1683.3,431.2,1682.9,432.6   L1682.9,432.6z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M486.9,146.5c0,1.9,0,3.4,0,4.8c0,59.7,0,119.3,0,179c0,5.1,0.5,4.4-4.6,4.4c-8.2,0-16.5,0-24.7,0   c-4.3,0-3.9,0.2-3.9-4.1c0-6.6,0-13.3,0-19.9c0-54,0-108,0-162c0-4.6-0.8-4.6,4.5-4.6c19.8,0,39.5,0,59.3,0c4,0,4,0,5.2,3.9   c18,59.5,36,119,54,178.5c0.4,1.5,0.7,3.1,2.1,4.9c0-1.8,0-3.1,0-4.3c0-59.4,0-118.8,0-178.2c0-5.2-0.8-4.8,4.6-4.8   c8.4,0,16.7,0,25.1,0c3.4,0,3.5,0,3.5,3.4c0,61.2,0,122.5,0,183.7c0,3.3,0,3.4-3.5,3.4c-20.3,0-40.5,0-60.8,0c-3.3,0-3.3,0-4.2-3.1   c-18.4-60.7-36.7-121.3-55.1-182C488.2,148.6,488.2,147.6,486.9,146.5z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M1071.9,332.1c0-1.5,0-2.5,0-3.6c0-22.8,0-45.7,0-68.5c0-0.6-0.1-1.2,0-1.8c0.2-1.8-0.6-2.4-2.3-2.3   c-4.5,0.1-9.1,0-13.6,0c-7.5,0-15,0-22.5,0c-2.8,0-2.8-0.1-2.8-2.9c0-9,0-17.9,0-26.9c0-3.4,0-3.4,3.4-3.4c21.1,0,42.2,0,63.4,0   c2,0,3.9,0,5.9,0c1.2,0,1.8,0.4,1.8,1.7c0,0.9,0,1.7,0,2.6c0,34.5,0,69,0,103.5c0,0.7,0,1.5,0,2.2c0.1,1.4-0.5,2.1-1.9,2   c-0.6,0-1.2,0-1.8,0c-38,0-75.9,0-113.9,0c-12.1,0-21.3-5.2-27.4-15.5c-2.6-4.4-3.9-9.3-3.9-14.4c0-12.2,0-24.3,0-36.5   c0-30.7,0-61.4,0-92.1c0-7.6,1.9-14.6,6.8-20.5c6-7.2,13.6-11.2,23.1-11.2c38.6,0,77.1,0,115.7,0c3.4,0,3.4,0,3.4,3.4   c0,8.7,0,17.4,0,26.1c0,3.6,0,3.6-3.6,3.6c-27.9,0-55.8,0-83.6,0c-8.4,0-16.7,0-25.1,0c-3.3,0-3.4,0-3.4,3.1c0,39.2,0,78.3,0,117.5   c0,3.2,0,3.2,3.3,3.2c21.4,0,42.7,0,64.1,0c0.7,0,1.5,0,2.2,0c2.9,0,3,0,3.8,2.8c2.3,7.7,4.6,15.5,7,23.2   C1070.4,328.9,1070.5,330.5,1071.9,332.1z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M942.2,334.3c-0.8,0.5-1.6,0.4-2.5,0.4c-9.6,0-19.2,0-28.7,0c-2.9,0-3,0-3.8-2.8c-5-16.5-10-33.1-15-49.6   c-1.3-4.4-0.7-4.7-5.1-2.2c-30.1,17.6-60.2,35.1-90.3,52.7c-2.3,1.4-4.6,2-7.3,2c-9.1-0.1-18.2,0-27.3,0c-0.9,0-1.7,0-2.6-0.1   c-0.8,0-1.1-0.5-1-1.2c0.2-1.1,0.5-2.1,0.8-3.2c14.5-48,29-96,43.5-144c3.9-12.8,7.7-25.6,11.6-38.3c1.2-3.8,0.3-3.8,4.9-3.8   c20.6,0,41.3,0,61.9,0c3.6,0,3.6,0,4.6,3.2c17.6,58.2,35.2,116.4,52.8,174.6c1,3.2,1.9,6.3,2.8,9.5   C942.1,332.4,942.5,333.3,942.2,334.3z M889.1,274.3c0.1,0.4,0,1.1,0.6,0.8c0.4-0.2,0.2-0.8-0.3-1.1c0-1.1-0.3-2.2-0.7-3.2   c-11.7-38.6-23.3-77.2-35-115.8c-1-3.1-1.6-6.4-3.3-10c-14.4,47.7-28.7,94.9-43.1,142.4c2-0.3,3.1-1.2,4.3-2   c19.3-11.2,38.6-22.5,57.9-33.7c2.8-1.7,2.8-2.1,4.8,1c3.6,5.4,7.2,10.8,10.9,16.2C886.4,270.9,887.3,272.9,889.1,274.3z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M384.8,278.5c-1.4,0.1-2.5,1-3.6,1.7c-30.2,17.6-60.4,35.2-90.6,52.8c-2,1.2-3.9,1.7-6.2,1.7   c-9.3-0.1-18.7,0-28,0c-1.1,0-2.2,0-3.4,0c-0.4-1.5,0.3-2.6,0.6-3.7c15.2-50.3,30.4-100.7,45.7-151c3.3-11,6.7-22.1,10-33.1   c0.8-2.8,0.9-2.8,3.8-2.8c21.1,0,42.2,0,63.4,0c2.9,0,3,0,3.9,3.2c7.9,26.2,15.9,52.3,23.8,78.5c10.6,35.1,21.2,70.2,31.8,105.2   c0.3,1,0.8,2,0.7,3.1c-0.6,0.8-1.4,0.6-2.1,0.6c-9.8,0-19.6,0-29.5,0c-2.8,0-2.8,0-3.7-2.9c-5.1-16.7-10.1-33.3-15.2-50   C385.8,280.7,385.7,279.4,384.8,278.5z M383.7,274.9c0,0.1,0.1,0.2,0.1,0.3c0,0,0.2,0.1,0.2,0.1C384.1,275.1,383.9,275,383.7,274.9   c0.4-1.5-0.4-2.8-0.8-4.2c-12.3-40.6-24.5-81.2-36.8-121.8c-0.3-1-0.7-1.9-1.1-2.9c-4.2,11.7-7.8,23.4-11.3,35.1   c-3.6,11.9-7.2,23.7-10.7,35.6c-3.6,11.7-7.2,23.4-10.7,35.2c-3.5,11.8-7.3,23.5-10.2,35.5c2.4-1,4.6-2.2,6.7-3.5   c18.3-10.7,36.7-21.4,55-32.1c3.2-1.9,2.9-1.8,4.8,1.1c4.2,6.2,8.3,12.5,12.5,18.7C381.8,272.7,382.3,274.2,383.7,274.9z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M1139.1,222.7c1.4,0,2.9,0,4.3,0c26.4,0,52.8,0,79.2,0c0.9,0,1.7,0.1,2.6,0c2-0.2,2.5,0.8,2.5,2.6   c-0.1,9.2,0,18.4,0,27.6c0,3-0.1,3-3.1,3c-16.9,0-33.9,0-50.8,0c-4.8,0-4.4-0.5-4.4,4.3c0,12.5,0,25,0,37.6c0,3.6,0,3.6,3.6,3.6   c37.7,0,75.4,0,113.1,0c5.4,0,4.6-0.6,4.7,4.7c0,8.2,0,16.4,0,24.7c0,4,0.2,3.8-3.8,3.8c-36.8,0-73.7,0-110.5,0   c-3.4,0-6.9,0.1-10.3,0c-16.6-0.3-29.9-13.6-29.9-30.2c-0.1-43.3-0.1-86.7,0-130c0-17.9,15.3-30,30.1-30   c40.3,0.2,80.6,0.1,120.8,0.1c0.7,0,1.5,0,2.2,0c0.9,0,1.3,0.5,1.3,1.4c0,0.7,0,1.5,0,2.2c0,8.6,0,17.2,0,25.8c0,3.7,0,3.7-3.8,3.7   c-37.5,0-74.9,0-112.4,0c-5.9,0-5.1-0.7-5.1,5c0,9,0,17.9,0,26.9c0,3.4,0,3.4-3.4,4.4c-8.1,2.4-16.2,4.9-24.3,7.4   c-0.9,0.3-1.8,0.6-2.7,0.9C1139,222.4,1139.1,222.5,1139.1,222.7z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M1763.5,403c-29.4-97.3-58.6-193.8-87.9-290.4c12.2,2,48.5,28.8,66.1,48.7c18.6,20.9,32.4,44.6,41.2,71.2   c11.7,35.4,13.5,71.4,5.7,107.8C1783.9,362.4,1775.6,383.1,1763.5,403z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M271,144.7c-1.9,6.4-3.8,12.6-5.7,18.8c-16.9,55.7-33.7,111.5-50.6,167.2c-0.2,0.7-0.5,1.4-0.6,2.1   c-0.3,1.4-1.2,2-2.6,1.9c-1-0.1-2,0-2.9,0c-19.9,0-39.8,0-59.7,0c-0.7,0-1.5-0.1-2.2,0c-1.8,0.3-2.6-0.7-3.1-2.3   c-1.6-5.7-3.4-11.3-5.1-16.9c-16.7-55.3-33.5-110.5-50.2-165.8c-1.9-6.1-2-5.5,4-5.5c8.5,0,16.9,0,25.4,0c3.7,0,3.7,0,4.8,3.5   c9.9,32.7,19.8,65.5,29.7,98.2c8.4,27.8,16.8,55.6,25.3,83.4c0.4,1.2,0.4,2.7,1.8,3.8c2.1-6.9,4.1-13.5,6.1-20.2   c16.7-55,33.3-110.1,50-165.1c1.4-4.5,1.5-3.6,5-3.6c9,0,17.9,0,26.9,0C268.4,144.2,269.5,143.9,271,144.7z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M722.5,148c-1,1.4-0.8,2.9-0.8,4.4c0,59.2,0,118.3,0,177.5c0,5.4,0.6,4.8-4.6,4.8c-8.5,0-16.9,0-25.4,0   c-3.3,0-3.4,0-3.4-3.5c0-25.3,0-50.6,0-75.9c0-24.3,0-48.6,0-72.9c0-5.4,0.6-4.8-4.6-4.8c-15.1,0-30.2,0-45.3,0   c-0.7,0-1.5-0.1-2.2,0c-2,0.2-2.5-0.7-2.5-2.6c0.1-9.3,0-18.7,0-28c0-2.5,0.1-2.6,2.8-2.6c5-0.1,10.1-0.2,15.1-0.2   c39.8-0.1,79.6-0.1,119.4-0.1c0.9,0,1.7,0,2.6,0c2.8,0.1,2.8,0.1,2.8,2.9c0,9.2,0,18.4,0,27.6c0,2.8-0.1,2.9-2.9,2.9   c-13.1,0-26.3,0-39.4,0.1c-2,0-2.8-0.8-3.3-2.6c-2.3-8-4.8-16-7.2-23.9C723.2,150.1,722.8,149,722.5,148z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M1481.6,123.2c0.8,1.4-0.2,2.6-0.5,3.8c-22.3,73.7-44.6,147.3-66.8,221c-3.2,10.7-6.5,21.3-9.7,32   c-0.2,0.8-0.1,1.8-1.1,2.2c-0.9-0.7-1.1-1.8-1.6-2.7c-8.4-19-14-38.7-16.1-59.4c-6.5-64.1,12.7-119.6,57.1-166.3   c10.8-11.3,23-21,36.2-29.4C1479.9,124,1480.6,123.1,1481.6,123.2L1481.6,123.2z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M1574.5,500.1c36.7-21.4,73.1-42.6,109.4-63.8c1.1,0.7,1.1,1.8,1.4,2.7c3,9.8,6,19.7,8.9,29.5   c0.9,3,0.9,3-1.8,4.6c-19.8,11.7-41,19.7-63.6,24.2c-16.4,3.3-33,4.4-49.8,3.6C1577.6,500.9,1576.1,501.1,1574.5,500.1z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M688.1,420.1c0-8.6,0-17.2,0-25.8c0-2.8,0.1-2.9,2.8-2.9c6.4,0,12.8-0.1,19.1,0c3.1,0,6.1,0.7,8.9,2.2   c4.8,2.5,7.7,6.3,8.3,11.8c0.4,3.3,0.2,6.6,0.2,9.9c0,5.2-0.1,10.3,0,15.5c0.4,12.9-8.5,17.7-17.4,18c-6.5,0.2-13,0-19.5,0.1   c-1.9,0-2.5-0.7-2.5-2.6C688.1,437.5,688.1,428.8,688.1,420.1z M696.1,419.8c0,6.5,0.1,13,0,19.5c0,2,0.7,2.6,2.6,2.5   c3.6-0.1,7.1,0.1,10.7,0c5.8-0.2,9.1-3.1,10-8.8c0.2-1.3,0.3-2.7,0.3-4c0-5.3,0-10.6,0-15.8c0-2.1,0.1-4.2-0.3-6.2   c-0.9-5.1-3.7-7.8-8.8-8.4c-3.9-0.5-7.8-0.2-11.8-0.2c-2.5,0-2.6,0.1-2.6,2.7C696,407.3,696.1,413.5,696.1,419.8z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M1218.2,448.5c-2,0.5-4.1,0.1-6.1,0.2c-1.6,0.1-2-1.2-2.5-2.3c-3.1-6.5-6.3-13-9.2-19.7   c-1.1-2.5-2.5-3.6-5.2-3.3c-2.1,0.2-4.2,0.1-6.3,0c-1.8-0.1-2.3,0.6-2.3,2.3c0.1,6.1,0,12.3,0,18.4c0,0.9,0.1,1.7,0,2.6   c-0.2,2-0.3,2-5,1.9c-1.4,0-3.2,0.4-3-2c0-0.6,0-1.2,0-1.8c0-16.6,0-33.1,0-49.7c0-0.6,0-1.2,0-1.8c-0.1-1.4,0.5-2,1.9-2   c7.6,0,15.2-0.2,22.8,0.1c7.5,0.3,13,5.5,14.3,12.6c1.4,8.2-1.8,14.8-8.8,18c-2.3,1-2.3,1.1-1.2,3.3c3.2,6.7,6.5,13.5,9.8,20.2   C1217.9,446.5,1218.5,447.3,1218.2,448.5z M1186.7,407.7c0,2.5,0.1,4.9,0,7.4c-0.1,1.6,0.6,2.1,2.2,2.1c4.2-0.1,8.4,0.1,12.5-0.1   c5.1-0.2,8.4-3.7,8.6-8.8c0.2-5.7-2.8-9.4-8.5-9.9c-4.3-0.3-8.6-0.1-12.9-0.2c-1.5,0-1.9,0.8-1.8,2.1   C1186.7,402.8,1186.7,405.2,1186.7,407.7z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M955.4,420.1c0-3.3,0-6.6,0-9.9c0.2-10.9,6.9-18.2,17.8-19.3c4.2-0.4,8.3,0.1,12.2,2c7,3.4,10.3,9.2,10.5,16.8   c0.2,6.5-0.1,13,0.1,19.5c0.3,13.7-10.1,21.8-23.6,20.1c-10.6-1.3-16.8-8.6-17-19.3C955.4,426.7,955.4,423.4,955.4,420.1z    M987.9,420.3c0-3.4,0.1-6.9,0-10.3c-0.1-7.3-4.8-12-11.9-12.3c-7.2-0.2-12.3,4.1-12.6,11.4c-0.3,7.3-0.3,14.7,0,22   c0.3,7.3,5.3,11.6,12.6,11.3c7-0.2,11.6-4.9,11.8-11.9C988,427.1,987.9,423.7,987.9,420.3z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M827.3,449.5c-3.9-0.1-7.8-0.6-11.4-2.2c-6.2-2.8-9.6-8.3-9.3-14.9c0.1-1.6,0.6-2.3,2.1-2.2c0.6,0,1.2,0,1.8,0   c3.5,0,3.6,0,3.9,3.4c0.3,3.4,2.2,5.7,5.1,7.1c4.5,2.2,9.2,2.3,14,0.9c3.1-0.9,5-3.1,5.5-6.3c0.6-3.3-0.9-5.7-3.5-7.6   c-2.9-2.1-6.3-3.3-9.6-4.7c-3.6-1.5-7.3-2.8-10.7-4.8c-6.3-3.7-8.7-9.3-7.1-16.2c1-4.4,3.7-7.5,7.7-9.2c7.8-3.3,15.6-3.1,23.1,1   c5.3,2.9,7.8,7.6,7.7,13.7c0,1.5-0.5,2.3-2.1,2.2c-0.7-0.1-1.5,0-2.2,0c-3.2,0-3.2,0-3.6-3c-0.6-4.3-3.4-7.4-8-8.5   c-2.8-0.6-5.6-0.7-8.4-0.1c-3.6,0.7-6,3-6.6,6.1c-0.6,3.5,0.7,6.2,4.1,8.2c2.8,1.6,5.8,2.7,8.7,3.8c3.5,1.4,7.1,2.8,10.4,4.6   c5.6,3.1,8.8,7.7,8.2,14.4c-0.7,6.8-4.7,10.8-11,12.9C833.2,449.1,830.3,449.4,827.3,449.5z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M1105,419.7c0-8.5,0-16.9,0-25.4c0-2.9,0.1-2.9,2.8-2.9c10.8,0,21.6,0,32.4,0c2.9,0,2.9,0.1,3,2.8   c0,0.5,0,1,0,1.5c0.2,1.9-0.5,2.7-2.5,2.6c-3.9-0.1-7.9,0-11.8,0c-4.5,0-9.1,0.1-13.6,0c-1.8,0-2.4,0.7-2.3,2.4   c0.1,4.4,0.1,8.8,0,13.3c0,1.9,0.5,2.6,2.5,2.6c5.2-0.1,10.3-0.1,15.5,0c3,0,3,0,3,3.1c0,0.2,0,0.5,0,0.7c0,3.1,0,3.1-3,3.1   c-3.8,0-7.6,0-11.4,0c-2.1,0-4.6-0.9-6,0.5c-1.5,1.4-0.5,4-0.6,6c-0.1,2.9,0,5.9,0,8.8c0,3,0.1,3.1,3,3.1c7.4,0,14.7,0,22.1,0   c1,0,2,0,2.9,0c1.6-0.1,2.2,0.7,2.2,2.2c0,0.4,0,0.7,0,1.1c0,3.7,0,3.7-3.6,3.7c-10.4,0-20.9,0-31.3,0c-3.2,0-3.2,0-3.2-3.3   C1105,436.9,1105,428.3,1105,419.7C1105,419.7,1105,419.7,1105,419.7z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M881,419.9c0-3.3,0.1-6.6,0-9.9c-0.5-9.4,5.6-17.4,16.2-18.9c4.9-0.7,9.6-0.2,14,2c5.9,2.9,9,7.8,9.6,14.2   c0.2,2.3,0,2.5-2.3,2.7c-0.2,0-0.5,0.1-0.7,0.1c-1.5,0-3,0.8-4.3-0.1c-1.3-0.8-0.5-2.5-0.9-3.8c-1.1-4.4-4.4-7.5-8.9-8.2   c-2-0.3-3.9-0.3-5.9,0c-4.7,0.9-8.2,4.4-8.7,9.2c-0.3,3-0.2,6.1-0.2,9.2c0,5-0.1,10.1,0,15.1c0.1,4.7,2.2,8.4,6.7,10   c4.9,1.8,9.7,1.6,13.8-2.1c2.1-1.9,3.2-4.4,3.3-7.2c0-1.8,0.9-2.2,2.5-2.2c5.9,0.2,6.5,0.9,4.8,6.6c-1.6,5.4-5.1,9.2-10.3,11.2   c-5.8,2.3-11.8,2.4-17.6,0c-7.1-2.8-10.8-8.3-11.1-15.9C880.8,428,881,423.9,881,419.9C881,419.9,881,419.9,881,419.9z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M1028,391.8c0.3-0.1,0.4-0.2,0.5-0.2c7.4-0.7,7.4-0.7,9.5,6.4c3.5,11.7,7,23.5,10.5,35.2   c0.3,1.1,0.5,2.3,1.6,3.7c1-3.1,1.8-5.7,2.6-8.4c3.4-11.3,6.7-22.6,10.1-33.8c1-3.2,1-3.2,4.2-3.2c5.5,0,5.2-0.6,3.5,4.9   c-5.2,16.2-10.3,32.5-15.5,48.7c-1.3,4.2-0.8,3.8-5,3.8c-5.1,0-4.3,0.7-5.8-4.1c-5.2-16.5-10.4-33-15.6-49.5   C1028.4,394.1,1027.8,393.1,1028,391.8z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M1248.5,391.4c2.1,0,4.3,0,6.5,0c1.6,0,2,1.2,2.5,2.3c3.5,6.6,6.9,13.3,10.4,19.9c0.3,0.6,0.7,1.3,1,1.9   c1.4-0.1,1.5-1.3,1.9-2.1c3.4-6.4,6.8-12.8,10-19.2c1-2,2.2-3.1,4.5-2.8c1,0.1,2,0,2.9,0c2.4,0.1,2.6,0.3,1.4,2.6   c-4.9,9.2-9.8,18.4-14.8,27.5c-1.2,2.1-1.7,4.2-1.7,6.6c0.1,6,0,12,0.1,18c0,1.9-0.6,2.6-2.5,2.5c-6.1-0.2-5.4,0.7-5.4-5.2   c0-5.4-0.1-10.8,0-16.2c0-1.9-0.4-3.6-1.3-5.3c-4.8-9-9.6-17.9-14.4-26.9C1249.2,394.1,1248.2,393.2,1248.5,391.4z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M763.4,420.2c0-8.6,0-17.1,0-25.7c0-3,0.1-3.1,3.1-3.1c5.6,0,4.9-0.6,4.9,4.9c0,16,0,32.1,0,48.1   c0,0.9,0,1.7,0,2.6c0,1.2-0.5,1.7-1.7,1.8c-5.9,0.7-6.2,0.4-6.2-5.4C763.4,435.6,763.4,427.9,763.4,420.2z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M1682.9,432.6c0.4,0,0.6,0.3,0.5,0.6c0,0.1-0.2,0.2-0.3,0.3C1683,433.2,1682.9,432.9,1682.9,432.6   C1682.9,432.6,1682.9,432.6,1682.9,432.6z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M1481.7,123.3c0.1-0.1,0.3-0.3,0.4-0.4c0,0.1,0.1,0.2,0,0.3C1482,123.5,1481.8,123.4,1481.7,123.3   C1481.6,123.2,1481.7,123.3,1481.7,123.3z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M889.4,274.1c0.5,0.3,0.7,0.9,0.3,1.1c-0.6,0.2-0.5-0.5-0.6-0.8C889.2,274.3,889.3,274.2,889.4,274.1z"
    }), /* @__PURE__ */ p("path", {
      className: "st0",
      d: "M383.6,275c0.3-0.1,0.5,0.1,0.4,0.3c0,0-0.2,0-0.2-0.1C383.7,275.2,383.7,275.1,383.6,275   C383.7,274.9,383.6,275,383.6,275z"
    })]
  })
}), pf = () => /* @__PURE__ */ P("footer", {
  className: "flex flex-col w-full bg-gray-50 justify-center items-center gap-2 h-24 mt-12 animate-fade-in",
  children: [/* @__PURE__ */ p(hf, {
    className: "w-24 h-auto animate-appear-vantage-logo"
  }), /* @__PURE__ */ p("p", {
    children: "All Rights Reserved by Vantage"
  })]
}), Gi = ({
  backgroundColor: t,
  vantageLogoColor: e,
  vantageLogoColorOnAnimation: r,
  backgroundLeftColorOnAnimation: n,
  backgroundRightColorOnAnimation: s,
  clientLogoColor: a,
  // color to be on animation finish
  clientLogoColorOnAnimation: i,
  // color to be on animation
  clientLogoUrl: o
}) => {
  const l = {
    "--bg-color": n,
    clipPath: "polygon(0 0, 0 100%, 51.5% 100%, 48.5% 0)"
  }, f = {
    "--bg-color": s,
    clipPath: "polygon(48.5% 0, 51.5% 100%, 100% 100%, 100% 0)"
  };
  return /* @__PURE__ */ p("nav", {
    className: "sticky top-0 z-10",
    children: /* @__PURE__ */ P("div", {
      className: `max-w-screen-xxl w-full bg-${t} flex flex-wrap items-center justify-items-stretch h-32 animate-reduce-height`,
      children: [/* @__PURE__ */ p("div", {
        className: "flex w-full absolute h-full justify-start pl-20 items-center animate-slide-in",
        style: l,
        children: /* @__PURE__ */ p("img", {
          src: o,
          alt: "Client logo",
          className: "w-48 h-20 animate-appear-left-logo",
          style: {
            "--bg-start-color": i,
            "--bg-end-color": a
          }
        })
      }), /* @__PURE__ */ p("div", {
        className: "flex w-full absolute h-full justify-end pr-20 items-center animate-slide-in right-0",
        style: f,
        children: /* @__PURE__ */ p("img", {
          src: new URL("data:image/png;base64,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", self.location).href,
          alt: "Vantage logo",
          className: `fill-${e} w-48 h-auto animate-appear-vantage-logo`,
          style: {
            "--bg-start-color": r || e,
            "--bg-end-color": e
          }
        })
      })]
    })
  });
}, Hi = {
  isDropDownOpen: !1,
  inputValue: "",
  keyboardSelectedIndex: 0
}, mf = (t, e) => {
  switch (e.type) {
    case 1:
      return {
        ...t,
        isDropDownOpen: !1
      };
    case 0:
      return {
        ...t,
        isDropDownOpen: !0
      };
    case 2:
      return {
        ...t,
        inputValue: "",
        selectedValue: e.value,
        isDropDownOpen: !1,
        keyboardSelectedIndex: 0
      };
    case 3:
      return {
        ...Hi
      };
    case 4:
      return {
        ...t,
        inputValue: e.value ?? ""
      };
    case 5:
      return {
        ...t,
        keyboardSelectedIndex: Math.max(t.keyboardSelectedIndex - 1, 0)
      };
    case 6:
      return {
        ...t,
        keyboardSelectedIndex: Math.min(t.keyboardSelectedIndex + 1, Number(e.value))
      };
  }
}, vf = ({
  data: t,
  onSelectedAction: e,
  className: r,
  placeholder: n,
  activeValue: s
}) => {
  const [a, i] = So(mf, {
    ...Hi,
    selectedValue: s
  }), [o, l] = re(t), f = Lr(null), c = (g) => {
    a.isDropDownOpen && f.current && !f.current.contains(g.target) && m();
  };
  Y(() => (document.addEventListener("click", c), () => {
    document.removeEventListener("click", c);
  }), [a.isDropDownOpen]);
  const d = (g) => {
    i({
      type: 2,
      value: g
    }), e(g ?? "");
  }, m = () => {
    i({
      type: 3
      /* CLEAR_SELECTED_VALUE */
    }), e();
  };
  return Y(() => {
    if (s !== void 0) {
      i({
        type: 2,
        value: s
      });
      return;
    }
    i({
      type: 3
      /* CLEAR_SELECTED_VALUE */
    });
  }, [s]), Y(() => {
    l(t);
  }, [t]), /* @__PURE__ */ P("div", {
    className: "relative w-full h-full",
    ref: f,
    children: [/* @__PURE__ */ P("div", {
      className: Ve("bg-white flex border border-gray-200 rounded items-center justify-between", r),
      children: [/* @__PURE__ */ P("span", {
        className: Ve("flex w-full mr-1 pr-1 justify-between", {
          "bg-gray-100 rounded-md h-7": a.selectedValue
        }),
        children: [/* @__PURE__ */ p("input", {
          type: "text",
          onChange: (g) => {
            i({
              type: 4,
              value: g.target.value
            });
          },
          placeholder: n ?? "",
          onKeyDown: (g) => {
            g.key === "Enter" && o.length > 0 && (d(o[a.keyboardSelectedIndex]), g.stopPropagation()), g.key === "ArrowDown" && i({
              type: 6,
              value: o.length.toString()
            }), g.key === "ArrowUp" && i({
              type: 5
              /* ARROW_UP */
            });
          },
          value: a.selectedValue || a.inputValue,
          onClick: (g) => {
            i({
              type: 0
              /* OPEN_DROPDOWN */
            }), g.stopPropagation();
          },
          disabled: !!a.selectedValue,
          className: Ve("pl-2 bg-inherit rounded-md h-7 appearance-none outline-none w-full", a.selectedValue ? "text-black cursor-pointer" : "text-gray-500")
        }), a.selectedValue && /* @__PURE__ */ p("button", {
          type: "button",
          className: "flex w-6 h-auto items-center",
          onClick: () => {
            m();
          },
          children: /* @__PURE__ */ p(ss, {
            className: "hover:cursor-pointer"
          })
        })]
      }), /* @__PURE__ */ P("button", {
        className: "cursor-pointer outline-none w-6 focus:outline-none border-gray-200 transition-all text-gray-300 hover:text-gray-600",
        "data-testid": `combobox-${a.isDropDownOpen ? "close" : "open"}-dropdown`,
        tabIndex: 0,
        onClick: (g) => {
          if (g.stopPropagation(), a.isDropDownOpen) {
            i({
              type: 1
              /* CLOSE_DROPDOWN */
            });
            return;
          }
          i({
            type: 0
            /* OPEN_DROPDOWN */
          });
        },
        children: [a.isDropDownOpen && /* @__PURE__ */ p(Vd, {
          className: "w-full h-auto"
        }), !a.isDropDownOpen && /* @__PURE__ */ p(Ud, {
          className: "w-full h-auto"
        })]
      })]
    }), a.isDropDownOpen && /* @__PURE__ */ P("div", {
      className: "absolute rounded shadow bg-white overflow-x-hidden visible flex-col w-full mt-1 border border-gray-200 z-10 h-96 overflow-y-scroll",
      role: "menu",
      tabIndex: 0,
      children: [o.map((g, E) => (
        /* eslint-ignore-next-line jsx-a11y/click-events-have-key-events */
        /* @__PURE__ */ p("div", {
          className: "cursor-pointer group border-t",
          role: "listbox",
          tabIndex: 0,
          onClick: () => {
            d(g);
          },
          onKeyDown: (S) => {
            S.key === "Enter" && d(g);
          },
          children: /* @__PURE__ */ p("p", {
            className: Ve("block p-2 border-transparent border-l-4 group-hover:bg-gray-100", {
              "border-l-black": a.selectedValue === g,
              "bg-gray-100": E === a.keyboardSelectedIndex
            }),
            children: g
          })
        }, g + E)
      )), o.length === 0 && /* @__PURE__ */ p("div", {
        className: "cursor-pointer group border-t",
        children: /* @__PURE__ */ p("p", {
          className: "block p-2 border-transparent border-l-4",
          children: "No results..."
        })
      })]
    })]
  });
}, gf = Co(vf), yf = ({
  searchQuery: t,
  onSearchPerformed: e,
  setSearchQuery: r,
  useFiltersHook: n,
  isSingleFilter: s,
  searchPlaceholder: a = "Search for anything..."
}) => {
  const {
    availableFilters: i,
    activeFilters: o,
    toggleFilters: l,
    clearActiveFilters: f
  } = n, c = Se(() => o[0], [o]);
  return /* @__PURE__ */ P("form", {
    onSubmit: (d) => {
      d.preventDefault(), e();
    },
    className: "flex w-full justify-center gap-6",
    children: [/* @__PURE__ */ P("span", {
      className: "flex flex-row items-center border border-black text-gray-900 text-sm rounded-lg w-full gap-2 pl-2",
      children: [/* @__PURE__ */ p(Xd, {
        className: "w-6 h-6 text-gray-600"
      }), /* @__PURE__ */ p("input", {
        placeholder: a,
        type: "text",
        "data-testid": "search-input",
        className: Ve("h-full py-3 !focus:ring-0 outline-0", s ? "w-3/5 border-r-[1px] border-r-gray-400" : "w-full rounded-lg"),
        value: t,
        onChange: (d) => {
          r(d.target.value);
        }
      }), s && /* @__PURE__ */ p("span", {
        className: "w-2/5 h-full mr-2",
        children: /* @__PURE__ */ p(gf, {
          className: "w-full h-full !border-0",
          placeholder: "Select optional category",
          data: i.map((d) => d.name).filter(Boolean),
          activeValue: c == null ? void 0 : c.name,
          onSelectedAction: (d) => {
            if (!d) {
              f();
              return;
            }
            const m = i == null ? void 0 : i.find((g) => g.name === d);
            m && l([m]);
          }
        })
      })]
    }), /* @__PURE__ */ p("button", {
      className: "bg-black text-white rounded-xl px-10 font-bold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed",
      type: "submit",
      children: "Search"
    })]
  });
}, bf = ({
  brandingConfiguration: t
}) => {
  const {
    filterActions: e,
    searchResults: r,
    variables: n,
    demoActions: s,
    dataConfiguration: a
  } = Mi();
  Y(() => {
    t.pageTitle && (document.title = t.pageTitle);
  }, []);
  const i = Se(() => r[0], [r]), o = () => {
    if (!a.filter)
      return /* @__PURE__ */ p(et, {});
    if (a.filter.type === je.SINGLE_SELECT)
      return /* @__PURE__ */ p(ff, {
        useFilters: e
      });
    if (a.filter.type === je.MULTI_SELECT)
      return /* @__PURE__ */ p(df, {
        useFilters: e
      });
  };
  return /* @__PURE__ */ P("div", {
    className: "flex flex-col w-full overflow-visible gap-0 justify-between min-h-screen",
    children: [/* @__PURE__ */ p(Gi, {
      clientLogoUrl: t.logoUrl,
      backgroundColor: "white",
      vantageLogoColor: "black",
      vantageLogoColorOnAnimation: "black",
      clientLogoColor: "black",
      clientLogoColorOnAnimation: "white",
      backgroundLeftColorOnAnimation: "#333333",
      backgroundRightColorOnAnimation: t.colors.primary
    }), /* @__PURE__ */ p("div", {
      className: "grow w-full h-full",
      children: /* @__PURE__ */ p("div", {
        className: "flex justify-center animate-fade-in",
        children: /* @__PURE__ */ P("div", {
          className: "flex flex-col items-center w-full gap-8",
          children: [/* @__PURE__ */ p("div", {
            className: "flex flex-col w-3/5 gap-10",
            children: /* @__PURE__ */ p("h3", {
              className: "font-bold text-4xl text-center",
              children: t.title
            })
          }), /* @__PURE__ */ p("div", {
            className: "flex flex-col w-3/5 gap-10",
            children: /* @__PURE__ */ p(yf, {
              searchQuery: n.query,
              setSearchQuery: s.setQuery,
              onSearchPerformed: s.performSearch,
              searchPlaceholder: t.searchPlaceholder,
              useFiltersHook: e,
              isSingleFilter: a.filter.type === je.SINGLE_SELECT
            })
          }), /* @__PURE__ */ p("hr", {
            className: "w-full"
          }), /* @__PURE__ */ p("div", {
            className: "w-full",
            children: o()
          }), /* @__PURE__ */ p("hr", {
            className: "w-full"
          }), /* @__PURE__ */ P("div", {
            className: "flex justify-between w-full",
            children: [a.originalSearchResultsURL && /* @__PURE__ */ P("span", {
              className: "flex px-24 w-full justify-start gap-2 items-center text-lg",
              children: [/* @__PURE__ */ p("p", {
                className: "font-medium",
                children: "You searched: "
              }), /* @__PURE__ */ p("p", {
                children: n.query
              }), "a", /* @__PURE__ */ p("p", {
                className: "mt-0.5",
                children: /* @__PURE__ */ p(qr, {
                  to: a.originalSearchResultsURL.replace("${query}", n.query),
                  target: "_new",
                  children: /* @__PURE__ */ p(qi, {
                    className: "h-4 w-4",
                    "aria-hidden": "true"
                  })
                })
              })]
            }), !!i.executionTime && /* @__PURE__ */ P("span", {
              className: "flex justify-end text-xl mr-24 w-full",
              children: ["You have ", /* @__PURE__ */ p("b", {
                className: "px-1",
                children: i.items.length
              }), "search results", i.executionTime && /* @__PURE__ */ P(et, {
                children: [" in", /* @__PURE__ */ P("b", {
                  className: "px-1",
                  children: [(+i.executionTime / 1e3).toFixed(2), "seconds"]
                })]
              })]
            })]
          }), /* @__PURE__ */ P("div", {
            className: "px-24 w-full flex flex-row space-x-5 items-center",
            children: [/* @__PURE__ */ p(zi, {
              text: "Developer debug",
              checkedColor: t.colors.primary,
              isEnabled: n.isDeveloperViewToggled,
              setIsEnabled: s.setIsDeveloperViewToggled
            }), n.isDeveloperViewToggled && e.activeFilters.length > 0 && /* @__PURE__ */ p("div", {
              className: "text-xl leading-none",
              children: e.getFilterString()
            })]
          }), /* @__PURE__ */ p(Wi, {
            isLoading: i.isLoading,
            isError: i.isError,
            isSuccess: i.isSuccess,
            isNoResults: !i.isLoading && i.items.length === 0,
            children: /* @__PURE__ */ p("div", {
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-12 justify-center",
              children: i.items.map((l, f) => {
                var c, d;
                return /* @__PURE__ */ p(nf, {
                  ...l,
                  subtitle: (c = l.meta) == null ? void 0 : c.subtitle,
                  infoContent: l.embeddingText,
                  searchAccuracy: l.score,
                  bottomRightLabel: (d = l.meta) == null ? void 0 : d.imageLabel,
                  redirectUrl: l.externalUrl,
                  primaryColor: t.colors.primary,
                  secondaryColor: t.colors.secondary,
                  onMoreLikeThisClicked: () => {
                    s.setQuery(`${l.title} - ${l.description}`), s.performMoreLikeThis(l.id);
                  },
                  isDeveloperView: n.isDeveloperViewToggled
                }, f);
              })
            })
          })]
        })
      })
    }), /* @__PURE__ */ p(pf, {})]
  });
}, wf = ({
  text: t,
  isLoading: e,
  primaryColor: r
}) => /* @__PURE__ */ P("div", {
  className: "flex flex-col gap-2 p-2 min-w-sm",
  children: [/* @__PURE__ */ p("h1", {
    className: "font-semibold",
    children: "Research Indexed Text"
  }), e && /* @__PURE__ */ p("span", {
    className: "flex w-full justify-center",
    children: /* @__PURE__ */ p(Ki, {
      className: "w-6 h-6",
      color: r
    })
  }), t && /* @__PURE__ */ p("p", {
    className: "w-full",
    children: t
  })]
}), xf = ({
  cardProperties: t,
  isDeveloperView: e,
  onMoreLikeThis: r,
  primaryColor: n,
  secondaryColor: s
}) => /* @__PURE__ */ P("article", {
  className: "flex w-full h-[200px] shadow-md rounded-lg bg-white border-[1px]",
  children: [/* @__PURE__ */ p("div", {
    className: "w-1/5",
    children: /* @__PURE__ */ p("a", {
      href: t.redirectUrl,
      target: t.redirectUrl ? "_blank" : "",
      rel: "external noreferrer",
      className: "relative cursor-pointer",
      children: /* @__PURE__ */ p("div", {
        className: "flex w-full justify-center bg-gray-50 rounded-lg p-5 bg-publisher-orange-100",
        children: /* @__PURE__ */ p("img", {
          src: t.imageUrl,
          alt: "product",
          "data-testid": "product-image",
          className: "relative rounded-lg h-[160px] w-full object-cover"
        })
      })
    })
  }), /* @__PURE__ */ P("div", {
    className: "flex w-4/5 flex-col p-5 justify-between",
    children: [/* @__PURE__ */ P("section", {
      className: "flex w-full justify-between",
      children: [/* @__PURE__ */ P("span", {
        className: "flex flex-col gap-2 mb-1",
        children: [/* @__PURE__ */ p("h4", {
          className: "text-sm text-gray-400",
          children: t.subtitle
        }), /* @__PURE__ */ P("span", {
          className: "flex items-center gap-2",
          children: [/* @__PURE__ */ p("h2", {
            className: "text-lg font-semibold text-gray-800 line-clamp-1",
            children: t.title
          }), e && /* @__PURE__ */ p(Vi, {
            content: /* @__PURE__ */ p(wf, {
              text: t.tooltipContent,
              isLoading: !1,
              primaryColor: "black"
            }),
            children: /* @__PURE__ */ p(Bi, {
              className: "w-4 h-4 text-black"
            })
          })]
        })]
      }), e && /* @__PURE__ */ P("span", {
        "data-testid": "product-card-search-accuracy",
        className: "flex px-3.5 h-8 rounded-full gap-2 items-center justify-between border-[1px] border-black",
        children: [/* @__PURE__ */ p(ji, {
          className: "w-4 h-4"
        }), /* @__PURE__ */ p("p", {
          className: "text-sm font-medium ",
          children: t.accuracy.toFixed(6)
        })]
      })]
    }), /* @__PURE__ */ P("section", {
      className: "flex flex-col justify-between h-full gap-2",
      children: [/* @__PURE__ */ p("p", {
        className: "leading-5 text-gray-600 line-clamp-3",
        children: t.description
      }), r && /* @__PURE__ */ p("span", {
        className: "flex justify-end items-center gap-4",
        children: /* @__PURE__ */ p("button", {
          style: {
            backgroundColor: s,
            color: Qi(s)
          },
          onClick: () => {
            r == null || r(t.id);
          },
          className: "flex bg-vantage-primary text-white shrink-0 rounded-md px-3 py-2 text-sm font-semibold w-36 h-9  hover:bg-vantage-primary-hovered",
          children: "+ More Like This"
        })
      })]
    })]
  })]
}), Ef = ({
  brandingConfiguration: t
}) => {
  var E, S, b;
  const {
    filterActions: e,
    searchResults: r,
    variables: n,
    demoActions: s,
    dataConfiguration: a
  } = Mi(), {
    activeFilters: i,
    availableFilters: o,
    clearActiveFilters: l,
    toggleFilters: f,
    getFilterString: c
  } = e;
  Y(() => {
    t.pageTitle && (document.title = t.pageTitle);
  }, []);
  const d = Se(() => r[0], [r]), m = ((E = d.items) == null ? void 0 : E.length) === 0, g = !!d.items && d.items.length > 0;
  return /* @__PURE__ */ P("div", {
    className: "flex flex-col w-full gap-0 min-h-screen relative",
    children: [/* @__PURE__ */ p(Gi, {
      clientLogoUrl: t.logoUrl,
      backgroundColor: "white",
      vantageLogoColor: "black",
      vantageLogoColorOnAnimation: "black",
      clientLogoColor: "black",
      clientLogoColorOnAnimation: "white",
      backgroundLeftColorOnAnimation: "#333333",
      backgroundRightColorOnAnimation: t.colors.primary
    }), /* @__PURE__ */ p("div", {
      className: "grow w-full",
      children: /* @__PURE__ */ p("div", {
        className: "flex justify-center animate-fade-in",
        children: /* @__PURE__ */ P("div", {
          className: "flex flex-row w-full px-20",
          children: [/* @__PURE__ */ P("aside", {
            className: "pr-10 flex flex-col sticky top-[128px] left-0 py-4 gap-8 border-r h-fit",
            children: [/* @__PURE__ */ P("section", {
              className: "",
              children: [/* @__PURE__ */ p("h3", {
                className: "text-xl font-bold text-gray-600 text-weight",
                children: "Categories"
              }), /* @__PURE__ */ p("ul", {
                className: "flex flex-col mt-4 gap-2",
                children: o.map((y) => /* @__PURE__ */ p("li", {
                  children: /* @__PURE__ */ p("button", {
                    className: Ve("px-2 py-1 rounded-md", {
                      "text-white": i == null ? void 0 : i.includes(y)
                    }),
                    style: {
                      backgroundColor: i != null && i.includes(y) ? t.colors.primary : "transparent"
                    },
                    onClick: () => {
                      f([y]);
                    },
                    children: y.name
                  })
                }, y.slug))
              })]
            }), /* @__PURE__ */ P("div", {
              className: "flex flex-col justify-center items-center gap-8 mt-10 pb-12",
              children: [/* @__PURE__ */ p(zi, {
                text: "Developer debug",
                checkedColor: t.colors.primary,
                isEnabled: n.isDeveloperViewToggled,
                setIsEnabled: s.setIsDeveloperViewToggled
              }), /* @__PURE__ */ p("span", {
                className: "border-t-[1px] border-t-gray-400",
                children: /* @__PURE__ */ p("p", {
                  className: "text-xs text-center mt-2 text-gray-500",
                  children: "All Rights Reserved by Vantage"
                })
              })]
            })]
          }), /* @__PURE__ */ P("main", {
            className: "flex flex-col w-full py-4 pl-14 gap-4",
            children: [/* @__PURE__ */ p("span", {
              className: "flex w-full items-start justify-between",
              children: /* @__PURE__ */ P("form", {
                className: "w-full flex flex-col gap-4 relative",
                onSubmit: (y) => {
                  y.preventDefault(), s.performSearch();
                },
                children: [/* @__PURE__ */ p("input", {
                  value: n.query,
                  onChange: (y) => s.setQuery(y.target.value),
                  placeholder: t.searchPlaceholder ?? "Search in natural language...",
                  type: "text",
                  className: "pl-3 block w-full rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:hover:cursor-not-allowed ring-gray-300 focus:ring-primary"
                }), /* @__PURE__ */ p($d, {
                  className: "absolute right-4 top-4 w-4 h-4 text-orange-300"
                }), !d.isLoading && g && d.executionTime && /* @__PURE__ */ P("p", {
                  children: ["You have ", (S = d.items) == null ? void 0 : S.length, " research results in", /* @__PURE__ */ P("b", {
                    children: [" ", (d.executionTime / 1e3).toFixed(2), " seconds"]
                  }), ' for "', n.query, '"', a.originalSearchResultsURL && /* @__PURE__ */ p(qr, {
                    to: a.originalSearchResultsURL.replace("${query}", n.query),
                    target: "_new",
                    children: /* @__PURE__ */ p(qi, {
                      className: "h-4 w-4",
                      "aria-hidden": "true"
                    })
                  })]
                })]
              })
            }), i.length > 0 && /* @__PURE__ */ P("p", {
              children: [/* @__PURE__ */ p("button", {
                onClick: () => {
                  l();
                },
                className: "mr-2 hover:underline",
                children: "Clear active categories"
              }), /* @__PURE__ */ p("span", {
                className: "inline flex-row space-x-2",
                children: i.map((y) => /* @__PURE__ */ p(Ht, {
                  title: y.name,
                  isCancelVisible: !0,
                  isSelected: !0,
                  selectedColor: t.colors.primary,
                  onCancel: () => f([y])
                }, `${y.categorySlug}-${y.name}`))
              })]
            }), n.isDeveloperViewToggled && i.length > 0 && /* @__PURE__ */ p("div", {
              className: "text-xl leading-none",
              children: c()
            }), /* @__PURE__ */ p(Wi, {
              isLoading: d.isLoading,
              isError: !1,
              isSuccess: d.isSuccess,
              loadingMessage: "Loading content",
              isNoResults: !d.isLoading && m,
              loadingSpinnerColor: "black",
              children: /* @__PURE__ */ p(et, {
                children: /* @__PURE__ */ p("section", {
                  children: /* @__PURE__ */ p("ul", {
                    className: "flex flex-col gap-6",
                    children: (b = d.items) == null ? void 0 : b.map((y) => {
                      var w;
                      return /* @__PURE__ */ p(xf, {
                        cardProperties: {
                          id: y.id,
                          description: y.description,
                          accuracy: y.score || 0,
                          imageUrl: y.imageSrc,
                          redirectUrl: y.externalUrl,
                          subtitle: (w = y.meta) == null ? void 0 : w.subtitle,
                          tooltipContent: y.embeddingText,
                          title: y.title
                        },
                        primaryColor: t.colors.primary,
                        secondaryColor: t.colors.secondary,
                        isDeveloperView: n.isDeveloperViewToggled,
                        onMoreLikeThis: (R) => {
                          s.setQuery(`More Like: ${y.title}`), s.performMoreLikeThis(R);
                        }
                      }, y.id);
                    })
                  })
                })
              })
            })]
          })]
        })
      })
    })]
  });
}, Cf = new Wo({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1
    }
  }
}), Sf = (t) => {
  const e = {
    [_t.PRODUCT]: /* @__PURE__ */ p(bf, {
      brandingConfiguration: t.branding
    }),
    [_t.PUBLISHER]: /* @__PURE__ */ p(Ef, {
      brandingConfiguration: t.branding
    })
  };
  return /* @__PURE__ */ p(Jo, {
    client: Cf,
    children: /* @__PURE__ */ p(_u, {
      children: /* @__PURE__ */ p(yd, {
        adapter: Id,
        children: /* @__PURE__ */ p(Dd, {
          configuration: t,
          children: /* @__PURE__ */ p(Pu, {
            children: /* @__PURE__ */ p(Ni, {
              path: "*",
              element: e[t.template]
            })
          })
        })
      })
    })
  });
};
function Of(t) {
  return Sf(ui(t));
}
export {
  ot as ECustomerAPIType,
  _t as EDemoTemplate,
  je as EFiltersType,
  Of as generateTampleteWithConfig
};
