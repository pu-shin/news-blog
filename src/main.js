import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from './firebase'
import './styles/global.scss'


createApp(App).use(store).use(router).use(firebase).mount('#app')