<template>
  <div>
    <div class="top_selling_product_area"  v-if="products.length > 0">
      <div class="">
          <div class="row">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding:0px">
                <div class="top_selling_product_area_title">
                    <h4>Trendy Products</h4>
                </div>
              </div>
          </div>
          <div class="row">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding:0px">
                  <carousel
                      :autoplay="true"
                      :nav="false"
                      v-if="products.length  > 0"
                      :responsive="{ 0: { items: 2 }, 600: { items: 4 }, 1000: { items: 5 }, 1366: { items: 6 } }"
                  >
                      <div class="top_selling_product_body" v-for="(item, index) in products" :key="index">
                          <div class="single-top_selling_product" >
                              <div class="top_selling_product_image">
                                     <a
                                      :href="'/product/' + item.slug"
                                    >
                                  <img :src="$imageBaseUrl2 + item.thumbnail_img" :alt="item.name" />

                                      </a>
                              </div>
                              <div class="top_selling_product_content">
                                  <div class="top_selling_product_name __product_details">
                                      <h4>
                                        <a :href="'/product/' + item.slug"
                                        >
                                            {{ item.name.substring(0, 22) }}
                                            <span v-if="item.name.length > 22">...</span>
                                          </a>
                                      </h4>
                                  </div>
                                  <div class="top_selling_product_price">
                                      <span class="top_selling_product_discount_price" v-if="item.sale_price < item.price">  &#2547;{{ item.price }} </span>
                                      <span class="top_selling_product_selling_price">&#2547; {{ item.sale_price }} </span>
                                  </div>
                                  <div class="top_selling_product_btn">
                                       <a :href="'/product/' + item.slug"
                                            v-if="item.product_variant"
                                        >
                                            Order Now
                                          </a>
                                         <button
                                            v-else
                                            @click="buyNow(item.slug)"
                                            class="btn btn-orderNow custom_btn_order_now"

                                        >
                                            Order Now
                                        </button>
                                  </div>
                              </div>
                          </div>
                      </div>


                  </carousel>
              </div>
          </div>
      </div>
    </div>
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
        //  console.log(resp);
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


<style scoped>
  .top_selling_product_area_title h4 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 0px;
      color: rgb(68, 68, 68);
  }

  .top_selling_product_name a:hover {
      color: var(--primary-color);
  }

  .top_selling_product_selling_price {
      font-family: 'Lato', sans-serif;
  }


</style>