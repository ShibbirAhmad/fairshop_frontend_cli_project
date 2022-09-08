
<script>
const Swal = require("sweetalert2");

export default {
  methods: {
    $discount_percent(product) {
      if (product.discount > 0) {
        let discount_amout =
          parseFloat(product.regular_price) -
          parseFloat(product.discount_price);
        let discount_percent =
          (parseFloat(discount_amout) / parseFloat(product.regular_price)) *
          parseFloat(100);
        return `-${discount_percent.toFixed(2)}%`;
      } else {
        return "";
      }
    },


    $add_to_cart(e, product, qty, variant_id, from_single_page) {
      let quantity = qty ? qty : 1;
      if (product.stock <= 0) {
        e.target.setAttribute("disabled", true);
        //  e.target.innerText = "Stock Out";
        this.$toast.open({
          message: `${product.name} - Stock Out`,
          type: "info",
          position: "top",
          duration: 4000,
        });
        return;
      }

      // e.target.innerText = "Adding.....";
      this.$axios
        .get("product/add/to/cart/" + product.id, {
          headers: this.$apiHeader,
          params: {
            quantity,
            variant_id,
          },
        })
        .then((resp) => {
          //     e.target.innerText = "Add to cart";
          if (resp.data.status == "SUCCESS") {
            if (from_single_page) {
              this.$toast.open({
                message: resp.data.message,
                type: "info",
                position: "top",
                duration: 4000,
              });
            } else {
              Swal.fire({
                title: resp.data.message,
                showCancelButton: false,
              });
            }
          } else {
            if (resp.data.variants.length > 0 && from_single_page != true) {
              let data = resp.data;
              this.ProductVariants(
                e,
                product,
                qty,
                data.variants,
                data.message
              );
            } else {
              this.$toast.open({
                message: resp.data.message,
                type: "error",
                position: "top",
                duration: 4000,
              });
            }
          }
          this.$store.dispatch("cart");
        });
    },

    ProductVariants(e, product, qty, variants, message) {
      let options = {};
      variants.forEach((variant) => {
        options[variant.id] = variant.name;
      });

      Swal.fire({
        title: message,
        input: "select",
        inputOptions: options,
        inputPlaceholder: "Select One",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          this.$add_to_cart(e, product, qty, result.value);
        }
      });

      console.log(e + product + qty);
    },
  },
};
</script>