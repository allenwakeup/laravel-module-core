(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{FAbG:function(e,t,a){"use strict";a("zKZe"),a("FZtP"),a("tkto"),a("fbCW"),a("sMBO"),a("+2oP"),a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("pjDv");var n=a("wy2R"),s=a.n(n);function r(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return i(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var c={props:{show:{type:Boolean,default:!0},searchConfig:{type:Array,default:[]},autoParams:{type:Object,default:function(){return{}}}},data:function(){return{advanced:!1,searchConfig1:[],searchConfig2:[],params:{},cascader:{},select_remote:{},load_cascader:{}}},watch:{},computed:{},methods:{search:function(){var e=this,t=Object.assign({},this.params);Object.keys(t).forEach((function(a){if(t.hasOwnProperty(a)){var n=e.searchConfig.find((function(e){return e.name===a}));if(n)switch(n.type){case"date_picker":2===t[a].length&&(t[a]=e.dateFormat(t[a][0])+" ~ "+e.dateFormat(t[a][1]))}}})),this.$emit("searchParams",t)},reset:function(){this.params={},this.$emit("searchParams",{})},dateFormat:function(e){return s()(e).format("YYYY-MM-DD")},timeFormat:function(e){return s()(e).format("YYYY-MM-DD HH:mm:ss")},cascaderChange:function(e,t,a){this.params[e.name]=t[t.length-1],0===t.length&&(this.params[e.name]=void 0)},initSelect:function(e){var t=this,a=this;e.length>0&&e.forEach((function(e){"cascader"===e.type?(a.cascader[e.name]=[],t.$get(e.data,{data_type:"cascader"}).then((function(t){if(200===t.code){var n={};n[e.name]=t.data,a.cascader=Object.assign({},a.cascader,n)}})),a.$set(a.load_cascader,e.name,(function(t){var n=t[t.length-1];n.loading=!0;var s={pid:n.id,data_type:"cascader"};a.$get(e.data,s).then((function(t){n.loading=!1,n.children=t.data,a.$set(a.cascader,e.name,r(a.cascader[e.name]))}))}))):"select-remote"===e.type&&(a.select_remote[e.name]=[],a.$get(e.data,{data_type:"select"}).then((function(t){a.$set(a.select_remote,e.name,t.data);var n={};n[e.name]=t.data,a.select_remote=Object.assign({},a.select_remote,n)})))}))}},created:function(){var e=this;this.searchConfig.length<=0?this.show=!1:this.searchConfig.length<=2?this.searchConfig1=this.searchConfig:this.searchConfig.length>2&&(this.searchConfig1=this.searchConfig.slice(0,2),this.searchConfig2=this.searchConfig.slice(2));var t=Object.keys(this.autoParams);t.length>0&&t.forEach((function(t){e.params[t]=e.autoParams[t]})),this.initSelect(this.searchConfig)},mounted:function(){}},o=a("KHd+"),l=Object(o.a)(c,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.show?a("div",{staticClass:"admin_table_page_where"},[a("a-form",{attrs:{layout:"inline"}},[a("a-row",{attrs:{gutter:12}},[e._l(e.searchConfig1,(function(t,n){return a("a-col",{key:n,attrs:{md:8,sm:24}},[a("a-form-item",{attrs:{label:t.label}},["text"===t.type?a("a-input",{attrs:{placeholder:t.placeholder||""},model:{value:e.params[t.name],callback:function(a){e.$set(e.params,t.name,a)},expression:"params[v.name]"}}):e._e(),e._v(" "),"select"===t.type?a("a-select",{attrs:{placeholder:t.placeholder||""},model:{value:e.params[t.name],callback:function(a){e.$set(e.params,t.name,a)},expression:"params[v.name]"}},e._l(t.data,(function(t,n){return a("a-select-option",{key:n,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1):e._e(),e._v(" "),"select-remote"===t.type?a("a-select",{attrs:{placeholder:t.placeholder||""},model:{value:e.params[t.name],callback:function(a){e.$set(e.params,t.name,a)},expression:"params[v.name]"}},e._l(e.select_remote[t.name],(function(n,s){return e.select_remote[t.name].length>0?a("a-select-option",{key:s,attrs:{value:n.value}},[e._v(e._s(n.label))]):e._e()})),1):e._e(),e._v(" "),"cascader"===t.type?a("a-cascader",{staticStyle:{width:"100%"},attrs:{"load-data":e.load_cascader[t.name],options:e.cascader[t.name],fieldNames:{label:"name",value:"id",children:"children"},placeholder:"请选择"+t.label,"change-on-select":""},on:{change:function(a){return e.cascaderChange(t,a)}}}):e._e(),e._v(" "),"time_picker"===t.type?a("a-time-picker",{model:{value:e.params[t.name],callback:function(a){e.$set(e.params,t.name,a)},expression:"params[v.name]"}}):e._e(),e._v(" "),"date_picker"===t.type?a("a-range-picker",{staticStyle:{width:"100%"},attrs:{format:"YYYY-MM-DD","allow-clear":!1},model:{value:e.params[t.name],callback:function(a){e.$set(e.params,t.name,a)},expression:"params[v.name]"}}):e._e(),e._v(" "),"datetime_picker"===t.type?a("a-range-picker",{staticStyle:{width:"100%"},attrs:{format:"YYYY-MM-DD HH:mm:ss","show-time":"","allow-clear":!1},model:{value:e.params[t.name],callback:function(a){e.$set(e.params,t.name,a)},expression:"params[v.name]"}}):e._e()],1)],1)})),e._v(" "),e.advanced&&e.searchConfig2.length>0?e._l(e.searchConfig2,(function(t,n){return a("a-col",{key:e.searchConfig1.length+n,attrs:{md:8,sm:24}},[a("a-form-item",{attrs:{label:t.label}},["text"===t.type?a("a-input",{attrs:{placeholder:t.placeholder||""},model:{value:e.params[t.name],callback:function(a){e.$set(e.params,t.name,a)},expression:"params[v.name]"}}):e._e(),e._v(" "),"select"===t.type?a("a-select",{attrs:{placeholder:t.placeholder||""},model:{value:e.params[t.name],callback:function(a){e.$set(e.params,t.name,a)},expression:"params[v.name]"}},e._l(t.data,(function(t,n){return a("a-select-option",{key:n,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1):e._e(),e._v(" "),"select-remote"===t.type?a("a-select",{attrs:{placeholder:t.placeholder||""},model:{value:e.params[t.name],callback:function(a){e.$set(e.params,t.name,a)},expression:"params[v.name]"}},e._l(e.select_remote[t.name],(function(n,s){return e.select_remote[t.name].length>0?a("a-select-option",{key:s,attrs:{value:n.value}},[e._v(e._s(n.label))]):e._e()})),1):e._e(),e._v(" "),"cascader"===t.type?a("a-cascader",{attrs:{"load-data":e.load_cascader[t.name],options:e.cascader[t.name],fieldNames:{label:"name",value:"id",children:"children"},placeholder:"请选择"+t.label,"change-on-select":""},on:{change:function(a){return e.cascaderChange(t,a)}}}):e._e(),e._v(" "),"time_picker"===t.type?a("a-time-picker",{model:{value:e.params[t.name],callback:function(a){e.$set(e.params,t.name,a)},expression:"params[v.name]"}}):e._e(),e._v(" "),"date_picker"===t.type?a("a-range-picker",{staticStyle:{width:"100%"},attrs:{format:"YYYY-MM-DD","allow-clear":!1},model:{value:e.params[t.name],callback:function(a){e.$set(e.params,t.name,a)},expression:"params[v.name]"}}):e._e(),e._v(" "),"datetime_picker"===t.type?a("a-range-picker",{staticStyle:{width:"100%"},attrs:{format:"YYYY-MM-DD HH:mm:ss","show-time":"","allow-clear":!1},model:{value:e.params[t.name],callback:function(a){e.$set(e.params,t.name,a)},expression:"params[v.name]"}}):e._e()],1)],1)})):e._e(),e._v(" "),a("a-col",{staticStyle:{"padding-top":"3px"},attrs:{md:e.advanced?12:8,sm:12}},[a("span",{staticClass:"table-page-search-submitButtons",style:e.advanced&&{float:"right",overflow:"hidden"}||{}},[a("a-button",{attrs:{icon:"search"},on:{click:e.search}},[e._v("查询")]),e._v(" "),a("a-button",{staticStyle:{"margin-left":"8px"},on:{click:e.reset}},[e._v("重置")]),e._v(" "),e.searchConfig2.length>0?a("a",{staticStyle:{"margin-left":"8px"},on:{click:function(t){e.advanced=!e.advanced}}},[e._v("\n                    "+e._s(e.advanced?"收起":"展开")+"\n                    "),a("a-icon",{attrs:{type:e.advanced?"up":"down"}})],1):e._e()],1)])],2)],1)],1):e._e()}),[],!1,null,"2b5e550c",null);t.a=l.exports},fbCW:function(e,t,a){"use strict";var n=a("I+eb"),s=a("tycR").find,r=a("RNIs"),i=!0;"find"in[]&&Array(1).find((function(){i=!1})),n({target:"Array",proto:!0,forced:i},{find:function(e){return s(this,e,arguments.length>1?arguments[1]:void 0)}}),r("find")},oCn7:function(e,t,a){"use strict";a.r(t);a("oVuX"),a("zKZe");var n={components:{Search:a("FAbG").a},props:{},data:function(){return{params:{page:1,per_page:30},total:0,list_loading:!1,searchParams:{},selectedRowKeys:[],columns:[{title:"#",dataIndex:"id",fixed:"left",width:80},{title:"直接上级",scopedSlots:{customRender:"pid"},width:120},{title:"所属部门",scopedSlots:{customRender:"departments"},width:220},{title:"员工编码",dataIndex:"code",width:120},{title:"姓名",dataIndex:"name",width:120},{title:"性别",scopedSlots:{customRender:"gender"},width:90},{title:"岗位",dataIndex:"title",width:150},{title:"级别",dataIndex:"rank",width:120},{title:"入职日期",dataIndex:"hireday",width:120},{title:"出生日期",dataIndex:"birthday",width:120},{title:"工作日期",dataIndex:"workday",width:120},{title:"电话",dataIndex:"phone",width:150},{title:"邮箱",dataIndex:"email",width:180},{title:"排序",dataIndex:"order",width:90},{title:"类型",scopedSlots:{customRender:"type"},width:120},{title:"类别",dataIndex:"category",width:120},{title:"状态",scopedSlots:{customRender:"status"},width:120},{title:"创建时间",dataIndex:"created_at",width:120},{title:"更新时间",dataIndex:"updated_at",width:120},{title:"操作",fixed:"right",scopedSlots:{customRender:"action"}}],list:[],dictionary:{status:{enabled:"启用",disabled:"禁用"},gender:["默认","男","女","其他"]},loading_status:{}}},watch:{},computed:{},methods:{onSearchParams:function(e){this.searchParams=e,this.getList()},onSelectChange:function(e){this.selectedRowKeys=e},onChange:function(e){this.params.page=e},del:function(){var e=this;if(0===this.selectedRowKeys.length)return this.$message.error("未选择数据.");this.$confirm({title:"你确定要删除选择的数据？",content:"确定删除后无法恢复.",okText:"是",okType:"danger",cancelText:"取消",onOk:function(){var t=e.selectedRowKeys.join(",");e.$delete(e.$api.moduleCoreStaff+"/"+t).then((function(t){200===t.code?(e.onload(),e.$message.success("删除成功")):e.$message.error(t.msg)}))}})},onStatusChange:function(e){var t=this,a=[1,0][e.status];this.loading_status["_"+e.id]=!0,this.$put(this.$api.moduleCoreStaff+"/"+e.id,Object.assign({},e,{status:a})).then((function(n){if(t.loading_status["_"+e.id]=!1,200!==n.code)return t.$message.error(n.msg);e.status=a,t.$message.success(n.msg)})).catch((function(){return t.loading_status["_"+e.id]=!1}))},getList:function(){var e=this;this.list_loading=!0;var t=Object.assign({},this.searchParams,this.params);this.$get(this.$api.moduleCoreStaff,t).then((function(t){200===t.code&&(e.total=t.data.total,e.list=t.data.data),e.list_loading=!1}),(function(t){e.$message.error("数据加载失败"),e.list_loading=!1}))},onload:function(){this.getList()}},created:function(){this.onload()},mounted:function(){}},s=a("KHd+"),r=Object(s.a)(n,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"admin_table_page_title"},[e._v("地区列表")]),e._v(" "),a("div",{staticClass:"unline underm"}),e._v(" "),a("div",{staticClass:"admin_table_list"},[a("a-table",{attrs:{columns:e.columns,"data-source":e.list,pagination:!1,scroll:{x:2048},"row-selection":{selectedRowKeys:e.selectedRowKeys,onChange:e.onSelectChange},"row-key":"id"},scopedSlots:e._u([{key:"title",fn:function(t){return[a("search",{attrs:{"search-config":e.search},on:{searchParams:e.onSearchParams}}),e._v(" "),a("div",{staticClass:"admin_table_handle_btn"},[a("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:function(t){return e.$router.push("/Admin/goodcatch/m/core/staff/form")}}},[e._v("添加")]),e._v(" "),a("a-button",{staticClass:"admin_delete_btn",attrs:{type:"danger",icon:"delete"},on:{click:e.del}},[e._v("批量删除")])],1)]}},{key:"pid",fn:function(t){return a("span",{},[e._v("\n                "+e._s(t.parent?t.parent.name:"--")+"\n            ")])}},{key:"type",fn:function(t){return a("span",{},[e._v("\n                "+e._s(0===t.type?"默认":"其他")+"\n            ")])}},{key:"gender",fn:function(t){return a("span",{},[e._v("\n                "+e._s(e.dictionary.gender[t.gender])+"\n            ")])}},{key:"departments",fn:function(t){return a("span",{},[e._v("\n                "+e._s(t.departments.length>0?t.departments.join(" / "):"--")+"\n            ")])}},{key:"status",fn:function(t){return a("a-switch",{attrs:{loading:e.loading_status["_"+t.id],"checked-children":e.dictionary.status.enabled,"un-checked-children":e.dictionary.status.disabled,"default-checked":1===t.status},on:{change:function(a){return e.onStatusChange(t)}}})}},{key:"action",fn:function(t){return a("span",{},[a("a-button",{attrs:{icon:"edit"},on:{click:function(a){return e.$router.push("/Admin/goodcatch/m/core/staff/form/"+t.id)}}},[e._v("编辑")])],1)}}])}),e._v(" "),e.total>0?a("div",{staticClass:"admin_pagination"},[a("a-pagination",{attrs:{"page-size":e.params.per_page,total:e.total,"show-less-items":""},on:{"update:pageSize":function(t){return e.$set(e.params,"per_page",t)},"update:page-size":function(t){return e.$set(e.params,"per_page",t)},change:e.onChange},model:{value:e.params.page,callback:function(t){e.$set(e.params,"page",t)},expression:"params.page"}})],1):e._e()],1)])}),[],!1,null,"279b4c4a",null);t.default=r.exports}}]);