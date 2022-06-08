<template>
  <a-config-provider :locale="zhCN">
    <Table />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import Table from "./components/Table/index.vue";
export default defineComponent({
  components: { Table },
  data() {
    return {
      zhCN,
    };
  },
});
</script>
