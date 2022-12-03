import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/global.scss'
import './firebase';
import AppLoader from "./components/AppLoader.vue";
import { clickOutside } from "./plugins/directives.js";

const app = createApp(App)
app.use(store)
app.use(router)
app.component('AppLoader', AppLoader)
app.directive("clickOutside", clickOutside)
app.mount('#app')