<template>
  <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#setActionToCityModal">
    <font-awesome-icon icon="circle-exclamation"/> Modifier l'action
  </button>

  <div class="modal fade" id="setActionToCityModal" tabindex="-1" aria-labelledby="setActionToCityLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="setActionToCityLabel">Modifier l'action</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row justify-content-around align-items-center">
              <div class="col-md-4">
                <div class="fs-5 text-center">
                  <action-icon :action-name="actualActionName" size="sm"/>
                  <strong>{{actualActionName}}</strong>
                </div>
              </div>
              <div class="col-md-1 text-center mb-3 mt-3">
                <font-awesome-icon class="d-none d-md-block" icon="arrow-right"/>
                <font-awesome-icon class="d-md-none" icon="arrow-down"/>
              </div>
              <div class="col-md-7">
                <div class="input-group align-items-center">
                  <action-icon class="input-group-text fs-4" :action-name="newActionType || 'rien'" size="sm" :key="newActionType"/>
                  <select v-model="newActionType" class="form-select fs-5 fw-bold" id="newActionType">
                    <option value="Militaire">Militaire</option>
                    <option value="Espionnage">Espionnage</option>
                    <option value="Diplomatique">Diplomatique</option>
                    <option value="Agricole">Agricole</option>
                    <option value="Miniere">Minière</option>
                    <option value="Technologique">Technologique</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="emit('valid-action-change', newActionType)">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {computed, ref} from "vue";
import ActionIcon from "@/components/icons/ActionIcon.vue";

const { actualAction } = defineProps({
  actualAction: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['valid-action-change']);


const actualActionName = computed(() => actualAction.actionType || 'rien');
const newActionType = ref('');

</script>
<style scoped>

</style>