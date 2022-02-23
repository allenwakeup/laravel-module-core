<template>
    <div>
        <search
            v-if="!!search"
            :search-config="search.fields"
            :auto-params="search.params"
            @searchParams="handleSearchParams"/>

        <a-row type="flex" :gutter="16" style="position:relative;">
            <vue-draggable-resizable
                    v-if="!!left"
                    :w="10"
                    :x="leftWidth"
                    :z="1"
                    axis="x"
                    class="draggable-handle"
                    :style="{left: width + 'px'}"
                    :parent="true"
                    @dragging="onDrag"
                    :resizable="false"
            >
            </vue-draggable-resizable>
            <a-col v-if="!!left" :flex="leftWidth + 'px'" :style="{ flex: '0 0 ' + width + 'px'}" :class="{ 'container-left' : !!left }">
                <a-tree
                        :multiple="!!left.multiple"
                        @select="onSelectLeft"
                        :tree-data="leftData"
                        show-line
                        :replace-fields="{children:'children', title:'name', key:'id', value: 'id' }">
                    <a-icon slot="switcherIcon" type="down" />
                </a-tree>

            </a-col>
            <a-col flex="auto" :class="{ 'container-right' : !!left }">
                <a-transfer
                    :data-source="source"
                    :selected-keys="selectedKeys"
                    :target-keys="targetKeys"
                    :titles="titles"
                    :list-style="{maxHeight: '100%', width: width + 'px'}"
                    :operations="operations"
                    show-search
                    :filter-option="(inputValue, item) => item.title.indexOf(inputValue) !== -1"
                    :show-select-all="false"
                    @change="onRightChange"
                    @selectChange="onRightSelectChange"
                >
                    <template
                        slot="children"
                        slot-scope="{props: { direction, filteredItems, selectedKeys, disabled: listDisabled },on: { itemSelectAll, itemSelect },}">
                        <a-table
                            :row-selection="getRowSelection({ disabled: listDisabled, selectedKeys, itemSelectAll, itemSelect })"
                            :columns="direction === 'left' ? right.source.columns : right.target.columns"
                            :components="direction === 'left' ? right.source.components : right.target.components"
                            :data-source="filteredItems"
                            :loading="direction === 'left' ? right.source.loading : right.target.loading"
                            size="small"
                            :style="{ pointerEvents: listDisabled ? 'none' : null }"
                            :custom-row="({ key, disabled: itemDisabled }) => ({
                              on: {
                                click: () => {
                                  if (itemDisabled || listDisabled) return;
                                  itemSelect(key, !selectedKeys.includes(key));
                                },
                              },
                            })"
                        />
                    </template>
                    <span slot="notFoundContent">
                      没有找到更多的数据
                    </span>
                </a-transfer>
            </a-col>
        </a-row>
    </div>
