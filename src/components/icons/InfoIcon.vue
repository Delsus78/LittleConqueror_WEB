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
    case 'population':
      return 'people-roof';
    case 'agriculturalFertility':
      return 'seedling';
    default:
      return 'question';
  }
});


</script>
<style scoped>

</style>