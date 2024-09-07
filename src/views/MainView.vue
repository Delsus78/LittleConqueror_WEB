<template>
  <NavBar v-if="store.isAuthenticated"/>
  <router-view v-slot="{ Component }">
    <suspense timeout="0">
      <template #default>
        <component :is="Component" :key="$route.path" class="p-10"></component>
      </template>

      <!-- loading state -->
      <template #fallback>
        <loading-view/>
      </template>
    </suspense>
  </router-view>
  <ErrorView v-if="isErrorOccured" :error="errorMessage"/>
  <tanks-back-ground v-if="store.isAuthenticated"/>
</template>
<script setup>
import {RouterView} from 'vue-router'
import NavBar from "@/components/NavBar.vue";
import TanksBackGround from "@/components/TanksBackGround.vue";

import { useAuthStore } from '@/stores';
import LoadingView from "@/views/LoadingView.vue";
import {onErrorCaptured, ref} from "vue";
import ErrorView from "@/views/ErrorView.vue";
const store = useAuthStore();
const isErrorOccured = ref(false);
const errorMessage = ref('');

onErrorCaptured((error) => {
  console.error('Error captured in MainView', error);
  isErrorOccured.value = true;
  errorMessage.value += error.message;
});

</script>
<style scoped>
</style>