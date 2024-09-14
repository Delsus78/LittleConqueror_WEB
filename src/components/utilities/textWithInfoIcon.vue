<template>
  <div :class="`row ${additionalCss} rounded shadow align-items-center`">
    <info-icon v-if='iconType === "info"' class="col-1" :resource-name="iconName" :size="size"/>
    <action-icon v-else-if='iconType === "action"' class="col-1" :action-name="iconName" :size="size"/>
    <tech-icon v-else-if='iconType === "tech"' class="col-1" :tech-id="iconName" :size="size"/>
    <tech-category-icon v-else-if='iconType === "tech-category"' class="col-1" :category-name="iconName" :size="size"/>
    <resource-icon v-else-if='iconType === "resource"' class="col-1" :resource-name="iconName" :size="size"/>
    <slot/>
  </div>
</template>
<script setup>
import InfoIcon from "@/components/icons/InfoIcon.vue";
import ActionIcon from "@/components/icons/ActionIcon.vue";
import TechIcon from "@/components/icons/TechIcon.vue";
import ResourceIcon from "@/components/icons/ResourceIcon.vue";
import TechCategoryIcon from "@/components/icons/TechCategoryIcon.vue";

const { iconName, additionalCss, iconType, size } = defineProps({
  iconName: {
    type: String,
    required: true
  },
  additionalCss: {
    type: String,
    default: 'text-success bg-success'
  },
  iconType: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'action', 'tech', 'resource', 'tech-category'].includes(value),
  },
  size: {
    type: String,
    default: '2x',
    validator: (value) => ['1x', '2x', '3x', '4x', '5x'].includes(value),
  }
});
</script>
<style scoped>

</style>