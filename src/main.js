import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

import axios from 'axios';
import helper from "../src/mixins/helper.vue";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import {
    HasError,
    AlertError
} from 'vform'

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
axios.defaults.baseURL = 'https://fairshop.com.bd/api/_data/';
// axios.defaults.withCredentials = true;


Vue.prototype.$axios = axios;
Vue.prototype.$apiHeader = {
    "Content-Type": "application/Json",
    "Authorization" : "Bearer $2y$10$kzaYH2t9fgVMoyqKMWF7POjD45cilj"
};
//
Vue.prototype.$imageBaseUrl = "https://fairshop.com.bd/storage/app/public/";
Vue.prototype.$imageBaseUrl2 = "https://fairshop.com.bd/storage/app/public/";



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')