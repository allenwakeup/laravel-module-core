<template>
    <div>
        <div class="admin_table_page_title">数据路径列表</div>
        <div class="unline underm"></div>


        <div class="admin_table_list">
	        <a-table
		        :size="sysSize"
		        :components="resizeableTitleComponents"
		        :columns="getCachedTableColumns(table.columns)"
		        :data-source="table.data"
		        :scroll="{ y: sysWindowHeight - 280 }"
		        :loading="table.loading"
		        :pagination="false"
		        :row-selection="{ columnWidth: 25, selectedRowKeys: table.selectedRowKeys, onChange: handleTableRowKeysChange }"
		        :row-key="table.rowId">

		        <template slot="title" slot-scope="currentPageData">

			        <search
				        :search-config="search.fields"
				        :auto-params="search.params"
				        @searchParams="handleTableSearchParams"/>
                    <div class="admin_table_handle_btn">
                        <a-button @click="$router.push($moduleUrl('data_routes/form'))" type="primary" :size="sysSize" icon="plus">添加</a-button>
                        <a-button class="admin_delete_btn" type="danger" :size="sysSize" icon="delete" @click="handleRemoveTableRows">批量删除</a-button>
                    </div>
                </template>

                <span slot="connection_id" slot-scope="record">
                    {{ record.connection ? (record.connection.datasource ? (record.connection.name + '(' + record.connection.datasource.name + ')') : record.connection.name) : '--' }}
                </span>
                <span slot="action" slot-scope="rows">
                    <a-button type="link" icon="edit" :size="sysSize" @click="$router.push($moduleUrl('data_routes/form/'+rows.id))">编辑</a-button>
                </span>
            </a-table>
	        <div class="admin_pagination" v-if="table.total > 0">
		        <a-pagination v-model="table.params.page" :size="sysSize" :page-size-options="table.pageSizeOptions" :total="table.total" @change="handleTablePageChange" show-less-items show-size-changer show-quick-jumper :page-size="table.params.per_page" @showSizeChange="handleTablePageSizeChange"/>
	        </div>
        </div>
    </div>
</template>

<script>
import Search from '@/components/admin/search'
import {MixinList, MixinStore} from '@/plugins/mixins/admin'

export default {
	mixins: [MixinList, MixinStore],
    components: { Search },
    props: {},
    data() {
      return {
          table: {
              actions: {
                  list: this.$api.adminDataRoutes,
                  remove: this.$api.adminDataRoutes
              },
              columns: [
                  {title:'#',dataIndex:'id',width: 80},
                  {title:'名称',dataIndex:'name', width: 200},
                  {title:'简称',dataIndex:'short', width: 180},
                  {title:'别名',dataIndex:'alias', width: 180},
                  {title:'首表名称',dataIndex:'from', width: 120},
                  {title:'首表表名',dataIndex:'table_from', width: 120},
                  {title:'尾表名称',dataIndex:'to', width: 120},
                  {title:'尾表表名',dataIndex:'table_to', width: 120},
                  {title:'目标表',dataIndex:'output', width: 220},
                  {title:'连接', scopedSlots:{ customRender: 'connection_id' }, width: 220},
                  {title:'描述',dataIndex:'description', width: 280},
                  {title:'创建时间',dataIndex:'created_at', width: 200},
                  {title:'更新时间',dataIndex:'updated_at', width: 200},
                  {title:'操作',fixed:'right',scopedSlots: { customRender: 'action' }},
              ],
          },
          search: {
              fields: [
                  {
                      label: '名称',
                      name: 'name',
                      type: 'text'
                  },
                  {
                      label: '简称',
                      name: 'short',
                      type: 'text'
                  },
                  {
                      label: '首表名称',
                      name: 'from',
                      type: 'text'
                  },
                  {
                      label: '首表表名',
                      name: 'table_from',
                      type: 'text'
                  },
                  {
                      label: '尾表名称',
                      name: 'to',
                      type: 'text'
                  },
                  {
                      label: '尾表表名',
                      name: 'table_to',
                      type: 'text'
                  },
                  {
                      label: '描述',
                      name: 'description',
                      type: 'text'
                  }
              ]
          }
      };
    },
    watch: {},
    computed: {},
    methods: {

        onload(){
            // 加载混入中的表格数据
            this.loadTableData();
        },
    },
    created() {
        this.onload();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>

</style>
