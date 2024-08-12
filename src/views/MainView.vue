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
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: -1000;
}
</style>