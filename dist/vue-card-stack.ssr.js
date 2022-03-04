'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered
 * @param {function} func - function to return
 * @param {number} wait - (n) milliseconds
 * @param {boolean} immediate - leading edge or trailing
 *
 * Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)
 */
var debounce = function debounce(func, wait, immediate) {
  var timeout;
  return function executedFunction() {
    // Store the context of this and any
    // parameters passed to executedFunction
    var context = this;
    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};var script = {
  name: "VueCardStack",
  props: {
    cards: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    cardWidth: {
      type: Number,
      default: function _default() {
        return 300;
      }
    },
    cardHeight: {
      type: Number,
      default: function _default() {
        return 400;
      }
    },
    stackWidth: {
      type: [Number, String],
      default: function _default() {
        return null;
      }
    },
    sensitivity: {
      type: Number,
      default: function _default() {
        return 0.25;
      }
    },
    maxVisibleCards: {
      type: Number,
      default: function _default() {
        return 10;
      }
    },
    scaleMultiplier: {
      type: Number,
      default: function _default() {
        return 0.5;
      } // last visible card will be 50% scale

    },
    speed: {
      type: Number,
      default: function _default() {
        return 0.2;
      }
    },
    paddingHorizontal: {
      type: Number,
      default: function _default() {
        return 20;
      }
    },
    paddingVertical: {
      type: Number,
      default: function _default() {
        return 20;
      }
    }
  },
  data: function data() {
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
  mounted: function mounted() {
    this.init();
    window.addEventListener("resize", this.handleResize);
    this.$el.addEventListener(this.touchStartEvent, this.onTouchStart);
    document.addEventListener(this.touchEndEvent, this.onTouchEnd);
  },
  watch: {
    _scaleMultiplier: {
      handler: function handler() {
        this.rebuild();
      }
    },
    _maxVisibleCards: {
      handler: function handler() {
        this.rebuild();
      }
    }
  },
  computed: {
    _stackWidth: function _stackWidth() {
      if (!this.stackWidth) {
        return this.cardWidth + this.paddingHorizontal * 2;
      } else if (typeof this.stackWidth === "number") {
        return this.stackWidth;
      }

      return this.width || this.$el.clientWidth;
    },
    _maxVisibleCards: function _maxVisibleCards() {
      return this.cards.length > this.maxVisibleCards ? this.maxVisibleCards : this.cards.length - 1;
    },
    _scaleMultiplier: function _scaleMultiplier() {
      return (this.scaleMultiplier - 1) * -1 / 10;
    },
    containerWidth: function containerWidth() {
      if (!this.stackWidth) {
        return "".concat(this.cardWidth + this.paddingHorizontal * 2, "px");
      } else if (typeof this.stackWidth === "number") {
        return "".concat(this.stackWidth, "px");
      }

      return this.stackWidth;
    },
    elementXPosOffset: function elementXPosOffset() {
      return this.$el.getBoundingClientRect().x;
    },
    isTouch: function isTouch() {
      return "ontouchstart" in window;
    },
    dragEvent: function dragEvent() {
      return this.isTouch ? "touchmove" : "mousemove";
    },
    touchStartEvent: function touchStartEvent() {
      return this.isTouch ? "touchstart" : "mousedown";
    },
    touchEndEvent: function touchEndEvent() {
      return this.isTouch ? "touchend" : "mouseup";
    },
    stackRestPoints: function stackRestPoints() {
      var _this = this;

      return this.cards.map(function (item, index) {
        var offset = _this.xPosOffset * (index - 1);

        if (!index) {
          return _this._stackWidth + _this.paddingHorizontal;
        } else if (index === 1) {
          return _this._stackWidth - _this.cardWidth - _this.paddingHorizontal;
        } else {
          return _this._stackWidth - _this.cardWidth - offset - _this.paddingHorizontal;
        }
      });
    },
    cardDefaults: function cardDefaults() {
      var _this2 = this;

      return this.cards.map(function (card, index) {
        var scale = index >= 1 ? 1 - _this2._scaleMultiplier * (index - 1) : 1;
        var xPos = _this2.stackRestPoints[index];
        return {
          opacity: index > 0 && index < _this2._maxVisibleCards ? 1 : 0,
          display: index < _this2._maxVisibleCards + 1 ? "block" : "none",
          xPos: index < _this2._maxVisibleCards ? xPos : xPos + _this2.xPosOffset,
          yPos: _this2.paddingVertical,
          scale: scale > 0 ? scale : 0,
          width: _this2.cardWidth,
          height: _this2.cardHeight,
          zIndex: _this2.cards.length - index,
          isDragging: _this2.isDragging
        };
      });
    },
    xPosOffset: function xPosOffset() {
      return (this._stackWidth - this.paddingHorizontal * 2 - this.cardWidth) / (this._maxVisibleCards - 2);
    },
    originalActiveCardIndex: function originalActiveCardIndex() {
      if (this.stack[this.activeCardIndex]) {
        return this.stack[this.activeCardIndex]._index;
      }

      return 0;
    }
  },
  methods: {
    init: function init() {
      var _this3 = this;

      // move bottom card to top of stack (positioned offscreen)
      this.cards.unshift(this.cards.pop());
      this.stack = this.cards.map(function (card, index) {
        return _objectSpread2(_objectSpread2({
          _id: new Date().getTime() + index,
          _index: index
        }, card), _this3.cardDefaults[index]);
      });
    },
    rebuild: function rebuild() {
      var _this4 = this;

      this.$nextTick(function () {
        _this4.stack = _this4.stack.map(function (card, index) {
          return _objectSpread2(_objectSpread2({}, card), _this4.cardDefaults[index]);
        });
      });
    },
    handleResize: debounce(function () {
      this.width = this.$el.clientWidth;
      this.rebuild();
    }, 250),
    onNext: function onNext() {
      var cardToMoveToBottomOfStack = this.stack.shift();
      this.stack.push(cardToMoveToBottomOfStack);
      this.rebuild();
    },
    onPrevious: function onPrevious() {
      var cardToMoveToTopOfStack = this.stack.pop();
      this.stack.unshift(cardToMoveToTopOfStack);
      this.rebuild();
    },
    updateStack: function updateStack() {
      var activeCard = this.stack[this.activeCardIndex];
      var activeCardRestPoint = this.stackRestPoints[this.activeCardIndex];
      var distanceTravelled = activeCard.xPos - activeCardRestPoint;
      var minDistanceToTravel = (this.cardWidth + this.paddingHorizontal) / (1 / this.sensitivity);
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
    moveStack: function moveStack(dragXPos) {
      var _this5 = this;

      var activeCardOffset = dragXPos - this.dragStartX;
      this.$emit("move", activeCardOffset / (this.cardWidth + this.paddingHorizontal));

      if (this.isDraggingRight) {
        this.activeCardIndex = 1;
      } else {
        this.activeCardIndex = 0; // first card is positioned offscreen
      }

      this.stack = this.stack.map(function (card, index) {
        var isActiveCard = index === _this5.activeCardIndex;
        var xPos = isActiveCard ? _this5.cardDefaults[index].xPos + activeCardOffset : _this5.cardDefaults[index].xPos + _this5.xPosOffset / (_this5.cardWidth + _this5.paddingHorizontal) * activeCardOffset;
        var scale = isActiveCard ? _this5.cardDefaults[index].scale : _this5.cardDefaults[index].scale + _this5._scaleMultiplier / (_this5.cardWidth + _this5.paddingHorizontal) * activeCardOffset;
        return _objectSpread2(_objectSpread2(_objectSpread2({}, card), _this5.cardDefaults[index]), {}, {
          xPos: xPos,
          scale: scale,
          opacity: index === 0 && !_this5.isDraggingRight ? 1 : _this5.cardDefaults[index].opacity
        });
      });
    },
    getDragXPos: function getDragXPos(e) {
      return this.isTouch ? e.touches[0].clientX : e.clientX;
    },
    getDragYPos: function getDragYPos(e) {
      return this.isTouch ? e.touches[0].clientY : e.clientY;
    },
    onTouchStart: function onTouchStart(e) {
      this.isDragging = true;
      this.dragStartX = this.getDragXPos(e) - this.elementXPosOffset;
      this.dragStartY = this.getDragYPos(e);
      document.addEventListener(this.dragEvent, this.onDrag);
    },
    onTouchEnd: function onTouchEnd() {
      this.isDragging = false;
      this.dragStartX = 0;
      this.dragStartY = 0;
      document.removeEventListener(this.dragEvent, this.onDrag);
      this.updateStack();
    },
    onDrag: function onDrag(e) {
      var dragXPos = this.getDragXPos(e) - this.elementXPosOffset;
      this.isDraggingRight = dragXPos > this.dragStartX;
      this.moveStack(dragXPos);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue-card-stack__wrapper"
  }, [_vm._ssrNode("<div class=\"vue-card-stack__stack\"" + _vm._ssrStyle(null, {
    height: _vm.cardHeight + _vm.paddingVertical * 2 + "px",
    width: _vm.containerWidth
  }, null) + " data-v-70f7ea96>", "</div>", _vm._l(_vm.stack, function (card, index) {
    return _vm._ssrNode("<div class=\"vue-card-stack__card\"" + _vm._ssrStyle(null, {
      opacity: card.opacity,
      display: card.display,
      top: card.yPos + "px",
      width: card.width + "px",
      height: card.height + "px",
      zIndex: card.zIndex,
      transition: "transform " + (_vm.isDragging ? 0 : _vm.speed) + "s ease, opacity " + _vm.speed + "s ease",
      transform: "\n          scale(" + card.scale + ", " + card.scale + ") \n          translate(" + card.xPos + "px, 0)\n        "
    }, null) + " data-v-70f7ea96>", "</div>", [_vm._t("card", null, {
      "card": Object.assign({}, card, {
        $index: index
      })
    })], 2);
  }), 0), _vm._ssrNode(" "), _vm._t("nav", null, null, {
    activeCardIndex: _vm.originalActiveCardIndex,
    onNext: _vm.onNext,
    onPrevious: _vm.onPrevious
  })], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-70f7ea96_0", {
    source: ".vue-card-stack__wrapper[data-v-70f7ea96]{position:relative}.vue-card-stack__stack[data-v-70f7ea96]{position:relative;overflow:hidden}.vue-card-stack__card[data-v-70f7ea96]{position:absolute;transform-origin:0 50%;cursor:grab}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-70f7ea96";
/* module identifier */

var __vue_module_identifier__ = "data-v-70f7ea96";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installVueCardStack(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueCardStack', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

var GlobalVue = null;

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
exports.default=__vue_component__;