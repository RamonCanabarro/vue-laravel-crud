/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

 import { createApp } from 'vue';
 require('./bootstrap');
 import axios from 'axios'
// import store from './store'
import router from './route'
import App from './components/App.vue'

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(router)
app.mount('#app')