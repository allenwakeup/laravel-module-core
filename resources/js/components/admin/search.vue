<template>
    <div class="admin_table_page_where" v-if="show">
        <a-form layout="inline">
            <a-row :gutter="12">
                <a-col :md="8" :sm="24" v-for="(v,k) in searchConfig1" :key="k">
                    <a-form-item :label="v.label">
                        <a-input v-if="v.type==='text'" v-model="params[v.name]" :placeholder="v.placeholder||''" @pressEnter="onChangeText"/>
                        <a-select  v-if="v.type==='select'" v-model="params[v.name]" :placeholder="v.placeholder||''">
                            <a-select-option v-for="(vo,key) in v.data" :key="key" :value="vo.value">{{vo.label}}</a-select-option>
                        </a-select>
                        <a-select  v-if="v.type==='select-remote'" v-model="params[v.name]" :placeholder="v.placeholder||''">
                            <a-select-option v-if="select_remote[v.name].length > 0" v-for="(vo,key) in select_remote[v.name]" :key="key" :value="vo.value">{{vo.label}}</a-select-option>
                        </a-select>
                        <a-cascader v-if="v.type === 'cascader'"
                                    style="width:100%"
                                    :load-data="load_cascader[v.name]"
                                    :options="cascader[v.name]"
                                    :fieldNames="{ label : 'name', value: 'id', children: 'children' }"
                                    :placeholder="'请选择' + v.label"
                                    change-on-select
                                    @change="cascaderChange(v, $event)" />
                        <a-time-picker v-if="v.type==='time_picker'" v-model="params[v.name]" />
                        <a-range-picker style="width:100%" v-if="v.type==='date_picker'" v-model="params[v.name]" format="YYYY-MM-DD" :allow-clear="false"></a-range-picker>
                        <a-range-picker style="width:100%" v-if="v.type==='datetime_picker'" v-model="params[v.name]" format="YYYY-MM-DD HH:mm:ss" show-time :allow-clear="false"></a-range-picker>
                    </a-form-item>
                </a-col>

                <template v-if="advanced && searchConfig2.length>0">
                    <a-col :md="8" :sm="24" v-for="(v,k) in searchConfig2" :key="searchConfig1.length + k">
                        <a-form-item :label="v.label">
                            <a-input v-if="v.type==='text'" v-model="params[v.name]" :placeholder="v.placeholder||''" @pressEnter="onChangeText"/>
                            <a-select  v-if="v.type==='select'" v-model="params[v.name]" :placeholder="v.placeholder||''">
                                <a-select-option v-for="(vo,key) in v.data" :key="key" :value="vo.value">{{vo.label}}</a-select-option>
                            </a-select>
                            <a-select  v-if="v.type==='select-remote'" v-model="params[v.name]" :placeholder="v.placeholder||''">
                                <a-select-option v-if="select_remote[v.name].length > 0" v-for="(vo,key) in select_remote[v.name]" :key="key" :value="vo.value">{{vo.label}}</a-select-option>
                            </a-select>
                            <a-cascader v-if="v.type === 'cascader'"
                                        :load-data="load_cascader[v.name]"
                                        :options="cascader[v.name]"
                                        :fieldNames="{ label : 'name', value: 'id', children: 'children' }"
                                        :placeholder="'请选择' + v.label"
                                        change-on-select
                                        @change="cascaderChange(v, $event)" />
                            <a-time-picker v-if="v.type==='time_picker'" v-model="params[v.name]" />
                            <a-range-picker style="width:100%" v-if="v.type==='date_picker'" v-model="params[v.name]" format="YYYY-MM-DD" :allow-clear="false"></a-range-picker>
                            <a-range-picker style="width:100%" v-if="v.type==='datetime_picker'" v-model="params[v.name]" format="YYYY-MM-DD HH:mm:ss" show-time :allow-clear="false"></a-range-picker>
                        </a-form-item>
                    </a-col>
                </template>
                <a-col :md="!advanced && 8 || 12" :sm="12" style="padding-top:3px;">
                    <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                        <a-button icon="search" @click="search">查询</a-button>
                        <a-button :loading="exportLoading" icon="download" @click="download">导出</a-button>
                        <a-button  @click="reset">重置</a-button>
                        <a v-if="searchConfig2.length>0" @click="advanced = !advanced" style="margin-left: 8px">
                        {{ advanced ? '收起' : '展开' }}
                        <a-icon :type="advanced ? 'up' : 'down'"/>
                        </a>
                    </span>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script>
    import moment from 'moment'

    import { createNamespacedHelpers } from 'vuex'
    import { STORE_ADMIN_COMMON } from '@/plugins/constant'

    const adminCommonStore = createNamespacedHelpers(STORE_ADMIN_COMMON)
    export default {
        props: {
            // 是否显示
            show:{
                type:Boolean,
                default:true,
            },
            // 配置
            searchConfig:{
                type:Array,
                default:[],
            },
            autoParams:{
                type:Object,
                default:() => ({})
            },
            export: {
                type: Object,
                default:() =>({
                    show: false,
                    url: '',
                    per_page: 100
                })
            }
        },
        data() {
            return {
                advanced:false,
                searchConfig1:[],
                searchConfig2:[],
                params:{
                },
                cascader:{},
                select_remote:{},
                load_cascader:{},
                exportParams:{
                    page:1,
                    per_page: this.export.per_page > 0 ? this.export.per_page : 100,
                },
                exportTotal:0, //总数
                exportData: [], //导出数据
                exportLoading: false
            };
        },
        watch: {},
        computed: {},
        methods: {
            ...adminCommonStore.mapActions({
                setTopBusy: 'gettingBusy'
            }),
            getSearchParams(){
                const params = Object.assign({}, this.params);

                Object.keys(params).forEach(k => {
                    if(params.hasOwnProperty(k)){
                        const config = this.searchConfig.find(conf => conf.name === k);
                        if(config){
                            switch(config.type){
                                case 'date_picker':
                                    if(params[k].length === 2){
                                        params[k] = this.dateFormat(params[k][0]) + ' ~ ' + this.dateFormat(params[k][1]);
                                    }
                                    break;
                            }
                        }

                    }
                });

                return params;
            },
            // 点击搜索
            search(){
                this.$emit('searchParams', this.getSearchParams());
            },
            reset(){
                this.params = {};
                this.resetExport();
                this.$emit('searchParams', {});
            },
            resetExport(){
                this.exportData = [];
                this.exportParams = {
                    page:1,
                    per_page: this.export.per_page > 0 ? this.export.per_page : 100,
                };
                this.exportTotal = 0;
            },
            dateFormat(times){
                return moment(times).format('YYYY-MM-DD');
            },
            timeFormat(times){
                return moment(times).format('YYYY-MM-DD HH:mm:ss');
            },
            cascaderChange(field,row,form){
                this.params[field.name] = row[row.length - 1];
                if(row.length === 0){
                    this.params[field.name] = undefined;
                }
            },
            initSelect(searchConfig){
                const vm = this;
                if(searchConfig.length>0){
                    searchConfig.forEach(field=> {
                        if(field.type === 'cascader'){
                            vm.cascader[field.name] = [];
                            this.$get(field.data, { data_type: 'cascader' }).then(res=>{
                                if(res.code === 200){
                                    const update = {};
                                    update[field.name] = res.data;
                                    vm.cascader = Object.assign({}, vm.cascader, update)
                                }
                            });
                            vm.$set(vm.load_cascader, field.name, selectedOptions => {
                                const targetOption = selectedOptions[selectedOptions.length - 1];

                                targetOption.loading = true;

                                const params = {
                                    pid: targetOption.id,
                                    data_type: 'cascader'
                                };

                                vm.$get(field.data, params).then(res=>{
                                    targetOption.loading = false;
                                    targetOption.children = res.data;


                                    vm.$set(vm.cascader, field.name, [...vm.cascader[field.name]]);

                                });
                            });

                        } else if (field.type === 'select-remote') {
                            vm.select_remote[field.name] = [];
                            vm.$get(field.data, {
                                data_type: 'select'
                            }).then(res => {
                                vm.$set(vm.select_remote, field.name, res.data);
                                const update = {};
                                update[field.name] = res.data;
                                vm.select_remote = Object.assign({}, vm.select_remote, update)
                            });

                        }
                    });
                }
            },
            onChangeText(val){
                if(!this.$isEmpty(val)){
                    this.search();
                }
            },
            download(){
                if(this.$isEmpty(this.export.url)){
                    return this.$message.error('缺少数据来源地址');
                }

                this.setTopBusy(this.exportLoading = true);
                const size = this.exportParams.page * this.exportParams.per_page;
                const params = Object.assign({}, this.getSearchParams(), this.exportParams);
                this.$get(this.export.url, params).then(res=>{
                    if (res.code === 200){
                        if(res.data.total > 0){
                            this.exportTotal = res.data.total;
                        }
                        this.exportData = this.exportData.concat(res.data.data);
                        if(size < this.exportTotal){
                            this.exportParams.page ++;
                            return this.download();
                        } else {
                            this.setTopBusy(this.exportLoading = false);
                            this.$emit('handleExport', this.exportData);
                            this.resetExport();
                        }
                    } else {
                        this.setTopBusy(this.exportLoading = false);
                        this.resetExport();
                    }

                }, err=>{
                    this.$message.error('数据加载失败');
                    this.setTopBusy(this.exportLoading = false);
                });

            }
        },
        created() {
            if(this.searchConfig.length<=0){
                this.show = false;
            }else if(this.searchConfig.length<=2){
                this.searchConfig1 = this.searchConfig;
            }else if(this.searchConfig.length>2){
                this.searchConfig1 = this.searchConfig.slice(0,2);
                this.searchConfig2 = this.searchConfig.slice(2);
            }
            let autoParamsArr = Object.keys(this.autoParams);
            if(autoParamsArr.length>0){
                autoParamsArr.forEach(item=>{
                    this.params[item] = this.autoParams[item];
                });
            }

            this.initSelect(this.searchConfig);
        },
        mounted() {}
    };
</script>
<style lang="scss" scoped>

</style>
