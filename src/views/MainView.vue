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

import {useAuthStore, useMainStore} from '@/stores';
import LoadingView from "@/views/LoadingView.vue";
import {onErrorCaptured, ref, watch} from "vue";
import ErrorView from "@/views/ErrorView.vue";
const store = useAuthStore();
const mainStore = useMainStore();
const isErrorOccured = ref(false);
const errorMessage = ref('');

watch(mainStore.$state, (state) => {
  isErrorOccured.value = state.error !== null;
  errorMessage.value = state.error?.message;
},{ deep: true });

onErrorCaptured((error) => {
  mainStore.setError(error);

  isErrorOccured.value = true;
  errorMessage.value = error.message;
});


</script>
<style scoped>
</style>