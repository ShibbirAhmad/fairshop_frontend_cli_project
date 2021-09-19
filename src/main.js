import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

import axios from 'axios';
import helper from "../src/mixins/helper.vue";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { HasError, AlertError } from 'vform'

import 'animate.css';

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.use(VueToast);
Vue.mixin(helper);


//Vue.use(axios)
axios.defaults.baseURL = 'https://app.fairshop.com.bd/api/';


Vue.prototype.$axios = axios;
Vue.prototype.$apiHeader = {
    "Content-Type": "application/Json",
    "API_TOKEN": "JHKJA78411AJF"
};
//
Vue.prototype.$imageBaseUrl = "http://app.fairshop.com.bd/storage/app/public/";
Vue.prototype.$imageBaseUrl2 = "http://app.fairshop.com.bd/storage/app/public/";



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')