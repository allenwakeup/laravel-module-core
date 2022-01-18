<template>
    <div>
        <div class="admin_table_page_title">计划与任务列表</div>
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
                        <a-button @click="$router.push('/Admin/goodcatch/m/core/schedules/form')" type="primary" icon="plus">添加</a-button>
                        <a-button class="admin_delete_btn" type="danger" icon="delete" @click="handleRemoveTableRows">批量删除</a-button>
                    </div>
                </template>
                <div slot="id" slot-scope="record" @click="handleIdClick(record)">{{ record.id }}</div>

                <div slot="name" slot-scope="record">
                    <a-icon type="play-circle" theme="twoTone" two-tone-color="#eb2f96" :spin="loading_start['_' + record.id]" @click="handleNameClick(record)" style="font-size: 24px;"/>
                    {{ record.name }}
                </div>

                <div slot="schedule_type" slot-scope="record">
                    {{ dictionary.schedule_type [record.schedule_type % dictionary.schedule_type.length] }}
                </div>
                <div slot="once" slot-scope="record">
                    {{ dictionary.once [record.once % dictionary.once.length] }}
                </div>
                <div slot="overlapping" slot-scope="record">
                    {{ dictionary.overlapping [record.overlapping % dictionary.overlapping.length] }}
                </div>
                <div slot="one_server" slot-scope="record">
                    {{ dictionary.one_server [record.one_server % dictionary.one_server.length] }}
                </div>
                <div slot="background" slot-scope="record">
                    {{ dictionary.background [record.background % dictionary.background.length] }}
                </div>
                <div slot="maintenance" slot-scope="record">
                    {{ dictionary.maintenance [record.maintenance % dictionary.maintenance.length] }}
                </div>

                <a-switch
                    slot="status"
                    :loading="loading_status['_' + record.id]"
                    @change="onStatusChange(record)"
                    slot-scope="record"
                    :checked-children="dictionary.status.enabled"
                    :un-checked-children="dictionary.status.disabled"
                    :default-checked="record.status === 1" />

                <span slot="action" slot-scope="rows">
                    <a-button icon="edit" @click="$router.push('/Admin/goodcatch/m/core/schedules/form/'+rows.id)">编辑</a-button>
                </span>
            </a-table>
            <div class="admin_pagination" v-if="table.total > 0">
                <a-pagination v-model="table.params.page" :page-size.sync="table.params.per_page" :total="table.total" @change="handleTablePageChange" show-less-items />
            </div>
        </div>
        <a-modal
            v-model="logs.show"
            title="任务详情">
            <template slot="footer">
                <a-button key="submit" type="primary" @click="() => this.logs.show = false">
                    知道了
                </a-button>
            </template>
            <a-table :columns="logs.columns" :data-source="logs.list" :pagination="false" row-key="id">
            </a-table>
            <div class="admin_pagination" v-if="logs.total>0">
                <a-pagination v-model="logs.params.page" :page-size.sync="logs.params.per_page" :total="logs.total" @change="onChangeLogs" show-less-items />
            </div>
        </a-modal>
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
                  list: this.$api.moduleCoreSchedules,
                  remove: this.$api.moduleCoreSchedules
              },
              columns: [
                  {title:'#',scopedSlots: { customRender: 'id' },fixed:'left', width: 80},
                  {title:'名称',scopedSlots: { customRender: 'name' }, width: 180},
                  {title:'描述',dataIndex:'description', width: 150},
                  {title:'状态',scopedSlots: { customRender: 'status' }, width: 90},
                  {title:'指令',dataIndex:'input', width: 280},
                  {title:'执行周期',dataIndex:'cron', width: 120},
                  {title:'任务类型',scopedSlots: { customRender: 'schedule_type' }, width: 120},
                  {title:'分组',dataIndex:'group', width: 120},
                  {title:'排序',dataIndex:'order', width: 100},
                  {title:'单次任务',scopedSlots: { customRender: 'once' }, width: 180},
                  {title:'重复',scopedSlots: { customRender: 'overlapping' }, width: 120},
                  {title:'集群',dataIndex:'one_server', width: 180},
                  {title:'后台执行',dataIndex:'background', width: 120},
                  {title:'维护模式',dataIndex:'maintenance', width: 120},
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
                      label: '描述',
                      name: 'description',
                      type: 'text'
                  },
                  {
                      label: '分组',
                      name: 'group',
                      type: 'text'
                  }

              ]
          },
          dictionary: {
              status: {
                  enabled: '启用',
                  disabled: '禁用'
              },
              schedule_type: ['--', 'Command', 'Exec', 'Job'],
              once: ['可循环', '单次'],
              overlapping: ['可重复', '不可重复'],
              one_server: ['多服务器', '单服务器'],
              background: ['前台执行', '后台执行'],
              maintenance: ['不执行', '执行']
          },
          loading_status: {},
          loading_start: {},
          logs: {
              show: false,
              total: 0,
              list: [],
              params:{
                  page:1,
                  per_page:30
              },
              columns:[
                  {title:'状态',dataIndex:'status_text'},
                  {title:'内容',dataIndex:'content'},
                  {title:'时间',dataIndex:'created_at_text'}
              ],
          },
      };
    },
    watch: {},
    computed: {},
    methods: {
        onStatusChange(record){
            const reverse_status = [1, 0][record.status];
            this.loading_status ['_' + record.id] = true;
            this.$put(this.$api.moduleCoreSchedules + '/' + record.id, Object.assign({}, record, {
                status: reverse_status,
                logs: '',
                payload: record.payload ? JSON.stringify(record.payload) : ''
            })).then(res=>{
                this.loading_status ['_' + record.id] = false;
                if(res.code === 200){
                    record.status = reverse_status;
                    this.$message.success(res.msg);
                }else{
                    return this.$message.error(res.msg);
                }
            }).catch(()=>this.loading_status ['_' + record.id] = false);
        },
        handleNameClick(record){
            this.loading_start['_' + record.id] = true;
            this.$put(this.$api.moduleCoreSchedules + '/' + record.id, Object.assign({}, record, {
                start: 1,
                logs: '',
                payload: record.payload ? JSON.stringify(record.payload) : ''
            })).then(res=>{
                this.loading_start['_' + record.id] = false;
                if(res.code == 200){
                    this.$message.success(res.msg);
                }else{
                    return this.$message.error(res.msg);
                }
            }).catch(()=>this.loading_start['_' + record.id] = false);
        },
        handleIdClick(record){
            this.logs.show = true;
            this.$get(this.$api.moduleCoreSchedules + '/' + record.id + '/logs',this.logs.params).then(res=>{
                this.logs.total = res.data.total;

                this.logs.list = res.data.data;
            });
        },
        onChangeLogs(e){
            this.logs.params.page = e;
        },
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
