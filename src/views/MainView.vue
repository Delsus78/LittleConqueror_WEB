<template>
  <NavBar v-if="isAuthenticated"/>
  <RouterView />
  <tanks-back-ground v-if="isAuthenticated" class="background"/>
</template>
<script setup>
import { RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue";
import TanksBackGround from "@/components/TanksBackGround.vue";

import { useAuthStore } from '@/stores';
import {storeToRefs} from "pinia";

const { isAuthenticated } = storeToRefs(useAuthStore());

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