<template>
    <div>
        <div class="admin_table_page_title">数据映射列表</div>
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
                        <a-button @click="$router.push('/Admin/goodcatch/m/core/data_maps/form')" type="primary" icon="plus">添加</a-button>
                        <a-button class="admin_delete_btn" type="danger" icon="delete" @click="handleRemoveTableRows">批量删除</a-button>
                    </div>
                </template>
                <span slot="data_route_id" slot-scope="record">
                    {{ record.dataRoute ? record.dataRoute.name : record.data_route_id }}
                </span>
                <span slot="left" slot-scope="record">
                    {{ record.left + record.left_table }}
                </span>
                <span slot="right" slot-scope="record">
                    {{ record.right + record.right_table }}
                </span>
                <span slot="action" slot-scope="rows, record">
                    <a-button icon="edit" @click="$router.push('/Admin/goodcatch/m/core/data_maps/form/'+rows.id)">编辑</a-button>
                    <a-button icon="interaction" @click="handleAssignment(record)">分配</a-button>
                </span>
            </a-table>
            <div class="admin_pagination" v-if="table.total > 0">
                <a-pagination v-model="table.params.page" :page-size.sync="table.params.per_page" :total="table.total" @change="handleTablePageChange" show-less-items />
            </div>
        </div>
        <a-modal
                v-model="openAssignmentModal"
                title="数据映射"
                :body-style="{ overflow: 'scroll', height: '500px' }"
                :dialog-style="{ top: '20px' }"
                width="80%"
                height="600px">
            <template slot="footer">
                <span></span>
            </template>
            <a-assignment :assignment-id="selectedAssignment.id" :key="selectedAssignment.id"></a-assignment>
        </a-modal>
    </div>
</template>

<script>
    import Search from '@/components/admin/search'
    import AAssignment from './assignment'

    import { MixinList } from '@/plugins/mixins/admin'
    export default {
        mixins: [ MixinList ],
        components: { AAssignment, Search },
        props: {},
        data() {
            return {

                table: {
                    actions: {
                        list: this.$api.moduleCoreDataMaps,
                        remove: this.$api.moduleCoreDataMaps
                    },
                    columns: [
                        {title:'#',dataIndex:'id',fixed:'left', width: 80},
                        {title:'数据路径', scopedSlots:{ customRender: 'data_route_id' }, width: 220},
                        {title:'左表', scopedSlots:{ customRender: 'left' }, width: 220},
                        {title:'左表模板',dataIndex:'left_tpl', width: 180},
                        {title:'右表', scopedSlots:{ customRender: 'right' }, width: 220},
                        {title:'右表模板',dataIndex:'right_tpl', width: 180},
                        {title:'关联关系',dataIndex:'relationshipText', width: 180},
                        {title:'Foreign Pivot Key',dataIndex:'foreign_pivot_key', width: 200},
                        {title:'Related Pivot Key',dataIndex:'related_pivot_key', width: 200},
                        {title:'Parent Key',dataIndex:'parent_key', width: 200},
                        {title:'Related Key',dataIndex:'related_key', width: 200},
                        {title:'多态前缀',dataIndex:'name', width: 180},
                        {title:'描述',dataIndex:'description', width: 150},
                        {title:'存储位置',dataIndex:'table', width: 180},
                        {title:'状态',dataIndex:'status', width: 90},
                        {title:'创建时间',dataIndex:'created_at', width: 200},
                        {title:'更新时间',dataIndex:'updated_at', width: 200},
                        {title:'操作',fixed:'right',scopedSlots: { customRender: 'action' }},
                    ],
                },
                search: {
                    fields: [
                        {
                            label: '左表',
                            name: 'left_table',
                            type: 'text'
                        },
                        {
                            label: '右表',
                            name: 'right_table',
                            type: 'text'
                        },

                    ]
                },
                selectedAssignment: {},
                openAssignmentModal: false
            };
        },
        watch: {},
        computed: {},
        methods: {

            onload(){
                // 加载混入中的表格数据
                this.loadTableData();
            },
            handleAssignment(record) {
                this.selectedAssignment = record;
                this.openAssignmentModal = true;
            }
        },
        created() {
            this.onload();
        },
        mounted() {}
    };
</script>
<style lang="scss" scoped>

</style>
