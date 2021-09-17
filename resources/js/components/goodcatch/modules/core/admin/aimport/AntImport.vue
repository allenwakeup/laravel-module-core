<template>
    <a-modal
      :title="title"
      :body-style="{ overflow: 'scroll', height }"
      :dialog-style="{ top: top }"
      :visible="visible"
      :maskClosable="false"
      @cancel="close"
      cancelText="关闭"
      :width="width"
      >

        <a-layout-content>
            <a-layout style="background: #fff">
                <a-layout-sider width="30%" style="background: #fff; border-right: 1px solid #cfcfcf;">
                    <a-steps v-model="step" direction="vertical" @change="onChangeSteps">
                        <a-step title="下载模版" description="请使用模版文件" />
                        <a-step title="选择文件" description="请选择上传的Excel文件" />
                        <a-step title="核对数据" description="上传前对数据进行确认" />
                        <a-step title="完成" description="上传结果显示" />
                    </a-steps>
                </a-layout-sider>
                <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">

                    <a-button v-if="step === 0" type="link">点我下载</a-button>

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
                            :pagination="false"
                            :data-source="data"
                    >
                        <template slot="footer" slot-scope="currentPageData">
                            总计：{{ data.length }}行
                        </template>
                    </a-table>


                    <div>

                        <a-button v-if="step === 3" @click="loading = true" type="primary" :disabled="loading" :loading="loading">
                            开始
                        </a-button>
                    </div>


                </a-layout-content>
            </a-layout>
        </a-layout-content>
        <template slot="footer">
            <a-button key="back" type="primary" @click="handleSubmit">
                关闭
            </a-button>
        </template>
    </a-modal>
    </template>

<script>
import AImportXlsx from "./AntImportXlsx";

export default {
    name: "AntImport",
    components: { AImportXlsx },
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
                    sorter: true
                },
                {
                    title: '名称',
                    dataIndex: 'name',
                    format: val => '' + val
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


    },
    data() {
        return {
            visible: false,
            loading: false,
            step: 0,
            data: []
        };
    },
    computed: {},
    watch: {
        open(val) {
            this.visible = val;
        },
    },
    methods: {
        onChangeSteps(step){
            this.step = step;
        },
        importFromFile(data){
            this.data = data;
            this.step = 3;
        },
        handleSubmit() {
            this.$emit("ok", this.data);
            this.close();
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
