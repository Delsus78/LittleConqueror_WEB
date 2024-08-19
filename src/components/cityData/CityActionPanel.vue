<template>
  <div class="card bg-primary-subtle">
    <action-icon class="card-img-top text-center mt-4 mb-4"
                 :action-name="actionType" size="3x"/>
    <div class="card-body">
    </div>
  </div>
</template>
<script setup>
import ActionIcon from "@/components/icons/ActionIcon.vue";

const { actionType } = defineProps({
  actionType: {
    type: String,
    required: true
  }
});
</script>
<style scoped>

</style>