function t(t,e,s,i){var r,o=arguments.length,n=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,s,n):r(e,s))||n);return o>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new o(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",_=m.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const o=this.constructor;if(!1===i&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??y)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,_?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,A=t=>t,k=x.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+C,P=`<${T}>`,z=document,U=()=>z.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,O="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,I=/>/g,H=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,q=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),K=new WeakMap,J=z.createTreeWalker(z,129);function Z(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const G=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=D;for(let e=0;e<s;e++){const s=t[e];let a,l,d=-1,c=0;for(;c<s.length&&(n.lastIndex=c,l=n.exec(s),null!==l);)c=n.lastIndex,n===D?"!--"===l[1]?n=R:void 0!==l[1]?n=I:void 0!==l[2]?(q.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=H):void 0!==l[3]&&(n=H):n===H?">"===l[0]?(n=r??D,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?H:'"'===l[3]?B:j):n===B||n===j?n=H:n===R||n===I?n=D:(n=H,r=void 0);const p=n===H&&t[e+1].startsWith("/>")?" ":"";o+=n===D?s+P:d>=0?(i.push(a),s.slice(0,d)+E+s.slice(d)+C+p):s+C+(-2===d?e:p)}return[Z(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Q{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[l,d]=G(t,e);if(this.el=Q.createElement(l,s),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=J.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(E)){const e=d[o++],s=i.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:s,ctor:"."===n[1]?st:"?"===n[1]?it:"@"===n[1]?rt:et}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(q.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=k?k.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],U()),J.nextNode(),a.push({type:2,index:++r});i.append(t[e],U())}}}else if(8===i.nodeType)if(i.data===T)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const s=z.createElement("template");return s.innerHTML=t,s}}function X(t,e,s=t,i){if(e===W)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=M(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,i)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??z).importNode(e,!0);J.currentNode=i;let r=J.nextNode(),o=0,n=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new tt(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new ot(r,this,t)),this._$AV.push(e),a=s[++n]}o!==a?.index&&(r=J.nextNode(),o++)}return J.currentNode=z,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),M(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Q.createElement(Z(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Y(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Q(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new tt(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(void 0===r)t=X(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const i=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=X(this,i[s+n],e,n),a===W&&(a=this._$AH[n]),o||=!M(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}let it=class extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}};class rt extends et{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??V)===W)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(Q,tt),(x.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;class lt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new tt(e.insertBefore(U(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}lt._$litElement$=!0,lt.finalized=!0,at.litElementHydrateSupport?.({LitElement:lt});const dt=at.litElementPolyfillSupport;dt?.({LitElement:lt}),(at.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},ht=(t=pt,e,s)=>{const{kind:i,metadata:r}=s;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ut(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function mt(t){return ut({...t,state:!0,attribute:!1})}const gt=["sbahn","tram","bus"];function ft(t){if(!t)return;return(("string"==typeof t?t:t.entity)||"").trim()||void 0}function _t(t){if("string"!=typeof t||!t)return null;const e=new Date(t);return isNaN(e.getTime())?null:e}function bt(t,e){if(!t)return[];const s=t.attributes?.departures;if(!Array.isArray(s))return[];const i=[];return s.forEach((t,s)=>{if(t&&"object"==typeof t){const r=function(t,e,s){const i=_t(t.planned),r=_t(t.when),o=i??r;if(!o)return null;const n="number"==typeof t.delay&&isFinite(t.delay)?Math.round(t.delay):0,a="left"===t.directionArrow||"right"===t.directionArrow?t.directionArrow:null;return{id:"string"==typeof t.id&&t.id?t.id:`${e}-${s}-${"string"==typeof t.line?t.line:"?"}`,line:"string"==typeof t.line&&t.line?t.line:"?",direction:"string"==typeof t.direction&&t.direction?t.direction:"Unbekannt",plannedTime:o,actualTime:r,delay:n,platform:"string"==typeof t.platform?t.platform:null,cancelled:!0===t.cancelled,stopName:"string"==typeof t.stopName?t.stopName:"",type:e,directionArrow:a,lat:"number"==typeof t.lat?t.lat:void 0,lng:"number"==typeof t.lng?t.lng:void 0}}(t,e,s);r&&i.push(r)}}),i}function vt(t,e){const s=e.getTime(),i=t=>(t.actualTime??t.plannedTime).getTime();return t.filter(t=>!t.cancelled&&(!(i(t)<s-6e4)&&!(t.delay>60))).sort((t,e)=>i(t)-i(e))}const yt=n`
  :host {
    --glass-bg: rgba(255, 255, 255, 0.08);
    --glass-bg-hover: rgba(255, 255, 255, 0.12);
    --glass-border: rgba(255, 255, 255, 0.1);
    --glass-blur: 20px;

    --text-primary: rgba(255, 255, 255, 0.95);
    --text-secondary: rgba(255, 255, 255, 0.6);
    --text-muted: rgba(255, 255, 255, 0.4);

    --sbahn-color: #4caf50;
    --tram-color: #42a5f5;
    --bus-color: #ab47bc;

    --delay-minor: #ffa726;
    --delay-major: #ef5350;

    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 12px;
    --spacing-lg: 16px;
    --spacing-xl: 24px;

    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 14px;

    --font-mono: 'SF Mono', 'JetBrains Mono', 'Fira Code', monospace;

    display: block;
  }

  ha-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  /* Solid style fallback */
  :host([style='solid']) ha-card {
    background: var(--ha-card-background, #1e1e1e);
    backdrop-filter: none;
  }

  .card-content {
    padding: var(--spacing-lg);
  }

  .card-header {
    padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-sm);
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Section styles */
  .section {
    margin-bottom: var(--spacing-md);
  }

  .section:last-child {
    margin-bottom: 0;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--glass-bg);
    border-radius: var(--radius-sm);
    cursor: pointer;
    user-select: none;
    transition: background 0.15s ease;
  }

  .section-header:hover {
    background: var(--glass-bg-hover);
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .section-icon {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .section-icon.sbahn {
    background: var(--sbahn-color);
  }

  .section-icon.tram {
    background: var(--tram-color);
  }

  .section-icon.bus {
    background: var(--bus-color);
  }

  .section-toggle {
    color: var(--text-muted);
    font-size: 12px;
    transition: transform 0.2s ease;
  }

  .section-toggle.collapsed {
    transform: rotate(-90deg);
  }

  .section-content {
    overflow: hidden;
    transition: max-height 0.25s ease, opacity 0.2s ease;
  }

  .section-content.collapsed {
    max-height: 0 !important;
    opacity: 0;
  }

  /* Departure row */
  .departure-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-sm) var(--spacing-md);
    border-bottom: 1px solid var(--glass-border);
    transition: background 0.15s ease;
  }

  .departure-row:last-child {
    border-bottom: none;
  }

  .departure-row:hover {
    background: var(--glass-bg);
  }

  .departure-row.cancelled {
    opacity: 0.4;
    text-decoration: line-through;
  }

  /* Line badge */
  .line-badge {
    min-width: 42px;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 700;
    text-align: center;
    color: white;
  }

  .line-badge.sbahn {
    background: var(--sbahn-color);
  }

  .line-badge.tram {
    background: var(--tram-color);
  }

  .line-badge.bus {
    background: var(--bus-color);
  }

  /* Direction/destination */
  .direction {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Time info */
  .time-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-family: var(--font-mono);
  }

  .delay {
    font-size: 12px;
    font-weight: 600;
    color: var(--delay-minor);
  }

  .delay.major {
    color: var(--delay-major);
  }

  .platform {
    font-size: 11px;
    color: var(--text-muted);
    background: var(--glass-bg);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .time {
    font-size: 14px;
    color: var(--text-secondary);
    min-width: 42px;
    text-align: right;
  }

  .minutes {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
    min-width: 50px;
    text-align: right;
  }

  .minutes.soon {
    color: var(--sbahn-color);
  }

  /* Status bar */
  .status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-sm) var(--spacing-lg);
    font-size: 11px;
    color: var(--text-muted);
    border-top: 1px solid var(--glass-border);
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--text-muted);
  }

  .status-dot.live {
    background: var(--sbahn-color);
    box-shadow: 0 0 6px var(--sbahn-color);
  }

  .status-dot.loading {
    background: var(--delay-minor);
    animation: pulse 1s ease-in-out infinite;
  }

  .status-dot.error {
    background: var(--delay-major);
  }

  /* Loading state */
  .loading-skeleton {
    height: 40px;
    background: linear-gradient(
      90deg,
      var(--glass-bg) 25%,
      var(--glass-bg-hover) 50%,
      var(--glass-bg) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: var(--radius-sm);
    margin: var(--spacing-sm) 0;
  }

  /* Empty state */
  .empty-state {
    padding: var(--spacing-xl);
    text-align: center;
    color: var(--text-secondary);
    font-size: 14px;
  }

  /* Error state */
  .error-state {
    padding: var(--spacing-lg);
    text-align: center;
    color: var(--delay-major);
    font-size: 13px;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`,$t=n`
  /* 2-column map layout */
  .map-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    min-height: 400px;
  }

  /* Map column */
  .map-column {
    position: relative;
    border-radius: var(--radius-md);
    overflow: hidden;
    min-height: 350px;
    background: rgba(0, 0, 0, 0.3);
  }

  .map-container {
    width: 100%;
    height: 100%;
    min-height: 350px;
  }

  /* Glass overlay on map */
  .map-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
  }

  /* Departures column in map layout */
  .departures-column {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    max-height: 400px;
    overflow-y: auto;
  }

  /* Direction arrows */
  .direction-arrow {
    font-weight: bold;
    font-size: 14px;
    flex-shrink: 0;
  }

  .direction-arrow.left {
    color: var(--tram-color);
  }

  .direction-arrow.right {
    color: var(--bus-color);
  }

  /* Station markers */
  .station-marker {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
    color: white;
  }

  .station-marker.sbahn {
    background: var(--sbahn-color);
  }

  .station-marker.tram {
    background: var(--tram-color);
  }

  .station-marker.bus {
    background: var(--bus-color);
  }

  .station-marker.mixed {
    background: linear-gradient(
      135deg,
      var(--sbahn-color) 33%,
      var(--tram-color) 33%,
      var(--tram-color) 66%,
      var(--bus-color) 66%
    );
  }

  /* Marker popup styling */
  .marker-popup {
    font-family: inherit;
    min-width: 200px;
    padding: var(--spacing-sm);
  }

  .marker-popup h4 {
    margin: 0 0 var(--spacing-sm);
    color: #333;
    font-size: 14px;
    font-weight: 600;
  }

  .popup-departures {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .popup-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 12px;
    color: #333;
  }

  .popup-row .line {
    min-width: 32px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: bold;
    text-align: center;
    color: white;
  }

  .popup-row .line.sbahn {
    background: var(--sbahn-color);
  }

  .popup-row .line.tram {
    background: var(--tram-color);
  }

  .popup-row .line.bus {
    background: var(--bus-color);
  }

  .popup-row .dir {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .popup-row .time {
    font-weight: 600;
    white-space: nowrap;
  }

  /* Dark map tiles enhancement */
  .leaflet-tile-pane {
    filter: brightness(0.85) saturate(0.9);
  }

  /* Leaflet control styling for glass theme */
  .leaflet-control-zoom {
    border: 1px solid var(--glass-border) !important;
    background: var(--glass-bg) !important;
    backdrop-filter: blur(10px);
  }

  .leaflet-control-zoom a {
    background: transparent !important;
    color: var(--text-primary) !important;
    border-bottom: 1px solid var(--glass-border) !important;
  }

  .leaflet-control-zoom a:last-child {
    border-bottom: none !important;
  }

  .leaflet-control-zoom a:hover {
    background: var(--glass-bg-hover) !important;
  }

  /* Responsive: stack on mobile */
  @media (max-width: 600px) {
    .map-layout {
      grid-template-columns: 1fr;
    }

    .map-column {
      min-height: 250px;
    }

    .departures-column {
      max-height: 300px;
    }
  }
`;function wt(t){return t.toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit",hour12:!1})}function xt(t,e=new Date){const s=t.getTime()-e.getTime();return Math.floor(s/6e4)}function At(t){return t<=0?"jetzt":1===t?"1 min":`${t} min`}let kt=class extends lt{constructor(){super(...arguments),this.now=new Date}render(){const t=this.departure,e=xt(t.actualTime||t.plannedTime,this.now),s=e<=5&&e>=0;return F`
      <div class="departure-row ${t.cancelled?"cancelled":""}">
        <div class="line-badge ${t.type}">${t.line}</div>

        <div class="direction-wrapper">
          ${t.directionArrow?F`<span class="direction-arrow ${t.directionArrow}">${"left"===t.directionArrow?"←":"→"}</span>`:V}
          <div class="direction">${t.direction}</div>
        </div>

        <div class="time-info">
          ${t.delay>0?F`<span class="delay ${t.delay>5?"major":""}">${r=t.delay,r<=0?"":`+${r}`}</span>`:V}
          ${t.platform?F`<span class="platform">${i=t.platform,i?`Gl. ${i}`:""}</span>`:V}
          <span class="time">${wt(t.plannedTime)}</span>
          <span class="minutes ${s?"soon":""}">${t.cancelled?"Ausfall":At(e)}</span>
        </div>
      </div>
    `;var i,r}};kt.styles=[yt,n`
      .direction-wrapper {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs, 4px);
        overflow: hidden;
      }

      .direction-arrow {
        font-weight: bold;
        font-size: 14px;
        flex-shrink: 0;
      }

      .direction-arrow.left {
        color: var(--tram-color, #42a5f5);
      }

      .direction-arrow.right {
        color: var(--bus-color, #ab47bc);
      }
    `],t([ut({attribute:!1})],kt.prototype,"departure",void 0),t([ut({attribute:!1})],kt.prototype,"now",void 0),kt=t([ct("departure-row")],kt);const St={sbahn:"S-Bahn",tram:"Straßenbahn",bus:"Bus"};let Et=class extends lt{constructor(){super(...arguments),this.collapsed=!1,this.departures=[],this.now=new Date,this.maxItems=5}_toggleCollapsed(){this.collapsed=!this.collapsed,this.dispatchEvent(new CustomEvent("toggle-section",{detail:{type:this.type,collapsed:this.collapsed},bubbles:!0,composed:!0}))}render(){const t=this.departures.slice(0,this.maxItems);return this.departures.length>0?F`
      <div class="section">
        <div
          class="section-header"
          @click=${this._toggleCollapsed}
          role="button"
          tabindex="0"
          aria-expanded=${!this.collapsed}
          @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggleCollapsed())}}
        >
          <div class="section-title">
            <span class="section-icon ${this.type}"></span>
            ${St[this.type]}
          </div>
          <span class="section-toggle ${this.collapsed?"collapsed":""}">▼</span>
        </div>

        <div
          class="section-content ${this.collapsed?"collapsed":""}"
          style="max-height: ${this.collapsed?0:50*t.length}px"
        >
          ${t.map(t=>F`
              <departure-row .departure=${t} .now=${this.now}></departure-row>
            `)}
        </div>
      </div>
    `:F``}};Et.styles=[yt,n`
      :host {
        display: block;
      }
    `],t([ut()],Et.prototype,"type",void 0),t([ut({type:Boolean})],Et.prototype,"collapsed",void 0),t([ut({attribute:!1})],Et.prototype,"departures",void 0),t([ut({attribute:!1})],Et.prototype,"now",void 0),t([ut({type:Number})],Et.prototype,"maxItems",void 0),Et=t([ct("transit-section")],Et);let Ct=class extends lt{constructor(){super(...arguments),this.status="loading",this.lastUpdated=null,this.stale=!1}_getStatusText(){if(this.stale&&"live"===this.status)return"Veraltet";switch(this.status){case"live":return"Live";case"loading":return"Aktualisiere...";case"error":return"Fehler";case"offline":return"Offline"}}render(){const t=this.stale&&"live"===this.status?"error":this.status;return F`
      <div class="status-bar">
        <div class="status-indicator">
          <span class="status-dot ${t}"></span>
          <span>${this._getStatusText()}</span>
        </div>
        <div>
          ${this.lastUpdated?F`Aktualisiert ${wt(this.lastUpdated)}`:V}
        </div>
      </div>
    `}};Ct.styles=yt,t([ut()],Ct.prototype,"status",void 0),t([ut({attribute:!1})],Ct.prototype,"lastUpdated",void 0),t([ut({type:Boolean})],Ct.prototype,"stale",void 0),Ct=t([ct("status-bar")],Ct);const Tt="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";let Pt=!1,zt=null;let Ut=class extends lt{constructor(){super(...arguments),this.stations=[],this.departures={sbahn:[],tram:[],bus:[]},this.now=new Date,this._leafletReady=!1,this._mapInitialized=!1,this._map=null,this._markers=[]}async connectedCallback(){super.connectedCallback(),await this._loadLeaflet()}disconnectedCallback(){super.disconnectedCallback(),this._destroyMap()}async _loadLeaflet(){try{await async function(){if(!Pt||"undefined"==typeof L)return zt||(zt=new Promise((t,e)=>{if("undefined"!=typeof L)return Pt=!0,void t();if(!document.querySelector(`link[href="${Tt}"]`)){const t=document.createElement("link");t.rel="stylesheet",t.href=Tt,document.head.appendChild(t)}const s=document.createElement("script");s.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",s.onload=()=>{Pt=!0,t()},s.onerror=()=>e(new Error("Failed to load Leaflet")),document.head.appendChild(s)}),zt)}(),this._leafletReady=!0}catch(t){console.error("[transit-card] Failed to load Leaflet:",t)}}updated(t){super.updated(t),this._leafletReady&&!this._mapInitialized&&requestAnimationFrame(()=>this._initMap()),(t.has("stations")||t.has("departures"))&&this._updateMarkers(),t.has("now")&&this._updatePopups()}_initMap(){if(this._mapInitialized||!this._leafletReady)return;const t=this.shadowRoot?.querySelector(".map-container");if(!t)return;const e=[49.4034,8.6845];try{this._map=L.map(t,{center:this.center?[this.center.lat,this.center.lng]:e,zoom:this.zoom||14,zoomControl:!0,attributionControl:!0}),L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',maxZoom:18}).addTo(this._map),this._mapInitialized=!0,this.stations.length>0&&this._updateMarkers()}catch(t){console.error("[transit-card] Failed to initialize map:",t)}}_destroyMap(){this._map&&(this._map.remove(),this._map=null,this._markers=[],this._mapInitialized=!1)}_allDepartures(){return[...this.departures.sbahn,...this.departures.tram,...this.departures.bus]}_departuresForStation(t){const e=this._allDepartures();return"__all__"===t.id?e:e.filter(e=>e.stopName&&(e.stopName===t.name||e.stopName===t.id))}_updateMarkers(){if(!this._map||!this._mapInitialized)return;if(this._markers.forEach(t=>t.remove()),this._markers=[],0===this.stations.length)return;const t=L.latLngBounds([]);this.stations.forEach(e=>{const s=new Set(this._departuresForStation(e).map(t=>t.type));0===s.size&&s.add("sbahn");const i=s.has("sbahn")?"sbahn":s.has("tram")?"tram":"bus",r=this._createMarkerIcon(i,s.size>1),o=L.marker([e.latitude,e.longitude],{icon:r}).addTo(this._map);o.bindPopup(()=>this._createPopupContent(e),{className:"transit-popup",maxWidth:280}),this._markers.push(o),t.extend([e.latitude,e.longitude])}),this.stations.length>0&&!this.center&&this._map.fitBounds(t,{padding:[30,30]})}_createMarkerIcon(t,e){const s=e?"linear-gradient(135deg, #4caf50 33%, #42a5f5 33%, #42a5f5 66%, #ab47bc 66%)":{sbahn:"#4caf50",tram:"#42a5f5",bus:"#ab47bc"}[t];return L.divIcon({className:"custom-marker",html:`\n        <div style="\n          width: 20px;\n          height: 20px;\n          border-radius: 50%;\n          border: 2px solid white;\n          background: ${s};\n          box-shadow: 0 2px 8px rgba(0,0,0,0.4);\n        "></div>\n      `,iconSize:[20,20],iconAnchor:[10,10]})}_createPopupContent(t){const e=document.createElement("div");e.style.cssText="font-family: inherit; min-width: 180px;";const s=this._departuresForStation(t).slice().sort((t,e)=>(t.actualTime??t.plannedTime).getTime()-(e.actualTime??e.plannedTime).getTime()).slice(0,5),i={sbahn:"#4caf50",tram:"#42a5f5",bus:"#ab47bc"};return e.innerHTML=`\n      <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: #333;">${t.name}</div>\n      <div style="display: flex; flex-direction: column; gap: 4px;">\n        ${0===s.length?'<div style="color: #666; font-size: 12px;">Keine Abfahrten</div>':s.map(t=>{const e=xt(t.actualTime||t.plannedTime,this.now),s=t.directionArrow?`<span style="font-weight: bold; color: ${"left"===t.directionArrow?"#42a5f5":"#ab47bc"};">${"left"===t.directionArrow?"←":"→"}</span>`:"";return`\n                <div style="display: flex; align-items: center; gap: 6px; font-size: 12px;">\n                  <span style="min-width: 28px; padding: 2px 4px; border-radius: 3px; background: ${i[t.type]}; color: white; font-weight: bold; text-align: center; font-size: 11px;">${t.line}</span>\n                  ${s}\n                  <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #333;">${t.direction}</span>\n                  <span style="font-weight: 600; color: #333; white-space: nowrap;">${At(e)}</span>\n                </div>\n              `}).join("")}\n      </div>\n    `,e}_updatePopups(){this._markers.forEach(t=>{if(t.isPopupOpen()){const e=t.getPopup();if(e){const s=this.stations.find(e=>e.latitude===t.getLatLng().lat&&e.longitude===t.getLatLng().lng);s&&e.setContent(this._createPopupContent(s))}}})}render(){return this._leafletReady?F`<div class="map-container"></div>`:F`<div class="loading-map">Karte wird geladen...</div>`}};Ut.styles=n`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 350px;
    }

    .map-container {
      width: 100%;
      height: 100%;
      min-height: 350px;
      border-radius: var(--radius-md, 10px);
      overflow: hidden;
      background: rgba(0, 0, 0, 0.3);
    }

    .loading-map {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 350px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
    }
  `,t([ut({attribute:!1})],Ut.prototype,"stations",void 0),t([ut({attribute:!1})],Ut.prototype,"departures",void 0),t([ut({attribute:!1})],Ut.prototype,"now",void 0),t([ut({type:Number})],Ut.prototype,"zoom",void 0),t([ut({attribute:!1})],Ut.prototype,"center",void 0),t([mt()],Ut.prototype,"_leafletReady",void 0),t([mt()],Ut.prototype,"_mapInitialized",void 0),Ut=t([ct("transit-map")],Ut);let Mt=class extends lt{constructor(){super(...arguments),this._rawDepartures={sbahn:[],tram:[],bus:[]},this._status="loading",this._lastUpdated=null,this._error=null,this._now=new Date,this._collapsedSections=new Set,this._stationLocations=[],this._lastSig=""}setConfig(t){if(!t)throw new Error("Invalid configuration");const e=t.stops||{};for(const t of gt){const s=e[t];if(null==s)continue;if(Array.isArray(s))throw new Error(`transit-card: "stops.${t}" is a list of stop IDs (old format). Use a single Home Assistant entity, e.g.  stops.${t}: sensor.transit_${t}_all`);const i=ft(s);if(i&&/^\d+$/.test(i))throw new Error(`transit-card: "stops.${t}: ${i}" looks like a Deutsche Bahn stop ID (old format). Point it at a Home Assistant entity instead, e.g.  stops.${t}: sensor.transit_${t}_all`)}this._config=t,this._collapsedSections=t.collapsed?new Set(t.collapsed):new Set}getCardSize(){const t=gt.filter(t=>this._rawDepartures[t].length>0).length;return Math.max(3,3*t)}connectedCallback(){super.connectedCallback(),this._startClock()}disconnectedCallback(){super.disconnectedCallback(),this._stopClock()}willUpdate(t){(t.has("hass")||t.has("_config"))&&this._recomputeIfNeeded()}_startClock(){this._clockInterval=window.setInterval(()=>{this._now=new Date},1e3)}_stopClock(){this._clockInterval&&(clearInterval(this._clockInterval),this._clockInterval=void 0)}_sourceEntityIds(){const t=[];for(const e of gt){const s=ft(this._config?.stops?.[e]);s&&t.push(s)}return t}_recomputeIfNeeded(){if(!this.hass||!this._config)return;const t=this._sourceEntityIds().map(t=>{const e=this.hass.states[t];return e?`${t}@${e.last_updated}#${e.state}`:`${t}@none`}).join("|");t!==this._lastSig&&(this._lastSig=t,this._recompute())}_recompute(){const t={sbahn:[],tram:[],bus:[]};let e=0,s=0,i="",r=0;for(const o of gt){const n=ft(this._config.stops?.[o]);if(!n)continue;e++;const a=this.hass.states[n];if(!a||"unavailable"===a.state||"unknown"===a.state){i||(i=`Entität „${n}“ nicht verfügbar`);continue}s++,t[o]=bt(a,o);const l=Date.parse(a.last_updated);!isNaN(l)&&l>r&&(r=l)}this._rawDepartures=t,this._lastUpdated=r?new Date(r):null,this._stationLocations=this._buildStations(t),0===e?(this._status="error",this._error="Keine Entitäten konfiguriert (stops.sbahn / tram / bus)"):0===s?(this._status="error",this._error=i||"Quelle nicht verfügbar"):(this._status="live",this._error=null)}_buildStations(t){const e=[],s=new Set;for(const i of gt)for(const r of t[i])if("number"==typeof r.lat&&"number"==typeof r.lng){const t=r.stopName||`${r.lat},${r.lng}`;s.has(t)||(s.add(t),e.push({id:t,name:r.stopName||t,latitude:r.lat,longitude:r.lng}))}const i=this._config?.map?.stops;if(i)for(const[t,r]of Object.entries(i))r&&"number"==typeof r.lat&&"number"==typeof r.lng&&!s.has(t)&&(s.add(t),e.push({id:t,name:t,latitude:r.lat,longitude:r.lng}));const r=this._config?.map?.center;return 0===e.length&&r&&e.push({id:"__all__",name:this._config?.title||"",latitude:r.lat,longitude:r.lng}),e}_isStale(t){if(!this._lastUpdated)return!1;const e=1e3*(this._config?.stale_threshold??180);return t.getTime()-this._lastUpdated.getTime()>e}_handleToggleSection(t){const{type:e,collapsed:s}=t.detail;s?this._collapsedSections.add(e):this._collapsedSections.delete(e),this.requestUpdate()}_renderLoadingSkeleton(){return F`
      <div class="loading-skeleton"></div>
      <div class="loading-skeleton"></div>
      <div class="loading-skeleton"></div>
    `}_renderError(){return F`<div class="error-state">${this._error||"Keine Daten"}</div>`}_renderEmpty(){return F`<div class="empty-state">Keine Abfahrten gefunden</div>`}_renderSections(t){const e=this._config?.max_departures||5;return gt.map(s=>F`
        <transit-section
          type=${s}
          .departures=${t[s]}
          .collapsed=${this._collapsedSections.has(s)}
          .now=${this._now}
          .maxItems=${e}
        ></transit-section>
      `)}_renderListLayout(t){return F`${this._renderSections(t)}`}_renderMapLayout(t){return F`
      <div class="map-layout">
        <div class="map-column">
          <transit-map
            .stations=${this._stationLocations}
            .departures=${t}
            .now=${this._now}
            .zoom=${this._config?.map?.zoom}
            .center=${this._config?.map?.center}
          ></transit-map>
          <div class="map-overlay"></div>
        </div>

        <div class="departures-column" @toggle-section=${this._handleToggleSection}>
          ${this._renderSections(t)}
        </div>
      </div>
    `}render(){const t=this._now,e={sbahn:vt(this._rawDepartures.sbahn,t),tram:vt(this._rawDepartures.tram,t),bus:vt(this._rawDepartures.bus,t)},s=e.sbahn.length>0||e.tram.length>0||e.bus.length>0,i="loading"===this._status&&!s,r="error"===this._status&&!s,o="map"===this._config?.layout;return F`
      <ha-card>
        ${this._config?.title?F`<div class="card-header">${this._config.title}</div>`:V}

        <div class="card-content" @toggle-section=${this._handleToggleSection}>
          ${i?this._renderLoadingSkeleton():r?this._renderError():s?o?this._renderMapLayout(e):this._renderListLayout(e):this._renderEmpty()}
        </div>

        <status-bar
          .status=${this._status}
          .lastUpdated=${this._lastUpdated}
          .stale=${this._isStale(t)}
        ></status-bar>
      </ha-card>
    `}static getConfigElement(){}static getStubConfig(){return{type:"custom:transit-card",title:"Abfahrten",stops:{sbahn:"sensor.transit_s_bahn_all",bus:"sensor.transit_bus_all",tram:"sensor.transit_tram_all"},max_departures:5}}};Mt.styles=[yt,$t],t([ut({attribute:!1})],Mt.prototype,"hass",void 0),t([mt()],Mt.prototype,"_config",void 0),t([mt()],Mt.prototype,"_rawDepartures",void 0),t([mt()],Mt.prototype,"_status",void 0),t([mt()],Mt.prototype,"_lastUpdated",void 0),t([mt()],Mt.prototype,"_error",void 0),t([mt()],Mt.prototype,"_now",void 0),t([mt()],Mt.prototype,"_collapsedSections",void 0),t([mt()],Mt.prototype,"_stationLocations",void 0),Mt=t([ct("transit-card")],Mt),window.customCards=window.customCards||[],window.customCards.push({type:"transit-card",name:"Transit Card",description:"Real-time transit departures rendered from Home Assistant entities",preview:!0,documentationURL:"https://github.com/kinivi/transit-card"});export{Mt as TransitCard};
//# sourceMappingURL=transit-card.js.map
