<template>
  <div class="container-fluid d-flex justify-content-center align-items-center" style="height: 40vh;">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="display-1 text-danger">Erreur</h1>
        <p class="lead text-danger text-shadow">Une erreur est survenue, veuillez réessayer plus tard.</p>
        <p class="text-danger text-shadow">{{ error }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>

const { error } = defineProps({
  error: {
    type: String,
    required: true
  }
});
</script>
<style scoped>
</style>