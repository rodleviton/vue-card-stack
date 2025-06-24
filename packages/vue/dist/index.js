import { defineComponent as Q, ref as c, computed as l, onMounted as Z, onBeforeUnmount as ee, createElementBlock as E, openBlock as T, createElementVNode as te, renderSlot as Y, normalizeStyle as A, Fragment as ae, renderList as ne, nextTick as oe } from "vue";
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
  setup(d, { emit: w }) {
    const f = (t, a) => {
      let n;
      return function(...y) {
        const x = () => {
          clearTimeout(n), t(...y);
        };
        clearTimeout(n), n = setTimeout(x, a);
      };
    }, e = d, h = w, s = c([]), H = c(0), i = c(1), m = c(!1), g = c(0), S = c(0), k = c(!1), r = c(null), _ = l(() => {
      var t;
      if (e.stackWidth) {
        if (typeof e.stackWidth == "number")
          return e.stackWidth;
      } else return e.cardWidth + e.paddingHorizontal * 2;
      return H.value || ((t = r.value) == null ? void 0 : t.clientWidth) || 0;
    }), W = l(() => e.cards.length > e.maxVisibleCards ? e.maxVisibleCards : e.cards.length - 1), V = l(() => (e.scaleMultiplier - 1) * -1 / 10), N = l(() => {
      if (e.stackWidth) {
        if (typeof e.stackWidth == "number")
          return `${e.stackWidth}px`;
      } else return `${e.cardWidth + e.paddingHorizontal * 2}px`;
      return e.stackWidth;
    }), $ = l(() => {
      var t;
      return ((t = r.value) == null ? void 0 : t.getBoundingClientRect().x) || 0;
    }), v = l(() => "ontouchstart" in window), z = l(() => v.value ? "touchmove" : "mousemove"), L = l(() => v.value ? "touchstart" : "mousedown"), b = l(() => v.value ? "touchend" : "mouseup"), D = l(() => e.cards.map((t, a) => {
      const n = C.value * (a - 1);
      return a ? a === 1 ? _.value - e.cardWidth - e.paddingHorizontal : _.value - e.cardWidth - n - e.paddingHorizontal : _.value + e.paddingHorizontal;
    })), u = l(() => e.cards.map((t, a) => {
      const n = a >= 1 ? 1 - V.value * (a - 1) : 1, o = D.value[a];
      return {
        opacity: a > 0 && a < W.value ? 1 : 0,
        display: a < W.value + 1 ? "block" : "none",
        xPos: a < W.value ? o : o + C.value,
        yPos: e.paddingVertical,
        scale: n > 0 ? n : 0,
        width: e.cardWidth,
        height: e.cardHeight,
        zIndex: e.cards.length - a,
        isDragging: m.value
      };
    })), C = l(() => (_.value - e.paddingHorizontal * 2 - e.cardWidth) / (W.value - 2)), U = l(() => s.value[i.value] ? s.value[i.value]._index : 0), j = () => {
      const t = [...e.cards];
      t.unshift(t.pop()), s.value = t.map((a, n) => ({
        _id: (/* @__PURE__ */ new Date()).getTime() + n,
        _index: n,
        ...a,
        ...u.value[n]
      }));
    }, p = () => {
      oe(() => {
        s.value = s.value.map((t, a) => ({
          ...t,
          ...u.value[a]
        }));
      });
    }, I = f(() => {
      r.value && (H.value = r.value.clientWidth, p());
    }, 250), R = () => {
      const t = s.value.shift();
      s.value.push(t), p();
    }, M = () => {
      const t = s.value.pop();
      s.value.unshift(t), p();
    }, q = () => {
      const t = s.value[i.value], a = D.value[i.value], n = t.xPos - a, o = (e.cardWidth + e.paddingHorizontal) / (1 / e.sensitivity);
      h("move", 0), k.value ? n > o ? R() : p() : n * -1 > o ? M() : p();
    }, G = (t) => {
      const a = t - g.value;
      h(
        "move",
        a / (e.cardWidth + e.paddingHorizontal)
      ), k.value ? i.value = 1 : i.value = 0, s.value = s.value.map((n, o) => {
        const y = o === i.value, x = y ? u.value[o].xPos + a : u.value[o].xPos + C.value / (e.cardWidth + e.paddingHorizontal) * a, K = y ? u.value[o].scale : u.value[o].scale + V.value / (e.cardWidth + e.paddingHorizontal) * a;
        return {
          ...n,
          ...u.value[o],
          xPos: x,
          scale: K,
          opacity: o === 0 && !k.value ? 1 : u.value[o].opacity
        };
      });
    }, O = (t) => v.value ? t.touches[0].clientX : t.clientX, J = (t) => v.value ? t.touches[0].clientY : t.clientY, X = (t) => {
      m.value = !0, g.value = O(t) - $.value, S.value = J(t), document.addEventListener(z.value, P);
    }, B = () => {
      m.value = !1, g.value = 0, S.value = 0, document.removeEventListener(z.value, P), q();
    }, P = (t) => {
      const a = O(t) - $.value;
      k.value = a > g.value, G(a);
    };
    return Z(() => {
      j(), window.addEventListener("resize", I), r.value && r.value.addEventListener(L.value, X), document.addEventListener(b.value, B);
    }), ee(() => {
      window.removeEventListener("resize", I), r.value && r.value.removeEventListener(L.value, X), document.removeEventListener(b.value, B), document.removeEventListener(z.value, P);
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
}), le = (d, w) => {
  const f = d.__vccOpts || d;
  for (const [e, h] of w)
    f[e] = h;
  return f;
}, F = /* @__PURE__ */ le(se, [["__scopeId", "data-v-0672ce56"]]), ue = {
  install: (d) => {
    d.component("VueCardStack", F);
  }
};
typeof window < "u" && window.Vue && window.Vue.component("VueCardStack", F);
export {
  F as VueCardStack,
  ue as default
};
