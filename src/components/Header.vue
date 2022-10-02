<template>
  <div>
    <header id="header" class="u-header u-header-left-aligned-nav">
      <div class="header-items">
        <!-- Header container -->
        <div class="container">
          <!-- Header options -->
          <ul class="d-flex">
            <!-- Logo -->
            <li>
              <router-link to="/">
                <img
                  src="../../assets/images/logo.png"
                  class="img-fluid site_logo"
                />
              </router-link>
            </li>
            <!-- Search desktop -->
            <li class="__serach_box">
              <form @submit.prevent="redirectSearch">
                <input
                  type="text"
                  @keyup="searchProducts"
                  @input="searchProducts"
                  placeholder="search products"
                  class="search-box"
                  v-model="search"
                />
                <button
                  type="button"
                  @click="redirectSearch"
                  style="background: #199eff; color: #fff"
                  class="btn height-42 py-2 px-3 rounded-right-pill search_icon"
                >
                  <i class="fa fa-search"></i>
                </button>
              </form>
              <!-- Realtime Search result -->
              <ul class="search_result" v-if="search">
                <li
                  v-for="product in search_products"
                  :key="product.id"
                  style="border-bottom:solid 1px #cbd5e1"
                >
                  <a
                    :href="'/product/'+product.slug"
                    class="d-flex"
                  >
                    <!-- Product Image -->
                    <img
                      class="search_img"
                      :alt="product.thumbnail_img"
                      :src="$imageBaseUrl2 + product.thumbnail_img"
                    />
                    <!-- Product details -->
                    <div class="s_product_info">
                      <h4 class="s_product_name">{{ product.name }}</h4>
                      <div class="s_price">
                        <p>৳ {{ product.sale_price }}</p>
                        <p class="previous_price">৳ {{ product.price }}</p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
            <!-- search Mobile -->
            <li class="mobile_search_container">
              <div class="mobile_search_icon" @click="showHideMobileSearch">
                <i class="fa fa-search"></i>
              </div>
              <!-- searchbox mobile  -->
              <div id="mobileSearch" class="mobile_search_box">
                <form @submit.prevent="redirectSearch">
                  <input
                    type="text"
                    @keyup="searchProducts"
                    @input="searchProducts"
                    placeholder="search products"
                    class="mobile-search-box"
                    v-model="search"
                  />
                  <button
                    type="button"
                    @click="redirectSearch"
                    style="background: #199eff; color: #fff"
                    class="btn height-42 py-2 px-3 rounded-right-pill m_search_icon"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                </form>
                <!-- Realtime Search result -->
                <ul class="search_result" v-if="search">
                  <li
                    v-for="product in search_products"
                    :key="product.id"
                    style="border-bottom:solid 1px #cbd5e1"
                  >
                    <router-link
                      :to="{
                        name: 'single_product',
                        params: { slug: product.slug },
                      }"
                      class="d-flex"
                    >
                      <!-- Product Image -->
                      <img
                        class="search_img"
                        :alt="product.thumbnail_img"
                        :src="$imageBaseUrl2 + product.thumbnail_img"
                      />
                      <!-- Product details -->
                      <div class="s_product_info">
                        <h4 class="s_product_name">{{ product.name }}</h4>
                        <div class="s_price">
                          <p>৳ {{ product.sale_price }}</p>
                          <p class="previous_price">৳ {{ product.price }}</p>
                        </div>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
            <div class="icon_container"><li class="__user_account pointer">
              <a
                v-if="Object.keys($store.state.user).length <= 0"
                title="user login "
                href="/login"
              >
                <img
                  src="../../assets/images/UserLogin.png"
                  width="40px"
                  height="40px"
                  id="user_account_d"
                />
                <h4>Login/Register</h4> 
              </a>

              <a v-else href="/order">
                <img
                  src="../../assets/images/OrderTracking.png"
                  width="40px"
                  height="40px"
                />
              </a>

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

                  <a @click.prevent="logout" href="#"> Logout </a>
                </div>
              </ul>
            </li>
            <!-- Track Delivery -->
            <li>
              <div class="order-large-device" >
                <router-link
                  class="tacking_link_btn"
                  :to="{ name: 'order_tracking' }"
                >
                  <img src="../../assets/images/tracking.png"
                /></router-link>
                <router-link
                  class="tacking_link"
                  :to="{ name: 'order_tracking' }"
                >
                  Order Track
                </router-link>
              </div>

              <div
                class="order-small-device"
                style="width: 60px; display: none"
              >
                <router-link
                  class="tacking_link_btn"
                  :to="{ name: 'order_tracking' }"
                >
                  <img src="../../assets/images/tracking.png"
                /></router-link>
              </div>
            </li>
            <!-- Call Us -->
            <li class="call_us-box">
              <div class="call__us">
                <div>
                  <i class="fa fa-phone call-icon" aria-hidden="true"></i>
                </div>
                <div class="call-info">
                  <h4>Call Now</h4>
                  <h4>01762424333</h4>
                </div>
              </div>
            </li></div>
            <!-- User Account -->

          </ul>
        </div>
      </div>
      <!-- Category Navigation -->
      <div class="__nav" id="__nav">
        <!-- responsive menu -->
        <ul class="__nav_resp_menu">
          <li class="__nav_resp_menu_close_active" @click="respMenuControl">
            Menu
          </li>
          <li @click="respMenuControl">Category</li>
          <li @click="hideShowMenu" class="__nav_resp_menu_close">
            <i class="ec ec-close-remove"></i>
          </li>
          <li></li>
        </ul>

        <!-- desktop Menu new -->
        <div class="container d-flex">
          <ul class="__nav_list" id="__nav_list">
            <!-- home -->
            <li class="c-item">
              <router-link class="__nav_list_highlight_link" to="/"
                >Home</router-link
              >
            </li>
            <!-- other dynamic category -->
            <ul v-for="(category, cdx) in categories" :key="cdx">
              <li class="c-item" v-if="cdx < 8">
                <router-link
                  :to="{
                    name: 'categoryProducts',
                    params: { slug: category.slug },
                  }"
                  @click="nextElement"
                >
                  {{ category.name }}
                </router-link>
                <i
              v-if="category.sub_category.length > 0"
              class="fa fa-angle-down"
              @click="nextElement"
            ></i>

                <!-- Sub Category -->
                <ul class="__c_sub" v-if="category.sub_category.length > 0">
                  <li
                    v-for="(sub_category, sc_index) in category.sub_category"
                    :key="sc_index"
                  >
                    <router-link
                      :to="{
                        name: 'SubCategoryProduct',
                        params: {
                          category: category.slug,
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

                    <!-- Sub Sub Category -->
                    <ul
                      class="__c_sub_sub"
                      v-if="sub_category.sub_sub_category.length > 0"
                    >
                      <a
                        class="finalSub"
                        v-for="(sub_sub_category,
                        ssc_index) in sub_category.sub_sub_category"
                        :key="ssc_index"
                      >
                        <router-link
                          :to="{
                            name: 'SubSubCategoryProduct',
                            params: {
                              category: category.slug,
                              subcategory: sub_category.slug,
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
            </ul>
            <!-- campaign -->
            <li class="c-item">
              <router-link
                class="__nav_list_highlight_link"
                :to="{ name: 'campaign' }"
                >Campaign</router-link
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- cart -->
    </header>
    <div class="cart-icon" @click="show_cart = !show_cart">
      <h4
        style="margin-bottom: 0px; font-size: 35px; display: flex; flex-direction:column; align-items: center;"
      >
        <i
          class="fa fa-shopping-bag"
          aria-hidden="true"
          style="font-size:18px;"
        ></i>
        <!-- <span
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
        </span> -->

        <span id="__cart_total" style="font-size: 16px; margin-top: 0px;">
          ৳{{ cart ? cart.cart_total : 0 }}
        </span>
      </h4>
      <div style="width:100%" class="item-counter__container">
        <h4 class="item-counter">{{ cart ? cart.item_count : 0 }} items</h4>
      </div>

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
      search_products: "",
      show_cart: false,
    };
  },
  methods: {
    showHideMobileSearch(){
      document.getElementById("mobileSearch").classList.toggle("show_mobile_search_box");
    },
    showMenu() {
      document.getElementById("__category-menu").style.display = "block";
    },
    hideMegaMenu() {
      document.getElementById("__category-menu").style.display = "none";
    },
    remove_cart_item(id) {
      if (confirm("Are You Sure ? Remove This Item ")) {
        this.$axios
          .post("cart/item/remove", {
            headers: this.$apiHeader,
            id: id,
          })
          .then((resp) => {
            if (resp.data.success == true) {
              this.$toastr.s(resp.data.message);
              this.$store.dispatch("cart");
            }
          })
          .catch((error) => {
            this.$toastr.e(error.response.data.message);
          });
      }
    },

    showCart() {
      let cart_elements = document.getElementById("__cart");
      cart_elements.classList.toggle("__cart_collapse");
    },
    respMenuControl(e) {
      let element = document.getElementsByClassName(
        "__nav_resp_menu_close_active"
      );
      for (let index = 0; index < element.length; index++) {
        element[index].classList.remove("__nav_resp_menu_close_active");
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
    show_user_account_dropdown() {
      document
        .getElementsByClassName("user-account-link-drop-down-link")[0]
        .classList.toggle("__show");
    },
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

      ///hide the category menu, when click the out side of element
      let category_menu = document.getElementById("__category-menu");
      let c_link = document.getElementById("__c_link");
      if (!c_link.contains(e.target) && e.target !== c_link) {
        category_menu.classList.add("d-none");
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
    },

    logout() {
      localStorage.removeItem("user_token");
      this.$router.push({ name: "login" });
      location.reload();
    },

    redirectSearch() {
      if (this.search.length <= 0) {
        alert("Please Write Something");
        return;
      }
      this.$router.push({ name: "search", params: { search: this.search } });
    },

    async searchProducts() {
      if (this.search.length <= 0) {
        this.$toastr.w("Please search something");
        return;
      }
      if (this.search.length > 3) {
        await this.$axios
          .get("search/product/" + this.search, {
            headers: this.$apiHeader,
          })
          .then((resp) => {
            console.log(resp);
            if (resp.data.success == true) {
              this.search_products = resp.data.products;
            }
          })
          .catch((error) => {
            this.$toastr.e(error.response.data.message);
          });
      }
    },

    update_show_cart() {
      this.show_cart = false;
    },

    handleScroll() {
      if (window.pageYOffset >= 100) {
        document.getElementById("header").classList.add("__sticky");
      } else {
        document.getElementById("header").classList.remove("__sticky");
      }
    },
  },
  mounted() {
    this.$store.dispatch("categories");
    this.$store.dispatch("cart");
    this.$store.dispatch("user");
    window.addEventListener("click", this.handleBodyClick);
    window.addEventListener("scroll", this.handleScroll);
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

<style scoped>
.top-8 {
  top: 2.2rem;
}
.header-items ul {
  align-items: center;
  justify-content: space-between;
}
.facebook_link_btn {
  padding: 0px 10px;
  color: #189eff;
}

/* .tacking_link {
  padding: 0px 25px;
  position: absolute;
  color: #189eff !important;
  margin-top: 0;
  margin-left: 0;
} */
@media (max-width: 768px) {
  .__footer_nav {
    height: 3.5rem !important;
  }
  .facebook_link_btn {
    display: none;
  }
  .tacking_link {
    margin-top: 22px;
    margin-left: -15px;
    color: #27a4ff;
  }
  .tacking_link_btn img {
    margin-top: -6px;
  }
  .tacking_link {
    margin-top: 28px;
  }
  header#header li {
    margin-left: 17px;
  }
  #r_search_i {
    font-size: 30px;
  }
  .header-items ul {
    padding: 0 0px;
    align-items: center;
  }

  .__footer_nav ul {
    margin-top: -6px !important;
  }
}
</style>
