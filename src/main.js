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

import VueToastr from "vue-toastr";
Vue.use(VueToastr, {
    defaultTimeout: 3000,
    defaultProgressBar: false,
    defaultProgressBarValue: 0,
    defaultType: "error",
    defaultPosition: "toast-top-center",
    defaultCloseOnHover: false,
    defaultStyle: {
        "background-color": "red"
    },
    defaultClassNames: ["animated", "zoomInUp"]
});

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
axios.defaults.baseURL = 'https://app.fairshop.com.bd/api/_data/';
axios.defaults.headers.common['API_TOKEN'] = "$2y$10$kzaYH2t9fgVMoyqKMWF7POjD45cilj";

Vue.prototype.$axios = axios;
Vue.prototype.$apiHeader = {
    "Content-Type": "application/Json",
};

Vue.prototype.$imageBaseUrl = "https://app.fairshop.com.bd/public/storage/";
Vue.prototype.$imageBaseUrl2 = "https://app.fairshop.com.bd/public/storage/images/product_thumbnail_img/";



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')