<template>
  <div class="card bg-transparent text-white border-0">
    <div class="row g-0">
      <div class="col-4">
        <font-awesome-icon :icon="icon" class="card-img text-center mt-3" size="3x"/>
      </div>
      <div class="col-8">
        <div class="card-body">
          <h5 class="card-title text-shadow">{{ name }}</h5>
          <div class="progress">
            <div class="progress-bar" :style="`width:` + pourcentage + `%; background-color: ` + color + `;`">
              <slot/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const { name, icon, pourcentage, color } = defineProps({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  pourcentage: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    default: 'blue'
  }
});
</script>
<style scoped>

</style>