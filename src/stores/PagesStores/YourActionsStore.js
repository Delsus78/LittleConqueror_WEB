import {defineStore} from "pinia";
import {ref} from "vue";

export const YourActionsStore = defineStore('yourActions', () => {
    const actualPage = ref(1);

    return { actualPage }
})