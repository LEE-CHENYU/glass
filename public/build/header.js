// src/ui/assets/lit-core-2.7.4.min.js
var t = window;
var i = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var e = /* @__PURE__ */ new WeakMap();
var o = class {
  constructor(t2, e2, i2) {
    if (this._$cssResult$ = true, i2 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.i;
    const s2 = this.t;
    if (i && void 0 === t2) {
      const i2 = void 0 !== s2 && 1 === s2.length;
      i2 && (t2 = e.get(s2)), void 0 === t2 && ((this.i = t2 = new CSSStyleSheet()).replaceSync(this.cssText), i2 && e.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
var n = (t2) => new o("string" == typeof t2 ? t2 : t2 + "", void 0, s);
var r = (t2, ...e2) => {
  const i2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, i3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[i3 + 1], t2[0]);
  return new o(i2, t2, s);
};
var h = (e2, s2) => {
  i ? e2.adoptedStyleSheets = s2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : s2.forEach((s3) => {
    const i2 = document.createElement("style"), n2 = t.litNonce;
    void 0 !== n2 && i2.setAttribute("nonce", n2), i2.textContent = s3.cssText, e2.appendChild(i2);
  });
};
var l = i ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return n(e2);
})(t2) : t2;
var a;
var u = window;
var c = u.trustedTypes;
var d = c ? c.emptyScript : "";
var v = u.reactiveElementPolyfillSupport;
var p = { toAttribute(t2, e2) {
  switch (e2) {
    case Boolean:
      t2 = t2 ? d : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, e2) {
  let s2 = t2;
  switch (e2) {
    case Boolean:
      s2 = null !== t2;
      break;
    case Number:
      s2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
} };
var f = (t2, e2) => e2 !== t2 && (e2 == e2 || t2 == t2);
var m = { attribute: true, type: String, converter: p, reflect: false, hasChanged: f };
var y = "finalized";
var _ = class extends HTMLElement {
  constructor() {
    super(), this.o = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this.l = null, this.u();
  }
  static addInitializer(t2) {
    var e2;
    this.finalize(), (null !== (e2 = this.v) && void 0 !== e2 ? e2 : this.v = []).push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((e2, s2) => {
      const i2 = this.p(s2, e2);
      void 0 !== i2 && (this.m.set(i2, s2), t2.push(i2));
    }), t2;
  }
  static createProperty(t2, e2 = m) {
    if (e2.state && (e2.attribute = false), this.finalize(), this.elementProperties.set(t2, e2), !e2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = "symbol" == typeof t2 ? Symbol() : "__" + t2, i2 = this.getPropertyDescriptor(t2, s2, e2);
      void 0 !== i2 && Object.defineProperty(this.prototype, t2, i2);
    }
  }
  static getPropertyDescriptor(t2, e2, s2) {
    return { get() {
      return this[e2];
    }, set(i2) {
      const n2 = this[t2];
      this[e2] = i2, this.requestUpdate(t2, n2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || m;
  }
  static finalize() {
    if (this.hasOwnProperty(y)) return false;
    this[y] = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), void 0 !== t2.v && (this.v = [...t2.v]), this.elementProperties = new Map(t2.elementProperties), this.m = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, e2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of e2) this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(t2) {
    const e2 = [];
    if (Array.isArray(t2)) {
      const s2 = new Set(t2.flat(1 / 0).reverse());
      for (const t3 of s2) e2.unshift(l(t3));
    } else void 0 !== t2 && e2.push(l(t2));
    return e2;
  }
  static p(t2, e2) {
    const s2 = e2.attribute;
    return false === s2 ? void 0 : "string" == typeof s2 ? s2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  u() {
    var t2;
    this._ = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this.g(), this.requestUpdate(), null === (t2 = this.constructor.v) || void 0 === t2 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var e2, s2;
    (null !== (e2 = this.S) && void 0 !== e2 ? e2 : this.S = []).push(t2), void 0 !== this.renderRoot && this.isConnected && (null === (s2 = t2.hostConnected) || void 0 === s2 || s2.call(t2));
  }
  removeController(t2) {
    var e2;
    null === (e2 = this.S) || void 0 === e2 || e2.splice(this.S.indexOf(t2) >>> 0, 1);
  }
  g() {
    this.constructor.elementProperties.forEach((t2, e2) => {
      this.hasOwnProperty(e2) && (this.o.set(e2, this[e2]), delete this[e2]);
    });
  }
  createRenderRoot() {
    var t2;
    const e2 = null !== (t2 = this.shadowRoot) && void 0 !== t2 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return h(e2, this.constructor.elementStyles), e2;
  }
  connectedCallback() {
    var t2;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t2 = this.S) || void 0 === t2 || t2.forEach((t3) => {
      var e2;
      return null === (e2 = t3.hostConnected) || void 0 === e2 ? void 0 : e2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    null === (t2 = this.S) || void 0 === t2 || t2.forEach((t3) => {
      var e2;
      return null === (e2 = t3.hostDisconnected) || void 0 === e2 ? void 0 : e2.call(t3);
    });
  }
  attributeChangedCallback(t2, e2, s2) {
    this._$AK(t2, s2);
  }
  $(t2, e2, s2 = m) {
    var i2;
    const n2 = this.constructor.p(t2, s2);
    if (void 0 !== n2 && true === s2.reflect) {
      const o2 = (void 0 !== (null === (i2 = s2.converter) || void 0 === i2 ? void 0 : i2.toAttribute) ? s2.converter : p).toAttribute(e2, s2.type);
      this.l = t2, null == o2 ? this.removeAttribute(n2) : this.setAttribute(n2, o2), this.l = null;
    }
  }
  _$AK(t2, e2) {
    var s2;
    const i2 = this.constructor, n2 = i2.m.get(t2);
    if (void 0 !== n2 && this.l !== n2) {
      const t3 = i2.getPropertyOptions(n2), o2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== (null === (s2 = t3.converter) || void 0 === s2 ? void 0 : s2.fromAttribute) ? t3.converter : p;
      this.l = n2, this[n2] = o2.fromAttribute(e2, t3.type), this.l = null;
    }
  }
  requestUpdate(t2, e2, s2) {
    let i2 = true;
    void 0 !== t2 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || f)(this[t2], e2) ? (this._$AL.has(t2) || this._$AL.set(t2, e2), true === s2.reflect && this.l !== t2 && (void 0 === this.C && (this.C = /* @__PURE__ */ new Map()), this.C.set(t2, s2))) : i2 = false), !this.isUpdatePending && i2 && (this._ = this.T());
  }
  async T() {
    this.isUpdatePending = true;
    try {
      await this._;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this.o && (this.o.forEach((t3, e3) => this[e3] = t3), this.o = void 0);
    let e2 = false;
    const s2 = this._$AL;
    try {
      e2 = this.shouldUpdate(s2), e2 ? (this.willUpdate(s2), null === (t2 = this.S) || void 0 === t2 || t2.forEach((t3) => {
        var e3;
        return null === (e3 = t3.hostUpdate) || void 0 === e3 ? void 0 : e3.call(t3);
      }), this.update(s2)) : this.P();
    } catch (t3) {
      throw e2 = false, this.P(), t3;
    }
    e2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var e2;
    null === (e2 = this.S) || void 0 === e2 || e2.forEach((t3) => {
      var e3;
      return null === (e3 = t3.hostUpdated) || void 0 === e3 ? void 0 : e3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  P() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    void 0 !== this.C && (this.C.forEach((t3, e2) => this.$(e2, this[e2], t3)), this.C = void 0), this.P();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
var b;
_[y] = true, _.elementProperties = /* @__PURE__ */ new Map(), _.elementStyles = [], _.shadowRootOptions = { mode: "open" }, null == v || v({ ReactiveElement: _ }), (null !== (a = u.reactiveElementVersions) && void 0 !== a ? a : u.reactiveElementVersions = []).push("1.6.1");
var g = window;
var w = g.trustedTypes;
var S = w ? w.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0;
var $ = "$lit$";
var C = `lit$${(Math.random() + "").slice(9)}$`;
var T = "?" + C;
var P = `<${T}>`;
var x = document;
var A = () => x.createComment("");
var k = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2;
var E = Array.isArray;
var M = (t2) => E(t2) || "function" == typeof (null == t2 ? void 0 : t2[Symbol.iterator]);
var U = "[ 	\n\f\r]";
var N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var R = /-->/g;
var O = />/g;
var V = RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var j = /'/g;
var z = /"/g;
var L = /^(?:script|style|textarea|title)$/i;
var I = (t2) => (e2, ...s2) => ({ _$litType$: t2, strings: e2, values: s2 });
var H = I(1);
var B = I(2);
var D = Symbol.for("lit-noChange");
var q = Symbol.for("lit-nothing");
var J = /* @__PURE__ */ new WeakMap();
var W = x.createTreeWalker(x, 129, null, false);
var Z = (t2, e2) => {
  const s2 = t2.length - 1, i2 = [];
  let n2, o2 = 2 === e2 ? "<svg>" : "", r2 = N;
  for (let e3 = 0; e3 < s2; e3++) {
    const s3 = t2[e3];
    let l3, h2, a2 = -1, d2 = 0;
    for (; d2 < s3.length && (r2.lastIndex = d2, h2 = r2.exec(s3), null !== h2); ) d2 = r2.lastIndex, r2 === N ? "!--" === h2[1] ? r2 = R : void 0 !== h2[1] ? r2 = O : void 0 !== h2[2] ? (L.test(h2[2]) && (n2 = RegExp("</" + h2[2], "g")), r2 = V) : void 0 !== h2[3] && (r2 = V) : r2 === V ? ">" === h2[0] ? (r2 = null != n2 ? n2 : N, a2 = -1) : void 0 === h2[1] ? a2 = -2 : (a2 = r2.lastIndex - h2[2].length, l3 = h2[1], r2 = void 0 === h2[3] ? V : '"' === h2[3] ? z : j) : r2 === z || r2 === j ? r2 = V : r2 === R || r2 === O ? r2 = N : (r2 = V, n2 = void 0);
    const c2 = r2 === V && t2[e3 + 1].startsWith("/>") ? " " : "";
    o2 += r2 === N ? s3 + P : a2 >= 0 ? (i2.push(l3), s3.slice(0, a2) + $ + s3.slice(a2) + C + c2) : s3 + C + (-2 === a2 ? (i2.push(void 0), e3) : c2);
  }
  const l2 = o2 + (t2[s2] || "<?>") + (2 === e2 ? "</svg>" : "");
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return [void 0 !== S ? S.createHTML(l2) : l2, i2];
};
var F = class _F {
  constructor({ strings: t2, _$litType$: e2 }, s2) {
    let i2;
    this.parts = [];
    let n2 = 0, o2 = 0;
    const r2 = t2.length - 1, l2 = this.parts, [h2, a2] = Z(t2, e2);
    if (this.el = _F.createElement(h2, s2), W.currentNode = this.el.content, 2 === e2) {
      const t3 = this.el.content, e3 = t3.firstChild;
      e3.remove(), t3.append(...e3.childNodes);
    }
    for (; null !== (i2 = W.nextNode()) && l2.length < r2; ) {
      if (1 === i2.nodeType) {
        if (i2.hasAttributes()) {
          const t3 = [];
          for (const e3 of i2.getAttributeNames()) if (e3.endsWith($) || e3.startsWith(C)) {
            const s3 = a2[o2++];
            if (t3.push(e3), void 0 !== s3) {
              const t4 = i2.getAttribute(s3.toLowerCase() + $).split(C), e4 = /([.?@])?(.*)/.exec(s3);
              l2.push({ type: 1, index: n2, name: e4[2], strings: t4, ctor: "." === e4[1] ? Y : "?" === e4[1] ? it : "@" === e4[1] ? st : X });
            } else l2.push({ type: 6, index: n2 });
          }
          for (const e3 of t3) i2.removeAttribute(e3);
        }
        if (L.test(i2.tagName)) {
          const t3 = i2.textContent.split(C), e3 = t3.length - 1;
          if (e3 > 0) {
            i2.textContent = w ? w.emptyScript : "";
            for (let s3 = 0; s3 < e3; s3++) i2.append(t3[s3], A()), W.nextNode(), l2.push({ type: 2, index: ++n2 });
            i2.append(t3[e3], A());
          }
        }
      } else if (8 === i2.nodeType) if (i2.data === T) l2.push({ type: 2, index: n2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = i2.data.indexOf(C, t3 + 1)); ) l2.push({ type: 7, index: n2 }), t3 += C.length - 1;
      }
      n2++;
    }
  }
  static createElement(t2, e2) {
    const s2 = x.createElement("template");
    return s2.innerHTML = t2, s2;
  }
};
function G(t2, e2, s2 = t2, i2) {
  var n2, o2, r2, l2;
  if (e2 === D) return e2;
  let h2 = void 0 !== i2 ? null === (n2 = s2.A) || void 0 === n2 ? void 0 : n2[i2] : s2.k;
  const a2 = k(e2) ? void 0 : e2._$litDirective$;
  return (null == h2 ? void 0 : h2.constructor) !== a2 && (null === (o2 = null == h2 ? void 0 : h2._$AO) || void 0 === o2 || o2.call(h2, false), void 0 === a2 ? h2 = void 0 : (h2 = new a2(t2), h2._$AT(t2, s2, i2)), void 0 !== i2 ? (null !== (r2 = (l2 = s2).A) && void 0 !== r2 ? r2 : l2.A = [])[i2] = h2 : s2.k = h2), void 0 !== h2 && (e2 = G(t2, h2._$AS(t2, e2.values), h2, i2)), e2;
}
var K = class {
  constructor(t2, e2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = e2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  M(t2) {
    var e2;
    const { el: { content: s2 }, parts: i2 } = this._$AD, n2 = (null !== (e2 = null == t2 ? void 0 : t2.creationScope) && void 0 !== e2 ? e2 : x).importNode(s2, true);
    W.currentNode = n2;
    let o2 = W.nextNode(), r2 = 0, l2 = 0, h2 = i2[0];
    for (; void 0 !== h2; ) {
      if (r2 === h2.index) {
        let e3;
        2 === h2.type ? e3 = new Q(o2, o2.nextSibling, this, t2) : 1 === h2.type ? e3 = new h2.ctor(o2, h2.name, h2.strings, this, t2) : 6 === h2.type && (e3 = new et(o2, this, t2)), this._$AV.push(e3), h2 = i2[++l2];
      }
      r2 !== (null == h2 ? void 0 : h2.index) && (o2 = W.nextNode(), r2++);
    }
    return n2;
  }
  U(t2) {
    let e2 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, e2), e2 += s2.strings.length - 2) : s2._$AI(t2[e2])), e2++;
  }
};
var Q = class _Q {
  constructor(t2, e2, s2, i2) {
    var n2;
    this.type = 2, this._$AH = q, this._$AN = void 0, this._$AA = t2, this._$AB = e2, this._$AM = s2, this.options = i2, this.N = null === (n2 = null == i2 ? void 0 : i2.isConnected) || void 0 === n2 || n2;
  }
  get _$AU() {
    var t2, e2;
    return null !== (e2 = null === (t2 = this._$AM) || void 0 === t2 ? void 0 : t2._$AU) && void 0 !== e2 ? e2 : this.N;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const e2 = this._$AM;
    return void 0 !== e2 && 11 === (null == t2 ? void 0 : t2.nodeType) && (t2 = e2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, e2 = this) {
    t2 = G(this, t2, e2), k(t2) ? t2 === q || null == t2 || "" === t2 ? (this._$AH !== q && this._$AR(), this._$AH = q) : t2 !== this._$AH && t2 !== D && this.R(t2) : void 0 !== t2._$litType$ ? this.O(t2) : void 0 !== t2.nodeType ? this.V(t2) : M(t2) ? this.j(t2) : this.R(t2);
  }
  L(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  V(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.L(t2));
  }
  R(t2) {
    this._$AH !== q && k(this._$AH) ? this._$AA.nextSibling.data = t2 : this.V(x.createTextNode(t2)), this._$AH = t2;
  }
  O(t2) {
    var e2;
    const { values: s2, _$litType$: i2 } = t2, n2 = "number" == typeof i2 ? this._$AC(t2) : (void 0 === i2.el && (i2.el = F.createElement(i2.h, this.options)), i2);
    if ((null === (e2 = this._$AH) || void 0 === e2 ? void 0 : e2._$AD) === n2) this._$AH.U(s2);
    else {
      const t3 = new K(n2, this), e3 = t3.M(this.options);
      t3.U(s2), this.V(e3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let e2 = J.get(t2.strings);
    return void 0 === e2 && J.set(t2.strings, e2 = new F(t2)), e2;
  }
  j(t2) {
    E(this._$AH) || (this._$AH = [], this._$AR());
    const e2 = this._$AH;
    let s2, i2 = 0;
    for (const n2 of t2) i2 === e2.length ? e2.push(s2 = new _Q(this.L(A()), this.L(A()), this, this.options)) : s2 = e2[i2], s2._$AI(n2), i2++;
    i2 < e2.length && (this._$AR(s2 && s2._$AB.nextSibling, i2), e2.length = i2);
  }
  _$AR(t2 = this._$AA.nextSibling, e2) {
    var s2;
    for (null === (s2 = this._$AP) || void 0 === s2 || s2.call(this, false, true, e2); t2 && t2 !== this._$AB; ) {
      const e3 = t2.nextSibling;
      t2.remove(), t2 = e3;
    }
  }
  setConnected(t2) {
    var e2;
    void 0 === this._$AM && (this.N = t2, null === (e2 = this._$AP) || void 0 === e2 || e2.call(this, t2));
  }
};
var X = class {
  constructor(t2, e2, s2, i2, n2) {
    this.type = 1, this._$AH = q, this._$AN = void 0, this.element = t2, this.name = e2, this._$AM = i2, this.options = n2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = q;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, e2 = this, s2, i2) {
    const n2 = this.strings;
    let o2 = false;
    if (void 0 === n2) t2 = G(this, t2, e2, 0), o2 = !k(t2) || t2 !== this._$AH && t2 !== D, o2 && (this._$AH = t2);
    else {
      const i3 = t2;
      let r2, l2;
      for (t2 = n2[0], r2 = 0; r2 < n2.length - 1; r2++) l2 = G(this, i3[s2 + r2], e2, r2), l2 === D && (l2 = this._$AH[r2]), o2 || (o2 = !k(l2) || l2 !== this._$AH[r2]), l2 === q ? t2 = q : t2 !== q && (t2 += (null != l2 ? l2 : "") + n2[r2 + 1]), this._$AH[r2] = l2;
    }
    o2 && !i2 && this.I(t2);
  }
  I(t2) {
    t2 === q ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t2 ? t2 : "");
  }
};
var Y = class extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  I(t2) {
    this.element[this.name] = t2 === q ? void 0 : t2;
  }
};
var tt = w ? w.emptyScript : "";
var it = class extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  I(t2) {
    t2 && t2 !== q ? this.element.setAttribute(this.name, tt) : this.element.removeAttribute(this.name);
  }
};
var st = class extends X {
  constructor(t2, e2, s2, i2, n2) {
    super(t2, e2, s2, i2, n2), this.type = 5;
  }
  _$AI(t2, e2 = this) {
    var s2;
    if ((t2 = null !== (s2 = G(this, t2, e2, 0)) && void 0 !== s2 ? s2 : q) === D) return;
    const i2 = this._$AH, n2 = t2 === q && i2 !== q || t2.capture !== i2.capture || t2.once !== i2.once || t2.passive !== i2.passive, o2 = t2 !== q && (i2 === q || n2);
    n2 && this.element.removeEventListener(this.name, this, i2), o2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var e2, s2;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s2 = null === (e2 = this.options) || void 0 === e2 ? void 0 : e2.host) && void 0 !== s2 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
};
var et = class {
  constructor(t2, e2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = e2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    G(this, t2);
  }
};
var nt = g.litHtmlPolyfillSupport;
null == nt || nt(F, Q), (null !== (b = g.litHtmlVersions) && void 0 !== b ? b : g.litHtmlVersions = []).push("2.7.3");
var rt = (t2, e2, s2) => {
  var i2, n2;
  const o2 = null !== (i2 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== i2 ? i2 : e2;
  let r2 = o2._$litPart$;
  if (void 0 === r2) {
    const t3 = null !== (n2 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== n2 ? n2 : null;
    o2._$litPart$ = r2 = new Q(e2.insertBefore(A(), t3), t3, void 0, null != s2 ? s2 : {});
  }
  return r2._$AI(t2), r2;
};
var ht;
var lt;
var ut = class extends _ {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.st = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const s2 = super.createRenderRoot();
    return null !== (t2 = (e2 = this.renderOptions).renderBefore) && void 0 !== t2 || (e2.renderBefore = s2.firstChild), s2;
  }
  update(t2) {
    const e2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this.st = rt(e2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), null === (t2 = this.st) || void 0 === t2 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), null === (t2 = this.st) || void 0 === t2 || t2.setConnected(false);
  }
  render() {
    return D;
  }
};
ut.finalized = true, ut._$litElement$ = true, null === (ht = globalThis.litElementHydrateSupport) || void 0 === ht || ht.call(globalThis, { LitElement: ut });
var ct = globalThis.litElementPolyfillSupport;
null == ct || ct({ LitElement: ut });
(null !== (lt = globalThis.litElementVersions) && void 0 !== lt ? lt : globalThis.litElementVersions = []).push("3.3.2");

// src/ui/app/MainHeader.js
var MainHeader = class extends ut {
  static properties = {
    isTogglingSession: { type: Boolean, state: true },
    shortcuts: { type: Object, state: true },
    listenSessionStatus: { type: String, state: true }
  };
  static styles = r`
        :host {
            display: flex;
            transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease-out;
        }

        :host(.hiding) {
            animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.6, 1) forwards;
        }

        :host(.showing) {
            animation: slideDown 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        :host(.sliding-in) {
            animation: fadeIn 0.2s ease-out forwards;
        }

        :host(.hidden) {
            opacity: 0;
            transform: translateY(-150%) scale(0.85);
            pointer-events: none;
        }


        * {
            font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            cursor: default;
            user-select: none;
        }

        .header {
            -webkit-app-region: drag;
            width: max-content;
            height: 47px;
            padding: 2px 10px 2px 13px;
            background: transparent;
            overflow: hidden;
            border-radius: 9000px;
            /* backdrop-filter: blur(1px); */
            justify-content: space-between;
            align-items: center;
            display: inline-flex;
            box-sizing: border-box;
            position: relative;
        }

        .header::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 9000px;
            z-index: -1;
        }

        .header::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: 9000px;
            padding: 1px;
            background: linear-gradient(169deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.17) 100%); 
            -webkit-mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: destination-out;
            mask-composite: exclude;
            pointer-events: none;
        }

        .listen-button {
            -webkit-app-region: no-drag;
            height: 26px;
            padding: 0 13px;
            background: transparent;
            border-radius: 9000px;
            justify-content: center;
            width: 78px;
            align-items: center;
            gap: 6px;
            display: flex;
            border: none;
            cursor: pointer;
            position: relative;
        }

        .listen-button:disabled {
            cursor: default;
            opacity: 0.8;
        }

        .listen-button.active::before {
            background: rgba(215, 0, 0, 0.5);
        }

        .listen-button.active:hover::before {
            background: rgba(255, 20, 20, 0.6);
        }

        .listen-button.done {
            background-color: rgba(255, 255, 255, 0.6);
            transition: background-color 0.15s ease;
        }

        .listen-button.done .action-text-content {
            color: black;
        }
        
        .listen-button.done .listen-icon svg rect,
        .listen-button.done .listen-icon svg path {
            fill: black;
        }

        .listen-button.done:hover {
            background-color: #f0f0f0;
        }

        .listen-button:hover::before {
            background: rgba(255, 255, 255, 0.18);
        }

        .listen-button::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(255, 255, 255, 0.14);
            border-radius: 9000px;
            z-index: -1;
            transition: background 0.15s ease;
        }

        .listen-button::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: 9000px;
            padding: 1px;
            background: linear-gradient(169deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.17) 100%);
            -webkit-mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: destination-out;
            mask-composite: exclude;
            pointer-events: none;
        }

        .listen-button.done::after {
            display: none;
        }

        .loading-dots {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .loading-dots span {
            width: 6px;
            height: 6px;
            background-color: white;
            border-radius: 50%;
            animation: pulse 1.4s infinite ease-in-out both;
        }
        .loading-dots span:nth-of-type(1) {
            animation-delay: -0.32s;
        }
        .loading-dots span:nth-of-type(2) {
            animation-delay: -0.16s;
        }
        @keyframes pulse {
            0%, 80%, 100% {
                opacity: 0.2;
            }
            40% {
                opacity: 1.0;
            }
        }

        .header-actions {
            -webkit-app-region: no-drag;
            height: 26px;
            box-sizing: border-box;
            justify-content: flex-start;
            align-items: center;
            gap: 9px;
            display: flex;
            padding: 0 8px;
            border-radius: 6px;
            transition: background 0.15s ease;
        }

        .header-actions:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .ask-action {
            margin-left: 4px;
        }

        .action-button,
        .action-text {
            padding-bottom: 1px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            display: flex;
        }

        .action-text-content {
            color: white;
            font-size: 12px;
            font-family: 'Helvetica Neue', sans-serif;
            font-weight: 500; /* Medium */
            word-wrap: break-word;
        }

        .icon-container {
            justify-content: flex-start;
            align-items: center;
            gap: 4px;
            display: flex;
        }

        .icon-container.ask-icons svg,
        .icon-container.showhide-icons svg {
            width: 12px;
            height: 12px;
        }

        .listen-icon svg {
            width: 12px;
            height: 11px;
            position: relative;
            top: 1px;
        }

        .icon-box {
            color: white;
            font-size: 12px;
            font-family: 'Helvetica Neue', sans-serif;
            font-weight: 500;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 13%;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .settings-button {
            -webkit-app-region: no-drag;
            padding: 5px;
            border-radius: 50%;
            background: transparent;
            transition: background 0.15s ease;
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .settings-button:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .settings-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 3px;
        }

        .settings-icon svg {
            width: 16px;
            height: 16px;
        }
        /* ────────────────[ GLASS BYPASS ]─────────────── */
        :host-context(body.has-glass) .header,
        :host-context(body.has-glass) .listen-button,
        :host-context(body.has-glass) .header-actions,
        :host-context(body.has-glass) .settings-button {
            background: transparent !important;
            filter: none !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
        }
        :host-context(body.has-glass) .icon-box {
            background: transparent !important;
            border: none !important;
        }

        :host-context(body.has-glass) .header::before,
        :host-context(body.has-glass) .header::after,
        :host-context(body.has-glass) .listen-button::before,
        :host-context(body.has-glass) .listen-button::after {
            display: none !important;
        }

        :host-context(body.has-glass) .header-actions:hover,
        :host-context(body.has-glass) .settings-button:hover,
        :host-context(body.has-glass) .listen-button:hover::before {
            background: transparent !important;
        }
        :host-context(body.has-glass) * {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            filter: none !important;
            backdrop-filter: none !important;
            box-shadow: none !important;
        }

        :host-context(body.has-glass) .header,
        :host-context(body.has-glass) .listen-button,
        :host-context(body.has-glass) .header-actions,
        :host-context(body.has-glass) .settings-button,
        :host-context(body.has-glass) .icon-box {
            border-radius: 0 !important;
        }
        :host-context(body.has-glass) {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            will-change: auto !important;
        }
        `;
  constructor() {
    super();
    this.shortcuts = {};
    this.isVisible = true;
    this.isAnimating = false;
    this.hasSlidIn = false;
    this.settingsHideTimer = null;
    this.isTogglingSession = false;
    this.listenSessionStatus = "beforeSession";
    this.animationEndTimer = null;
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.dragState = null;
    this.wasJustDragged = false;
  }
  _getListenButtonText(status) {
    switch (status) {
      case "beforeSession":
        return "Listen";
      case "inSession":
        return "Stop";
      case "afterSession":
        return "Done";
      default:
        return "Listen";
    }
  }
  async handleMouseDown(e2) {
    e2.preventDefault();
    const initialPosition = await window.api.mainHeader.getHeaderPosition();
    this.dragState = {
      initialMouseX: e2.screenX,
      initialMouseY: e2.screenY,
      initialWindowX: initialPosition.x,
      initialWindowY: initialPosition.y,
      moved: false
    };
    window.addEventListener("mousemove", this.handleMouseMove, { capture: true });
    window.addEventListener("mouseup", this.handleMouseUp, { once: true, capture: true });
  }
  handleMouseMove(e2) {
    if (!this.dragState) return;
    const deltaX = Math.abs(e2.screenX - this.dragState.initialMouseX);
    const deltaY = Math.abs(e2.screenY - this.dragState.initialMouseY);
    if (deltaX > 3 || deltaY > 3) {
      this.dragState.moved = true;
    }
    const newWindowX = this.dragState.initialWindowX + (e2.screenX - this.dragState.initialMouseX);
    const newWindowY = this.dragState.initialWindowY + (e2.screenY - this.dragState.initialMouseY);
    window.api.mainHeader.moveHeaderTo(newWindowX, newWindowY);
  }
  handleMouseUp(e2) {
    if (!this.dragState) return;
    const wasDragged = this.dragState.moved;
    window.removeEventListener("mousemove", this.handleMouseMove, { capture: true });
    this.dragState = null;
    if (wasDragged) {
      this.wasJustDragged = true;
      setTimeout(() => {
        this.wasJustDragged = false;
      }, 0);
    }
  }
  toggleVisibility() {
    if (this.isAnimating) {
      console.log("[MainHeader] Animation already in progress, ignoring toggle");
      return;
    }
    if (this.animationEndTimer) {
      clearTimeout(this.animationEndTimer);
      this.animationEndTimer = null;
    }
    this.isAnimating = true;
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }
  hide() {
    this.classList.remove("showing");
    this.classList.add("hiding");
  }
  show() {
    this.classList.remove("hiding", "hidden");
    this.classList.add("showing");
  }
  handleAnimationEnd(e2) {
    if (e2.target !== this) return;
    this.isAnimating = false;
    if (this.classList.contains("hiding")) {
      this.classList.add("hidden");
      if (window.api) {
        window.api.mainHeader.sendHeaderAnimationFinished("hidden");
      }
    } else if (this.classList.contains("showing")) {
      if (window.api) {
        window.api.mainHeader.sendHeaderAnimationFinished("visible");
      }
    }
  }
  startSlideInAnimation() {
    if (this.hasSlidIn) return;
    this.classList.add("sliding-in");
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("animationend", this.handleAnimationEnd);
    if (window.api) {
      this._sessionStateTextListener = (event, { success }) => {
        if (success) {
          this.listenSessionStatus = {
            beforeSession: "inSession",
            inSession: "afterSession",
            afterSession: "beforeSession"
          }[this.listenSessionStatus] || "beforeSession";
        } else {
          this.listenSessionStatus = "beforeSession";
        }
        this.isTogglingSession = false;
      };
      window.api.mainHeader.onListenChangeSessionResult(this._sessionStateTextListener);
      this._shortcutListener = (event, keybinds) => {
        console.log("[MainHeader] Received updated shortcuts:", keybinds);
        this.shortcuts = keybinds;
      };
      window.api.mainHeader.onShortcutsUpdated(this._shortcutListener);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("animationend", this.handleAnimationEnd);
    if (this.animationEndTimer) {
      clearTimeout(this.animationEndTimer);
      this.animationEndTimer = null;
    }
    if (window.api) {
      if (this._sessionStateTextListener) {
        window.api.mainHeader.removeOnListenChangeSessionResult(this._sessionStateTextListener);
      }
      if (this._shortcutListener) {
        window.api.mainHeader.removeOnShortcutsUpdated(this._shortcutListener);
      }
    }
  }
  showSettingsWindow(element) {
    if (this.wasJustDragged) return;
    if (window.api) {
      console.log(`[MainHeader] showSettingsWindow called at ${Date.now()}`);
      window.api.mainHeader.showSettingsWindow();
    }
  }
  hideSettingsWindow() {
    if (this.wasJustDragged) return;
    if (window.api) {
      console.log(`[MainHeader] hideSettingsWindow called at ${Date.now()}`);
      window.api.mainHeader.hideSettingsWindow();
    }
  }
  async _handleListenClick() {
    if (this.wasJustDragged) return;
    if (this.isTogglingSession) {
      return;
    }
    this.isTogglingSession = true;
    try {
      const listenButtonText = this._getListenButtonText(this.listenSessionStatus);
      if (window.api) {
        await window.api.mainHeader.sendListenButtonClick(listenButtonText);
      }
    } catch (error) {
      console.error("IPC invoke for session change failed:", error);
      this.isTogglingSession = false;
    }
  }
  async _handleAskClick() {
    if (this.wasJustDragged) return;
    try {
      if (window.api) {
        await window.api.mainHeader.sendAskButtonClick();
      }
    } catch (error) {
      console.error("IPC invoke for ask button failed:", error);
    }
  }
  async _handleToggleAllWindowsVisibility() {
    if (this.wasJustDragged) return;
    try {
      if (window.api) {
        await window.api.mainHeader.sendToggleAllWindowsVisibility();
      }
    } catch (error) {
      console.error("IPC invoke for all windows visibility button failed:", error);
    }
  }
  renderShortcut(accelerator) {
    if (!accelerator) return H``;
    const keyMap = {
      "Cmd": "\u2318",
      "Command": "\u2318",
      "Ctrl": "\u2303",
      "Control": "\u2303",
      "Alt": "\u2325",
      "Option": "\u2325",
      "Shift": "\u21E7",
      "Enter": "\u21B5",
      "Backspace": "\u232B",
      "Delete": "\u2326",
      "Tab": "\u21E5",
      "Escape": "\u238B",
      "Up": "\u2191",
      "Down": "\u2193",
      "Left": "\u2190",
      "Right": "\u2192",
      "\\": H`<svg viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:6px; height:12px;"><path d="M1.5 1.3L5.1 10.6" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    };
    const keys = accelerator.split("+");
    return H`${keys.map((key) => H`
            <div class="icon-box">${keyMap[key] || key}</div>
        `)}`;
  }
  render() {
    const listenButtonText = this._getListenButtonText(this.listenSessionStatus);
    const buttonClasses = {
      active: listenButtonText === "Stop",
      done: listenButtonText === "Done"
    };
    const showStopIcon = listenButtonText === "Stop" || listenButtonText === "Done";
    return H`
            <div class="header" @mousedown=${this.handleMouseDown}>
                <button 
                    class="listen-button ${Object.keys(buttonClasses).filter((k2) => buttonClasses[k2]).join(" ")}"
                    @click=${this._handleListenClick}
                    ?disabled=${this.isTogglingSession}
                >
                    ${this.isTogglingSession ? H`
                            <div class="loading-dots">
                                <span></span><span></span><span></span>
                            </div>
                        ` : H`
                            <div class="action-text">
                                <div class="action-text-content">${listenButtonText}</div>
                            </div>
                            <div class="listen-icon">
                                ${showStopIcon ? H`
                                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="9" height="9" rx="1" fill="white"/>
                                        </svg>
                                    ` : H`
                                        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.69922 2.7515C1.69922 2.37153 2.00725 2.0635 2.38722 2.0635H2.73122C3.11119 2.0635 3.41922 2.37153 3.41922 2.7515V8.2555C3.41922 8.63547 3.11119 8.9435 2.73122 8.9435H2.38722C2.00725 8.9435 1.69922 8.63547 1.69922 8.2555V2.7515Z" fill="white"/>
                                            <path d="M5.13922 1.3755C5.13922 0.995528 5.44725 0.6875 5.82722 0.6875H6.17122C6.55119 0.6875 6.85922 0.995528 6.85922 1.3755V9.6315C6.85922 10.0115 6.55119 10.3195 6.17122 10.3195H5.82722C5.44725 10.3195 5.13922 10.0115 5.13922 9.6315V1.3755Z" fill="white"/>
                                            <path d="M8.57922 3.0955C8.57922 2.71553 8.88725 2.4075 9.26722 2.4075H9.61122C9.99119 2.4075 10.2992 2.71553 10.2992 3.0955V7.9115C10.2992 8.29147 9.99119 8.5995 9.61122 8.5995H9.26722C8.88725 8.5995 8.57922 8.29147 8.57922 7.9115V3.0955Z" fill="white"/>
                                        </svg>
                                    `}
                            </div>
                        `}
                </button>

                <div class="header-actions ask-action" @click=${() => this._handleAskClick()}>
                    <div class="action-text">
                        <div class="action-text-content">Ask</div>
                    </div>
                    <div class="icon-container">
                        ${this.renderShortcut(this.shortcuts.nextStep)}
                    </div>
                </div>

                <div class="header-actions" @click=${() => this._handleToggleAllWindowsVisibility()}>
                    <div class="action-text">
                        <div class="action-text-content">Show/Hide</div>
                    </div>
                    <div class="icon-container">
                        ${this.renderShortcut(this.shortcuts.toggleVisibility)}
                    </div>
                </div>

                <button 
                    class="settings-button"
                    @mouseenter=${(e2) => this.showSettingsWindow(e2.currentTarget)}
                    @mouseleave=${() => this.hideSettingsWindow()}
                >
                    <div class="settings-icon">
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.0013 3.16406C7.82449 3.16406 7.65492 3.2343 7.5299 3.35932C7.40487 3.48435 7.33464 3.65392 7.33464 3.83073C7.33464 4.00754 7.40487 4.17711 7.5299 4.30213C7.65492 4.42716 7.82449 4.4974 8.0013 4.4974C8.17811 4.4974 8.34768 4.42716 8.47271 4.30213C8.59773 4.17711 8.66797 4.00754 8.66797 3.83073C8.66797 3.65392 8.59773 3.48435 8.47271 3.35932C8.34768 3.2343 8.17811 3.16406 8.0013 3.16406ZM8.0013 7.83073C7.82449 7.83073 7.65492 7.90097 7.5299 8.02599C7.40487 8.15102 7.33464 8.32058 7.33464 8.4974C7.33464 8.67421 7.40487 8.84378 7.5299 8.9688C7.65492 9.09382 7.82449 9.16406 8.0013 9.16406C8.17811 9.16406 8.34768 9.09382 8.47271 8.9688C8.59773 8.84378 8.66797 8.67421 8.66797 8.4974C8.66797 8.32058 8.59773 8.15102 8.47271 8.02599C8.34768 7.90097 8.17811 7.83073 8.0013 7.83073ZM8.0013 12.4974C7.82449 12.4974 7.65492 12.5676 7.5299 12.6927C7.40487 12.8177 7.33464 12.9873 7.33464 13.1641C7.33464 13.3409 7.40487 13.5104 7.5299 13.6355C7.65492 13.7605 7.82449 13.8307 8.0013 13.8307C8.17811 13.8307 8.34768 13.7605 8.47271 13.6355C8.59773 13.5104 8.66797 13.3409 8.66797 13.1641C8.66797 12.9873 8.59773 12.8177 8.47271 12.6927C8.34768 12.5676 8.17811 12.4974 8.0013 12.4974Z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </button>
            </div>
        `;
  }
};
customElements.define("main-header", MainHeader);

// src/ui/app/ApiKeyHeader.js
var ApiKeyHeader = class extends ut {
  //////// after_modelStateService ////////
  static properties = {
    llmApiKey: { type: String },
    sttApiKey: { type: String },
    llmProvider: { type: String },
    sttProvider: { type: String },
    isLoading: { type: Boolean },
    errorMessage: { type: String },
    successMessage: { type: String },
    providers: { type: Object, state: true },
    modelSuggestions: { type: Array, state: true },
    userModelHistory: { type: Array, state: true },
    selectedLlmModel: { type: String, state: true },
    selectedSttModel: { type: String, state: true },
    ollamaStatus: { type: Object, state: true },
    installingModel: { type: String, state: true },
    installProgress: { type: Number, state: true },
    whisperInstallingModels: { type: Object, state: true },
    backCallback: { type: Function },
    llmError: { type: String },
    sttError: { type: String }
  };
  //////// after_modelStateService ////////
  static styles = r`
        :host {
            display: block;
            font-family:
                'Inter',
                -apple-system,
                BlinkMacSystemFont,
                'Segoe UI',
                Roboto,
                sans-serif;
        }
        * {
            box-sizing: border-box;
        }
        .container {
            width: 100%;
            height: 100%;
            padding: 24px 16px;
            background: rgba(0, 0, 0, 0.64);
            box-shadow: 0px 0px 0px 1.5px rgba(255, 255, 255, 0.64) inset;
            border-radius: 16px;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 24px;
            display: flex;
            -webkit-app-region: drag;
        }
        .header {
            width: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 8px;
        }
        .close-button {
            -webkit-app-region: no-drag;
            position: absolute;
            top: 16px;
            right: 16px;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 5px;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s ease;
            z-index: 10;
            font-size: 16px;
            line-height: 1;
            padding: 0;
        }
        .close-button:hover {
            background: rgba(255, 255, 255, 0.2);
            color: rgba(255, 255, 255, 0.9);
        }
        .back-button {
            -webkit-app-region: no-drag;
            padding: 8px;
            left: 0px;
            top: -7px;
            position: absolute;
            background: rgba(132.6, 132.6, 132.6, 0.8);
            border-radius: 16px;
            border: 0.5px solid rgba(255, 255, 255, 0.5);
            justify-content: center;
            align-items: center;
            gap: 4px;
            display: flex;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        .back-button:hover {
            background: rgba(150, 150, 150, 0.9);
        }
        .arrow-icon-left {
            border: solid #dcdcdc;
            border-width: 0 1.2px 1.2px 0;
            display: inline-block;
            padding: 3px;
            transform: rotate(135deg);
        }
        .back-button-text {
            color: white;
            font-size: 12px;
            font-weight: 500;
            padding-right: 4px;
        }
        .title {
            color: white;
            font-size: 14px;
            font-weight: 700;
        }
        .section {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .row {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .label {
            color: white;
            font-size: 12px;
            font-weight: 600;
        }
        .provider-selector {
            display: flex;
            width: 240px;
            overflow: hidden;
            border-radius: 12px;
            border: 0.5px solid rgba(255, 255, 255, 0.5);
        }
        .provider-button {
            -webkit-app-region: no-drag;
            padding: 4px 8px;
            background: rgba(20.4, 20.4, 20.4, 0.32);
            color: #dcdcdc;
            font-size: 11px;
            font-weight: 450;
            letter-spacing: 0.11px;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s ease;
            flex: 1;
        }
        .provider-button:hover {
            background: rgba(80, 80, 80, 0.48);
        }
        .provider-button[data-status='active'] {
            background: rgba(142.8, 142.8, 142.8, 0.48);
            color: white;
        }
        .api-input {
            -webkit-app-region: no-drag;
            width: 240px;
            padding: 10px 8px;
            background: rgba(61.2, 61.2, 61.2, 0.8);
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.24);
            color: white;
            font-size: 11px;
            text-overflow: ellipsis;
            font-family: inherit;
            line-height: inherit;
        }
        .ollama-action-button {
            -webkit-app-region: no-drag;
            width: 240px;
            padding: 10px 8px;
            border-radius: 16px;
            border: none;
            color: white;
            font-size: 12px;
            font-weight: 500;
            font-family: inherit;
            cursor: pointer;
            text-align: center;
            transition: background-color 0.2s ease;
        }
        .ollama-action-button.install {
            background: rgba(0, 122, 255, 0.2);
        }
        .ollama-action-button.start {
            background: rgba(255, 200, 0, 0.2);
        }
        select.api-input {
            -webkit-appearance: none;
            appearance: none;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
            background-position: right 0.5rem center;
            background-repeat: no-repeat;
            background-size: 1.5em 1.5em;
            padding-right: 2.5rem;
        }
        select.api-input option {
            background: #333;
            color: white;
        }
        .api-input::placeholder {
            color: #a0a0a0;
        }
        .confirm-button-container {
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }
        .confirm-button {
            -webkit-app-region: no-drag;
            width: 240px;
            padding: 8px;
            background: rgba(132.6, 132.6, 132.6, 0.8);
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.16);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            color: white;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        .confirm-button:hover {
            background: rgba(150, 150, 150, 0.9);
        }
        .confirm-button:disabled {
            background: rgba(255, 255, 255, 0.12);
            color: #bebebe;
            border: 0.5px solid rgba(255, 255, 255, 0.24);
            box-shadow: none;
            cursor: not-allowed;
        }
        .footer {
            width: 100%;
            text-align: center;
            color: #dcdcdc;
            font-size: 12px;
            font-weight: 500;
            line-height: 18px;
        }
        .footer-link {
            text-decoration: underline;
            cursor: pointer;
            -webkit-app-region: no-drag;
        }
        .error-message,
        .success-message {
            position: absolute;
            bottom: 70px;
            left: 16px;
            right: 16px;
            text-align: center;
            font-size: 11px;
            font-weight: 500;
            padding: 4px;
            border-radius: 4px;
        }
        .error-message {
            color: rgba(239, 68, 68, 0.9);
        }
        .success-message {
            color: rgba(74, 222, 128, 0.9);
        }
        .message-fade-out {
            animation: fadeOut 3s ease-in-out forwards;
        }
        @keyframes fadeOut {
            0% {
                opacity: 1;
            }
            66% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
        .sliding-out {
            animation: slideOut 0.3s ease-out forwards;
        }
        @keyframes slideOut {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(-100%);
                opacity: 0;
            }
        }
        .api-input.invalid {
            outline: 1px solid #ff7070;
            outline-offset: -1px;
        }
        .input-wrapper {
            display: flex;
            flex-direction: column;
            gap: 4px;
            align-items: flex-start;
        }
        .inline-error-message {
            color: #ff7070;
            font-size: 11px;
            font-weight: 400;
            letter-spacing: 0.11px;
            word-wrap: break-word;
            width: 240px;
        }
    `;
  constructor() {
    super();
    this.isLoading = false;
    this.errorMessage = "";
    this.successMessage = "";
    this.messageTimestamp = 0;
    this.llmApiKey = "";
    this.sttApiKey = "";
    this.llmProvider = "openai";
    this.sttProvider = "openai";
    this.providers = { llm: [], stt: [] };
    this.modelSuggestions = [];
    this.userModelHistory = [];
    this.selectedLlmModel = "";
    this.selectedSttModel = "";
    this.ollamaStatus = { installed: false, running: false };
    this.installingModel = null;
    this.installProgress = 0;
    this.whisperInstallingModels = {};
    this.backCallback = () => {
    };
    this.llmError = "";
    this.sttError = "";
    this.activeOperations = /* @__PURE__ */ new Map();
    this.operationTimeouts = /* @__PURE__ */ new Map();
    this.connectionState = "idle";
    this.lastStateChange = Date.now();
    this.retryCount = 0;
    this.maxRetries = 3;
    this.baseRetryDelay = 1e3;
    this.operationQueue = [];
    this.maxConcurrentOperations = 2;
    this.maxQueueSize = 5;
    this.operationMetrics = {
      totalOperations: 0,
      successfulOperations: 0,
      failedOperations: 0,
      timeouts: 0,
      averageResponseTime: 0
    };
    this.ipcTimeout = 1e4;
    this.operationTimeout = 15e3;
    this.healthCheck = {
      enabled: false,
      intervalId: null,
      intervalMs: 3e4,
      // 30s
      lastCheck: 0,
      consecutiveFailures: 0,
      maxFailures: 3
    };
    this.loadUserModelHistory();
    this.loadProviderConfig();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.handleProviderChange = this.handleProviderChange.bind(this);
    this.handleLlmProviderChange = this.handleLlmProviderChange.bind(this);
    this.handleSttProviderChange = this.handleSttProviderChange.bind(this);
    this.handleMessageFadeEnd = this.handleMessageFadeEnd.bind(this);
    this.handleModelKeyPress = this.handleModelKeyPress.bind(this);
    this.handleSttModelChange = this.handleSttModelChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    this.dispatchEvent(new CustomEvent("content-changed", { bubbles: true, composed: true }));
  }
  reset() {
    this.apiKey = "";
    this.isLoading = false;
    this.errorMessage = "";
    this.validatedApiKey = null;
    this.selectedProvider = "openai";
    this.requestUpdate();
  }
  handleBack() {
    if (this.backCallback) {
      this.backCallback();
    }
  }
  async loadProviderConfig() {
    if (!window.api?.apiKeyHeader) return;
    try {
      const [config, ollamaStatus] = await Promise.all([
        window.api.apiKeyHeader.getProviderConfig(),
        window.api.apiKeyHeader.getOllamaStatus()
      ]);
      const llmProviders = [];
      const sttProviders = [];
      for (const id in config) {
        if (id.includes("-glass")) continue;
        const hasLlmModels = config[id].llmModels.length > 0 || id === "ollama";
        const hasSttModels = config[id].sttModels.length > 0 || id === "whisper";
        if (hasLlmModels) {
          llmProviders.push({ id, name: config[id].name });
        }
        if (hasSttModels) {
          sttProviders.push({ id, name: config[id].name });
        }
      }
      this.providers = { llm: llmProviders, stt: sttProviders };
      if (llmProviders.length > 0) this.llmProvider = llmProviders[0].id;
      if (sttProviders.length > 0) this.sttProvider = sttProviders[0].id;
      if (ollamaStatus?.success) {
        this.ollamaStatus = {
          installed: ollamaStatus.installed,
          running: ollamaStatus.running
        };
        if (ollamaStatus.running) {
          await this.loadModelSuggestions();
        }
      }
      this.requestUpdate();
    } catch (error) {
      console.error("[ApiKeyHeader] Failed to load provider config:", error);
    }
  }
  async handleMouseDown(e2) {
    if (e2.target.tagName === "INPUT" || e2.target.tagName === "BUTTON" || e2.target.tagName === "SELECT") {
      return;
    }
    e2.preventDefault();
    if (!window.api?.apiKeyHeader) return;
    const initialPosition = await window.api.apiKeyHeader.getHeaderPosition();
    this.dragState = {
      initialMouseX: e2.screenX,
      initialMouseY: e2.screenY,
      initialWindowX: initialPosition.x,
      initialWindowY: initialPosition.y,
      moved: false
    };
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp, { once: true });
  }
  handleMouseMove(e2) {
    if (!this.dragState) return;
    const deltaX = Math.abs(e2.screenX - this.dragState.initialMouseX);
    const deltaY = Math.abs(e2.screenY - this.dragState.initialMouseY);
    if (deltaX > 3 || deltaY > 3) {
      this.dragState.moved = true;
    }
    const newWindowX = this.dragState.initialWindowX + (e2.screenX - this.dragState.initialMouseX);
    const newWindowY = this.dragState.initialWindowY + (e2.screenY - this.dragState.initialMouseY);
    if (window.api?.apiKeyHeader) {
      window.api.apiKeyHeader.moveHeaderTo(newWindowX, newWindowY);
    }
  }
  handleMouseUp(e2) {
    if (!this.dragState) return;
    const wasDragged = this.dragState.moved;
    window.removeEventListener("mousemove", this.handleMouseMove);
    this.dragState = null;
    if (wasDragged) {
      this.wasJustDragged = true;
      setTimeout(() => {
        this.wasJustDragged = false;
      }, 200);
    }
  }
  handleInput(e2) {
    this.apiKey = e2.target.value;
    this.clearMessages();
    console.log("Input changed:", this.apiKey?.length || 0, "chars");
    this.requestUpdate();
    this.updateComplete.then(() => {
      const inputField = this.shadowRoot?.querySelector(".apikey-input");
      if (inputField && this.isInputFocused) {
        inputField.focus();
      }
    });
  }
  clearMessages() {
    this.errorMessage = "";
    this.successMessage = "";
    this.messageTimestamp = 0;
    this.llmError = "";
    this.sttError = "";
  }
  handleProviderChange(e2) {
    this.selectedProvider = e2.target.value;
    this.clearMessages();
    console.log("Provider changed to:", this.selectedProvider);
    this.requestUpdate();
  }
  async handleLlmProviderChange(e2, providerId) {
    const newProvider = providerId || e2.target.value;
    if (newProvider === this.llmProvider) return;
    this._cancelAllActiveOperations();
    this.llmProvider = newProvider;
    this.errorMessage = "";
    this.successMessage = "";
    if (["openai", "gemini"].includes(this.llmProvider)) {
      this.sttProvider = this.llmProvider;
    }
    this.retryCount = 0;
    if (this.llmProvider === "ollama") {
      console.log("[ApiKeyHeader] Ollama selected, initiating connection...");
      await this._initializeOllamaConnection();
      this._startHealthMonitoring();
    } else {
      this._updateConnectionState("idle", "Non-Ollama provider selected");
      this._stopHealthMonitoring();
    }
    this.requestUpdate();
  }
  async _initializeOllamaConnection() {
    try {
      await this._attemptOllamaConnection();
    } catch (error) {
      console.error("[ApiKeyHeader] Initial Ollama connection failed:", error.message);
      if (this.retryCount < this.maxRetries) {
        const delay = this.baseRetryDelay * Math.pow(2, this.retryCount);
        console.log(`[ApiKeyHeader] Retrying Ollama connection in ${delay}ms (attempt ${this.retryCount + 1}/${this.maxRetries})`);
        this.retryCount++;
        await new Promise((resolve) => {
          const retryTimeoutId = setTimeout(() => {
            this._initializeOllamaConnection();
            resolve();
          }, delay);
          this.operationTimeouts.set(`retry_${this.retryCount}`, retryTimeoutId);
        });
      } else {
        this._updateConnectionState("failed", `Connection failed after ${this.maxRetries} attempts`);
      }
    }
  }
  async _attemptOllamaConnection() {
    await this.refreshOllamaStatus();
  }
  _cancelAllActiveOperations() {
    console.log(`[ApiKeyHeader] Cancelling ${this.activeOperations.size} active operations and ${this.operationQueue.length} queued operations`);
    for (const [operationType, operation] of this.activeOperations) {
      this._cancelOperation(operationType);
    }
    for (const queuedOp of this.operationQueue) {
      queuedOp.reject(new Error(`Operation ${queuedOp.type} cancelled during cleanup`));
    }
    this.operationQueue.length = 0;
    for (const [timeoutId, timeout] of this.operationTimeouts) {
      clearTimeout(timeout);
    }
    this.operationTimeouts.clear();
  }
  /**
   * Get operation metrics for monitoring
   */
  getOperationMetrics() {
    return {
      ...this.operationMetrics,
      activeOperations: this.activeOperations.size,
      queuedOperations: this.operationQueue.length,
      successRate: this.operationMetrics.totalOperations > 0 ? this.operationMetrics.successfulOperations / this.operationMetrics.totalOperations * 100 : 0
    };
  }
  /**
   * Adaptive backpressure based on system performance
   */
  _adjustBackpressureThresholds() {
    const metrics = this.getOperationMetrics();
    if (metrics.successRate < 70 && this.maxConcurrentOperations > 1) {
      this.maxConcurrentOperations = Math.max(1, this.maxConcurrentOperations - 1);
      console.log(
        `[ApiKeyHeader] Reduced max concurrent operations to ${this.maxConcurrentOperations} (success rate: ${metrics.successRate.toFixed(1)}%)`
      );
    }
    if (metrics.successRate > 90 && metrics.averageResponseTime < 3e3 && this.maxConcurrentOperations < 3) {
      this.maxConcurrentOperations++;
      console.log(`[ApiKeyHeader] Increased max concurrent operations to ${this.maxConcurrentOperations}`);
    }
  }
  /**
   * Professional health monitoring system
   */
  _startHealthMonitoring() {
    if (this.healthCheck.enabled) return;
    this.healthCheck.enabled = true;
    this.healthCheck.intervalId = setInterval(() => {
      this._performHealthCheck();
    }, this.healthCheck.intervalMs);
    console.log(`[ApiKeyHeader] Health monitoring started (interval: ${this.healthCheck.intervalMs}ms)`);
  }
  _stopHealthMonitoring() {
    if (!this.healthCheck.enabled) return;
    this.healthCheck.enabled = false;
    if (this.healthCheck.intervalId) {
      clearInterval(this.healthCheck.intervalId);
      this.healthCheck.intervalId = null;
    }
    console.log("[ApiKeyHeader] Health monitoring stopped");
  }
  async _performHealthCheck() {
    if (this.llmProvider !== "ollama" || this.connectionState === "connecting") {
      return;
    }
    const now = Date.now();
    this.healthCheck.lastCheck = now;
    try {
      const isHealthy = await this._executeOperation(
        "health_check",
        async () => {
          if (!window.api?.apiKeyHeader) return false;
          const result = await window.api.apiKeyHeader.getOllamaStatus();
          return result?.success && result?.running;
        },
        { timeout: 5e3, priority: "low" }
      );
      if (isHealthy) {
        this.healthCheck.consecutiveFailures = 0;
        if (this.connectionState === "failed") {
          this._updateConnectionState("connected", "Health check recovered");
        }
      } else {
        this._handleHealthCheckFailure();
      }
      this._adjustBackpressureThresholds();
    } catch (error) {
      console.warn("[ApiKeyHeader] Health check failed:", error.message);
      this._handleHealthCheckFailure();
    }
  }
  _handleHealthCheckFailure() {
    this.healthCheck.consecutiveFailures++;
    if (this.healthCheck.consecutiveFailures >= this.healthCheck.maxFailures) {
      console.warn(`[ApiKeyHeader] Health check failed ${this.healthCheck.consecutiveFailures} times, marking as disconnected`);
      this._updateConnectionState("failed", "Service health check failed");
      this.healthCheck.intervalMs = Math.max(1e4, this.healthCheck.intervalMs / 2);
      this._restartHealthMonitoring();
    }
  }
  _restartHealthMonitoring() {
    this._stopHealthMonitoring();
    this._startHealthMonitoring();
  }
  /**
   * Get comprehensive health status
   */
  getHealthStatus() {
    return {
      connection: {
        state: this.connectionState,
        lastStateChange: this.lastStateChange,
        timeSinceLastChange: Date.now() - this.lastStateChange
      },
      operations: this.getOperationMetrics(),
      health: {
        enabled: this.healthCheck.enabled,
        lastCheck: this.healthCheck.lastCheck,
        timeSinceLastCheck: this.healthCheck.lastCheck > 0 ? Date.now() - this.healthCheck.lastCheck : null,
        consecutiveFailures: this.healthCheck.consecutiveFailures,
        intervalMs: this.healthCheck.intervalMs
      },
      ollama: {
        provider: this.llmProvider,
        status: this.ollamaStatus,
        selectedModel: this.selectedLlmModel
      }
    };
  }
  async handleSttProviderChange(e2, providerId) {
    const newProvider = providerId || e2.target.value;
    if (newProvider === this.sttProvider) return;
    this.sttProvider = newProvider;
    this.errorMessage = "";
    this.successMessage = "";
    if (this.sttProvider === "ollama") {
      console.warn("[ApiKeyHeader] Ollama does not support STT yet. Please select Whisper or another provider.");
      this.sttError = "*Ollama does not support STT yet. Please select Whisper or another STT provider.";
      this.messageTimestamp = Date.now();
      const whisperProvider = this.providers.stt.find((p2) => p2.id === "whisper");
      if (whisperProvider) {
        this.sttProvider = "whisper";
        console.log("[ApiKeyHeader] Auto-selected Whisper for STT");
      }
    }
    this.requestUpdate();
  }
  /**
   * Professional operation management with backpressure control
   */
  async _executeOperation(operationType, operation, options = {}) {
    const operationId = `${operationType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timeout = options.timeout || this.ipcTimeout;
    const priority = options.priority || "normal";
    if (this.activeOperations.size >= this.maxConcurrentOperations) {
      if (this.operationQueue.length >= this.maxQueueSize) {
        throw new Error(`Operation queue full (${this.maxQueueSize}), rejecting ${operationType}`);
      }
      console.log(`[ApiKeyHeader] Queuing operation ${operationType} (${this.activeOperations.size} active)`);
      return this._queueOperation(operationId, operationType, operation, options);
    }
    return this._executeImmediately(operationId, operationType, operation, timeout);
  }
  async _queueOperation(operationId, operationType, operation, options) {
    return new Promise((resolve, reject) => {
      const queuedOperation = {
        id: operationId,
        type: operationType,
        operation,
        options,
        resolve,
        reject,
        queuedAt: Date.now(),
        priority: options.priority || "normal"
      };
      if (options.priority === "high") {
        this.operationQueue.unshift(queuedOperation);
      } else {
        this.operationQueue.push(queuedOperation);
      }
      console.log(`[ApiKeyHeader] Queued ${operationType} (queue size: ${this.operationQueue.length})`);
    });
  }
  async _executeImmediately(operationId, operationType, operation, timeout) {
    const startTime = Date.now();
    this.operationMetrics.totalOperations++;
    if (this.activeOperations.has(operationType)) {
      console.log(`[ApiKeyHeader] Operation ${operationType} already in progress, cancelling previous`);
      this._cancelOperation(operationType);
    }
    const cancellationPromise = new Promise((_2, reject) => {
      const timeoutId = setTimeout(() => {
        this.operationMetrics.timeouts++;
        reject(new Error(`Operation ${operationType} timeout after ${timeout}ms`));
      }, timeout);
      this.operationTimeouts.set(operationId, timeoutId);
    });
    const operationPromise = Promise.race([operation(), cancellationPromise]);
    this.activeOperations.set(operationType, {
      id: operationId,
      promise: operationPromise,
      startTime
    });
    try {
      const result = await operationPromise;
      this._recordOperationSuccess(startTime);
      return result;
    } catch (error) {
      this._recordOperationFailure(error, operationType);
      throw error;
    } finally {
      this._cleanupOperation(operationId, operationType);
      this._processQueue();
    }
  }
  _recordOperationSuccess(startTime) {
    this.operationMetrics.successfulOperations++;
    const responseTime = Date.now() - startTime;
    this._updateAverageResponseTime(responseTime);
  }
  _recordOperationFailure(error, operationType) {
    this.operationMetrics.failedOperations++;
    if (error.message.includes("timeout")) {
      console.error(`[ApiKeyHeader] Operation ${operationType} timed out`);
      this._updateConnectionState("failed", `Timeout: ${error.message}`);
    }
  }
  _updateAverageResponseTime(responseTime) {
    const totalOps = this.operationMetrics.successfulOperations;
    this.operationMetrics.averageResponseTime = (this.operationMetrics.averageResponseTime * (totalOps - 1) + responseTime) / totalOps;
  }
  async _processQueue() {
    if (this.operationQueue.length === 0 || this.activeOperations.size >= this.maxConcurrentOperations) {
      return;
    }
    const queuedOp = this.operationQueue.shift();
    if (!queuedOp) return;
    const queueTime = Date.now() - queuedOp.queuedAt;
    console.log(`[ApiKeyHeader] Processing queued operation ${queuedOp.type} (waited ${queueTime}ms)`);
    try {
      const result = await this._executeImmediately(
        queuedOp.id,
        queuedOp.type,
        queuedOp.operation,
        queuedOp.options.timeout || this.ipcTimeout
      );
      queuedOp.resolve(result);
    } catch (error) {
      queuedOp.reject(error);
    }
  }
  _cancelOperation(operationType) {
    const operation = this.activeOperations.get(operationType);
    if (operation) {
      this._cleanupOperation(operation.id, operationType);
      console.log(`[ApiKeyHeader] Cancelled operation: ${operationType}`);
    }
  }
  _cleanupOperation(operationId, operationType) {
    if (this.operationTimeouts.has(operationId)) {
      clearTimeout(this.operationTimeouts.get(operationId));
      this.operationTimeouts.delete(operationId);
    }
    this.activeOperations.delete(operationType);
  }
  _updateConnectionState(newState, reason = "") {
    if (this.connectionState !== newState) {
      console.log(`[ApiKeyHeader] Connection state: ${this.connectionState} -> ${newState} (${reason})`);
      this.connectionState = newState;
      this.lastStateChange = Date.now();
      this._handleStateChange(newState, reason);
    }
  }
  _handleStateChange(state, reason) {
    switch (state) {
      case "connecting":
        this.installingModel = "Connecting to Ollama...";
        this.installProgress = 10;
        break;
      case "failed":
        this.errorMessage = reason || "Connection failed";
        this.installingModel = null;
        this.installProgress = 0;
        this.messageTimestamp = Date.now();
        break;
      case "connected":
        this.installingModel = null;
        this.installProgress = 0;
        break;
      case "disconnected":
        this.ollamaStatus = { installed: false, running: false };
        break;
    }
    this.requestUpdate();
  }
  async refreshOllamaStatus() {
    if (!window.api?.apiKeyHeader) return;
    try {
      this._updateConnectionState("connecting", "Checking Ollama status");
      const result = await this._executeOperation("ollama_status", async () => {
        return await window.api.apiKeyHeader.getOllamaStatus();
      });
      if (result?.success) {
        this.ollamaStatus = {
          installed: result.installed,
          running: result.running
        };
        this._updateConnectionState("connected", "Status updated successfully");
        if (result.running) {
          await this.loadModelSuggestions();
        }
      } else {
        this._updateConnectionState("failed", result?.error || "Status check failed");
      }
    } catch (error) {
      console.error("[ApiKeyHeader] Failed to refresh Ollama status:", error.message);
      this._updateConnectionState("failed", error.message);
    }
  }
  async loadModelSuggestions() {
    if (!window.api?.apiKeyHeader) return;
    try {
      const result = await this._executeOperation("model_suggestions", async () => {
        return await window.api.apiKeyHeader.getModelSuggestions();
      });
      if (result?.success) {
        this.modelSuggestions = result.suggestions || [];
        if (!this.selectedLlmModel && this.modelSuggestions.length > 0) {
          const installedModel = this.modelSuggestions.find((m2) => m2.status === "installed");
          if (installedModel) {
            this.selectedLlmModel = installedModel.name;
          }
        }
        this.requestUpdate();
      } else {
        console.warn("[ApiKeyHeader] Model suggestions request unsuccessful:", result?.error);
      }
    } catch (error) {
      console.error("[ApiKeyHeader] Failed to load model suggestions:", error.message);
    }
  }
  async ensureOllamaReady() {
    if (!window.api?.apiKeyHeader) return false;
    try {
      this._updateConnectionState("connecting", "Ensuring Ollama is ready");
      const result = await this._executeOperation(
        "ollama_ensure_ready",
        async () => {
          return await window.api.apiKeyHeader.ensureOllamaReady();
        },
        { timeout: this.operationTimeout }
      );
      if (result?.success) {
        await this.refreshOllamaStatus();
        this._updateConnectionState("connected", "Ollama ready");
        return true;
      } else {
        const errorMsg = `Failed to setup Ollama: ${result?.error || "Unknown error"}`;
        this._updateConnectionState("failed", errorMsg);
        return false;
      }
    } catch (error) {
      console.error("[ApiKeyHeader] Failed to ensure Ollama ready:", error.message);
      this._updateConnectionState("failed", `Error setting up Ollama: ${error.message}`);
      return false;
    }
  }
  async ensureOllamaReadyWithUI() {
    if (!window.api?.apiKeyHeader) return false;
    this.installingModel = "Setting up Ollama";
    this.installProgress = 0;
    this.clearMessages();
    this.requestUpdate();
    const progressHandler = (event, data) => {
      if (data.service !== "ollama") return;
      let baseProgress = 0;
      let stageTotal = 0;
      switch (data.stage) {
        case "downloading":
          baseProgress = 0;
          stageTotal = 70;
          break;
        case "mounting":
          baseProgress = 70;
          stageTotal = 10;
          break;
        case "installing":
          baseProgress = 80;
          stageTotal = 10;
          break;
        case "linking":
          baseProgress = 90;
          stageTotal = 5;
          break;
        case "cleanup":
          baseProgress = 95;
          stageTotal = 3;
          break;
        case "starting":
          baseProgress = 98;
          stageTotal = 2;
          break;
      }
      const overallProgress = baseProgress + data.progress / 100 * stageTotal;
      this.installingModel = data.message;
      this.installProgress = Math.round(overallProgress);
      this.requestUpdate();
    };
    let operationCompleted = false;
    const completionTimeout = setTimeout(async () => {
      if (!operationCompleted) {
        console.log("[ApiKeyHeader] Operation timeout, checking status manually...");
        await this._handleOllamaSetupCompletion(true);
      }
    }, 15e3);
    const completionHandler = async (event, data) => {
      if (data.service !== "ollama") return;
      if (operationCompleted) return;
      operationCompleted = true;
      clearTimeout(completionTimeout);
      window.api.apiKeyHeader.removeOnLocalAIProgress(progressHandler);
      await this._handleOllamaSetupCompletion(true);
    };
    window.api.apiKeyHeader.onLocalAIComplete(completionHandler);
    window.api.apiKeyHeader.onLocalAIProgress(progressHandler);
    try {
      let result;
      if (!this.ollamaStatus.installed) {
        console.log("[ApiKeyHeader] Ollama not installed. Starting installation.");
        result = await window.api.apiKeyHeader.installOllama();
      } else {
        console.log("[ApiKeyHeader] Ollama installed. Starting service.");
        result = await window.api.apiKeyHeader.startOllamaService();
      }
      if (result?.success && !operationCompleted) {
        setTimeout(async () => {
          if (!operationCompleted) {
            operationCompleted = true;
            clearTimeout(completionTimeout);
            await this._handleOllamaSetupCompletion(true);
          }
        }, 2e3);
      }
    } catch (error) {
      operationCompleted = true;
      clearTimeout(completionTimeout);
      console.error("[ApiKeyHeader] Ollama setup failed:", error);
      window.api.apiKeyHeader.removeOnLocalAIProgress(progressHandler);
      window.api.apiKeyHeader.removeOnLocalAIComplete(completionHandler);
      await this._handleOllamaSetupCompletion(false, error.message);
    }
  }
  async _handleOllamaSetupCompletion(success, errorMessage = null) {
    this.installingModel = null;
    this.installProgress = 0;
    if (success) {
      await this.refreshOllamaStatus();
      this.successMessage = "\u2713 Ollama is ready!";
    } else {
      this.llmError = `*Setup failed: ${errorMessage || "Unknown error"}`;
    }
    this.messageTimestamp = Date.now();
    this.requestUpdate();
  }
  async handleModelInput(e2) {
    const modelName = e2.target.value.trim();
    this.selectedLlmModel = modelName;
    this.clearMessages();
    if (modelName && modelName.length > 2) {
      this.saveToUserHistory(modelName);
    }
    this.requestUpdate();
  }
  async handleModelKeyPress(e2) {
    if (e2.key === "Enter" && this.selectedLlmModel?.trim()) {
      e2.preventDefault();
      console.log(`[ApiKeyHeader] Enter pressed, installing model: ${this.selectedLlmModel}`);
      const ollamaReady = await this.ensureOllamaReady();
      if (!ollamaReady) {
        this.llmError = "*Failed to setup Ollama";
        this.messageTimestamp = Date.now();
        this.requestUpdate();
        return;
      }
      await this.installModel(this.selectedLlmModel);
    }
  }
  loadUserModelHistory() {
    try {
      const saved = localStorage.getItem("ollama-model-history");
      if (saved) {
        this.userModelHistory = JSON.parse(saved);
      }
    } catch (error) {
      console.error("[ApiKeyHeader] Failed to load model history:", error);
      this.userModelHistory = [];
    }
  }
  saveToUserHistory(modelName) {
    if (!modelName || !modelName.trim()) return;
    this.userModelHistory = this.userModelHistory.filter((m2) => m2 !== modelName);
    this.userModelHistory.unshift(modelName);
    this.userModelHistory = this.userModelHistory.slice(0, 20);
    try {
      localStorage.setItem("ollama-model-history", JSON.stringify(this.userModelHistory));
    } catch (error) {
      console.error("[ApiKeyHeader] Failed to save model history:", error);
    }
  }
  getCombinedModelSuggestions() {
    const combined = [];
    for (const model of this.modelSuggestions) {
      combined.push({
        name: model.name,
        status: "installed",
        size: model.size || "Unknown",
        source: "installed"
      });
    }
    const installedNames = this.modelSuggestions.map((m2) => m2.name);
    for (const modelName of this.userModelHistory) {
      if (!installedNames.includes(modelName)) {
        combined.push({
          name: modelName,
          status: "history",
          size: "Unknown",
          source: "history"
        });
      }
    }
    return combined;
  }
  async installModel(modelName) {
    if (!modelName?.trim()) {
      throw new Error("Invalid model name");
    }
    this.installingModel = modelName;
    this.installProgress = 0;
    this.clearMessages();
    this.requestUpdate();
    if (!window.api?.apiKeyHeader) return;
    let progressHandler = null;
    try {
      console.log(`[ApiKeyHeader] Installing model via Ollama REST API: ${modelName}`);
      progressHandler = (event, data) => {
        if (data.service === "ollama" && data.model === modelName && !this._isOperationCancelled(modelName)) {
          const progress = Math.round(Math.max(0, Math.min(100, data.progress || 0)));
          if (progress !== this.installProgress) {
            this.installProgress = progress;
            console.log(`[ApiKeyHeader] API Progress: ${progress}% for ${modelName} (${data.status || "downloading"})`);
            this.requestUpdate();
          }
        }
      };
      window.api.apiKeyHeader.onLocalAIProgress(progressHandler);
      const installPromise = window.api.apiKeyHeader.pullOllamaModel(modelName);
      const timeoutPromise = new Promise((_2, reject) => setTimeout(() => reject(new Error("Installation timeout after 10 minutes")), 6e5));
      const result = await Promise.race([installPromise, timeoutPromise]);
      if (result.success) {
        console.log(`[ApiKeyHeader] Model ${modelName} installed successfully via API`);
        this.installProgress = 100;
        this.requestUpdate();
        await new Promise((resolve) => setTimeout(resolve, 300));
        await this.refreshOllamaStatus();
        this.successMessage = `\u2713 ${modelName} ready`;
        this.messageTimestamp = Date.now();
      } else {
        throw new Error(result.error || "Installation failed");
      }
    } catch (error) {
      console.error(`[ApiKeyHeader] Model installation failed:`, error);
      this.llmError = `*Failed: ${error.message}`;
      this.messageTimestamp = Date.now();
    } finally {
      if (progressHandler) {
        window.api.apiKeyHeader.removeOnLocalAIProgress(progressHandler);
      }
      this.installingModel = null;
      this.installProgress = 0;
      this.requestUpdate();
    }
  }
  _isOperationCancelled(modelName) {
    return !this.installingModel || this.installingModel !== modelName;
  }
  async downloadWhisperModel(modelId) {
    if (!modelId?.trim()) {
      console.warn("[ApiKeyHeader] Invalid Whisper model ID");
      return;
    }
    console.log(`[ApiKeyHeader] Starting Whisper model download: ${modelId}`);
    this.whisperInstallingModels = { ...this.whisperInstallingModels, [modelId]: 0 };
    this.clearMessages();
    this.requestUpdate();
    if (!window.api?.apiKeyHeader) return;
    let progressHandler = null;
    try {
      progressHandler = (event, data) => {
        if (data.service === "whisper" && data.model === modelId) {
          const cleanProgress = Math.round(Math.max(0, Math.min(100, data.progress || 0)));
          this.whisperInstallingModels = { ...this.whisperInstallingModels, [modelId]: cleanProgress };
          console.log(`[ApiKeyHeader] Whisper download progress: ${cleanProgress}% for ${modelId}`);
          this.requestUpdate();
        }
      };
      window.api.apiKeyHeader.onLocalAIProgress(progressHandler);
      const downloadPromise = window.api.apiKeyHeader.downloadWhisperModel(modelId);
      const timeoutPromise = new Promise((_2, reject) => setTimeout(() => reject(new Error("Download timeout after 10 minutes")), 6e5));
      const result = await Promise.race([downloadPromise, timeoutPromise]);
      if (result?.success) {
        this.successMessage = `\u2713 ${modelId} downloaded successfully`;
        this.messageTimestamp = Date.now();
        console.log(`[ApiKeyHeader] Whisper model ${modelId} downloaded successfully`);
        this.selectedSttModel = modelId;
      } else {
        this.sttError = `*Failed to download ${modelId}: ${result?.error || "Unknown error"}`;
        this.messageTimestamp = Date.now();
        console.error(`[ApiKeyHeader] Whisper download failed:`, result?.error);
      }
    } catch (error) {
      console.error(`[ApiKeyHeader] Error downloading Whisper model ${modelId}:`, error);
      this.sttError = `*Error downloading ${modelId}: ${error.message}`;
      this.messageTimestamp = Date.now();
    } finally {
      if (progressHandler) {
        window.api.apiKeyHeader.removeOnLocalAIProgress(progressHandler);
      }
      delete this.whisperInstallingModels[modelId];
      this.requestUpdate();
    }
  }
  handlePaste(e2) {
    e2.preventDefault();
    this.clearMessages();
    const clipboardText = (e2.clipboardData || window.clipboardData).getData("text");
    console.log("Paste event detected:", clipboardText?.substring(0, 10) + "...");
    if (clipboardText) {
      this.apiKey = clipboardText.trim();
      const inputElement = e2.target;
      inputElement.value = this.apiKey;
    }
    this.requestUpdate();
    this.updateComplete.then(() => {
      const inputField = this.shadowRoot?.querySelector(".apikey-input");
      if (inputField) {
        inputField.focus();
        inputField.setSelectionRange(inputField.value.length, inputField.value.length);
      }
    });
  }
  handleKeyPress(e2) {
    if (e2.key === "Enter") {
      e2.preventDefault();
      this.handleSubmit();
    }
  }
  //////// after_modelStateService ////////
  async handleSttModelChange(e2) {
    const modelId = e2.target.value;
    this.selectedSttModel = modelId;
    if (modelId && this.sttProvider === "whisper") {
      const isInstalling = this.whisperInstallingModels[modelId] !== void 0;
      if (!isInstalling) {
        console.log(`[ApiKeyHeader] Auto-installing Whisper model: ${modelId}`);
        await this.downloadWhisperModel(modelId);
      }
    }
    this.requestUpdate();
  }
  async handleSubmit() {
    console.log("[ApiKeyHeader] handleSubmit: Submitting...");
    this.isLoading = true;
    this.clearMessages();
    this.requestUpdate();
    if (!window.api?.apiKeyHeader) {
      this.isLoading = false;
      this.llmError = "*API bridge not available";
      this.requestUpdate();
      return;
    }
    try {
      let llmResult;
      if (this.llmProvider === "ollama") {
        if (!this.selectedLlmModel?.trim()) {
          throw new Error("Please enter an Ollama model name");
        }
        const ollamaReady = await this.ensureOllamaReady();
        if (!ollamaReady) {
          throw new Error("Failed to setup Ollama");
        }
        const selectedModel = this.getCombinedModelSuggestions().find((m2) => m2.name === this.selectedLlmModel);
        if (!selectedModel || selectedModel.status !== "installed") {
          console.log(`[ApiKeyHeader] Installing model ${this.selectedLlmModel}...`);
          await this.installModel(this.selectedLlmModel);
        }
        llmResult = await window.api.apiKeyHeader.validateKey({
          provider: "ollama",
          key: "local"
        });
        if (llmResult.success) {
          await window.api.apiKeyHeader.setSelectedModel({
            type: "llm",
            modelId: this.selectedLlmModel
          });
        }
      } else {
        if (!this.llmApiKey.trim()) {
          throw new Error("Please enter LLM API key");
        }
        llmResult = await window.api.apiKeyHeader.validateKey({
          provider: this.llmProvider,
          key: this.llmApiKey.trim()
        });
        if (llmResult.success) {
          const config = await window.api.apiKeyHeader.getProviderConfig();
          const providerConfig = config[this.llmProvider];
          if (providerConfig && providerConfig.llmModels.length > 0) {
            await window.api.apiKeyHeader.setSelectedModel({
              type: "llm",
              modelId: providerConfig.llmModels[0].id
            });
          }
        }
      }
      let sttResult;
      if (this.sttProvider === "ollama") {
        sttResult = { success: true };
      } else if (this.sttProvider === "whisper") {
        sttResult = await window.api.apiKeyHeader.validateKey({
          provider: "whisper",
          key: "local"
        });
        if (sttResult.success && this.selectedSttModel) {
          await window.api.apiKeyHeader.setSelectedModel({
            type: "stt",
            modelId: this.selectedSttModel
          });
        }
      } else {
        if (!this.sttApiKey.trim()) {
          throw new Error("Please enter STT API key");
        }
        sttResult = await window.api.apiKeyHeader.validateKey({
          provider: this.sttProvider,
          key: this.sttApiKey.trim()
        });
        if (sttResult.success) {
          const config = await window.api.apiKeyHeader.getProviderConfig();
          const providerConfig = config[this.sttProvider];
          if (providerConfig && providerConfig.sttModels.length > 0) {
            await window.api.apiKeyHeader.setSelectedModel({
              type: "stt",
              modelId: providerConfig.sttModels[0].id
            });
          }
        }
      }
      if (llmResult.success && sttResult.success) {
        console.log("[ApiKeyHeader] handleSubmit: Validation successful.");
        setTimeout(async () => {
          const isConfigured = await window.api.apiKeyHeader.areProvidersConfigured();
          console.log("[ApiKeyHeader] Post-validation providers configured check:", isConfigured);
          if (isConfigured) {
            this.startSlideOutAnimation();
          } else {
            console.error("[ApiKeyHeader] Providers still not configured after successful validation");
            this.llmError = "*Configuration error. Please try again.";
            this.isLoading = false;
            this.requestUpdate();
          }
        }, 100);
      } else {
        this.llmError = !llmResult.success ? `*${llmResult.error || "Invalid API Key"}` : "";
        this.sttError = !sttResult.success ? `*${sttResult.error || "Invalid"}` : "";
        this.errorMessage = "";
        this.messageTimestamp = Date.now();
      }
    } catch (error) {
      console.error("[ApiKeyHeader] handleSubmit: Error:", error);
      this.llmError = `*${error.message}`;
      this.messageTimestamp = Date.now();
    }
    this.isLoading = false;
    this.requestUpdate();
  }
  //////// after_modelStateService ////////
  ////TODO: 뭔가 넘어가는 애니메이션 로직에 문제가 있음
  startSlideOutAnimation() {
    console.log("[ApiKeyHeader] startSlideOutAnimation: Starting slide out animation.");
    this.classList.add("sliding-out");
    setTimeout(() => {
      if (this.classList.contains("sliding-out")) {
        console.log("[ApiKeyHeader] Animation fallback triggered - forcing transition");
        this.handleAnimationEnd({ target: this, animationName: "slideOut" });
      }
    }, 1);
  }
  handleClose() {
    if (window.api?.common) {
      window.api.common.quitApplication();
    }
  }
  //////// after_modelStateService ////////
  handleAnimationEnd(e2) {
    if (e2.target !== this || !this.classList.contains("sliding-out")) return;
    this.classList.remove("sliding-out");
    this.classList.add("hidden");
    console.log("[ApiKeyHeader] handleAnimationEnd: Animation completed, transitioning to next state...");
    if (!window.api?.common) {
      console.error("[ApiKeyHeader] handleAnimationEnd: window.api.common not available");
      return;
    }
    if (!this.stateUpdateCallback) {
      console.error("[ApiKeyHeader] handleAnimationEnd: stateUpdateCallback not set! This will prevent transition to main window.");
      return;
    }
    window.api.common.getCurrentUser().then((userState) => {
      console.log("[ApiKeyHeader] handleAnimationEnd: User state retrieved:", userState);
      return window.api.apiKeyHeader.areProvidersConfigured().then((isConfigured) => {
        console.log("[ApiKeyHeader] handleAnimationEnd: Providers configured check:", isConfigured);
        if (!isConfigured) {
          console.warn("[ApiKeyHeader] handleAnimationEnd: Providers still not configured, may return to ApiKey screen");
        }
        this.stateUpdateCallback(userState);
      });
    }).catch((error) => {
      console.error("[ApiKeyHeader] handleAnimationEnd: Error during state transition:", error);
      if (this.stateUpdateCallback) {
        console.log("[ApiKeyHeader] handleAnimationEnd: Attempting fallback state transition...");
        this.stateUpdateCallback({ isLoggedIn: false });
      }
    });
  }
  //////// after_modelStateService ////////
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("animationend", this.handleAnimationEnd);
  }
  handleMessageFadeEnd(e2) {
    if (e2.animationName === "fadeOut") {
      if (e2.target.classList.contains("error-message")) {
        this.errorMessage = "";
      } else if (e2.target.classList.contains("success-message")) {
        this.successMessage = "";
      }
      this.messageTimestamp = 0;
      this.requestUpdate();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("animationend", this.handleAnimationEnd);
    this._performCompleteCleanup();
  }
  _performCompleteCleanup() {
    console.log("[ApiKeyHeader] Performing complete cleanup");
    this._stopHealthMonitoring();
    this._cancelAllActiveOperations();
    if (this.installingModel) {
      this.progressTracker.cancelInstallation(this.installingModel);
    }
    if (window.api?.apiKeyHeader) {
      window.api.apiKeyHeader.removeAllListeners();
    }
    const downloadingModels = Object.keys(this.whisperInstallingModels);
    if (downloadingModels.length > 0) {
      console.log(`[ApiKeyHeader] Cancelling ${downloadingModels.length} ongoing Whisper downloads`);
      downloadingModels.forEach((modelId) => {
        delete this.whisperInstallingModels[modelId];
      });
    }
    this.connectionState = "disconnected";
    this.retryCount = 0;
    console.log("[ApiKeyHeader] Cleanup completed");
  }
  /**
   * State machine-based Ollama UI rendering
   */
  _renderOllamaStateUI() {
    const state = this._getOllamaUIState();
    switch (state.type) {
      case "connecting":
        return this._renderConnectingState(state);
      case "install_required":
        return this._renderInstallRequiredState();
      case "start_required":
        return this._renderStartRequiredState();
      case "ready":
        return this._renderReadyState();
      case "failed":
        return this._renderFailedState(state);
      case "installing":
        return this._renderInstallingState(state);
      default:
        return this._renderUnknownState();
    }
  }
  _getOllamaUIState() {
    if (this.connectionState === "connecting") {
      return { type: "connecting", message: this.installingModel || "Connecting to Ollama..." };
    }
    if (this.connectionState === "failed") {
      return { type: "failed", message: this.errorMessage };
    }
    if (this.installingModel && this.installingModel.includes("Ollama")) {
      return { type: "installing", progress: this.installProgress };
    }
    if (!this.ollamaStatus.installed) {
      return { type: "install_required" };
    }
    if (!this.ollamaStatus.running) {
      return { type: "start_required" };
    }
    return { type: "ready" };
  }
  _renderConnectingState(state) {
    return H`
            <div style="margin-top: 3px; display: flex; align-items: center; gap: 6px;">
                <div style="height: 1px; background: rgba(255,255,255,0.3); border-radius: 0.5px; overflow: hidden; flex: 1;">
                    <div style="height: 100%; background: rgba(0,122,255,1); width: ${this.installProgress}%; transition: width 0.1s ease;"></div>
                </div>
                <div style="font-size: 8px; color: rgba(255,255,255,0.8); font-weight: 600; min-width: 24px; text-align: right;">
                    ${this.installProgress}%
                </div>
            </div>
        `;
  }
  _renderInstallRequiredState() {
    return H` <button class="ollama-action-button install" @click=${this.ensureOllamaReadyWithUI}>Install Ollama</button> `;
  }
  _renderStartRequiredState() {
    return H` <button class="ollama-action-button start" @click=${this.ensureOllamaReadyWithUI}>Start Ollama Service</button> `;
  }
  _renderReadyState() {
    return H`
            <!-- Model Input with Autocomplete -->
            <input
                type="text"
                class="api-input"
                placeholder="Model name (press Enter to install)"
                .value=${this.selectedLlmModel}
                @input=${this.handleModelInput}
                @keypress=${this.handleModelKeyPress}
                list="model-suggestions"
                ?disabled=${this.isLoading || this.installingModel}
                style="text-align: left; padding-left: 12px;"
            />
            <datalist id="model-suggestions">
                ${this.getCombinedModelSuggestions().map(
      (model) => H`
                        <option value=${model.name}>
                            ${model.name} ${model.status === "installed" ? "\u2713 Installed" : model.status === "history" ? "\u{1F4DD} Recent" : "- Available"}
                        </option>
                    `
    )}
            </datalist>

            <!-- Show model status -->
            ${this.renderModelStatus()}
            ${this.installingModel && !this.installingModel.includes("Ollama") ? H`
                      <div style="margin-top: 3px; display: flex; align-items: center; gap: 6px;">
                          <div style="height: 1px; background: rgba(255,255,255,0.3); border-radius: 0.5px; overflow: hidden; flex: 1;">
                              <div
                                  style="height: 100%; background: rgba(0,122,255,1); width: ${this.installProgress}%; transition: width 0.1s ease;"
                              ></div>
                          </div>
                          <div style="font-size: 8px; color: rgba(255,255,255,0.8); font-weight: 600; min-width: 24px; text-align: right;">
                              ${this.installProgress}%
                          </div>
                      </div>
                  ` : ""}
        `;
  }
  _renderFailedState(state) {
    return H`
            <div style="margin-top: 6px; padding: 8px; background: rgba(239,68,68,0.1); border-radius: 8px;">
                <div style="font-size: 11px; color: rgba(239,68,68,0.8); margin-bottom: 4px; text-align: center;">Connection failed</div>
                <div style="font-size: 10px; color: rgba(239,68,68,0.6); text-align: center; margin-bottom: 6px;">
                    ${state.message || "Unknown error"}
                </div>
                <button
                    class="action-button"
                    style="width: 100%; height: 28px; font-size: 10px; background: rgba(239,68,68,0.2);"
                    @click=${() => this._initializeOllamaConnection()}
                >
                    Retry Connection
                </button>
            </div>
        `;
  }
  _renderInstallingState(state) {
    return H`
            <div style="margin-top: 3px; display: flex; align-items: center; gap: 6px;">
                <div style="height: 1px; background: rgba(255,255,255,0.3); border-radius: 0.5px; overflow: hidden; flex: 1;">
                    <div style="height: 100%; background: rgba(0,122,255,1); width: ${state.progress}%; transition: width 0.1s ease;"></div>
                </div>
                <div style="font-size: 8px; color: rgba(255,255,255,0.8); font-weight: 600; min-width: 24px; text-align: right;">
                    ${state.progress}%
                </div>
            </div>
        `;
  }
  _renderUnknownState() {
    return H`
            <div style="margin-top: 6px; padding: 8px; background: rgba(255,200,0,0.1); border-radius: 8px;">
                <div style="font-size: 11px; color: rgba(255,200,0,0.8); text-align: center;">Unknown state - Please refresh</div>
            </div>
        `;
  }
  renderModelStatus() {
    return "";
  }
  shouldFadeMessage(type) {
    const hasMessage = type === "error" ? this.errorMessage : this.successMessage;
    return hasMessage && this.messageTimestamp > 0 && Date.now() - this.messageTimestamp > 100;
  }
  openPrivacyPolicy() {
    console.log("\u{1F50A} openPrivacyPolicy ApiKeyHeader");
    if (window.api?.common) {
      window.api.common.openExternal("https://pickle.com/privacy-policy");
    }
  }
  render() {
    const llmNeedsApiKey = this.llmProvider !== "ollama" && this.llmProvider !== "whisper";
    const sttNeedsApiKey = this.sttProvider !== "ollama" && this.sttProvider !== "whisper";
    const llmNeedsModel = this.llmProvider === "ollama";
    const sttNeedsModel = this.sttProvider === "whisper";
    const isButtonDisabled = this.isLoading || this.installingModel || Object.keys(this.whisperInstallingModels).length > 0 || llmNeedsApiKey && !this.llmApiKey.trim() || sttNeedsApiKey && !this.sttApiKey.trim() || llmNeedsModel && !this.selectedLlmModel?.trim() || sttNeedsModel && !this.selectedSttModel;
    const llmProviderName = this.providers.llm.find((p2) => p2.id === this.llmProvider)?.name || this.llmProvider;
    return H`
            <div class="container">
                <button class="close-button" @click=${this.handleClose}>×</button>
                <div class="header">
                    <div class="back-button" @click=${this.handleBack}>
                        <i class="arrow-icon-left"></i>
                        <div class="back-button-text">Back</div>
                    </div>
                    <div class="title">Use Personal API keys</div>
                </div>

                <!-- LLM Section -->
                <div class="section">
                    <div class="row">
                        <div class="label">1. Select LLM Provider</div>
                        <div class="provider-selector">
                            ${this.providers.llm.map(
      (p2) => H`
                                    <button
                                        class="provider-button"
                                        data-status=${this.llmProvider === p2.id ? "active" : "default"}
                                        @click=${(e2) => this.handleLlmProviderChange(e2, p2.id)}
                                    >
                                        ${p2.name}
                                    </button>
                                `
    )}
                        </div>
                    </div>
                    <div class="row">
                        <div class="label">2. Enter API Key</div>
                        ${this.llmProvider === "ollama" ? this._renderOllamaStateUI() : H`
                                  <div class="input-wrapper">
                                      <input
                                          type="password"
                                          class="api-input ${this.llmError ? "invalid" : ""}"
                                          placeholder="Enter your ${llmProviderName} API key"
                                          .value=${this.llmApiKey}
                                          @input=${(e2) => {
      this.llmApiKey = e2.target.value;
      this.llmError = "";
    }}
                                          ?disabled=${this.isLoading}
                                      />
                                      ${this.llmError ? H`<div class="inline-error-message">${this.llmError}</div>` : ""}
                                  </div>
                              `}
                    </div>
                </div>

                <!-- STT Section -->
                <div class="section">
                    <div class="row">
                        <div class="label">3. Select STT Provider</div>
                        <div class="provider-selector">
                            ${this.providers.stt.map(
      (p2) => H`
                                    <button
                                        class="provider-button"
                                        data-status=${this.sttProvider === p2.id ? "active" : "default"}
                                        @click=${(e2) => this.handleSttProviderChange(e2, p2.id)}
                                    >
                                        ${p2.name}
                                    </button>
                                `
    )}
                        </div>
                    </div>
                    <div class="row">
                        <div class="label">4. Enter STT API Key</div>
                        ${this.sttProvider === "ollama" ? H`
                                  <div class="api-input" style="background: transparent; border: none; text-align: right; color: #a0a0a0;">
                                      STT not supported by Ollama
                                  </div>
                              ` : this.sttProvider === "whisper" ? H`
                                    <div class="input-wrapper">
                                        <select
                                            class="api-input ${this.sttError ? "invalid" : ""}"
                                            .value=${this.selectedSttModel || ""}
                                            @change=${(e2) => {
      this.handleSttModelChange(e2);
      this.sttError = "";
    }}
                                            ?disabled=${this.isLoading}
                                        >
                                            <option value="">Select a model...</option>
                                            ${[
      { id: "whisper-tiny", name: "Whisper Tiny (39M)" },
      { id: "whisper-base", name: "Whisper Base (74M)" },
      { id: "whisper-small", name: "Whisper Small (244M)" },
      { id: "whisper-medium", name: "Whisper Medium (769M)" }
    ].map((model) => H` <option value="${model.id}">${model.name}</option> `)}
                                        </select>
                                        ${this.sttError ? H`<div class="inline-error-message">${this.sttError}</div>` : ""}
                                    </div>
                                ` : H`
                                    <div class="input-wrapper">
                                        <input
                                            type="password"
                                            class="api-input ${this.sttError ? "invalid" : ""}"
                                            placeholder="Enter your STT API key"
                                            .value=${this.sttApiKey}
                                            @input=${(e2) => {
      this.sttApiKey = e2.target.value;
      this.sttError = "";
    }}
                                            ?disabled=${this.isLoading}
                                        />
                                        ${this.sttError ? H`<div class="inline-error-message">${this.sttError}</div>` : ""}
                                    </div>
                                `}
                    </div>
                </div>
                <div class="confirm-button-container">
                    <button class="confirm-button" @click=${this.handleSubmit} ?disabled=${isButtonDisabled}>
                        ${this.isLoading ? "Setting up..." : this.installingModel ? `Installing ${this.installingModel}...` : Object.keys(this.whisperInstallingModels).length > 0 ? `Downloading...` : "Confirm"}
                    </button>
                </div>

                <div class="footer">
                    Get your API key from: OpenAI | Google | Anthropic
                    <br />
                    Glass does not collect your personal data —
                    <span class="footer-link" @click=${this.openPrivacyPolicy}>See details</span>
                </div>

                <div class="error-message ${this.shouldFadeMessage("error") ? "message-fade-out" : ""}" @animationend=${this.handleMessageFadeEnd}>
                    ${this.errorMessage}
                </div>
                <div
                    class="success-message ${this.shouldFadeMessage("success") ? "message-fade-out" : ""}"
                    @animationend=${this.handleMessageFadeEnd}
                >
                    ${this.successMessage}
                </div>
            </div>
        `;
  }
};
customElements.define("apikey-header", ApiKeyHeader);

// src/ui/app/PermissionHeader.js
var PermissionHeader = class extends ut {
  static styles = r`
        :host {
            display: block;
            transition: opacity 0.3s ease-in, transform 0.3s ease-in;
            will-change: opacity, transform;
        }

        :host(.sliding-out) {
            opacity: 0;
            transform: translateY(-20px);
        }

        :host(.hidden) {
            opacity: 0;
            pointer-events: none;
        }

        * {
            font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            cursor: default;
            user-select: none;
            box-sizing: border-box;
        }

        .container {
            -webkit-app-region: drag;
            width: 285px;
            /* height is now set dynamically */
            padding: 18px 20px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 16px;
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 16px;
            padding: 1px;
            background: linear-gradient(169deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.5) 100%);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: destination-out;
            mask-composite: exclude;
            pointer-events: none;
        }

        .close-button {
            -webkit-app-region: no-drag;
            position: absolute;
            top: 10px;
            right: 10px;
            width: 14px;
            height: 14px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 3px;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s ease;
            z-index: 10;
            font-size: 14px;
            line-height: 1;
            padding: 0;
        }

        .close-button:hover {
            background: rgba(255, 255, 255, 0.2);
            color: rgba(255, 255, 255, 0.9);
        }

        .close-button:active {
            transform: scale(0.95);
        }

        .title {
            color: white;
            font-size: 16px;
            font-weight: 500;
            margin: 0;
            text-align: center;
            flex-shrink: 0;
        }

        .form-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            margin-top: auto;
        }

        .form-content.all-granted {
            flex-grow: 1;
            justify-content: center;
            margin-top: 0;
        }

        .subtitle {
            color: rgba(255, 255, 255, 0.7);
            font-size: 11px;
            font-weight: 400;
            text-align: center;
            margin-bottom: 12px;
            line-height: 1.3;
        }

        .permission-status {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-bottom: 12px;
            min-height: 20px;
        }

        .permission-item {
            display: flex;
            align-items: center;
            gap: 6px;
            color: rgba(255, 255, 255, 0.8);
            font-size: 11px;
            font-weight: 400;
        }

        .permission-item.granted {
            color: rgba(34, 197, 94, 0.9);
        }

        .permission-icon {
            width: 12px;
            height: 12px;
            opacity: 0.8;
        }

        .check-icon {
            width: 12px;
            height: 12px;
            color: rgba(34, 197, 94, 0.9);
        }

        .action-button {
            -webkit-app-region: no-drag;
            width: 100%;
            height: 34px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.15s ease;
            position: relative;
            overflow: hidden;
            margin-bottom: 6px;
        }

        .action-button::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 10px;
            padding: 1px;
            background: linear-gradient(169deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.5) 100%);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: destination-out;
            mask-composite: exclude;
            pointer-events: none;
        }

        .action-button:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.3);
        }

        .action-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .continue-button {
            -webkit-app-region: no-drag;
            width: 100%;
            height: 34px;
            background: rgba(34, 197, 94, 0.8);
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.15s ease;
            position: relative;
            overflow: hidden;
            margin-top: 4px;
        }

        .continue-button::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 10px;
            padding: 1px;
            background: linear-gradient(169deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.5) 100%);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: destination-out;
            mask-composite: exclude;
            pointer-events: none;
        }

        .continue-button:hover:not(:disabled) {
            background: rgba(34, 197, 94, 0.9);
        }

        .continue-button:disabled {
            background: rgba(255, 255, 255, 0.2);
            cursor: not-allowed;
        }
        
        /* ────────────────[ GLASS BYPASS ]─────────────── */
        :host-context(body.has-glass) .container,
        :host-context(body.has-glass) .action-button,
        :host-context(body.has-glass) .continue-button,
        :host-context(body.has-glass) .close-button {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            filter: none !important;
            backdrop-filter: none !important;
        }

        :host-context(body.has-glass) .container::after,
        :host-context(body.has-glass) .action-button::after,
        :host-context(body.has-glass) .continue-button::after {
            display: none !important;
        }

        :host-context(body.has-glass) .action-button:hover,
        :host-context(body.has-glass) .continue-button:hover,
        :host-context(body.has-glass) .close-button:hover {
            background: transparent !important;
        }
    `;
  static properties = {
    microphoneGranted: { type: String },
    screenGranted: { type: String },
    keychainGranted: { type: String },
    isChecking: { type: String },
    continueCallback: { type: Function },
    userMode: { type: String }
    // 'local' or 'firebase'
  };
  constructor() {
    super();
    this.microphoneGranted = "unknown";
    this.screenGranted = "unknown";
    this.keychainGranted = "unknown";
    this.isChecking = false;
    this.continueCallback = null;
    this.userMode = "local";
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("userMode")) {
      const newHeight = this.userMode === "firebase" ? 280 : 220;
      console.log(`[PermissionHeader] User mode changed to ${this.userMode}, requesting resize to ${newHeight}px`);
      this.dispatchEvent(new CustomEvent("request-resize", {
        detail: { height: newHeight },
        bubbles: true,
        composed: true
      }));
    }
  }
  async connectedCallback() {
    super.connectedCallback();
    if (window.api) {
      try {
        const userState = await window.api.common.getCurrentUser();
        this.userMode = userState.mode;
      } catch (e2) {
        console.error("[PermissionHeader] Failed to get user state", e2);
        this.userMode = "local";
      }
    }
    await this.checkPermissions();
    this.permissionCheckInterval = setInterval(async () => {
      if (window.api) {
        try {
          const userState = await window.api.common.getCurrentUser();
          this.userMode = userState.mode;
        } catch (e2) {
          this.userMode = "local";
        }
      }
      this.checkPermissions();
    }, 1e3);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.permissionCheckInterval) {
      clearInterval(this.permissionCheckInterval);
    }
  }
  async checkPermissions() {
    if (!window.api || this.isChecking) return;
    this.isChecking = true;
    try {
      const permissions = await window.api.permissionHeader.checkSystemPermissions();
      console.log("[PermissionHeader] Permission check result:", permissions);
      const prevMic = this.microphoneGranted;
      const prevScreen = this.screenGranted;
      const prevKeychain = this.keychainGranted;
      this.microphoneGranted = permissions.microphone;
      this.screenGranted = permissions.screen;
      this.keychainGranted = permissions.keychain;
      if (prevMic !== this.microphoneGranted || prevScreen !== this.screenGranted || prevKeychain !== this.keychainGranted) {
        console.log("[PermissionHeader] Permission status changed, updating UI");
        this.requestUpdate();
      }
      const isKeychainRequired = this.userMode === "firebase";
      const keychainOk = !isKeychainRequired || this.keychainGranted === "granted";
      if (this.microphoneGranted === "granted" && this.screenGranted === "granted" && keychainOk && this.continueCallback) {
        console.log("[PermissionHeader] All permissions granted, proceeding automatically");
        setTimeout(() => this.handleContinue(), 500);
      }
    } catch (error) {
      console.error("[PermissionHeader] Error checking permissions:", error);
    } finally {
      this.isChecking = false;
    }
  }
  async handleMicrophoneClick() {
    if (!window.api || this.microphoneGranted === "granted") return;
    console.log("[PermissionHeader] Requesting microphone permission...");
    try {
      const result = await window.api.permissionHeader.checkSystemPermissions();
      console.log("[PermissionHeader] Microphone permission result:", result);
      if (result.microphone === "granted") {
        this.microphoneGranted = "granted";
        this.requestUpdate();
        return;
      }
      if (result.microphone === "not-determined" || result.microphone === "denied" || result.microphone === "unknown" || result.microphone === "restricted") {
        const res = await window.api.permissionHeader.requestMicrophonePermission();
        if (res.status === "granted" || res.success === true) {
          this.microphoneGranted = "granted";
          this.requestUpdate();
          return;
        }
      }
    } catch (error) {
      console.error("[PermissionHeader] Error requesting microphone permission:", error);
    }
  }
  async handleScreenClick() {
    if (!window.api || this.screenGranted === "granted") return;
    console.log("[PermissionHeader] Checking screen recording permission...");
    try {
      const permissions = await window.api.permissionHeader.checkSystemPermissions();
      console.log("[PermissionHeader] Screen permission check result:", permissions);
      if (permissions.screen === "granted") {
        this.screenGranted = "granted";
        this.requestUpdate();
        return;
      }
      if (permissions.screen === "not-determined" || permissions.screen === "denied" || permissions.screen === "unknown" || permissions.screen === "restricted") {
        console.log("[PermissionHeader] Opening screen recording preferences...");
        await window.api.permissionHeader.openSystemPreferences("screen-recording");
      }
    } catch (error) {
      console.error("[PermissionHeader] Error opening screen recording preferences:", error);
    }
  }
  async handleKeychainClick() {
    if (!window.api || this.keychainGranted === "granted") return;
    console.log("[PermissionHeader] Requesting keychain permission...");
    try {
      await window.api.permissionHeader.initializeEncryptionKey();
      this.keychainGranted = "granted";
      this.requestUpdate();
    } catch (error) {
      console.error("[PermissionHeader] Error requesting keychain permission:", error);
    }
  }
  async handleContinue() {
    const isKeychainRequired = this.userMode === "firebase";
    const keychainOk = !isKeychainRequired || this.keychainGranted === "granted";
    if (this.continueCallback && this.microphoneGranted === "granted" && this.screenGranted === "granted" && keychainOk) {
      if (window.api && isKeychainRequired) {
        try {
          await window.api.permissionHeader.markKeychainCompleted();
          console.log("[PermissionHeader] Marked keychain as completed");
        } catch (error) {
          console.error("[PermissionHeader] Error marking keychain as completed:", error);
        }
      }
      this.continueCallback();
    }
  }
  handleClose() {
    console.log("Close button clicked");
    if (window.api) {
      window.api.common.quitApplication();
    }
  }
  render() {
    const isKeychainRequired = this.userMode === "firebase";
    const containerHeight = isKeychainRequired ? 280 : 220;
    const keychainOk = !isKeychainRequired || this.keychainGranted === "granted";
    const allGranted = this.microphoneGranted === "granted" && this.screenGranted === "granted" && keychainOk;
    return H`
            <div class="container" style="height: ${containerHeight}px">
                <button class="close-button" @click=${this.handleClose} title="Close application">
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
                        <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="1.2" />
                    </svg>
                </button>
                <h1 class="title">Permission Setup Required</h1>

                <div class="form-content ${allGranted ? "all-granted" : ""}">
                    ${!allGranted ? H`
                        <div class="subtitle">Grant access to microphone, screen recording${isKeychainRequired ? " and keychain" : ""} to continue</div>
                        
                        <div class="permission-status">
                            <div class="permission-item ${this.microphoneGranted === "granted" ? "granted" : ""}">
                                ${this.microphoneGranted === "granted" ? H`
                                    <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                    </svg>
                                    <span>Microphone ✓</span>
                                ` : H`
                                    <svg class="permission-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd" />
                                    </svg>
                                    <span>Microphone</span>
                                `}
                            </div>
                            
                            <div class="permission-item ${this.screenGranted === "granted" ? "granted" : ""}">
                                ${this.screenGranted === "granted" ? H`
                                    <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                    </svg>
                                    <span>Screen ✓</span>
                                ` : H`
                                    <svg class="permission-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd" />
                                    </svg>
                                    <span>Screen Recording</span>
                                `}
                            </div>

                            ${isKeychainRequired ? H`
                                <div class="permission-item ${this.keychainGranted === "granted" ? "granted" : ""}">
                                    ${this.keychainGranted === "granted" ? H`
                                        <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                        <span>Data Encryption ✓</span>
                                    ` : H`
                                        <svg class="permission-icon" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.744 5.668l-1.649 1.652c-.63.63-1.706.19-1.706-.742V12.18a.75.75 0 00-1.5 0v2.696c0 .932-1.075 1.372-1.706.742l-1.649-1.652A6 6 0 112 8zm-4 0a.75.75 0 00.75-.75A3.75 3.75 0 018.25 4a.75.75 0 000 1.5 2.25 2.25 0 012.25 2.25.75.75 0 00.75.75z" clip-rule="evenodd" />
                                        </svg>
                                        <span>Data Encryption</span>
                                    `}
                                </div>
                            ` : ""}
                        </div>

                        <button 
                            class="action-button" 
                            @click=${this.handleMicrophoneClick}
                            ?disabled=${this.microphoneGranted === "granted"}
                        >
                            ${this.microphoneGranted === "granted" ? "Microphone Access Granted" : "Grant Microphone Access"}
                        </button>

                        <button 
                            class="action-button" 
                            @click=${this.handleScreenClick}
                            ?disabled=${this.screenGranted === "granted"}
                        >
                            ${this.screenGranted === "granted" ? "Screen Recording Granted" : "Grant Screen Recording Access"}
                        </button>

                        ${isKeychainRequired ? H`
                            <button 
                                class="action-button" 
                                @click=${this.handleKeychainClick}
                                ?disabled=${this.keychainGranted === "granted"}
                            >
                                ${this.keychainGranted === "granted" ? "Encryption Enabled" : "Enable Encryption"}
                            </button>
                            <div class="subtitle" style="visibility: ${this.keychainGranted === "granted" ? "hidden" : "visible"}">
                                Stores the key to encrypt your data. Press "<b>Always Allow</b>" to continue.
                            </div>
                        ` : ""}
                    ` : H`
                        <button 
                            class="continue-button" 
                            @click=${this.handleContinue}
                        >
                            Continue to Pickle Glass
                        </button>
                    `}
                </div>
            </div>
        `;
  }
};
customElements.define("permission-setup", PermissionHeader);

// src/ui/app/WelcomeHeader.js
var WelcomeHeader = class extends ut {
  static styles = r`
        :host {
            display: block;
            font-family:
                'Inter',
                -apple-system,
                BlinkMacSystemFont,
                'Segoe UI',
                Roboto,
                sans-serif;
        }
        .container {
            width: 100%;
            box-sizing: border-box;
            height: auto;
            padding: 24px 16px;
            background: rgba(0, 0, 0, 0.64);
            box-shadow: 0px 0px 0px 1.5px rgba(255, 255, 255, 0.64) inset;
            border-radius: 16px;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 32px;
            display: inline-flex;
            -webkit-app-region: drag;
        }
        .close-button {
            -webkit-app-region: no-drag;
            position: absolute;
            top: 16px;
            right: 16px;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 5px;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s ease;
            z-index: 10;
            font-size: 16px;
            line-height: 1;
            padding: 0;
        }
        .close-button:hover {
            background: rgba(255, 255, 255, 0.2);
            color: rgba(255, 255, 255, 0.9);
        }
        .header-section {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 4px;
            display: flex;
        }
        .title {
            color: white;
            font-size: 18px;
            font-weight: 700;
        }
        .subtitle {
            color: white;
            font-size: 14px;
            font-weight: 500;
        }
        .option-card {
            width: 100%;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 8px;
            display: inline-flex;
        }
        .divider {
            width: 1px;
            align-self: stretch;
            position: relative;
            background: #bebebe;
            border-radius: 2px;
        }
        .option-content {
            flex: 1 1 0;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 8px;
            display: inline-flex;
            min-width: 0;
        }
        .option-title {
            color: white;
            font-size: 14px;
            font-weight: 700;
        }
        .option-description {
            color: #dcdcdc;
            font-size: 12px;
            font-weight: 400;
            line-height: 18px;
            letter-spacing: 0.12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .action-button {
            -webkit-app-region: no-drag;
            padding: 8px 10px;
            background: rgba(132.6, 132.6, 132.6, 0.8);
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.16);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            justify-content: center;
            align-items: center;
            gap: 6px;
            display: flex;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .action-button:hover {
            background: rgba(150, 150, 150, 0.9);
        }
        .button-text {
            color: white;
            font-size: 12px;
            font-weight: 600;
        }
        .button-icon {
            width: 12px;
            height: 12px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .arrow-icon {
            border: solid white;
            border-width: 0 1.2px 1.2px 0;
            display: inline-block;
            padding: 3px;
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
        }
        .footer {
            align-self: stretch;
            text-align: center;
            color: #dcdcdc;
            font-size: 12px;
            font-weight: 500;
            line-height: 19.2px;
        }
        .footer-link {
            text-decoration: underline;
            cursor: pointer;
            -webkit-app-region: no-drag;
        }
    `;
  static properties = {
    loginCallback: { type: Function },
    apiKeyCallback: { type: Function }
  };
  constructor() {
    super();
    this.loginCallback = () => {
    };
    this.apiKeyCallback = () => {
    };
    this.handleClose = this.handleClose.bind(this);
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    this.dispatchEvent(new CustomEvent("content-changed", { bubbles: true, composed: true }));
  }
  handleClose() {
    if (window.api?.common) {
      window.api.common.quitApplication();
    }
  }
  render() {
    return H`
            <div class="container">
                <button class="close-button" @click=${this.handleClose}>×</button>
                <div class="header-section">
                    <div class="title">Welcome to Tars</div>
                    <div class="subtitle">Your interview copilot — set up your AI keys</div>
                </div>
                <div class="option-card">
                    <div class="divider"></div>
                    <div class="option-content">
                        <div class="option-title">Sign in with Google</div>
                        <div class="option-description">
                            Sync sessions across devices<br/>Cloud backup of transcripts<br/>Sign in with Google in seconds
                        </div>
                    </div>
                    <button class="action-button" @click=${this.loginCallback}>
                        <div class="button-text">Open Browser to Log in</div>
                        <div class="button-icon"><div class="arrow-icon"></div></div>
                    </button>
                </div>
                <div class="option-card">
                    <div class="divider"></div>
                    <div class="option-content">
                        <div class="option-title">Enter your API keys</div>
                        <div class="option-description">
                            Add your LLM key (OpenAI, Anthropic, Gemini)<br/>Add your Aqua Voice key for Avalon STT<br/>All keys stored locally
                        </div>
                    </div>
                    <button class="action-button" @click=${this.apiKeyCallback}>
                        <div class="button-text">Set Up API Keys</div>
                        <div class="button-icon"><div class="arrow-icon"></div></div>
                    </button>
                </div>
                <div class="footer">
                    Tars stores all data locally —
                    <span class="footer-link" @click=${this.openPrivacyPolicy}>See details</span>
                </div>
            </div>
        `;
  }
  openPrivacyPolicy() {
    console.log("\u{1F50A} openPrivacyPolicy WelcomeHeader");
    if (window.api?.common) {
      window.api.common.openExternal("https://pickle.com/privacy-policy");
    }
  }
};
customElements.define("welcome-header", WelcomeHeader);

// src/ui/app/HeaderController.js
var HeaderTransitionManager = class {
  constructor() {
    this.headerContainer = document.getElementById("header-container");
    this.currentHeaderType = null;
    this.welcomeHeader = null;
    this.apiKeyHeader = null;
    this.mainHeader = null;
    this.permissionHeader = null;
    this.ensureHeader = (type) => {
      console.log("[HeaderController] ensureHeader: Ensuring header of type:", type);
      if (this.currentHeaderType === type) {
        console.log("[HeaderController] ensureHeader: Header of type:", type, "already exists.");
        return;
      }
      this.headerContainer.innerHTML = "";
      this.welcomeHeader = null;
      this.apiKeyHeader = null;
      this.mainHeader = null;
      this.permissionHeader = null;
      if (type === "welcome") {
        this.welcomeHeader = document.createElement("welcome-header");
        this.welcomeHeader.loginCallback = () => this.handleLoginOption();
        this.welcomeHeader.apiKeyCallback = () => this.handleApiKeyOption();
        this.headerContainer.appendChild(this.welcomeHeader);
        console.log("[HeaderController] ensureHeader: Header of type:", type, "created.");
      } else if (type === "apikey") {
        this.apiKeyHeader = document.createElement("apikey-header");
        this.apiKeyHeader.stateUpdateCallback = (userState) => this.handleStateUpdate(userState);
        this.apiKeyHeader.backCallback = () => this.transitionToWelcomeHeader();
        this.apiKeyHeader.addEventListener("request-resize", (e2) => {
          this._resizeForApiKey(e2.detail.height);
        });
        this.headerContainer.appendChild(this.apiKeyHeader);
        console.log("[HeaderController] ensureHeader: Header of type:", type, "created.");
      } else if (type === "permission") {
        this.permissionHeader = document.createElement("permission-setup");
        this.permissionHeader.addEventListener("request-resize", (e2) => {
          this._resizeForPermissionHeader(e2.detail.height);
        });
        this.permissionHeader.continueCallback = async () => {
          if (window.api && window.api.headerController) {
            console.log("[HeaderController] Re-initializing model state after permission grant...");
            await window.api.headerController.reInitializeModelState();
          }
          this.transitionToMainHeader();
        };
        this.headerContainer.appendChild(this.permissionHeader);
      } else {
        this.mainHeader = document.createElement("main-header");
        this.headerContainer.appendChild(this.mainHeader);
        this.mainHeader.startSlideInAnimation?.();
      }
      this.currentHeaderType = type;
      this.notifyHeaderState(type === "permission" ? "apikey" : type);
    };
    console.log("[HeaderController] Manager initialized");
    this.handleLoginOption = this.handleLoginOption.bind(this);
    this.handleApiKeyOption = this.handleApiKeyOption.bind(this);
    this._bootstrap();
    if (window.api) {
      window.api.headerController.onUserStateChanged((event, userState) => {
        console.log("[HeaderController] Received user state change:", userState);
        this.handleStateUpdate(userState);
      });
      window.api.headerController.onAuthFailed((event, { message }) => {
        console.error("[HeaderController] Received auth failure from main process:", message);
        if (this.apiKeyHeader) {
          this.apiKeyHeader.errorMessage = "Authentication failed. Please try again.";
          this.apiKeyHeader.isLoading = false;
        }
      });
      window.api.headerController.onForceShowApiKeyHeader(async () => {
        console.log("[HeaderController] Received broadcast to show apikey header. Switching now.");
        const isConfigured = await window.api.apiKeyHeader.areProvidersConfigured();
        if (!isConfigured) {
          await this._resizeForWelcome();
          this.ensureHeader("welcome");
        } else {
          await this._resizeForApiKey();
          this.ensureHeader("apikey");
        }
      });
    }
  }
  notifyHeaderState(stateOverride) {
    const state = stateOverride || this.currentHeaderType || "apikey";
    if (window.api) {
      window.api.headerController.sendHeaderStateChanged(state);
    }
  }
  async _bootstrap() {
    if (window.api) {
      const userState = await window.api.common.getCurrentUser();
      console.log("[HeaderController] Bootstrapping with initial user state:", userState);
      this.handleStateUpdate(userState);
    } else {
      this.ensureHeader("welcome");
    }
  }
  //////// after_modelStateService ////////
  async handleStateUpdate(userState) {
    const isConfigured = await window.api.apiKeyHeader.areProvidersConfigured();
    if (isConfigured) {
      const permissionResult = await this.checkPermissions();
      if (permissionResult.success) {
        this.transitionToMainHeader();
      } else {
        this.transitionToPermissionHeader();
      }
    } else {
      await this._resizeForWelcome();
      this.ensureHeader("welcome");
    }
  }
  // WelcomeHeader 콜백 메서드들
  async handleLoginOption() {
    console.log("[HeaderController] Login option selected");
    if (window.api) {
      await window.api.common.startFirebaseAuth();
    }
  }
  async handleApiKeyOption() {
    console.log("[HeaderController] API key option selected");
    await this._resizeForApiKey(400);
    this.ensureHeader("apikey");
    if (this.apiKeyHeader) {
      this.apiKeyHeader.backCallback = () => this.transitionToWelcomeHeader();
    }
  }
  async transitionToWelcomeHeader() {
    if (this.currentHeaderType === "welcome") {
      return this._resizeForWelcome();
    }
    await this._resizeForWelcome();
    this.ensureHeader("welcome");
  }
  //////// after_modelStateService ////////
  async transitionToPermissionHeader() {
    if (this.currentHeaderType === "permission") {
      console.log("[HeaderController] Already showing permission setup, skipping transition");
      return;
    }
    if (window.api) {
      try {
        const permissionsCompleted = await window.api.headerController.checkPermissionsCompleted();
        if (permissionsCompleted) {
          console.log("[HeaderController] Permissions were previously completed, checking current status...");
          const permissionResult = await this.checkPermissions();
          if (permissionResult.success) {
            this.transitionToMainHeader();
            return;
          }
          console.log("[HeaderController] Permissions were revoked, showing setup again");
        }
      } catch (error) {
        console.error("[HeaderController] Error checking permissions completed status:", error);
      }
    }
    let initialHeight = 220;
    if (window.api) {
      try {
        const userState = await window.api.common.getCurrentUser();
        if (userState.mode === "firebase") {
          initialHeight = 280;
        }
      } catch (e2) {
        console.error("Could not get user state for resize", e2);
      }
    }
    await this._resizeForPermissionHeader(initialHeight);
    this.ensureHeader("permission");
  }
  async transitionToMainHeader(animate = true) {
    if (this.currentHeaderType === "main") {
      return this._resizeForMain();
    }
    await this._resizeForMain();
    this.ensureHeader("main");
  }
  async _resizeForMain() {
    if (!window.api) return;
    console.log("[HeaderController] _resizeForMain: Resizing window to 353x47");
    return window.api.headerController.resizeHeaderWindow({ width: 353, height: 47 }).catch(() => {
    });
  }
  async _resizeForApiKey(height = 370) {
    if (!window.api) return;
    console.log(`[HeaderController] _resizeForApiKey: Resizing window to 456x${height}`);
    return window.api.headerController.resizeHeaderWindow({ width: 456, height }).catch(() => {
    });
  }
  async _resizeForPermissionHeader(height) {
    if (!window.api) return;
    const finalHeight = height || 220;
    return window.api.headerController.resizeHeaderWindow({ width: 285, height: finalHeight }).catch(() => {
    });
  }
  async _resizeForWelcome() {
    if (!window.api) return;
    console.log("[HeaderController] _resizeForWelcome: Resizing window to 456x370");
    return window.api.headerController.resizeHeaderWindow({ width: 456, height: 364 }).catch(() => {
    });
  }
  async checkPermissions() {
    if (!window.api) {
      return { success: true };
    }
    try {
      const permissions = await window.api.headerController.checkSystemPermissions();
      console.log("[HeaderController] Current permissions:", permissions);
      if (!permissions.needsSetup) {
        return { success: true };
      }
      let errorMessage = "";
      if (!permissions.microphone && !permissions.screen) {
        errorMessage = "Microphone and screen recording access required";
      }
      return {
        success: false,
        error: errorMessage
      };
    } catch (error) {
      console.error("[HeaderController] Error checking permissions:", error);
      return {
        success: false,
        error: "Failed to check permissions"
      };
    }
  }
};
window.addEventListener("DOMContentLoaded", () => {
  new HeaderTransitionManager();
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
//# sourceMappingURL=header.js.map
