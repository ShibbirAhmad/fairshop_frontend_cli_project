<template>
  <div>
    <div class="top_selling_product_area"  v-if="products.length > 0">
      <div class="container">
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
                      :margin="30"
                      v-if="products.length  > 0"
                      :responsive="{ 0: { items: 2 }, 600: { items: 4 }, 1000: { items: 5 }, 1366: { items: 6 } }"
                  >
                      <div class="top_selling_product_body" v-for="(item, index) in products" :key="index">
                          <div class="single-top_selling_product" >
                              <div class="top_selling_product_image">
                                     <router-link
                                        :to="{
                                            name: 'single_product',
                                            params: {
                                                slug: item.slug,
                                            },
                                        }"
                                    >
                                  <img :src="$imageBaseUrl2 + item.thumbnail_img" :alt="item.name" />

                                 </router-link>
                              </div>
                              <div class="top_selling_product_content">
                                  <div class="top_selling_product_name __product_details">
                                      <h4>
                                        <router-link
                                            :to="{
                                                name: 'single_product',
                                                params: {
                                                    slug: item.slug,
                                                },
                                            }"
                                        >
                                            {{ item.name.substring(0, 22) }}
                                            <span v-if="item.name.length > 22">...</span>
                                        </router-link>
                                      </h4>
                                  </div>
                                  <div class="top_selling_product_price">
                                      <span class="top_selling_product_selling_price">&#2547; {{ item.sale_price }} </span>
                                      <span class="top_selling_product_discount_price" v-if="item.discount">  &#2547;{{ item.price }} </span>
                                  </div>
                                  <div class="top_selling_product_btn">
                                       <router-link
                                            v-if="item.product_variant"
                                            :to="{
                                                name: 'single_product',
                                                params: { slug: item.slug },
                                            }"
                                        >
                                            Order Now
                                        </router-link>
                                         <button
                                            v-else
                                            @click="buyNow(item.slug)"
                                            class="btn btn-orderNow"
                                            style="cursor: pointer"
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
      margin-bottom: 20px;
      color: rgb(68, 68, 68);
  }
  .single-top_selling_product {
      min-height: fit-content;
      padding: 8px;
      background-color: #f2f2f2;
      border-radius: 12px;
      margin-bottom: 16px;
  }
  
  .top_selling_product_name a:hover {
      color: var(--primary-color);
  }
  .top_selling_product_price {
      display: flex;
      align-items: center;
      gap: 24px;
      padding-bottom: 16px;
  }
  .top_selling_product_selling_price {
      font-family: 'Lato', sans-serif;
  }
  .top_selling_product_discount_price {
      font-size: 14px;
      color: #94a3b8;
      text-decoration: line-through;
  }
  .top_selling_product_btn {
      text-decoration: none;
      background-color: var(--primary-color);
      padding: 7px;
      max-width: 100%;
      border-radius: 6px;
      display: block;
      text-align: center;
  }
  .top_selling_product_btn a {
      color: #ffffff;
      font-weight: 500;
      transition: .3s;
      display: block;
      font-size: 13px;
  }
</style>