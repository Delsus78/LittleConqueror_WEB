<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ city.name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ city.country }}</h6>
      <p class="card-text">Population: {{ city.population }}</p>
      <p class="card-text">Latitude: {{ city.latitude }}</p>
      <p class="card-text">Longitude: {{ city.longitude }}</p>
    </div>
  </div>
</template>
<script setup>

const {
  city
} = defineProps({
  city: {
    type: Object,
    required: true
  }
});
</script>
<style scoped>
.card {
  margin-top: 20px;
}
</style>