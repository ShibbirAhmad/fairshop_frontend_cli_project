<template>
  <main id="content" role="main" class="height">
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
            <a href="#">Search</a>
          </li>

          <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
            <a href="#">{{ $route.params.search }}</a>
          </li>
        </ol>
      </nav>
    </div>
    <div class="container">


            <products :products="products"></products>
    </div>
  </main>
</template>

<script>
import Products from "../components/products.vue";

export default {
  mounted(){
    this.searchProducts();
  },
  data() {
    return {
      products: '',
    };
  },
  methods: {
    async searchProducts() {

        await this.$axios
          .get("search/product/" + this.$route.params.search, {
            headers: this.$apiHeader,
          })
          .then((resp) => {
           console.log(resp);
            if (resp.data.success == true) {
              this.products = resp.data.products;
            }
          })
          .catch((error) => {
            this.$toastr.e(error.response.data.message);
          });

    },
  },

  components:{
    Products
  }

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