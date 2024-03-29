import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js";
Vue.use(Vuex);

const state = {
  category: {},
  subCategory: {},
  subSubCategory: {},
  categories: [],
  product: {},
  related_products: {},
  cart: {
    cart_total: 0,
    item_count: 0,
    contents: '',
  },
  user: {},
  campaign: {},
  sliders: "",
  banner: "",
  show_collpase_cart: false,
};
const getters = {
    category(state) {
        return state.category;
      },
      subCategory(state) {
        return state.subCategory;
      },
      subSubCategory(state) {
        return state.subSubCategory;
      },
};
const actions = {

  categories(context) {
    axios
      .get("categories", {
        headers: this.$apiHeader,
      })
      .then((resp) => {
      //  console.log(resp);
        if (resp.data.success == true) {
          context.commit("categories", resp.data.categories);
        }
      });
  },

   category(context, payload) {
       axios.get("category/" + payload, {
         headers: this.$apiHeader,
       })
         .then((resp) => {
          //  console.log(resp);
           if (resp.data.success == true) {
             context.commit('category', resp.data.category)
           }
           // else {
           //     router.push({name: 'not_found'});
           //  }
         })
     },
     subCategory(context, payload) {
       axios.get("sub/category/" + payload, {
         headers: this.$apiHeader,
       })
         .then((resp) => {
        //    console.log(resp);
           if (resp.data.success == true) {
             context.commit('subCategory', resp.data.sub_category)
           }
     
         })
     },
     subSubCategory(context, payload) {
       axios.get("sub/sub/category/" + payload, {
         headers: this.$apiHeader,
       })
         .then((resp) => {
           //   console.log(resp);
           if (resp.data.success == true) {
             context.commit('subSubCategory', resp.data.sub_sub_category)
           }
         })
     },

  product(context, payload) {
    axios
      .get("product/" + payload, {
        headers: this.$apiHeader,
      })
      .then((resp) => {
        // console.log(resp);
        if (resp.data.success == true) {
          context.commit("product", resp.data.product);
        } else {
          router.push("/");
        }
      });
  },


  cart(context) {
    axios
      .get("get/cart/content", {
        headers: this.$apiHeader,
      })
      .then((resp) => {
        // console.log(resp);
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
          // console.log(resp.data.user);
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
        if (resp.data.success == true) {
          context.commit("sliders", resp.data.sliders);
          context.commit("banner", resp.data.slider_banner);
        }

      });
  },
};
const mutations = {

  categories(state, payload) {
    return (state.categories = payload);
  },

  category(state, payload) {
      return state.category = payload;
    },
  subCategory(state, payload) {
    return state.subCategory = payload;
  },
  subSubCategory(state, payload) {
    return state.subSubCategory = payload;
  },

  product(state, payload) {
    return (state.product = payload);
  },
  related_products(state, payload) {
    return (state.related_products = payload);
  },
  cart(state, payload) {
    state.cart.cart_total = payload.total;
    state.cart.item_count = payload.qty;
    state.cart.contents = payload.contents;
    return;
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

};

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
});

global.store = store;

export default store;