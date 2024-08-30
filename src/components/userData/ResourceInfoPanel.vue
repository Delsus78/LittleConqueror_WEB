<template>
  <div :class="['card', isInWarning ? 'bg-danger' : 'bg-warning']"
       :style="['width: 13rem;', isCollapsed ? 'max-height: 20rem;' : '']"
       @click="isCollapsed = !isCollapsed" type="button"
       data-bs-toggle="collapse" :data-bs-target="`#collapseDetails` + resourceKey"
       aria-expanded="false" aria-controls="collapseDetails">
    <resource-icon class="card-img-top text-center mt-4 mb-1"
                   :resource-name="resourceKey" size="3x" :is-in-warning="isInWarning"/>
    <div class="card-title text-center fs-3 fw-bold text-uppercase">
      {{ resourceKey }}
    </div>
    <div class="card-body overflow-y-scroll" style="max-height: 20rem;">
      <DataLabelledItem :value="productionAvailable" class="mb-4 text-center fs-2 fw-bold text-shadow danger"
                        label="DISPONIBLE" icon="check" icon-bg-color="bg-success"/>
      <div class="row p-0" >
        <span class="fs-4 text-center align-content-center">
          <span class="text-muted fw-light text-uppercase fs-6">
            Détails
          </span>
        </span>
        <hr/>
      </div>
      <div class="collapse" :id="`collapseDetails` + resourceKey">
        <DataLabelledItem :value="resource.production[prodKey]" v-for="prodKey in productionFilteredAndOrdered" :key="prodKey"
                          :label="prodKey" icon="plus"/>

        <DataLabelledItem :value="usedTotal"
                          label="TOTAL" icon="minus" icon-bg-color="bg-danger"/>

        <DataLabelledItem :value="resource.used[usedKey]" v-for="usedKey in usedFiltered" :key="usedKey"
                          :label="usedKey" icon="minus"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import ResourceIcon from "@/components/icons/ResourceIcon.vue";
import DataLabelledItem from "@/components/utilities/DataLabelledItem.vue";
import {computed, ref} from "vue";

const isCollapsed = ref(true);

const { resourceKey, resource } = defineProps({
  resourceKey: {
    type: String,
    required: true
  },
  resource: {
    type: Object,
    required: true
  }
});

const sortFunc = (a, b) => {
  // if a or b is 'Available' or 'Total', it should be first
  if (a === 'available' || a === 'total') return -1;
  if (b === 'available' || b === 'total') return 1;
};

const productionAvailable = resource.production.available;
const productionFilteredAndOrdered = computed(() => {
  const filtered = Object.keys(resource.production).filter(key => resource.production[key] > 0 && key !== 'available');
  return filtered.toSorted(sortFunc);
});
const usedTotal = resource.used.total;
const usedFiltered = computed(() => {
  const filtered = Object.keys(resource.used).filter(key => resource.used[key] > 0 && key !== 'total');
  return filtered.toSorted(sortFunc);
});

const isInWarning = computed(() => {
  return productionAvailable < 0;
});
</script>
<style scoped>

</style>