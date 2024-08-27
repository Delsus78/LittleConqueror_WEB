import {defineStore, storeToRefs} from 'pinia'
import {useAuthStore} from "@/stores/AuthStore.js";
import {fetchWrapper} from "@/Fetchers/fetch-wrapper.js";
import {ref} from "vue";
import {toast} from "vue3-toastify";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useCitiesStore = defineStore('cities', () => {
    const userTerritory = ref(null);
    const cityDataByOsmId = ref({});
    const userCitiesFeatureCollection = ref(null);

    async function fetchUserTerritory() {
        if (!userTerritory.value) {
            const {userId} = storeToRefs(useAuthStore());
            userTerritory.value = await fetchWrapper.get(`${baseUrl}/Users/${userId.value}/Territory`)
                .catch(error => {
                    console.error(error);
                    return Promise.reject(error);
                });
        }

        return userTerritory.value;
    }

    async function fetchCityDataByOsmId(osmId, osmType) {
        if (!cityDataByOsmId.value[osmId]) {
            cityDataByOsmId.value[osmId] = await fetchWrapper.get(`${baseUrl}/Cities/ByOsmId?osmId=${osmId}&osmType=${osmType}`)
                .catch(error => {
                    console.error(error);
                    return Promise.reject(error);
                });
        }

        return cityDataByOsmId.value[osmId];
    }

    async function fetchUserCitiesFeatureCollection() {
        if (!userCitiesFeatureCollection.value) {
            const { userId } = storeToRefs(useAuthStore());

            userCitiesFeatureCollection.value = await fetchWrapper.get(`${baseUrl}/users/${userId.value}/Territory/Cities`)
                .catch(error => {
                    console.error(error);
                    return Promise.reject(error);
                });
        }

        return userCitiesFeatureCollection.value;
    }

    async function fetchCityByLonLat(lon, lat) {
        return await fetchWrapper.get(`${baseUrl}/Cities/ByLonLat?Latitude=${lat}&Longitude=${lon}`)
            .catch(error => {
                console.error(error);
                return Promise.reject(error);
            });
    }

    return { fetchUserTerritory, fetchCityDataByOsmId, fetchUserCitiesFeatureCollection, fetchCityByLonLat }
})
