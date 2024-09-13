<template>
  <div class="card bg-primary-subtle p-3">
    <div class="card-title">
      <h5 class="text-center">{{ city.name }}</h5>
    </div>
    <div class="card-body">
      <div class="container">
        <text-with-info-icon v-for="key in keyFiltered" additionalCss="mb-2 p-1 text-bg-success bg-success"
                             :icon-name="key">
          <div class="col row">
            <span class="col-8 col-xl-12 text-capitalize fw-bold">{{ key }}</span>
            <span class="col align-self-end text-end text-bg-light rounded mx-2 fw-bolder">{{ city[key] }}</span>
          </div>
        </text-with-info-icon>
        <text-with-info-icon v-if="city.action != null" additionalCss="mb-2 p-1 text-bg-success bg-success"
                             :icon-name="city.action.actionType" icon-type="action">
          <span class="col text-capitalize fw-bold">Action</span>
          <div v-for="actionKey in Object.keys(city.action)">
            <div v-if="actionKey !== 'actionType' && actionKey !== 'id'" class="col row mb-1">
              <span class="col-8 col-xl-12 text-capitalize fw-bold">{{ actionKey }}</span>
              <span class="col align-self-end text-end text-bg-light rounded mx-2 fw-bolder">
                <span v-if="actionKey === 'startTime'">
                  {{ getFormatedDate(city.action[actionKey]) }}
                </span>
                <span v-else>
                  {{ city.action[actionKey] }}
                </span>
              </span>
            </div>
          </div>
        </text-with-info-icon>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed} from "vue";
import TextWithInfoIcon from "@/components/utilities/textWithInfoIcon.vue";
import {getFormatedDate} from "@/Helpers.js";

const { city } = defineProps({
  city: {
    type: Object,
    required: true
  }
});

const keyFiltered = computed(() => {
  return Object.keys(city).filter((key) => {
    return key !== 'id'
        && key !== 'name'
        && key !== 'geojson'
        && key !== 'latitude'
        && key !== 'longitude'
        && key !== 'osmType'
        && key !== 'action' ;
  });
});

</script>
<style scoped>

</style>