<template>
  <font-awesome-icon :icon="icon" :size="size"/>
</template>
<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {computed} from "vue";

const { actionName, size } = defineProps({
  actionName: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: '2x',
    validator: (value) => [
        'xs', 'sm', 'lg', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].includes(value),
  }
});

const icon = computed(() => {
  switch (actionName)
  {
    case 'military':
      return 'shield-alt';
    case 'spy':
      return 'eye';
    case 'diplomacy':
      return 'handshake';
    case 'harvest':
      return 'wheat-awn';
    case 'mine':
      return 'snowplow';
  }
});


</script>
<style scoped>

</style>