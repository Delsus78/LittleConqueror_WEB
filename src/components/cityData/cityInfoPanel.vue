<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed text-shadow"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#yourcities-collapse' + cityData.osmType + cityData.id"
              aria-expanded="true"
              :aria-controls="'yourcities-collapse' + cityData.osmType + cityData.id">
        <strong data-bs-toggle="tooltip"
                data-bs-placement="left"
                :data-bs-title="'City ID : ' + cityData.osmType + cityData.id">{{ cityData.name }}</strong>
      </button>
    </h2>
    <div :id="'yourcities-collapse' + cityData.osmType + cityData.id"
         class="accordion-collapse collapse">
      <div class="accordion-body">
        <div class="container btn-group mb-3" role="group">
          <button type="button" class="btn btn-outline-primary"
                  @click="emit('show-city-on-map', cityData)">
            <font-awesome-icon icon="map-marked-alt"/> Afficher sur la carte
          </button>
          <button type="button" class="btn btn-outline-primary"
                  @click="emit('modify-city-action', cityData.id)">
            <font-awesome-icon icon="circle-exclamation"/> Modifier l'action
          </button>
          <button type="button" class="btn btn-outline-danger"
                  @click="emit('abandon-city', cityData.id)">
            <font-awesome-icon icon="triangle-exclamation"/> Abandonner
          </button>
        </div>
        <div class="container">
          <div class="row justify-content-around">
            <div class="col-6">
              <ul class="list-group">
                <li class="list-group-item row">
                  <h5 class="col-4 card-title">Population</h5>
                  <p class="col-8 card-text">{{ cityData.population }}</p>
                </li>
                <li class="list-group-item row">
                  <h5 class="col-4 card-title">Latitude</h5>
                  <p class="col-8 card-text">{{ cityData.latitude }}</p>
                </li>
                <li class="list-group-item row">
                  <h5 class="col-4 card-title">Longitude</h5>
                  <p class="col-8 card-text">{{ cityData.longitude }}</p>
                </li>
              </ul>
            </div>
            <div class="col-5">
              <CityActionPanel :actionData="cityData.action"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import CityActionPanel from "@/components/cityData/CityActionPanel.vue";

const emit = defineEmits(["abandon-city", "modify-city-action", "show-city-on-map"]);

const { cityData } = defineProps({
  cityData: {
    type: Object,
    required: true,
    default: {
      "id": 0,
      "osmType": "string",
      "name": "string",
      "population": 0,
      "latitude": 0,
      "longitude": 0,
      "geojson": [
        "string"
      ]
    }
  }
});
</script>
<style scoped>

</style>