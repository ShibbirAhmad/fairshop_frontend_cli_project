<template>
  <main id="content" role="main" class="height">
    <!-- breadcrumb -->
    <div class="bg-gray-13 bg-md-transparent">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol
            class="breadcrumb flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visible"
          >
            <li class="breadcrumb-item">
              <a href="/">Home</a>
            </li>

            <li class="breadcrumb-item">
              <a href="#">{{ product.name }}</a>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- End breadcrumb -->

    <div class="container">
      <!-- <div
        class="col-lg-12 text-center"
        v-if="Object.keys(product).length <= 0"
      >
        <div class="spinner-border text-primary" role="status"></div>
      </div> -->
      <div>
        <div class="row">
          <div class="col-md-12 col-lg-6 mb-6">
            <image-zoom
              v-if="zooming_img"
              :regular="zooming_img"
              img-class="single_product_image"
            >
            </image-zoom>

            <div class="thumnail_img-box" v-if="product_images">
              <img
                v-for="(image, img_index) in product_images"
                :class="{ __active_border: img_index == 0 }"
                :key="img_index"
                :src="$imageBaseUrl + image.product_image"
                @click="displayImageFromBox"
              />
            </div>
          </div>

          <div class="snglepdt col-md-12 col-lg-6 mb-lg-0">
            <div class="mb-2">
              <!-- product title -->
              <div class="border-bottom pb-md-1">
                <h2 class="product_title">
                  {{ product.name }}
                </h2>
                <div class="d-md-flex align-items-center"></div>
              </div>

              <!-- product code and price section -->
              <div class="code_price-section">
                <!-- product code -->
                <div class="skustk">
                  <div class="skusct single_page_info-title" >
                    <strong >Code </strong>: {{ product.product_code }}
                  </div>
                  <!-- <div class="text-gray-9 font-size-1rem">
                    Availability:
                    <span
                      v-if="product.stock > 0"
                      class="text-green font-weight-bold"
                      >In Stock
                    </span>
                    <span v-else class="text-danger font-weight-bold"
                      >Out Of Stock
                    </span>
                  </div> -->
                </div>

                <!-- product price -->
                <div class="priceall single_page_info-title">
                  <div class="pricepn">
                    <div class="d-flex align-items-baseline">
                      <ins class="font-size-36 text-decoration-none"
                        ><span id="atrSec" style="display: none">৳</span>
                        <span id="aprice"></span
                      ></ins>
                      <del class="font-size-20 ml-2 text-gray-6">
                        <span id="ofprice"></span
                      ></del>
                    </div>
                  </div>
                  <div id="priceSection">
                    <div class="price_box">
                      <h3 style="margin: 0; font-size: 24px">Price:</h3>
                      <ins class="font-size-24 text-decoration-none">
                        ৳<span id="oprice">{{ product.sale_price }}</span>
                      </ins>
                      <del class="font-size-20 ml-2 text-gray-6">
                        ৳{{ product.price }}
                      </del>
                    </div>
                  </div>
                </div>
              </div>

              <!-- product size and quantity -->
              <div class="border-top">
                <div>
                  <div class="size_container">
                    <h4 class="single_page_info-title"
                      v-if="
                        product.product_variant && product.product_attribute
                      "
                    >
                      {{ product.product_attribute.attribute.name }} :
                    </h4>
                    <div
                      v-if="
                        product.product_variant && product.product_attribute
                      "
                    >
                      <div class="attribute-values">
                        <ul class="text-swatch attribute-swatch color-swatch">
                          <li
                            v-for="(variant, v) in product.product_variant"
                            :key="v"
                            class="attribute-swatch-item"
                          >
                            <div>
                              <label style="margin:0;">
                                <input
                                  class="product-filter-item variant_size"
                                  type="radio"
                                  :name="product.product_attribute.attribute.name.toLowerCase()"
                                  :value="variant.id"
                                  v-model="cart.variant_id"
                                  id="attrid"
                                />
                                <span>{{ variant.variant.name }}</span>
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- product size and color -->

                  <!-- product quantity -->
                  <div class="addtobtn mb-3">
                    <div class="mb-4 mb-md-0">
                      <div class="row align-items-center" style="gap: 24px; margin:6px 0;">
                        <div class="col-md-2 col-xs-2" style="margin: 0">
                          <h4 class="single_page_info-title" for="quantity" style="margin: 0">Quantity:</h4>
                        </div>

                        <div class="col-md-6 col-xs-6">

                      <!-- new increment decrement button -->
                        <div class="quantity_counter">
                          <div  @click.prevent="decrementQty()" class="in_dic_btn">
                            <a type="button"
                              >-</a
                            >
                          </div>
                          <div class="quantity_input">
                            <input
                              class="js-result"
                              min="1"
                              id="quantity"
                              type="text"
                              v-model="cart.qty"
                            />
                          </div>
                          <div @click.prevent="cart.qty++" class="in_dic_btn">
                            <a type="button" >+</a>
                          </div>
                        </div>
                        </div>


                      </div>
                    </div>
                    <br />
                    <div class="" id="tocart">
                      <!-- Order Button -->
                      <div style="display: flex" class="cart_buy_container">
                        <!-- Buy Now Button -->
                        <button
                          style="background-color: #199eff"
                          @click.prevent="addToCart(product, 2)"
                          class="adtocrtphn c-primary"
                        >
                          Buy Now
                        </button>

                        <!-- Add to cart Button -->
                        <button
                          style="background-color: #0d4f80; margin-left: 12px"
                          @click.prevent="addToCart(product, 1)"
                          id="__Add_to_cart"
                          class="adtocrtphn"
                        >
                          Add to Cart
                        </button>
                      </div>

                      <!-- other information's -->
                      <div>
                        <div class="order_now_container">
                          <p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="icon_size"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                              />
                            </svg>
                            Order today and receive it within 02 - 05 days
                          </p>
                          <p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              class="icon_size"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>

                            130 টাকা অগ্রিম পেমেন্ট করতে হবে (ঢাকার বাহিরের
                            কাস্টমারদের জন্য )
                          </p>
                        </div>

                        <div class="call_now_container">
                          <p>Have question about this product ? please call</p>
                          <h4>
                            <a href="tel:01762424333"
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="icon_size-big"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              01762424333
                            </a>
                          </h4>
                          <h4>
                            <a href="tel:01723669292"
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="icon_size-big"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              01723669292
                            </a>
                            <sup
                              style="
                                font-size: 12px;
                                border: 1px dashed #199eff;
                                padding: 2px;
                              "
                              >Bkash Merchant</sup
                            >
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5 bg-white p-5 shadow product_details_row">
          <div class="col-md-12 mb-md-12 mb-lg-0" style="overflow: hidden">
            <div class="product-details-tabe">
              <ul v-if="product.video" class="details-tab-menu-list">
                <li
                  class="details-tab-menu-item"
                  @click="tab_content = 1"
                  :class="{ 'tab-menu-item-active': tab_content == 1 }"
                >
                  Video
                </li>
                <li
                  class="details-tab-menu-item"
                  @click="tab_content = 2"
                  :class="{ 'tab-menu-item-active': tab_content == 2 }"
                >
                  Description
                </li>
                <li
                  class="details-tab-menu-item"
                  @click="tab_content = 3"
                  :class="{ 'tab-menu-item-active': tab_content == 3 }"
                >
                  How To Buy
                </li>
                <li
                  class="details-tab-menu-item"
                  @click="tab_content = 4"
                  :class="{ 'tab-menu-item-active': tab_content == 4 }"
                >
                  Return Policy
                </li>
              </ul>
              <ul v-else class="details-tab-menu-list">
                <li
                  class="details-tab-menu-item"
                  @click="tab_content = 1"
                  :class="{ 'tab-menu-item-active': tab_content == 1 }"
                >
                  Description
                </li>
                <li
                  class="details-tab-menu-item"
                  @click="tab_content = 2"
                  :class="{ 'tab-menu-item-active': tab_content == 2 }"
                >
                  How To Buy
                </li>
                <li
                  class="details-tab-menu-item"
                  @click="tab_content = 3"
                  :class="{ 'tab-menu-item-active': tab_content == 3 }"
                >
                  Return Policy
                </li>
              </ul>
              <div class="product-tab-content">
                <div
                  v-html="product.details"
                  class="product-details"
                  :class="{ block: tab_content == 1 }"
                ></div>
                <div class="how-to-buy" :class="{ block: tab_content == 2 }">
                  <ul>
                    <li class="h-b-li">
                      Select number of product you want to buy.
                    </li>
                    <li class="h-b-li">
                      Click <strong>Add To Cart</strong> Button
                    </li>
                    <li class="h-b-li">Then go to checkout page</li>
                    <li class="h-b-li">
                      If you are a new user, please click on Sign Up.provide us
                      your valid information.
                    </li>
                    <li class="h-b-li">
                      Complete your checkout, we received your order, and for
                      order confirmation or customer service contact with you
                    </li>
                  </ul>
                </div>
                <div class="how-to-buy" :class="{ block: tab_content == 3 }">
                  <ul>
                    <li class="h-b-li">
                      After receiving the product you will be able to accept the
                      modified product in case of any problem of the product
                      (eg: product broken, torn, product not working, product
                      does not match with the photo, etc.). In that case you
                      have to e-mail support@fairshop.com.bd within maximum 48
                      hours after receiving the product or you have to inform us
                      on our hotline number 880 1762424333. Note that you have
                      to bear the cost of courier to replace any product as a
                      result of your change of mind and fairshop.com.bd will
                      bear the cost of any product by fairshop.com.bd.
                    </li>
                    <li class="h-b-li">
                      Let us know your - questions - comments - complaints -
                      phone: 880 1762424333, e-mail: support@fairshop.com.bd
                    </li>
                  </ul>
                </div>
                <div
                  v-if="product.video"
                  v-html="product.video"
                  class="product-details"
                  :class="{ block: tab_content == 1 }"
                >
                  {{ product.video }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="js-next d-none d-lg-inline-block u-slick__arrow-classic u-slick__arrow-centered--y rounded-circle fas fa-arrow-right u-slick__arrow-classic-inner u-slick__arrow-classic-inner--right mr-lg-2 mr-xl-4 slick-arrow"
          style=""
        ></div>
      </div>
    </div>

    <div class="container">
      <div
        class="d-flex justify-content-between border-bottom border-color-1 flex-lg-nowrap flex-wrap border-md-down-top-0 border-md-down-bottom-0 mt-5"
        style="margin-bottom: 1rem"
      >
        <h3 class="section-title section-title__full mb-0 pb-2 font-size-22">
          Related Products
        </h3>
      </div>

      <div
        class="tab-content"
        id="pills-tabContent"
        style="padding-bottom: 0.5rem"
      >
        <div
          class="tab-pane fade pt-2 show active"
          id="pills-one-example1"
          role="tabpanel"
          aria-labelledby="pills-one-example1-tab"
          data-target-group="groups"
        >
          <ul
            class="row list-unstyled products-group no-gutters filters"
            id="br_id"
          >
            <Products :products="products"></Products>
          </ul>
        </div>
      </div>
      <InfiniteLoading
        spinner="waveDots"
        @distange="0.5"
        @infinite="relatedProducts"
      >
        <div slot="no-more"></div>
      </InfiniteLoading>
    </div>

    <!-- End Brand Carousel -->

    <Cart :show_cart="cart_show" />
  </main>
</template>

<script>
import Products from "../components/products.vue";
import Cart from "../components/Cart";
import imageZoom from "vue-image-zoomer";
import InfiniteLoading from "vue-infinite-loading";
export default {
  name: "single-product",
  mounted() {
    this.$store.dispatch("product", this.$route.params.slug);
    window.scroll(0, 0);
    window.addEventListener("click", this.handleBodyClick);
    this.productImages();
  },
  data() {
    return {
      cart: {
        qty: 1,
        variant_id: "",
      },
      variant_id: '',
      cart_show: false,
      loading: true,
      tab_content: 1,
      zooming_img: "",
      products: [],
      page: 1,
      product_images: "",
    };
  },
  methods: {
    relatedProducts($state) {
      this.$axios
        .get(
          "related/products/" + this.$route.params.slug + "?page=" + this.page,
          {
            headers: this.$apiHeader,
          }
        )
        .then((resp) => {
          // console.log(resp);
          if (resp.data.success == true && resp.data.products.data.length) {
            this.products.push(...resp.data.products.data);
            this.page += 1;
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch((error) => {
          this.$toastr.e(error.response.data.message);
        });
    },

    decrementQty() {
      this.cart.qty -= 1;
    },

    incrementQty() {
      this.cart.qty += 1;
      if (this.cart.qty < 1) {
        this.$toastr.e("quantity can't be less then one ");
        this.cart.qty = 1;
      }
    },

    async addToCart(product, type) {
      if (product.product_variant.length > 0 && this.cart.variant_id == "") {
        this.$toastr.e("select product variant");
        return;
      }

      await this.$axios
        .post("add/to/cart", {
          headers: this.$apiHeader,
          slug: product.slug,
          qty: this.cart.qty,
          variant_id: this.cart.variant_id,
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.success == true) {
            if (type == 1) {
              this.$store.dispatch("cart");
            } else {
              this.$router.push({ name: "checkout" });
            }
            this.$toastr.s(resp.data.message);
          }
        })
        .catch((error) => {
          this.$toastr.e(error.response.data.message);
        });
    },

    displayImageFromBox(e) {
      let target_element = e.target;
      let active_images = document.getElementsByClassName("__active_border");
      if (active_images.length > 0) {
        for (let i = 0; i < active_images.length; i++) {
          active_images[i].classList.remove("__active_border");
        }
      }
      target_element.classList.add("__active_border");
      this.zooming_img = target_element.src;
    },
    handleBodyClick(e) {
      ////hide cart element
      let cart = document.getElementById("__cart");
      let cart_icon = document.getElementsByClassName("cart-icon")[0];
      let r_icon = document.getElementById("__r_cart_icon");
      let add_to_cart = document.getElementById("__Add_to_cart");
      if (
        cart !== e.target &&
        !cart.contains(e.target) &&
        e.target !== cart_icon &&
        !cart_icon.contains(e.target) &&
        e.target !== r_icon &&
        !r_icon.contains(e.target) &&
        e.target !== add_to_cart &&
        !add_to_cart.contains(e.target)
      ) {
        this.cart_show = false;
      }
    },
    productImages() {
      this.$axios
        .get("product/images/" + this.$route.params.slug)
        .then((resp) => {
          //   console.log(resp);
          if (resp.data.success == true) {
            this.zooming_img =
              this.$imageBaseUrl + resp.data.product_images[0].product_image;
            this.product_images = resp.data.product_images;
          }
        });
    },
  },
  watch: {
    qty: function (value) {
      if (value <= parseInt(0)) {
        this.$toast.open({
          message: `Quantity can not be smaller than 1`,
          type: "warning",
          position: "bottom",
          duration: 3000,
        });
        this.qty = 1;
        return;
      }
    },
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
  },
  components: {
    InfiniteLoading,
    Products,
    Cart,
    imageZoom,
  },
};
</script>

<style scoped>
.product-details p {
  line-height: 20px !important;
}
.product-details-tabe {
  background: #fff;
  margin-top: 25px;
  padding: px;
  box-shadow: 3px 3px 3px #ddd;
  border-radius: 10px;
}
ul.details-tab-menu-list {
  width: 100%;
  display: flex;
  text-transform: uppercase;
  background: #ddd;
  border-radius: 2px;
}
.details-tab-menu-item {
  padding: 10px;
  color: #000;
  cursor: pointer;
  list-style-type: none;
}
.tab-menu-item-active {
  border-bottom: 4px solid #199eff;
}
.product-tab-content {
  padding: 15px 15px;
  min-height: 250px;
}
.product-details {
  display: none;
}
.how-to-buy {
  display: none;
}
.block {
  display: block;
}
li.h-b-li {
  list-style-type: square;
  padding: 2px;
}
.__active_border {
  border: 1px solid #199eff;
}
p {
  line-height: 1 !important;
}
.form-control {
  border-radius: 0% !important;
}
.breadcrumb-item + .breadcrumb-item::before {
  display: inline-block;
  padding-right: 1rem;
  color: #333e48;
  content: ">";
}
.breadcrumb-item + .breadcrumb-item a {
  background-color: transparent;
  border-radius: 0.313rem;
  margin-top: 3px;
}
.breadcrumb-item + .breadcrumb-item {
  padding-left: 5px;
}
.breadcrumb-item + .breadcrumb-item[data-v-63742c3d]::before {
  display: inline-block;
  padding-right: 5px;
  color: #333e48;
  content: ">";
}
.pr-5,
.px-5 {
  padding-right: 2.5rem !important;
}
.attribute-swatch-item {
  list-style: none;
}
.attribute-swatch {
  display: flex;
}

/* start attribute and variant awesome css  */

.attribute-swatch {
  display: flex;
  margin-top: 0px;
}
.attribute-swatch li {
  list-style: none;
  margin-right: 10px;
}

.Black {
  background-color: #000;
}
.Red {
  background-color: red;
}
.Green {
  background-color: green;
}

.Yellow {
  background-color: yellow;
}

.Navy {
  background-color: navy;
}

.attribute-swatches-wrapper.form-group {
  margin-bottom: 10px;
}

.product__color {
  padding-bottom: 10px;
}

.product__attribute {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
}

.product__attribute > label {
  margin-bottom: 0;
  max-width: 60px;
  margin-right: 27px;
}

.product__attribute > * {
  flex-basis: 100%;
}

.ps-product--detail .ps-product__info {
  text-align: left;
}

.attribute-values ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.product__color .color-swatch li {
  display: inline-block;
  margin-right: 5px;
  vertical-align: top;
}

.custom-checkbox label,
.custom-radio label {
  display: block;
}

.text-swatch li input[type="checkbox"],
.text-swatch li input[type="radio"] {
  display: none;
}
.text-swatch li input[type="checkbox"]:checked ~ span,
.text-swatch li input[type="radio"]:checked ~ span {
  border: 1px solid #000;
}

.custom-checkbox input[type="checkbox"],
.custom-checkbox input[type="radio"],
.custom-radio input[type="checkbox"],
.custom-radio input[type="radio"] {
  display: none;
}

.product__attribute .form-control {
  border: none;
}

.product__color .color-swatch li span {
  margin-bottom: 0;
}
.product__color .color-swatch li {
  display: inline-block;
  margin-right: 5px;
  vertical-align: top;
}

* {
  font-family: "Work Sans", sans-serif;
  font-weight: 400;
}

*,
::after,
::before {
  box-sizing: border-box;
}

.text-swatch li span {
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: 3px 14px;
  position: relative;
  transition: 0.2s;
}

.custom-checkbox input[type="checkbox"]:checked ~ span:before,
.custom-checkbox input[type="radio"]:checked ~ span:before,
.custom-radio input[type="checkbox"]:checked ~ span:before,
.custom-radio input[type="radio"]:checked ~ span:before {
  border: 2px solid #fff;
  border-radius: 50%;
  bottom: -4px;
  content: "";
  display: block;
  left: -4px;
  position: absolute;
  right: -4px;
  top: -4px;
}

.text-swatch li input[type="checkbox"]:checked ~ span:before,
.text-swatch li input[type="radio"]:checked ~ span:before {
  border: 23px solid transparent;
  border-bottom: 16px solid #000;
  bottom: 0px;
  content: "";
  position: absolute;
  right: -22px;
}

.text-swatch li input[type="checkbox"]:checked ~ span:after,
.text-swatch li input[type="radio"]:checked ~ span:after {
  bottom: 0px;
  color: #fff;
  content: "✓";
  font-family: Linearicons !important;
  font-size: 14px;
  height: 19px;
  overflow: hidden;
  position: absolute;
  right: -6px;
  width: 16px;
}

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}

button,
input {
  overflow: visible;
}

button,
input,
select,
textarea {
  font: inherit;
  margin: 0;
}

.custom-checkbox span,
.custom-radio span {
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: 25px;
  position: relative;
  width: 25px;
}

.product__attribute
  .color-swatch
  .attribute-swatch-item.select_none
  span:before,
.product__attribute
  .text-swatch
  .attribute-swatch-item.select_none
  span:before {
  transform: rotate(45deg);
}
.product__attribute .color-swatch .attribute-swatch-item.select_none span:after,
.product__attribute .text-swatch .attribute-swatch-item.select_none span:after {
  transform: rotate(-45deg);
}
.product__attribute .color-swatch .attribute-swatch-item.select_none span:after,
.product__attribute
  .color-swatch
  .attribute-swatch-item.select_none
  span:before,
.product__attribute .text-swatch .attribute-swatch-item.select_none span:after,
.product__attribute
  .text-swatch
  .attribute-swatch-item.select_none
  span:before {
  border-top: 1px dashed #999;
  content: "";
  height: 0;
  left: 0;
  position: absolute;
  top: 50%;
  width: 100%;
}

.product-form.product-variations {
  line-height: 25px;
}

/* end attribute and variant awesome css  */
</style>
