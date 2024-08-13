<template>
  <NavBar/>
  <RouterView />
  <tanks-back-ground class="background"/>
</template>
<script setup>
import { RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue";
import TanksBackGround from "@/components/TanksBackGround.vue";
</script>
<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  z-index: -1000;
}
</style>