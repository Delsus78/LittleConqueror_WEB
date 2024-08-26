<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-auto row-cols-lg-5 gap-3" :key="actualPage" style="height: 70vh;">
      <CityActionPanel class="col" style="height: 30vh;"
                       v-for="actionCityPair in actualActionListToDisplay"
                       :key="actionCityPair.action.id"
                       :action-data="actionCityPair.action" with-city-data
                       :city-data="actionCityPair.city"/>
    </div>
    <Pagination :max-page="maxPages" :actual-page="actualPage" @page-change="onPaginationChange"/>
  </div>
</template>

<script setup>
import Pagination from "@/components/utilities/Pagination.vue";
import { useActionStore } from "@/stores/index.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {YourActionsStore} from "@/stores/PagesStores/YourActionsStore.js";
import CityActionPanel from "@/components/cityData/CityActionPanel.vue";
const actionStore = useActionStore();
const pageStore = YourActionsStore();

await actionStore.getActionPaginationList(1, 10);

const { totalActions } = storeToRefs(actionStore);
const { actualPage } = storeToRefs(pageStore);
const actualActionListToDisplay = ref(actionStore.getActionListToDisplay(actualPage.value));

const maxPages = computed(() => {
  console.log(totalActions.value);
  return Math.ceil(totalActions.value / 10);
});

async function onPaginationChange(pageNumber) {
  console.log(pageNumber);
  actualPage.value = pageNumber;

  await actionStore.getActionPaginationList(pageNumber, 10);
  actualActionListToDisplay.value = actionStore.getActionListToDisplay(pageNumber);
}
</script>
<style scoped>
</style>
