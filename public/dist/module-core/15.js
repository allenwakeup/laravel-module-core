(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"2B1R":function(t,a,e){"use strict";var n=e("I+eb"),o=e("tycR").map;n({target:"Array",proto:!0,forced:!e("Hd5f")("map")},{map:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},"7NN3":function(t,a,e){"use strict";e.r(a);var n=e("FAbG"),o={mixins:[e("K49p").a],components:{Search:n.a},props:{},data:function(){return{table:{actions:{list:this.$api.moduleCoreDatasources,remove:this.$api.moduleCoreDatasources},columns:[{title:"#",dataIndex:"id",fixed:"left"},{title:"名称",dataIndex:"name"},{title:"创建时间",dataIndex:"created_at"},{title:"更新时间",dataIndex:"updated_at"},{title:"操作",fixed:"right",scopedSlots:{customRender:"action"}}]},search:{fields:[{label:"名称",name:"name",type:"text"}]}}},watch:{},computed:{},methods:{onload:function(){this.loadTableData()}},created:function(){this.onload()},mounted:function(){}},s=e("KHd+"),i=Object(s.a)(o,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"admin_table_page_title"},[t._v("数据源列表")]),t._v(" "),e("div",{staticClass:"unline underm"}),t._v(" "),e("div",{staticClass:"admin_table_list"},[e("a-table",{attrs:{size:"small",columns:t.table.columns,"data-source":t.table.data,scroll:{y:t.sysWindowHeight-400},loading:t.table.loading,pagination:!1,"row-selection":{selectedRowKeys:t.table.selectedRowKeys,onChange:t.handleTableRowKeysChange},"row-key":"id"},scopedSlots:t._u([{key:"title",fn:function(a){return[e("search",{attrs:{"search-config":t.search.fields,"auto-params":t.search.params,"export-config":t.exporting},on:{searchParams:t.handleTableSearchParams,handleExport:t.handleTableExport}}),t._v(" "),e("div",{staticClass:"admin_table_handle_btn"},[e("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:function(a){return t.$router.push("/Admin/goodcatch/m/core/datasources/form")}}},[t._v("添加")]),t._v(" "),e("a-button",{staticClass:"admin_delete_btn",attrs:{type:"danger",icon:"delete"},on:{click:t.handleRemoveTableRows}},[t._v("批量删除")])],1)]}},{key:"action",fn:function(a){return e("span",{},[e("a-button",{attrs:{icon:"edit"},on:{click:function(e){return t.$router.push("/Admin/goodcatch/m/core/datasources/form/"+a.id)}}},[t._v("编辑")])],1)}}])}),t._v(" "),t.table.total>0?e("div",{staticClass:"admin_pagination"},[e("a-pagination",{attrs:{"page-size":t.table.params.per_page,total:t.table.total,"show-less-items":""},on:{"update:pageSize":function(a){return t.$set(t.table.params,"per_page",a)},"update:page-size":function(a){return t.$set(t.table.params,"per_page",a)},change:t.handleTablePageChange},model:{value:t.table.params.page,callback:function(a){t.$set(t.table.params,"page",a)},expression:"table.params.page"}})],1):t._e()],1)])}),[],!1,null,"e8c202f2",null);a.default=i.exports},fbCW:function(t,a,e){"use strict";var n=e("I+eb"),o=e("tycR").find,s=e("RNIs"),i=!0;"find"in[]&&Array(1).find((function(){i=!1})),n({target:"Array",proto:!0,forced:i},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),s("find")}}]);