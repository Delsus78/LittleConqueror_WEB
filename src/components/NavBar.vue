<script setup>
import {computed} from "vue";
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/index.js";
const route=useRoute();
const pageName = computed(() =>route.path.split('/')[1]);

const logout = () => {
    const authStore = useAuthStore();
    authStore.logout();
}
</script>

<template>
  <nav class="m-2 navbar navbar-expand-lg navbar-dark navbar-blur mb-5">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">Little Conqueror - {{ pageName.charAt(0).toUpperCase() + pageName.slice(1) }}</RouterLink>
      <button class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbar"
              aria-controls="mainNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNavbar">
        <ul class="navbar-nav ms-auto nav-underline">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/cities">
              <font-awesome-icon icon="city" size="lg" /> VOS VILLES
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/map">
              <font-awesome-icon icon="map-marked-alt" size="lg" /> MAP MONDE
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/actions">
              <font-awesome-icon icon="tasks" size="lg" /> ACTIONS EN COURS
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/user">
              <font-awesome-icon icon="user" size="lg" /> PROFILE
            </RouterLink>
          </li>
          <li class="nav-item">
            <a class="nav-link link-danger" href="#" @click="logout">
              <font-awesome-icon icon="sign-out-alt" size="lg" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
</style>
