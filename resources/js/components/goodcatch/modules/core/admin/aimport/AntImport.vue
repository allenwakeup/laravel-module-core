<template>
    <a-draggable-modal
            :draggable="true"
            :title="title"
            :body-style="{ overflow: 'scroll', height }"
            :dialog-style="{ top: top }"
            :visible="visible"
            :maskClosable="false"
            @cancel="close"
            cancelText="关闭"
            :footer="null"
            :width="width"
    >

        <a-layout-content>
            <a-layout style="background: #fff">
                <a-layout-sider width="30%"
                                style="background: #fff; border-right: 1px solid #cfcfcf;">
                    <a-steps v-model="step" direction="vertical" @change="onChangeSteps">
                        <a-step title="下载模版" description="请使用模版文件"/>
                        <a-step title="选择文件" description="请选择上传的Excel文件"/>
                        <a-step title="核对数据" description="上传前对数据进行确认"/>
                        <a-step title="完成" description="上传结果显示"/>
                    </a-steps>
                </a-layout-sider>
                <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">

                    <div v-if="step === 0">
                        <vue-excel-xlsx
                                :data="sampleData"
                                :columns="sampleColumns"
                                :filename="title"
                        >
                            点我下载模版
                        </vue-excel-xlsx>
                        <p>注：模版中第一行为表头，第二行为列的样例说明，数据行导入是从第二行开始</p>
                    </div>


                    <a-import-xlsx
                            v-if="step === 1"
                            @parsed="importFromFile"
                            :columns="columns"
                    />

                    <a-table
                            v-if="step === 2"
                            bordered
                            size="small"
                            :columns="columns"
                            :pagination="{ pageSize: 10 }"
                            :data-source="data"
                            :scroll="{ y: 420 }"
                            rowKey="__row_key"
                    >
                        <template slot="footer" slot-scope="currentPageData">
                            总计：{{ data.length }}行
                        </template>
                    </a-table>


                    <div>

                        <a-button v-if="step === 3" @click="onClickBegin" type="primary"
                                  :disabled="loading" :loading="loading">
                            开始
                        </a-button>
                        <p v-show="!$isEmpty(result)">{{ result }}</p>
                    </div>


                </a-layout-content>
            </a-layout>
        </a-layout-content>
    </a-draggable-modal>
</template>

<script>
    import AImportXlsx from "./AntImportXlsx";
    import ADraggableModal from '@/components/admin/amodal'

    export default {
        name: "AntImport",
        components: {AImportXlsx, ADraggableModal},
        props: {
            open: {
                type: Boolean,
                default: false
            },
            columns: {
                type: Array,
                default: () => [
                    {
                        title: '编码',
                        dataIndex: 'code',
                        sorter: true,
                        desc: '两个字符5位数字'
                    },
                    {
                        title: '名称',
                        dataIndex: 'name',
                        format: val => '「' + val + '」',
                        desc: '最少两个中文汉字'
                    }
                ]
            },
            title: {
                type: String,
                default: '数据导入'
            },
            top: {
                type: String,
                default: '20px'
            },
            width: {
                type: String,
                default: '90%'
            },
            height: {
                type: String,
                default: '600px'
            },

            action: {
                type: String,
                default: ''
            },


        },
        data() {
            return {
                visible: false,
                loading: false,
                result: '',
                step: 0,
                data: []
            };
        },
        computed: {
            sampleColumns() {
                return this.columns.map(col => Object.assign({}, {
                    label: col.title,
                    field: col.dataIndex,
                    dataFormat: col.format
                }))
            },
            sampleData() {
                return [this.columns.reduce((data, col) => {
                    data[col.dataIndex] = col.desc;
                    return data;
                }, {})]
            },

        },
        watch: {
            open(val) {
                this.visible = val;
                this.step = 1;
                this.result = '';
            },
        },
        methods: {
            onChangeSteps(step) {
                this.step = step;
            },
            importFromFile(data) {
                this.data = data.length > 1 ? data.slice(1) : data;
                this.step = 2;
            },
            onClickBegin(){
                if(!this.$isEmpty(this.action)){
                    const form = new FormData();
                    const vm = this;
                    form.append('file', new Blob([JSON.stringify(
                        this.data.map(data => {
                            const cp_data = Object.assign({}, data);
                            delete cp_data.__row_key;
                            return cp_data;
                        }) , null, 2)], {
                        type: 'application/json;charset=UTF-8'
                    }));
                    vm.loading = true;
                    this.$postfile(this.action, form).then(res=>{
                        if(res.code === 200){
                            vm.result = res.msg;

                            vm.$message.success(res.msg)
                        }else{
                            vm.result = res.msg;
                            vm.$message.error(res.msg)
                        }
                        vm.loading = false;
                        vm.$emit("ok", res);
                        setTimeout(()=>{
                            vm.close();
                        }, 2000)
                    }, err=>{
                        vm.loading = false;
                    })
                }

            },
            close() {
                this.$emit("close");
                this.visible = false;
            }
        },
        created() {

        },
        mounted() {
        }
    };

</script>
<style lang="scss" scoped>

</style>
