<template>
    <div class="components-input-demo-presuffix">
        <a-input :placeholder="placeholder" :value="cron" @input="handleinput">
            <a-icon slot="prefix" type="schedule" title="corn控件" @click="openModal" />
	        <span slot="suffix">
                <a-icon v-if="cron" type="close-circle" @click="handleEmpty" title="清空" />
		        <a-popover title="使用实例">
                    <template slot="content">
                        <p>实例1：每1分钟执行一次</p>
						<p>* * * * *</p>
						<p>实例2：每小时的第3和第15分钟执行</p>
						<p>3,15 * * * *</p>
						<p>实例3：在上午8点到11点的第3和第15分钟执行</p>
						<p>3,15 8-11 * * *</p>
						<p>实例4：每隔两天的上午8点到11点的第3和第15分钟执行</p>
						<p>3,15 8-11 */2  *  *</p>
						<p>实例5：每周一上午8点到11点的第3和第15分钟执行</p>
						<p>3,15 8-11 * * 1</p>
						<p>实例6：每晚的21:30执行</p>
						<p>30 21 * * *</p>
						<p>实例7：每月1、10、22日的4:45执行</p>
						<p>45 4 1,10,22 * *</p>
						<p>实例8：每周六、周日的1:10执行</p>
						<p>10 1 * * 6,0</p>
						<p>实例9：每天18:00至23:00之间每隔30分钟执行</p>
						<p>0,30 18-23 * * *</p>
						<p>实例10：每星期六的晚上11:00 pm执行</p>
						<p>0 23 * * 6</p>
						<p>实例11：每一小时执行</p>
						<p>* */1 * * *</p>
						<p>实例12：晚上11点到早上7点之间，每隔一小时执行</p>
						<p>0 23-7 * * *</p>
                    </template>
                   <a-icon type="info-circle" />
                </a-popover>
	        </span>
        </a-input>
        <AntCron ref="innerVueCron" :data="afterCron" @ok="handleOK"></AntCron>
    </div>
</template>
<script>
    import AntCron from "./AntCron";
    import { replaceWeekName } from "./validator";
    export default {
        name: "ACron",
        components: {
            AntCron
        },
        props: {
            value: {
                required: false,
                type: String,
                default: ""
            },
            placeholder: {
                required: false,
                type: String,
                default: ""
            }
        },
        data() {
            return {
                cron: this.value,
                afterCron: ""
            };
        },
        watch: {
            value(val) {
                this.cron = val;
            },
            cron(val) {
                console.log(replaceWeekName(val));
                this.afterCron = replaceWeekName(val);
                console.log(val);
                this.$emit("input", val);
            }
        },
        methods: {
            openModal() {
                this.$refs.innerVueCron.show();
            },
            handleOK(val) {
                this.cron = val;
                this.$emit("change", this.cron);
            },
            handleinput(evt) {
                this.cron = evt.target.value;
                if (this.cron !== "") {
                    this.$emit("change", this.cron);
                } else {
                    this.$emit("change", undefined);
                }
            },
            handleEmpty() {
                this.handleOK("");
            }
        },
        model: {
            prop: "value",
            event: "change"
        }
    };
</script>
<style scoped>
    .components-input-demo-presuffix .anticon-close-circle {
        cursor: pointer;
        color: #ccc;
        transition: color 0.3s;
        font-size: 12px;
    }
    .components-input-demo-presuffix .anticon-close-circle:hover {
        color: #f5222d;
    }
    .components-input-demo-presuffix .anticon-close-circle:active {
        color: #666;
    }
</style>