var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var i=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,i.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var r=o("iQIUW");function l(e,t){const n=Math.random()>.3;return new Promise(((i,o)=>{setTimeout((()=>{n?i(e,t):o(e,t)}),t)}))}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();const{amount:t,delay:n,step:o}=e.target.elements;!function({firstDelay:e,stepDelay:t,amount:n}){let o=e;for(i=1;i<=n;i+=1)l(i,o).then((({position:e,delay:t})=>{r.Notify.success(`Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{r.Notify.failure(`Rejected promise ${e} in ${t}ms`)})),o+=t}({firstDelay:n.valueAsNumber,stepDelay:o.valueAsNumber,amount:t.valueAsNumber})}));
//# sourceMappingURL=03-promises.369a6963.js.map
