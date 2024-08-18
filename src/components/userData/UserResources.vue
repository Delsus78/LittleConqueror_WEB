<template>
  <div class="container-fluid">
    <div class="row gap-4 justify-content-center">
      <ResourceInfoPanel v-for="key in Object.keys(userResources)"
                         :key="key" :resourceKey="key" :resource="userResources[key]"
                         class="grid-item"/>
    </div>
  </div>
</template>
<script setup>
import ResourceInfoPanel from "@/components/userData/ResourceInfoPanel.vue";

const { userResources } = defineProps({
  userResources: {
    type: Object,
    required: true,
    default: {}
  }
});

</script>
<style scoped>

</style>