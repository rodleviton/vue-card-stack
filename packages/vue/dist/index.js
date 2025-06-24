import { defineComponent as Q, ref as u, computed as l, onMounted as Z, onBeforeUnmount as ee, createElementBlock as E, openBlock as T, createElementVNode as te, renderSlot as Y, normalizeStyle as A, Fragment as ae, renderList as ne, nextTick as oe } from "vue";
const se = /* @__PURE__ */ Q({
  __name: "VueCardStack",
  props: {
    cards: {},
    cardWidth: { default: 300 },
    cardHeight: { default: 400 },
    stackWidth: { default: null },
    sensitivity: { default: 0.25 },
    maxVisibleCards: { default: 10 },
    scaleMultiplier: { default: 0.5 },
    speed: { default: 0.2 },
    paddingHorizontal: { default: 20 },
    paddingVertical: { default: 20 }
  },
  emits: ["move"],
  setup(d, { emit: P }) {
    const f = (t, a) => {
      let n;
      return function(...W) {
        const x = () => {
          clearTimeout(n), t(...W);
        };
        clearTimeout(n), n = setTimeout(x, a);
      };
    }, e = d, h = P, s = u([]), V = u(0), c = u(1), m = u(!1), g = u(0), H = u(0), k = u(!1), r = u(null), y = l(() => {
      var t;
      if (e.stackWidth) {
        if (typeof e.stackWidth == "number")
          return e.stackWidth;
      } else return e.cardWidth + e.paddingHorizontal * 2;
      return V.value || ((t = r.value) == null ? void 0 : t.clientWidth) || 0;
    }), _ = l(() => e.cards.length > e.maxVisibleCards ? e.maxVisibleCards : e.cards.length - 1), S = l(() => (e.scaleMultiplier - 1) * -1 / 10), N = l(() => {
      if (e.stackWidth) {
        if (typeof e.stackWidth == "number")
          return `${e.stackWidth}px`;
      } else return `${e.cardWidth + e.paddingHorizontal * 2}px`;
      return e.stackWidth;
    }), $ = l(() => {
      var t;
      return ((t = r.value) == null ? void 0 : t.getBoundingClientRect().x) || 0;
    }), v = l(() => "ontouchstart" in window), w = l(() => v.value ? "touchmove" : "mousemove"), L = l(() => v.value ? "touchstart" : "mousedown"), b = l(() => v.value ? "touchend" : "mouseup"), D = l(() => e.cards.map((t, a) => {
      const n = z.value * (a - 1);
      return a ? a === 1 ? y.value - e.cardWidth - e.paddingHorizontal : y.value - e.cardWidth - n - e.paddingHorizontal : y.value + e.paddingHorizontal;
    })), i = l(() => e.cards.map((t, a) => {
      const n = a >= 1 ? 1 - S.value * (a - 1) : 1, o = D.value[a];
      return {
        opacity: a > 0 && a < _.value ? 1 : 0,
        display: a < _.value + 1 ? "block" : "none",
        xPos: a < _.value ? o : o + z.value,
        yPos: e.paddingVertical,
        scale: n > 0 ? n : 0,
        width: e.cardWidth,
        height: e.cardHeight,
        zIndex: e.cards.length - a,
        isDragging: m.value
      };
    })), z = l(() => (y.value - e.paddingHorizontal * 2 - e.cardWidth) / (_.value - 2)), U = l(() => s.value[c.value] ? s.value[c.value]._index : 0), j = () => {
      const t = [...e.cards];
      t.unshift(t.pop()), s.value = t.map((a, n) => ({
        _id: (/* @__PURE__ */ new Date()).getTime() + n,
        _index: n,
        ...a,
        ...i.value[n]
      })), console.log("Card yPos values:", s.value.map((a) => ({ id: a._id, yPos: a.yPos }))), console.log("PaddingVertical:", e.paddingVertical);
    }, p = () => {
      oe(() => {
        s.value = s.value.map((t, a) => ({
          ...t,
          ...i.value[a]
        }));
      });
    }, I = f(() => {
      r.value && (V.value = r.value.clientWidth, p());
    }, 250), R = () => {
      const t = s.value.shift();
      s.value.push(t), p();
    }, M = () => {
      const t = s.value.pop();
      s.value.unshift(t), p();
    }, q = () => {
      const t = s.value[c.value], a = D.value[c.value], n = t.xPos - a, o = (e.cardWidth + e.paddingHorizontal) / (1 / e.sensitivity);
      h("move", 0), k.value ? n > o ? R() : p() : n * -1 > o ? M() : p();
    }, G = (t) => {
      const a = t - g.value;
      h(
        "move",
        a / (e.cardWidth + e.paddingHorizontal)
      ), k.value ? c.value = 1 : c.value = 0, s.value = s.value.map((n, o) => {
        const W = o === c.value, x = W ? i.value[o].xPos + a : i.value[o].xPos + z.value / (e.cardWidth + e.paddingHorizontal) * a, K = W ? i.value[o].scale : i.value[o].scale + S.value / (e.cardWidth + e.paddingHorizontal) * a;
        return {
          ...n,
          ...i.value[o],
          xPos: x,
          scale: K,
          opacity: o === 0 && !k.value ? 1 : i.value[o].opacity
        };
      });
    }, O = (t) => v.value ? t.touches[0].clientX : t.clientX, J = (t) => v.value ? t.touches[0].clientY : t.clientY, X = (t) => {
      m.value = !0, g.value = O(t) - $.value, H.value = J(t), document.addEventListener(w.value, C);
    }, B = () => {
      m.value = !1, g.value = 0, H.value = 0, document.removeEventListener(w.value, C), q();
    }, C = (t) => {
      const a = O(t) - $.value;
      k.value = a > g.value, G(a);
    };
    return Z(() => {
      j(), window.addEventListener("resize", I), r.value && r.value.addEventListener(L.value, X), document.addEventListener(b.value, B);
    }), ee(() => {
      window.removeEventListener("resize", I), r.value && r.value.removeEventListener(L.value, X), document.removeEventListener(b.value, B), document.removeEventListener(w.value, C);
    }), (t, a) => (T(), E("div", {
      class: "vue-card-stack__wrapper",
      ref_key: "elementRef",
      ref: r
    }, [
      te("div", {
        class: "vue-card-stack__stack",
        style: A({
          height: `${e.cardHeight + e.paddingVertical * 2}px`,
          width: N.value
        })
      }, [
        (T(!0), E(ae, null, ne(s.value, (n, o) => (T(), E("div", {
          class: "vue-card-stack__card",
          key: n._id,
          style: A({
            opacity: n.opacity,
            display: n.display,
            width: `${n.width}px`,
            height: `${n.height}px`,
            zIndex: n.zIndex,
            transition: `transform ${m.value ? 0 : e.speed}s ease, opacity ${e.speed}s ease`,
            transform: `
            scale(${n.scale}, ${n.scale}) 
            translate(${n.xPos}px, ${n.yPos}px)
          `
          })
        }, [
          Y(t.$slots, "card", {
            card: { ...n, $index: o }
          }, void 0, !0)
        ], 4))), 128))
      ], 4),
      Y(t.$slots, "nav", {
        activeCardIndex: U.value,
        onNext: R,
        onPrevious: M
      }, void 0, !0)
    ], 512));
  }
}), le = (d, P) => {
  const f = d.__vccOpts || d;
  for (const [e, h] of P)
    f[e] = h;
  return f;
}, F = /* @__PURE__ */ le(se, [["__scopeId", "data-v-63270985"]]), ie = {
  install: (d) => {
    d.component("VueCardStack", F);
  }
};
typeof window < "u" && window.Vue && window.Vue.component("VueCardStack", F);
export {
  F as VueCardStack,
  ie as default
};
