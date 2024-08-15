<template>
  <img src="@/assets/world_map.png" alt="world map" class="w-100 background-img"/>
  <div class="container">
    <div class="title m-5 text-center">
      <h1 class="text-center text-white display-1">Little Conqueror</h1>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card mt-5 bg-transparent border-danger-subtle">
          <div class="card-body">
            <h5 class="card-title text-center text-white">Mot de passe oublié</h5>
            <form>

              <div class="mb-3">
                <label for="changePasswordForm" class="form-label text-white">Mot de passe</label>
                <input type="password" class="form-control" v-model="password" placeholder="password">
              </div>

              <div class="mb-3">
                <label for="changePasswordForm" class="form-label text-white">Encore le mot de passe</label>
                <input type="password" class="form-control" v-model="confirmPassword" placeholder="password mais pour de vrai">
              </div>

              <div class="mb-3">
                <label for="changePasswordForm" class="form-label text-white">Code de changement de mot de passe</label>
                <input type="text" class="form-control" v-model="validPasswordChangeLink" placeholder="CODE ICI WOW">
              </div>

              <button type="button" class="btn btn-primary" @click="onChangePasswordBtnClick">Changer le mot de passe</button>
              <div class="text-danger text-center">{{ error }}</div>

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
const { changePassword } = useAuthStore();

const password = ref('');
const confirmPassword = ref('');
const validPasswordChangeLink = ref(null);

const error = ref('');

const onChangePasswordBtnClick = () => {

  if (password.value === '') {
    error.value = 'Veuillez entrer un mot de passe';
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Les mots de passe ne correspondent pas';
    return;
  }

  error.value = '';
  changePassword(password.value, validPasswordChangeLink.value)
    .catch(errorResp => {
      console.error("password change error", errorResp);
      error.value = "Impossible de changer le mot de passe:\n" + errorResp;
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