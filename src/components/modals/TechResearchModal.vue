<template>
  <div class="offcanvas offcanvas-start" id="techResearchModal" data-bs-theme="dark">
    <div class="offcanvas-header" :style="`background-color:` + getCategoryColorCode(techResearch.category)">
      <h5 class="offcanvas-title text-black" id="offcanvasExampleLabel">Technologie</h5>
      <button type="button" class="btn-close text-reset fs-4 fw-bold bg-white border-0 shadow-none"
              data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="border-bottom">
        <h3>{{techResearch.name}}</h3>
        <p>{{techResearch.description}}</p>

        <p>{{techResearch}}</p>
      </div>

      <div class="p-2 border-top border-light">
        <h5>Prérequis</h5>
        <div v-if="techResearch.prerequisitesData?.length === 0">
          <p>Aucun</p>
        </div>
        <div v-else v-for="prerequisite in techResearch.prerequisitesData" :key="prerequisite.researchType"
          class="text-black rounded-2 p-1 mb-1 border border-light shadow-sm text-center"
             :style="`background-color:` + getCategoryColorCode(prerequisite.category)">
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
    <div class="p-2 border-top border-light">
      <div class="row justify-content-around">
        <button type="button" class="btn col-3 btn-primary mt-3" :disabled="techResearch.researchStatus !== 'Undiscovered'"
                @click="emit('research-tech', techResearchId)">
          Rechercher
        </button>
        <DataLabelledItem class="col-3 text-center align-self-center m-0 fs-4" icon=""
                          label="Coût" :value="techResearch.cost"/>
      </div>

    </div>
  </div>
</template>
<script setup>
import {useTechResearchStore} from "@/stores/index.js";
import {getCategoryColorCode, getColorFromStatus} from "@/Helpers.js";
import TechIcon from "@/components/icons/TechIcon.vue";
import TextWithInfoIcon from "@/components/utilities/textWithInfoIcon.vue";
import DataLabelledItem from "@/components/utilities/DataLabelledItem.vue";

const store = useTechResearchStore();

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