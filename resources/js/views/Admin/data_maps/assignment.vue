<template>
    <a-assignment
        :title="info.title"
        :api="info.api"
        :actions="info.actions"
        parameter-replacement=":left_id"></a-assignment>
</template>

<script>

    import { AAssignment } from "@/components/admin/aassignment";

    export default {
        components: { AAssignment },
        props: {
            assignmentId: {
                type: Number,
                default: -1
            }
        },
        data() {
            return {
                id: 0,
                info: {
                    actions: {},
                    api: '',
                    title: ''
                }
            };
        },
        watch: {},
        computed: {},
        methods: {

            get_form(){
                this.$get(this.$api.moduleCoreDataMaps+'_'+this.id + '/' +this.id + '/assignment').then(res=>{
                    if(res.code === 200){
                        this.info = res.data;
                    }
                });
            },

            // 获取列表
            onload(){
                // 判断你是否是编辑
                if(!this.$isEmpty(this.$route.params.id)){
                    this.id = this.$route.params.id;
                    this.get_form();
                } else if(this.assignmentId > 0 && this.id !== this.assignmentId){
                    this.id = this.assignmentId;
                    this.get_form();
                }
            }
        },
        created() {
            this.onload();
        },
        mounted() {}
    };
</script>
<style lang="scss" scoped>

    .payload-modal{
        width: 100%;
    }
</style>
