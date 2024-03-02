<template>
    <div>
        <div class="admin_table_page_title">数据映射列表</div>
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
                        <a-button @click="$router.push($moduleUrl('data_maps/form'))" type="primary" :size="sysSize" icon="plus">添加</a-button>
                        <a-button class="admin_delete_btn" type="danger" :size="sysSize" icon="delete" @click="handleRemoveTableRows">批量删除</a-button>
                    </div>
                </template>
                <span slot="data_route_id" slot-scope="record">
                    {{ record.data_route ? record.data_route.name : record.data_route_id }}
                </span>
                <span slot="left" slot-scope="record">
                    {{ record.left + record.left_table }}
                </span>
                <span slot="right" slot-scope="record">
                    {{ record.right + record.right_table }}
                </span>
                <span slot="action" slot-scope="rows, record">
                    <a-button type="link" icon="edit" @click="$router.push($moduleUrl('data_maps/form/'+rows.id))" :size="sysSize">编辑</a-button>
                    <a-button type="link" icon="interaction" @click="handleAssignment(record)" :size="sysSize">分配</a-button>
                </span>
            </a-table>
	        <div class="admin_pagination" v-if="table.total > 0">
		        <a-pagination v-model="table.params.page" :size="sysSize" :page-size-options="table.pageSizeOptions" :total="table.total" @change="handleTablePageChange" show-less-items show-size-changer show-quick-jumper :page-size="table.params.per_page" @showSizeChange="handleTablePageSizeChange"/>
	        </div>
        </div>

	    <a-draggable-modal
		    :draggable="true"
		    title="数据映射"
		    :body-style="{ overflow: 'scroll', height: (sysWindowHeight - 200) + 'px' }"
		    :dialog-style="{ top: '20px' }"
		    :visible="openAssignmentModal"
		    :maskClosable="false"
		    @cancel="closeAssignment"
		    cancelText="关闭"
		    :footer="null"
		    width="90%"
	    >
		    <a-assignment :assignment-id="selectedAssignment.id" :key="selectedAssignment.id" :height="sysWindowHeight - 280"></a-assignment>
	    </a-draggable-modal>
    </div>
</template>

<script>
import Search from '@/components/admin/search'
import ADraggableModal from '@/components/admin/amodal'
import AAssignment from './assignment'

import {MixinList, MixinStore} from '@/plugins/mixins/admin'

export default {
    mixins: [MixinList, MixinStore],
    components: { AAssignment, Search, ADraggableModal },
    props: {},
    data() {
        return {

            table: {
                actions: {
                    list: this.$api.adminDataMaps,
                    remove: this.$api.adminDataMaps
                },
                columns: [
                    {title:'#',dataIndex:'id',width: 60},
                    {title:'数据路径', scopedSlots:{ customRender: 'data_route_id' }, width: 150},
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
                    {title:'操作',fixed:'right',scopedSlots: { customRender: 'action' }, width: 150},
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
        },
	    closeAssignment(){
			this.openAssignmentModal = false;
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
