import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import router from './router'
import {importIcons} from "./iconsImports.js";

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

importIcons();

createApp(App)
    .use(VueQueryPlugin)
    .use(createPinia())
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
