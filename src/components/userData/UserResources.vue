<template>
  <div class="container-fluid">
    <div class="row gap-4 justify-content-center">
      <ResourceInfoPanel v-for="key in userResourcesFiltered"
                         :key="key" :resourceKey="key" :resource="userResources[key]"
                         class="grid-item"/>
    </div>
  </div>
</template>
<script setup>
import ResourceInfoPanel from "@/components/userData/ResourceInfoPanel.vue";
import {computed} from "vue";

const { userResources } = defineProps({
  userResources: {
    type: Object,
    required: true,
    default: {}
  }
});

const userResourcesFiltered = computed(() => {
  return Object.keys(userResources).filter(key => userResources[key].production !== undefined);
});
</script>
<style scoped>

</style>