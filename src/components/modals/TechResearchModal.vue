<template>
  <div class="offcanvas offcanvas-start" id="techResearchModal" data-bs-theme="dark">
    <div class="offcanvas-header" :style="`background-color:` + getCategoryColorCode(techResearch.researchCategory)">
      <h5 class="offcanvas-title text-black" id="offcanvasExampleLabel">Technologie</h5>
      <button type="button" class="btn-close text-reset fs-4 fw-bold bg-white border-0 shadow-none"
              data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="border-bottom">
        <h3>{{techResearch.name}}</h3>
        <p>{{techResearch.description}}</p>
      </div>

      <div class="border-bottom mt-2">
        <h3>
          <span class="badge" :style="`background-color:` + getColorFromStatus(techResearch.researchStatus)">
                {{ techResearch.researchStatus }}
          </span>
        </h3>
      </div>

      <div class="p-2 border-top border-light">
        <h5>Prérequis</h5>
        <div v-if="!techResearch.prerequisitesData">
          <p>Aucun</p>
        </div>
        <div v-else v-for="prerequisite in techResearch.prerequisitesData" :key="prerequisite.researchType"
          class="text-black rounded-2 p-1 mb-1 border border-light shadow-sm text-center"
             :style="`background-color:` + getCategoryColorCode(prerequisite.researchCategory)">
          <div class="row justify-content-center align-items-center p-1">
            <tech-icon :tech-id="prerequisite.researchType" size="2x" class="col-1"/>
            <p class="col-auto fs-5 align-self-center text-center m-0">
              {{prerequisite.researchType}}
              <span class="badge" :style="`background-color:` + getColorFromStatus(prerequisite.researchStatus)">
                {{ prerequisite.researchStatus }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="p-2 border-top border-light" :style="`background-color:` + getAvailabilityColor(techResearch.availability)">
      <h6>{{ getAvailabilityText(techResearch.availability) }}</h6>
      <div class="row justify-content-around">
        <div class="col-3">
          <button type="button" class="btn btn-primary mt-3" :disabled="techResearch.researchStatus !== 'Undiscovered'"
                  @click="emit('research-tech', techResearchId)">
            Rechercher
          </button>
        </div>
        <DataLabelledItem class="col-3 text-center align-self-center m-0 fs-4" icon=""
                          label="Coût" :value="techResearch.cost"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import {getAvailabilityColor, getAvailabilityText, getCategoryColorCode, getColorFromStatus} from "@/Helpers.js";
import TechIcon from "@/components/icons/TechIcon.vue";
import DataLabelledItem from "@/components/utilities/DataLabelledItem.vue";


const { techResearch } = defineProps({
  techResearch: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['research-tech']);

</script>
<style scoped>

</style>