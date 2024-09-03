<template>
  <div class="row">
    <div class="col-md-3 mb-5">
      <statistic-item class="mb-3" :value="userData.totalPopulation" icon="people-roof" name="Population"/>
      <statistic-item :value="userData.totalCities" icon="city" name="Villes"/>
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
import {useUserDataStore} from "@/stores/index.js";


const { fetchUserInformations } = useUserDataStore();
const userData = await fetchUserInformations();

const userResourcesFiltered = computed(() => {
  return Object.fromEntries(Object.entries(userData.resources)
      .filter(([key, value]) => key !== 'researchPoints'));
});

const reserachPoints = computed(() => {
  return userData.resources.researchPoints;
});

</script>
<style scoped>

</style>