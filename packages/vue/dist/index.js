import { computed as p, ref as W, shallowRef as I, onMounted as X, onBeforeUnmount as O, nextTick as R, defineComponent as B, toRef as S, createElementBlock as z, openBlock as H, createElementVNode as N, renderSlot as V, normalizeStyle as T, unref as _, Fragment as Y, renderList as A } from "vue";
function F(u, e, t, o, n) {
  const i = p(() => {
    var g;
    if (e.value.stackWidth) {
      if (typeof e.value.stackWidth == "number")
        return e.value.stackWidth;
    } else return e.value.cardWidth + e.value.paddingHorizontal * 2;
    return o.value || ((g = t.value) == null ? void 0 : g.clientWidth) || 0;
  }), r = p(() => u.value.length > e.value.maxVisibleCards ? e.value.maxVisibleCards : u.value.length - 1), d = p(() => (e.value.scaleMultiplier - 1) * -1 / 10), l = p(() => {
    if (e.value.stackWidth) {
      if (typeof e.value.stackWidth == "number")
        return `${e.value.stackWidth}px`;
    } else return `${e.value.cardWidth + e.value.paddingHorizontal * 2}px`;
    return e.value.stackWidth;
  }), m = p(() => (i.value - e.value.paddingHorizontal * 2 - e.value.cardWidth) / (r.value - 2)), v = p(() => u.value.map((g, a) => {
    const k = m.value * (a - 1);
    return a ? a === 1 ? i.value - e.value.cardWidth - e.value.paddingHorizontal : i.value - e.value.cardWidth - k - e.value.paddingHorizontal : i.value + e.value.paddingHorizontal;
  })), f = p(() => u.value.map((g, a) => {
    const k = a >= 1 ? 1 - d.value * (a - 1) : 1, E = v.value[a];
    return {
      opacity: a > 0 && a < r.value ? 1 : 0,
      display: a < r.value + 1 ? "block" : "none",
      xPos: a < r.value ? E : E + m.value,
      yPos: e.value.paddingVertical,
      scale: k > 0 ? k : 0,
      width: e.value.cardWidth,
      height: e.value.cardHeight,
      zIndex: u.value.length - a,
      isDragging: n.value
    };
  })), D = p(() => {
    var g;
    return ((g = t.value) == null ? void 0 : g.getBoundingClientRect().x) || 0;
  });
  return {
    stackWidth: i,
    maxVisibleCards: r,
    scaleMultiplier: d,
    containerWidth: l,
    xPosOffset: m,
    stackRestPoints: v,
    cardDefaults: f,
    elementXPosOffset: D
  };
}
function U(u, e) {
  const t = W(!1), o = W(0), n = W(0), i = W(!1), r = p(() => "ontouchstart" in window), d = p(() => r.value ? "touchmove" : "mousemove"), l = p(
    () => r.value ? "touchstart" : "mousedown"
  ), m = p(
    () => r.value ? "touchend" : "mouseup"
  ), v = (c) => r.value ? c.touches[0].clientX : c.clientX, f = (c) => r.value ? c.touches[0].clientY : c.clientY;
  return {
    // State
    isDragging: t,
    dragStartX: o,
    dragStartY: n,
    isDraggingRight: i,
    // Computed
    isTouch: r,
    dragEvent: d,
    touchStartEvent: l,
    touchEndEvent: m,
    // Methods
    getDragXPos: v,
    getDragYPos: f,
    startDrag: (c) => {
      t.value = !0, o.value = v(c) - e.value, n.value = f(c);
    },
    updateDrag: (c) => {
      if (!t.value) return null;
      const C = v(c) - e.value;
      return i.value = C > o.value, {
        dragXPos: C,
        activeCardOffset: C - o.value
      };
    },
    endDrag: () => {
      t.value = !1, o.value = 0, n.value = 0;
    },
    shouldChangeCard: (c) => {
      const C = (u.value.cardWidth + u.value.paddingHorizontal) / (1 / u.value.sensitivity);
      return Math.abs(c) > C;
    },
    resetDragState: () => {
      t.value = !1, o.value = 0, n.value = 0, i.value = !1;
    }
  };
}
function j(u, e) {
  let t;
  return function(...n) {
    const i = () => {
      clearTimeout(t), u(...n);
    };
    clearTimeout(t), t = setTimeout(i, e);
  };
}
function q(u, e, t, o) {
  const n = I([]), i = W(0), r = W(1), d = F(
    u,
    e,
    t,
    i,
    W(!1)
  ), l = U(e, d.elementXPosOffset), m = () => {
    const s = [...u.value], h = s.pop();
    h && s.unshift(h), n.value = s.map((x, y) => {
      const w = d.cardDefaults.value[y];
      return {
        _id: Date.now() + y,
        _index: y,
        ...x,
        ...w
      };
    });
  }, v = () => {
    R(() => {
      n.value = n.value.map((s, h) => {
        const x = d.cardDefaults.value[h];
        return {
          ...s,
          ...x
        };
      });
    });
  }, f = j(() => {
    t.value && (i.value = t.value.clientWidth, v());
  }, 250), D = () => {
    const s = n.value.shift();
    s && n.value.push(s), v();
  }, g = () => {
    const s = n.value.pop();
    s && n.value.unshift(s), v();
  }, a = (s) => {
    const h = s - l.dragStartX.value;
    o(
      "move",
      h / (e.value.cardWidth + e.value.paddingHorizontal)
    ), r.value = l.isDraggingRight.value ? 1 : 0, n.value = n.value.map((x, y) => {
      const w = y === r.value, P = d.cardDefaults.value[y], L = w ? (P.xPos ?? 0) + h : (P.xPos ?? 0) + d.xPosOffset.value / (e.value.cardWidth + e.value.paddingHorizontal) * h, M = w ? P.scale ?? 1 : (P.scale ?? 1) + d.scaleMultiplier.value / (e.value.cardWidth + e.value.paddingHorizontal) * h;
      return {
        ...x,
        ...P,
        xPos: L,
        scale: M,
        opacity: y === 0 && !l.isDraggingRight.value ? 1 : P.opacity ?? 1
      };
    });
  }, k = () => {
    const s = n.value[r.value], h = d.stackRestPoints.value[r.value], x = s.xPos - h;
    o("move", 0), l.shouldChangeCard(x) ? l.isDraggingRight.value ? D() : g() : v();
  }, E = (s) => {
    l.startDrag(s), document.addEventListener(l.dragEvent.value, C);
  }, c = () => {
    l.endDrag(), document.removeEventListener(l.dragEvent.value, C), k();
  }, C = (s) => {
    const h = l.updateDrag(s);
    h && a(h.dragXPos);
  }, b = p(() => {
    const s = n.value[r.value];
    return (s == null ? void 0 : s._index) ?? 0;
  });
  return X(() => {
    m(), window.addEventListener("resize", f), t.value && t.value.addEventListener(
      l.touchStartEvent.value,
      E
    ), document.addEventListener(l.touchEndEvent.value, c);
  }), O(() => {
    window.removeEventListener("resize", f), t.value && t.value.removeEventListener(
      l.touchStartEvent.value,
      E
    ), document.removeEventListener(l.touchEndEvent.value, c), document.removeEventListener(l.dragEvent.value, C);
  }), {
    // State
    stack: n,
    // Computed from calculations
    containerWidth: d.containerWidth,
    // Computed
    originalActiveCardIndex: b,
    // Drag state
    isDragging: l.isDragging,
    // Methods
    onNext: D,
    onPrevious: g,
    // For advanced usage
    init: m,
    rebuild: v
  };
}
const G = /* @__PURE__ */ B({
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
  setup(u, { emit: e }) {
    const t = u, o = e, n = W(null), i = S(() => ({
      cardWidth: t.cardWidth,
      cardHeight: t.cardHeight,
      stackWidth: t.stackWidth,
      sensitivity: t.sensitivity,
      maxVisibleCards: t.maxVisibleCards,
      scaleMultiplier: t.scaleMultiplier,
      speed: t.speed,
      paddingHorizontal: t.paddingHorizontal,
      paddingVertical: t.paddingVertical
    })), {
      stack: r,
      containerWidth: d,
      originalActiveCardIndex: l,
      isDragging: m,
      onNext: v,
      onPrevious: f
    } = q(
      S(() => t.cards),
      i,
      n,
      o
    );
    return (D, g) => (H(), z("div", {
      class: "vue-card-stack__wrapper",
      ref_key: "elementRef",
      ref: n
    }, [
      N("div", {
        class: "vue-card-stack__stack",
        style: T({
          height: `${t.cardHeight + t.paddingVertical * 2}px`,
          width: _(d)
        })
      }, [
        (H(!0), z(Y, null, A(_(r), (a, k) => (H(), z("div", {
          class: "vue-card-stack__card",
          key: a._id,
          style: T({
            opacity: a.opacity,
            display: a.display,
            width: `${a.width}px`,
            height: `${a.height}px`,
            zIndex: a.zIndex,
            transition: `transform ${_(m) ? 0 : t.speed}s ease, opacity ${t.speed}s ease`,
            transform: `
            scale(${a.scale}, ${a.scale}) 
            translate(${a.xPos}px, ${a.yPos}px)
          `
          })
        }, [
          V(D.$slots, "card", {
            card: { ...a, $index: k }
          }, void 0, !0)
        ], 4))), 128))
      ], 4),
      V(D.$slots, "nav", {
        activeCardIndex: _(l),
        onNext: _(v),
        onPrevious: _(f)
      }, void 0, !0)
    ], 512));
  }
}), J = (u, e) => {
  const t = u.__vccOpts || u;
  for (const [o, n] of e)
    t[o] = n;
  return t;
}, $ = /* @__PURE__ */ J(G, [["__scopeId", "data-v-10275018"]]), Q = {
  install: (u) => {
    u.component("VueCardStack", $);
  }
};
typeof window < "u" && window.Vue && window.Vue.component("VueCardStack", $);
export {
  $ as VueCardStack,
  Q as VueCardStackPlugin
};
