(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"2B1R":function(t,e,a){"use strict";var n=a("I+eb"),i=a("tycR").map;n({target:"Array",proto:!0,forced:!a("Hd5f")("map")},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},jMSc:function(t,e,a){"use strict";a.r(e);var n=a("FAbG"),i={mixins:[a("K49p").a],components:{Search:n.a},props:{},data:function(){return{table:{actions:{list:this.$api.moduleCoreConnections,remove:this.$api.moduleCoreConnections},columns:[{title:"#",dataIndex:"id",fixed:"left",width:80},{title:"数据源",scopedSlots:{customRender:"datasource_id"},width:180},{title:"名称",dataIndex:"name",width:180},{title:"描述",dataIndex:"description",width:280},{title:"连接类型",dataIndex:"conn_type",width:120},{title:"TNS",dataIndex:"tns",width:120},{title:"驱动",dataIndex:"driver",width:120},{title:"主机名",dataIndex:"host",width:180},{title:"端口号",dataIndex:"port",width:120},{title:"数据库名",dataIndex:"database",width:150},{title:"用户",dataIndex:"username",width:120},{title:"密码",dataIndex:"password",width:120},{title:"连接地址",dataIndex:"url",width:180},{title:"服务名",dataIndex:"service_name",width:120},{title:"通信地址",dataIndex:"unix_socket",width:120},{title:"字符编码",dataIndex:"charset",width:180},{title:"字符集",dataIndex:"collation",width:200},{title:"表前缀名",dataIndex:"prefix",width:120},{title:"资源前缀",dataIndex:"prefix_schema",width:120},{title:"严格模式",dataIndex:"strict",width:90},{title:"Engine",dataIndex:"engine",width:120},{title:"资源名",dataIndex:"schema",width:120},{title:"版本限制",dataIndex:"edition",width:100},{title:"软件版本",dataIndex:"server_version",width:90},{title:"加密模式",dataIndex:"sslmode",width:90},{title:"附加设置",dataIndex:"options",width:180},{title:"数据方向",dataIndex:"type",width:120},{title:"分组",dataIndex:"group",width:120},{title:"排序",dataIndex:"order",width:100},{title:"状态",dataIndex:"status",width:90},{title:"创建时间",dataIndex:"created_at",width:200},{title:"更新时间",dataIndex:"updated_at",width:200},{title:"操作",fixed:"right",scopedSlots:{customRender:"action"}}]},search:{fields:[{label:"连接类型",name:"conn_type",type:"select",data:[{label:"全部",value:void 0},{label:"来源",value:"SRC"},{label:"目标",value:"DST"}],placeholder:"全部"},{label:"名称",name:"name",type:"text"},{label:"分组",name:"group",type:"text"},{label:"主机名",name:"host",type:"text"},{label:"描述",name:"description",type:"text"}]}}},watch:{},computed:{},methods:{onload:function(){this.loadTableData()}},created:function(){this.onload()},mounted:function(){}},d=a("KHd+"),l=Object(d.a)(i,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"admin_table_page_title"},[t._v("连接列表")]),t._v(" "),a("div",{staticClass:"unline underm"}),t._v(" "),a("div",{staticClass:"admin_table_list"},[a("a-table",{attrs:{size:"small",columns:t.table.columns,"data-source":t.table.data,scroll:{y:t.sysWindowHeight-400},loading:t.table.loading,pagination:!1,"row-selection":{selectedRowKeys:t.table.selectedRowKeys,onChange:t.handleTableRowKeysChange},"row-key":"id"},scopedSlots:t._u([{key:"title",fn:function(e){return[a("search",{attrs:{"search-config":t.search.fields,"auto-params":t.search.params,"export-config":t.exporting},on:{searchParams:t.handleTableSearchParams,handleExport:t.handleTableExport}}),t._v(" "),a("div",{staticClass:"admin_table_handle_btn"},[a("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:function(e){return t.$router.push("/Admin/goodcatch/m/core/connections/form")}}},[t._v("添加")]),t._v(" "),a("a-button",{staticClass:"admin_delete_btn",attrs:{type:"danger",icon:"delete"},on:{click:t.handleRemoveTableRows}},[t._v("批量删除")])],1)]}},{key:"datasource_id",fn:function(e){return a("span",{},[t._v("\n                "+t._s(e.datasource?e.datasource.name:"--")+"\n            ")])}},{key:"action",fn:function(e){return a("span",{},[a("a-button",{attrs:{icon:"edit"},on:{click:function(a){return t.$router.push("/Admin/goodcatch/m/core/connections/form/"+e.id)}}},[t._v("编辑")])],1)}}])}),t._v(" "),t.table.total>0?a("div",{staticClass:"admin_pagination"},[a("a-pagination",{attrs:{"page-size":t.table.params.per_page,total:t.table.total,"show-less-items":""},on:{"update:pageSize":function(e){return t.$set(t.table.params,"per_page",e)},"update:page-size":function(e){return t.$set(t.table.params,"per_page",e)},change:t.handleTablePageChange},model:{value:t.table.params.page,callback:function(e){t.$set(t.table.params,"page",e)},expression:"table.params.page"}})],1):t._e()],1)])}),[],!1,null,"9e02e8be",null);e.default=l.exports}}]);