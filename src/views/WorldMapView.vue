<template>
  <div class="container">
    <div class="row">
      <div style="height: 60vh;">
        <leaflet-map @onMapClick="onMapClick" />
      </div>
    </div>
  </div>
</template>
<script setup>

import LeafletMap from "@/components/LeafletMap.vue";
import {onMounted} from "vue";
import {useCitiesStore} from "@/stores/index.js";
import {useLeafletMapStore} from "@/stores/index.js";

const citiesStore = useCitiesStore();
const leafletMapStore = useLeafletMapStore();

onMounted( async () => {
  const featureCollection = await citiesStore.fetchUserCitiesFeatureCollection();

  const getColor = (action) => {
    if (action == null) {
      return '#FFEDA0';
    }

    return action.actionType === 'Agricole' ? '#29b913' :
        action.actionType === 'Miniere' ? '#9f9f9f' :
            action.actionType === 'Militaire' ? '#0029ff' :
                action.actionType === 'Espionnage' ? '#ff0000' :
                    action.actionType === 'Diplomatique' ? '#ff00ff' :
                        action.actionType === 'Technologique' ? '#00ff00' :
                            action.actionType === 'Rien' ? '#FFEDA0' : '#FFEDA0';
  }

  const style = (feature) => {
    return {
      fillColor: getColor(feature.properties.action),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  leafletMapStore.removePolygons();
  leafletMapStore.setGeoJsonLayer(featureCollection, style);
})

const onMapClick = (event) => {
  console.log(event);
};
</script>
<style scoped>

</style>