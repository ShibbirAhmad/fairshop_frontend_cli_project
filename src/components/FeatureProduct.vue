<template>
  <div class="row" v-if="FeatureProduct.length > 0">

         <h3 class="section-title section-title__full mb-0 pb-2 font-size-22">
          Feature Products
        </h3>
      <div class=" feature_product_row">
        <carousel
            :nav="false"
            :autoplay="true"
            :items="5"
            :autoplayTimeout="3000"
             v-if="FeatureProduct.length>0"
             :responsive="{ 0: { items: 2 }, 600: { items: 5 } }"
            >
        <div
          v-for="(product, fpdx) in FeatureProduct"
          :key="fpdx"
          class="feature-col "
        >
        <a :href="'/product/' + product.slug"> 
          <img :src="$imageBaseUrl2 + product.thumnail" :alt="product.name" />
            <div class="title-img">
              <span> {{ product.name.substring(0,15) }} </span>
                <span v-if="product.name.length > 15"> ... </span>
            </div>
          </a>
        </div>

       </carousel>
      </div>
<br>
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
        .get("feature/product/s", {
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