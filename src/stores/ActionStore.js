import {defineStore, storeToRefs} from 'pinia'
import {useAuthStore} from "@/stores/AuthStore.js";
import {fetchWrapper} from "@/Fetchers/fetch-wrapper.js";
import {ref} from "vue";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useActionStore = defineStore('actions', () => {
    const userActionsList = ref({});
    const totalActions = ref(null);

    async function postActionChange(cityId, actionType, params) {

        const response = await fetchWrapper.post(`${baseUrl}/Cities/setAction`, {cityId, actionType, ...params})
            .catch(error => {
                console.error(error);
                return Promise.reject(error);
            });

        return response;
    }

    async function getActionPaginationList(page, pageSize = 10, forceRefresh = false) {
        const pageIndex = page - 1;

        if(!userActionsList.value[pageIndex] || forceRefresh) {
            const { userId } = storeToRefs(useAuthStore());

             const response = await fetchWrapper.get(`${baseUrl}/Actions?page=${pageIndex}&pageSize=${pageSize}`)
                .catch(error => {
                    console.error(error);
                    return Promise.reject(error);
                });

            userActionsList.value[pageIndex] = response.actions;
            totalActions.value = response.totalActions;

            console.log(userActionsList);
        }

        return { actions: userActionsList.value[pageIndex], totalActions: totalActions.value };
    }

    function getActionListToDisplay(index) {
        return userActionsList.value[index - 1];
    }

    return { postActionChange, getActionListToDisplay, getActionPaginationList, userActionsList, totalActions }
})
