import {defineStore} from "pinia";
import {ref} from "vue";

export const useMainStore
    = defineStore('main', () => {
    const error = ref({});

    function setError(error) {
        error.value = error;
    }
    return { error, setError }
})