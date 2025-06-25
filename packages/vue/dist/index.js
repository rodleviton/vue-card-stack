import { computed as p, ref as W, shallowRef as X, onMounted as I, onBeforeUnmount as O, nextTick as R, defineComponent as B, toRef as T, createElementBlock as z, openBlock as H, createElementVNode as N, renderSlot as b, normalizeStyle as $, unref as w, Fragment as Y, renderList as A } from "vue";
function F(r, e, t, v, n) {
  const i = p(() => {
    var g;
    if (e.value.stackWidth) {
      if (typeof e.value.stackWidth == "number")
        return e.value.stackWidth;
    } else return e.value.cardWidth + e.value.paddingHorizontal * 2;
    return v.value || ((g = t.value) == null ? void 0 : g.clientWidth) || 0;
  }), u = p(() => r.value.length > e.value.maxVisibleCards ? e.value.maxVisibleCards : r.value.length - 1), d = p(() => (e.value.scaleMultiplier - 1) * -1 / 10), s = p(() => {
    if (e.value.stackWidth) {
      if (typeof e.value.stackWidth == "number")
        return `${e.value.stackWidth}px`;
    } else return `${e.value.cardWidth + e.value.paddingHorizontal * 2}px`;
    return e.value.stackWidth;
  }), f = p(() => (i.value - e.value.paddingHorizontal * 2 - e.value.cardWidth) / (u.value - 2)), c = p(() => r.value.map((g, a) => {
    const k = f.value * (a - 1);
    return a ? a === 1 ? i.value - e.value.cardWidth - e.value.paddingHorizontal : i.value - e.value.cardWidth - k - e.value.paddingHorizontal : i.value + e.value.paddingHorizontal;
  })), C = p(() => r.value.map((g, a) => {
    const k = a >= 1 ? 1 - d.value * (a - 1) : 1, x = c.value[a];
    return {
      opacity: a > 0 && a < u.value ? 1 : 0,
      display: a < u.value + 1 ? "block" : "none",
      xPos: a < u.value ? x : x + f.value,
      yPos: e.value.paddingVertical,
      scale: k > 0 ? k : 0,
      width: e.value.cardWidth,
      height: e.value.cardHeight,
      zIndex: r.value.length - a,
      isDragging: n.value
    };
  })), D = p(() => {
    var g;
    return ((g = t.value) == null ? void 0 : g.getBoundingClientRect().x) || 0;
  });
  return {
    stackWidth: i,
    maxVisibleCards: u,
    scaleMultiplier: d,
    containerWidth: s,
    xPosOffset: f,
    stackRestPoints: c,
    cardDefaults: C,
    elementXPosOffset: D
  };
}
function U(r, e) {
  const t = W(!1), v = W(0), n = W(0), i = W(!1), u = p(() => "ontouchstart" in window), d = p(() => u.value ? "touchmove" : "mousemove"), s = p(
    () => u.value ? "touchstart" : "mousedown"
  ), f = p(
    () => u.value ? "touchend" : "mouseup"
  ), c = (o) => u.value ? o.touches[0].clientX : o.clientX, C = (o) => u.value ? o.touches[0].clientY : o.clientY;
  return {
    // State
    isDragging: t,
    dragStartX: v,
    dragStartY: n,
    isDraggingRight: i,
    // Computed
    isTouch: u,
    dragEvent: d,
    touchStartEvent: s,
    touchEndEvent: f,
    // Methods
    getDragXPos: c,
    getDragYPos: C,
    startDrag: (o) => {
      t.value = !0, v.value = c(o) - e.value, n.value = C(o);
    },
    updateDrag: (o) => {
      if (!t.value) return null;
      const m = c(o) - e.value;
      return i.value = m > v.value, {
        dragXPos: m,
        activeCardOffset: m - v.value
      };
    },
    endDrag: () => {
      t.value = !1, v.value = 0, n.value = 0;
    },
    shouldChangeCard: (o) => {
      const m = (r.value.cardWidth + r.value.paddingHorizontal) / (1 / r.value.sensitivity);
      return Math.abs(o) > m;
    },
    resetDragState: () => {
      t.value = !1, v.value = 0, n.value = 0, i.value = !1;
    }
  };
}
function j(r, e) {
  let t;
  return function(...n) {
    const i = () => {
      clearTimeout(t), r(...n);
    };
    clearTimeout(t), t = setTimeout(i, e);
  };
}
function q(r, e, t, v) {
  const n = X([]), i = W(0), u = W(1), d = F(
    r,
    e,
    t,
    i,
    W(!1)
  ), s = U(e, d.elementXPosOffset), f = () => {
    const l = [...r.value], h = l.pop();
    h && l.unshift(h), n.value = l.map((y, E) => {
      const S = d.cardDefaults.value[E];
      return {
        _id: Date.now() + E,
        _index: E,
        ...y,
        ...S
      };
    });
  }, c = () => {
    R(() => {
      n.value = n.value.map((l, h) => {
        const y = d.cardDefaults.value[h];
        return {
          ...l,
          ...y
        };
      });
    });
  }, C = j(() => {
    t.value && (i.value = t.value.clientWidth, c());
  }, 250), D = () => {
    const l = n.value.shift();
    l && n.value.push(l), c();
  }, g = () => {
    const l = n.value.pop();
    l && n.value.unshift(l), c();
  }, a = (l) => {
    const h = l - s.dragStartX.value;
    v(
      "move",
      h / (e.value.cardWidth + e.value.paddingHorizontal)
    ), u.value = s.isDraggingRight.value ? 1 : 0, n.value = n.value.map((y, E) => {
      const S = E === u.value, P = d.cardDefaults.value[E], L = S ? (P.xPos ?? 0) + h : (P.xPos ?? 0) + d.xPosOffset.value / (e.value.cardWidth + e.value.paddingHorizontal) * h, M = S ? P.scale ?? 1 : (P.scale ?? 1) + d.scaleMultiplier.value / (e.value.cardWidth + e.value.paddingHorizontal) * h;
      return {
        ...y,
        ...P,
        xPos: L,
        scale: M,
        opacity: E === 0 && !s.isDraggingRight.value ? 1 : P.opacity ?? 1
      };
    });
  }, k = () => {
    const l = n.value[u.value], h = d.stackRestPoints.value[u.value], y = l.xPos - h;
    v("move", 0), s.shouldChangeCard(y) ? s.isDraggingRight.value ? D() : g() : c();
  }, x = (l) => {
    s.startDrag(l), document.addEventListener(s.dragEvent.value, m);
  }, o = () => {
    s.endDrag(), document.removeEventListener(s.dragEvent.value, m), k();
  }, m = (l) => {
    const h = s.updateDrag(l);
    h && a(h.dragXPos);
  }, _ = p(() => {
    const l = n.value[u.value];
    return (l == null ? void 0 : l._index) ?? 0;
  });
  return I(() => {
    f(), window.addEventListener("resize", C), t.value && t.value.addEventListener(
      s.touchStartEvent.value,
      x
    ), document.addEventListener(s.touchEndEvent.value, o);
  }), O(() => {
    window.removeEventListener("resize", C), t.value && t.value.removeEventListener(
      s.touchStartEvent.value,
      x
    ), document.removeEventListener(s.touchEndEvent.value, o), document.removeEventListener(s.dragEvent.value, m);
  }), {
    // State
    stack: n,
    // Computed from calculations
    containerWidth: d.containerWidth,
    // Computed
    originalActiveCardIndex: _,
    // Drag state
    isDragging: s.isDragging,
    // Methods
    onNext: D,
    onPrevious: g,
    // For advanced usage
    init: f,
    rebuild: c
  };
}
const V = /* @__PURE__ */ B({
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
  setup(r, { emit: e }) {
    const t = r, v = e, n = W(null), i = T(() => ({
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
      stack: u,
      containerWidth: d,
      originalActiveCardIndex: s,
      isDragging: f,
      onNext: c,
      onPrevious: C
    } = q(
      T(() => t.cards),
      i,
      n,
      v
    );
    return (D, g) => (H(), z("div", {
      ref_key: "elementRef",
      ref: n,
      style: {
        position: "relative"
      }
    }, [
      N("div", {
        style: $({
          position: "relative",
          overflow: "hidden",
          height: `${t.cardHeight + t.paddingVertical * 2}px`,
          width: w(d)
        })
      }, [
        (H(!0), z(Y, null, A(w(u), (a, k) => (H(), z("div", {
          key: a._id,
          style: $({
            position: "absolute",
            transformOrigin: "0 50%",
            cursor: "grab",
            left: 0,
            top: 0,
            opacity: a.opacity,
            display: a.display,
            width: `${a.width}px`,
            height: `${a.height}px`,
            zIndex: a.zIndex,
            transition: `transform ${w(f) ? 0 : t.speed}s ease, opacity ${t.speed}s ease`,
            transform: `
            scale(${a.scale}, ${a.scale}) 
            translate(${a.xPos}px, ${a.yPos}px)
          `
          })
        }, [
          b(D.$slots, "card", {
            card: {
              ...a,
              $index: k,
              data: (({ _id: x, _index: o, ...m }) => m)(a)
            }
          })
        ], 4))), 128))
      ], 4),
      b(D.$slots, "nav", {
        activeCardIndex: w(s),
        onNext: w(c),
        onPrevious: w(C)
      })
    ], 512));
  }
});
function J() {
  return V;
}
const K = {
  install: (r) => {
    r.component("VueCardStack", V);
  }
};
typeof window < "u" && window.Vue && window.Vue.component("VueCardStack", V);
export {
  V as VueCardStack,
  K as VueCardStackPlugin,
  J as createVueCardStack
};
