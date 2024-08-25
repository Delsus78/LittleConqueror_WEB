<template>
  <div :class="`row ${textColor} ${bgColor} rounded shadow align-items-center`">
    <resource-icon class="col-1" :resource-name="resourceName" size="md"/>
    <slot/>
  </div>
</template>
<script setup>
import ResourceIcon from "@/components/icons/ResourceIcon.vue";

const { resourceName, textColor, bgColor } = defineProps({
  resourceName: {
    type: String,
    required: true
  },
  textColor: {
    type: String,
    default: 'text-success'
  },
  bgColor: {
    type: String,
    default: 'bg-success'
  }
});
</script>
<style scoped>

</style>