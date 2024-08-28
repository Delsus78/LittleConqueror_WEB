<template>
  <div class="card bg-primary-subtle">
    <action-icon class="card-img-top text-center mt-4 mb-4"
                 :action-name="action.actionType" size="3x"/>
    <div class="card-body">

      <div v-if="action.actionType === 'rien'">
        <h5 class="card-title text-center">Aucune action</h5>
        <p class="card-text">Aucune action n'est définie pour cette ville.</p>
      </div>
      <h5 v-else class="card-title text-center">Ville {{ action.actionType }}</h5>

      <div class="container" v-if="action.actionType === 'Agricole'">
        <text-with-resource-icon additionalCss="text-bg-success bg-success" resource-name="food">
          <div class="col position-relative">
            + {{action.foodProduction}}
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              x {{action.agriculturalFertility}}<span class="visually-hidden">x {{action.agriculturalFertility}}</span>
            </span>
          </div>
        </text-with-resource-icon>
      </div>

      <div class="container" v-else-if="action.actionType === 'Miniere'">
        <text-with-resource-icon additionalCss="text-bg-success bg-success" :resource-name="action.resourceType.toLowerCase()">
          <div class="col position-relative">
            + TODO
          </div>
        </text-with-resource-icon>
      </div>
    </div>
    <div v-if="withCityData" class="card-footer bg-primary-subtle text-muted ">
      <div class="row align-items-center">
        <div class="col">
          <span class="fs-5"> {{cityData.name}}</span>
        </div>
        <div class="col text-end">
          <span> {{cityData.population}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ActionIcon from "@/components/icons/ActionIcon.vue";
import {computed} from "vue";
import TextWithResourceIcon from "@/components/utilities/textWithResourceIcon.vue";

const { actionData, cityData, withCityData } = defineProps({
  actionData: {
    type: Object,
    required: true
  },
  cityData: {
    type: Object,
    required: false
  },
  withCityData: {
    type: Boolean,
    required: false,
    default: false
  }
});

const action = computed(() => actionData || {'actionType': 'rien'});
</script>
<style scoped>

</style>