<template>
  <div class="row">
    <div class="col-md-3 mb-5">
      <statistic-item class="mb-3" :value="userData.totalPopulation" icon="people-roof" name="Population"/>
      <statistic-item :value="userData.totalCities" icon="city" name="Villes"/>
      <statistic-item :value="userData.totalHappiness"
                      class="border border-2 rounded"
                      :style="`color: ${getPopulationHappinessColor(userData.totalHappiness)} !important;`"
                      icon="face-smile-beam" name="Bonheur"/>
      <h4 class="text-white mt-3 text-decoration-underline">Points de recherche</h4>
      <progress-bar-item icon="pencil" name="Theorique" :pourcentage="100" :color="getCategoryColorCode('TheoryResearch')">
        <strong class="text-shadow-white text-black">{{researchPoints.theoryResearch}}</strong>
      </progress-bar-item>
      <progress-bar-item icon="cog" name="Ingénieur" :pourcentage="100" :color="getCategoryColorCode('EngineeringResearch')">
        <strong class="text-shadow-white text-black">{{researchPoints.engineeringResearch}}</strong>
      </progress-bar-item>
      <progress-bar-item icon="shield-alt" name="Militaire" :pourcentage="100" :color="getCategoryColorCode('MilitaryResearch')">
        <strong class="text-shadow-white text-black">{{researchPoints.militaryResearch}}</strong>
      </progress-bar-item>
      <progress-bar-item icon="vote-yea" name="Geopolitique" :pourcentage="100" :color="getCategoryColorCode('GeopoliticResearch')">
        <strong class="text-shadow-white text-black">{{researchPoints.geopoliticResearch}}</strong>
      </progress-bar-item>
    </div>
    <div class="col-md-9">
      <UserResources :userResources="userResourcesFiltered"/>
    </div>
  </div>
</template>
<script setup>
import StatisticItem from "@/components/utilities/StatisticItem.vue";
import UserResources from "@/components/userData/UserResources.vue";
import {computed} from "vue";
import {useTechResearchStore, useUserDataStore} from "@/stores/index.js";
import ProgressBarItem from "@/components/utilities/ProgressBarItem.vue";
import {getCategoryColorCode, getPopulationHappinessColor} from "@/Helpers.js";


const { fetchUserInformations } = useUserDataStore();
const { fetchSciencePoints } = useTechResearchStore();
const userData = await fetchUserInformations();

const userResourcesFiltered = computed(() => {
  return Object.fromEntries(Object.entries(userData.resources)
      .filter(([key, value]) => key !== 'researchPoints'));
});

const researchPoints = await fetchSciencePoints();

</script>
<style scoped>

</style>