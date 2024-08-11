<template>
  <div class="container bg-gradient rounded-5">
    <h4 class="row p-3 text-white rounded">
      Villes
    </h4>
    <div class="row">
      <div style="height: 60vh;">
        <leaflet-map @onMapClick="onMapClick" />
      </div>
    </div>
  </div>
</template>
<script setup>

import LeafletMap from "@/components/LeafletMap.vue";

const onMapClick = (event) => {
  console.log(event);
};
</script>
<style scoped>

</style>