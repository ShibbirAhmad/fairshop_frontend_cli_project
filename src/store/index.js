import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js";
Vue.use(Vuex);

const state = {
  categories: [],
  product: {},
  related_products: {},
  cart: {},
  user: {},
  campaign: {},
  sliders: "",
  banner: "",
  variants: [],
  show_collpase_cart: false,
};
const getters = {};
const actions = {
  categories(context) {
    axios
      .get("categories", {
        headers: this.$apiHeader,
      })
      .then((resp) => {
        // console.log(resp);
        if (resp.data.categories) {
          context.commit("categories", resp.data.categories);
        }
      });
  },

  product(context, payload) {
    axios
      .get("product/" + payload, {
        headers: this.$apiHeader,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data.status == "SUCCESS") {
          context.commit("product", resp.data.product);
          context.commit("variants", resp.data.variants);
          // context.commit('related_products', resp.data.related_products.data)
        } else {
          router.push("/");
        }
      });
  },

  //for get product images

  cart(context) {
    axios
      .get("get/cart/content", {
        headers: this.$apiHeader,
      })
      .then((resp) => {
        console.log(resp);
        context.commit("cart", resp.data);
      });
  },

  user(context) {
    if (localStorage.getItem("user_token")) {
      axios
        .get("user", {
          headers: this.$apiHeader,
          params: {
            user_token: localStorage.getItem("user_token"),
          },
        })
        .then((resp) => {
          console.log(resp.data.user);
          if (resp.data.status == "AUTHORIZED") {
            context.commit("user", resp.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  campaign(context, payload) {
    axios
      .get("c/products/" + payload, {
        headers: this.$apiHeader,
      })
      .then((resp) => {
        //  console.log(resp)
        if (resp.data.status == "OK") {
          context.commit("campaign", resp.data);
        } else {
          router.push("/");
        }
      });
  },
  sliders(context) {
    axios
      .get("sliders", {
        headers: this.$apiHeader,
      })
      .then((resp) => {
        // console.log(resp);
        context.commit("sliders", resp.data.sliders);
        context.commit("banner", resp.data.slider_banner);
      });
  },
};
const mutations = {
  categories(state, payload) {
    return (state.categories = payload);
  },

  product(state, payload) {
    return (state.product = payload);
  },
  related_products(state, payload) {
    return (state.related_products = payload);
  },
  cart(state, payload) {
    return (state.cart = payload);
  },
  user(state, payload) {
    return (state.user = payload);
  },
  campaign(state, payload) {
    return (state.campaign = payload);
  },
  sliders(state, payload) {
    return (state.sliders = payload);
  },
  banner(state, payload) {
    return (state.banner = payload);
  },
  variants(state, payload) {
    return (state.variants = payload);
  },
};

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
});

global.store = store;

export default store;
