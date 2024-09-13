<template>
  <div class="container">
    <div class="nav nav-pills">
      <button @click="techPageCategory = 'TheoryResearch'" :class="{'active': techPageCategory === 'TheoryResearch'}" class="nav-link fw-bold fs-4">
        Theories
      </button>
      <button @click="techPageCategory = 'EngineeringResearch'" :class="{'active': techPageCategory === 'EngineeringResearch'}" class="nav-link fw-bold fs-4">
        Ingenieries
      </button>
      <button @click="techPageCategory = 'GeopoliticResearch'" :class="{'active': techPageCategory === 'GeopoliticResearch'}" class="nav-link fw-bold fs-4">
        Geopolitiques
      </button>
      <button @click="techPageCategory = 'MilitaryResearch'" :class="{'active': techPageCategory === 'MilitaryResearch'}" class="nav-link fw-bold fs-4">
        Militaires
      </button>

    </div>

    <tech-tree
        :data="dataToDisplay"
        :target-node="targetNode"
        :bgColor="bgColor"
        :key="techPageCategory"/>
  </div>
</template>
<script setup>
import TechTree from "@/components/TechTree/TechTree.vue";
import {computed, ref} from "vue";
import {useTechResearchStore} from "@/stores/index.js";
import {getCategoryColorCode} from "@/Helpers.js";

const techPageCategory = ref("TheoryResearch");
const store = useTechResearchStore();
const researchData = await store.fetchTechResearches();
const data = store.transformTechResearchesToVNetworkGraph(researchData);

const targetNode = ref("Root");
const bgColor = computed(() => {
  return getCategoryColorCode(techPageCategory.value)
});

const dataToDisplay = computed(() => {
  // copy the data to avoid modifying the original data
  let result = JSON.parse(JSON.stringify(data));

  // data.nodes is a map of nodes, we need to filter it to get the nodes we want to display
  result.nodes = filterDataNodesMap(result.nodes, techPageCategory.value);


  result.edges = filterDataEdgesMap(result.edges, result.nodes);
  console.log(result)
  // populate required tech with their research status
  for (const [nodeId, node] of Object.entries(result.nodes)) {
    if (node.category === "root") {
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
        return node.category === techCategory || node.category === "root";
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

</script>
<style scoped>

</style>