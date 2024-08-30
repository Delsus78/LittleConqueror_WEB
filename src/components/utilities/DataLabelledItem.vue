<template>
  <div class="container">
    <div class="row border-bottom border-black">
      <span class="fs-4 text-start p-0">
        {{ value }}
      </span>
    </div>
    <div class="row">
      <span class="text-muted fw-light text-uppercase fs-6 p-0 d-flex justify-content-between align-items-center">
        <span>{{ label }}</span>
        <span :class="['badge', iconBgColor]">
          <font-awesome-icon beat :icon="icon"/>
      </span>
      </span>
    </div>
  </div>
</template>
<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const { label, value, icon, iconBgColor } = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  iconBgColor: {
    type: String,
    default: 'text-bg-secondary'
  }
});
</script>
<style scoped>

</style>