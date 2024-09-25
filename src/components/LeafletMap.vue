<template>
  <div id="map" class="map"></div>
</template>
<script setup>
import {onMounted, ref, watch} from "vue";
import L from "leaflet";
import { useLeafletMapStore } from "@/stores/index.js";
const store = useLeafletMapStore();

const map = ref(null);
const featureGroup = ref(null);

const emit = defineEmits(['onMapClick']);

onMounted(() => {
  map.value = L.map('map').setView([45.9965761, -2.6895024], 5);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    noWrap: true,
    attribution: '&copy; <a href="https://github.com/Delsus78">Little Conqueror</a> BETA'
  }).addTo(map.value);

  // event on the map to get the latitude and longitude
  map.value.on('click', e => emit('onMapClick', e));

  // init layerGroup
  featureGroup.value = L.featureGroup().addTo(map.value);

});

watch(store.$state, (state) => {

  // clear the layer group
  featureGroup.value.clearLayers();

  if (state.polygonsDisplayed) {
    displayGeoJsonDataOnMap(state.polygonsDisplayed);
  }

  if (state.geoJsonLayer) {
    displayGeoJsonLayerOnMap(state.geoJsonLayer);
  }

  const bounds = featureGroup.value.getBounds();
  map.value.flyToBounds(bounds);

},{ deep: true });

function displayGeoJsonDataOnMap(geoJsonDataMap){
  Object.keys(geoJsonDataMap).forEach(key => {
    const geoJsonData = geoJsonDataMap[key];

    const polygon = L.geoJSON(geoJsonData.geojson,
        geoJsonData.options || {
          style: () => ({color: 'red'})
        });

    polygon.addTo(featureGroup.value);
  });
}

function displayGeoJsonLayerOnMap(geoJsonLayer) {
  L.geoJSON(geoJsonLayer.geojson, { style: geoJsonLayer.styleFunc })
      .addTo(featureGroup.value);
}

</script>
<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>