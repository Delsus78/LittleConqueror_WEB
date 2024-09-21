<template>
  <div class="offcanvas offcanvas-start" id="techResearchModal" data-bs-theme="dark">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div>
        <h3>{{techResearch.name}}</h3>
        <p>{{techResearch.description}}</p>
      </div>
      <div class="dropdown mt-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          {{techResearch}}
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed, ref} from "vue";
import {useTechResearchStore} from "@/stores/index.js";

const store = useTechResearchStore();
const researchData = await store.fetchTechResearches();

const { techResearchId } = defineProps({
  techResearchId: {
    type: String,
    required: true,
    default: 'Armement_I'
  }
});

const emit = defineEmits(['valid-action-change']);


const techResearch = computed(() => {
  return researchData.find(tech => tech.researchType === techResearchId);
});
</script>
<style scoped>

</style>