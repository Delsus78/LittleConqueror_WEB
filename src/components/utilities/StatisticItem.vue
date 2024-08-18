<template>
  <div class="card bg-transparent text-white border-0">
    <div class="row g-0">
      <div class="col-4">
        <font-awesome-icon :icon="icon" class="card-img text-center mt-4 mb-4" size="3x"/>
      </div>
      <div class="col-8">
        <div class="card-body">
          <h5 class="card-title text-shadow">{{ name }}</h5>
          <strong class="card-text text-shadow">{{ value }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const { name, icon, value } = defineProps({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});
</script>
<style scoped>

</style>