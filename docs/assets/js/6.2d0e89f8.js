(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{299:function(t,i,e){},300:function(t,i){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},301:function(t,i,e){var n=e(24),r="["+e(300)+"]",a=RegExp("^"+r+r+"*"),s=RegExp(r+r+"*$"),c=function(t){return function(i){var e=String(n(i));return 1&t&&(e=e.replace(a,"")),2&t&&(e=e.replace(s,"")),e}};t.exports={start:c(1),end:c(2),trim:c(3)}},302:function(t,i,e){var n=e(5),r=e(161);t.exports=function(t,i,e){var a,s;return r&&"function"==typeof(a=i.constructor)&&a!==e&&n(s=a.prototype)&&s!==e.prototype&&r(t,s),t}},304:function(t,i,e){"use strict";e.d(i,"a",(function(){return n}));var n=function(t,i,e){var n;return function(){var r=this,a=arguments,s=function(){n=null,e||t.apply(r,a)},c=e&&!n;clearTimeout(n),n=setTimeout(s,i),c&&t.apply(r,a)}}},305:function(t,i,e){"use strict";var n=e(8),r=e(4),a=e(93),s=e(13),c=e(6),o=e(18),u=e(302),d=e(43),h=e(2),l=e(44),f=e(66).f,p=e(25).f,g=e(9).f,v=e(301).trim,b=r.Number,m=b.prototype,k="Number"==o(l(m)),x=function(t){var i,e,n,r,a,s,c,o,u=d(t,!1);if("string"==typeof u&&u.length>2)if(43===(i=(u=v(u)).charCodeAt(0))||45===i){if(88===(e=u.charCodeAt(2))||120===e)return NaN}else if(48===i){switch(u.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+u}for(s=(a=u.slice(2)).length,c=0;c<s;c++)if((o=a.charCodeAt(c))<48||o>r)return NaN;return parseInt(a,n)}return+u};if(a("Number",!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var y,_=function(t){var i=arguments.length<1?0:t,e=this;return e instanceof _&&(k?h((function(){m.valueOf.call(e)})):"Number"!=o(e))?u(new b(x(i)),e,_):x(i)},P=n?f(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;P.length>N;N++)c(b,y=P[N])&&!c(_,y)&&g(_,y,p(b,y));_.prototype=m,m.constructor=_,s(r,"Number",_)}},306:function(t,i,e){var n=e(1),r=e(2),a=e(14),s=e(25).f,c=e(8),o=r((function(){s(1)}));n({target:"Object",stat:!0,forced:!c||o,sham:!c},{getOwnPropertyDescriptor:function(t,i){return s(a(t),i)}})},307:function(t,i,e){"use strict";var n=e(299);e.n(n).a},308:function(t,i,e){"use strict";e(65),e(305),e(45),e(26),e(94),e(306),e(163),e(92),e(95);function n(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}function r(t,i){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);i&&(n=n.filter((function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable}))),e.push.apply(e,n)}return e}function a(t){for(var i=1;i<arguments.length;i++){var e=null!=arguments[i]?arguments[i]:{};i%2?r(Object(e),!0).forEach((function(i){n(t,i,e[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):r(Object(e)).forEach((function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}))}return t}var s=e(304),c={name:"VueCardStack",props:{cards:{type:Array,default:function(){return[]}},cardWidth:{type:Number,default:function(){return 300}},cardHeight:{type:Number,default:function(){return 400}},stackWidth:{type:[Number,String],default:function(){return null}},sensitivity:{type:Number,default:function(){return.25}},maxVisibleCards:{type:Number,default:function(){return 10}},scaleMultiplier:{type:Number,default:function(){return.5}},speed:{type:Number,default:function(){return.2}},paddingHorizontal:{type:Number,default:function(){return 20}},paddingVertical:{type:Number,default:function(){return 20}}},data:function(){return{stack:[],width:0,activeCardIndex:1,isDragging:!1,dragStartX:0,dragStartY:0,isDraggingRight:!1}},mounted:function(){this.init(),window.addEventListener("resize",this.handleResize),this.$el.addEventListener(this.touchStartEvent,this.onTouchStart),document.addEventListener(this.touchEndEvent,this.onTouchEnd)},computed:{_stackWidth:function(){return this.stackWidth?"number"==typeof this.stackWidth?this.stackWidth:this.width||this.$el.clientWidth:this.cardWidth+2*this.paddingHorizontal},_maxVisibleCards:function(){return this.cards.length>this.maxVisibleCards?this.maxVisibleCards:this.cards.length-1},_scaleMultiplier:function(){return-1*(this.scaleMultiplier-1)/10},containerWidth:function(){return this.stackWidth?"number"==typeof this.stackWidth?"".concat(this.stackWidth,"px"):this.stackWidth:"".concat(this.cardWidth+2*this.paddingHorizontal,"px")},elementXPosOffset:function(){return this.$el.getBoundingClientRect().x},isTouch:function(){return"ontouchstart"in window},dragEvent:function(){return this.isTouch?"touchmove":"mousemove"},touchStartEvent:function(){return this.isTouch?"touchstart":"mousedown"},touchEndEvent:function(){return this.isTouch?"touchend":"mouseup"},stackRestPoints:function(){var t=this;return this.cards.map((function(i,e){var n=t.xPosOffset*(e-1);return e?1===e?t._stackWidth-t.cardWidth-t.paddingHorizontal:t._stackWidth-t.cardWidth-n-t.paddingHorizontal:t._stackWidth+t.paddingHorizontal}))},cardDefaults:function(){var t=this;return this.cards.map((function(i,e){var n=e>=1?1-t._scaleMultiplier*(e-1):1,r=t.stackRestPoints[e];return{opacity:e>0&&e<t._maxVisibleCards?1:0,display:e<t._maxVisibleCards+1?"block":"none",xPos:e<t._maxVisibleCards?r:r+t.xPosOffset,yPos:t.paddingVertical,scale:n>0?n:0,width:t.cardWidth,height:t.cardHeight,zIndex:t.cards.length-e}}))},xPosOffset:function(){return(this._stackWidth-2*this.paddingHorizontal-this.cardWidth)/(this._maxVisibleCards-2)},originalActiveCardIndex:function(){return this.stack[this.activeCardIndex]?this.stack[this.activeCardIndex]._index:0}},methods:{init:function(){var t=this;this.cards.unshift(this.cards.pop()),this.stack=this.cards.map((function(i,e){return a(a({_id:(new Date).getTime()+e,_index:e},i),t.cardDefaults[e])}))},rebuild:function(){var t=this;this.$nextTick((function(){t.stack=t.stack.map((function(i,e){return a(a({},i),t.cardDefaults[e])}))}))},handleResize:Object(s.a)((function(){this.width=this.$el.clientWidth,this.rebuild()}),250),onNext:function(){var t=this.stack.shift();this.stack.push(t),this.rebuild()},onPrevious:function(){var t=this.stack.pop();this.stack.unshift(t),this.rebuild()},updateStack:function(){var t=this.stack[this.activeCardIndex],i=this.stackRestPoints[this.activeCardIndex],e=t.xPos-i,n=(this.cardWidth+this.paddingHorizontal)/(1/this.sensitivity);this.$emit("move",0),this.isDraggingRight?e>n&&this.onNext():-1*e>n&&this.onPrevious()},moveStack:function(t){var i=this,e=t-this.dragStartX;this.$emit("move",e/(this.cardWidth+this.paddingHorizontal)),this.isDraggingRight?this.activeCardIndex=1:this.activeCardIndex=0,this.stack=this.stack.map((function(t,n){var r=n===i.activeCardIndex,s=r?i.cardDefaults[n].xPos+e:i.cardDefaults[n].xPos+i.xPosOffset/(i.cardWidth+i.paddingHorizontal)*e,c=r?i.cardDefaults[n].scale:i.cardDefaults[n].scale+i._scaleMultiplier/(i.cardWidth+i.paddingHorizontal)*e;return a(a(a({},t),i.cardDefaults[n]),{},{xPos:s,scale:c,opacity:0!==n||i.isDraggingRight?i.cardDefaults[n].opacity:1})}))},getDragXPos:function(t){return this.isTouch?t.touches[0].clientX:t.clientX},getDragYPos:function(t){return this.isTouch?t.touches[0].clientY:t.clientY},onTouchStart:function(t){this.isDragging=!0,this.dragStartX=this.getDragXPos(t)-this.elementXPosOffset,this.dragStartY=this.getDragYPos(t),document.addEventListener(this.dragEvent,this.onDrag)},onTouchEnd:function(){this.isDragging=!1,this.dragStartX=0,this.dragStartY=0,document.removeEventListener(this.dragEvent,this.onDrag),this.updateStack()},onDrag:function(t){var i=this.getDragXPos(t)-this.elementXPosOffset;this.isDraggingRight=i>this.dragStartX,this.moveStack(i)}}},o=(e(307),e(41)),u=Object(o.a)(c,(function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"vue-card-stack__wrapper"},[e("div",{staticClass:"vue-card-stack__stack",style:{height:t.cardHeight+2*t.paddingVertical+"px",width:t.containerWidth}},t._l(t.stack,(function(i,n){return e("div",{key:i._id,staticClass:"vue-card-stack__card",style:{opacity:i.opacity,display:i.display,top:i.yPos+"px",width:i.width+"px",height:i.height+"px",zIndex:i.zIndex,transition:"transform "+(t.isDragging?0:t.speed)+"s ease, opacity "+t.speed+"s ease",transform:"\n          scale("+i.scale+", "+i.scale+") \n          translate("+i.xPos+"px, 0)\n        "}},[t._t("card",null,{card:Object.assign({},i,{$index:n})})],2)})),0),t._v(" "),t._t("nav",null,null,{activeCardIndex:t.originalActiveCardIndex,onNext:t.onNext,onPrevious:t.onPrevious})],2)}),[],!1,null,"9b5e0e80",null);i.a=u.exports},326:function(t,i,e){},360:function(t,i,e){"use strict";var n=e(326);e.n(n).a},370:function(t,i,e){"use strict";e.r(i);var n={name:"BasicDemo",components:{VueCardStack:e(308).a},data:function(){return{cards:[{background:"#00659d"},{background:"#00abbc"},{background:"#e2c58a"},{background:"#fc8890"},{background:"#b35d7f"},{background:"#00659d"},{background:"#00abbc"},{background:"#e2c58a"},{background:"#fc8890"},{background:"#b35d7f"}]}}},r=(e(360),e(41)),a=Object(r.a)(n,(function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticStyle:{width:"100%",display:"flex","align-items":"center","flex-direction":"column"}},[e("vue-card-stack",{attrs:{cards:t.cards,"stack-width":360,"card-width":280},scopedSlots:t._u([{key:"card",fn:function(t){var i=t.card;return[e("div",{staticStyle:{width:"100%",height:"100%","border-radius":"8px"},style:{background:i.background}})]}},{key:"nav",fn:function(i){var n=i.activeCardIndex,r=i.onNext,a=i.onPrevious;return[e("nav",{staticClass:"nav"},[e("div",{staticClass:"counter"},[t._v("\n          "+t._s(n+1)+"/"+t._s(t.cards.length)+"\n        ")]),t._v(" "),e("button",{staticClass:"button",on:{click:a}},[e("span",{staticClass:"chevron left"})]),t._v(" "),e("button",{staticClass:"button",on:{click:r}},[e("span",{staticClass:"chevron right"})])])]}}])})],1)}),[],!1,null,"b893245a",null);i.default=a.exports}}]);