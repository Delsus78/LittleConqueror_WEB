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
  <nav class="mt-0 navbar navbar-expand-lg navbar-dark mb-5">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">
        <img src="../assets/icon.png" alt="logo" width="100" height="100" class="game-title position-absolute top-0 d-md-none start-50 translate-middle-x" />
        <img src="../assets/icon.png" alt="logo" width="100" height="100" class="game-title position-absolute top-0 d-none d-md-block" />
      </RouterLink>
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
.navbar {
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.game-title {
  -webkit-filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.51));
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.51));
}
</style>
