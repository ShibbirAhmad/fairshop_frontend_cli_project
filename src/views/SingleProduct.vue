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
              overflow-auto overflow-xl-visible
            "
          >
            <li class="breadcrumb-item ">
              <a href="/">Home</a>
            </li>

            
            <li class="breadcrumb-item ">
              <a href="#">{{ product.name}}</a>
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
          <div class="col-md-5 mb-5 mb-md-0">
            <!-- <img
              v-if="product.product_image.length > 0"
              :src="$imageBaseUrl + product.product_image[0].product_image"
              class="single_product_image"
              id="__single_product_image"
            /> -->
           <image-zoom v-if="zooming_img.length"
                    :regular="zooming_img"
                    img-class="single_product_image"
                    >
             </image-zoom>

            <div
              class="thumnail_img-box"
              v-if="product.product_image.length > 0"
            >
              <img
                v-for="(image, imgdx) in product.product_image"
                :class="{__active_border :imgdx==0}"
                :key="imgdx"
                :src="$imageBaseUrl + image.product_image"
                @click="displayeImageFromBox"
              />
            </div>


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
                      ৳<span id="oprice">{{ product.discount_price }}</span>
                    </ins>
                    <del

                      class="font-size-20 ml-2 text-gray-6"
                    >
                      ৳{{ product.regular_price }}
                    </del>

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

                <div  class="addtobtn  align-items-end mb-3">

                  <div class=" max-width-300 mb-4 mb-md-0">

                    <div class="row">
                      <div class="col-md-6 col-xs-6">
                          <h4 for="quantity">Quantity</h4>
                      </div>
                      <div class="col-xl-6 col-md-6 col-xs-6">
                    <!-- Quantity -->
                    <div class="qntt rounded-pill py-2 px-3 border-color-1">
                      <div class="js-quantity row align-items-center">
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
                        </div>
                        <div class="qnttInput col ml-2">
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
                    </div>

                  </div>
                  <br>
                  <div class="ml-md-3" id="tocart">

                   <div style="display:flex" class="cart_buy_container">
                      <button style="background:#3645d3"
                        @click.prevent="
                          buyNow($event, product, qty, variant_id)
                        "
                        class="adtocrtphn mr-2 btn px-5 btn-primary-dark"
                      >
                        <i class="ec ec-add-to-cart font-size-20"></i>
                        Buy Now
                      </button>

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



            <div>

            <div class="order_now_container">
              <p>
                <i class="fa fa-check"></i> Order today and receive it within 02
                - 05 days
              </p>
              <p> <i class="fa fa-check"></i> 130 টাকা অগ্রিম পেমেন্ট করতে হবে (ঢাকার বাহিরের কাস্টমারদের জন্য ) </p>
            </div>

            <div class="call_now_container">
              <p>Have question about this product ? please call</p>
              <h4>
                <a href="tel:01762424333"
                  ><i class="fa fa-phone"></i> 01762424333
                </a>
            </h4>
            <h4>
                <a href="tel:01723669292"
                  ><i class="fa fa-phone"></i> 01723669292
                </a> <sup style="font-size:12px;border:1px dashed #199eff;padding:2px">Bkash Merchant</sup>
            </h4>

            </div>
          </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5 bg-white p-5 shadow  product_details_row">
          <div class="col-md-12 mb-md-12 mb-lg-0" style="overflow: hidden">

             <div class="product-details-tabe">
                <ul v-if="product.video" class="details-tab-menu-list">
                      <li class="details-tab-menu-item"  @click="tab_content=1" :class="{'tab-menu-item-active':tab_content==1}">Video</li>
                      <li class="details-tab-menu-item"  @click="tab_content=2" :class="{'tab-menu-item-active':tab_content==2}">Description</li>
                      <li class="details-tab-menu-item" @click="tab_content=3" :class="{'tab-menu-item-active':tab_content==3}" >How To Buy</li>
                      <li class="details-tab-menu-item"  @click="tab_content=4" :class="{'tab-menu-item-active':tab_content==4}">Return Policy</li>
                 </ul>
                  <ul v-else class="details-tab-menu-list">
                      <li class="details-tab-menu-item"  @click="tab_content=1" :class="{'tab-menu-item-active':tab_content==1}">Description</li>
                      <li class="details-tab-menu-item" @click="tab_content=2" :class="{'tab-menu-item-active':tab_content==2}" >How To Buy</li>
                      <li class="details-tab-menu-item"  @click="tab_content=3" :class="{'tab-menu-item-active':tab_content==3}">Return Policy</li>
                 </ul>
                <div class="product-tab-content">
                  <div v-html="product.details" class="product-details" :class="{block:tab_content==1}"></div>
                  <div class="how-to-buy" :class="{block:tab_content==2}">
                    <ul>
                      <li class="h-b-li">Select number of product you want to buy.</li>
                      <li class="h-b-li">Click <strong>Add To Cart</strong> Button</li>
                      <li class="h-b-li">Then go to checkout page</li>
                      <li class="h-b-li">If you are a new user, please click on Sign Up.provide us your valid  information.</li>
                      <li class="h-b-li">Complete your checkout, we received your order, and for order confirmation or customer service contact with you</li>
                    </ul>
                  </div>
                  <div class="how-to-buy"  :class="{block:tab_content==3}">
                    <ul>
                      <li class="h-b-li"> After receiving the product you will be able to accept the modified product in case of any problem of the product (eg: product broken, torn, product not working, product does not match with the photo, etc.). In that case you have to e-mail support@fairshop.com.bd within maximum 48 hours after receiving the product or you have to inform us on our hotline number 880 1762424333. Note that you have to bear the cost of courier to replace any product as a result of your change of mind and fairshop.com.bd will bear the cost of any product by fairshop.com.bd.
                      </li>
                      <li class="h-b-li">
                          Let us know your - questions - comments - complaints - phone: 880 1762424333, e-mail: support@fairshop.com.bd
                      </li>
                    </ul>
                  </div>
                  <div v-if="product.video" v-html="product.video" class="product-details"  :class="{block:tab_content==1}">
                    {{product.video}}
                  </div>

                </div>
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
import imageZoom from 'vue-image-zoomer';
import InfiniteLoading from "vue-infinite-loading";

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
      tab_content:1,
      zooming_img:'',
      products:[],
      page:1,
    };
  },
  methods: {

  relatedProducts($state) {
      this.$axios
        .get(
          "related/products/" +
            this.$route.params.slug +
            "?page=" +
            this.page,
          {
            headers: this.$apiHeader,
          }
        )
        .then((resp) => {
          console.log(resp)
          if (resp.data.products.data.length > 0) {
            this.products.push(...resp.data.products.data);
            this.page += 1;
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },


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

      buyNow($event, product, qty, variant_id) {
       if (Object.keys(this.variants).length > 0 && variant_id.length=='') {
          this.$toast.open({
          message: `select product variant`,
          type: "info",
          position: "top",
          duration: 4000,
        });
        return;
       }
      this.$add_to_cart($event, product, qty, variant_id,true);
      this.$router.push({ path: '/checkout' })
    },

    add_to_cart($event, product, qty, variant_id) {
      this.$add_to_cart($event, product, qty, variant_id,true);
      this.cart_show = !this.cart_show;
    },

    displayeImageFromBox(e){
      let target_element = e.target;
      let active_images = document.getElementsByClassName("__active_border");

      if (active_images.length > 0) {
        for (let i = 0; i < active_images.length; i++) {
          active_images[i].classList.remove("__active_border");
        }
      }

         target_element.classList.add("__active_border");
         this.zooming_img=target_element.src

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
        if(value.product_image.length>0){
            this.zooming_img=this.$imageBaseUrl+value.product_image[0].product_image;
        }
      }
    },

  },
  computed: {
    product() {
      return this.$store.state.product;
    },


    variants() {
      return this.$store.state.variants;
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
    border-bottom: 4px solid #199EFF;
}
.product-tab-content {
    padding: 15px 15px;
    min-height: 250px;
}
.product-details{
    display: none;
}
.how-to-buy{
    display: none;
}
.block{
    display: block;
}
li.h-b-li {
    list-style-type: square;
    padding: 2px;

}

.__active_border {
  border: 1px solid #199eff ;
}


p{
  line-height: 1.0 !important;
}
.form-control {
  border-radius: 0% !important;
}

.breadcrumb-item+.breadcrumb-item::before {
    display: inline-block;
    padding-right: 1rem;
    color: #333e48;
    content: ">";
}
.breadcrumb-item+.breadcrumb-item a {
    background-color: transparent;
    border-radius: 0.313rem;
    margin-top: 3px;
}
.breadcrumb-item+.breadcrumb-item {
    padding-left: 5px;
}
.breadcrumb-item+.breadcrumb-item[data-v-63742c3d]::before {
    display: inline-block;
    padding-right: 5px;
    color: #333e48;
    content: ">";
}

.pr-5, .px-5{
  padding-right: 2.5rem !important;
}

</style>