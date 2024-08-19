import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import { router } from './router/index.js'
import {importIcons} from "./iconsImports.js";

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {updateGlobalOptions} from "vue3-toastify";

import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/main.css"
import "./assets/scss/styles.scss"
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;


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
