<template>
  <div class="card bg-transparent text-white mb-3">
    <div class="card-header">
      <h5 class="card-title">{{user.name}}</h5>
    </div>
    <div class="card-body">

    </div>
    <div class="card-footer bg-transparent border-success">Footer</div>
  </div>
</template>
<script setup>

const { user } = defineProps({
  user: {
    type: Object,
    required: true,
    default: {
      name: 'John Doe',
    }
  }
});
</script>
<style scoped>

</style>