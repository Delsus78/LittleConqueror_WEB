import {defineStore, storeToRefs} from "pinia";
import {fetchWrapper} from "@/Fetchers/fetch-wrapper.js";
import {useAuthStore} from "@/stores/AuthStore.js";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useUserDataStore = defineStore('user',() => {
    async function fetchUserInformations(includeTerritory = true, includeResources = true) {
        const { userId } = storeToRefs(useAuthStore());

        const response = await fetchWrapper.get(`${baseUrl}/Users/${userId.value}/Informations?IncludeTerritory=${includeTerritory}&IncludeResources=${includeResources}`)
            .catch(error => {
                console.error(error);
                Promise.reject(error);
            });

        return response;
    }

    return { fetchUserInformations }
});