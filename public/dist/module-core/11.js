(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{FAbG:function(e,a,t){"use strict";t("zKZe"),t("FZtP"),t("tkto"),t("fbCW"),t("sMBO"),t("ma9I"),t("+2oP"),t("pNMO"),t("TeQF"),t("5DmW"),t("27RR"),t("4Brf"),t("07d7"),t("0oug"),t("4mDm"),t("PKPk"),t("3bBZ"),t("pjDv");var r=t("wy2R"),n=t.n(r),s=t("L2JU"),o=t("d6hR");function c(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,a){if(!e)return;if("string"==typeof e)return i(e,a);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return i(e,a)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,r=new Array(a);t<a;t++)r[t]=e[t];return r}function l(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,r)}return t}function p(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?l(Object(t),!0).forEach((function(a){m(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function m(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}var d=Object(s.a)(o.c),u={props:{show:{type:Boolean,default:!0},searchConfig:{type:Array,default:[]},autoParams:{type:Object,default:function(){return{}}},export:{type:Object,default:function(){return{show:!1,url:"",per_page:100}}}},data:function(){return{advanced:!1,searchConfig1:[],searchConfig2:[],params:{},cascader:{},select_remote:{},load_cascader:{},exportParams:{page:1,per_page:this.export.per_page>0?this.export.per_page:100},exportTotal:0,exportData:[],exportLoading:!1}},watch:{},computed:{},methods:p(p({},d.mapActions({setTopBusy:"gettingBusy"})),{},{getSearchParams:function(){var e=this,a=Object.assign({},this.params);return Object.keys(a).forEach((function(t){if(a.hasOwnProperty(t)){var r=e.searchConfig.find((function(e){return e.name===t}));if(r)switch(r.type){case"date_picker":2===a[t].length&&(a[t]=e.dateFormat(a[t][0])+" ~ "+e.dateFormat(a[t][1]))}}})),a},search:function(){this.$emit("searchParams",this.getSearchParams())},reset:function(){this.params={},this.resetExport(),this.$emit("searchParams",{})},resetExport:function(){this.exportData=[],this.exportParams={page:1,per_page:this.export.per_page>0?this.export.per_page:100},this.exportTotal=0},dateFormat:function(e){return n()(e).format("YYYY-MM-DD")},timeFormat:function(e){return n()(e).format("YYYY-MM-DD HH:mm:ss")},cascaderChange:function(e,a,t){this.params[e.name]=a[a.length-1],0===a.length&&(this.params[e.name]=void 0)},initSelect:function(e){var a=this,t=this;e.length>0&&e.forEach((function(e){"cascader"===e.type?(t.cascader[e.name]=[],a.$get(e.data,{data_type:"cascader"}).then((function(a){if(200===a.code){var r={};r[e.name]=a.data,t.cascader=Object.assign({},t.cascader,r)}})),t.$set(t.load_cascader,e.name,(function(a){var r=a[a.length-1];r.loading=!0;var n={pid:r.id,data_type:"cascader"};t.$get(e.data,n).then((function(a){r.loading=!1,r.children=a.data,t.$set(t.cascader,e.name,c(t.cascader[e.name]))}))}))):"select-remote"===e.type&&(t.select_remote[e.name]=[],t.$get(e.data,{data_type:"select"}).then((function(a){t.$set(t.select_remote,e.name,a.data);var r={};r[e.name]=a.data,t.select_remote=Object.assign({},t.select_remote,r)})))}))},download:function(){var e=this;if(this.$isEmpty(this.export.url))return this.$message.error("缺少数据来源地址");this.setTopBusy(this.exportLoading=!0);var a=this.exportParams.page*this.exportParams.per_page,t=Object.assign({},this.getSearchParams(),this.exportParams);this.$get(this.export.url,t).then((function(t){if(200===t.code){if(t.data.total>0&&(e.exportTotal=t.data.total),e.exportData=e.exportData.concat(t.data.data),a<e.exportTotal)return e.exportParams.page++,e.download();e.setTopBusy(e.exportLoading=!1),e.$emit("handleExport",e.exportData),e.resetExport()}else e.setTopBusy(e.exportLoading=!1),e.resetExport()}),(function(a){e.$message.error("数据加载失败"),e.setTopBusy(e.exportLoading=!1)}))}}),created:function(){var e=this;this.searchConfig.length<=0?this.show=!1:this.searchConfig.length<=2?this.searchConfig1=this.searchConfig:this.searchConfig.length>2&&(this.searchConfig1=this.searchConfig.slice(0,2),this.searchConfig2=this.searchConfig.slice(2));var a=Object.keys(this.autoParams);a.length>0&&a.forEach((function(a){e.params[a]=e.autoParams[a]})),this.initSelect(this.searchConfig)},mounted:function(){}},h=t("KHd+"),f=Object(h.a)(u,(function(){var e=this,a=e.$createElement,t=e._self._c||a;return e.show?t("div",{staticClass:"admin_table_page_where"},[t("a-form",{attrs:{layout:"inline"}},[t("a-row",{attrs:{gutter:12}},[e._l(e.searchConfig1,(function(a,r){return t("a-col",{key:r,attrs:{md:8,sm:24}},[t("a-form-item",{attrs:{label:a.label}},["text"===a.type?t("a-input",{attrs:{placeholder:a.placeholder||""},model:{value:e.params[a.name],callback:function(t){e.$set(e.params,a.name,t)},expression:"params[v.name]"}}):e._e(),e._v(" "),"select"===a.type?t("a-select",{attrs:{placeholder:a.placeholder||""},model:{value:e.params[a.name],callback:function(t){e.$set(e.params,a.name,t)},expression:"params[v.name]"}},e._l(a.data,(function(a,r){return t("a-select-option",{key:r,attrs:{value:a.value}},[e._v(e._s(a.label))])})),1):e._e(),e._v(" "),"select-remote"===a.type?t("a-select",{attrs:{placeholder:a.placeholder||""},model:{value:e.params[a.name],callback:function(t){e.$set(e.params,a.name,t)},expression:"params[v.name]"}},e._l(e.select_remote[a.name],(function(r,n){return e.select_remote[a.name].length>0?t("a-select-option",{key:n,attrs:{value:r.value}},[e._v(e._s(r.label))]):e._e()})),1):e._e(),e._v(" "),"cascader"===a.type?t("a-cascader",{staticStyle:{width:"100%"},attrs:{"load-data":e.load_cascader[a.name],options:e.cascader[a.name],fieldNames:{label:"name",value:"id",children:"children"},placeholder:"请选择"+a.label,"change-on-select":""},on:{change:function(t){return e.cascaderChange(a,t)}}}):e._e(),e._v(" "),"time_picker"===a.type?t("a-time-picker",{model:{value:e.params[a.name],callback:function(t){e.$set(e.params,a.name,t)},expression:"params[v.name]"}}):e._e(),e._v(" "),"date_picker"===a.type?t("a-range-picker",{staticStyle:{width:"100%"},attrs:{format:"YYYY-MM-DD","allow-clear":!1},model:{value:e.params[a.name],callback:function(t){e.$set(e.params,a.name,t)},expression:"params[v.name]"}}):e._e(),e._v(" "),"datetime_picker"===a.type?t("a-range-picker",{staticStyle:{width:"100%"},attrs:{format:"YYYY-MM-DD HH:mm:ss","show-time":"","allow-clear":!1},model:{value:e.params[a.name],callback:function(t){e.$set(e.params,a.name,t)},expression:"params[v.name]"}}):e._e()],1)],1)})),e._v(" "),e.advanced&&e.searchConfig2.length>0?e._l(e.searchConfig2,(function(a,r){return t("a-col",{key:e.searchConfig1.length+r,attrs:{md:8,sm:24}},[t("a-form-item",{attrs:{label:a.label}},["text"===a.type?t("a-input",{attrs:{placeholder:a.placeholder||""},model:{value:e.params[a.name],callback:function(t){e.$set(e.params,a.name,t)},expression:"params[v.name]"}}):e._e(),e._v(" "),"select"===a.type?t("a-select",{attrs:{placeholder:a.placeholder||""},model:{value:e.params[a.name],callback:function(t){e.$set(e.params,a.name,t)},expression:"params[v.name]"}},e._l(a.data,(function(a,r){return t("a-select-option",{key:r,attrs:{value:a.value}},[e._v(e._s(a.label))])})),1):e._e(),e._v(" "),"select-remote"===a.type?t("a-select",{attrs:{placeholder:a.placeholder||""},model:{value:e.params[a.name],callback:function(t){e.$set(e.params,a.name,t)},expression:"params[v.name]"}},e._l(e.select_remote[a.name],(function(r,n){return e.select_remote[a.name].length>0?t("a-select-option",{key:n,attrs:{value:r.value}},[e._v(e._s(r.label))]):e._e()})),1):e._e(),e._v(" "),"cascader"===a.type?t("a-cascader",{attrs:{"load-data":e.load_cascader[a.name],options:e.cascader[a.name],fieldNames:{label:"name",value:"id",children:"children"},placeholder:"请选择"+a.label,"change-on-select":""},on:{change:function(t){return e.cascaderChange(a,t)}}}):e._e(),e._v(" "),"time_picker"===a.type?t("a-time-picker",{model:{value:e.params[a.name],callback:function(t){e.$set(e.params,a.name,t)},expression:"params[v.name]"}}):e._e(),e._v(" "),"date_picker"===a.type?t("a-range-picker",{staticStyle:{width:"100%"},attrs:{format:"YYYY-MM-DD","allow-clear":!1},model:{value:e.params[a.name],callback:function(t){e.$set(e.params,a.name,t)},expression:"params[v.name]"}}):e._e(),e._v(" "),"datetime_picker"===a.type?t("a-range-picker",{staticStyle:{width:"100%"},attrs:{format:"YYYY-MM-DD HH:mm:ss","show-time":"","allow-clear":!1},model:{value:e.params[a.name],callback:function(t){e.$set(e.params,a.name,t)},expression:"params[v.name]"}}):e._e()],1)],1)})):e._e(),e._v(" "),t("a-col",{staticStyle:{"padding-top":"3px"},attrs:{md:e.advanced?12:8,sm:12}},[t("span",{staticClass:"table-page-search-submitButtons",style:e.advanced&&{float:"right",overflow:"hidden"}||{}},[t("a-button",{attrs:{icon:"search"},on:{click:e.search}},[e._v("查询")]),e._v(" "),t("a-button",{attrs:{loading:e.exportLoading,icon:"download"},on:{click:e.download}},[e._v("导出")]),e._v(" "),t("a-button",{on:{click:e.reset}},[e._v("重置")]),e._v(" "),e.searchConfig2.length>0?t("a",{staticStyle:{"margin-left":"8px"},on:{click:function(a){e.advanced=!e.advanced}}},[e._v("\n                    "+e._s(e.advanced?"收起":"展开")+"\n                    "),t("a-icon",{attrs:{type:e.advanced?"up":"down"}})],1):e._e()],1)])],2)],1)],1):e._e()}),[],!1,null,"4d24eb6a",null);a.a=f.exports},f3lh:function(e,a,t){"use strict";t.r(a);t("oVuX"),t("zKZe");var r={components:{Search:t("FAbG").a},props:{},data:function(){return{params:{page:1,per_page:30},total:0,list_loading:!1,searchParams:{},selectedRowKeys:[],columns:[{title:"#",dataIndex:"id",fixed:"left"},{title:"名称",dataIndex:"name"},{title:"创建时间",dataIndex:"created_at"},{title:"更新时间",dataIndex:"updated_at"},{title:"操作",fixed:"right",scopedSlots:{customRender:"action"}}],list:[]}},watch:{},computed:{},methods:{onSearchParams:function(e){this.searchParams=e,this.getList()},onSelectChange:function(e){this.selectedRowKeys=e},onChange:function(e){this.params.page=e},del:function(){var e=this;if(0===this.selectedRowKeys.length)return this.$message.error("未选择数据.");this.$confirm({title:"你确定要删除选择的数据？",content:"确定删除后无法恢复.",okText:"是",okType:"danger",cancelText:"取消",onOk:function(){var a=e.selectedRowKeys.join(",");e.$delete(e.$api.moduleCoreAttachments+"/"+a).then((function(a){200===a.code?(e.onload(),e.$message.success("删除成功")):e.$message.error(a.msg)}))}})},getList:function(){var e=this;this.list_loading=!0;var a=Object.assign({},this.searchParams,this.params);this.$get(this.$api.moduleCoreAttachments,a).then((function(a){200===a.code&&(e.total=a.data.total,e.list=a.data.data),e.list_loading=!1}),(function(a){e.$message.error("数据加载失败"),e.list_loading=!1}))},onload:function(){this.getList()}},created:function(){this.onload()},mounted:function(){}},n=t("KHd+"),s=Object(n.a)(r,(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",{staticClass:"admin_table_page_title"},[e._v("附件列表")]),e._v(" "),t("div",{staticClass:"unline underm"}),e._v(" "),t("div",{staticClass:"admin_table_list"},[t("a-table",{attrs:{columns:e.columns,"data-source":e.list,loading:e.list_loading,pagination:!1,"row-selection":{selectedRowKeys:e.selectedRowKeys,onChange:e.onSelectChange},"row-key":"id"},scopedSlots:e._u([{key:"title",fn:function(a){return[t("search",{attrs:{"search-config":e.search},on:{searchParams:e.onSearchParams}}),e._v(" "),t("div",{staticClass:"admin_table_handle_btn"},[t("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:function(a){return e.$router.push("/Admin/goodcatch/m/core/attachments/form")}}},[e._v("添加")]),e._v(" "),t("a-button",{staticClass:"admin_delete_btn",attrs:{type:"danger",icon:"delete"},on:{click:e.del}},[e._v("批量删除")])],1)]}},{key:"action",fn:function(a){return t("span",{},[t("a-button",{attrs:{icon:"edit"},on:{click:function(t){return e.$router.push("/Admin/goodcatch/m/core/attachments/form/"+a.id)}}},[e._v("编辑")])],1)}}])}),e._v(" "),e.total>0?t("div",{staticClass:"admin_pagination"},[t("a-pagination",{attrs:{"page-size":e.params.per_page,total:e.total,"show-less-items":""},on:{"update:pageSize":function(a){return e.$set(e.params,"per_page",a)},"update:page-size":function(a){return e.$set(e.params,"per_page",a)},change:e.onChange},model:{value:e.params.page,callback:function(a){e.$set(e.params,"page",a)},expression:"params.page"}})],1):e._e()],1)])}),[],!1,null,"4db7deeb",null);a.default=s.exports},fbCW:function(e,a,t){"use strict";var r=t("I+eb"),n=t("tycR").find,s=t("RNIs"),o=!0;"find"in[]&&Array(1).find((function(){o=!1})),r({target:"Array",proto:!0,forced:o},{find:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),s("find")}}]);