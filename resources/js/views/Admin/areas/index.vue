<template>
    <div>
        <div class="admin_table_page_title">地区列表</div>
        <div class="unline underm"></div>


        <div class="admin_table_list">
            <a-table
                    size="small"
                    :columns="table.columns"
                    :data-source="table.data"
                    :scroll="{ y: sysWindowHeight - 280 }"
                    :loading="table.loading"
                    :pagination="false"
                    :row-selection="{ selectedRowKeys: table.selectedRowKeys, onChange: handleTableRowKeysChange }"
                    row-key="id">
                <template slot="title" slot-scope="currentPageData">
                    <search
                            :search-config="search.fields"
                            :auto-params="search.params"
                            @searchParams="handleTableSearchParams"
                            :export-config="exporting"
                            @handleExport="handleTableExport"/>
                    <div class="admin_table_handle_btn">
                        <a-button @click="$router.push('/Admin/goodcatch/m/core/areas/form')" type="primary" icon="plus">添加</a-button>
                        <a-button class="admin_delete_btn" type="danger" icon="delete" @click="handleRemoveTableRows">批量删除</a-button>
                    </div>
                </template>
                <span slot="code" slot-scope="record">
                    {{ !!record.county && !!record.county.city && !!record.county.city.province && !$isEmpty(record.county.city.province.name) ? record.county.city.province.name : '' }}
                    {{ !!record.county && !!record.county.city && !$isEmpty(record.county.city.name) ? ('/' + record.county.city.name) : '' }}
                    {{ !!record.county && !$isEmpty(record.county.name) ? ('/' + record.county.name) : '' }}
                </span>
                <span slot="action" slot-scope="rows">
                    <a-button icon="edit" @click="$router.push('/Admin/goodcatch/m/core/areas/form/'+rows.id)">编辑</a-button>
                </span>
            </a-table>
            <div class="admin_pagination" v-if="table.total > 0">
                <a-pagination v-model="table.params.page" :page-size.sync="table.params.per_page" :total="table.total" @change="handleTablePageChange" show-less-items />
            </div>
        </div>
    </div>
</template>

<script>
import Search from '@/components/admin/search'
import { MixinList } from '@/plugins/mixins/admin'
export default {
    mixins: [ MixinList ],
    components: { Search },
    props: {},
    data() {
      return {
          table: {
              actions: {
                  list: this.$api.moduleCoreAreas,
                  remove: this.$api.moduleCoreAreas
              },
              columns: [
                  {title:'#',dataIndex:'id',fixed:'left', width: 80},
                  {title:'直接上级', scopedSlots:{ customRender: 'pid' }, width: 120},
                  {title:'所属部门', scopedSlots:{ customRender: 'departments' }, width: 220},
                  {title:'员工编码',dataIndex:'code', width: 120},
                  {title:'姓名',dataIndex:'name', width: 120},
                  {title:'性别',scopedSlots:{ customRender: 'gender' }, width: 90},
                  {title:'岗位',dataIndex:'title', width: 150},
                  {title:'级别',dataIndex:'rank', width: 120},
                  {title:'入职日期',dataIndex:'hireday', width: 120},
                  {title:'出生日期',dataIndex:'birthday', width: 120},
                  {title:'工作日期',dataIndex:'workday', width: 120},
                  {title:'电话',dataIndex:'phone', width: 150},
                  {title:'邮箱',dataIndex:'email', width: 180},
                  {title:'排序',dataIndex:'order', width: 90},
                  {title:'类型', scopedSlots:{ customRender: 'type' }, width: 120},
                  {title:'类别', dataIndex:'category', width: 120},
                  {title:'状态', scopedSlots:{ customRender: 'status' }, width: 120},
                  {title:'创建时间',dataIndex:'created_at', width: 120},
                  {title:'更新时间',dataIndex:'updated_at', width: 120},
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
                      label: '别名',
                      name: 'alias',
                      type: 'text'
                  },
                  {
                      label: '显示名称',
                      name: 'display',
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
