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


import VueSweetalert2 from 'vue-sweetalert2';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);


Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.use(VueToast);
Vue.mixin(helper);


//Vue.use(axios)
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';


Vue.prototype.$axios = axios;
Vue.prototype.$apiHeader = {
    "Content-Type": "application/Json",
    "API_TOKEN": "JHKJA78411AJF"
};
//
Vue.prototype.$imageBaseUrl = "https://app.fairshop.com.bd/storage/app/public/";
Vue.prototype.$imageBaseUrl2 = "https://app.fairshop.com.bd/storage/app/public/";



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')