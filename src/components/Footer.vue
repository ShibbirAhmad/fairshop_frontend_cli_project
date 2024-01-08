<template>
  <div>
    <footer>
      <div class="">
        <div class="">
          <div class="foooter desktop_footer">
            <div class="fpart-first">
              <div class="container">
                <div class="row">
                  <div class="contact col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <ul>
                      <li style="list-style-type:none" class="address">
                        <router-link to="/">
                          <img
                            src="../../assets/images/footer_logo.png"
                            class="img-fluid site_logo"
                          />
                        </router-link>

                        <p class="short_desc">
                        <br>
                        Address: Shop#19, 3rd Floor, Muktiplaza, Mirpur-1, Dhaka-1216
                        <br>
                        Phone: 880 176 2424333
                        <br>
                        Email: support@fairshop.com.bd
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div class="quick_link_container">
                      <div class="quick_link">
                        <h5>Quick Links</h5>
                        <div class="line"></div>
                        <ul class="link_line">
                          <li>
                            <a href="/" class="router-link-active">Home</a>
                          </li>
                          <li>
                            <a href="/merchant/login" class=""
                              >Merchant Login
                            </a>
                          </li>
                          <li><a href="/about/us" class="">About Us</a></li>
                          <li><a href="/contact/us" class="">Contact Us</a></li>
                          <li>
                            <a href="/privacy/policy" class="">Privacy </a>
                          </li>
                        </ul>
                      </div>

                      <div class="quick_link">
                        <h5>Information</h5>
                        <div class="line"></div>
                        <ul class="link_line">
                          <li>
                            <a href="/how/to/buy" class="">How to order</a>
                          </li>
                          <li>
                            <a href="/return/policy" class="">Return Policy</a>
                          </li>
                          <li><a href="/shipment" class="">Shipment </a></li>
                          <li>
                            <a href="/about/seller" class="">About Seller </a>
                          </li>

                          <li>
                            <a href="/term/condition" class="">Term And Condition </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- old social link -->
                  <div class=" col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div class="news_letter">
                      <h5>Follow Us</h5>
                      <div class="line"></div>
                      <div class="social-link">
                        <a :href="footer_setting.twitter_url" class="social-link-facebook"
                          ><i class="fa fa-instagram social-link-icon"></i
                        ></a>
                        <a :href="footer_setting.youtube_url" class="social-link-text"
                          ><i class="fa fa-youtube social-link-icon"></i
                        ></a>
                        <a :href="footer_setting.linkedin_url" class="social-link-text"
                          ><i class="fa fa-linkedin social-link-icon"></i
                        ></a>
                        <!-- <a href="general_setting.instagram" class="social-link-text"><i class="fa fa-twitter social-link-icon"></i></a> -->
                      </div>

                      <div class="">
                      <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffairshop.com.bd&tabs=timeline&width=380&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="380" height="130" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                      </div>
                      <!-- <form>
                        <div class="row">
                          <div class="subscribe_container">
                            <form @submit.prevent="subscribe()">
                              <div class="form-group s_form">
                                <label for="subscribe" class="form-label"
                                  >submit email to recieve latest offer .</label
                                >
                                <input
                                  type="email"
                                  required
                                  placeholder="example@gmail.com"
                                  class="form-control"
                                  v-model="email"
                                />

                                <button type="submit" class="email_btn">
                                  <i class="fa fa-envelope-open"></i>
                                </button>
                              </div>
                            </form>
                            <div class="social-icon">
                              <a
                                href="https://www.facebook.com/fairshop.com.bd/"
                                target="_blank"
                                class="social-wrape facebook-icon"
                                style="margin-top: 10px; margin-bottom: 10px;"
                                ><i
                                  class="fa fa-facebook f-icon facebook-icon"
                                ></i
                              ></a>
                              <a
                                href="https://www.youtube.com/channel/UCTE_0AVcFBp-GDI5HuuG1TQ"
                                target="_blank"
                                class="social-wrape"
                                ><i class="fa fa-youtube-square f-icon"></i>
                              </a>
                              <a
                                href="www.pinterest.com/fairshop21"
                                target="_blank"
                                class="social-wrape"
                                style="margin-top: 10px"
                              >
                                <i class="fa fa-pinterest f-icon"></i>
                              </a>
                              <a
                                href="https://www.linkedin.com/company/fairshop/"
                                target="_blank"
                                class="social-wrape"
                                style="margin-top: 10px"
                                ><i class="fa fa-linkedin f-icon"></i
                              ></a>
                            </div>
                          </div>
                        </div>
                      </form> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- SSL Logos -->
            <div class="fpart-second"  v-if="$route.name == 'Home'">
              <div class="container">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="footer_330_word_description">
                      <h1 style="font-weight: bold;">FAIRSHOP.COM.BD – A PLACE FOR ONLINE SHOPPING IN BANGLADESH</h1>
                      <p v-html="footer_setting.footer_description"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="fpart-second" v-if="$route.params.slug">
              <div class="container">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="footer_330_word_description">
                      <span v-for="(category, index) in categories" :key="index">
                        <span v-if="category.slug == $route.params.slug">
                          <p>
                              {{ category.description }}
                          </p>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>







            <div class="row">
              <div class="col-12">
                  <p class="footer_content">
                    Copyright © M/S fairshop, All rights reserved | Design & Developed by: <a style="color: #000;" href="https://mohasagorit.solutions/all-projects">Mohasagor it Solution</a>
                  </p>
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
          <router-link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              class="fa fa-house-door"
              viewBox="0 0 16 16"
            >
              <path
                d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"
              ></path>
            </svg>
            <h6 class="footer_nav_name">Home</h6>
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
            class="fa fa-grid"
            viewBox="0 0 16 16"
          >
            <path
              d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
            ></path>
          </svg>
          <h6 class="footer_nav_category">Category</h6>
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
              class="fa fa-cart2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
              ></path></svg></a>
          <h6 class="footer_nav_cart">Cart</h6>
        </li>

        <li @click="go_to_login">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="fa fa-person"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
            ></path>
          </svg>
          <h6 class="footer_nav_name">Login</h6>
        </li>
        <li>
          <a href="tel:01762424333"><i class="fa fa-phone"></i></a>
          <h6 class="footer_nav_call">Call</h6>
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
            @click="category_show = true"
            :class="{ active: category_show == true }"
          >
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
          <ul class="__footer_category">
            <li
              v-for="(category, c_index) in categories"
              :key="c_index"
              class="__footer_category_item"
            >
              <a
                :href="'/' + category.slug"
              >
                {{ category.name }}
              </a>
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
                  v-for="(sub_category, s_index) in category.sub_category"
                  :key="s_index"
                >
                  <a :href="'/' + category.slug +  '/'  + sub_category.slug">
                    {{ sub_category.name }}</a>
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
                      v-for="(sub_sub_category,
                      index) in sub_category.sub_sub_category"
                      :key="index"
                    >
                      <a :href="'/' + category.slug + '/'  + sub_category.slug + '/' + sub_sub_category.slug">
                      {{ sub_category.name }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
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
    this.footerSetting();
  },
  data() {
    return {
      category_show: false,
      show_footer_nav: false,
      show_footer_cart: false,
      email: "",
      footer_setting: '',
    };
  },
  methods: {
    subscribe() {
      this.axios
        .post("add/subscriber", {
          email: this.email,
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.success == "OK") {
            this.email = "";
            this.$toast.open({
              message: resp.data.message,
              type: "success",
              position: "bottom",
              duration: 3000,
            });
          } else {
            this.email = "";
            this.$toast.open({
              message: resp.data.message,
              type: "warning",
              position: "bottom",
              duration: 3000,
            });
          }
        });
    },

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


    footerSetting(){

        this.$axios.get('/footer/settings')
        .then((resp)=>{
          // console.log(resp);
          this.footer_setting = resp.data.footer_setting;
        })
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
  padding: 0;
}

