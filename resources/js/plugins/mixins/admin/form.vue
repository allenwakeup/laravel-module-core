<script>
    import { appendObjectExistedKeys } from '@/plugins/function'
    import { PREFS_USER_TEAM_ID } from '@/plugins/constant'
    export default {

        methods: {
            /**
             * 从用户偏好中同步表单值
             */
            syncPrefForm(){
                const prefName = this.getFormPrefName();
                if(!this.$isEmpty(prefName)){
                    const prefForm = this.userPref [prefName];
                    if(!!this.form && !!prefForm){
                        appendObjectExistedKeys(this.form, prefForm);
                    }
                }
            },

            /**
             * 处理写入到偏好前的表单数据
             */
            handlePrefForm(form){

                return form;
            },

            /**
             * 组件中表单数据对应的偏好数据关键字
             * @returns {string}
             */
            getFormPrefName(){
                return '';
            },

            writePrefForm(){
                const prefName = this.getFormPrefName();
                if(!this.$isEmpty(prefName)){
                    this.setUserPref(prefName, this.handlePrefForm(this.form));
                }
            },

            /**
             * 私有方法，更新当前组件中的表单域，需事先定义键
             * @param key
             * @param value
             * @returns {string}
             */
            __setFormProp(key, value){
                if(!!key && !!this.form && typeof this.form === 'object'){
                    if(this.form.hasOwnProperty(key)){
                        this.$set(this.form, key, value);
                    }
                }
                return value;
            }
        },
        // watch: {
        //     form:{
        //         handler(newForm, oldForm) {
        //             const prefName = this.getFormPrefName();
        //             if(!this.$isEmpty(prefName)){
        //                 const currPref = this.userPref [prefName];
        //                 if(! currPref) {
        //                     this.setUserPref(prefName, this.handlePrefForm(newForm));
        //                 } else {
        //                     this.setUserPref(prefName, Object.assign(currPref, this.handlePrefForm(newForm)));
        //                 }
        //             }
        //         },
        //         deep: true
        //     }
        // },
        created() {}
    };
</script>
