<template>
  <div class="row" v-if="FeatureProduct.length > 0">
    <div class="col-md-12 mt-4 mb-4">
      <div
        class="d-flex justify-content-between border-bottom border-color-1 flex-lg-nowrap flex-wrap border-md-down-top-0 border-md-down-bottom-0 mb-3"
      >
        <h3 class="section-title section-title__full mb-0 pb-2 font-size-22">
          Feature Products
        </h3>
      </div>
      <div class="row feature_product_row">
        <carousel
            :nav="false"
            :autoplay="true"
            :items="5"
            :autoplayTimeout="2000"
             v-if="FeatureProduct.length>0"
             :responsive="{ 0: { items: 2 }, 600: { items: 5 } }"
            >
        <div
          v-for="(product, fpdx) in FeatureProduct"
          :key="fpdx"
          class="feature-col "
        >
          <router-link
            :to="{
              name: 'single_product',
              params: { slug: product.slug },
            }"
          >
            <img :src="$imageBaseUrl2 + product.thumnail" :alt="product.name" />
            <div class="title-img">
              <span> {{ product.name.substring(0,15) }} </span>
                <span v-if="product.name.length > 15"> ... </span>
            </div>
          </router-link>
        </div>

       </carousel>
      </div>
    </div>
  </div>
</template>
<script>
import carousel from "vue-owl-carousel";
export default {
  created() {
    this.getFeatureProducts();
  },
  components:{
    carousel
  },
  data() {
    return {
      FeatureProduct: "",
    };
  },
  methods: {
    getFeatureProducts() {
      this.$axios
        .get("feature/products", {
          headers: this.$apiHeader,
        })
        .then((resp) => {
         // console.log(resp);
          if (resp.data.featured_products) {
            this.FeatureProduct = resp.data.featured_products;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>