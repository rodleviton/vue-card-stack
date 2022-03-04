/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered
 * @param {function} func - function to return
 * @param {number} wait - (n) milliseconds
 * @param {boolean} immediate - leading edge or trailing
 *
 * Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)
 */
const debounce = (func, wait, immediate) => {
  let timeout;
  return function executedFunction() {
    // Store the context of this and any
    // parameters passed to executedFunction
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

var script = {
  name: "VueCardStack",
  props: {
    cards: {
      type: Array,
      default: () => []
    },
    cardWidth: {
      type: Number,
      default: () => 300
    },
    cardHeight: {
      type: Number,
      default: () => 400
    },
    stackWidth: {
      type: [Number, String],
      default: () => null
    },
    sensitivity: {
      type: Number,
      default: () => 0.25
    },
    maxVisibleCards: {
      type: Number,
      default: () => 10
    },
    scaleMultiplier: {
      type: Number,
      default: () => 0.5 // last visible card will be 50% scale

    },
    speed: {
      type: Number,
      default: () => 0.2
    },
    paddingHorizontal: {
      type: Number,
      default: () => 20
    },
    paddingVertical: {
      type: Number,
      default: () => 20
    }
  },

  data() {
    return {
      stack: [],
      width: 0,
      activeCardIndex: 1,
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      isDraggingRight: false
    };
  },

  mounted() {
    this.init();
    window.addEventListener("resize", this.handleResize);
    this.$el.addEventListener(this.touchStartEvent, this.onTouchStart);
    document.addEventListener(this.touchEndEvent, this.onTouchEnd);
  },

  watch: {
    _scaleMultiplier: {
      handler() {
        this.rebuild();
      }

    },
    _maxVisibleCards: {
      handler() {
        this.rebuild();
      }

    }
  },
  computed: {
    _stackWidth() {
      if (!this.stackWidth) {
        return this.cardWidth + this.paddingHorizontal * 2;
      } else if (typeof this.stackWidth === "number") {
        return this.stackWidth;
      }

      return this.width || this.$el.clientWidth;
    },

    _maxVisibleCards() {
      return this.cards.length > this.maxVisibleCards ? this.maxVisibleCards : this.cards.length - 1;
    },

    _scaleMultiplier() {
      return (this.scaleMultiplier - 1) * -1 / 10;
    },

    containerWidth() {
      if (!this.stackWidth) {
        return `${this.cardWidth + this.paddingHorizontal * 2}px`;
      } else if (typeof this.stackWidth === "number") {
        return `${this.stackWidth}px`;
      }

      return this.stackWidth;
    },

    elementXPosOffset() {
      return this.$el.getBoundingClientRect().x;
    },

    isTouch() {
      return "ontouchstart" in window;
    },

    dragEvent() {
      return this.isTouch ? "touchmove" : "mousemove";
    },

    touchStartEvent() {
      return this.isTouch ? "touchstart" : "mousedown";
    },

    touchEndEvent() {
      return this.isTouch ? "touchend" : "mouseup";
    },

    stackRestPoints() {
      return this.cards.map((item, index) => {
        const offset = this.xPosOffset * (index - 1);

        if (!index) {
          return this._stackWidth + this.paddingHorizontal;
        } else if (index === 1) {
          return this._stackWidth - this.cardWidth - this.paddingHorizontal;
        } else {
          return this._stackWidth - this.cardWidth - offset - this.paddingHorizontal;
        }
      });
    },

    cardDefaults() {
      return this.cards.map((card, index) => {
        const scale = index >= 1 ? 1 - this._scaleMultiplier * (index - 1) : 1;
        const xPos = this.stackRestPoints[index];
        return {
          opacity: index > 0 && index < this._maxVisibleCards ? 1 : 0,
          display: index < this._maxVisibleCards + 1 ? "block" : "none",
          xPos: index < this._maxVisibleCards ? xPos : xPos + this.xPosOffset,
          yPos: this.paddingVertical,
          scale: scale > 0 ? scale : 0,
          width: this.cardWidth,
          height: this.cardHeight,
          zIndex: this.cards.length - index,
          isDragging: this.isDragging
        };
      });
    },

    xPosOffset() {
      return (this._stackWidth - this.paddingHorizontal * 2 - this.cardWidth) / (this._maxVisibleCards - 2);
    },

    originalActiveCardIndex() {
      if (this.stack[this.activeCardIndex]) {
        return this.stack[this.activeCardIndex]._index;
      }

      return 0;
    }

  },
  methods: {
    init() {
      // move bottom card to top of stack (positioned offscreen)
      this.cards.unshift(this.cards.pop());
      this.stack = this.cards.map((card, index) => {
        return {
          _id: new Date().getTime() + index,
          _index: index,
          ...card,
          ...this.cardDefaults[index]
        };
      });
    },

    rebuild() {
      this.$nextTick(() => {
        this.stack = this.stack.map((card, index) => {
          return { ...card,
            ...this.cardDefaults[index]
          };
        });
      });
    },

    handleResize: debounce(function () {
      this.width = this.$el.clientWidth;
      this.rebuild();
    }, 250),

    onNext() {
      const cardToMoveToBottomOfStack = this.stack.shift();
      this.stack.push(cardToMoveToBottomOfStack);
      this.rebuild();
    },

    onPrevious() {
      const cardToMoveToTopOfStack = this.stack.pop();
      this.stack.unshift(cardToMoveToTopOfStack);
      this.rebuild();
    },

    updateStack() {
      const activeCard = this.stack[this.activeCardIndex];
      const activeCardRestPoint = this.stackRestPoints[this.activeCardIndex];
      const distanceTravelled = activeCard.xPos - activeCardRestPoint;
      const minDistanceToTravel = (this.cardWidth + this.paddingHorizontal) / (1 / this.sensitivity);
      this.$emit("move", 0);

      if (this.isDraggingRight) {
        if (distanceTravelled > minDistanceToTravel) {
          this.onNext();
        } else {
          this.rebuild();
        }
      } else {
        if (distanceTravelled * -1 > minDistanceToTravel) {
          this.onPrevious();
        } else {
          this.rebuild();
        }
      }
    },

    moveStack(dragXPos) {
      const activeCardOffset = dragXPos - this.dragStartX;
      this.$emit("move", activeCardOffset / (this.cardWidth + this.paddingHorizontal));

      if (this.isDraggingRight) {
        this.activeCardIndex = 1;
      } else {
        this.activeCardIndex = 0; // first card is positioned offscreen
      }

      this.stack = this.stack.map((card, index) => {
        const isActiveCard = index === this.activeCardIndex;
        const xPos = isActiveCard ? this.cardDefaults[index].xPos + activeCardOffset : this.cardDefaults[index].xPos + this.xPosOffset / (this.cardWidth + this.paddingHorizontal) * activeCardOffset;
        const scale = isActiveCard ? this.cardDefaults[index].scale : this.cardDefaults[index].scale + this._scaleMultiplier / (this.cardWidth + this.paddingHorizontal) * activeCardOffset;
        return { ...card,
          ...this.cardDefaults[index],
          xPos,
          scale,
          opacity: index === 0 && !this.isDraggingRight ? 1 : this.cardDefaults[index].opacity
        };
      });
    },

    getDragXPos(e) {
      return this.isTouch ? e.touches[0].clientX : e.clientX;
    },

    getDragYPos(e) {
      return this.isTouch ? e.touches[0].clientY : e.clientY;
    },

    onTouchStart(e) {
      this.isDragging = true;
      this.dragStartX = this.getDragXPos(e) - this.elementXPosOffset;
      this.dragStartY = this.getDragYPos(e);
      document.addEventListener(this.dragEvent, this.onDrag);
    },

    onTouchEnd() {
      this.isDragging = false;
      this.dragStartX = 0;
      this.dragStartY = 0;
      document.removeEventListener(this.dragEvent, this.onDrag);
      this.updateStack();
    },

    onDrag(e) {
      const dragXPos = this.getDragXPos(e) - this.elementXPosOffset;
      this.isDraggingRight = dragXPos > this.dragStartX;
      this.moveStack(dragXPos);
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue-card-stack__wrapper"
  }, [_c('div', {
    staticClass: "vue-card-stack__stack",
    style: {
      height: _vm.cardHeight + _vm.paddingVertical * 2 + "px",
      width: _vm.containerWidth
    }
  }, _vm._l(_vm.stack, function (card, index) {
    return _c('div', {
      key: card._id,
      staticClass: "vue-card-stack__card",
      style: {
        opacity: card.opacity,
        display: card.display,
        top: card.yPos + "px",
        width: card.width + "px",
        height: card.height + "px",
        zIndex: card.zIndex,
        transition: "transform " + (_vm.isDragging ? 0 : _vm.speed) + "s ease, opacity " + _vm.speed + "s ease",
        transform: "\n          scale(" + card.scale + ", " + card.scale + ") \n          translate(" + card.xPos + "px, 0)\n        "
      }
    }, [_vm._t("card", null, {
      "card": Object.assign({}, card, {
        $index: index
      })
    })], 2);
  }), 0), _vm._v(" "), _vm._t("nav", null, null, {
    activeCardIndex: _vm.originalActiveCardIndex,
    onNext: _vm.onNext,
    onPrevious: _vm.onPrevious
  })], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-70f7ea96_0", {
    source: ".vue-card-stack__wrapper[data-v-70f7ea96]{position:relative}.vue-card-stack__stack[data-v-70f7ea96]{position:relative;overflow:hidden}.vue-card-stack__card[data-v-70f7ea96]{position:absolute;transform-origin:0 50%;cursor:grab}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-70f7ea96";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installVueCardStack(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueCardStack', __vue_component__);
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
