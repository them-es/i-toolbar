(()=>{"use strict";const e=window.wp.element,t=window.wp.i18n,o=window.wp.blockEditor,n=window.wp.components,l=window.wp.richText,a="bi-picker/icon";(0,l.registerFormatType)(a,{title:"Icon",tagName:"i",className:null,edit:i=>{let{isActive:r,value:c,onChange:s,onFocus:m}=i;const u=()=>{const e=document.querySelector("#i-toolbar-search input").value;document.querySelectorAll("#i-toolbar-menu button").forEach((t=>{e.length>1?t.innerHTML.includes(e)?t.style.display="flex":t.style.display="none":t.style.display="flex"}))};return(0,e.createElement)(o.BlockControls,null,(0,e.createElement)(n.ToolbarGroup,null,(0,e.createElement)(n.ToolbarButton,{icon:"info",label:(0,t.__)("Add Icon","i-toolbar"),className:"i-toolbar",onClick:()=>{s(r?(0,l.removeFormat)(c,a):(0,l.toggleFormat)(c,{type:a}))}})),r&&(0,e.createElement)(n.Popover,{headerTitle:(0,t.__)("Icons Popover","i-toolbar"),animate:!1},(0,e.createElement)("label",{id:"i-toolbar-search"},(0,e.createElement)("i",{className:"bi bi-search"})," ",(0,e.createElement)("input",{type:"search",onKeyUp:()=>{u()},onChange:()=>{u()},placeholder:(0,t.__)("Filter...","i-toolbar"),autoFocus:!0})),(0,e.createElement)("div",{id:"i-toolbar-menu",role:"menu",className:"components-dropdown-menu__menu"},Object.keys(JSON.parse(globalBootstrapIconToolbarData.iconFontSelection)).map((t=>(0,e.createElement)("button",{key:"button-"+t,title:t,type:"button",role:"menu-item",className:"components-button components-dropdown-menu__menu-item has-text has-icon",onClick:()=>{s((0,l.insert)(c,(0,l.create)({html:'<i class="bi bi-'+t+'"></i> '}))),m()}},(0,e.createElement)("i",{className:"bi bi-"+t}),t))))))}})})();