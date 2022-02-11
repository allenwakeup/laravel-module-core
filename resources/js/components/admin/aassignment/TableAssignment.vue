<template>
    <div>
        <search
                v-if="!!search"
                :search-config="search.fields"
                :auto-params="search.params"
                @searchParams="handleSearchParams"/>
        <a-transfer
                :data-source="data"
                :target-keys="targetKeys"
                :titles="titles"
                :list-style="{maxHeight: '100%'}"
                :operations="operations"
                show-search
                :filter-option="(inputValue, item) => item.title.indexOf(inputValue) !== -1"
                :show-select-all="false"
                @change="onChange"
        >
            <template
                    slot="children"
                    slot-scope="{
          props: { direction, filteredItems, selectedKeys, disabled: listDisabled },
          on: { itemSelectAll, itemSelect },
        }"
            >
                <a-table
                        :row-selection="
            getRowSelection({ disabled: listDisabled, selectedKeys, itemSelectAll, itemSelect })
          "
                        :columns="direction === 'left' ? left.columns : right.columns"
                        :data-source="filteredItems"
                        :loading="direction === 'left' ? left.loading : right.loading"
                        size="small"
                        :style="{ pointerEvents: listDisabled ? 'none' : null }"
                        :custom-row="
            ({ key, disabled: itemDisabled }) => ({
              on: {
                click: () => {
                  if (itemDisabled || listDisabled) return;
                  itemSelect(key, !selectedKeys.includes(key));
                },
              },
            })
          "
                />
            </template>
            <span slot="notFoundContent">
              没有找到更多的数据
            </span>
        </a-transfer>

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
                type: Object,
                required: true
            },
            right: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                loading: false,
                data: [],
                targetKeys: [],
            };
        },
        methods: {
            onload(){
                if(!!this.left && !!this.left.api){
                    this.loadLeftData(this.left.api);
                }
                if(!!this.right && !!this.right.api){
                    this.loadRightData(this.right.api);
                }
            },

            loadLeftData(api){
                if(! this.$isEmpty(api)){ // 组建需设置好请求地址
                    this.left.loading = true; // 更改表格加载状态
                    this.$get(api, Object.assign({}, this.search.params, this.left.params)).then(res=>{
                        this.data = [];
                        if (res.code === 200){
                            if(!! res.data){
                                this.data = res.data;
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
            loadRightData(api){
                if(! this.$isEmpty(api)){ // 组建需设置好请求地址
                    this.right.loading = true; // 更改表格加载状态
                    this.$get(api).then(res=>{
                        this.targetKeys = [];
                        if (res.code === 200){
                            if(!! res.data){
                                this.targetKeys = res.data;
                            }
                        } else {
                            this.$message.error(res.msg);
                        }
                        this.right.loading = false;
                    }, err=>{
                        this.$message.error(err);
                        this.right.loading = false;
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
                this.$emit('change', { targetKeys, direction, moveKeys, data: this.data.filter(d => moveKeys.includes(d.key)) });
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
        },
        created() {
            this.onload();
        },
        mounted() {}
    };
</script>