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
            <a-col v-if="!!left" :flex="leftWidth + 'px'" :style="{ flex: '0 0 ' + width + 'px'}" :class="{ 'container-left' : !!left, 'loading-left': !!left && left.loading }">
                <a-spin size="small" v-show="!!left && left.loading"/>
                <a-input-search
                        v-show="!!left && !left.loading"
                        v-if="!!left.showSearch"
                        v-model="searchValue"
                        style="margin-bottom: 8px"
                        :style="{ maxWidth: leftWidth + 'px' }"
                        placeholder="搜索"
                        @change="onSearchLeft" />
                <a-tree
                    v-if="!!leftData && leftData.length > 0"
                    :defaultExpandAll="!!left.defaultExpandAll"
                    :auto-expand-parent="!!left.autoExpandParent"
                    :expanded-keys="leftExpandedKeys"
                    :multiple="!!left.multiple"
                    @select="onSelectLeft"
                    @expand="onExpandLeft"
                    :tree-data="leftData"
                    show-line
                    :replace-fields="leftReplaceFields">
                    <a-icon slot="switcherIcon" type="down" />
                    <div slot="title" slot-scope="{ dataRef }">
                        <slot name="leftTitle" :data="dataRef" :search="searchValue">
                            <span v-if="dataRef.name.indexOf(searchValue) > -1">
                              {{ dataRef.name.substr(0, dataRef.name.indexOf(searchValue)) }}
                              <span style="color: #f50">{{ searchValue }}</span>
                              {{ dataRef.name.substr(dataRef.name.indexOf(searchValue) + searchValue.length) }}
                            </span>
                            <span v-else>{{ dataRef.name }}</span>
                        </slot>
                    </div>
                </a-tree>
                <p v-if="(!leftData || leftData.length === 0) && (!left || !left.loading)">没有找到更多的数据...</p>
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
                    :filter-option="filterTransferOptions"
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
*********************
数据源配置示例与说明
*********************

