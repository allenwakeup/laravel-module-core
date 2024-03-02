<template>
    <div>
        <div class="admin_table_page_title">附件列表</div>
        <div class="unline underm"></div>


        <div class="admin_table_list">
	        <a-table
		        :size="sysSize"
		        :components="resizeableTitleComponents"
		        :columns="getCachedTableColumns(table.columns)"
		        :data-source="table.data"
		        :scroll="{ x:true, y: sysWindowHeight - 280 }"
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
                        <a-button @click="$router.push($moduleUrl('attachments/form'))" type="primary" icon="plus">添加</a-button>
                        <a-button class="admin_delete_btn" type="danger" icon="delete" @click="handleRemoveTableRows">批量删除</a-button>
                    </div>
                </template>
                <span slot="action" slot-scope="rows">
                    <a-button icon="edit" @click="$router.push($moduleUrl('attachments/form/'+rows.id))">编辑</a-button>
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
                  list: this.$api.adminAttachments,
                  remove: this.$api.adminAttachments
              },
              columns: [
                  {title:'#',dataIndex:'id',fixed:'left'},
                  {title:'名称',dataIndex:'name'},
                  {title:'创建时间',dataIndex:'created_at'},
                  {title:'更新时间',dataIndex:'updated_at'},
                  {title:'操作',fixed:'right',scopedSlots: { customRender: 'action' }},
              ],
          },
          search: {
              fields: [
                  {
                      label: '名称',
                      name: 'name',
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