</template>
<script>
/*
左数据源
    left: {
        loading: false, // 加载状态
        api: 'http://xxx/yyy/zzz', // 数据请求地址
        transform (list_data) { // 数据转换的回调
            return list_data;
        },
        data: [], // 静态数据，仅当「api」未设置
        multiple: false, // 是否支持多选
        params: {} // 查询参数,
        load: search => new Promise((resolve, reject) => {
            if(true) {
                resolve([]);
            } else {
                reject([]);
            }
        })
    }
右数据源
    right: {
        // 来源数据
        source: {
            loading: false, 加载状态
            api: 'http://xxx/yyy/zzz/{param_1}/{param_n}/source', // 数据请求地址
            columns: [
                {title: '名称', dataIndex: 'name', width: 90, key: 'name', ellipsis: true,},
            ],
            transform (list_data) { // 数据转换的回调
                return list_data;
            },
            data: [], // 静态数据，仅当「api」未设置
            params: {} // 查询参数
            join: ',', // 可选，多选时参数拼接的连接符
            replacements: [ // API请求地址替换文本，替换的名称与列表中的模型属性名相同，文本为属性值，支持多选
                'param_1',
                .
                .
                .
                'param_n'
            ]
            replacement: 'param_1',
            parameters: [ // 形态一：数组型，请求参数载荷
                'id', 'name'  // 取列表中模型对应的属性名称所对应的值，支持多选
            ],
            parameters: [ // 形态二：键值型，请求参数载荷
                id: 'param_1', // 与形态一不同的是生成的参数名支持映射
                name: 'param_n'
            ],
            parameter: 'id' // 单一参数，效果同 parameters: [ parameter ]
        },
        // 已设置的数据
        target: {
            loading: false,
            api: 'http://xxx/yyy/zzz/{param_1}/{param_n}/target', // 数据请求地址
            columns: [
                {title: '名称', dataIndex: 'name', width: 90, key: 'name', ellipsis: true,},
            ],
            transform (list_data) {
                return list_data;
            },
            params: {} // 查询参数
            join: ',',
            replacements: []
            replacement: '',
            parameters: [],
            parameters: [],
            parameter: ''
        },
        default: {
            api: 'http://xxx/yyy/zzz/{param_1}/{param_n}/default',
            transform (list_data) {
                return list_data;
            },
            data: [],
            params: {}
            join: ',',
            replacements: []
            replacement: '',
            parameters: [],
            parameters: [],
            parameter: ''
        }
    }

 */
