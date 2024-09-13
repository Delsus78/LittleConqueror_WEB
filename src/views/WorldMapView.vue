<template>
  <div class="container position-relative">
    <div class="row">
      <div style="height: 70vh;">
        <leaflet-map @onMapClick="onMapClick" class="z-0 rounded"/>
      </div>
    </div>
    <div v-if="displayedCity">
      <div class="d-none d-xxl-block">
        <CityAsWorldMapPanel class="position-absolute bottom-0 start-100 translate-middle z-3 shadow-md w-25 h-auto"
                             :city="displayedCity" :key="displayedCity.id"/>
      </div>
      <div class="d-lg-none">
        <CityAsWorldMapPanel class="position-absolute bottom-row start-50 translate-middle z-3 shadow-md h-auto w-100"
                             :city="displayedCity" :key="displayedCity.id"/>
      </div>
      <div class="d-none d-lg-block d-xxl-none">
        <CityAsWorldMapPanel class="position-absolute bottom-row start-50 translate-middle z-3 shadow-md h-auto w-50"
                             :city="displayedCity" :key="displayedCity.id"/>
      </div>
    </div>
  </div>
</template>
<script setup>

import LeafletMap from "@/components/LeafletMap.vue";
import {onMounted, ref} from "vue";
import {useCitiesStore} from "@/stores/index.js";
import {useLeafletMapStore} from "@/stores/index.js";
import {toast} from "vue3-toastify";
import {storeToRefs} from "pinia";
import CityAsWorldMapPanel from "@/components/cityData/CityAsWorldMapPanel.vue";
import {getActionColorCode} from "@/Helpers.js";

const citiesStore = useCitiesStore();
const leafletMapStore = useLeafletMapStore();
const displayedCity = ref(null);

const { isLoading } = storeToRefs(leafletMapStore);

onMounted( async () => {
  const featureCollection = await citiesStore.fetchUserCitiesFeatureCollection();

  const getColor = (action) => {
    return getActionColorCode(action.actionType);
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

const onMapClick = async (event) => {
  if (isLoading.value) {
    toast.error('Veuillez patienter, une action est en cours');
    return;
  }

  isLoading.value = true;
  const resultedCity = await citiesStore.fetchCityByLonLat(event.latlng.lng, event.latlng.lat)
      .catch((error) => {
        toast.error('Oups, cette ville ne semble pas exister');
      });

  if (resultedCity == null) {
    isLoading.value = false;
    return;
  }

  displayedCity.value = resultedCity;

  leafletMapStore.removePolygons();
  leafletMapStore.createPolygonFromCity(displayedCity.value, { style:
    {
      fillColor: '#FFEDA0',
      weight: 2,
      opacity: 1,
      color: 'gray',
      fillOpacity: 0.3
    }
  });

  isLoading.value = false;
};

</script>
<style scoped>

</style>