.fpart-first {
  background-color: #eee;
}

.fpart-first {
  padding-top: 50px;
  padding-bottom: 10px;
}

.fpart-second {
  color: #000;
  background-color: #eee;
}

h5 {
  color: #000;
}

.fpart-first a {
  color: #000;
}

.short_desc {
  color: #000;
  font-size: 14px;
  line-height: 24px;
}

.payment-card {
  padding-top: 20px;
}

.payment-card img {
  width: 100%;
  height: auto;
}

.quick_link_container {
  display: flex;
}

.quick_link {
  margin: 0px 25px;
}

.link_line li {
  padding: 6px 0px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  display: -webkit-flex;
  display: flex;
  transition: all 0.2s ease;
}

.link_line li:hover {
  background-color: #fff;
  padding-left: 0.275rem;
}

.line {
  width: 72px;
  height: 2px;
  background: #199eff;
  margin-top: -10px;
  margin-bottom: 12px;
}

.subscribe_container {
  display: flex;
  box-shadow: 0 1pt 12pt rgb(150 165 237);
  padding: 10px 0px;
  margin-bottom: 10px;
}

.s_form {
  width: 400px;
  padding: 10px;
  margin-top: 22px;
}

.email_btn {
  width: 62px;
  height: 44px;
  background: #199eff;
  margin-top: -44px;
  border: none;
  float: right;
  border-radius: 0px 10px 10px 0px;
}

