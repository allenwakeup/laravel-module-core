(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"2B1R":function(t,e,a){"use strict";var n=a("I+eb"),o=a("tycR").map;n({target:"Array",proto:!0,forced:!a("Hd5f")("map")},{map:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},BSqK:function(t,e,a){"use strict";a.r(e);var n=a("FAbG"),o={mixins:[a("K49p").a],components:{Search:n.a},props:{},data:function(){return{table:{actions:{list:this.$api.moduleCoreDataRoutes,remove:this.$api.moduleCoreDataRoutes},columns:[{title:"#",dataIndex:"id",fixed:"left",width:80},{title:"名称",dataIndex:"name",width:200},{title:"简称",dataIndex:"short",width:180},{title:"别名",dataIndex:"alias",width:180},{title:"首表名称",dataIndex:"from",width:120},{title:"首表表名",dataIndex:"table_from",width:120},{title:"尾表名称",dataIndex:"to",width:120},{title:"尾表表名",dataIndex:"table_to",width:120},{title:"目标表",dataIndex:"output",width:150},{title:"连接",scopedSlots:{customRender:"connection_id"},width:220},{title:"描述",dataIndex:"description",width:280},{title:"创建时间",dataIndex:"created_at",width:200},{title:"更新时间",dataIndex:"updated_at",width:200},{title:"操作",fixed:"right",scopedSlots:{customRender:"action"}}]},search:{fields:[{label:"名称",name:"name",type:"text"},{label:"简称",name:"short",type:"text"},{label:"首表名称",name:"from",type:"text"},{label:"首表表名",name:"table_from",type:"text"},{label:"尾表名称",name:"to",type:"text"},{label:"尾表表名",name:"table_to",type:"text"},{label:"描述",name:"description",type:"text"}]}}},watch:{},computed:{},methods:{onload:function(){this.loadTableData()}},created:function(){this.onload()},mounted:function(){}},i=a("KHd+"),l=Object(i.a)(o,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"admin_table_page_title"},[t._v("数据路径列表")]),t._v(" "),a("div",{staticClass:"unline underm"}),t._v(" "),a("div",{staticClass:"admin_table_list"},[a("a-table",{attrs:{size:"small",columns:t.table.columns,"data-source":t.table.data,scroll:{y:t.sysWindowHeight-400},loading:t.table.loading,pagination:!1,"row-selection":{selectedRowKeys:t.table.selectedRowKeys,onChange:t.handleTableRowKeysChange},"row-key":"id"},scopedSlots:t._u([{key:"title",fn:function(e){return[a("search",{attrs:{"search-config":t.search.fields,"auto-params":t.search.params,"export-config":t.exporting},on:{searchParams:t.handleTableSearchParams,handleExport:t.handleTableExport}}),t._v(" "),a("div",{staticClass:"admin_table_handle_btn"},[a("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:function(e){return t.$router.push("/Admin/goodcatch/m/core/data_routes/form")}}},[t._v("添加")]),t._v(" "),a("a-button",{staticClass:"admin_delete_btn",attrs:{type:"danger",icon:"delete"},on:{click:t.handleRemoveTableRows}},[t._v("批量删除")])],1)]}},{key:"connection_id",fn:function(e){return a("span",{},[t._v("\n                "+t._s(e.connection?e.connection.datasource?e.connection.name+"("+e.connection.datasource.name+")":e.connection.name:"--")+"\n            ")])}},{key:"action",fn:function(e){return a("span",{},[a("a-button",{attrs:{icon:"edit"},on:{click:function(a){return t.$router.push("/Admin/goodcatch/m/core/data_routes/form/"+e.id)}}},[t._v("编辑")])],1)}}])}),t._v(" "),t.table.total>0?a("div",{staticClass:"admin_pagination"},[a("a-pagination",{attrs:{"page-size":t.table.params.per_page,total:t.table.total,"show-less-items":""},on:{"update:pageSize":function(e){return t.$set(t.table.params,"per_page",e)},"update:page-size":function(e){return t.$set(t.table.params,"per_page",e)},change:t.handleTablePageChange},model:{value:t.table.params.page,callback:function(e){t.$set(t.table.params,"page",e)},expression:"table.params.page"}})],1):t._e()],1)])}),[],!1,null,"26a3c605",null);e.default=l.exports}}]);