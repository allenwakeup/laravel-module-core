(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{aoue:function(e,a,r){"use strict";r.r(a);r("pNMO"),r("4Brf"),r("07d7"),r("0oug"),r("4mDm"),r("PKPk"),r("3bBZ"),r("pjDv"),r("+2oP"),r("sMBO");function t(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,a){if(!e)return;if("string"==typeof e)return o(e,a);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(e,a)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,a){(null==a||a>e.length)&&(a=e.length);for(var r=0,t=new Array(a);r<a;r++)t[r]=e[r];return t}var s={components:{},props:{},data:function(){return{cascader_area:[],form:{code:"",name:"",short:"",alias:"",display:"",description:"",order:1,status:1},areas:[],area_cascader:{province:"city",city:"county"},rules:{code:[{required:!0,message:"请输入编码",trigger:"blur"},{min:2,max:20,message:"至少两个字，最多20个字",trigger:"blur"}],name:[{required:!0,message:"请输入名称",trigger:"blur"},{min:2,max:20,message:"至少两个字，最多20个字",trigger:"blur"}]},id:0}},watch:{},computed:{},methods:{handleSubmit:function(){var e=this;this.$refs.form.validate((function(a){if(!a)return e.$message.error("请按要求填写表单！"),!1;var r=e.$apiHandle(e.$api.moduleCoreAreas,e.id);r.status?e.$put(r.url,e.form).then((function(a){return 200===a.code?(e.$message.success(a.msg),e.$router.back()):e.$message.error(a.msg)})):e.$post(r.url,e.info).then((function(a){return 200===a.code||201===a.code?(e.$message.success(a.msg),e.$router.back()):e.$message.error(a.msg)}))}))},get_info:function(){var e=this;this.$get(this.$api.moduleCoreAreas+"/"+this.id).then((function(a){e.form=a.data}))},load_areas:function(e){var a=this,r=e[e.length-1],o={data_type:"cascader",cascader:this.area_cascader[r.cascader]};o[r.cascader+"_id"]=r.value,r.loading=!0,this.$get(this.$api.moduleCoreAreas,o).then((function(e){r.loading=!1,r.children=e.data,a.areas=t(a.areas)}))},area_change:function(e,a){this.form.code=e[2]},onload:function(){var e=this;this.$isEmpty(this.$route.params.id)||(this.id=this.$route.params.id,this.get_info()),this.$get(this.$api.moduleCoreAreas,{data_type:"cascader",cascader:"province"}).then((function(a){e.areas=a.data}))}},created:function(){this.onload()},mounted:function(){}},n=r("KHd+"),i=Object(n.a)(s,(function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("div",[r("div",{staticClass:"admin_table_page_title"},[r("a-button",{staticClass:"float_right",attrs:{icon:"arrow-left"},on:{click:function(a){return e.$router.back()}}},[e._v("返回")]),e._v("\n        地区编辑\n    ")],1),e._v(" "),r("div",{staticClass:"unline underm"}),e._v(" "),r("div",{staticClass:"admin_form"},[r("a-form-model",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-col":{span:5},"wrapper-col":{span:12}}},[r("a-form-model-item",{attrs:{label:"地区"}},[r("a-cascader",{attrs:{"load-data":e.load_areas,options:e.areas,placeholder:"请选择行政地区","change-on-select":""},on:{change:e.area_change},model:{value:e.cascader_area,callback:function(a){e.cascader_area=a},expression:"cascader_area"}})],1),e._v(" "),r("a-form-model-item",{attrs:{label:"名称"}},[r("a-input",{model:{value:e.form.name,callback:function(a){e.$set(e.form,"name",a)},expression:"form.name"}})],1),e._v(" "),r("a-form-model-item",{attrs:{label:"简称"}},[r("a-input",{model:{value:e.form.short,callback:function(a){e.$set(e.form,"short",a)},expression:"form.short"}})],1),e._v(" "),r("a-form-model-item",{attrs:{label:"别名"}},[r("a-input",{model:{value:e.form.alias,callback:function(a){e.$set(e.form,"alias",a)},expression:"form.alias"}})],1),e._v(" "),r("a-form-model-item",{attrs:{label:"显示名称"}},[r("a-input",{model:{value:e.form.display,callback:function(a){e.$set(e.form,"display",a)},expression:"form.display"}})],1),e._v(" "),r("a-form-model-item",{attrs:{label:"描述"}},[r("a-textarea",{attrs:{"auto-size":{minRows:3,maxRows:5}},model:{value:e.form.description,callback:function(a){e.$set(e.form,"description",a)},expression:"form.description"}})],1),e._v(" "),r("a-form-model-item",{attrs:{"wrapper-col":{span:12,offset:5}}},[r("a-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("提交")])],1)],1)],1)])}),[],!1,null,"6eb572e4",null);a.default=i.exports}}]);