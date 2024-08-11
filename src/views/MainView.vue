<template>
  <NavBar/>
  <RouterView />
  <Background class="background"/>
</template>
<script setup>
import { RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue";
import Background from "@/components/Background.vue";
</script>
<style scoped>

.background {
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>