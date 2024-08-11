<template>
  <div id="map" class="map"></div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import L from "leaflet";

const map = ref(null);

const emit = defineEmits(['onMapClick']);

onMounted(() => {
  map.value = L.map('map').setView([45.9965761, -2.6895024], 5);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    noWrap: true,
    attribution: '&copy; <a href="https://github.com/Delsus78">Little Conqueror</a> BETA'
  }).addTo(map.value);

  // event on the map to get the latitude and longitude
  map.value.on('click', e => emit('onMapClick', e));
});
</script>
<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>