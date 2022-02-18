<template>
    <div>
        <search
            v-if="!!search"
            :search-config="search.fields"
            :auto-params="search.params"
            @searchParams="handleSearchParams"/>

        <a-row type="flex" :gutter="16" style="position:relative;">
            <vue-draggable-resizable
                    v-if="!!this.left"
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
            <a-col v-if="!!this.left" :flex="leftWidth + 'px'" :style="{ flex: '0 0 ' + width + 'px'}" :class="{ 'container-left' : !!this.left }">
                <a-tree
                        :multiple="!!left.multiple"
                        @select="onSelectLeft"
                        :tree-data="leftData"
                        show-line
                        :replace-fields="{children:'children', title:'name', key:'id', value: 'id' }">
                    <a-icon slot="switcherIcon" type="down" />
                </a-tree>

            </a-col>
            <a-col flex="auto" :class="{ 'container-right' : !!this.left }">
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
            leftSelectedKeys: undefined
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
            } else {
                this.$message.error('未定义数据源.');
            }
        },
        
        loadRightDefault(){
            if(!! this.right && !! this.right.default){ // 组件需设置好请求地址
                if(this.$isEmpty(this.right.default.api)){
                    this.selectedKeys = this.right.default.selectedKeys || [];
                    console.log(this.selectedKeys)
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
            this.$emit('change', { targetKeys, direction, moveKeys, data: this.source.filter(d => moveKeys.includes(d.key)) });
        },

        onRightSelectChange(sourceSelectedKeys, targetSelectedKeys){
            this.selectedKeys = (sourceSelectedKeys || []).concat((targetSelectedKeys || []));
        },

        onSelectLeft(selectedKeys, info) {

            if(selectedKeys.length > 0){
                this.leftSelectedKeys = selectedKeys;
                                
                this.loadRightSourceData();
               // this.loadRightTargetData();
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

                const left_selected = leftData.filter(d => this.leftSelectedKeys.includes(d.key));

                const replacements = [].concat(config.replacements);
                const parameters = isArray(config.parameters) ? config.parameters.reduce((kv, parameter) => {
                    kv[parameter] = parameter;
                    return kv;
                }, {}) : config.parameters;

                if(! this.$isEmpty(config.replacement)){
                    replacements.push(config.replacement);
                } else if(! this.$isEmpty(config.parameter)) {
                    parameters[config.parameter] = config.parameter;
                }
                if(!!left_selected && left_selected.length > 0){
                    if(replacements.length > 0){
                        replacements.forEach(replacement => {
                            api = api.replace(`{${replacement}}`, left_selected.reduce((vals, selected) => {
                                vals.push(selected[replacement]);
                                return vals;
                            }, []).join(','));
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
                                .join(',')
                            )
                    }
                }
            }

            return {api, params};
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
    box-shadow: inset -0.5px 0 1px #cfcfcf;
}
.container-right {
    box-shadow: inset 0 -0.5px 1px #cfcfcf;
}
</style>