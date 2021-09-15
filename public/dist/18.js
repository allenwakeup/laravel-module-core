(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/schedules/index.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/schedules/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.assign.js */ "./node_modules/core-js/modules/es.object.assign.js");
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_1__);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  props: {},
  data: function data() {
    return {
      params: {
        page: 1,
        per_page: 30
      },
      total: 0,
      //总页数
      selectedRowKeys: [],
      // 被选择的行
      columns: [{
        title: '#',
        scopedSlots: {
          customRender: 'id'
        },
        fixed: 'left',
        width: 80
      }, {
        title: '名称',
        scopedSlots: {
          customRender: 'name'
        },
        width: 180
      }, {
        title: '描述',
        dataIndex: 'description',
        width: 150
      }, {
        title: '状态',
        scopedSlots: {
          customRender: 'status'
        },
        width: 90
      }, {
        title: '指令',
        dataIndex: 'input',
        width: 280
      }, {
        title: '执行周期',
        dataIndex: 'cron',
        width: 120
      }, {
        title: '任务类型',
        scopedSlots: {
          customRender: 'schedule_type'
        },
        width: 120
      }, {
        title: '分组',
        dataIndex: 'group',
        width: 120
      }, {
        title: '排序',
        dataIndex: 'order',
        width: 100
      }, {
        title: '单次任务',
        scopedSlots: {
          customRender: 'once'
        },
        width: 180
      }, {
        title: '重复',
        scopedSlots: {
          customRender: 'overlapping'
        },
        width: 120
      }, {
        title: '集群',
        dataIndex: 'one_server',
        width: 180
      }, {
        title: '后台执行',
        dataIndex: 'background',
        width: 120
      }, {
        title: '维护模式',
        dataIndex: 'maintenance',
        width: 120
      }, {
        title: '创建时间',
        dataIndex: 'created_at',
        width: 200
      }, {
        title: '更新时间',
        dataIndex: 'updated_at',
        width: 200
      }, {
        title: '操作',
        fixed: 'right',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      list: [],
      dictionary: {
        status: {
          enabled: '启用',
          disabled: '禁用'
        },
        schedule_type: ['--', 'Command', 'Exec', 'Job'],
        once: ['可循环', '单次'],
        overlapping: ['可重复', '不可重复'],
        one_server: ['多服务器', '单服务器'],
        background: ['前台执行', '后台执行'],
        maintenance: ['不执行', '执行']
      },
      loading_status: {},
      loading_start: {},
      logs: {
        show: false,
        total: 0,
        list: [],
        params: {
          page: 1,
          per_page: 30
        },
        columns: [{
          title: '状态',
          dataIndex: 'status_text'
        }, {
          title: '内容',
          dataIndex: 'content'
        }, {
          title: '时间',
          dataIndex: 'created_at_text'
        }]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 选择框被点击
    onSelectChange: function onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    // 选择分页
    onChange: function onChange(e) {
      this.params.page = e;
    },
    // 删除
    del: function del() {
      var _this = this;

      if (this.selectedRowKeys.length == 0) {
        return this.$message.error('未选择数据.');
      }

      this.$confirm({
        title: '你确定要删除选择的数据？',
        content: '确定删除后无法恢复.',
        okText: '是',
        okType: 'danger',
        cancelText: '取消',
        onOk: function onOk() {
          var ids = _this.selectedRowKeys.join(',');

          _this.$delete(_this.$api.moduleCoreSchedules + '/' + ids).then(function (res) {
            if (res.code == 200) {
              _this.onload();

              _this.$message.success('删除成功');
            } else {
              _this.$message.error(res.msg);
            }
          });
        }
      });
    },
    onload: function onload() {
      var _this2 = this;

      this.$get(this.$api.moduleCoreSchedules, this.params).then(function (res) {
        _this2.total = res.data.total;
        _this2.list = res.data.data;
      });
    },
    onStatusChange: function onStatusChange(record) {
      var _this3 = this;

      var reverse_status = [1, 0][record.status];
      this.loading_status['_' + record.id] = true;
      this.$put(this.$api.moduleCoreSchedules + '/' + record.id, Object.assign({}, record, {
        status: reverse_status,
        logs: '',
        payload: record.payload ? JSON.stringify(record.payload) : ''
      })).then(function (res) {
        _this3.loading_status['_' + record.id] = false;

        if (res.code === 200) {
          record.status = reverse_status;

          _this3.$message.success(res.msg);
        } else {
          return _this3.$message.error(res.msg);
        }
      }).catch(function () {
        return _this3.loading_status['_' + record.id] = false;
      });
    },
    handleNameClick: function handleNameClick(record) {
      var _this4 = this;

      this.loading_start['_' + record.id] = true;
      this.$put(this.$api.moduleCoreSchedules + '/' + record.id, Object.assign({}, record, {
        start: 1,
        logs: '',
        payload: record.payload ? JSON.stringify(record.payload) : ''
      })).then(function (res) {
        _this4.loading_start['_' + record.id] = false;

        if (res.code == 200) {
          _this4.$message.success(res.msg);
        } else {
          return _this4.$message.error(res.msg);
        }
      }).catch(function () {
        return _this4.loading_start['_' + record.id] = false;
      });
    },
    handleIdClick: function handleIdClick(record) {
      var _this5 = this;

      this.logs.show = true;
      this.$get(this.$api.moduleCoreSchedules + '/' + record.id + '/logs', this.logs.params).then(function (res) {
        _this5.logs.total = res.data.total;
        _this5.logs.list = res.data.data;
      });
    },
    onChangeLogs: function onChangeLogs(e) {
      this.logs.params.page = e;
    }
  },
  created: function created() {
    this.onload();
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/schedules/index.vue?vue&type=template&id=17802ff0&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/schedules/index.vue?vue&type=template&id=17802ff0&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var this$1 = this
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "admin_table_page_title" }, [
        _vm._v("计划与任务列表")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "unline underm" }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "admin_table_handle_btn" },
        [
          _c(
            "a-button",
            {
              attrs: { type: "primary", icon: "plus" },
              on: {
                click: function($event) {
                  return _vm.$router.push(
                    "/Admin/goodcatch/m/core/schedules/form"
                  )
                }
              }
            },
            [_vm._v("添加")]
          ),
          _vm._v(" "),
          _c(
            "a-button",
            {
              staticClass: "admin_delete_btn",
              attrs: { type: "danger", icon: "delete" },
              on: { click: _vm.del }
            },
            [_vm._v("批量删除")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "admin_table_list" },
        [
          _c("a-table", {
            attrs: {
              columns: _vm.columns,
              "data-source": _vm.list,
              scroll: { x: 2048, y: 400 },
              pagination: false,
              "row-selection": {
                selectedRowKeys: _vm.selectedRowKeys,
                onChange: _vm.onSelectChange
              },
              "row-key": "id"
            },
            scopedSlots: _vm._u([
              {
                key: "id",
                fn: function(record) {
                  return _c(
                    "div",
                    {
                      on: {
                        click: function($event) {
                          return _vm.handleIdClick(record)
                        }
                      }
                    },
                    [_vm._v(_vm._s(record.id))]
                  )
                }
              },
              {
                key: "name",
                fn: function(record) {
                  return _c(
                    "div",
                    {},
                    [
                      _c("a-icon", {
                        staticStyle: { "font-size": "24px" },
                        attrs: {
                          type: "play-circle",
                          theme: "twoTone",
                          "two-tone-color": "#eb2f96",
                          spin: _vm.loading_start["_" + record.id]
                        },
                        on: {
                          click: function($event) {
                            return _vm.handleNameClick(record)
                          }
                        }
                      }),
                      _vm._v(
                        "\n                " +
                          _vm._s(record.name) +
                          "\n            "
                      )
                    ],
                    1
                  )
                }
              },
              {
                key: "schedule_type",
                fn: function(record) {
                  return _c("div", {}, [
                    _vm._v(
                      "\n                " +
                        _vm._s(
                          _vm.dictionary.schedule_type[
                            record.schedule_type %
                              _vm.dictionary.schedule_type.length
                          ]
                        ) +
                        "\n            "
                    )
                  ])
                }
              },
              {
                key: "once",
                fn: function(record) {
                  return _c("div", {}, [
                    _vm._v(
                      "\n                " +
                        _vm._s(
                          _vm.dictionary.once[
                            record.once % _vm.dictionary.once.length
                          ]
                        ) +
                        "\n            "
                    )
                  ])
                }
              },
              {
                key: "overlapping",
                fn: function(record) {
                  return _c("div", {}, [
                    _vm._v(
                      "\n                " +
                        _vm._s(
                          _vm.dictionary.overlapping[
                            record.overlapping %
                              _vm.dictionary.overlapping.length
                          ]
                        ) +
                        "\n            "
                    )
                  ])
                }
              },
              {
                key: "one_server",
                fn: function(record) {
                  return _c("div", {}, [
                    _vm._v(
                      "\n                " +
                        _vm._s(
                          _vm.dictionary.one_server[
                            record.one_server % _vm.dictionary.one_server.length
                          ]
                        ) +
                        "\n            "
                    )
                  ])
                }
              },
              {
                key: "background",
                fn: function(record) {
                  return _c("div", {}, [
                    _vm._v(
                      "\n                " +
                        _vm._s(
                          _vm.dictionary.background[
                            record.background % _vm.dictionary.background.length
                          ]
                        ) +
                        "\n            "
                    )
                  ])
                }
              },
              {
                key: "maintenance",
                fn: function(record) {
                  return _c("div", {}, [
                    _vm._v(
                      "\n                " +
                        _vm._s(
                          _vm.dictionary.maintenance[
                            record.maintenance %
                              _vm.dictionary.maintenance.length
                          ]
                        ) +
                        "\n            "
                    )
                  ])
                }
              },
              {
                key: "status",
                fn: function(record) {
                  return _c("a-switch", {
                    attrs: {
                      loading: _vm.loading_status["_" + record.id],
                      "checked-children": _vm.dictionary.status.enabled,
                      "un-checked-children": _vm.dictionary.status.disabled,
                      "default-checked": record.status === 1
                    },
                    on: {
                      change: function($event) {
                        return _vm.onStatusChange(record)
                      }
                    }
                  })
                }
              },
              {
                key: "action",
                fn: function(rows) {
                  return _c(
                    "span",
                    {},
                    [
                      _c(
                        "a-button",
                        {
                          attrs: { icon: "edit" },
                          on: {
                            click: function($event) {
                              return _vm.$router.push(
                                "/Admin/goodcatch/m/core/schedules/form/" +
                                  rows.id
                              )
                            }
                          }
                        },
                        [_vm._v("编辑")]
                      )
                    ],
                    1
                  )
                }
              }
            ])
          }),
          _vm._v(" "),
          _vm.total > 0
            ? _c(
                "div",
                { staticClass: "admin_pagination" },
                [
                  _c("a-pagination", {
                    attrs: {
                      "page-size": _vm.params.per_page,
                      total: _vm.total,
                      "show-less-items": ""
                    },
                    on: {
                      "update:pageSize": function($event) {
                        return _vm.$set(_vm.params, "per_page", $event)
                      },
                      "update:page-size": function($event) {
                        return _vm.$set(_vm.params, "per_page", $event)
                      },
                      change: _vm.onChange
                    },
                    model: {
                      value: _vm.params.page,
                      callback: function($$v) {
                        _vm.$set(_vm.params, "page", $$v)
                      },
                      expression: "params.page"
                    }
                  })
                ],
                1
              )
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "a-modal",
        {
          attrs: { title: "任务详情" },
          model: {
            value: _vm.logs.show,
            callback: function($$v) {
              _vm.$set(_vm.logs, "show", $$v)
            },
            expression: "logs.show"
          }
        },
        [
          _c(
            "template",
            { slot: "footer" },
            [
              _c(
                "a-button",
                {
                  key: "submit",
                  attrs: { type: "primary" },
                  on: {
                    click: function() {
                      return (this$1.logs.show = false)
                    }
                  }
                },
                [_vm._v("\n                知道了\n            ")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("a-table", {
            attrs: {
              columns: _vm.logs.columns,
              "data-source": _vm.logs.list,
              pagination: false,
              "row-key": "id"
            }
          }),
          _vm._v(" "),
          _vm.logs.total > 0
            ? _c(
                "div",
                { staticClass: "admin_pagination" },
                [
                  _c("a-pagination", {
                    attrs: {
                      "page-size": _vm.logs.params.per_page,
                      total: _vm.logs.total,
                      "show-less-items": ""
                    },
                    on: {
                      "update:pageSize": function($event) {
                        return _vm.$set(_vm.logs.params, "per_page", $event)
                      },
                      "update:page-size": function($event) {
                        return _vm.$set(_vm.logs.params, "per_page", $event)
                      },
                      change: _vm.onChangeLogs
                    },
                    model: {
                      value: _vm.logs.params.page,
                      callback: function($$v) {
                        _vm.$set(_vm.logs.params, "page", $$v)
                      },
                      expression: "logs.params.page"
                    }
                  })
                ],
                1
              )
            : _vm._e()
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Admin/schedules/index.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/Admin/schedules/index.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_17802ff0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=17802ff0&scoped=true& */ "./resources/js/views/Admin/schedules/index.vue?vue&type=template&id=17802ff0&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/views/Admin/schedules/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_17802ff0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_17802ff0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "17802ff0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Admin/schedules/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Admin/schedules/index.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/Admin/schedules/index.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/schedules/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Admin/schedules/index.vue?vue&type=template&id=17802ff0&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/views/Admin/schedules/index.vue?vue&type=template&id=17802ff0&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_17802ff0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=17802ff0&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/schedules/index.vue?vue&type=template&id=17802ff0&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_17802ff0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_17802ff0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);