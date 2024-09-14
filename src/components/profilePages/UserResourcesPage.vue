<template>
  <div class="row">
    <div class="col-md-3 mb-5">
      <statistic-item class="mb-3" :value="userData.totalPopulation" icon="people-roof" name="Population"/>
      <statistic-item :value="userData.totalCities" icon="city" name="Villes"/>
      <h4 class="text-white mt-3 text-decoration-underline">Points de recherche</h4>
      <progress-bar-item icon="book" name="Theorique" :pourcentage="100" :color="getCategoryColorCode('TheoryResearch')">
        <strong class="text-shadow ">{{researchPoints.theoryResearch}}</strong>
      </progress-bar-item>
      <progress-bar-item icon="book" name="Ingénieur" :pourcentage="100" :color="getCategoryColorCode('EngineeringResearch')">
        <strong>{{researchPoints.engineeringResearch}}</strong>
      </progress-bar-item>
      <progress-bar-item icon="book" name="Militaire" :pourcentage="100" :color="getCategoryColorCode('MilitaryResearch')">
        <strong>{{researchPoints.militaryResearch}}</strong>
      </progress-bar-item>
      <progress-bar-item icon="book" name="Geopolitique" :pourcentage="100" :color="getCategoryColorCode('GeopoliticResearch')">
        <strong>{{researchPoints.geopoliticResearch}}</strong>
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
import {getCategoryColorCode} from "@/Helpers.js";


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