<template>
  <NavBar v-if="isAuthenticated"/>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <!-- main content -->
        <component :is="Component"></component>

        <!-- loading state -->
        <template #fallback>
          <loading-view/>
        </template>
      </Suspense>
    </template>
  </RouterView>
  <tanks-back-ground v-if="isAuthenticated" />
</template>
<script setup>
import { RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue";
import TanksBackGround from "@/components/TanksBackGround.vue";

import { useAuthStore } from '@/stores';
import {storeToRefs} from "pinia";
import LoadingView from "@/views/LoadingView.vue";
const { isAuthenticated } = storeToRefs(useAuthStore());

</script>
<style scoped>
</style>