import difference from 'lodash/difference';
import { isArray, isEmpty } from '@/plugins/function'
import Search from '@/components/admin/search'
export default {
    components: { Search },
    props: {
        titles: {
            type: Array
        },
        operations: {
            type: Array
        },
        search: {
            type: Object
        },
        left: {
            type: Object
        },
        right: {
            type: Object,
            required: true,
            default() {
                return {
                    source: {},
                    target: {}
                }
            }
        },
        leftWidth: {
            type: Number,
            default: 300
        }
    },
    data() {
        return {
            width: this.leftWidth,
            loading: false,
            leftData: [],
            source: [],
            selectedKeys: [],
            targetKeys: [],
            leftSelectedKeys: undefined,
            leftSelectedNodes: undefined
        };
    },
    methods: {

        onDrag: function(x, y) {
            this.width = Math.max(x, this.leftWidth);
        },

        loadLeftData(){
            if(!! this.left && ! this.$isEmpty(this.left.api)){ // 组件需设置好请求地址
                this.left.loading = true; // 更改表格加载状态
                const search = !! this.left ? this.search.params : {};
                this.$get(this.left.api, Object.assign({}, search, this.left.params)).then(res=>{
                    this.leftData = [];
                    if (res.code === 200){
                        if(!! res.data){
                            if(typeof this.left.transform === 'function'){
                                this.leftData = this.left.transform(res.data)
                            } else {
                                this.leftData = res.data;
                            }
                        }
                    } else {
                        this.$message.error(res.msg);
                    }
                    this.left.loading = false;
                }, err=>{
                    this.$message.error(err);
                    this.left.loading = false;
                });
            } else if(!! this.left && !! this.left.data) {
                if(typeof this.left.transform === 'function'){
                    this.leftData = this.left.transform(this.right.source.data)
                } else {
                    this.leftData = this.left.data;
                }
            } else if(!! this.left && !! this.left.load) {
                if(typeof this.left.load === 'function'){
                    this.left.loading = true; // 更改表格加载状态
                    const search = !! this.left ? this.search.params : {};
                    this.left.load(Object.assign({}, search, this.left.params)).then(data => {
                        this.left.loading = false;
                        if(typeof this.left.transform === 'function'){
                            this.leftData = this.left.transform(data)
                        } else {
                            this.leftData = data;
                        }
                    }, err=>{
                        this.left.loading = false;
                    })
                } else {
                    this.leftData = this.left.data;
                }
            } else {
                this.$message.error('未定义数据源.');
            }
        },

        loadRightSourceData(){
            if(!! this.right && !! this.right.source && ! this.$isEmpty(this.right.source.api)){ // 组件需设置好请求地址
                this.right.source.loading = true; // 更改表格加载状态
                const search = !! this.left ? {} : this.search.params;
                const { api, params } = this.handleApiParamsReplacement(
                    this.right.source.api,
                    Object.assign({}, search, this.right.source.params),
                    this.right.source
                );
                this.source = [];
                this.$get(api, params).then(res=>{
                    if (res.code === 200){
                        if(!! res.data){
                            if(typeof this.right.source.transform === 'function'){
                                this.source = this.right.source.transform(res.data);
                            }else {
                                this.source = res.data;
                            }
                            if(this.source.length > 0){
                                this.loadRightDefault();
                            }
                        }
                    } else {
                        this.$message.error(res.msg);
                    }
                    this.right.source.loading = false;
                }, err=>{
                    this.$message.error(err);
                    this.right.source.loading = false;
                });
            } else if(!! this.right && !! this.right.source && !!this.right.source.data) {
                if(typeof this.right.source.transform === 'function'){
                    this.source = this.right.source.transform(this.right.source.data)
                } else {
                    this.source = this.right.source.data;
                }
            } else {
                this.$message.error('未定义数据源.');
            }
        },

        loadRightDefault(){
            if(!! this.right && !! this.right.default){ // 组件需设置好请求地址
                if(this.$isEmpty(this.right.default.api)){
                    this.selectedKeys = this.right.default.data || [];
                } else {
                    const search = !! this.left ? {} : this.search.params;
                    const { api, params } = this.handleApiParamsReplacement(
                        this.right.default.api,
                        Object.assign({}, search, this.right.default.params),
                        this.right.default
                    );
                    this.selectedKeys = [];
                    this.$get(api, params).then(res=>{
                        if (res.code === 200){
                            if(!! res.data){
                                if(typeof this.right.default.transform === 'function'){
                                    this.selectedKeys = this.right.default.transform(res.data);
                                }else {
                                    this.selectedKeys = res.data;
                                }
                            }
                        } else {
                            this.$message.error(res.msg);
                        }
                    }, err=>{
                        this.$message.error(err);
                    });
                }
            }
        },

        loadRightTargetData(){
            if(!! this.right && !! this.right.target && ! this.$isEmpty(this.right.target.api)){ // 组件需设置好请求地址
                this.right.target.loading = true; // 更改表格加载状态
                const search = !! this.left ? {} : this.search.params;
                const { api, params } = this.handleApiParamsReplacement(
                    this.right.target.api,
                    Object.assign({}, search, this.right.target.params),
                    this.right.target
                );

                this.targetKeys = [];
                this.$get(api, params).then(res=>{

                    if (res.code === 200){
                        if(!! res.data){
                            if(typeof this.right.target.transform === 'function'){
                                this.targetKeys = this.right.target.transform(res.data)
                            } else {
                                this.targetKeys = res.data;
                            }
                        }
                    } else {
                        this.$message.error(res.msg);
                    }
                    this.right.target.loading = false;
                }, err=>{
                    this.$message.error(err);
                    this.right.target.loading = false;
                });
            } else {
                this.$message.error('未定义数据源.');
            }
        },

        handleSearchParams(search){
            if(!!this.search){
                this.search.params = search;
            }
            this.onload();
        },

        onRightChange(targetKeys, direction, moveKeys) {
            this.targetKeys = targetKeys;
            const selectedKeys = this.leftSelectedKeys;
            const selects = this.leftSelectedNodes;

            this.$emit('change', { targetKeys, direction, moveKeys, selectedKeys, selects, data: this.source.filter(d => moveKeys.includes(d.key)) });
        },

        onRightSelectChange(sourceSelectedKeys, targetSelectedKeys){
            this.selectedKeys = (sourceSelectedKeys || []).concat((targetSelectedKeys || []));
        },

        onSelectLeft(selectedKeys, info) {

            if(selectedKeys.length > 0){
                this.leftSelectedKeys = selectedKeys;
                this.leftSelectedNodes = this.findLeftSelectedNodes(this.leftData);

                this.$emit('select', { selectedKeys, selects: this.leftSelectedNodes });

                this.loadRightSourceData();
                this.loadRightTargetData();
            }
        },

        getRowSelection({ disabled, selectedKeys, itemSelectAll, itemSelect }) {
            return {
                columnWidth: 25,
                getCheckboxProps: item => ({ props: { disabled: disabled || item.disabled } }),
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .filter(item => !item.disabled)
                        .map(({ key }) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, selectedKeys)
                        : difference(selectedKeys, treeSelectedKeys);
                    itemSelectAll(diffKeys, selected);
                },
                onSelect({ key }, selected) {
                    itemSelect(key, selected);
                },
                selectedRowKeys: selectedKeys,
            };
        },

        handleApiParamsReplacement(api, params, config){
            const { leftData } = this;
            if(!!this.leftSelectedKeys && this.leftSelectedKeys.length > 0){

                if(!!this.leftSelectedNodes && this.leftSelectedNodes.length > 0){

                    const replacements = [].concat(config.replacements || []);
                    const parameters = isArray(config.parameters) ? config.parameters.reduce((kv, parameter) => {
                        kv[parameter] = parameter;
                        return kv;
                    }, {}) : (config.parameters || {});

                    if(! this.$isEmpty(config.replacement)){
                        replacements.push(config.replacement);
                    }
                    if(! this.$isEmpty(config.parameter)) {
                        parameters[config.parameter] = config.parameter;
                    }

                    if(replacements.length > 0){
                        replacements.forEach(replacement => {
                            api = api.replace(`{${replacement}}`, this.leftSelectedNodes.reduce((vals, selected) => {
                                vals.push(selected[replacement]);
                                return vals;
                            }, []).join(config.join || ','));
                        });
                    }
                    if(Object.keys(parameters).filter(p => parameters.hasOwnProperty(p)).length > 0){
                        Object.keys(parameters)
                            .filter(k => parameters.hasOwnProperty(k) && !isEmpty(parameters[k]))
                            .forEach(k => params [parameters[k]] = left_selected
                                .reduce((vals, selected) => {
                                    vals.push(selected[k]);
                                    return vals;
                                }, [])
                                .join(config.join || ',')
                            )
                    }
                }
            }

            return {api, params};
        },

        findLeftSelectedNodes(nodes = []){
            let res = [];
            if(!! this.leftSelectedKeys){
                if(!!nodes && nodes.length > 0){
                    nodes.forEach(n => {
                        if(!! n.children && n.children.length > 0){
                            res = res.concat(n.children.filter(
                                c =>
                                    (!c.children || c.children.length === 0)
                                    && this.leftSelectedKeys.includes(c.id)
                            ));
                            n.children
                                .filter(c => !! c.children && c.children.length > 0)
                                .forEach(c => {
                                    res = res.concat(this.findLeftSelectedNodes(c.children));
                                })
                        }
                    })
                }
            }
            return res;
        },

        onload(){
            if(!! this.left){
                this.loadLeftData();
            } else {
                this.loadRightSourceData();
                this.loadRightTargetData();
            }

        },
    },
    created() {
        this.onload();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
    .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected{
        background: #13c2c2!important;
    }
.draggable-handle {
    position: absolute;
    height: 100% !important;
    cursor: col-resize;
    touch-action: none;
    border: none;
    transform: none !important;
    box-shadow: inset 0 0 3px #999999;
}
.container-left {
    overflow-x:hidden;
    box-shadow: inset -0.5px 0 1px #cfcfcf;
}
.container-right {
    box-shadow: inset 0 -0.5px 1px #cfcfcf;
}
</style>