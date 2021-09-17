<template>
    <div>
        <input
            type="file"
            :accept="accept"
            @change="onChange"/>
        <xlsx-read :file="file">
            <xlsx-json @parsed="parsed" :options="{ header: 1 }"></xlsx-json>
        </xlsx-read>
    </div>
</template>
<script>
import { XlsxRead, XlsxJson } from 'vue-xlsx/dist/vue-xlsx.es.js';

export default {
    components: {
        XlsxRead,
        XlsxJson
    },
    name: 'AntImportXlsx',
    props: {
        columns: Array,
        accept: {
            type: String,
            default: ".xlsx"
        }
    },
    data() {
        return {
            file: null
        };
    },
    methods: {
        onChange(event){
            this.file = event.target.files ? event.target.files[0] : null;
        },
        parsed(data){
            const { columns } = this;
            // 2D array uses the raw value
            if (data && data.length > 0){
                const list = data.reduce((arr, row) => {
                    arr.push(
                        columns.reduce((mapped, col, index) => {
                            mapped[col.dataIndex] = col.format
                                ? col.format(row[index])
                                : row[index];
                            return mapped;
                        }, {})
                    );
                    return arr;
                }, []);
                this.$nextTick(() => {
                    this.$emit('parsed', list);
                    this.file = null;
                });
            }
        }
    }
};
</script>
<style lang="scss">

</style>