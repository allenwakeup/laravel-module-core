<template>
    <div>
        <div class="admin_table_page_title">

            <a-breadcrumb>
                <a-breadcrumb-item>
                    <a-button v-if="breadcrumb.length > 0" type="link" @click="onload()"><a-icon type="home" />部门列表</a-button>
                    <span v-else>部门列表</span>
                </a-breadcrumb-item>

                <a-breadcrumb-item v-for="b in breadcrumb" :key="b.id">
                    <a-button type="link" @click="onClickName(b)">
                        {{ b.name }}
                    </a-button>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
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
                        <a-button @click="$router.push('/Admin/goodcatch/m/core/departments/form')" type="primary" icon="plus">添加</a-button>
                        <a-button @click="openImportDialog" icon="import">批量导入</a-button>
                        <a-button class="admin_delete_btn" type="danger" icon="delete" @click="handleRemoveTableRows">批量删除</a-button>
                        <a-import
                                :open="isOpenImportDialog"
                                @close="isOpenImportDialog = false"
                                @ok="handleImport"
                                top="20%"
                                width="60%"
                                height="560px"></a-import>
                    </div>
                </template>
                <span slot="pid" slot-scope="record">
                    {{ record.parent ? record.parent.name : '--' }}
                </span>
                <a-button type="link" slot="name" slot-scope="record" @click="onClickName(record)">
                    {{ record.name }}
                </a-button>
                <span slot="type" slot-scope="record">
                    {{ record.type === 0 ? '默认' : '其他' }}
                </span>
                <a-switch
                    slot="status"
                    :loading="loading_status['_' + record.id]"
                    @change="onStatusChange(record)"
                    slot-scope="record"
                    :checked-children="dictionary.status.enabled"
                    :un-checked-children="dictionary.status.disabled"
                    :default-checked="record.status === 1" />
                <span slot="action" slot-scope="rows">
                    <a-button icon="edit" @click="$router.push('/Admin/goodcatch/m/core/departments/form/'+rows.id)">编辑</a-button>
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
import { AImport } from '@/components/admin/aimport'
import { MixinList } from '@/plugins/mixins/admin'
export default {
    mixins: [ MixinList ],
    components: { AImport, Search },
    props: {},
    data() {
      return {
          table: {
              actions: {
                  list: this.$api.moduleCoreDepartments,
                  remove: this.$api.moduleCoreDepartments
              },
              columns: [
                  {title:'#',dataIndex:'id',fixed:'left'},
                  {title:'上级部门', scopedSlots:{ customRender: 'pid' }},
                  {title:'编码',dataIndex:'code'},
                  {title:'名称',scopedSlots:{ customRender: 'name' }},
                  {title:'简称',dataIndex:'short'},
                  {title:'别名',dataIndex:'alias'},
                  {title:'描述',dataIndex:'description'},
                  {title:'排序',dataIndex:'order'},
                  {title:'类型', scopedSlots:{ customRender: 'type' }},
                  {title:'类别', dataIndex:'category'},
                  {title:'状态', scopedSlots:{ customRender: 'status' }},
                  {title:'创建时间',dataIndex:'created_at'},
                  {title:'更新时间',dataIndex:'updated_at'},
                  {title:'操作',fixed:'right',scopedSlots: { customRender: 'action' }},
              ],
              params: {
                  pid: undefined
              }
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
          },

          dictionary: {
            status: {
              enabled: '启用',
              disabled: '禁用'
            }
          },
          loading_status: {},
          breadcrumb: [],
          isOpenImportDialog: false,

      };
    },
    watch: {},
    computed: {},
    methods: {


        reset(){
            this.table.params.pid = undefined;
            this.table.params.page = 1;
            this.table.params.per_page = 30;
        },
        onStatusChange(record) {
          const reverse_status = [1, 0][record.status];
          this.loading_status ['_' + record.id] = true;
          this.$put(this.$api.moduleCoreDepartments + '/' + record.id, Object.assign({}, record, {
            status: reverse_status,
          })).then(res => {
            this.loading_status ['_' + record.id] = false;
            if (res.code === 200) {
              record.status = reverse_status;
              this.$message.success(res.msg);
            } else {
              return this.$message.error(res.msg);
            }
          }).catch(() => this.loading_status ['_' + record.id] = false);
        },
        onClickName(record){
            if(record.path) {
                if(record.path.length > 0){
                    this.breadcrumb = record.path.reduce((breadcrumb, item) => {
                        breadcrumb.push({
                            id: record.path[breadcrumb.length],
                            name: record.path_text[breadcrumb.length],
                            order: breadcrumb.length
                        })
                        return breadcrumb;
                    }, []);
                }else{
                    if(this.breadcrumb.filter(item=>item.id === record.id).length === 0){

                        this.breadcrumb.push(record)
                    }
                }
                this.reset();
            }else{
                this.breadcrumb = this.breadcrumb.filter(item=>item.order <= record.order);
            }

            this.table.params.pid = record.id;
            // 加载混入中的表格数据
            this.loadTableData();
        },
        openImportDialog(){
            this.isOpenImportDialog = true;
        },
        handleImport(data){
            if(data){
                console.log(data);
            }
        },

        onload(){
            this.reset();
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
