(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{HGWI:function(t,e,a){"use strict";a.r(e);a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("pjDv"),a("+2oP"),a("sMBO");function r(t){return function(t){if(Array.isArray(t))return o(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return o(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,r=new Array(e);a<e;a++)r[a]=t[a];return r}var n={components:{},props:{},data:function(){return{cascader_staff:[],form:{department_id:0,pid:0,code:"",name:"",gender:"1",email:"",hireday:"",birthday:"",workday:"",phone:"",title:"",rank:"",order:1,status:1},rules:{code:[{min:1,max:20,message:"1到20个字符",trigger:"blur"}],name:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:2,max:10,message:"至少两个字",trigger:"blur"}],phone:[{required:!0,message:"请输入电话",trigger:"blur"},{pattern:/^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4(?:[14]0\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$/,message:"至少两个字",trigger:"blur"}]},departments:[],staff:[],id:0}},watch:{},computed:{},methods:{handleSubmit:function(){var t=this;this.$refs.form.validate((function(e){if(!e)return t.$message.error("请按要求填写表单！"),!1;var a=t.$apiHandle(t.$api.moduleCoreStaff,t.id);a.status?t.$put(a.url,t.form).then((function(e){return 200===e.code?(t.$message.success(e.msg),t.$router.back()):t.$message.error(e.msg)})):t.$post(a.url,t.form).then((function(e){return 200===e.code||201===e.code?(t.$message.success(e.msg),t.$router.back()):t.$message.error(e.msg)}))}))},get_form:function(){var t=this;this.$get(this.$api.moduleCoreStaff+"/"+this.id).then((function(e){t.form=e.data}))},onChangeOrder:function(t){this.form.order=t},onChangeStatus:function(t){this.form.status=t?1:0},onChangeWorkday:function(t,e){this.form.workday=e},onChangeHireday:function(t,e){this.form.hireday=e},onChangeBirthday:function(t,e){this.form.birthday=e},staff_change:function(t,e){this.form.pid=t[t.length-1],0===t.length&&(this.form.pid=0)},department_change:function(t,e){this.form.department_id=t[t.length-1],0===t.length&&(this.form.department_id=0)},load_departments:function(t){var e=this,a=t[t.length-1];a.loading=!0;var o={pid:a.id,data_type:"select"};this.$get(this.$api.moduleCoreDepartments,o).then((function(t){a.loading=!1,a.children=t.data,e.departments=r(e.departments)}))},load_staff:function(t){var e=this,a=t[t.length-1];a.loading=!0;var o={pid:a.id,data_type:"select"};this.$get(this.$api.moduleCoreStaff,o).then((function(t){a.loading=!1,a.children=t.data,e.staff=r(e.staff)}))},onload:function(){var t=this;this.$isEmpty(this.$route.params.id)||(this.id=this.$route.params.id,this.get_form()),this.$get(this.$api.moduleCoreDepartments,{data_type:"select"}).then((function(e){200===e.code&&(t.departments=e.data)})),this.$get(this.$api.moduleCoreStaff,{data_type:"select"}).then((function(e){200===e.code&&(t.staff=e.data)}))}},created:function(){this.onload()},mounted:function(){}},s=a("KHd+"),i=Object(s.a)(n,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"admin_table_page_title"},[a("a-button",{staticClass:"float_right",attrs:{icon:"arrow-left"},on:{click:function(e){return t.$router.back()}}},[t._v("返回")]),t._v("\n        员工编辑\n    ")],1),t._v(" "),a("div",{staticClass:"unline underm"}),t._v(" "),a("div",{staticClass:"admin_form"},[a("a-form-model",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-col":{span:6},"wrapper-col":{span:16}}},[a("a-row",{attrs:{gutter:1}},[a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"所属部门"}},[a("a-cascader",{attrs:{"load-data":t.load_departments,options:t.departments,fieldNames:{label:"name",value:"id",children:"children"},placeholder:t.form.department_id>0&&t.form.departments?t.form.departments:"请选择上级部门","change-on-select":""},on:{change:t.department_change}})],1)],1),t._v(" "),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"直接上级"}},[a("a-cascader",{attrs:{"load-data":t.load_staff,options:t.staff,fieldNames:{label:"name",value:"id",children:"children"},placeholder:t.form.pid>0&&t.form.path_text?t.form.path_text.join(" / "):"请选择直接上级","change-on-select":""},on:{change:t.staff_change}})],1)],1)],1),t._v(" "),a("a-row",{attrs:{gutter:1}},[a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"姓名",prop:"name"}},[a("a-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1)],1),t._v(" "),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"员工编码",prop:"code"}},[a("a-input",{model:{value:t.form.code,callback:function(e){t.$set(t.form,"code",e)},expression:"form.code"}})],1)],1)],1),t._v(" "),a("a-row",{attrs:{gutter:1}},[a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"电话",prop:"phone"}},[a("a-input",{model:{value:t.form.phone,callback:function(e){t.$set(t.form,"phone",e)},expression:"form.phone"}})],1)],1),t._v(" "),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"邮箱",prop:"email"}},[a("a-input",{model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1)],1)],1),t._v(" "),a("a-row",{attrs:{gutter:1}},[a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"性别"}},[a("a-radio-group",{attrs:{"default-value":"1",name:"gender","button-style":"solid"},model:{value:t.form.gender,callback:function(e){t.$set(t.form,"gender",e)},expression:"form.gender"}},[a("a-radio-button",{attrs:{value:"0"}},[t._v("\n                                默认\n                            ")]),t._v(" "),a("a-radio-button",{attrs:{value:"1"}},[t._v("\n                                男\n                            ")]),t._v(" "),a("a-radio-button",{attrs:{value:"2"}},[t._v("\n                                女\n                            ")]),t._v(" "),a("a-radio-button",{attrs:{value:"3"}},[t._v("\n                                其他\n                            ")])],1)],1)],1),t._v(" "),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"入职日期",prop:"hireday"}},[a("a-date-picker",{attrs:{format:"YYYY-MM-DD",placeholder:t.form.hireday?t.form.hireday:"请选择入职日期"},on:{change:t.onChangeHireday}})],1)],1)],1),t._v(" "),a("a-row",{attrs:{gutter:1}},[a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"出生日期",prop:"birthday"}},[a("a-date-picker",{attrs:{format:"YYYY-MM-DD",placeholder:t.form.birthday?t.form.birthday:"请选择出生日期"},on:{change:t.onChangeBirthday}})],1)],1),t._v(" "),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"工作日期",prop:"workday"}},[a("a-date-picker",{attrs:{format:"YYYY-MM-DD",placeholder:t.form.workday?t.form.workday:"请选择开始工作日期"},on:{change:t.onChangeWorkday}})],1)],1)],1),t._v(" "),a("a-row",{attrs:{gutter:1}},[a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"岗位"}},[a("a-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1)],1),t._v(" "),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"排序",prop:"order"}},[a("a-input-number",{attrs:{min:0},on:{change:t.onChangeOrder},model:{value:t.form.order,callback:function(e){t.$set(t.form,"order",e)},expression:"form.order"}})],1)],1)],1),t._v(" "),a("a-row",{attrs:{gutter:1}},[a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"级别"}},[a("a-input",{model:{value:t.form.rank,callback:function(e){t.$set(t.form,"rank",e)},expression:"form.rank"}})],1)],1),t._v(" "),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"状态"}},[a("a-switch",{attrs:{"checked-children":"启用","un-checked-children":"禁用",checked:1===t.form.status},on:{change:t.onChangeStatus}})],1)],1)],1),t._v(" "),a("a-form-model-item",{attrs:{"wrapper-col":{span:12,offset:5}}},[a("a-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("提交")])],1)],1)],1)])}),[],!1,null,"184b2e1c",null);e.default=i.exports}}]);