左数据源
    left: {
        loading: false, // 加载状态
        api: 'http://xxx/yyy/zzz', // 数据请求地址
        defaultExpandAll: false, // 默认不全部展开
        autoExpandParent: false, // 默认不展开父级
        showSearch: false, // 显示搜索框
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
            transform ({data, selectedKeys, selects }) { // 数据转换的回调
                return data;
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
            transform ({data, selectedKeys, selects }) { // 数据转换的回调
                return data;
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
        },
        filter (inputValue, item) { // 返回 bool 过滤选项
            return item.title.indexOf(inputValue) !== -1;
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
        },
        leftReplaceFields: {
            type: Object,
            default() {
                return {
                    children:'children',
                    title:'name',
                    key:'id',
                    value: 'id'
                }
            }
        }
    },
    data() {
        return {
            width: this.leftWidth, // 左侧数据容器的初始宽度
            leftData: [], // 左侧数据列表
            source: [], // 右侧来源数据列表
            selectedKeys: [], // 右侧被默认勾选的内容
            targetKeys: [], // 右侧目标数据泪飙
            leftSelectedKeys: undefined,
            leftExpandedKeys: undefined,
            leftSelectedNodes: undefined,
            searchValue: '',
            searchLoading: false
        };
    },
    methods: {

        /**
         * 拖动效果触发函数
         * @param x
         * @param y
         */
        onDrag: function(x, y) {
            this.width = Math.max(x, this.leftWidth);
        },

        /**
         * 过滤搜索框
         * @param inputValue
         * @param item
         */
        filterTransferOptions(inputValue, item) {
            if(!!this.right && this.right.filter === 'function'){
                return this.right.filter(inputValue, item);
            }
            return item.title.indexOf(inputValue) !== -1;
        },

        /**
         * 加载左侧主选择框树型数据
         */
        loadLeftData(){
            if(!! this.left && ! this.$isEmpty(this.left.api)){ // 组件需设置好请求地址
                this.left.loading = true; // 更改表格加载状态
                this.reset();
                const search = !! this.left ? this.search.params : {};
                this.leftData = [];
                this.$get(this.left.api, Object.assign({}, search, this.left.params)).then(res=>{
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
                                this.source = this.right.source.transform({data: res.data, selectedKeys: this.leftSelectedKeys, selects: this.leftSelectedNodes });
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
                    this.source = this.right.source.transform({data: this.right.source.data, selectedKeys: this.leftSelectedKeys, selects: this.leftSelectedNodes })
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
                                    this.selectedKeys = this.right.default.transform({data: res.data, selectedKeys: this.leftSelectedKeys, selects: this.leftSelectedNodes });
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
                                this.targetKeys = this.right.target.transform({data: res.data, selectedKeys: this.leftSelectedKeys, selects: this.leftSelectedNodes })
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
            this.$emit('change', {
                targetKeys,
                direction,
                moveKeys,
                selectedKeys: this.leftSelectedKeys,
                selects: this.leftSelectedNodes,
                data: this.source.filter(d => moveKeys.includes(d.key))
            });
        },

        onRightSelectChange(sourceSelectedKeys, targetSelectedKeys){
            this.selectedKeys = (sourceSelectedKeys || []).concat((targetSelectedKeys || []));
            if(!this.left){
                this.$emit('select', { selectedKeys: this.selectedKeys, selects: this.source.filter(s => this.selectedKeys.includes(s.key)) });
            }
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

        onExpandLeft(expandedKeys) {
            this.leftExpandedKeys = expandedKeys;
            this.left.autoExpandParent = false;
        },
        onSearchLeft(e) {
            const value = e.target.value;

            if(!! this.leftExpandedKeys && this.leftExpandedKeys.length > 0){
                this.leftExpandedKeys = [];
            }

            if(!this.searchLoading){
                setTimeout(() => {
                    this.leftExpandedKeys = this.grabTreeNodes(this.leftData, node => {
                        return node.hasOwnProperty(this.leftReplaceFields.title)
                            && !!node[this.leftReplaceFields.title]
                            && node[this.leftReplaceFields.title].indexOf(value) > -1
                    })
                        .filter(node => node.hasOwnProperty(this.leftReplaceFields.key))
                        .map(node => node[this.leftReplaceFields.key]);
                    this.searchLoading = false;
                }, 500);
            }
            this.searchLoading = true;


            this.left.autoExpandParent = true;
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

        /**
         * 替换 API 参数
         *
         * replacements 替换 API 字符串中包含 {参数名} 的参数，值来自于左侧选择的内容中对应键名的值
         * parameters 作为字段映射，值来自于左侧选择的内容中对应键名的值
         *
         *
         * @param api
         * @param params
         * @param config
         * @returns {{api, params}}
         */
        handleApiParamsReplacement(api, params, config){
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

        /**
         * 左侧数据源根据所选查出对应的节点列表
         *
         * @param nodes
         * @returns {*[]}
         */
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
                        } else {
                            if(this.leftSelectedKeys.includes(n.id)){
                                res.push(n);
                            }
                        }
                    })
                }
            }
            return res;
        },

        grabTreeNodes(treeData, cb){
            let res = [];
            if(!!treeData && treeData.length > 0){
                treeData.forEach(n => {
                    if(!!cb && !!cb(n)){
                        res.push(n);
                    }
                    if(n.hasOwnProperty(this.leftReplaceFields.children) && !!n[this.leftReplaceFields.children].length > 0){
                        res = res.concat(this.grabTreeNodes(n[this.leftReplaceFields.children], cb));
                    }
                })
            }
            return res;
        },

        /**
         * 重置右侧数据源
         */
        reset(){
            this.source = [];
            this.selectedKeys = [];
            this.targetKeys = [];
            this.leftSelectedKeys = undefined;
            this.leftSelectedNodes = undefined;
        },

        /**
         * 初始化
         */
        onload(){
            // 如果配置了左测数据源，初始化顺序改变
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
.loading-left {
    background-color: #fcfcfc;
}
</style>