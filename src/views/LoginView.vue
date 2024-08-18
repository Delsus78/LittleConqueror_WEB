<template>
  <img src="@/assets/world_map.png" alt="world map" class="w-100 background-img"/>
  <div class="container">
    <div class="title m-5 text-center">
      <h1 class="text-center text-white display-1">Little Conqueror</h1>
    </div>
    <!-- login form -->
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card mt-5 bg-transparent border-danger-subtle">
          <div class="card-body">
            <h5 class="card-title text-center text-white">Connexion</h5>
            <form class="connexionForm">

              <div class="mb-3">
                <label for="loginForm" class="form-label text-white">Pseudo</label>
                <input type="text" class="form-control" v-model="username" placeholder="Pseudo">
              </div>

              <div class="mb-3">
                <label for="loginForm" class="form-label text-white">Mot de passe</label>
                <input type="password" class="form-control" v-model="password" placeholder="password">
              </div>

              <button type="button" class="btn btn-primary" @click="onLoginBtnClick">Se connecter</button>
              <div class="text-danger text-center">{{ error }}</div>

              <!-- pas de compte -->
              <div class="text-center mt-3">
                <RouterLink to="/register" class="text-white opacity-25">Vous avez un code ? Inscrivez-vous</RouterLink>
              </div>

              <!-- mot de passe oublié -->
              <div class="text-center mt-3">
                <RouterLink to="/forgot-password" class="text-white opacity-25">Mot de passe oublié ? Tant pis</RouterLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";

const { user } = storeToRefs(useAuthStore());
const { login } = useAuthStore();

const password = ref('');
const username = ref('');

const error = ref('');

const onLoginBtnClick = () => {
  if (username.value === '') {
    error.value = 'Veuillez entrer un pseudo';
    return;
  }
  if (password.value === '') {
    error.value = 'Veuillez entrer un mot de passe';
    return;
  }

  error.value = '';
  login(username.value, password.value)
    .catch(errorResp => {
      console.error("login error", errorResp);
      error.value = "Impossible de se connecter:\n" + errorResp;
    });
}

</script>
<style scoped>
.background-img {
  position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    z-index: -1000;
    opacity: 0.1;
    filter: blur(10px);
    transform: scale(1.1);
    object-fit: cover;
    object-position: center;
    pointer-events: none;
    user-select: none;
    touch-action: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
}
</style>