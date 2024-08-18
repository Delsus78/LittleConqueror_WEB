<template>
  <div class="card bg-warning" style="width: 10rem;">
    <resource-icon class="card-img-top text-center mt-4 mb-4" :resource-name="resourceKey" size="3x"/>
    <div class="card-body">
      <h5 class="card-title text-center text-dark text-uppercase
">{{ resourceKey }}</h5>
      <p class="card-text rounded-3 text-center border border-dark bg-light shadow-top mt-4
">{{ resource }}</p>
    </div>
  </div>
</template>
<script setup>
import ResourceIcon from "@/components/ResourceIcon.vue";

const { resourceKey, resource } = defineProps({
  resourceKey: {
    type: String,
    required: true
  },
  resource: {
    type: Number,
    required: true
  }
});

</script>
<style scoped>

</style>