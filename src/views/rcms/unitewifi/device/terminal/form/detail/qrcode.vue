<script setup lang="ts">
import { defineOptions, ref } from "vue";
import ReQrcode from "@/components/ReQrcode";
import { useRoute } from "vue-router";

defineOptions({
  name: "QrCode"
});
const route = useRoute();
const qCode = ref(
  "https://service.wheat-shark.com/api/fl-dispatch/open/device/address?sn="
);
</script>

<template>
  <el-card>
    <ReQrcode :text="qCode + route.query.deviceSn" :width="300" />
  </el-card>
</template>

<style scoped>
.el-card {
  --el-card-padding: 0px !important;
}
</style>
