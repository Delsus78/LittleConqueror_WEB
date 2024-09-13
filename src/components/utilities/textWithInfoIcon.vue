<template>
  <div :class="`row ${additionalCss} rounded shadow align-items-center`">
    <info-icon v-if='iconType === "resource"' class="col-1" :resource-name="iconName" size="2x"/>
    <action-icon v-else-if='iconType === "action"' class="col-1" :action-name="iconName" size="2x"/>
    <tech-icon v-else-if='iconType === "tech"' class="col-1" :tech-id="iconName" size="2x"/>
    <slot/>
  </div>
</template>
<script setup>
import InfoIcon from "@/components/icons/InfoIcon.vue";
import ActionIcon from "@/components/icons/ActionIcon.vue";
import TechIcon from "@/components/icons/TechIcon.vue";

const { iconName, additionalCss, iconType } = defineProps({
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
    default: 'resource',
    validator: (value) => ['resource', 'action', 'tech'].includes(value),
  }
});
</script>
<style scoped>

</style>