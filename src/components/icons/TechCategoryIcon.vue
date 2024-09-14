<template>
  <font-awesome-icon :icon="icon" :size="size"/>
</template>
<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {computed} from "vue";

const { categoryName, size } = defineProps({
  categoryName: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'lg',
    validator: (value) => [
      'xs', 'sm', 'lg', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].includes(value),
  }
});

const icon = computed(() => {
  switch (categoryName.toLowerCase())
  {
    case 'theoryresearch':
      return 'pencil';
    case 'engineeringresearch':
      return 'cog';
    case 'militaryresearch':
      return 'shield-alt';
    case 'geopoliticresearch':
      return 'vote-yea';
    default:
      return 'question';
  }
});


</script>
<style scoped>

</style>