(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"2B1R":function(t,e,a){"use strict";var n=a("I+eb"),i=a("tycR").map;n({target:"Array",proto:!0,forced:!a("Hd5f")("map")},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},JPkc:function(t,e,a){"use strict";a.r(e);a("zKZe");var n=a("FAbG"),i={mixins:[a("K49p").a],components:{Search:n.a},props:{},data:function(){return{table:{actions:{list:this.$api.moduleCoreSchedules,remove:this.$api.moduleCoreSchedules},columns:[{title:"#",scopedSlots:{customRender:"id"},fixed:"left",width:80},{title:"名称",scopedSlots:{customRender:"name"},width:180},{title:"描述",dataIndex:"description",width:150},{title:"状态",scopedSlots:{customRender:"status"},width:90},{title:"指令",dataIndex:"input",width:280},{title:"执行周期",dataIndex:"cron",width:120},{title:"任务类型",scopedSlots:{customRender:"schedule_type"},width:120},{title:"分组",dataIndex:"group",width:120},{title:"排序",dataIndex:"order",width:100},{title:"单次任务",scopedSlots:{customRender:"once"},width:180},{title:"重复",scopedSlots:{customRender:"overlapping"},width:120},{title:"集群",dataIndex:"one_server",width:180},{title:"后台执行",dataIndex:"background",width:120},{title:"维护模式",dataIndex:"maintenance",width:120},{title:"创建时间",dataIndex:"created_at",width:200},{title:"更新时间",dataIndex:"updated_at",width:200},{title:"操作",fixed:"right",scopedSlots:{customRender:"action"}}]},search:{fields:[{label:"名称",name:"name",type:"text"},{label:"描述",name:"description",type:"text"},{label:"分组",name:"group",type:"text"}]},dictionary:{status:{enabled:"启用",disabled:"禁用"},schedule_type:["--","Command","Exec","Job"],once:["可循环","单次"],overlapping:["可重复","不可重复"],one_server:["多服务器","单服务器"],background:["前台执行","后台执行"],maintenance:["不执行","执行"]},loading_status:{},loading_start:{},logs:{show:!1,total:0,list:[],params:{page:1,per_page:30},columns:[{title:"状态",dataIndex:"status_text"},{title:"内容",dataIndex:"content"},{title:"时间",dataIndex:"created_at_text"}]}}},watch:{},computed:{},methods:{onStatusChange:function(t){var e=this,a=[1,0][t.status];this.loading_status["_"+t.id]=!0,this.$put(this.$api.moduleCoreSchedules+"/"+t.id,Object.assign({},t,{status:a,logs:"",payload:t.payload?JSON.stringify(t.payload):""})).then((function(n){if(e.loading_status["_"+t.id]=!1,200!==n.code)return e.$message.error(n.msg);t.status=a,e.$message.success(n.msg)})).catch((function(){return e.loading_status["_"+t.id]=!1}))},handleNameClick:function(t){var e=this;this.loading_start["_"+t.id]=!0,this.$put(this.$api.moduleCoreSchedules+"/"+t.id,Object.assign({},t,{start:1,logs:"",payload:t.payload?JSON.stringify(t.payload):""})).then((function(a){if(e.loading_start["_"+t.id]=!1,200!=a.code)return e.$message.error(a.msg);e.$message.success(a.msg)})).catch((function(){return e.loading_start["_"+t.id]=!1}))},handleIdClick:function(t){var e=this;this.logs.show=!0,this.$get(this.$api.moduleCoreSchedules+"/"+t.id+"/logs",this.logs.params).then((function(t){e.logs.total=t.data.total,e.logs.list=t.data.data}))},onChangeLogs:function(t){this.logs.params.page=t},onload:function(){this.loadTableData()}},created:function(){this.onload()},mounted:function(){}},s=a("KHd+"),o=Object(s.a)(i,(function(){var t=this,e=this,a=e.$createElement,n=e._self._c||a;return n("div",[n("div",{staticClass:"admin_table_page_title"},[e._v("计划与任务列表")]),e._v(" "),n("div",{staticClass:"unline underm"}),e._v(" "),n("div",{staticClass:"admin_table_list"},[n("a-table",{attrs:{size:"small",columns:e.table.columns,"data-source":e.table.data,scroll:{y:e.sysWindowHeight-400},loading:e.table.loading,pagination:!1,"row-selection":{selectedRowKeys:e.table.selectedRowKeys,onChange:e.handleTableRowKeysChange},"row-key":"id"},scopedSlots:e._u([{key:"title",fn:function(t){return[n("search",{attrs:{"search-config":e.search.fields,"auto-params":e.search.params,"export-config":e.exporting},on:{searchParams:e.handleTableSearchParams,handleExport:e.handleTableExport}}),e._v(" "),n("div",{staticClass:"admin_table_handle_btn"},[n("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:function(t){return e.$router.push("/Admin/goodcatch/m/core/schedules/form")}}},[e._v("添加")]),e._v(" "),n("a-button",{staticClass:"admin_delete_btn",attrs:{type:"danger",icon:"delete"},on:{click:e.handleRemoveTableRows}},[e._v("批量删除")])],1)]}},{key:"id",fn:function(t){return n("div",{on:{click:function(a){return e.handleIdClick(t)}}},[e._v(e._s(t.id))])}},{key:"name",fn:function(t){return n("div",{},[n("a-icon",{staticStyle:{"font-size":"24px"},attrs:{type:"play-circle",theme:"twoTone","two-tone-color":"#eb2f96",spin:e.loading_start["_"+t.id]},on:{click:function(a){return e.handleNameClick(t)}}}),e._v("\n                "+e._s(t.name)+"\n            ")],1)}},{key:"schedule_type",fn:function(t){return n("div",{},[e._v("\n                "+e._s(e.dictionary.schedule_type[t.schedule_type%e.dictionary.schedule_type.length])+"\n            ")])}},{key:"once",fn:function(t){return n("div",{},[e._v("\n                "+e._s(e.dictionary.once[t.once%e.dictionary.once.length])+"\n            ")])}},{key:"overlapping",fn:function(t){return n("div",{},[e._v("\n                "+e._s(e.dictionary.overlapping[t.overlapping%e.dictionary.overlapping.length])+"\n            ")])}},{key:"one_server",fn:function(t){return n("div",{},[e._v("\n                "+e._s(e.dictionary.one_server[t.one_server%e.dictionary.one_server.length])+"\n            ")])}},{key:"background",fn:function(t){return n("div",{},[e._v("\n                "+e._s(e.dictionary.background[t.background%e.dictionary.background.length])+"\n            ")])}},{key:"maintenance",fn:function(t){return n("div",{},[e._v("\n                "+e._s(e.dictionary.maintenance[t.maintenance%e.dictionary.maintenance.length])+"\n            ")])}},{key:"status",fn:function(t){return n("a-switch",{attrs:{loading:e.loading_status["_"+t.id],"checked-children":e.dictionary.status.enabled,"un-checked-children":e.dictionary.status.disabled,"default-checked":1===t.status},on:{change:function(a){return e.onStatusChange(t)}}})}},{key:"action",fn:function(t){return n("span",{},[n("a-button",{attrs:{icon:"edit"},on:{click:function(a){return e.$router.push("/Admin/goodcatch/m/core/schedules/form/"+t.id)}}},[e._v("编辑")])],1)}}])}),e._v(" "),e.table.total>0?n("div",{staticClass:"admin_pagination"},[n("a-pagination",{attrs:{"page-size":e.table.params.per_page,total:e.table.total,"show-less-items":""},on:{"update:pageSize":function(t){return e.$set(e.table.params,"per_page",t)},"update:page-size":function(t){return e.$set(e.table.params,"per_page",t)},change:e.handleTablePageChange},model:{value:e.table.params.page,callback:function(t){e.$set(e.table.params,"page",t)},expression:"table.params.page"}})],1):e._e()],1),e._v(" "),n("a-modal",{attrs:{title:"任务详情"},model:{value:e.logs.show,callback:function(t){e.$set(e.logs,"show",t)},expression:"logs.show"}},[n("template",{slot:"footer"},[n("a-button",{key:"submit",attrs:{type:"primary"},on:{click:function(){return t.logs.show=!1}}},[e._v("\n                知道了\n            ")])],1),e._v(" "),n("a-table",{attrs:{columns:e.logs.columns,"data-source":e.logs.list,pagination:!1,"row-key":"id"}}),e._v(" "),e.logs.total>0?n("div",{staticClass:"admin_pagination"},[n("a-pagination",{attrs:{"page-size":e.logs.params.per_page,total:e.logs.total,"show-less-items":""},on:{"update:pageSize":function(t){return e.$set(e.logs.params,"per_page",t)},"update:page-size":function(t){return e.$set(e.logs.params,"per_page",t)},change:e.onChangeLogs},model:{value:e.logs.params.page,callback:function(t){e.$set(e.logs.params,"page",t)},expression:"logs.params.page"}})],1):e._e()],2)],1)}),[],!1,null,"701f5776",null);e.default=o.exports},fbCW:function(t,e,a){"use strict";var n=a("I+eb"),i=a("tycR").find,s=a("RNIs"),o=!0;"find"in[]&&Array(1).find((function(){o=!1})),n({target:"Array",proto:!0,forced:o},{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),s("find")}}]);