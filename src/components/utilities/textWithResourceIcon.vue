<template>
  <div :class="`row ${additionalCss} rounded shadow align-items-center`">
    <resource-icon class="col-1" :resource-name="resourceName" size="sm"/>
    <slot/>
  </div>
</template>
<script setup>
import ResourceIcon from "@/components/icons/ResourceIcon.vue";

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