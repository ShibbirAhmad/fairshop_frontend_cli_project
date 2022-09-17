<template>
  <transition
    enter-active-class="animate__animated animate__fadeInRight"
    leave-active-class="animate__animated animate__fadeOutRight"
  >
    <div class="__cart" id="__cart" v-show="show_cart">
      <div class="__cart_header d-flex">
        <img @click="hideCart" style="cursor:pointer;margin-right:5px"
          src="../../assets/images/close_sign.png"
          width="30px" height="30"
        />
        <h5>My Cart</h5>
        <i class="fa fa-close pointer" @click="hideCart"></i>
      </div>
      <div class="__cartcart_body">
        <ul class="__cart-product-list" v-if="cart.item_count > 0">
          <li
            class="d-flex"
            v-for="(item, idx) in cart.contents"
            :key="idx"
          >
            <router-link
              :to="{
                name: 'single_product',
                params: { slug: item.product.slug },
              }"
            >
              <img :src="$imageBaseUrl2 + item.product.thumbnail_img" />
            </router-link>
            <div class="__cart_product_desc">
              <h6>
                <router-link
                  :to="{
                    name: 'single_product',
                    params: { slug: item.product.slug },
                  }"
                >
                  <strong>{{ item.product.name }}  </strong>
                </router-link>
              </h6>
              <span>{{ item.qty }} X {{ item.product.price }} ৳</span>
            </div>
            <i style="cursor:pointer"
              class="fa fa-close sideCartClose"
              @click="remove_cart_item(item.id)"
            ></i>
          </li>
        </ul>
        <ul
          v-else
          class="list-unstyled products-group"
          id="cartItem"
          style="margin-right: 5px"
        >
          <span id="li433"></span>
          <p style="text-align: center">
            <img
              class="img-fluid"
              src="../../assets/images/empty_cart.png"
              alt="Empty Cart"
              max-width="250px"
              style="margin-top: 80px"
            />
          </p>
        </ul>
      </div>

      <div class="__cart_sub_total">
        Sub Total: ৳ {{ cart ? cart.cart_total : 0 }}
      </div>
      <div class="__cart__footer">
        <router-link :to="{ name: 'cart' }" class="btn btn-primary cart">
          View Cart
        </router-link>

        <router-link :to="{ name: 'checkout' }" class="btn btn-primary">
          Checkout
        </router-link>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "cart",
  props: ["show_cart"],
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
  methods: {

    hideCart() {
      this.show_cart = false;
      this.$emit("update:show:cart");
    },

    remove_cart_item(id) {
      if (confirm("Are You Sure ? Remove This Item !!")) {
        this.$axios
          .post("cart/item/remove", {
            headers: this.$apiHeader,
            id: id,
          })
          .then((resp) => {
            if (resp.data.success == true) {
              this.$toast.open({
                message: resp.data.message,
                type: "info",
                position: "bottom",
                duration: 4000,
              });
              this.$store.dispatch("cart");
            }
          });
      }
    },
  },
};
</script>