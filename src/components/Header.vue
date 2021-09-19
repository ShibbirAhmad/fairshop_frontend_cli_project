<template>
  <div>
    <header id="header" class="u-header u-header-left-aligned-nav">
      <div class="header-items">
        <div class="container">
          <ul class="d-flex">
            <li>
              <router-link to="/">
                <img
                  src="../assets/images/logo.png"
                  class="img-fluid site_logo"
                />
              </router-link>
            </li>
            <li class="__serach_box">
              <form @submit.prevent="search_products">
                <input
                  type="text"
                  placeholder="search products"
                  class="search-box"
                  v-model="search"
                />
                <button
                  type="buttton"
                  class="
                    btn btn-dark
                    height-42
                    py-2
                    px-3
                    rounded-right-pill
                    search_icon
                  "
                >
                  <i class="fa fa-search"></i>
                </button>
              </form>
            </li>
            <li
              class="__user_account pointer"
            >

              <a
               v-if="Object.keys($store.state.user).length <= 0"
               title="user login"
                href="/login" >
                <img
                :src="$imageBaseUrl2 + 'user.png'"
                width="40px"
                height="40px"
                id="user_account_d"
              />
              </a>

              <img
                 @click="show_user_account_dropdown"
                :src="$imageBaseUrl2 + $store.state.user.image"
                width="40px"
                height="40px"
                id="user_account_d"
                v-else
              />

              <ul
                v-if="Object.keys($store.state.user).length <= 0"
                class="user-account-link-drop-down-link"
                style="height: 120px"

              >
                <div class="__prifile_name">
                  {{ $store.user ? $store.user.name : "" }}
                </div>
                <div class="__prifile_link">
                  <router-link to="/profile">Profile</router-link>

                  <router-link to="/order">Order List</router-link>

                  <a @click.prevent="logout" href=""> Logout </a>
                </div>
              </ul>

               <a class="facebook_link_btn" title="facebook page" href=""> <img src="../assets/images/facebook.png" >  </a>

               <a class="merchant_link_btn" title="Merchant Login" href="https://www.app.fairshop.com.bd/merchant/login"> <img src="../assets/images/merchant.png" >  </a>

            </li>


            <li class="font-1-5 r_search" id="r_search">
              <i
                class="fas fa-search"
                @click.prevent="
                  responsove_search_form = !responsove_search_form
                "
                style="color: #199EFF"
                id="r_search_i"
              ></i>

              <transition
                enter-active-class="animate__animated animate__fadeInDown"
                leave-active-class="animate__animated animate__fadeOutUp"
              >
                <ul
                  class="__responsive_search"
                  v-show="responsove_search_form"
                  id="__responsive_search"
                >
                  <form @submit.prevent="search_products">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search Products"
                      v-model="search"
                    />
                    <button class="rSearchBtn" type="submit">
                      <i class="fa fa-search"></i>
                    </button>
                  </form>
                </ul>
              </transition>
            </li>
          </ul>
        </div>
      </div>
      <div class="__nav" id="__nav">
        <ul class="__nav_resp_menu">
          <li class="__nav_resp_menu_close_active" @click="respMenuControl">
            Menu
          </li>
          <li @click="respMenuControl">Caetgory</li>
          <li @click="hideShowMenu" class="__nav_resp_menu_close">
            <i class="ec ec-close-remove"></i>
          </li>
          <li></li>
        </ul>
        <div class="container d-flex">
          <ul class="__category_nav">
            <li
              @mouseover.prevent="showMenu"
              class="c-link pointer __nav_list_highlight_link"
              id="__c_link"
            >
              SHOP BY CATEGORY

              <i class="fa fa-angle-down"></i>
            </li>
            <div class="__category-menu d-none" id="__category-menu">
              <li
                class="c-item"
                v-for="(category, cdx) in categories"
                :key="cdx"
              >
                <router-link
                  :to="{
                    name: 'categoryProducts',
                    params: { slug: category.slug },
                  }"
                >
                  {{ category.name }}
                </router-link>
                <i
                  v-if="category.sub_category.length > 0"
                  class="fa fa-angle-right c-icon"
                  @click="nextElement"
                ></i>
                <ul class="__c_sub" v-if="category.sub_category.length > 0">
                  <li
                    v-for="(sub_category, scdx) in category.sub_category"
                    :key="scdx"
                  >
                    <router-link
                      :to="{
                        name: 'SubCategoryProduct',
                        params: {
                          categortSlug: category.slug,
                          slug: sub_category.slug,
                        },
                      }"
                    >
                      {{ sub_category.name }}</router-link
                    >

                    <i
                      v-if="sub_category.sub_sub_category.length > 0"
                      class="fa fa-angle-right c-icon"
                    ></i>

                    <ul
                      class="__c_sub_sub"
                      v-if="sub_category.sub_sub_category.length > 0"
                    >
                      <a
                        class="finalSub"
                        v-for="(
                          sub_sub_category, sscdx
                        ) in sub_category.sub_sub_category"
                        :key="sscdx"
                      >
                        <router-link
                          :to="{
                            name: 'SubSubCategoryProduct',
                            params: {
                              categortSlug: category.slug,
                              SubCategortSlug: sub_category.slug,
                              slug: sub_sub_category.slug,
                            },
                          }"
                          >{{ sub_sub_category.name }}</router-link
                        >
                      </a>
                    </ul>
                  </li>
                </ul>
              </li>
            </div>
          </ul>
          <ul class="__nav_list" id="__nav_list">
            <router-link class="__nav_list_highlight_link" to="/"
              >Home</router-link
            >

            <router-link
              class="__nav_list_highlight_link"
              :to="{ name: 'shop' }"
              >Shop</router-link
            >
            <router-link
              class="__nav_list_highlight_link"
              :to="{ name: 'campaign' }"
              >Campaign</router-link
            >
            <router-link class="__nav_list_highlight_link" to="/gift/card"
              >Gift Card</router-link
            >


          </ul>
          <ul class="__nav_list_right">
            <li class="__nav_list_highlight_link">
              <a href="tel:01911074172">
                <i
                  style="text-transform: lowercase"
                  class="ec ec-support font-size-30"
                  aria-hidden="true"
                ></i>
                01911074172</a
              >
            </li>

          </ul>
        </div>
      </div>

      <!-- cart -->
    </header>
    <div class="cart-icon" @click="show_cart = !show_cart">
      <h4 style="margin-left: 5px; font-size: 35px; display: flex">
        <i class="ec ec-shopping-bag cart-icon-fa font-size-22"></i>
        <span
          class="
            width-22
            height-22
            bg-dark
            position-absolute
            d-flex
            align-items-center
            justify-content-center
            rounded-circle
            left-12
            top-8
            font-weight-bold font-size-12
            text-white
          "
        >
          {{ cart ? cart.item_count : 0 }}
        </span>

        <span
          id="__cart_total"
          style="font-size: 16px; margin-top: 6px; margin-left: 5px"
        >
          ৳{{ cart ? cart.cart_total : 0 }}
        </span>
      </h4>

      <!-- <span>
        {{  }}
      </span> -->
    </div>

    <Cart
      @update:show:cart="update_show_cart"
      v-show="show_cart"
      :show_cart="show_cart"
    />
  </div>
