import {defineStore, storeToRefs} from 'pinia'
import {useAuthStore} from "@/stores/AuthStore.js";
import {fetchWrapper} from "@/Fetchers/fetch-wrapper.js";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useCitiesStore = defineStore('cities', () => {
    async function fetchUserTerritory() {
        const { userId } = storeToRefs(useAuthStore());

        const response = await fetchWrapper.get(`${baseUrl}/Users/${userId.value}/Territory`)
            .catch(error => {
                console.error(error);
                Promise.reject(error);
            });

        return response;
    }

    async function fetchCityDataByOsmId(osmId, osmType) {
        const response = await fetchWrapper.get(`${baseUrl}/Cities/ByOsmId?osmId=${osmId}&osmType=${osmType}`)
            .catch(error => {
                console.error(error);
                Promise.reject(error);
            });

        return response;
    }

    async function fetchUserCitiesFeatureCollection() {
        const { userId } = storeToRefs(useAuthStore());

        const response = await fetchWrapper.get(`${baseUrl}/users/${userId.value}/Territory/Cities`)
            .catch(error => {
                console.error(error);
                Promise.reject(error);
            });

        return response;
    }

    return { fetchUserTerritory, fetchCityDataByOsmId, fetchUserCitiesFeatureCollection }
})
