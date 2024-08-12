<template>
  <div class="container">
    <div class="row justify-content-between">
      <!-- Left column (Main content) -->
      <div class="col-md-4">
        <div class="shadow-lg mb-5 rounded" style="height: 60vh;">
          <user-basic-information  :user="pasEncorePotoCalmeToiLeBackEstMemePasFini"/>
        </div>
      </div>
      <div class="col-md-4">
        <div class="shadow-lg mb-5 rounded" style="height: 60vh;">

        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import UserBasicInformation from "@/components/UserBasicInformation.vue";
</script>
<style scoped>
</style>