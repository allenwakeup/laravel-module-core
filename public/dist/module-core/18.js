(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{Y6rg:function(t,e,a){"use strict";a.r(e);var r=a("WQwz"),o=a("d6hR"),s=Object(r.j)(o.c).readStorageStr,n={components:{},props:{},data:function(){return{form:{code:"",name:"",short:"",alias:"",display:"",description:"",order:1,status:1},rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"},{min:2,max:10,message:"至少两个字",trigger:"blur"}]},id:0}},watch:{},computed:{},methods:{handleSubmit:function(){var t=this;this.$refs.form.validate((function(e){if(!e)return t.$message.error("请按要求填写表单！"),!1;var a=t.$apiHandle(t.$api.adminAttachments,t.id);a.status?t.$put(a.url,t.form).then((function(e){return 200===e.code?(t.$message.success(e.msg),t.$router.back()):t.$message.error(e.msg)})):t.$post(a.url,t.form).then((function(e){return 200===e.code||201===e.code?(t.$message.success(e.msg),t.$router.back()):t.$message.error(e.msg)}))}))},onChangeStatus:function(t){this.form.status=t?1:0},getToken:function(){return s(o.h)},getForm:function(){var t=this;this.$get(this.$api.adminAttachments+"/"+this.id).then((function(e){200===e.code&&(t.form=e.data)}))},onChangeUpload:function(){},onload:function(){this.$isEmpty(this.$route.params.id)||(this.id=this.$route.params.id,this.getForm())}},created:function(){this.onload()},mounted:function(){}},i=a("KHd+"),c=Object(i.a)(n,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"admin_table_page_title"},[a("a-button",{staticClass:"float_right",attrs:{icon:"arrow-left"},on:{click:function(e){return t.$router.back()}}},[t._v("返回")]),t._v("\n        附件编辑\n    ")],1),t._v(" "),a("div",{staticClass:"unline underm"}),t._v(" "),a("div",{staticClass:"admin_form"},[a("a-form-model",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-col":{span:6},"wrapper-col":{span:16}}},[a("a-form-model-item",{attrs:{label:"名称",prop:"name"}},[a("a-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),a("a-form-model-item",{attrs:{label:"文件上传"}},[a("a-upload",{staticClass:"avatar-uploader",attrs:{"list-type":"picture-card","show-upload-list":!1,action:t.$api.adminAttachments+"/upload",data:{token:t.getToken()}},on:{change:t.onChangeUpload}},[t.form.path?a("img",{attrs:{height:"90px",src:t.form.path}}):a("div",[a("a-font",{attrs:{type:"iconplus"}})],1)])],1),t._v(" "),a("a-form-model-item",{attrs:{label:"状态"}},[a("a-switch",{attrs:{"checked-children":"启用","un-checked-children":"禁用",checked:1===t.form.status},on:{change:t.onChangeStatus}})],1),t._v(" "),a("a-form-model-item",{attrs:{"wrapper-col":{span:12,offset:5}}},[a("a-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("提交")])],1)],1)],1)])}),[],!1,null,"e23e2cd0",null);e.default=c.exports}}]);