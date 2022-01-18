<template>
    <div>
        <div class="admin_table_page_title">连接列表</div>
        <div class="unline underm"></div>


        <div class="admin_table_list">
            <a-table
                    size="small"
                    :columns="table.columns"
                    :data-source="table.data"
                    :scroll="{ y: sysWindowHeight - 400 }"
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
                        <a-button @click="$router.push('/Admin/goodcatch/m/core/connections/form')" type="primary" icon="plus">添加</a-button>
                        <a-button class="admin_delete_btn" type="danger" icon="delete" @click="handleRemoveTableRows">批量删除</a-button>
                    </div>
                </template>
                <span slot="datasource_id" slot-scope="record">
                    {{ record.datasource ? record.datasource.name : '--' }}
                </span>
                <span slot="action" slot-scope="rows">
                    <a-button icon="edit" @click="$router.push('/Admin/goodcatch/m/core/connections/form/'+rows.id)">编辑</a-button>
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
                  list: this.$api.moduleCoreConnections,
                  remove: this.$api.moduleCoreConnections
              },
              columns: [
                  {title:'#',dataIndex:'id',fixed:'left', width: 80},
                  {title:'数据源', scopedSlots:{ customRender: 'datasource_id' }, width: 180},
                  {title:'名称',dataIndex:'name', width: 180},
                  {title:'描述',dataIndex:'description', width: 280},
                  {title:'连接类型',dataIndex:'conn_type', width: 120},
                  {title:'TNS',dataIndex:'tns', width: 120},
                  {title:'驱动',dataIndex:'driver', width: 120},
                  {title:'主机名',dataIndex:'host', width: 180},
                  {title:'端口号',dataIndex:'port', width: 120},
                  {title:'数据库名',dataIndex:'database', width: 150},
                  {title:'用户',dataIndex:'username', width: 120},
                  {title:'密码',dataIndex:'password', width: 120},
                  {title:'连接地址',dataIndex:'url', width: 180},
                  {title:'服务名',dataIndex:'service_name', width: 120},
                  {title:'通信地址',dataIndex:'unix_socket', width: 120},
                  {title:'字符编码',dataIndex:'charset', width: 180},
                  {title:'字符集',dataIndex:'collation', width: 200},
                  {title:'表前缀名',dataIndex:'prefix', width: 120},
                  {title:'资源前缀',dataIndex:'prefix_schema', width: 120},
                  {title:'严格模式',dataIndex:'strict', width: 90},
                  {title:'Engine',dataIndex:'engine', width: 120},
                  {title:'资源名',dataIndex:'schema', width: 120},
                  {title:'版本限制',dataIndex:'edition', width: 100},
                  {title:'软件版本',dataIndex:'server_version', width: 90},
                  {title:'加密模式',dataIndex:'sslmode', width: 90},
                  {title:'附加设置',dataIndex:'options', width: 180},
                  {title:'数据方向',dataIndex:'type', width: 120},
                  {title:'分组',dataIndex:'group', width: 120},
                  {title:'排序',dataIndex:'order', width: 100},
                  {title:'状态',dataIndex:'status', width: 90},
                  {title:'创建时间',dataIndex:'created_at', width: 200},
                  {title:'更新时间',dataIndex:'updated_at', width: 200},
                  {title:'操作',fixed:'right',scopedSlots: { customRender: 'action' }},
              ],
          },
          search: {
              fields: [
                  {
                      label: '连接类型',
                      name: 'conn_type',
                      type: 'select',
                      data: [
                          { label: '全部', value: undefined },
                          { label: '来源', value: 'SRC' },
                          { label: '目标', value: 'DST' },
                      ],
                      placeholder: '全部'
                  },
                  {
                      label: '名称',
                      name: 'name',
                      type: 'text'
                  },
                  {
                      label: '分组',
                      name: 'group',
                      type: 'text'
                  },

                  {
                      label: '主机名',
                      name: 'host',
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
