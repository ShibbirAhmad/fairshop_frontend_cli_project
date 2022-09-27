<template>
  <main id="content" role="main" class="cart-page height">
    <!-- breadcrumb -->

    <!-- End breadcrumb -->

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
        </ol>
      </nav>

      <div class="mb-10" v-if="Object.keys(cart).length <= 0">
        <div class="row justify-content-center">
          <div class="col-lg-12 text-center">
            <div class="spinner-border text-primary" role="status"></div>
          </div>
        </div>
      </div>

      <div class="mb-10" v-else>
        <div id="cartForm" v-if="cart.item_count > 0">
          <table class="table" cellspacing="0">
            <thead class="cart_t_head">
              <tr>
                <th class="product-remove">&nbsp;</th>
                <th class="product-thumbnail">&nbsp;</th>
                <th class="product-name">Product</th>
                <th class="product-price">Price</th>
                <th class="product-quantity w-lg-15">Quantity</th>
                <th class="product-subtotal">Total</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, idx) in cart.contents"
                :key="idx"
                class="cart_row"
              >
                <td class="text-center">
                  <a
                    @click.prevent="remove_cart_item(item.id)"
                    style="cursor: pointer"
                    class="text-gray-32 font-size-26 cart_remover"
                    >×</a
                  >
                </td>
                <td class="d-md-table-cell">
                  <a
                    ><img
                      class="
                        cart_image
                        max-width-100
                        p-1
                        border border-color-1
                        __cart_img
                      "
                      :src="$imageBaseUrl2 + item.product.thumbnail_img"
                      alt="Image Description"
                  /></a>
                </td>

                <td data-title="Product" style="max-width: 30rem">
                  <a class="text-gray-90">{{ item.product.name }}</a>
                </td>

                <td data-title="Price">
                  <span id="">{{ item.product.sale_price }} ৳</span>
                </td>
                <td data-title="Quantity" class="__qty_cart_product">
                  <span class="sr-only">Quantity</span>
                  <a
                    type="button"
                    style="border-radius: 5px"
                    @click.prevent="updateQuantity(item, 0)"
                  >
                    <small class="fa fa-minus"></small>
                  </a>
                  <span>{{ item.qty }}</span>
                  <a
                    type="button"
                    style="border-radius: 5px"
                    @click.prevent="updateQuantity(item, 1)"
                  >
                    <small class="fa fa-plus"></small>
                  </a>
                </td>

                <td data-title="Total">
                  <span id="">{{
                    parseFloat(item.product.sale_price) * parseFloat(item.qty)
                  }}</span>
                  <span>৳</span>
                </td>
              </tr>
            </tbody>

            <tr>
              <td
                colspan="6"
                class="border-top space-top-2 justify-content-center"
              >
                <div class="pt-md-3">
                  <div class="d-block d-md-flex flex-center-between">
                    <div class="mb-3 mb-md-0 w-xl-40">
                      <!-- End Apply coupon Form -->
                    </div>

                    <div class="d-md-flex">
                      <div
                        style="
                          margin-top: -3%;
                          position: absolute;
                          margin-left: 1%;
                        "
                      >
                        <b> <span>total: </span></b>
                        <span style="margin-left: 2em; display: inline-block">
                          ৳
                          <span id="st">
                            {{ cart ? cart.cart_total : 0 }}
                          </span> </span
                        ><span>৳</span>
                      </div>

                      <router-link
                        :to="{ name: 'checkout' }"
                        class="
                          btn btn-primary-dark-w
                          px-5 px-md-4 px-lg-5
                          mt-5
                          ml-4
                          d-md-inline-block
                        "
                      >
                        Proceed to checkout
                      </router-link>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div id="emptyCart" v-else>
          <div class="row">
            <div class="col-lg-12 text-center">
              <div class="empty-box">
                <img :src="$imageBaseUrl + 'emptycart.png'" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("cart");
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
  methods: {
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
      if (type == 1) {
        item.qty = parseInt(item.qty) + 1;
      } else {
        item.qty = parseInt(item.qty) - 1;
      }
      if (parseInt(item.qty) <= 0) {
        this.$toastr.e("Quantity should be at least one");
        item.qty = 1;
        return;
      }

      await this.$axios
        .post("cart/item/update", {
          header: this.$apiHeader,
          qty: item.qty,
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


  },
};
</script>

<style scoped>
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
</style>