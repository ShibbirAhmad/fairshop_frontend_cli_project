<template>
  <div class="row" v-if="products.length > 0">

         <h3 class="section-title section-title__full mb-0 pb-2 font-size-22">
          Trendy Products
        </h3>
      <div class=" feature_product_row">
        <carousel
            :nav="false"
            :autoplay="true"
            :items="5"
            :autoplayTimeout="3000"
             v-if="products.length>0"
             :responsive="{ 0: { items: 2 }, 600: { items: 5 } }"
            >
        <div
          v-for="(product, fpdx) in products"
          :key="fpdx"
          class="feature-col "
        >
          <router-link
            :to="{
              name: 'single_product',
              params: { slug: product.slug },
            }"
          >
            <img :src="$imageBaseUrl2 + product.thumbnail_img" :alt="product.name" />
            <div class="title-img">
              <span> {{ product.name.substring(0,15) }} </span>
                <span v-if="product.name.length > 15"> ... </span>
            </div>
          </router-link>
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
    this.getNewProducts();
  },
  components:{
    carousel
  },
  data() {
    return {
      products: "",
    };
  },
  methods: {
    getNewProducts() {
      this.$axios
        .get('/new/arrival/product')
        .then((resp) => {
         console.log(resp);
          if (resp.data.success == true) {
            this.products = resp.data.products;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>