.email_btn i {
  color: #fff;
  font-size: 26px;
}

.social_container {
  display: flex;
  margin: 10px 0px;
  box-shadow: 0 1pt 12pt rgb(150 165 237);
  padding: 5px 0px;
}

.social-icon {
  margin: 10px;
}

.social-wrape {
  float: left;
  width: 40px;
  height: 40px;
  border: 1.5px dashed;
  border-radius: 50%;
  margin-left: 10px;
  background: #199eff;
}

.social-wrape:hover {
  background: #199eff;
}

.social-wrape:hover > i {
  color: #fff;
}

.f-icon {
  font-size: 26px;
  cursor: pointer;
  color: #fff;
  position: absolute;
  margin: 6px 6px;
}

.end_footer {
  display: flex;
  background: #199EFF;
  height: 50px;
  width: 100%;
}

.f_info_left {
  margin-left: 70px !important;
  color: #fff;
  margin-top: 10px;
  margin-bottom: 0;
  margin-left: 5px;
  font-size: 16px;
}

.f_info_right {
  float: right;
  color: #fff;
  margin-top: 10px;
  margin-left: 120px;
  margin-bottom: 0;
  font-size: 16px;
  margin-right: 20px;
}

@media only screen and (max-width: 768px) {
  .s_form {
    width: 330px;
  }

  .social-wrape {
    margin-left: 12px;
    margin-top: 10px;
  }

  .social_container {
    margin: 60px 0px;
  }

  .social-icon {
    margin: 45% 20%;
    position: absolute;
  }

  .end_footer {
    display: none;
  }

  .short_desc {
    margin-left: 0px;
    padding: 5px;
  }
  .quick_link{
    margin-left: 0px;
  }

  .news_letter {
    padding: 0px 20px;
    padding-left: 0px;
  }

  .payment-card {
    padding-top: 20px;
    margin-top: -20px;
    margin-bottom: 35px;
  }
  .__footer_nav {
    height: 4.5rem;
  }

  .footer_nav_name {
    margin-left: -6px;
    font-size: 14px;
    margin-top: -2px;
  }

  .footer_nav_category {
    margin-left: -15px;
    font-size: 14px;
    margin-top: -2px;
  }

  .footer_nav_cart {
    margin-left: 0px;
    font-size: 14px;
    margin-top: -2px;
  }

  .item {
    left: 48%;
  }
  .footer_nav_call {
    margin-left: 0px;
    font-size: 14px;
    margin-top: -2px;
  }
}
</style>
