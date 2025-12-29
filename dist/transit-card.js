function t(t,e,s,r){var i,n=arguments.length,o=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,s):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(o=(n<3?i(o):n>3?i(e,s,o):i(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&i.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[r+1],t[0]);return new n(s,t,r)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",_=g.reactiveElementPolyfillSupport,v=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(t,s,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){const{get:r,set:i}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const n=r?.call(this);i?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(s)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of r){const r=document.createElement("style"),i=e.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=s.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(void 0!==r&&!0===s.reflect){const i=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==i?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(t,e){const s=this.constructor,r=s._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=s.getPropertyOptions(r),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=r;const n=i.fromAttribute(e,t.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(t,e,s,r=!1,i){if(void 0!==t){const n=this.constructor;if(!1===r&&(i=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??b)(i,e)||s.useDefault&&s.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:i},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==i||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,s,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,_?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,A=t=>t,S=x.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,T=`<${P}>`,U=document,O=()=>U.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,I="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,N=/>/g,j=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,L=/"/g,B=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),V=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,J=U.createTreeWalker(U,129);function K(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Z=(t,e)=>{const s=t.length-1,r=[];let i,n=2===e?"<svg>":3===e?"<math>":"",o=D;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,d=0;for(;d<s.length&&(o.lastIndex=d,l=o.exec(s),null!==l);)d=o.lastIndex,o===D?"!--"===l[1]?o=H:void 0!==l[1]?o=N:void 0!==l[2]?(B.test(l[2])&&(i=RegExp("</"+l[2],"g")),o=j):void 0!==l[3]&&(o=j):o===j?">"===l[0]?(o=i??D,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?j:'"'===l[3]?L:z):o===L||o===z?o=j:o===H||o===N?o=D:(o=j,i=void 0);const h=o===j&&t[e+1].startsWith("/>")?" ":"";n+=o===D?s+T:c>=0?(r.push(a),s.slice(0,c)+k+s.slice(c)+C+h):s+C+(-2===c?e:h)}return[K(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class G{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let i=0,n=0;const o=t.length-1,a=this.parts,[l,c]=Z(t,e);if(this.el=G.createElement(l,s),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=J.nextNode())&&a.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(k)){const e=c[n++],s=r.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:i,name:o[2],strings:s,ctor:"."===o[1]?et:"?"===o[1]?st:"@"===o[1]?rt:tt}),r.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:i}),r.removeAttribute(t));if(B.test(r.tagName)){const t=r.textContent.split(C),e=t.length-1;if(e>0){r.textContent=S?S.emptyScript:"";for(let s=0;s<e;s++)r.append(t[s],O()),J.nextNode(),a.push({type:2,index:++i});r.append(t[e],O())}}}else if(8===r.nodeType)if(r.data===P)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=r.data.indexOf(C,t+1));)a.push({type:7,index:i}),t+=C.length-1}i++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function Q(t,e,s=t,r){if(e===V)return e;let i=void 0!==r?s._$Co?.[r]:s._$Cl;const n=M(e)?void 0:e._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),void 0===n?i=void 0:(i=new n(t),i._$AT(t,s,r)),void 0!==r?(s._$Co??=[])[r]=i:s._$Cl=i),void 0!==i&&(e=Q(t,i._$AS(t,e.values),i,r)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??U).importNode(e,!0);J.currentNode=r;let i=J.nextNode(),n=0,o=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Y(i,i.nextSibling,this,t):1===a.type?e=new a.ctor(i,a.name,a.strings,this,t):6===a.type&&(e=new it(i,this,t)),this._$AV.push(e),a=s[++o]}n!==a?.index&&(i=J.nextNode(),n++)}return J.currentNode=U,r}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),M(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,r="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=G.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new X(r,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new G(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,r=0;for(const i of t)r===e.length?e.push(s=new Y(this.O(O()),this.O(O()),this,this.options)):s=e[r],s._$AI(i),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,i){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(t,e=this,s,r){const i=this.strings;let n=!1;if(void 0===i)t=Q(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==V,n&&(this._$AH=t);else{const r=t;let o,a;for(t=i[0],o=0;o<i.length-1;o++)a=Q(this,r[s+o],e,o),a===V&&(a=this._$AH[o]),n||=!M(a)||a!==this._$AH[o],a===W?t=W:t!==W&&(t+=(a??"")+i[o+1]),this._$AH[o]=a}n&&!r&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class rt extends tt{constructor(t,e,s,r,i){super(t,e,s,r,i),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??W)===V)return;const s=this._$AH,r=t===W&&s!==W||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==W&&(s===W||r);r&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(G,Y),(x.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const r=s?.renderBefore??e;let i=r._$litPart$;if(void 0===i){const t=s?.renderBefore??null;r._$litPart$=i=new Y(e.insertBefore(O(),t),t,void 0,s??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const lt=ot.litElementPolyfillSupport;lt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:b},ht=(t=dt,e,s)=>{const{kind:r,metadata:i}=s;let n=globalThis.litPropertyMetadata.get(i);if(void 0===n&&globalThis.litPropertyMetadata.set(i,n=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===r){const{name:r}=s;return{set(s){const i=e.get.call(this);e.set.call(this,s),this.requestUpdate(r,i,t,!0,s)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=s;return function(s){const i=this[r];e.call(this,s),this.requestUpdate(r,i,t,!0,s)}}throw Error("Unsupported decorator location: "+r)};function pt(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const r=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),r?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function ut(t){return pt({...t,state:!0,attribute:!1})}const gt=["8002681"],mt=["506913","506953"],ft=["518175","506901"],_t=["","https://corsproxy.io/?","https://api.allorigins.win/raw?url="];let vt=0;async function $t(t,e,s){try{const r=new URL(`https://v6.db.transport.rest/stops/${t}/departures`);r.searchParams.set("duration",String(60)),r.searchParams.set("suburban","sbahn"===e?"true":"false"),r.searchParams.set("tram","tram"===e?"true":"false"),r.searchParams.set("bus","bus"===e?"true":"false"),r.searchParams.set("regional","false"),r.searchParams.set("express","false"),r.searchParams.set("ferry","false");const i=await async function(t,e){if(e){const s=e+encodeURIComponent(t);return fetch(s)}for(let e=0;e<_t.length;e++){const s=(vt+e)%_t.length,r=_t[s];try{const e=r?r+encodeURIComponent(t):t,i=await fetch(e,{signal:AbortSignal.timeout(1e4)});if(i.ok)return vt=s,i}catch(t){console.log(`[transit-card] Proxy ${s} failed, trying next...`)}}throw new Error("All proxies failed")}(r.toString(),s);if(!i.ok)return console.error(`[transit-card] API error for ${t}: ${i.status}`),[];const n=await i.json(),o=new Date;return(n.departures||[]).map(s=>function(t,e,s){const r=new Date(t.plannedWhen),i=t.when?new Date(t.when):null,n=t.delay?Math.round(t.delay/60):0;return{id:t.tripId,line:t.line?.name||"?",direction:t.direction||"Unbekannt",plannedTime:r,actualTime:i,delay:n,platform:t.platform,cancelled:t.cancelled||!1,stopName:t.stop?.name||"",stopId:e,type:s}}(s,t,e)).filter(t=>{if(t.cancelled)return!1;return!((t.actualTime||t.plannedTime).getTime()<o.getTime()-6e4)}).sort((t,e)=>t.plannedTime.getTime()-e.plannedTime.getTime())}catch(s){return console.error(`[transit-card] Failed to fetch ${e} departures for ${t}:`,s),[]}}function bt(t,e){const s=function(t){return t?Array.isArray(t)?t:[t]:[]}(t);return s.length>0?s:e}const yt=o`
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
`;function wt(t){return t.toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit",hour12:!1})}let xt=class extends at{constructor(){super(...arguments),this.now=new Date}render(){const t=this.departure,e=function(t,e=new Date){const s=t.getTime()-e.getTime();return Math.floor(s/6e4)}(t.actualTime||t.plannedTime,this.now),s=e<=5&&e>=0;return q`
      <div class="departure-row ${t.cancelled?"cancelled":""}">
        <div class="line-badge ${t.type}">${t.line}</div>

        <div class="direction">${t.direction}</div>

        <div class="time-info">
          ${t.delay>0?q`<span class="delay ${t.delay>5?"major":""}">${i=t.delay,i<=0?"":`+${i}`}</span>`:W}
          ${t.platform?q`<span class="platform">${r=t.platform,r?`Gl. ${r}`:""}</span>`:W}
          <span class="time">${wt(t.plannedTime)}</span>
          <span class="minutes ${s?"soon":""}">${t.cancelled?"Ausfall":function(t){return t<=0?"jetzt":1===t?"1 min":`${t} min`}(e)}</span>
        </div>
      </div>
    `;var r,i}};xt.styles=yt,t([pt({attribute:!1})],xt.prototype,"departure",void 0),t([pt({attribute:!1})],xt.prototype,"now",void 0),xt=t([ct("departure-row")],xt);const At={sbahn:"S-Bahn",tram:"Straßenbahn",bus:"Bus"};let St=class extends at{constructor(){super(...arguments),this.collapsed=!1,this.departures=[],this.now=new Date,this.maxItems=5}_toggleCollapsed(){this.collapsed=!this.collapsed,this.dispatchEvent(new CustomEvent("toggle-section",{detail:{type:this.type,collapsed:this.collapsed},bubbles:!0,composed:!0}))}render(){const t=this.departures.slice(0,this.maxItems);return this.departures.length>0?q`
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
            ${At[this.type]}
          </div>
          <span class="section-toggle ${this.collapsed?"collapsed":""}">▼</span>
        </div>

        <div
          class="section-content ${this.collapsed?"collapsed":""}"
          style="max-height: ${this.collapsed?0:50*t.length}px"
        >
          ${t.map(t=>q`
              <departure-row .departure=${t} .now=${this.now}></departure-row>
            `)}
        </div>
      </div>
    `:q``}};St.styles=[yt,o`
      :host {
        display: block;
      }
    `],t([pt()],St.prototype,"type",void 0),t([pt({type:Boolean})],St.prototype,"collapsed",void 0),t([pt({attribute:!1})],St.prototype,"departures",void 0),t([pt({attribute:!1})],St.prototype,"now",void 0),t([pt({type:Number})],St.prototype,"maxItems",void 0),St=t([ct("transit-section")],St);let Et=class extends at{constructor(){super(...arguments),this.status="loading",this.lastUpdated=null}_getStatusText(){switch(this.status){case"live":return"Live";case"loading":return"Aktualisiere...";case"error":return"Fehler";case"offline":return"Offline"}}render(){return q`
      <div class="status-bar">
        <div class="status-indicator">
          <span class="status-dot ${this.status}"></span>
          <span>${this._getStatusText()}</span>
        </div>
        <div>
          ${this.lastUpdated?q`Aktualisiert ${wt(this.lastUpdated)}`:q`v6.db.transport.rest`}
        </div>
      </div>
    `}};Et.styles=yt,t([pt()],Et.prototype,"status",void 0),t([pt({attribute:!1})],Et.prototype,"lastUpdated",void 0),Et=t([ct("status-bar")],Et);let kt=class extends at{constructor(){super(...arguments),this._departures={sbahn:[],tram:[],bus:[]},this._status="loading",this._lastUpdated=null,this._now=new Date,this._collapsedSections=new Set,this._error=null}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config=t,t.collapsed&&(this._collapsedSections=new Set(t.collapsed))}getCardSize(){const t=[this._departures.sbahn.length,this._departures.tram.length,this._departures.bus.length].filter(t=>t>0).length;return Math.max(3,3*t)}connectedCallback(){super.connectedCallback(),this._startPolling(),this._startClock()}disconnectedCallback(){super.disconnectedCallback(),this._stopPolling(),this._stopClock()}_startPolling(){this._fetchData();const t=1e3*(this._config?.refresh_interval||30);this._refreshInterval=window.setInterval(()=>{this._fetchData()},t)}_stopPolling(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=void 0)}_startClock(){this._clockInterval=window.setInterval(()=>{this._now=new Date},1e3)}_stopClock(){this._clockInterval&&(clearInterval(this._clockInterval),this._clockInterval=void 0)}async _fetchData(){this._status="loading",this._error=null;try{const t=await async function(t){const e={sbahn:bt(t?.sbahn,gt),tram:bt(t?.tram,mt),bus:bt(t?.bus,ft)};console.log("[transit-card] Fetching departures for stops:",e);const[s,r,i]=await Promise.all([Promise.all(e.sbahn.map(e=>$t(e,"sbahn",t?.proxy_url))),Promise.all(e.tram.map(e=>$t(e,"tram",t?.proxy_url))),Promise.all(e.bus.map(e=>$t(e,"bus",t?.proxy_url)))]),n=t=>t.sort((t,e)=>t.plannedTime.getTime()-e.plannedTime.getTime()),o={sbahn:n(s.flat()),tram:n(r.flat()),bus:n(i.flat())};return console.log("[transit-card] Fetched departures:",{sbahn:o.sbahn.length,tram:o.tram.length,bus:o.bus.length}),o}({...this._config?.stops,proxy_url:this._config?.proxy_url});this._departures=t,this._lastUpdated=new Date,this._status="live"}catch(t){console.error("Failed to fetch departures:",t),this._status="error",this._error=t instanceof Error?t.message:"Verbindungsfehler"}}_handleToggleSection(t){const{type:e,collapsed:s}=t.detail;s?this._collapsedSections.add(e):this._collapsedSections.delete(e),this.requestUpdate()}_renderLoadingSkeleton(){return q`
      <div class="loading-skeleton"></div>
      <div class="loading-skeleton"></div>
      <div class="loading-skeleton"></div>
    `}_renderError(){return q`
      <div class="error-state">
        ${this._error||"Verbindungsfehler"}
        <br />
        <button @click=${this._fetchData} style="margin-top: 8px; cursor: pointer;">
          Erneut versuchen
        </button>
      </div>
    `}_renderEmpty(){return q`
      <div class="empty-state">Keine Abfahrten gefunden</div>
    `}render(){const t=this._config?.max_departures||5,e=this._departures.sbahn.length>0||this._departures.tram.length>0||this._departures.bus.length>0,s="loading"===this._status&&!e,r="error"===this._status&&!e;return q`
      <ha-card>
        ${this._config?.title?q`<div class="card-header">${this._config.title}</div>`:W}

        <div class="card-content" @toggle-section=${this._handleToggleSection}>
          ${s?this._renderLoadingSkeleton():r?this._renderError():e?q`
                    <transit-section
                      type="sbahn"
                      .departures=${this._departures.sbahn}
                      .collapsed=${this._collapsedSections.has("sbahn")}
                      .now=${this._now}
                      .maxItems=${t}
                    ></transit-section>

                    <transit-section
                      type="tram"
                      .departures=${this._departures.tram}
                      .collapsed=${this._collapsedSections.has("tram")}
                      .now=${this._now}
                      .maxItems=${t}
                    ></transit-section>

                    <transit-section
                      type="bus"
                      .departures=${this._departures.bus}
                      .collapsed=${this._collapsedSections.has("bus")}
                      .now=${this._now}
                      .maxItems=${t}
                    ></transit-section>
                  `:this._renderEmpty()}
        </div>

        <status-bar .status=${this._status} .lastUpdated=${this._lastUpdated}></status-bar>
      </ha-card>
    `}static getConfigElement(){}static getStubConfig(){return{type:"custom:transit-card",title:"Abfahrten",stops:{sbahn:"8002681",tram:["506913","506953"],bus:["518175"]},refresh_interval:30,max_departures:5}}};kt.styles=yt,t([pt({attribute:!1})],kt.prototype,"hass",void 0),t([ut()],kt.prototype,"_config",void 0),t([ut()],kt.prototype,"_departures",void 0),t([ut()],kt.prototype,"_status",void 0),t([ut()],kt.prototype,"_lastUpdated",void 0),t([ut()],kt.prototype,"_now",void 0),t([ut()],kt.prototype,"_collapsedSections",void 0),t([ut()],kt.prototype,"_error",void 0),kt=t([ct("transit-card")],kt),window.customCards=window.customCards||[],window.customCards.push({type:"transit-card",name:"Transit Card",description:"Real-time transit departures with glass-blur aesthetic",preview:!0,documentationURL:"https://github.com/kinivi/transit-card"});export{kt as TransitCard};
//# sourceMappingURL=transit-card.js.map
