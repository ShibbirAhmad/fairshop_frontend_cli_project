<template>
  <main id="content" role="main" class="height">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol
          class="breadcrumb flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble"
        >
          <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
            <a href="#">Shop</a>
          </li>
        </ol>
      </nav>

      <div class="row" v-if="categories.length > 0">
        <div
          class="col-6 col-md-2-custome"
          v-for="(category, rcdx) in categories"
          :key="rcdx"
        >
          <router-link
            :to="{
              name: 'categoryProducts',
              params: {
                slug: category.slug,
              },
            }"
          >
            <div class="box">
              <span class="box-txt">
                {{ category.name }}
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <div class="container overflow-hidden">
        <div
          class="d-flex justify-content-between border-bottom border-color-1 flex-lg-nowrap flex-wrap border-md-down-top-0 border-md-down-bottom-0 mt-2"
        >
          <h3 class="section-title section-title__full mb-0 pb-2 font-size-22">
            All products
          </h3>
        </div>

        <products :products="products"></products>
      </div>

      <InfiniteLoading @infinite="allProducts">
        <div slot="no-more"></div>
      </InfiniteLoading>
    </div>
  </main>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import products from "../components/products";
import Products from "../components/products.vue";
export default {
  name: "shop",
  data() {
    return {
      products: [],
      page: 1,
    };
  },
  methods: {
    allProducts($state) {
      this.$axios
        .get("all/products?page=" + this.page, {
          headers: this.$apiHeader,
        })
        .then((resp) => {
          console.log(resp)
          if (resp.data.data.length) {
            this.page += 1;
            this.products.push(...resp.data.data);

            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
  },
  components: {
    InfiniteLoading,
    products,
    Products,
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
};
</script>