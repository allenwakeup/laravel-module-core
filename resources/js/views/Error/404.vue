<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="$router.push({ name: 'admin_default' })">
	      返回模块首页
      </a-button>
    </template>
  </a-result>
</template>

<script>
import { STORE_ADMIN_COMMON } from '@/plugins/constant'
import {createNamespacedHelpers} from "vuex";

const adminCommonStore = createNamespacedHelpers(STORE_ADMIN_COMMON)
export default {
  methods: {
    ...adminCommonStore.mapActions([
      'selectMenu'
    ]),

  },
  created() {
    this.selectMenu({
      selected: [0],
      route: '/Admin/goodcatch/m/core/index'
    })
  },
}
</script>

<style>

</style>