import {defineStore, storeToRefs} from 'pinia'
import {useAuthStore} from "@/stores/AuthStore.js";
import {fetchWrapper} from "@/Fetchers/fetch-wrapper.js";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useActionStore = defineStore('actions', () => {
    async function postActionChange(cityId, actionType) {
        const { userId } = storeToRefs(useAuthStore());

        const response = await fetchWrapper.get(`${baseUrl}/Cities/setAction`, {cityId, actionType})
            .catch(error => {
                console.error(error);
                Promise.reject(error);
            });

        return response;
    }

    return { fetchUserTerritory }
})
