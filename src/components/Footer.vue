<template>
  <div>
    <footer>
      <div class="bg-gray-14 py-2 hide">
        <div class="container">
          <div class="foooter">
            <div class="row justify-content-center">
             <div class="col-lg-4 text-center">


              <router-link to="/">
                <img
                  src="../assets/images/logo.png"
                  class="img-fluid site_logo"
                />
              </router-link>


              <p class="p-3">
                Fairshop.com is a complete e-commerce website in Bengali and English. Here, consumers of all ages can buy every essential product of the day, from gadgets, electronics, home appliances, leather goods, jewelry, baby accessories, cosmetics, fashion and lifestyle products to affordable prices at home
              </p>


             </div>
             <div class="col-lg-4 ">
               <h4 class="text-center mb-5 mt-2">
                 Links
               </h4>
               <ul class="text-center" style="list-style:none;">
               <li class="mt-5">
                  <a href="/">Home</a>

               </li>
               <li>
                  <a href="/shops">Products</a>

               </li>
               <li>
                  <a href="/campaign">Campaign</a>

               </li>
               <li>
                  <a href="/merchant/login">Merchant</a>

               </li>
               </ul>

             </div>
             
            </div>
          </div>
        </div>
      </div>

      <!-- End Footer-copy-right -->
    </footer>

    <div class="__footer_nav">
      <ul>
        <li>
          <router-link to="/shop">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              class="bi bi-house-door"
              viewBox="0 0 16 16"
            >
              <path
                d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"
              ></path>
            </svg>
          </router-link>
        </li>

        <li
          id="footer_items_toogle_li"
          @click="show_footer_nav = !show_footer_nav"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="currentColor"
            class="bi bi-grid"
            viewBox="0 0 16 16"
          >
            <path
              d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
            ></path>
          </svg>
        </li>

        <li id="__r_cart_icon_li">
          <a
            @click.prevent="show_footer_cart = !show_footer_cart"
            id="__r_cart_icon"
          >
            <span
              class="
                position-absolute
                d-flex
                align-items-center
                justify-content-center
                rounded-circle
                left-12
                top-8
                font-weight-bold font-size-12
                text-white
                item
              "
              id="totalitems2"
            >
              {{ $store.state.cart.item_count }}
            </span>

            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-cart2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
              ></path></svg
          ></a>
        </li>
        <li @click="go_to_login">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-person"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
            ></path>
          </svg>
        </li>
      </ul>
    </div>

    <transition
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutLeft"
    >
      <div v-show="show_footer_nav" class="__footer_menu" id="__footer_menu">
        <div class="__header">
          <li
            @click="category_show = false"
            :class="{ active: !category_show }"
          >
            Menu
          </li>
          <li @click="category_show = true" :class="{ active: category_show }">
            Category
          </li>
          <li @click="show_footer_nav = !show_footer_nav">
            <i
              class="ec ec-close-remove"
              style="
                margin-left: auto;
                float: right;
                position: absolute;
                right: 5%;
                font-size: 22px;
                color: #2783c2;
              "
            ></i>
          </li>
        </div>

        <div class="__footer_mneu_body">
          <ul class="__footer_menu_nav" v-if="!category_show">
            <li @click="hideMenu">
              <router-link to="/">Home</router-link>
            </li>
            <li @click="hideMenu">
              <router-link to="/shop">Shop</router-link>
            </li>
            <li @click="hideMenu">
              <router-link to="/campaign">Campaign</router-link>
            </li>


            <li @click="hideMenu">
              <router-link to="/blog">Blog</router-link>
            </li>
          </ul>
          <ul class="__footer_category" v-else>
            <li

              v-for="(category, fcdx) in categories"
              :key="fcdx"
              class="__footer_category_item"

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
                class="fa fa-sort-down"
                style="color: #333e48 !important; cursor: pointer"
                v-if="category.sub_category.length > 0"
                @click="nextElement"
              ></i>

              <ul
                class="__footer_c_sub"
                v-if="category.sub_category.length > 0"
              >
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
                    class="fa fa-sort-down"
                    style="color: #333e48 !important; cursor: pointer"
                    v-if="sub_category.sub_sub_category.length > 0"
                    @click="nextElement"
                  ></i>

                  <ul
                    class="__footer_c_sub_sub"
                    v-if="sub_category.sub_sub_category.length > 0"
                  >
                    <li
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
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="__footer_mneu_footer">
          <li>
            <a
              class="nav-link u-header__nav-link"
              aria-haspopup="true"
              aria-expanded="false"
              aria-labelledby="blogSubMenu"
            >
              <i
                style="font-size: 20px; color: #5da2d1"
                class="ec ec-support font-size-30"
                aria-hidden="true"
              ></i>
              09639 155 660, 01817 770 060</a
            >
          </li>
          <li class="__footer_menu_s_link">
            <ul style="padding: 15px 5px">
              <router-link to="/return/policy">Return & Refund</router-link>
              <router-link to="/privacy/policy">Privacy & Polciy</router-link>
              <router-link to="/faq" href="">FAQ & Help</router-link>

              <router-link to="/contact-us">Contact Us</router-link>
            </ul>
          </li>
          <li
            style="padding: 10px; border: 1px solid #afd1e8; border-radius: 5px"
          >
            <img
              class="mCS_img_loaded"
              style="width: 100%"
              :src="$imageBaseUrl + 'SSLCommerz-Pay-With-logo-All-Size-04.png'"
              alt="Image Description"
            />
          </li>
        </div>
      </div>
    </transition>

    <Cart
      @update:show:cart="update_show_cart"
      v-show="show_footer_cart"
      :show_cart="show_footer_cart"
    />
  </div>
</template>

<script>
import Cart from "./Cart";
export default {
  name: "Footer",
  created() {
    window.addEventListener("click", this.handleBodyClick);
  },
  data() {
    return {
      category_show: false,
      show_footer_nav: false,
      show_footer_cart: false,
    };
  },
  methods: {
    hideShowMenu() {
      document.getElementById("__nav").classList.toggle("__show_menu");
    },

    nextElement(e) {
      let element = e.target.nextSibling;
      element.classList.toggle("__show");
      console.log(element);
      // element.style.display = (element.style.display != 'none') ? 'none' : 'flex';
    },

    go_to_login() {
      this.$router.push({ name: "login" });
    },
    handleBodyClick(e) {
      let footer_menu = document.getElementById("__footer_menu");
      let menu_click = document.getElementById("footer_items_toogle_li");

      if (
        footer_menu != e.target &&
        !footer_menu.contains(e.target) &&
        e.target != menu_click &&
        !menu_click.contains(e.target)
      ) {
        this.show_footer_nav = false;
      }

      ///hide cart when body click
      let cart_click = document.getElementById("__r_cart_icon_li");
      let cart = document.getElementById("__cart");
      if (
        cart_click != e.target &&
        !cart_click.contains(e.target) &&
        e.target != cart &&
        !cart.contains(e.target)
      ) {
        this.show_footer_cart = false;
      }
    },
    update_show_cart() {
      this.show_footer_cart = false;
    },
    hideMenu() {
      this.show_footer_nav = false;
    },
  },

  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },

  components: {
    Cart,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.foooter {
    background: #eee;
    padding: 20px;
}
</style>
