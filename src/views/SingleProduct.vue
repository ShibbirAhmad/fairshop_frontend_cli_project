<template>
  <main id="content" role="main" class="height">
    <!-- breadcrumb -->
    <div class="bg-gray-13 bg-md-transparent">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol
            class="
              breadcrumb
              flex-nowrap flex-xl-wrap
              overflow-auto overflow-xl-visble
            "
          >
            <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
              <a href="/">Home</a>
            </li>

            <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
              <router-link :to="'/shop'">Shop</router-link>
            </li>
            <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
              <a href="#">{{ product.name }}</a>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- End breadcrumb -->

    <div class="container">
      <!-- Single Product Body -->

      <div
        class="col-lg-12 text-center"
        v-if="Object.keys(product).length <= 0"
      >
        <div class="spinner-border text-primary" role="status"></div>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-md-4 mb-4 mb-md-0">
            <img
              v-if="product.product_image.length > 0"
              :src="$imageBaseUrl + product.product_image[0].product_image"
              :alt="product.name"
              class="single_product_image"
              id="__single_product_image"
            />
            <div
              class="thumnail_img-box"
              v-if="product.product_image.length > 0"
            >
              <img
                v-for="(image, imgdx) in product.product_image"
                :key="imgdx"
                :src="$imageBaseUrl + image.product_image"
                @click="changePreview"
                alt=""
              />
            </div>
            <!-- 
            <ProductZoomer
            v-if="Object.keys(product_images).length > 0"
              :base-images="product_images"
              :base-zoomer-options="zoomerOptions"
              
            /> -->
          </div>

          <div class="snglepdt col-md-5 mb-md-6 mb-lg-0">
            <div class="mb-2">
              <div class="border-bottom pb-md-1">
             
               
                <h2 class="font-size-25 text-lh-1dot2 font-weight-600">
                  {{ product.name }}
                </h2>
                <div class="d-md-flex align-items-center"></div>
              </div>

              <div class="skustk">
                <div class="skusct">
                  <strong>SKU</strong>: {{ product.product_code }}
                </div>
                <div class="text-gray-9 font-size-1rem">
                  Availability:
                  <span
                    v-if="product.stock > 0"
                    class="text-green font-weight-bold"
                    >In Stock
                  </span>
                  <span v-else class="text-danger font-weight-bold"
                    >Out Of Stock
                  </span>
                </div>
              </div>
              <div class="priceall">
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
                  <div class="d-flex align-items-baseline">
                    <ins class="font-size-36 text-decoration-none">
                      ৳ <span id="oprice">{{ product.discount_price }}</span>
                    </ins>
                    <del
                     
                      class="font-size-20 ml-2 text-gray-6"
                    >
                      ৳ {{ product.regular_price }}
                    </del>
                    <span style="font-size: 1.5rem; padding-left: 0.5rem">
                      {{ $discount_percent(product) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="border-top">
                <div v-if="Object.keys(variants).length > 0">
                  <div
                    class="d-flex align-items-center"
                    style="padding-bottom: 0.5rem"
                    v-for="(variant, vidx) in variants"
                    :key="vidx"
                  >
                    <h3 class="font-size-1rem mb-0" id="atName">
                      {{ vidx }}
                    </h3>
                    <div class="ml-3">
                      <select
                        class="form-control ml-3"
                        v-model="variant_id"
                        id="attrid"
                      >
                        <option selected disabled value="">
                          Select {{ vidx }}
                        </option>
                        <option
                          v-for="(v_item, viidx) in variant"
                          :key="viidx"
                          :value="v_item.variant_id"
                        >
                          {{ v_item.variant.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="addtobtn d-md-flex align-items-end mb-3">
                  <div class="qnttbox max-width-150 mb-4 mb-md-0">
                    <!-- Quantity -->
                    <div class="qntt rounded-pill py-2 px-3 border-color-1">
                      <div class="js-quantity row align-items-center">
                        <div class="qnttInput col">
                          <input
                            class="
                              js-result
                              form-control
                              h-auto
                              border-0
                              rounded
                              p-0
                              shadow-none
                            "
                            min="1"
                            id="quantity"
                            type="text"
                            v-model="qty"
                          />
                        </div>
                        <div class="col-auto pr-1">
                          <a
                            type="button"
                            @click.prevent="qtyChange(-1)"
                            class="
                              js-minus
                              btn btn-icon btn-xs btn-outline-secondary
                              rounded-circle
                              border-0
                            "
                          >
                            <i class="fa fa-minus"></i>
                          </a>
                          <a
                            type="button"
                            class="
                              js-plus
                              btn btn-icon btn-xs btn-outline-secondary
                              rounded-circle
                              border-0
                            "
                            @click.prevent="qtyChange(+1)"
                          >
                            <i class="fa fa-plus"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <!-- End Quantity -->
                  </div>

                  <div class="ml-md-3" id="tocart">
                    <button
                      @click.prevent="
                        add_to_cart($event, product, qty, variant_id)
                      "
                      id="__Add_to_cart"
                      class="adtocrtphn btn px-5 btn-primary-dark"
                    >
                      <i class="ec ec-add-to-cart font-size-20"></i>

                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5 bg-white p-5 shadow">
          <div class="col-md-12 mb-md-12 mb-lg-0" style="overflow: hidden">
            <div class="" id="details">
              <div class="border-bottom">
                <h2 class="font-size-25 text-lh-1dot2">Product Details</h2>
              </div>
              <br />

              <p v-html="product.details"></p>
            </div>
          </div>
        </div>

        <div
          class="
            js-next
            d-none d-lg-inline-block
            u-slick__arrow-classic u-slick__arrow-centered--y
            rounded-circle
            fas
            fa-arrow-right
            u-slick__arrow-classic-inner u-slick__arrow-classic-inner--right
            mr-lg-2 mr-xl-4
            slick-arrow
          "
          style=""
        ></div>
      </div>
    </div>

    <div class="container">
      <div
        class="
          d-flex
          justify-content-between
          border-bottom border-color-1
          flex-lg-nowrap flex-wrap
          border-md-down-top-0 border-md-down-bottom-0
          mt-5
        "
        style="margin-bottom:1rem;"
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
            <Products :products="related_products"></Products>
          </ul>
        </div>
      </div>
    </div>

    <!-- End Brand Carousel -->

    <Cart :show_cart="cart_show" />
  </main>
</template>

<script>
import Products from "../components/products.vue";
import Cart from "../components/Cart";
// import ProductZoomer from "vue-product-zoomer";
// Vue.use(ProductZoomer)

export default {
  name: "single-product",
  created() {
    this.$store.dispatch("product", this.$route.params.slug);
    window.scroll(0, 0);
        window.addEventListener("click", this.handleBodyClick);

  },
  data() {
    return {
      qty: 1,
      variant_id: "",
      cart_show: false,
      loading: true,
    };
  },
  methods: {
    qtyChange(type) {
      if (parseInt(this.product.stock) <= 0) {
        this.$toast.open({
          message: `${this.product.name} - Stock Out`,
          type: "warning",
          position: "bottom",
          duration: 3000,
        });
        this.qty = this.product.stock;
        return;
      }

      if (type < 0) {
        this.qty -= 1;
      } else {
        this.qty += 1;
      }
    },
    add_to_cart($event, product, qty, variant_id) {
      this.$add_to_cart($event, product, qty, variant_id,true);
      this.cart_show = !this.cart_show;
    },
    changePreview(e) {
      document.getElementById("__single_product_image").src = e.target.src;
    },
    handleBodyClick(e){
      
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
    }
  },
  watch: {
    qty: function (value) {
      if (value <= parseInt(0)) {
        this.$toast.open({
          message: `Quantity Can Not Be Smaller Than 1`,
          type: "warning",
          position: "bottom",
          duration: 3000,
        });
        this.qty = 1;
        return;
      }

      if (parseInt(value) > parseInt(this.product.stock)) {
        this.$toast.open({
          message: `Maximum Quantity ${this.product.stock}`,
          type: "warning",
          position: "bottom",
          duration: 3000,
        });
        this.qty = this.product.stock;
        return;
      }
    },
    product: function (value) {
      if (Object.keys(value).length <= 0) {
        this.loading = false;
      } else {
        this.loading = true;
      }
    },
  },
  computed: {
    product() {
      return this.$store.state.product;
    },

    related_products() {
      return this.$store.state.related_products;
    },
    variants() {
      return this.$store.state.variants;
    },
  },
  components: {
    Products,
    Cart,
  },
};
</script>