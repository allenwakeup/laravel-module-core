(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{gQXU:function(e,o,r){"use strict";r.r(o);r("zKZe"),r("ma9I"),r("TeQF"),r("FZtP"),r("rB9j"),r("EnZy"),r("pNMO"),r("4Brf"),r("07d7"),r("0oug"),r("4mDm"),r("PKPk"),r("3bBZ"),r("+2oP"),r("sMBO"),r("pjDv");function t(e,o){return function(e){if(Array.isArray(e))return e}(e)||function(e,o){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var t,s,a=[],n=!0,i=!1;try{for(r=r.call(e);!(n=(t=r.next()).done)&&(a.push(t.value),!o||a.length!==o);n=!0);}catch(e){i=!0,s=e}finally{try{n||null==r.return||r.return()}finally{if(i)throw s}}return a}(e,o)||function(e,o){if(!e)return;if("string"==typeof e)return s(e,o);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(e,o)}(e,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,o){(null==o||o>e.length)&&(o=e.length);for(var r=0,t=new Array(o);r<o;r++)t[r]=e[r];return t}var a={components:{},props:{},data:function(){return{datasources:[],moreOption:!1,datasource_requires:{},datasource_rules:{},loading_datasource:!1,form_password:"",form:{datasource_id:"",name:"",description:"",conn_type:"",tns:"",driver:"",host:"",port:1433,database:"",username:"",password:"",url:"",service_name:"",unix_socket:"",charset:"",collation:"",prefix:"",prefix_schema:"",strict:0,engine:"",schema:"",edition:"",server_version:"",sslmode:"",options:"",type:"SRC",group:"",order:1,status:1},id:0,loading_test:!1,test:!1}},watch:{form_password:function(e){this.form.password=e}},computed:{rules:function(){var e=Object.assign({},{datasource_id:[{trigger:"change",required:!0,message:"请选择一个数据源"}],name:[{required:!0,message:"请填写名称"}],type:[{required:!0,message:"请选择一个连接类型"}],driver:[{required:!0,message:"请填写驱动"}],database:[{required:!0,message:"请填写数据库"}],group:[{required:!0,message:"请填写分组"}]});for(var o in this.datasource_rules)this.datasource_rules.hasOwnProperty(o)&&(e.hasOwnProperty(o)?e[o]=e[o].concat(this.datasource_rules[o]):e[o]=this.datasource_rules[o]);return e},showFormItem:function(){var e={};for(var o in this.rules)this.rules.hasOwnProperty(o)&&(e[o]=!0);for(var r in this.datasource_requires)this.datasource_requires.hasOwnProperty(r)&&(!0===this.datasource_requires[r]||!1===this.datasource_requires[r]&&this.moreOption)&&(e[r]=!0);return e.options=this.moreOption,e.order=!0,e.status=!0,e.description=this.moreOption,e}},methods:{handleSubmit:function(e){var o=this;this.$refs.form.validate((function(r){if(!r)return o.$message.error("请正确填写表单！"),!1;if(e)o.loading_test=!0,o.$post(o.$api.moduleCoreTestConnection,o.form).then((function(e){return 200===e.code||201===e.code?(o.loading_test=!1,o.test=!0,o.$message.success(e.msg)):(o.loading_test=!1,o.test=!1,o.$message.error(e.msg))}));else{var t=o.$apiHandle(o.$api.moduleCoreConnections,o.id);t.status?o.$put(t.url,o.form).then((function(e){return 200===e.code?(o.$message.success(e.msg),o.$router.back()):o.$message.error(e.msg)})):o.$post(t.url,o.form).then((function(e){return 200===e.code||201===e.code?(o.$message.success(e.msg),o.$router.back()):o.$message.error(e.msg)}))}}))},onChangeMoreOptions:function(e){this.moreOption=e},onChangeStrictOptions:function(e){this.form.strict=e?1:0},onChangeOrder:function(e){this.form.order=e},onChangePort:function(e){this.form.port=e},onChangeStatus:function(e){this.form.status=e?1:0},get_form:function(){var e=this;this.$get(this.$api.moduleCoreConnections+"/"+this.id).then((function(o){o.data.options=o.data.options?JSON.stringify(o.data.options,null,2):"",e.form=o.data,e.form.password="",e.id>0&&e.getDatasourceSelector()}))},getDatasourceSelector:function(e){var o=this;this.loading_datasource=!0,this.$get(this.$api.moduleCoreDatasources,e).then((function(e){if(o.loading_datasource=!1,e.data&&e.data.data){o.datasources=e.data.data;var r=null;o.$isEmpty(o.form.datasource_id)?(r=o.datasources[0],o.form.datasource_id=r.id):r=o.datasources.filter((function(e){return e.id===o.form.datasource_id}))[0],o.setDynamicFormItems(r)}})).catch((function(){return o.loading_datasource=!1}))},handleTypeChange:function(e){this.form.type=e},handleDatasourceChange:function(e){this.form.datasource_id=e;var o=this.datasources.filter((function(o){return o.id===e}))[0];this.setDynamicFormItems(o)},handleDatasourceSearch:function(e){this.getDatasourceSelector({keyword:e,type:"selector"})},setDynamicFormItems:function(e){var o=this;if(e){this.form.driver=e.code,this.datasource_requires={};var r={};e.requires.split(",").forEach((function(e){var s=t(e.split(":"),2),a=s[0],n=s[1];o.datasource_requires[a]=!0,o.$isEmpty(o.form[a])&&(o.form[a]=n),r[a]={required:!0,message:"请填写内容"}})),e.options.split(",").forEach((function(e){var r=t(e.split(":"),2),s=r[0],a=r[1];o.datasource_requires[s]=!1,o.$isEmpty(o.form[s])&&(o.form[s]=a)})),this.datasource_rules=r,this.test=!1}},onload:function(){this.$isEmpty(this.$route.params.id)||(this.id=this.$route.params.id,this.get_form()),0===this.id&&this.getDatasourceSelector({})}},created:function(){this.onload()},mounted:function(){}},n=r("KHd+"),i=Object(n.a)(a,(function(){var e=this,o=e.$createElement,r=e._self._c||o;return r("div",[r("div",{staticClass:"admin_table_page_title"},[r("a-button",{staticClass:"float_right",attrs:{icon:"arrow-left"},on:{click:function(o){return e.$router.back()}}},[e._v("返回")]),e._v("\n        编辑连接\n    ")],1),e._v(" "),r("div",{staticClass:"unline underm"}),e._v(" "),r("div",{staticClass:"admin_form"},[r("a-form-model",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-col":{span:5},"wrapper-col":{span:12}}},[r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.datasource_id,expression:"showFormItem['datasource_id']"}],attrs:{label:"数据源",prop:"datasource_id"}},[r("a-row",{attrs:{gutter:8}},[r("a-col",{attrs:{span:12}},[r("a-spin",{directives:[{name:"show",rawName:"v-show",value:e.loading_datasource,expression:"loading_datasource"}]}),e._v(" "),r("a-select",{staticStyle:{width:"200px"},style:{display:e.loading_datasource?"none":""},attrs:{"show-search":"",placeholder:"选择数据源",value:e.form.datasource_id,model:e.form.datasource_id,"filter-option":!1,"not-found-content":"没有更多的数据源"},on:{search:e.handleDatasourceSearch,change:e.handleDatasourceChange}},e._l(e.datasources,(function(o){return r("a-select-option",{key:o.id,attrs:{value:o.id}},[e._v("\n                                "+e._s(o.name)+"\n                            ")])})),1)],1),e._v(" "),r("a-col",{attrs:{span:12}},[r("a-switch",{directives:[{name:"show",rawName:"v-show",value:e.datasources.length>0,expression:"datasources.length > 0"}],attrs:{"checked-children":"更多选项","un-checked-children":"更少选项"},on:{change:e.onChangeMoreOptions}})],1)],1)],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.name,expression:"showFormItem['name']"}],attrs:{label:"名称",prop:"name"}},[r("a-input",{model:{value:e.form.name,callback:function(o){e.$set(e.form,"name",o)},expression:"form.name"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.conn_type,expression:"showFormItem['conn_type']"}],attrs:{label:"连接类型",prop:"conn_type"}},[r("a-input",{model:{value:e.form.conn_type,callback:function(o){e.$set(e.form,"conn_type",o)},expression:"form.conn_type"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.tns,expression:"showFormItem['tns']"}],attrs:{label:"TNS",prop:"tns"}},[r("a-textarea",{attrs:{"auto-size":{minRows:3,maxRows:5}},model:{value:e.form.tns,callback:function(o){e.$set(e.form,"tns",o)},expression:"form.tns"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.driver,expression:"showFormItem['driver']"}],attrs:{label:"驱动",prop:"driver"}},[r("a-input",{model:{value:e.form.driver,callback:function(o){e.$set(e.form,"driver",o)},expression:"form.driver"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.host,expression:"showFormItem['host']"}],attrs:{label:"主机名",prop:"host"}},[r("a-input",{model:{value:e.form.host,callback:function(o){e.$set(e.form,"host",o)},expression:"form.host"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.port,expression:"showFormItem['port']"}],attrs:{label:"端口号",prop:"port"}},[r("a-input-number",{attrs:{min:1024},on:{change:e.onChangePort},model:{value:e.form.port,callback:function(o){e.$set(e.form,"port",o)},expression:"form.port"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.database,expression:"showFormItem['database']"}],attrs:{label:"数据库名",prop:"database"}},[r("a-input",{attrs:{placeholder:"请输入数据库名"},model:{value:e.form.database,callback:function(o){e.$set(e.form,"database",o)},expression:"form.database"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.username,expression:"showFormItem['username']"}],attrs:{label:"用户名",prop:"username"}},[r("a-input",{attrs:{placeholder:"请输入用户名"},model:{value:e.form.username,callback:function(o){e.$set(e.form,"username",o)},expression:"form.username"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.password,expression:"showFormItem['password']"}],attrs:{label:"密码"}},[r("a-input-password",{attrs:{placeholder:"请输入密码"},model:{value:e.form_password,callback:function(o){e.form_password=o},expression:"form_password"}},[r("a-tooltip",{attrs:{slot:"prefix",title:"留空表示不修改密码"},slot:"prefix"},[r("a-icon",{attrs:{type:"lock"}})],1)],1)],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.url,expression:"showFormItem['url']"}],attrs:{label:"URL",prop:"url"}},[r("a-input",{model:{value:e.form.url,callback:function(o){e.$set(e.form,"url",o)},expression:"form.url"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.service_name,expression:"showFormItem['service_name']"}],attrs:{label:"服务名",prop:"service_name"}},[r("a-input",{model:{value:e.form.service_name,callback:function(o){e.$set(e.form,"service_name",o)},expression:"form.service_name"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.unix_socket,expression:"showFormItem['unix_socket']"}],attrs:{label:"Socket路径",prop:"unix_socket"}},[r("a-input",{model:{value:e.form.unix_socket,callback:function(o){e.$set(e.form,"unix_socket",o)},expression:"form.unix_socket"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.charset,expression:"showFormItem['charset']"}],attrs:{label:"字符编码",prop:"charset"}},[r("a-input",{model:{value:e.form.charset,callback:function(o){e.$set(e.form,"charset",o)},expression:"form.charset"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.collation,expression:"showFormItem['collation']"}],attrs:{label:"字符集",prop:"collation"}},[r("a-input",{model:{value:e.form.collation,callback:function(o){e.$set(e.form,"collation",o)},expression:"form.collation"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.prefix,expression:"showFormItem['prefix']"}],attrs:{label:"表前缀名",prop:"prefix"}},[r("a-input",{model:{value:e.form.prefix,callback:function(o){e.$set(e.form,"prefix",o)},expression:"form.prefix"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.prefix_schema,expression:"showFormItem['prefix_schema']"}],attrs:{label:"资源前缀",prop:"prefix_schema"}},[r("a-input",{model:{value:e.form.prefix_schema,callback:function(o){e.$set(e.form,"prefix_schema",o)},expression:"form.prefix_schema"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.schema,expression:"showFormItem['schema']"}],attrs:{label:"资源名称",prop:"schema"}},[r("a-input",{model:{value:e.form.schema,callback:function(o){e.$set(e.form,"schema",o)},expression:"form.schema"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.strict,expression:"showFormItem['strict']"}],attrs:{label:"严格模式",prop:"strict"}},[r("a-switch",{attrs:{"checked-children":"开启","un-checked-children":"关闭",checked:1===e.form.strict},on:{change:e.onChangeStrictOptions}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.engine,expression:"showFormItem['engine']"}],attrs:{label:"Engine",prop:"engine"}},[r("a-input",{model:{value:e.form.engine,callback:function(o){e.$set(e.form,"engine",o)},expression:"form.engine"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.edition,expression:"showFormItem['edition']"}],attrs:{label:"版本限制",prop:"edition"}},[r("a-input",{model:{value:e.form.edition,callback:function(o){e.$set(e.form,"edition",o)},expression:"form.edition"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.server_version,expression:"showFormItem['server_version']"}],attrs:{label:"软件版本",prop:"server_version"}},[r("a-input",{model:{value:e.form.server_version,callback:function(o){e.$set(e.form,"server_version",o)},expression:"form.server_version"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.sslmode,expression:"showFormItem['sslmode']"}],attrs:{label:"加密模式",prop:"servesslmoder_version"}},[r("a-input",{model:{value:e.form.sslmode,callback:function(o){e.$set(e.form,"sslmode",o)},expression:"form.sslmode"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.options,expression:"showFormItem['options']"}],attrs:{label:"其他选项",prop:"options"}},[r("a-textarea",{attrs:{placeholder:"JSON格式","auto-size":{minRows:3,maxRows:5}},model:{value:e.form.options,callback:function(o){e.$set(e.form,"options",o)},expression:"form.options"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.type,expression:"showFormItem['type']"}],attrs:{label:"分类",prop:"type"}},[r("a-select",{staticStyle:{width:"120px"},attrs:{"default-value":"SRC"},on:{change:e.handleTypeChange},model:{value:e.form.type,callback:function(o){e.$set(e.form,"type",o)},expression:"form.type"}},[r("a-select-option",{attrs:{value:"SRC"}},[e._v("\n                        来源\n                    ")]),e._v(" "),r("a-select-option",{attrs:{value:"DST"}},[e._v("\n                        目标\n                    ")])],1)],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.group,expression:"showFormItem['group']"}],attrs:{label:"分组",prop:"group"}},[r("a-input",{model:{value:e.form.group,callback:function(o){e.$set(e.form,"group",o)},expression:"form.group"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.order,expression:"showFormItem['order']"}],attrs:{label:"排序",prop:"order"}},[r("a-input-number",{attrs:{min:0},on:{change:e.onChangeOrder},model:{value:e.form.order,callback:function(o){e.$set(e.form,"order",o)},expression:"form.order"}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.status,expression:"showFormItem['status']"}],attrs:{label:"状态",prop:"status"}},[r("a-switch",{attrs:{"checked-children":"启用","un-checked-children":"禁用",checked:1===e.form.status},on:{change:e.onChangeStatus}})],1),e._v(" "),r("a-form-model-item",{directives:[{name:"show",rawName:"v-show",value:e.showFormItem.description,expression:"showFormItem['description']"}],attrs:{label:"描述",prop:"description"}},[r("a-textarea",{attrs:{"auto-size":{minRows:3,maxRows:5}},model:{value:e.form.description,callback:function(o){e.$set(e.form,"description",o)},expression:"form.description"}})],1),e._v(" "),r("a-form-model-item",{attrs:{"wrapper-col":{span:12,offset:5}}},[r("a-row",{attrs:{gutter:8}},[r("a-col",{attrs:{span:6}},[r("a-button",{attrs:{type:"primary"},on:{click:function(o){return e.handleSubmit(!1)}}},[e._v("提交")])],1),e._v(" "),r("a-col",{attrs:{span:18}},[e.test?e._e():r("a-button",{attrs:{type:"dashed",loading:e.loading_test},on:{click:function(o){return e.handleSubmit(!0)}}},[e._v("测试连接")]),e._v(" "),e.test?r("a-button",{attrs:{type:"dashed",icon:"check"},on:{click:function(o){return e.handleSubmit(!0)}}},[e._v("连接成功")]):e._e()],1)],1)],1)],1)],1)])}),[],!1,null,"0b1183c2",null);o.default=i.exports}}]);