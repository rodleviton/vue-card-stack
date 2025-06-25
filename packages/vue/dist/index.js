import { computed as p, ref as W, shallowRef as X, onMounted as I, onBeforeUnmount as O, nextTick as R, defineComponent as B, toRef as V, createElementBlock as H, openBlock as S, createElementVNode as N, renderSlot as T, normalizeStyle as b, unref as w, Fragment as Y, renderList as A } from "vue";
function F(r, e, t, v, n) {
  const o = p(() => {
    var g;
    if (e.value.stackWidth) {
      if (typeof e.value.stackWidth == "number")
        return e.value.stackWidth;
    } else return e.value.cardWidth + e.value.paddingHorizontal * 2;
    return v.value || ((g = t.value) == null ? void 0 : g.clientWidth) || 0;
  }), u = p(() => r.value.length > e.value.maxVisibleCards ? e.value.maxVisibleCards : r.value.length - 1), i = p(() => (e.value.scaleMultiplier - 1) * -1 / 10), s = p(() => {
    if (e.value.stackWidth) {
      if (typeof e.value.stackWidth == "number")
        return `${e.value.stackWidth}px`;
    } else return `${e.value.cardWidth + e.value.paddingHorizontal * 2}px`;
    return e.value.stackWidth;
  }), m = p(() => (o.value - e.value.paddingHorizontal * 2 - e.value.cardWidth) / (u.value - 2)), c = p(() => r.value.map((g, a) => {
    const C = m.value * (a - 1);
    return a ? a === 1 ? o.value - e.value.cardWidth - e.value.paddingHorizontal : o.value - e.value.cardWidth - C - e.value.paddingHorizontal : o.value + e.value.paddingHorizontal;
  })), f = p(() => r.value.map((g, a) => {
    const C = a >= 1 ? 1 - i.value * (a - 1) : 1, E = c.value[a];
    return {
      opacity: a > 0 && a < u.value ? 1 : 0,
      display: a < u.value + 1 ? "block" : "none",
      xPos: a < u.value ? E : E + m.value,
      yPos: e.value.paddingVertical,
      scale: C > 0 ? C : 0,
      width: e.value.cardWidth,
      height: e.value.cardHeight,
      zIndex: r.value.length - a,
      isDragging: n.value
    };
  })), k = p(() => {
    var g;
    return ((g = t.value) == null ? void 0 : g.getBoundingClientRect().x) || 0;
  });
  return {
    stackWidth: o,
    maxVisibleCards: u,
    scaleMultiplier: i,
    containerWidth: s,
    xPosOffset: m,
    stackRestPoints: c,
    cardDefaults: f,
    elementXPosOffset: k
  };
}
function U(r, e) {
  const t = W(!1), v = W(0), n = W(0), o = W(!1), u = p(() => "ontouchstart" in window), i = p(() => u.value ? "touchmove" : "mousemove"), s = p(
    () => u.value ? "touchstart" : "mousedown"
  ), m = p(
    () => u.value ? "touchend" : "mouseup"
  ), c = (d) => u.value ? d.touches[0].clientX : d.clientX, f = (d) => u.value ? d.touches[0].clientY : d.clientY;
  return {
    // State
    isDragging: t,
    dragStartX: v,
    dragStartY: n,
    isDraggingRight: o,
    // Computed
    isTouch: u,
    dragEvent: i,
    touchStartEvent: s,
    touchEndEvent: m,
    // Methods
    getDragXPos: c,
    getDragYPos: f,
    startDrag: (d) => {
      t.value = !0, v.value = c(d) - e.value, n.value = f(d);
    },
    updateDrag: (d) => {
      if (!t.value) return null;
      const D = c(d) - e.value;
      return o.value = D > v.value, {
        dragXPos: D,
        activeCardOffset: D - v.value
      };
    },
    endDrag: () => {
      t.value = !1, v.value = 0, n.value = 0;
    },
    shouldChangeCard: (d) => {
      const D = (r.value.cardWidth + r.value.paddingHorizontal) / (1 / r.value.sensitivity);
      return Math.abs(d) > D;
    },
    resetDragState: () => {
      t.value = !1, v.value = 0, n.value = 0, o.value = !1;
    }
  };
}
function j(r, e) {
  let t;
  return function(...n) {
    const o = () => {
      clearTimeout(t), r(...n);
    };
    clearTimeout(t), t = setTimeout(o, e);
  };
}
function q(r, e, t, v) {
  const n = X([]), o = W(0), u = W(1), i = F(
    r,
    e,
    t,
    o,
    W(!1)
  ), s = U(e, i.elementXPosOffset), m = () => {
    const l = [...r.value], h = l.pop();
    h && l.unshift(h), n.value = l.map((x, y) => {
      const z = i.cardDefaults.value[y];
      return {
        _id: Date.now() + y,
        _index: y,
        ...x,
        ...z
      };
    });
  }, c = () => {
    R(() => {
      n.value = n.value.map((l, h) => {
        const x = i.cardDefaults.value[h];
        return {
          ...l,
          ...x
        };
      });
    });
  }, f = j(() => {
    t.value && (o.value = t.value.clientWidth, c());
  }, 250), k = () => {
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
    ), u.value = s.isDraggingRight.value ? 1 : 0, n.value = n.value.map((x, y) => {
      const z = y === u.value, P = i.cardDefaults.value[y], L = z ? (P.xPos ?? 0) + h : (P.xPos ?? 0) + i.xPosOffset.value / (e.value.cardWidth + e.value.paddingHorizontal) * h, M = z ? P.scale ?? 1 : (P.scale ?? 1) + i.scaleMultiplier.value / (e.value.cardWidth + e.value.paddingHorizontal) * h;
      return {
        ...x,
        ...P,
        xPos: L,
        scale: M,
        opacity: y === 0 && !s.isDraggingRight.value ? 1 : P.opacity ?? 1
      };
    });
  }, C = () => {
    const l = n.value[u.value], h = i.stackRestPoints.value[u.value], x = l.xPos - h;
    v("move", 0), s.shouldChangeCard(x) ? s.isDraggingRight.value ? k() : g() : c();
  }, E = (l) => {
    s.startDrag(l), document.addEventListener(s.dragEvent.value, D);
  }, d = () => {
    s.endDrag(), document.removeEventListener(s.dragEvent.value, D), C();
  }, D = (l) => {
    const h = s.updateDrag(l);
    h && a(h.dragXPos);
  }, _ = p(() => {
    const l = n.value[u.value];
    return (l == null ? void 0 : l._index) ?? 0;
  });
  return I(() => {
    m(), window.addEventListener("resize", f), t.value && t.value.addEventListener(
      s.touchStartEvent.value,
      E
    ), document.addEventListener(s.touchEndEvent.value, d);
  }), O(() => {
    window.removeEventListener("resize", f), t.value && t.value.removeEventListener(
      s.touchStartEvent.value,
      E
    ), document.removeEventListener(s.touchEndEvent.value, d), document.removeEventListener(s.dragEvent.value, D);
  }), {
    // State
    stack: n,
    // Computed from calculations
    containerWidth: i.containerWidth,
    // Computed
    originalActiveCardIndex: _,
    // Drag state
    isDragging: s.isDragging,
    // Methods
    onNext: k,
    onPrevious: g,
    // For advanced usage
    init: m,
    rebuild: c
  };
}
const $ = /* @__PURE__ */ B({
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
    const t = r, v = e, n = W(null), o = V(() => ({
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
      containerWidth: i,
      originalActiveCardIndex: s,
      isDragging: m,
      onNext: c,
      onPrevious: f
    } = q(
      V(() => t.cards),
      o,
      n,
      v
    );
    return (k, g) => (S(), H("div", {
      ref_key: "elementRef",
      ref: n,
      style: {
        position: "relative"
      }
    }, [
      N("div", {
        style: b({
          position: "relative",
          overflow: "hidden",
          height: `${t.cardHeight + t.paddingVertical * 2}px`,
          width: w(i)
        })
      }, [
        (S(!0), H(Y, null, A(w(u), (a, C) => (S(), H("div", {
          key: a._id,
          style: b({
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
            transition: `transform ${w(m) ? 0 : t.speed}s ease, opacity ${t.speed}s ease`,
            transform: `
            scale(${a.scale}, ${a.scale}) 
            translate(${a.xPos}px, ${a.yPos}px)
          `
          })
        }, [
          T(k.$slots, "card", {
            card: { ...a, $index: C }
          })
        ], 4))), 128))
      ], 4),
      T(k.$slots, "nav", {
        activeCardIndex: w(s),
        onNext: w(c),
        onPrevious: w(f)
      })
    ], 512));
  }
}), J = {
  install: (r) => {
    r.component("VueCardStack", $);
  }
};
typeof window < "u" && window.Vue && window.Vue.component("VueCardStack", $);
export {
  $ as VueCardStack,
  J as VueCardStackPlugin
};
