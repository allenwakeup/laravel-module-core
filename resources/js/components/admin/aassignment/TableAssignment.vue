<template>
    <div>
        <search
            v-if="!!search"
            :search-config="search.fields"
            :auto-params="search.params"
            @searchParams="handleSearchParams"/>

        <a-row type="flex" :gutter="16">
            <vue-draggable-resizable
                    v-if="!!this.left"
                    :w="5"
                    :x="leftWidth"
                    :z="1"
                    axis="x"
                    :parent="true"
                    @dragging="onDrag"
                    :resizable="false"
            >
                <a-icon type="pause" class="draggable-icon" />
            </vue-draggable-resizable>
            <a-col v-if="!!this.left" :flex="leftWidth + 'px'" :style="{ flex: '0 0 ' + width + 'px'}" :class="{ 'container-left' : !!this.left }">
                <a-tree
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
                    :target-keys="targetKeys"
                    :titles="titles"
                    :list-style="{maxHeight: '100%', width: width + 'px'}"
                    :operations="operations"
                    show-search
                    :filter-option="(inputValue, item) => item.title.indexOf(inputValue) !== -1"
                    :show-select-all="false"
                    @change="onChange"
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
            targetKeys: [],
            leftSelectedKey: undefined
        };
    },
    methods: {

        onDrag: function(x, y) {
            this.width = x;
        },

        loadLeftData(){
            if(!! this.left && ! this.$isEmpty(this.left.api)){ // 组建需设置好请求地址
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
            if(!! this.right && !! this.right.source && ! this.$isEmpty(this.right.source.api)){ // 组建需设置好请求地址
                this.right.source.loading = true; // 更改表格加载状态
                const search = !! this.left ? {} : this.search.params;
                const { api, params } = this.handleApiParamsReplacement(
                    this.right.source.api,
                    Object.assign({}, search, this.right.source.params)
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

        loadRightTargetData(){
            if(!! this.right && !! this.right.target && ! this.$isEmpty(this.right.target.api)){ // 组建需设置好请求地址
                this.right.target.loading = true; // 更改表格加载状态
                const search = !! this.left ? {} : this.search.params;
                const { api, params } = this.handleApiParamsReplacement(
                    this.right.target.api,
                    Object.assign({}, search, this.right.target.params)
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

        onChange(targetKeys, direction, moveKeys) {
            this.targetKeys = targetKeys;
            this.$emit('change', { targetKeys, direction, moveKeys, data: this.source.filter(d => moveKeys.includes(d.key)) });
        },

        onSelectLeft(selectedKeys, info) {

            if(selectedKeys.length > 0){
                this.leftSelectedKey = selectedKeys [0];
                this.loadRightSourceData();
                this.loadRightTargetData();
            }
        },

        getRowSelection({ disabled, selectedKeys, itemSelectAll, itemSelect }) {
            return {
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

        handleApiParamsReplacement(api, params){
            const search = !! this.left ? this.search.params : {};

            const { leftData } = this;

            if(!!this.leftSelectedKey){

                const left_selected = leftData.find(d => d.key === this.leftSelectedKey);

                const replacements = [].concat(this.right.source.replacements);
                const parameters = [].concat(this.right.source.parameters);
                if(! this.$isEmpty(this.right.source.replacement)){
                    replacements.push(this.right.source.replacement);
                } else if(! this.$isEmpty(this.right.source.parameter)) {
                    parameters.push(this.right.source.parameter);
                }
                if(!!left_selected){
                    if(replacements.length > 0){
                        replacements.forEach(replacement => {
                            api = api.replace(`{${replacement}}`, left_selected[replacement]);
                        });
                    }
                    if(parameters.length > 0){
                        parameters.forEach(parameter => {
                            params [parameter] = left_selected[replacement];
                        });
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
.draggable-icon {
    position: absolute;
    right: -11px;
    top: 5px;
    cursor: col-resize;
}
.container-left {
    box-shadow: inset -0.5px 0 1px #cfcfcf;
}
.container-right {
    box-shadow: inset 0 -0.5px 1px #cfcfcf;
}
</style>