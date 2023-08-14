<template>
    <div>
        <div class="admin_table_page_title">数据库信息</div>
        <div class="unline underm"></div>


        <div class="admin_table_list">
            <a-row type="flex" :gutter="16">
                <a-col flex="350px">
	                <a-input-search
		                placeholder="搜索"
		                @search="onSearch"
	                />
	                <a-list
		                :size="sysSize"
		                class="list"
		                :style="{ height: (sysWindowHeight - 200) + 'px', padding: '5px 0' }"
		                :loading="loading"
		                item-layout="horizontal"
		                :data-source="data"
	                >


		                <a-list-item slot="renderItem" slot-scope="item, index" @click="showColumns(item.value)" :style="{color : (select_list_item === item.value ? '#c32617' : '')}">
			                <a-list-item-meta>
				                <span slot="title" :style="{color : (select_list_item === item.value ? '#c32617' : '')}">{{ item.schema + '.' + item.name }}</span>
			                </a-list-item-meta>
			                <div>
				                {{ item.rows }}
			                </div>
		                </a-list-item>
	                </a-list>
	                <p>共计{{ total }}条记录</p>


                </a-col>
                <a-col flex="auto">
	                <a-table
		                :size="sysSize"
		                :columns="columns"
		                :scroll="{ x: 'auto', y: 330 }"
		                :loading="table_loading"
		                :data-source="table_columns"
		                :pagination="false"
		                row-key="Field">

	                </a-table>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import Search from '@/components/admin/search'
import {MixinStore} from '@/plugins/mixins/admin'

export default {
    mixins: [MixinStore],
    components: { Search },
    props: {},
    data() {
        return {
            search: '',
            total:0, //总页数
            loading: true,
            select_list_item: null,
            list: [],
            table_columns: [],
            table_loading: false,
            columns:[
	            {
		            title: '表名称',
		            children: [
			            {title: '名称', dataIndex: 'Field', width: 180},
			            {title: '类型', dataIndex: 'Type', width: 120},
			            {title: '默认值', dataIndex: 'Default', width: 120},
			            {title: '描述', dataIndex: 'Extra', width: 180},
			            {title: '键', dataIndex: 'Key', width: 110},
			            {title: '是否空', dataIndex: 'Null', width: 80},
		            ]
	            },
	            ]
        };
    },
    watch: {},
    computed: {
        data(){
            return this.list.filter(item => item.name.indexOf(this.search) > -1)
        }
    },
    methods: {
        onload(){
            this.$get(this.$api.adminDatabases,{}).then(res=>{
                this.loading = false;
                this.total = res.data.total;
                this.list = res.data.data;
            });
        },
        onSearch(value){
            this.search = value;
        },
        showColumns(table){
            this.columns [0].title = table;
            this.table_loading = true;
            this.table_columns = [];
            this.select_list_item = table;
            this.$get(this.$api.adminDatabases,{ table }).then(res=>{
                this.table_columns = res.data.data;
                this.table_loading = false;
            });
        }
    },
    created() {
        this.onload();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.list{
    overflow: auto;
    padding: 8px 24px;
}
</style>
