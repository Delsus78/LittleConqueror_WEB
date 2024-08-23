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
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Recipient:</label>
              <input type="text" class="form-control" id="recipient-name">
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">Message:</label>
              <textarea class="form-control" id="message-text"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Send message</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>
<style scoped>

</style>