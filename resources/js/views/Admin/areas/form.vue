<template>
    <div>
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            地区编辑
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <a-form-model ref="form" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-form-model-item label="地区">
                    <a-cascader v-model="cascader_area" :load-data="load_areas" :options="areas" placeholder="请选择行政地区" change-on-select @change="area_change" />
                </a-form-model-item>
                <a-form-model-item label="名称">
                    <a-input v-model="form.name"></a-input>
                </a-form-model-item>
                <a-form-model-item label="简称">
                    <a-input v-model="form.short"></a-input>
                </a-form-model-item>
                <a-form-model-item label="别名">
                    <a-input v-model="form.alias"></a-input>
                </a-form-model-item>
                <a-form-model-item label="显示名称">
                    <a-input v-model="form.display"></a-input>
                </a-form-model-item>
                <a-form-model-item label="描述">
                    <a-textarea v-model="form.description" :auto-size="{ minRows: 3, maxRows: 5 }" />
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
              short: '',
              alias: '',
              display: '',
              description: '',
              order: 1,
              status: 1
          },
          areas:[],
          area_cascader: {
              province: 'city',
              city: 'county'
          },
          rules: {
              code: [
                  {required: true, message: '请输入编码', trigger: 'blur'},
                  {min: 2, max: 20, message: '至少两个字，最多20个字', trigger: 'blur'},
              ],
              name: [
                  {required: true, message: '请输入名称', trigger: 'blur'},
                  {min: 2, max: 20, message: '至少两个字，最多20个字', trigger: 'blur'},
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
                    let api = this.$apiHandle(this.$api.moduleCoreAreas,this.id);
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
                        this.$post(api.url,this.info).then(res=>{
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
        get_info(){
            this.$get(this.$api.moduleCoreAreas+'/'+this.id).then(res=>{
                this.form = res.data;
            })
        },
        load_areas(selectedOptions){
            const targetOption = selectedOptions[selectedOptions.length - 1];
            const params = {data_type: 'cascader', cascader: this.area_cascader[targetOption.cascader]};
            params[targetOption.cascader + '_id'] = targetOption.value;

            targetOption.loading = true;

            this.$get(this.$api.moduleCoreAreas, params).then(res=>{
                targetOption.loading = false;
                targetOption.children = res.data;
                this.areas = [...this.areas];
            });
        },
        area_change(row,info){
            this.form.code = row[2];
        },
        // 获取列表
        onload(){
            // 判断你是否是编辑
            if(!this.$isEmpty(this.$route.params.id)){
                this.id = this.$route.params.id;
                this.get_info();
            }

            this.$get(this.$api.moduleCoreAreas, {data_type: 'cascader', cascader: 'province'}).then(res=>{

                this.areas = res.data;
            });
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
