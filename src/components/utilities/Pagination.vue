<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" @click="onPageChange(actualPage - 1)">
          <font-awesome-icon icon="arrow-left"/>
        </a>
      </li>
      <li v-for="pageNumber in maxPage" :class="['page-item', pageNumber === actualPage ? 'active' : '']"
          :key="pageNumber">
        <a class="page-link" @click="onPageChange(pageNumber)">{{pageNumber}}</a>
      </li>
      <li class="page-item">
         <a class="page-link" @click="onPageChange(actualPage + 1)">
            <font-awesome-icon icon="arrow-right"/>
          </a>
      </li>
    </ul>
  </nav>
</template>
<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const emit = defineEmits(["page-change"]);
const { actualPage, maxPage } = defineProps({
  actualPage: {
    type: Number,
    required: true
  },
  maxPage: {
    type: Number,
    required: true
  }
});

function onPageChange(pageNumber) {
  emit('page-change', pageNumber);
}

</script>
<style scoped>

</style>