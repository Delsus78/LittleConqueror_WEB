<template>
  <div :class="`row ${additionalCss} rounded shadow align-items-center`">
    <info-icon class="col-1" :resource-name="resourceName" size="2x"/>
    <slot/>
  </div>
</template>
<script setup>
import InfoIcon from "@/components/icons/InfoIcon.vue";

const { resourceName, additionalCss } = defineProps({
  resourceName: {
    type: String,
    required: true
  },
  additionalCss: {
    type: String,
    default: 'text-success bg-success'
  }
});
</script>
<style scoped>

</style>