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
            <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
                <a-import-xlsx
                    @parsed="importFromFile"
                    :columns="columns"
                />
            </a-layout-content>
        </a-layout>
    </a-layout-content>

    <template slot="footer">
      <a-button key="submit" type="primary" @click="handleSubmit">
        确定
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
            default: () => [ // 用户数据列配置
                {
                    prop:'key',
                    label:'序号',
                },
                {
                    prop:'name',
                    label:'手机号码',
                    format: val => '' + val // 数据导入导出设置
                },
                {
                    prop:'col1',
                    label:'姓名',
                },
                {
                    prop:'col2',
                    label:'所属部门',
                },
                {
                    prop:'col3',
                    label:'名称3',
                },
                {
                    prop:'col4',
                    label:'名称4',
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
        importFromFile(data){
            this.data = data;
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
