<template>
    <div>
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            数据源编辑
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <a-form-model ref="form" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">

                <a-form-model-item label="代码">
                    <a-input v-model="form.code"></a-input>
                </a-form-model-item>
                <a-form-model-item label="名称">
                    <a-input v-model="form.name"></a-input>
                </a-form-model-item>
                <a-form-model-item label="描述">
                    <a-textarea v-model="form.description" :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-model-item>
                <a-form-model-item label="必填项">
                    <a-textarea v-model="form.requires" :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-model-item>
                <a-form-model-item label="选填项">
                    <a-textarea v-model="form.options" :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-model-item>
                <a-form-model-item label="排序">
                    <a-input-number v-model="form.order" :min="0" @change="onChangeOrder" />
                </a-form-model-item>
                <a-form-model-item label="状态">
                    <a-switch checked-children="启用" un-checked-children="禁用" :checked="form.status === 1" @change="onChangeStatus"/>
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button type="primary" @click="handleSubmit">提交</a-button>
                </a-form-model-item>
            </a-form-model>

        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
      return {
          cascader_area: [],
          form:{
              code: '',
              name: '',
              description: '',
              requires: '',
              options: '',
              order: 1,
              status: 1
          },
          rules: {

              code: [
                  {min: 1, max: 20, message: '1到20个字符', trigger: 'blur'},
              ],
              name: [
                  {required: true, message: '请输入名称', trigger: 'blur'},
                  {min: 2, max: 10, message: '至少两个字', trigger: 'blur'},
              ]


          },
          id:0,
      };
    },
    watch: {},
    computed: {},
    methods: {
        handleSubmit(){

            this.$refs.form.validate(valid => {
                if (valid) {
                    let api = this.$apiHandle(this.$api.moduleCoreDatasources,this.id);
                    if(api.status){
                        this.$put(api.url,this.form).then(res=>{
                            if(res.code === 200){
                                this.$message.success(res.msg)
                                return this.$router.back();
                            }else{
                                return this.$message.error(res.msg)
                            }
                        })
                    }else{
                        this.$post(api.url,this.form).then(res=>{
                            if(res.code === 200 || res.code === 201){
                                this.$message.success(res.msg)
                                return this.$router.back();
                            }else{
                                return this.$message.error(res.msg)
                            }
                        })
                    }
                } else {
                    this.$message.error('请按要求填写表单！');
                    return false;
                }
            });




        },
        onChangeOrder(value){
            this.form.order = value;
        },
        onChangeStatus(checked){
            this.form.status = checked ? 1 : 0;
        },
        get_info(){
            this.$get(this.$api.moduleCoreDatasources+'/'+this.id).then(res=>{
                this.form = res.data;
            })
        },

        // 获取列表
        onload(){
            // 判断你是否是编辑
            if(!this.$isEmpty(this.$route.params.id)){
                this.id = this.$route.params.id;
                this.get_info();
            }
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
