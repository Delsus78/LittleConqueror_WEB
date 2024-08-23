<template>
  <div class="container p-10">
    <div class="row">
      <div class="col-12 text-white border-bottom mb-3 shadow-lg">
        <div class="row">
          <h1 class="col-12 position-relative"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              :data-bs-title="'Territory ID : ' + territoryData.id">
            Territoire
          </h1>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="shadow-lg mb-3 rounded" style="height: 30vh;">
          <leaflet-map />
        </div>
      </div>
      <div class="col-md-8">
        <div class="shadow-lg overflow-y-scroll rounded" style="height: 60vh;">
          <!-- Sidebar content goes here -->
          <div class="accordion" id="yourCitiesAccordion">
            <city-info-panel v-for="city in territoryData.cities"
                             :key="city.id"
                             :cityData="city"
                             class="grid-item"
                             @abandon-city="onAbandonCity"
                             @modify-city-action="onModifyCityAction"
                             @show-city-on-map="onShowCityOnMap"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import LeafletMap from "@/components/LeafletMap.vue";
import {useCitiesStore, useLeafletMapStore} from "@/stores/index.js";
import {onMounted} from "vue";
import CityInfoPanel from "@/components/cityData/cityInfoPanel.vue";
const leafletMapStore = useLeafletMapStore();
const citiesStore = useCitiesStore();

const { createPolygonFromCity, removePolygons } = leafletMapStore;
const { fetchUserTerritory, fetchCityDataByOsmId } = citiesStore;

const territoryData = await fetchUserTerritory();

onMounted(
    () => {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }
)

const onAbandonCity = (cityId) => {
  console.log('Abandon city', cityId);
}

const onModifyCityAction = (cityId) => {
  console.log('Modify city action', cityId);
}

async function onShowCityOnMap(city) {
  const cityData = await fetchCityDataByOsmId(city.id, city.osmType);

  removePolygons();
  createPolygonFromCity(cityData, {
    style: () => ({color: 'green'})
  });
}

</script>
<style scoped>
</style>