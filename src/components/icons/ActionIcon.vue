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
  switch (actionName.toLowerCase())
  {
    case 'militaire':
      return 'shield-alt';
    case 'espionnage':
      return 'eye';
    case 'diplomatique':
      return 'handshake';
    case 'agricole':
      return 'wheat-awn';
    case 'miniere':
      return 'snowplow';
    case 'technologique':
      return 'microchip';
    case 'rien':
      return 'question';
  }
});


</script>
<style scoped>

</style>