<template>
  <main id="content" role="main" class="checkout-page height">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol
          class="breadcrumb flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble"
        >
          <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
            <router-link to="/">Home</router-link>
          </li>

          <li>
              <img class="custom_angle_right_icon" src="../../assets/images/product_details_angle_right_icon.png" alt="">
          </li>


          <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
            <a href="#">Checkout</a>
          </li>
        </ol>
      </nav>

      <div class="row justify-content-center" v-if="loading">
        <div class="col-lg-12 text-center">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
      </div>
      <div v-else>
        <div
          class="row justify-content-center mb-4"
          v-if="cart.item_count <= 0"
        >
          <div class="col-lg-6 text-center mb-4">
            <div class="empty-box bg-white shadow-lg round">
              <div>
                <img :src="$imageBaseUrl + 'emptycart.png'" alt="" />
              </div>

              <router-link
                to="/shop"
                style="margin-top: -50px"
                class="btn btn-primary"
                >Go To The Shop
              </router-link>
            </div>
          </div>
        </div>
        <form v-else method="post" @submit.prevent="checkout" name="order">
          <!-- user information form and product details -->
          <div class="row" style="justify-content: space-between;">
            <div class="col-md-12 col-lg-5">
              <div class="pb-7">
                <!-- Title -->
                <div class="border-bottom border-color-1 mb-5">
                  <h3 class="section-title mb-0 pb-2 font-size-25">
                    Billing details
                  </h3>
                </div>
                <!-- End Title -->

                <!-- Billing Form -->
                <div class="row">
                  <div class="col-md-12">
                    <!-- Input -->
                    <div class="js-form-message mb-6">
                      <label class="form-label">
                        Customer name
                        <span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="name"
                        v-model="form.name"
                        placeholder="Customer Name"
                      />
                    </div>
                    <!-- End Input -->
                  </div>

                  <div class="w-100"></div>

                  <div class="col-md-12">
                    <!-- Input -->
                    <label class="form-label">
                      Phone
                      <span class="text-danger">*</span>
                      <span id="message" class="text-danger"> </span>
                    </label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span
                          class="input-group-text"
                          style="font-size: 0.875rem; padding: 0.6rem"
                        >
                          +88
                        </span>
                      </div>

                      <input
                        type="text"
                        class="form-control"
                        name="phone"
                        placeholder="Mobile Number"
                        v-model="form.customer_phone"
                        data-error-class="u-has-error"
                        data-success-class="u-has-success"
                        minlength="11"
                        maxlength="11"
                      />
                    </div>

                    <!-- city -->
                    <div class="col-md-12">
                      <!-- Input -->
                      <div class="js-form-message mt-3 mb-6">
                        <label class="form-label">
                          Select City (Zilla)
                          <span class="text-danger">*</span>
                        </label>

                        <select
                          class="form-control"
                          id="area"
                          data-style="btn-sm bg-white font-weight-normal py-2 border"
                          name="areaCheck"
                          v-model="form.city_id"
                          @change="subCity"
                          ref="city"
                        >
                          <option selected disabled value="">
                            Select City
                          </option>
                          <option
                            v-for="(city, cdx) in cities"
                            :key="cdx"
                            :value="city.id"
                          >
                            {{ city.name }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <!-- post office -->
                    <div class="col-md-12" v-if="form.city_id">
                      <!-- Input -->
                      <div class="js-form-message mt-3 mb-6">
                        <label class="form-label">
                          Select Sub City (Thana)
                          <span class="text-danger">*</span>
                        </label>

                        <select
                          class="form-control"
                          data-style="btn-sm bg-white font-weight-normal py-2 border"
                          v-model="form.sub_city_id"
                          ref="sub_city"
                        >
                          <option selected disabled value="">
                            Select Sub City
                          </option>
                          <option
                            v-for="(sub_city, scdx) in sub_cities"
                            :key="scdx"
                            :value="sub_city.id"
                          >
                            {{ sub_city.name }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <!-- address -->
                    <div class="col-md-12">
                      <!-- Input -->
                      <div class="js-form-message mb-6">
                        <label class="form-label">
                          Address
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="address"
                          placeholder="Address"
                          v-model="form.address"
                          required
                        />
                      </div>
                      <!-- End Input -->
                    </div>
                  </div>
                  <!-- End Billing Form -->
                </div>
              </div>
            </div>

            <div class="col-md-12 col-lg-6">
              <div class="pl-lg-3">
                <div class="bg-gray-1 rounded-lg">
                  <div class="mb-4 checkout-table padding_checkout-info">
                    <div class="border-bottom border-color-1 mb-5">
                      <h3 class="section-title mb-0 pb-2 font-size-25">
                        Your order
                      </h3>
                    </div>

                    <div>
                      <!-- head title -->
                      <div
                        class="row"
                        style="
                          align-items: center;
                          justify-content: space-between;
                          flex-wrap: nowrap;
                          text-align: left;
                          background-color: #e2e8f0;
                          padding: 0 6px;
                        "
                      >
                        <div class="col-md-3 text_Header">Products</div>
                        <div class="col-md-2 text_Header">Quantity</div>
                        <div class="col-md-2 text_Header">Price</div>
                        <div class="col-md-1 text_Header">Action</div>
                        <div
                          class="col-md-2 text_Header"
                          style="text-align: end"
                        >
                          Total
                        </div>
                      </div>

                      <!-- dynamic product information -->
                      <div
                        class="cart_item"
                        v-for="(item, idx) in cart.contents"
                        :key="idx"
                      >
                        <div
                          style="
                            width: 100%;
                            border-bottom: solid 1px #64748b;
                            margin: 6px;
                          "
                        >
                          <div
                            class="row checkout_info"
                          >
                            <!-- image and title -->
                            <div class="col-md-4">
                              <img
                                :src="
                                  $imageBaseUrl2 + item.product.thumbnail_img
                                "
                                width="50"
                              />
                              <h4 class="product_name">
                                <span
                                  >{{ item.product.name.substring(0, 18)
                                  }}<span v-if="item.product.name.length > 18">
                                    ...
                                  </span>
                                </span>
                              </h4>
                            </div>

                            <!-- quantity -->
                            <div class="col-md-2" >
                              <div class="quantity_counter-checkout">
                                <div class="in_dic_btn-checkout">
                                  <a
                                    type="button"
                                    @click.prevent="updateQuantity(item, 1)"
                                    >+</a
                                  >
                                </div>
                                <div class="quantity_input-checkout">
                                  <p>{{ item.qty }}</p>
                                </div>
                                <div class="in_dic_btn-checkout">
                                  <a
                                    type="button"
                                    @click.prevent="updateQuantity(item, 0)"
                                    >-</a
                                  >
                                </div>
                              </div>
                            </div>

                            <!-- product price X quantity -->
                            <div class="col-md-3 pl-3 padding_none">
                              <strong class="product-quantity"
                                >{{ item.product.sale_price }} ×
                                {{ item.qty }}</strong
                              >
                            </div>

                            <!-- action -->
                            <div
                              class="col-md-1 delete_icon"
                              @click="remove_cart_item(item)"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="red"
                                class="icon_size"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </div>

                            <!-- total price -->
                            <div
                              class="col-md-2"

                            >
                              <span
                                >৳
                                {{
                                  parseFloat(item.qty) *
                                  parseFloat(item.product.sale_price)
                                }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- total subtotal -->
                      <div>
                        <!-- sub total -->
                        <div class="sub_total">
                          <div>Subtotal</div>
                          <div>
                            ৳
                            <span id="subtotal">
                              {{ cart ? cart.cart_total : 0 }}</span
                            >
                          </div>
                        </div>
                        <!-- delivery charge -->
                        <div class="sub_total">
                          <div>Shipping Charge</div>

                          <div>
                            <span id="msg" style="float: left"></span>
                            <span>৳ </span
                            ><span id="shipping">{{ form.shipping_cost }}</span>
                          </div>
                        </div>
                        <!-- total -->
                        <div class="sub_total">
                          <div>Payable Amount</div>
                          <div>
                            <strong
                              >৳
                              <span id="final">{{
                                (parseInt(cart.cart_total) + parseInt(form.shipping_cost))
                              }}</span></strong
                            >
                          </div>
                        </div>

                         <div
                            class="form-group d-flex align-items-center justify-content-between mb-5 mt-3"
                          >
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="terms"
                                checked
                              />
                              <label class="form-check-label form-label" for="defaultCheck10">
                                I have read and agree to the website
                                <a href="/term/condition">terms and conditions </a>
                                <span class="text-danger">*</span>
                              </label>
                            </div>
                          </div>

                          <div class="col d-flex justify-content-center">
                            <button
                              type="submit"
                              class="btn btn-primary place_order_btn"
                              :disabled="form.busy"
                            >
                              <div
                                v-if="form.busy"
                                class="spinner-border text-primary text-white"
                                role="status"
                              ></div>
                              <span v-else> Place order </span>
                            </button>
                          </div>

                      </div>
                    </div>
                    <!-- End Order Summary -->
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- place order btn and terms and conditions -->
          <div class="place_order-container">

          </div>
        </form>



      </div>
    </div>
  </main>
</template>
<script>
import Vue from "vue";
import { Form } from "vform";
import ObjectToFD from "vue-object-to-formdata";
Vue.use(ObjectToFD);
export default {
  data() {
    return {
      form: new Form({
        name: "",
        customer_phone: "",
        address: "",
        shipping_cost: 0,
        total: 0,
        discount: 0,
        coupon_discount: 0,
        city_id: "",
        sub_city_id: "",
      }),
      cities: "",
      sub_cities: "",
      loading: true,

    };
  },
  created() {
    window.scrollTo(0, 0);
    this.getCities();
    this.$store.dispatch("cart");
    this.getCartData();
  },
  methods: {
    async checkout() {
      if (this.validation() == false) {
        await this.form
          .post("checkout/order", this.$objectToFD(this.form), {
            headers: this.$apiHeader,
          })
          .then((resp) => {
            // console.log(resp);
            if (resp.data.success == true) {
              this.$toastr.s(resp.data.message);
              this.$store.dispatch("cart");
              this.$router.push({ name: "order_success" });
            }
          })
          .catch((error) => {
            this.$toastr.e(error.response.data.message);
          });
      }
    },


    validation() {
      const form = this.form;
      if (form.customer_phone.length != 11) {
        this.$refs.mobile.focus();

        this.validationMessage("Mobile Number Must Be 11 Digits");
        return true;
      }
      if (form.name.length <= 0) {
        this.$refs.name.focus();

        this.validationMessage("Name Can Not Be Empty");
        return true;
      }
      if (!form.city_id) {
        this.$refs.city.focus();

        this.validationMessage("Please Select A City");
        return true;
      }

      if (!form.sub_city_id) {
        this.$refs.sub_city.focus();

        this.validationMessage("Please Select A Sub City");
        return true;
      }
      if (form.address.length <= 0) {
        this.$refs.address.focus();

        this.validationMessage("Address Can Not Be Empty");
        return true;
      }

      return false;
    },
    validationMessage(message) {
      this.$toast.open({
        message: message,
        type: "warning",
        position: "bottom",
        duration: 3000,
      });
    },

    getCities() {
      this.$axios
        .get("get/cities", {
          headers: this.$apiHeader,
        })
        .then((resp) => {
          this.cities = resp.data.cities;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    subCity() {
      if (this.form.city_id) {
        let city = this.cities.find((ele) => ele.id == this.form.city_id);
        this.form.shipping_cost = city.delivery_charge;

        this.$axios
          .get("get/city-wise/sub-cities/" + this.form.city_id)
          .then((resp) => {
            //   console.log(resp);
            if (resp.data.sub_cities.length) {
              if (this.sub_cities.length > 0) {
                this.sub_cities = "";
              }
              if (this.form.sub_city_id) {
                this.form.sub_city_id = "";
              }
              this.sub_cities = resp.data.sub_cities;
            } else {
              this.form.sub_city_id = "";
              this.sub_cities = "";
              this.$toast.open({
                message: "No sub-city found  of selected city",
                type: "info",
                position: "bottom",
                duration: 4000,
              });
            }
          });
      }
    },

    async remove_cart_item(id) {
      await this.$axios
        .post("cart/item/remove", {
          headers: this.$apiHeader,
          id: id,
        })
        .then((resp) => {
          //  console.log(resp);
          if (resp.data.success == true) {
            this.$toastr.s(resp.data.message);
            this.$store.dispatch("cart");
          }
        })
        .catch((error) => {
          this.$toastr.e(error.response.data.message);
        });
    },

    async updateQuantity(item, type) {
      let quantity = 0 ;
      if (type == 1) {
        quantity = parseInt(item.qty) +  parseInt(1)  ;
      } else {
         quantity = parseInt(item.qty) - parseInt(1) ;
      }
      if (parseInt(quantity) <= 0) {
        this.$toastr.e("Quantity should be at least one");
        quantity = 1;
        return;
      }

      await this.$axios
        .post("cart/item/update", {
          header: this.$apiHeader,
          qty: quantity,
          id: item.id,
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
    },

    getCartData() {
      this.$axios.get("/get/cart/content").then((resp) => {
        console.log(resp);
        this.form.total = resp.data.total;
      });
    },


  },

  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
  mounted() {
    setTimeout(() => {
      this.selectCity();
    }, 1000);
    this.$store.dispatch("cart");
  },
};
</script>

<style scoped>
.breadcrumb-item + .breadcrumb-item::before {
  display: inline-block;
  padding-right: 1rem;
  color: #333e48;
  content: ">";
  padding-right: 5px;
}
.breadcrumb-item + .breadcrumb-item a {
  background-color: transparent;
  border-radius: 0.313rem;
  margin-top: 3px;
}
.breadcrumb-item + .breadcrumb-item {
  padding-left: 5px;
}
</style>
