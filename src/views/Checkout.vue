
<template>
  <main id="content" role="main" class="checkout-page height">
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
            <router-link to="/">Home</router-link>
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
          <div class="row">
            <div class="col-md-7">
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
                        autocomplete="off"
                        ref="name"
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
                        id="mobile"
                        v-model="form.mobile_number"
                        data-error-class="u-has-error"
                        data-success-class="u-has-success"
                        autocomplete="off"
                        ref="mobile"
                      />
                    </div>

                    <div class="col-md-12">
                      <!-- Input -->
                      <div class="js-form-message mt-3 mb-6">
                        <label class="form-label">
                          Select City
                          <span class="text-danger">*</span>
                        </label>

                        <select
                          class="form-control"
                          id="area"
                          data-style="btn-sm bg-white font-weight-normal py-2 border"
                          name="areaCheck"
                          v-model="form.city"
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
                    <div class="col-md-12" v-if="form.city">
                      <!-- Input -->
                      <div class="js-form-message mt-3 mb-6">
                        <label class="form-label">
                          Select Sub City
                          <span class="text-danger">*</span>
                        </label>

                        <select
                          class="form-control"
                          data-style="btn-sm bg-white font-weight-normal py-2 border"
                          v-model="form.sub_city"
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
                          ref="address"
                        />
                      </div>
                      <!-- End Input -->
                    </div>
                  </div>
                  <!-- End Billing Form -->

                  <!-- Input -->
                  <div class="col-md-12 mb-6">
                    <label class="form-label"> Order notes (optional) </label>

                    <div class="input-group">
                      <textarea
                        class="form-control p-5"
                        rows="4"
                        name="ordernotes"
                      >
                      </textarea>
                    </div>
                  </div>
                  <!-- End Input -->
                </div>
              </div>
            </div>

            <div class="col-md-5">
              <div class="pl-lg-3">
                <div class="bg-gray-1 rounded-lg">
                  <div class="mb-4 checkout-table">
                    <div class="border-bottom border-color-1 mb-5">
                      <h3 class="section-title mb-0 pb-2 font-size-25">
                        Your order
                      </h3>
                    </div>

                    <table class="table">
                      <thead>
                        <tr>
                          <th class="product-name">Product</th>
                          <th class="product-total">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="cart_item"
                          v-for="(item, idx) in cart.cart_content.cart"
                          :key="idx"
                        >
                          <td>
                            <div class="row">
                              <div class="col-md-3">
                                <img
                                  :src="$imageBaseUrl + item.product_image"
                                  alt=""
                                  width="50"
                                />
                              </div>

                              <div class="col-md-9 pl-3">
                                <span
                                  >{{ item.product_name }}
                                  <strong class="product-quantity"
                                    >{{ item.price }} ×
                                    {{ item.quantity }}</strong
                                  >
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span
                              >৳
                              {{
                                parseFloat(item.quantity) *
                                parseFloat(item.price)
                              }}</span
                            >
                            <br />
                            <!-- <span><b>Shipping:</b> ৳ {60}</span> -->
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Subtotal</th>
                          <td class="width-40">
                            ৳
                            <span id="subtotal">
                              {{ cart ? cart.cart_total : 0 }}</span
                            >
                          </td>
                        </tr>
                        <tr>
                          <th>Total Shipping</th>

                          <td class="width-40">
                            <span id="msg" style="float: left"></span>
                            <span>৳ </span
                            ><span id="shipping">{{ form.shipping_cost }}</span>
                          </td>
                        </tr>
                        <tr>
                          <th>Total</th>
                          <td class="width-40">
                            <strong
                              >৳
                              <span id="final">{{
                                parseFloat(form.total) +
                                parseFloat(form.shipping_cost)
                              }}</span></strong
                            >
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <!-- End Product Content -->

                    <div
                      class="
                        form-group
                        d-flex
                        align-items-center
                        justify-content-between
                        mb-5
                        mt-3
                      "
                    >
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="terms"
                          checked
                        />
                        <label
                          class="form-check-label form-label"
                          for="defaultCheck10"
                        >
                          I have read and agree to the website
                          <a href="/return-refund-policy"
                            >terms and conditions
                          </a>
                          <span class="text-danger">*</span>
                        </label>
                      </div>
                    </div>

                    <div class="col d-flex justify-content-center">
                      <button
                        type="submit"
                        name="placeOrder"
                        value="placeOrder"
                        class="btn btn-primary btn-sm ml-3"
                        id="submit"
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

                    <!-- End Order Summary -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
