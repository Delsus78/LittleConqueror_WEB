<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-white border-bottom mb-3 shadow-lg">
        <div class="d-flex justify-content-between">
          <h1 class="mb-0"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              :data-bs-title="'User ID : ' + userData.userId">
            {{ userData.username }}
          </h1>
          <div class="nav nav-tabs">
            <button @click="userPageIndex = 0" :class="{'active': userPageIndex === 0}" class="nav-link fw-bold fs-4">
              Ressources
            </button>
            <button @click="userPageIndex = 1" :class="{'active': userPageIndex === 1}" class="nav-link fw-bold fs-4">
              Technologies
            </button>

          </div>
        </div>
      </div>
    </div>
    <div v-if="userPageIndex === 0">
      <user-resources-page/>
    </div>
    <div v-else-if="userPageIndex === 1">
      <user-tech-tree-page/>
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import UserResourcesPage from "@/components/profilePages/UserResourcesPage.vue";
import {useAuthStore} from "@/stores/index.js";
import {storeToRefs} from "pinia";
import UserTechTreePage from "@/components/profilePages/UserTechTreePage.vue";

const { user } = storeToRefs(useAuthStore());
const userData = user.value.authUser;

const userPageIndex = ref(0);

onMounted(
    () => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }
)

</script>
<style scoped>

</style>