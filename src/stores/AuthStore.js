import {defineStore} from 'pinia';

import {fetchWrapper} from '@/Fetchers/fetch-wrapper.js';
import { router } from "@/router";
import {computed, ref} from "vue";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore('auth',() => {
    const user = ref(JSON.parse(localStorage.getItem('user')));
    const returnUrl = ref(null);

    const isAuthenticated = computed(() => user.value !== null);
    const userId = computed(() => user.value.authUser.userId);

    async function login(username, password) {
        console.log('login ...')
        user.value = await fetchWrapper.post(`${baseUrl}/authenticate`, {username, password})
            .catch(error => {
                console.error(error);
                return Promise.reject(error);
            });

        // store user details and jwt in local storage to keep user logged in between page refreshes
        const userJson = JSON.stringify(user.value);
        if (userJson) {
            localStorage.setItem('user', userJson);
        }
        else {
            localStorage.removeItem('user');
            console.error('No user data received');
            return Promise.reject('No user data received');
        }

        // redirect to previous url or default to home page
        await router.push(returnUrl.value || '/');
    }
    async function register(username, password, validRegistrationLink) {
        await fetchWrapper.post(`${baseUrl}/registration`, { username, password, validRegistrationLink })
            .catch(error => {
                console.error(error);
                return Promise.reject(error);
            });

        await login(username, password);
    }
    async function changePassword(password, validForgetPasswordLink) {
        await fetchWrapper.post(`${baseUrl}/authenticate/changePassword`, { password, validForgetPasswordLink })
            .catch(error => {
                console.error(error);
                return Promise.reject(error);
            });

        await router.push('/login');
    }

    async function logout() {
        console.log('logout ...')
        user.value = null;

        localStorage.removeItem('user');

        await router.push('/login');
    }
    async function setReturnUrl(url) {
        returnUrl.value = url;
    }

    return { user, login, logout, isAuthenticated, userId, register, changePassword, setReturnUrl }
});
