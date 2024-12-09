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
  <ReQrcode :text="qCode + route.query.deviceSn" :width="320" />
</template>
