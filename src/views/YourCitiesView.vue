<template>
  <div class="container">
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
                             @modify-city-action="(newActionType) => onModifyCityAction(city.id, newActionType)"
                             @show-city-on-map="onShowCityOnMap"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import LeafletMap from "@/components/LeafletMap.vue";
import {useActionStore, useCitiesStore, useLeafletMapStore} from "@/stores/index.js";
import {onMounted} from "vue";
import CityInfoPanel from "@/components/cityData/cityInfoPanel.vue";
const leafletMapStore = useLeafletMapStore();
const citiesStore = useCitiesStore();
const actionsStore = useActionStore();


const territoryData = await citiesStore.fetchUserTerritory();

onMounted(
    () => {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }
)

const onAbandonCity = (cityId) => {
  console.log('Abandon city', cityId);
}

async function onModifyCityAction(cityId, newActionType) {
  console.log('Modify city action', cityId,'to', newActionType);
  await actionsStore.postActionChange(cityId, newActionType);
}

async function onShowCityOnMap(city) {
  const cityData = await citiesStore.fetchCityDataByOsmId(city.id, city.osmType);
  leafletMapStore.removePolygons();
  leafletMapStore.createPolygonFromCity(cityData, {
    style: () => ({color: 'green'})
  });
}

</script>
<style scoped>
</style>