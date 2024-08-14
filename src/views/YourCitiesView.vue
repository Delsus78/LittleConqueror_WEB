<template>
  <div class="container">
    <div class="row">
      <!-- Left column (Main content) -->
      <div class="col-md-4">
        <div class="shadow-lg mb-3 rounded" style="height: 30vh;">
          <leaflet-map @onMapClick="onMapClick" />
        </div>
      </div>
      <!-- Right column (Sidebar with boxes, a title and a scrollable capacity) -->
      <div class="col-md-8">
        <div class="shadow-lg overflow-y-scroll rounded" style="height: 60vh;">
          <!-- Sidebar content goes here -->
          <div class="card-deck">
            <div class="card mb-3" v-for="i in 10" :key="i">
              <div class="card-body">
                <h5 class="card-title">Sidebar title</h5>
                <p class="card-text">Sidebar content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import LeafletMap from "@/components/LeafletMap.vue";

const onMapClick = (e) => {
  console.log(e.latlng.lat, e.latlng.lng);
};
</script>
<style scoped>
</style>