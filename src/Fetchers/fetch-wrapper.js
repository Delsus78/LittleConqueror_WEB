import {useAuthStore} from '@/stores';
import {storeToRefs} from "pinia";

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return async (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return await fetch(url, requestOptions)
            .then(async response => {
                // Traiter les statuts 401, 403, etc. dans handleResponse
                return await handleResponse(response);
            })
            .catch(error => {
                console.error('Request failed:', error);
                return Promise.reject(error);
            });
    }
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

async function handleResponse(response) {
    return await response.text().then(async text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const authStore = useAuthStore();
            const actualPath = window.location.pathname;

            const { user } = storeToRefs(authStore);

            if ([401, 403].includes(response.status) && user) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                await authStore.setReturnUrl(actualPath);
                await authStore.logout();
            }

            let error = (data && data.error) || text;

            // failed to fetch error
            if (error.includes('Failed to fetch') || error.includes('NetworkError')) {
                console.log('error', error);
                error = 'Connexion au serveur impossible.';
            }

            return Promise.reject(error);
        }

        return data;
    });
}
