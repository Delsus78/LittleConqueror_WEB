import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import { router } from './router/index.js'
import {importIcons} from "./iconsImports.js";

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {updateGlobalOptions} from "vue3-toastify";

updateGlobalOptions({
    position: 'top-right',
    closeOnClick: true,
    pauseOnFocusLoss: false,
    autoClose: true,
    theme: 'dark',
    icon: true
});

importIcons();

createApp(App)
    .use(VueQueryPlugin)
    .use(createPinia())
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
