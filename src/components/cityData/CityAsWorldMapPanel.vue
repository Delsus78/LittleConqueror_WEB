<template>
  <div class="card bg-primary-subtle p-3">
    <div class="card-title">
      <h5 class="text-center">{{ city.name }}</h5>
    </div>
    <div class="card-body">
      <div class="container">
        <text-with-info-icon v-for="key in keyFiltered" additionalCss="mb-2 p-1 text-bg-success bg-success"
                             :resource-name="key">
          <div class="col row">
            <span class="col-8 col-xl-12 text-capitalize fw-bold">{{ key }}</span>
            <span class="col align-self-end text-end text-bg-light rounded mx-2 fw-bolder">{{ city[key] }}</span>
          </div>
        </text-with-info-icon>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed} from "vue";
import TextWithInfoIcon from "@/components/utilities/textWithInfoIcon.vue";

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
        && key !== 'osmType';
  });
});

</script>
<style scoped>

</style>