<template>
  <div class="card bg-primary-subtle">
    <action-icon class="card-img-top text-center mt-4 mb-4"
                 :action-name="action.actionType" size="3x"/>
    <div class="card-body">
    </div>
  </div>
</template>
<script setup>
import ActionIcon from "@/components/icons/ActionIcon.vue";
import {computed} from "vue";

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