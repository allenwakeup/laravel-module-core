(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{KDae:function(e,t,n){"use strict";n.r(t);n("TeQF"),n("sMBO"),n("tkto"),n("pNMO"),n("5DmW"),n("FZtP"),n("27RR");var i={data:function(){return{n:0}},computed:{},methods:{toggle:function(){this.n++,this.n%2==1?this.setWindowFullScreen():this.windowExitFullScreen()},setWindowFullScreen:function(){var e=document.documentElement;e.requestFullscreen?e.requestFullscreen():e.msRequestFullscreen?e.msRequestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullScreen&&e.webkitRequestFullScreen()},windowExitFullScreen:function(){document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen&&document.webkitCancelFullScreen()}}},a=n("KHd+"),o=Object(a.a)(i,(function(){var e=this.$createElement;return(this._self._c||e)("a-icon",{style:{fontSize:"1.6em"},attrs:{type:this.n%2==0?"fullscreen":"fullscreen-exit"},on:{click:this.toggle}})}),[],!1,null,"bf45bec4",null).exports,s=n("L2JU"),r=n("d6hR"),c=n("WQwz");function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=Object(s.a)(r.e),_=Object(s.a)(r.d),p={components:{Fullscreen:o},props:{},data:function(){return{isAdminDefault:!1,collapsed:!1,subMenu:!1,drawerShow:!1,screenWidth:document.body.clientWidth,menus:[],isRefresh:!0,defaultOpenKeys:[],progressBar:{percent:0,interval:-1},topMenus:[]}},provide:function(){return{reload:this.reload}},watch:{isBusy:function(e,t){var n=this;t&&(this.progressBar.percent=0,this.clearProgressInterval()),e&&(this.progressBar.interval=window.setInterval((function(){n.progressBar.percent=Math.min(100,n.progressBar.percent+Math.ceil(10*Math.random())),100===n.progressBar.percent&&window.setTimeout((function(){n.clearProgressInterval(),n.setTopBusy(!1)}),5e3)}),1e3))}},computed:l(l(l({},m.mapGetters(["isLogin","userInfo"])),_.mapGetters(["pref","isBusy"])),{},{defaultSelectedKeys:function(){return this.pref.menu?this.pref.menu.selected:[]}}),methods:l(l(l({},m.mapActions({storeLogout:"logout"})),_.mapActions({selectMenu:"selectMenu",setTopBusy:"gettingBusy",setHeight:"setHeight"})),{},{toggleCollapsed:function(){this.collapsed=!this.collapsed,this.subMenu&&(this.drawerShow=!this.drawerShow)},onClose:function(){this.drawerShow=!1},getMenus:function(){var e=this;this.setTopBusy(!0),this.$get(this.$api.adminMenus).then((function(t){if(200===t.code){if(window.menuType){var n=t.data.filter((function(e){return e.is_type===window.menuType}));n&&n.length>0&&(e.menus=n[0].children)}else e.menus=t.data;e.topMenus=t.data.filter((function(e){return e.is_type>100})),e.pref.menu&&(e.$isEmpty(e.pref.menu.route)||e.$route.path!==e.pref.menu.route&&(e.setTopBusy(!1),e.$router.push(e.pref.menu.route)),e.pref.menu.selected&&e.pref.menu.selected.length>0&&(e.defaultOpenKeys=e.pref.menu.selected))}e.setTopBusy(!1)}),(function(t){return e.setTopBusy(!1)}))},toNav:function(e,t){var n=this;this.$hasRoute(this.$router,{path:e}).then((function(i){n.reload(),n.selectMenu({selected:Object(c.f)(n.menus,t),route:e}),n.$router.push(e)})).catch((function(i){console.log("路由不存在"+e),n.selectMenu({selected:Object(c.f)(n.menus,t),route:e}),window.location.href=e}))},clearProgressInterval:function(){this.progressBar.interval>0&&window.clearInterval(this.progressBar.interval)},onScreenWidth:function(){this.screenWidth<=950&&this.screenWidth>=576?(this.collapsed=!0,this.subMenu=!1,this.drawerShow=!1):this.screenWidth<576?(this.collapsed=!0,this.subMenu=!0):(this.collapsed=!1,this.subMenu=!1,this.drawerShow=!1)},reload:function(){this.isRefresh=!1,this.$nextTick((function(){this.isRefresh=!0}))},logout:function(){var e=this,t=this;this.$get(this.$api.adminLogout).then((function(n){e.$message.success(n.msg),t.storeLogout(),setTimeout((function(){window.location.href="/Admin/login"}),1e3)}))}}),created:function(){this.getMenus(),"goodcatch_m_core_default"===this.$route.name?this.isAdminDefault=!0:this.isAdminDefault=!1},mounted:function(){var e=this,t=this;this.onScreenWidth(),window.onresize=function(){return window.screenWidth=document.body.clientWidth,t.screenWidth=window.screenWidth,t.onScreenWidth(),void e.setHeight(document.body.clientHeight)},this.setHeight(document.body.clientHeight)},beforeRouteUpdate:function(e,t,n){"goodcatch_m_core_default"===e.name?this.isAdminDefault=!0:this.isAdminDefault=!1,n()},beforeDestroy:function(){this.clearProgressInterval()}},h=(n("OQ/H"),Object(a.a)(p,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a-layout",{staticClass:"admin_index_main"},[e.subMenu?e._e():n("a-layout-sider",{staticClass:"admin_menu",attrs:{trigger:null,collapsible:""},model:{value:e.collapsed,callback:function(t){e.collapsed=t},expression:"collapsed"}},[n("div",{staticClass:"base_shadow admin_menu_title"},[n("span",{class:e.collapsed?"hiddens":"shows"},[e._v("核心模块")])]),e._v(" "),n("a-menu",{attrs:{mode:"inline",theme:"dark","default-selected-keys":e.defaultSelectedKeys,"open-keys":e.defaultOpenKeys},on:{"update:openKeys":function(t){e.defaultOpenKeys=t},"update:open-keys":function(t){e.defaultOpenKeys=t}}},[n("a-menu-item",{on:{click:function(t){return e.toNav("/Admin/index",0)}}},[n("a-font",{staticClass:"afont menu_icon",attrs:{type:"icon-gc-home"}}),n("span",[e._v("系统首页")])],1),e._v(" "),e._l(e.menus,(function(t){return t.is_type>=100?n("a-sub-menu",{key:t.id+""},[n("span",{attrs:{slot:"title"},slot:"title"},[n("a-font",{staticClass:"afont menu_icon",attrs:{type:t.icon||"icon-gc-home"}}),n("span",[e._v(e._s(t.name))])],1),e._v(" "),e._l(t.children||[],(function(t){return[e.$isEmpty(t.children)||0===t.children.length?n("a-menu-item",{key:t.id+"",on:{click:function(n){return e.toNav(t.link,t.id)}}},[t.icon?n("a-font",{staticClass:"afont menu_icon",attrs:{type:t.icon}}):e._e(),e._v(e._s(t.name))],1):n("a-sub-menu",{key:t.id+""},[n("span",{attrs:{slot:"title"},slot:"title"},[n("a-font",{attrs:{type:t.icon}}),n("span",[e._v(e._s(t.name))])],1),e._v(" "),e._l(t.children||[],(function(t){return n("a-menu-item",{key:t.id+"",on:{click:function(n){return e.toNav(t.link,t.id)}}},[n("a-font",{attrs:{type:t.icon}}),e._v(e._s(t.name))],1)}))],2)]}))],2):e._e()}))],2)],1),e._v(" "),n("a-layout",{staticClass:"admin_right_content"},[n("a-layout-header",{class:e.subMenu?"admin_right_top mobile":e.collapsed?"admin_right_top small":"admin_right_top"},[e.subMenu?n("div",{staticClass:"admin_menu_title item_left float_left"}):e._e(),e._v(" "),n("a-icon",{staticClass:"base_font_size item_left float_left",attrs:{type:e.collapsed?"menu-unfold":"menu-fold"},on:{click:e.toggleCollapsed}}),e._v(" "),n("div",{staticClass:"top-menu"},[e.topMenus.length>0?n("a-menu",{attrs:{mode:"horizontal"}},e._l(e.topMenus,(function(t){return n("a-menu-item",{key:t.id,on:{click:function(n){return e.toNav(t.link,t.id)}}},[t.icon?n("a-font",{staticClass:"afont menu_icon",attrs:{type:t.icon}}):e._e(),e._v(e._s(t.name))],1)})),1):e._e()],1),e._v(" "),n("div",{staticClass:"item_right float_right"},[n("div",{staticClass:"menu_right_content"},[n("div",{staticClass:"quick_btns"},[n("fullscreen",{staticClass:"quick_btn"})],1),e._v(" "),n("a-dropdown",{staticClass:"dropdown_right",attrs:{overlayClassName:"person_menu"}},[n("div",{staticClass:"admin_top_person",on:{click:function(e){return e.preventDefault()}}},[n("a-icon",{directives:[{name:"show",rawName:"v-show",value:e.isBusy,expression:"isBusy"}],staticClass:"icon-busy",attrs:{type:"loading"}}),e._v(" "),n("a-avatar",{directives:[{name:"show",rawName:"v-show",value:!e.isBusy,expression:"!isBusy"}],staticClass:"avatar",attrs:{size:"small",icon:"user",src:e.userInfo.avatar}}),e._v(" "),n("a-icon",{attrs:{type:"down"}})],1),e._v(" "),n("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[n("a-menu-item",{key:"0",on:{click:function(t){return e.toNav("/Admin/index",0)}}},[n("a-icon",{attrs:{type:"home"}}),e._v(" "),n("span",[e._v("系统首页")])],1),e._v(" "),n("a-menu-item",{key:"1",on:{click:e.logout}},[n("a-icon",{staticStyle:{color:"red"},attrs:{type:"logout"}}),e._v(" "),n("span",{staticStyle:{color:"red"}},[e._v("退出后台")])],1)],1)],1)],1)]),e._v(" "),n("div",{staticClass:"clear"}),e._v(" "),e.isBusy?n("a-progress",{staticClass:"progress-bar",attrs:{"show-info":!1,"stroke-width":5,"stroke-color":{from:"#108ee9",to:"#87d068"},percent:e.progressBar.percent,status:"active"}}):e._e()],1),e._v(" "),n("a-layout-content",[e.isAdminDefault?e._e():n("div",{class:e.subMenu?"admin_content_view clear_m":"admin_content_view"},[n("transition",{attrs:{name:"slide-fade"}},[e.isRefresh?n("router-view"):e._e()],1)],1),e._v(" "),e.isAdminDefault?n("div",{class:e.subMenu?"admin_content_view2 clear_m":"admin_content_view2"},[n("transition",{attrs:{name:"slide-fade"}},[e.isRefresh?n("router-view"):e._e()],1)],1):e._e()])],1),e._v(" "),n("a-drawer",{attrs:{"body-style":{padding:0,height:"100%"},placement:"left",closable:!1,visible:e.drawerShow},on:{close:e.onClose}},[n("div",{staticClass:"admin_menu mobile"},[n("div",{staticClass:"admin_menu_title"},[n("span",{class:"shows"},[e._v("核心模块")])]),e._v(" "),n("a-menu",{attrs:{mode:"inline",theme:"dark"}},[n("a-menu-item",{on:{click:function(t){return e.toNav("/Admin/index")}}},[n("a-font",{staticClass:"afont menu_icon",attrs:{type:"icon-gc-home"}}),n("span",[e._v("系统首页")])],1),e._v(" "),e._l(e.menus,(function(t){return n("a-sub-menu",{key:t.id},[n("span",{attrs:{slot:"title"},slot:"title"},[n("a-font",{staticClass:"afont menu_icon",attrs:{type:t.icon||"icon-gc-home"}}),n("span",[e._v(e._s(t.name))])],1),e._v(" "),e._l(t.children||[],(function(t){return[e.$isEmpty(t.children)||0===t.children.length?n("a-menu-item",{key:t.id,on:{click:function(n){return e.toNav(t.link)}}},[t.icon?n("a-font",{staticClass:"afont menu_icon",attrs:{type:t.icon}}):e._e(),e._v(e._s(t.name))],1):n("a-sub-menu",{key:t.id},[n("span",{attrs:{slot:"title"},slot:"title"},[t.icon?n("a-font",{staticClass:"afont menu_icon",attrs:{type:t.icon}}):e._e(),n("span",[e._v(e._s(t.name))])],1),e._v(" "),e._l(t.children||[],(function(t){return n("a-menu-item",{key:t.id,on:{click:function(n){return e.toNav(t.link)}}},[t.icon?n("a-font",{staticClass:"afont menu_icon",attrs:{type:t.icon}}):e._e(),e._v(e._s(t.name))],1)}))],2)]}))],2)}))],2)],1)])],1)}),[],!1,null,"ccae5de4",null));t.default=h.exports},"OQ/H":function(e,t,n){"use strict";n("kJJs")},kJJs:function(e,t,n){var i=n("lUVT");"string"==typeof i&&(i=[[e.i,i,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(i,a);i.locals&&(e.exports=i.locals)},lUVT:function(e,t,n){(e.exports=n("I1BE")(!1)).push([e.i,'.admin_index_main[data-v-ccae5de4]{height:100%}.admin_right_content[data-v-ccae5de4]{width:100%;position:relative;background:#efefef}.admin_right_content[data-v-ccae5de4]:after{display:block;clear:both;content:""}.admin_right_content .admin_right_top[data-v-ccae5de4]{padding:0;box-sizing:border-box;line-height:50px;height:50px;width:calc(100% - 200px);position:fixed;z-index:99;background:#fff;border-bottom:1px solid #efefef}.admin_right_content .admin_right_top[data-v-ccae5de4]:after{display:block;clear:both;content:""}.admin_right_content .admin_right_top.small[data-v-ccae5de4]{width:calc(100% - 82px)}.admin_right_content .admin_right_top.mobile[data-v-ccae5de4]{width:100%}.admin_right_content .admin_right_top .item_left[data-v-ccae5de4]{line-height:50px;width:50px}.admin_right_content .admin_right_top .item_right[data-v-ccae5de4]{justify-content:flex-end;margin-right:15px}.admin_right_content .admin_right_top .item_right .menu_right_content[data-v-ccae5de4]{width:90px}.admin_right_content .admin_right_top .item_right .menu_right_content .quick_btns[data-v-ccae5de4]{float:left;line-height:56px}.admin_right_content .admin_right_top .item_right .menu_right_content .quick_btns .quick_btn[data-v-ccae5de4]{margin:0 7px}.admin_right_content .admin_right_top .item_right .menu_right_content .dropdown_right[data-v-ccae5de4]{float:right}.admin_right_content .admin_right_top .item_right .admin_top_person[data-v-ccae5de4]{cursor:pointer}.admin_right_content .admin_right_top .item_right .admin_top_person .avatar[data-v-ccae5de4]{margin-top:-4px;margin-right:4px}.admin_right_content .admin_right_top .item_right .admin_top_person .icon-busy[data-v-ccae5de4]{margin-top:-4px;margin-right:4px;font-size:1.5em;color:#13c2c2}.admin_right_content .admin_right_top .top-menu[data-v-ccae5de4]{width:70%;float:left}.admin_right_content .admin_right_top .progress-bar[data-v-ccae5de4]{position:absolute;line-height:0;margin-top:-10px}.admin_right_content .admin_content_view[data-v-ccae5de4]{position:relative;margin:56px 10px 0;padding:15px;background:#fff;border-radius:4px;border:1px solid #e7eaec!important}.admin_right_content .admin_content_view[data-v-ccae5de4]:after{content:"";clear:both;display:block}.admin_right_content .admin_content_view.clear_m[data-v-ccae5de4]{margin:72px 0 22px}.admin_right_content .admin_content_view2[data-v-ccae5de4]{position:relative;margin:45px 0 0;padding:12px 0;height:auto}.admin_right_content .admin_content_view2[data-v-ccae5de4]:after{content:"";clear:both;display:block}.admin_right_content .admin_content_view2.clear_m[data-v-ccae5de4]{margin:72px 0 22px}.admin_menu[data-v-ccae5de4]{max-width:230px;min-height:100%;background:#111}.admin_menu .menu_icon[data-v-ccae5de4]{color:#fff!important}.admin_menu.mobile[data-v-ccae5de4]{width:100%;max-width:100%}.admin_menu .admin_menu_title[data-v-ccae5de4]{line-height:80px;font-size:20px;color:#fff;background:#231f1f;border-bottom:2px solid #3d4f5e;text-align:center}.admin_menu .admin_menu_title img[data-v-ccae5de4]{height:48px;margin-top:-5px}.admin_menu .admin_menu_title span[data-v-ccae5de4]{color:#409eff}.admin_menu .admin_menu_title span.hiddens[data-v-ccae5de4]{display:none}.admin_menu .admin_menu_title span.shows[data-v-ccae5de4]{color:#fff;margin-left:10px}.admin_menu .ant-menu-item.ant-menu-item-selected[data-v-ccae5de4]{background:#409eff}.icon-busy[data-v-ccae5de4]  .anticon-spin{animation:loadingCircle .3s linear infinite;-webkit-animation:loadingCircle .3s linear infinite;-moz-animation:loadingCircle .3s infinite linear}.person_menu div.name[data-v-ccae5de4]{font-size:1.2em;font-weight:700;margin:10px 10px 5px}.person_menu div.account[data-v-ccae5de4]{font-size:1em;padding:0 50px 10px 10px}',""])}}]);