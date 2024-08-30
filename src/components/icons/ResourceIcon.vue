<template>
  <font-awesome-icon :icon="icon" :size="size" :shake="isInWarning" :class="{ 'text-bg-danger': isInWarning }"/>
</template>
<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {computed} from "vue";

const { resourceName, size, isInWarning } = defineProps({
  resourceName: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: '2x',
    validator: (value) => [
        'xs', 'sm', 'lg', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].includes(value),
  },
  isInWarning: {
    type: Boolean,
    default: false
  }
});

const icon = computed(() => {
  switch (resourceName)
  {
    case 'food':
      return 'utensils';
    case 'wood':
      return 'tree';
    case 'stone':
      return 'mountain';
    case 'gold':
      return 'coins';
    case 'iron':
      return 'weight-hanging';
    case 'diamond':
      return 'gem';
    case 'petrol':
      return 'gas-pump';
    default:
      return 'question';
  }
});


</script>
<style scoped>

</style>