<script>
import { Form } from "vform";

export default {
  data() {
    return {
      form: new Form({
        name: "",
        mobile_number: "",
        address: "",
        shipping_cost: "00",
        total: "",
        discount: "",
        city: "",
        sub_city: "",
        user_id: "",
      }),
      cities: "",
      sub_cities: "",
      loading: true,
    };
  },
  created() {
    this.user();
    this.getCity();
    this.$store.dispatch("cart");
    console.log(localStorage.getItem("user_token"));
    console.log("user tojken");
  },
  methods: {
    user() {
      this.$axios
        .get("user", {
          headers: this.$apiHeader,
          params: {
            user_token: localStorage.getItem("user_token"),
          },
        })
        .then((resp) => {
          let user = resp.data.user;

          this.form.name = user.name;
          this.form.mobile_number = user.mobile_no;
          this.form.address = user.address;
          this.form.user_id = user.id;
        });
    },
    getCity() {
      this.$axios
        .get("city", {
          headers: this.$apiHeader,
        })
        .then((resp) => {
          this.cities = resp.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    subCity() {
      if (this.form.city) {
        let city = this.cities.find((ele) => ele.id == this.form.city);
        this.form.shipping_cost = city.delivery_charge;

        this.$axios.get("sub/city/" + this.form.city).then((resp) => {
          if (resp.data.length) {
            if (this.sub_cities.length > 0) {
              this.sub_cities = "";
            }
            if (this.form.sub_city) {
              this.form.sub_city = "";
            }
            this.sub_cities = resp.data;
          } else {
            this.form.sub_city = "";
            this.sub_cities = "";
            this.$toast.open({
              message: "No SUb City Found On Select City",
              type: "info",
              position: "bottom",
              duration: 4000,
            });
          }
        });
      }
    },
    checkout() {
      if (this.validation() == false) {
         this.form.post("checkout")
         .then((resp) => {
          console.log(resp);
          if (resp.data.status == "SUCCESS") {
            this.$toast.open({
              message: `${resp.data.message}`,
              type: "success",
              position: "top-center",
              duration: 4000,
            });
            this.$store.dispatch("cart");
            this.$router.push({ name: "order" });
          }
        });
      }
    },
    validation() {
      const form = this.form;
      if (form.mobile_number.length != 11) {
        this.$refs.mobile.focus();

        this.valiadtionMessage("Mobile Number Must Be 11 Digits");
        return true;
      }
      if (form.name.length <= 0) {
        this.$refs.name.focus();

        this.valiadtionMessage("Name Can Not Be Empty");
        return true;
      }
      if (!form.city) {
        this.$refs.city.focus();

        this.valiadtionMessage("Please Select A City");
        return true;
      }

      if (!form.sub_city) {
        this.$refs.sub_city.focus();

        this.valiadtionMessage("Please Select A Sub City");
        return true;
      }
      if (form.address.length <= 0) {
        this.$refs.address.focus();

        this.valiadtionMessage("Address Can Not Be Empty");
        return true;
      }

      return false;
    },
    valiadtionMessage(message) {
      this.$toast.open({
        message: message,
        type: "warning",
        position: "bottom",
        duration: 3000,
      });
    },
  },

  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
  watch: {
    loading: function (value) {
      if (value == false) {
        this.form.total = this.$store.state.cart.cart_total;
      }
    },
  },
};
</script>