</template>
<style>
.user-account-link-drop-down-link {
  display: none;
}
</style>
<script>
import Cart from "./Cart";
export default {
  name: "Header",
  data() {
    return {
      search: "",
      show_cart: false,
      responsove_search_form: false,
    };
  },
  methods: {
    showMenu() {
      document.getElementById("__category-menu").classList.toggle("d-none");
      document.getElementById("__category-menu").classList.toggle("fadeInUp");
    },
    remove_cart_item(id) {
      if (confirm("Are You Sure ? Remove This Item !!")) {
        this.$axios
          .get("cart/item/remove/" + id, {
            headers: this.$apiHeader,
          })
          .then((resp) => {
            if (resp.data.success == "OK") {
              this.$toast.open({
                message: resp.data.message,
                type: "info",
                position: "bottom",
                duration: 4000,
              });
            }
            this.$store.dispatch("cart");
          });
      }
    },
    showCart() {
      let cart_elemnets = document.getElementById("__cart");
      cart_elemnets.classList.toggle("__cart_collapse");
    },
    respMenuControl(e) {
      let elemens = document.getElementsByClassName(
        "__nav_resp_menu_close_active"
      );
      for (let index = 0; index < elemens.length; index++) {
        elemens[index].classList.remove("__nav_resp_menu_close_active");
      }

      e.target.classList.toggle("__nav_resp_menu_close_active");
      document.getElementById("__category-menu").classList.toggle("d-flex");
      let menu = document.getElementById("__nav_list");
      menu.style.display = menu.style.display != "none" ? "none" : "flex";
    },
    nextElement(e) {
      let element = e.target.nextSibling.nextElementSibling;
      element.classList.toggle("d-flex");
      // element.style.display = (element.style.display != 'none') ? 'none' : 'flex';
    },
    hideShowMenu() {
      document.getElementById("__nav").classList.toggle("__show_menu");
    },
    // show_user_account_dropdown() {
    //   document
    //     .getElementsByClassName("user-account-link-drop-down-link")[0]
    //     .classList.toggle("__show");
    // },
    handleBodyClick(e) {
      //// hide user drow down lick
      let user_dropdown_link = document.getElementsByClassName(
        "user-account-link-drop-down-link"
      )[0];
      let user_account_d = document.getElementById("user_account_d");
      if (
        user_dropdown_link !== e.target &&
        !user_dropdown_link.contains(e.target) &&
        e.target !== user_account_d
      ) {
        if (user_dropdown_link.classList.contains("__show")) {
          user_dropdown_link.classList.remove("__show");
        }
      }

      ///hide the category mennu, when click the out side of element
      let catagory_menu = document.getElementById("__category-menu");
      let c_link = document.getElementById("__c_link");
      if (!c_link.contains(e.target) && e.target !== c_link) {
        catagory_menu.classList.add("d-none");
      }

      ////hide cart element
      let cart = document.getElementById("__cart");
      let cart_icon = document.getElementsByClassName("cart-icon")[0];
      let r_icon = document.getElementById("__r_cart_icon");
      if (
        cart !== e.target &&
        !cart.contains(e.target) &&
        e.target !== cart_icon &&
        !cart_icon.contains(e.target) &&
        e.target !== r_icon &&
        !r_icon.contains(e.target)
      ) {
        this.show_cart = false;
      }

      ///responsive search form

      let r_i_click = document.getElementById("r_search");
      if (r_i_click !== e.target && !r_i_click.contains(e.target)) {
        this.responsove_search_form = false;
      }
    },
    show_responsive_search() {
      let element = document.getElementById("__responsive_search");

      element.classList.toggle("__show");
    },

    logout() {
      localStorage.removeItem("user_token");

      this.$router.push({ name: "login" });
      location.reload();
    },
    search_products() {
      if (this.search.length <= 0) {
        alert("Please Write Something");
        return;
      }
      if (this.responsove_search_form) {
        this.responsove_search_form = false;
      }

      this.$router.push({ name: "search", params: { search: this.search } });
    },

    update_show_cart() {
      this.show_cart = false;
    },

    handleScrol() {
      if (window.pageYOffset >= 100) {
        document.getElementById("header").classList.add("__sticky");
      } else {
        document.getElementById("header").classList.remove("__sticky");
      }
    },
  },
  created() {
    this.$store.dispatch("categories");
    this.$store.dispatch("cart");
    this.$store.dispatch("user");
    window.addEventListener("click", this.handleBodyClick);
    window.addEventListener("scroll", this.handleScrol);
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    cart() {
      return this.$store.state.cart;
    },
    user() {
      return this.$store.state.user;
    },
  },

  components: {
    Cart,
  },
};
</script>
