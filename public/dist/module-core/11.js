(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{aoue:function(e,t,a){"use strict";a.r(t);a("sMBO"),a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("pjDv"),a("+2oP");function r(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var n={components:{},props:{},data:function(){return{cascader_area:[],info:{code:"",name:"",short:"",alias:"",display:"",description:"",order:1,status:1},areas:[],area_cascader:{province:"city",city:"county"},id:0}},watch:{},computed:{},methods:{handleSubmit:function(){var e=this;if(this.$isEmpty(this.info.code))return this.$message.error("行政地区不能为空");if(this.$isEmpty(this.info.name))return this.$message.error("名称不能为空");var t=this.$apiHandle(this.$api.moduleCoreAreas,this.id);t.status?this.$put(t.url,this.info).then((function(t){return 200==t.code?(e.$message.success(t.msg),e.$router.back()):e.$message.error(t.msg)})):this.$post(t.url,this.info).then((function(t){return 200==t.code||201==t.code?(e.$message.success(t.msg),e.$router.back()):e.$message.error(t.msg)}))},get_info:function(){var e=this;this.$get(this.$api.moduleCoreAreas+"/"+this.id).then((function(t){e.info=t.data}))},load_areas:function(e){var t=this,a=e[e.length-1],o={type:"selector",selector:this.area_cascader[a.cascader]};o[a.cascader+"_id"]=a.value,a.loading=!0,this.$get(this.$api.moduleCoreAreas,o).then((function(e){a.loading=!1,a.children=e.data,t.areas=r(t.areas)}))},area_change:function(e,t){this.info.code=e[2]},onload:function(){var e=this;this.$isEmpty(this.$route.params.id)||(this.id=this.$route.params.id,this.get_info()),this.$get(this.$api.moduleCoreAreas,{type:"selector",selector:"province"}).then((function(t){e.areas=t.data}))}},created:function(){this.onload()},mounted:function(){}},i=a("KHd+"),s=Object(i.a)(n,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"admin_table_page_title"},[a("a-button",{staticClass:"float_right",attrs:{icon:"arrow-left"},on:{click:function(t){return e.$router.back()}}},[e._v("返回")]),e._v("\n        地区编辑\n    ")],1),e._v(" "),a("div",{staticClass:"unline underm"}),e._v(" "),a("div",{staticClass:"admin_form"},[a("a-form-model",{attrs:{"label-col":{span:5},"wrapper-col":{span:12}}},[a("a-form-model-item",{attrs:{label:"地区"}},[a("a-cascader",{attrs:{"load-data":e.load_areas,options:e.areas,placeholder:"请选择行政地区","change-on-select":""},on:{change:e.area_change},model:{value:e.cascader_area,callback:function(t){e.cascader_area=t},expression:"cascader_area"}})],1),e._v(" "),a("a-form-model-item",{attrs:{label:"名称"}},[a("a-input",{model:{value:e.info.name,callback:function(t){e.$set(e.info,"name",t)},expression:"info.name"}})],1),e._v(" "),a("a-form-model-item",{attrs:{label:"简称"}},[a("a-input",{model:{value:e.info.short,callback:function(t){e.$set(e.info,"short",t)},expression:"info.short"}})],1),e._v(" "),a("a-form-model-item",{attrs:{label:"别名"}},[a("a-input",{model:{value:e.info.alias,callback:function(t){e.$set(e.info,"alias",t)},expression:"info.alias"}})],1),e._v(" "),a("a-form-model-item",{attrs:{label:"显示名称"}},[a("a-input",{model:{value:e.info.display,callback:function(t){e.$set(e.info,"display",t)},expression:"info.display"}})],1),e._v(" "),a("a-form-model-item",{attrs:{label:"描述"}},[a("a-textarea",{attrs:{"auto-size":{minRows:3,maxRows:5}},model:{value:e.info.description,callback:function(t){e.$set(e.info,"description",t)},expression:"info.description"}})],1),e._v(" "),a("a-form-model-item",{attrs:{"wrapper-col":{span:12,offset:5}}},[a("a-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("提交")])],1)],1)],1)])}),[],!1,null,"260ec094",null);t.default=s.exports}}]);