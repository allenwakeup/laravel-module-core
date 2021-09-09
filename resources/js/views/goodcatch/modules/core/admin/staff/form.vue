<template>
    <div>
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            部门编辑
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-form-model-item label="所属部门">
                    <a-cascader :load-data="load_departments"
                                :options="departments"
                                :fieldNames="{ label : 'name', value: 'id', children: 'children' }"
                                :placeholder="form.pid > 0 ? form.departments : '请选择上级部门'"
                                change-on-select
                                @change="department_change" />
                </a-form-model-item>
                <a-form-model-item label="直接上级">
                    <a-cascader :load-data="load_staff"
                                :options="staff"
                                :fieldNames="{ label : 'name', value: 'id', children: 'children' }"
                                :placeholder="(form.pid > 0 && form.path_text) ? form.path_text.join(' / ') : '请选择直接上级'"
                                change-on-select
                                @change="staff_change" />
                </a-form-model-item>

                <a-form-model-item label="员工编码">
                    <a-input v-model="form.code"></a-input>
                </a-form-model-item>
                <a-form-model-item label="姓名">
                    <a-input v-model="form.name"></a-input>
                </a-form-model-item>
                <a-form-model-item label="性别">
                    <a-radio-group v-model="form.gender" default-value="1" name="gender" button-style="solid">
                        <a-radio-button value="0">
                            默认
                        </a-radio-button>
                        <a-radio-button value="1">
                            男
                        </a-radio-button>
                        <a-radio-button value="2">
                            女
                        </a-radio-button>
                        <a-radio-button value="3">
                            其他
                        </a-radio-button>
                    </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="电话">
                    <a-input v-model="form.phone"></a-input>
                </a-form-model-item>
                <a-form-model-item label="邮箱">
                    <a-input v-model="form.email"></a-input>
                </a-form-model-item>
                <a-form-model-item label="入职日期">
                    <a-date-picker
                            format="YYYY-MM-DD"
                            placeholder="请选择入职日期"
                            @change="onChangeHireday" />
                </a-form-model-item>
                <a-form-model-item label="出生日期">
                    <a-date-picker
                            format="YYYY-MM-DD"
                            placeholder="请选择出生日期"
                            @change="onChangeBirthday" />
                </a-form-model-item>
                <a-form-model-item label="工作日期">
                    <a-date-picker
                            format="YYYY-MM-DD"
                            placeholder="请选择开始工作日期"
                            @change="onChangeWorkday" />
                </a-form-model-item>

                <a-form-model-item label="岗位">
                    <a-input v-model="form.title"></a-input>
                </a-form-model-item>

                <a-form-model-item label="级别">
                    <a-input v-model="form.rank"></a-input>
                </a-form-model-item>

                <a-form-model-item label="排序" prop="order">
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
          cascader_staff: [],
          form:{
              code: '',
              name: '',
              gender: 1,
              email:'',
              phone: '',
              title: '',
              rank: '',
              order: 1,
              status: 1
          },
          departments:[],
          staff:[],
          id:0,
      };
    },
    watch: {},
    computed: {},
    methods: {
        handleSubmit(){

            // 验证代码处
            if(this.$isEmpty(this.form.code)){
                return this.$message.error('编码不能为空');
            }
            if(this.$isEmpty(this.form.name)){
                return this.$message.error('姓名不能为空');
            }

            let api = this.$apiHandle(this.$api.moduleCoreStaff,this.id);
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


        },
        get_form(){
            this.$get(this.$api.moduleCoreStaff+'/'+this.id).then(res=>{
                this.form = res.data;
            })
        },
        onChangeOrder(value){
            this.form.order = value;
        },
        onChangeStatus(checked){
            this.form.status = checked ? 1 : 0;
        },
        onChangeWorkday(date, dateString){
            this.form.workday = dateString;
        },
        onChangeHireday(date, dateString){
            this.form.hireday = dateString;
        },
        onChangeBirthday(date, dateString){
            this.form.birthday = dateString;
        },
        staff_change(row,form){
            this.form.pid = row[row.length - 1];
            if(row.length === 0){
                this.form.pid = 0;
            }
        },
        department_change(row,form){
            this.form.pid = row[row.length - 1];
            if(row.length === 0){
                this.form.pid = 0;
            }
        },
        load_departments(selectedOptions){
            const targetOption = selectedOptions[selectedOptions.length - 1];

            targetOption.loading = true;

            const params = {
                pid: targetOption.id,
                data_type: 'select'
            }

            this.$get(this.$api.moduleCoreDepartments, params).then(res=>{
                targetOption.loading = false;
                targetOption.children = res.data;
                this.departments = [...this.departments];
            });
        },
        load_staff(selectedOptions){
            const targetOption = selectedOptions[selectedOptions.length - 1];

            targetOption.loading = true;

            const params = {
                pid: targetOption.id,
                data_type: 'select'
            }

            this.$get(this.$api.moduleCoreStaff, params).then(res=>{
                targetOption.loading = false;
                targetOption.children = res.data;
                this.staff = [...this.staff];
            });
        },
        // 获取列表
        onload(){
            // 判断你是否是编辑
            if(!this.$isEmpty(this.$route.params.id)){
                this.id = this.$route.params.id;
                this.get_form();
            }

            this.$get(this.$api.moduleCoreDepartments, { data_type: 'select' }).then(res=>{

                if(res.code === 200){
                    this.departments = res.data;
                }

            });

            this.$get(this.$api.moduleCoreStaff, { data_type: 'select' }).then(res=>{

                if(res.code === 200){
                    this.staff = res.data;
                }

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
