<template>
    <div>
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            附件编辑
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <a-form-model ref="form" :model="form" :rules="rules" :label-col="{ span: 6 }"  :wrapper-col="{ span: 16 }">
                <a-form-model-item label="名称" prop="name">
                    <a-input v-model="form.name"></a-input>
                </a-form-model-item>
                <a-form-model-item label="文件上传">
                    <a-upload
                            list-type="picture-card"
                            class="avatar-uploader"
                            :show-upload-list="false"
                            :action="$api.moduleCoreAttachments + '/upload'"
                            :data="{token:getToken()}"
                            @change="onChangeUpload"
                    >
                        <img height="90px" v-if="form.path" :src="form.path" />
                        <div v-else>
                            <a-font type="iconplus" />
                        </div>
                    </a-upload>
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
import {moduleStorageHelpers} from '@/plugins/function'
import { STORE_ADMIN, TOKEN } from '@/plugins/constant'
const {readStorageStr} = moduleStorageHelpers(STORE_ADMIN)
export default {
    components: {},
    props: {},
    data() {
      return {
          form:{
              code: '',
              name: '',
              short: '',
              alias: '',
              display: '',
              description: '',
              order: 1,
              status: 1
          },
          rules: {
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
                if(valid){
                    let api = this.$apiHandle(this.$api.moduleCoreAttachments,this.id);
                    if(api.status){
                        this.$put(api.url, this.form).then(res=>{
                            if(res.code === 200){
                                this.$message.success(res.msg)
                                return this.$router.back();
                            }else{
                                return this.$message.error(res.msg)
                            }
                        })
                    }else{
                        this.$post(api.url, this.form).then(res=>{
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
        onChangeStatus(checked){
            this.form.status = checked ? 1 : 0;
        },
        getToken(){
            return readStorageStr(TOKEN)
        },
        getForm(){
            this.$get(this.$api.moduleCoreAttachments+'/'+this.id).then(res=>{
                if(res.code === 200){

                    this.form = res.data;
                }
            })
        },
        onChangeUpload(){

        },
        // 获取列表
        onload(){
            // 判断你是否是编辑
            if(!this.$isEmpty(this.$route.params.id)){
                this.id = this.$route.params.id;
                this.getForm();
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
