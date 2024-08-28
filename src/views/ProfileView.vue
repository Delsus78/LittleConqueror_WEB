<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-white border-bottom mb-3 shadow-lg">
        <div class="row">
          <h1 class="col-12 position-relative"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              :data-bs-title="'User ID : ' + userData.id">
            {{ userData.name }}
          </h1>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 mb-5">
        <statistic-item class="mb-3" :value="userData.totalPopulation" icon="people-roof" name="Population"/>
        <statistic-item :value="userData.totalCities" icon="city" name="Villes"/>
      </div>
      <div class="col-md-8">
        <UserResources :userResources="userData.resources"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUserDataStore} from "@/stores/index.js";
import UserResources from "@/components/userData/UserResources.vue";
import StatisticItem from "@/components/utilities/StatisticItem.vue";
import {onMounted} from "vue";

const { fetchUserInformations } = useUserDataStore();

const userData = await fetchUserInformations();

onMounted(
    () => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }
)
</script>
<style scoped>

</style>