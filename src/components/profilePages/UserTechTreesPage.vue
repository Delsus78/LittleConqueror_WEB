<template>
  <div class="container">
    <div class="nav nav-pills">
      <button @click="techPageCategory = 'TheoryResearch'" :class="{'active': techPageCategory === 'TheoryResearch'}" class="fw-bold fs-4 nav-link"
              :style="{color: getCategoryColorCode('TheoryResearch')}">
        <TechCategoryIcon category-name='TheoryResearch'/> Theories
      </button>
      <button @click="techPageCategory = 'EngineeringResearch'" :class="{'active': techPageCategory === 'EngineeringResearch'}" class="nav-link fw-bold fs-4"
              :style="{color: getCategoryColorCode('EngineeringResearch')}">
        <TechCategoryIcon category-name='EngineeringResearch'/> Ingenieries
      </button>
      <button @click="techPageCategory = 'GeopoliticResearch'" :class="{'active': techPageCategory === 'GeopoliticResearch'}" class="nav-link fw-bold fs-4"
              :style="{color: getCategoryColorCode('GeopoliticResearch')}">
        <TechCategoryIcon category-name='GeopoliticResearch'/> Geopolitiques
      </button>
      <button @click="techPageCategory = 'MilitaryResearch'" :class="{'active': techPageCategory === 'MilitaryResearch'}" class="nav-link fw-bold fs-4"
              :style="{color: getCategoryColorCode('MilitaryResearch')}">
        <TechCategoryIcon category-name='MilitaryResearch'/> Militaires
      </button>
      <button @click="techPageCategory = 'all'" :class="{'active': techPageCategory === 'all'}" class="nav-link fw-bold fs-4"
              :style="{color: 'white'}">
        <InfoIcon resource-name="all" size="lg"/> Tous
      </button>

    </div>

    <tech-tree class="mt-3 rounded shadow-lg border border-3 border-light-subtle bg-blurred"
        :data="dataToDisplay"
        :target-node="targetNode"
        :key="techPageCategory" @toggle-offcanvas="toggleTechResearchOffCanvas"/>

    <tech-research-modal v-if="selectedNode !== null" :techResearch="selectedNode" :key="selectedNode"
    @research-tech="researchTech"/>
  </div>
</template>
<script setup>
import TechTree from "@/components/TechTree/TechTree.vue";
import {computed, ref} from "vue";
import {useTechResearchStore} from "@/stores/index.js";
import {getCategoryColorCode} from "@/Helpers.js";
import TechCategoryIcon from "@/components/icons/TechCategoryIcon.vue";
import InfoIcon from "@/components/icons/InfoIcon.vue";
import TechResearchModal from "@/components/modals/TechResearchModal.vue";

const techPageCategory = ref("TheoryResearch");
const store = useTechResearchStore();
const researchData = await store.fetchTechResearches();
const data = store.transformTechResearchesToVNetworkGraph(researchData);
const selectedNode = ref(null);

const targetNode = ref("Root");

const dataToDisplay = computed(() => {
  // copy the data to avoid modifying the original data
  let result = JSON.parse(JSON.stringify(data));

  // data.nodes is a map of nodes, we need to filter it to get the nodes we want to display
  result.nodes = filterDataNodesMap(result.nodes, techPageCategory.value);


  result.edges = filterDataEdgesMap(result.edges, result.nodes);

  // populate required tech with their research status
  for (const [nodeId, node] of Object.entries(result.nodes)) {
    if (node.researchCategory === "root") {
      continue;
    }
    const research = researchData.find(research => research.techId === nodeId);
    if (research) {
      node.researched = research.researched;
    }
  }

  return result;
});

const filterDataNodesMap = (dataNodes, techCategory) => {
  return Object.fromEntries(
      Object.entries(dataNodes).filter(([nodeId, node]) => {
        return (node.researchCategory === techCategory || techCategory === 'all') || node.researchCategory === "root";
      })
  );
};

const filterDataEdgesMap = (dataEdges, dataNodes) => {
  return Object.fromEntries(
      Object.entries(dataEdges).filter(([edgeId, edge]) => {
        return dataNodes[edge.source] && dataNodes[edge.target];
      })
  );
};

const toggleTechResearchOffCanvas = (nodeId) => {
  selectedNode.value = data.nodes[nodeId];
  setTimeout(() => {
    const offCanvas = new bootstrap.Offcanvas(document.getElementById('techResearchModal'));
    offCanvas.show();
  }, 100);
};

async function researchTech(techResearchId) {
  await store.postStartResearch(techResearchId)
      .catch((errorMsg) => {
        if (errorMsg.includes("tech research in progress")) {
          if (confirm("Vous avez déjà une recherche en cours, voulez-vous l'annuler pour commencer une nouvelle recherche?")) {
            store.postStartResearch(techResearchId, true);
          }
        }
      });
}

</script>
<style scoped>
.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid rgb(255, 255, 255);
  backdrop-filter: blur(10px);
}
</style>