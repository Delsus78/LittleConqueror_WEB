<template>
  <div class="card bg-primary-subtle">
    <action-icon class="card-img-top text-center mt-4 mb-4"
                 :action-name="action.actionType" size="3x"/>
    <div class="card-body">
      <div v-if="action.actionType === 'rien'">
        <h5 class="card-title text-center">Aucune action</h5>
        <p class="card-text">Aucune action n'est définie pour cette ville.</p>
      </div>
      <div v-else>
        <h5 class="card-title text-center">Ville {{ action.actionType }}</h5>
        <div v-if="action.resourceType" class="card-body row">
          <div class="card col-md-6">
            <resource-icon class="card-img-top text-center mt-4 mb-4"
                           :resource-name="action.resourceType.toLowerCase()" size="3x"/>
          </div>
          <div class="col-md-6">
            <div class="container text-center">
              <strong class="fs-6">Bonus </strong>
              <span class=" badge text-bg-danger">x4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ActionIcon from "@/components/icons/ActionIcon.vue";
import {computed} from "vue";
import ResourceIcon from "@/components/icons/ResourceIcon.vue";

const { actionData } = defineProps({
  actionData: {
    type: Object,
    required: true
  }
});

const action = computed(() => actionData || {'actionType': 'rien'});
</script>
<style scoped>

</style>