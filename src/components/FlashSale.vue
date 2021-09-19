<template>
  <div v-if="flas_sale_products.length > 0">
    <div
      class="d-flex justify-content-between border-bottom border-color-1 flex-lg-nowrap flex-wrap border-md-down-top-0 border-md-down-bottom-0"
    >
      <h3 class="section-title section-title__full mb-0 pb-2 font-size-22">
        Flash Sale
      </h3>
      <a class="d-block text-gray-16" href="#"
        >All Flash Sale<i class="ec ec-arrow-right-categproes"></i
      ></a>
    </div>

    <div
      class="tab-content"
      id="pills-tabContent"
      style="padding-bottom: 0.5rem"
    >
      <div
        class="tab-pane fade pt-2 show active"
        id="pills-one-example1"
        role="tabpanel"
        aria-labelledby="pills-one-example1-tab"
        data-target-group="groups"
      >
        <ul
          class="row list-unstyled products-group no-gutters filters"
          id="br_id"
        >
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade pt-2 show active"
              id="pills-one-example1"
              role="tabpanel"
              aria-labelledby="pills-one-example1-tab"
              data-target-group="groups"
            >
              <ul class="row list-unstyled products-group no-gutters">
                <li
                  class="col-md-2 col-wd-2 gdot4 product-item"
                  v-for="(flas_sale_product, fsidx) in flas_sale_products"
                  :key="fsidx"
                >
                  <div class="product-item__outer h-100">
                    <div class="product-item__inner px-xl-2 p-3">
                      <div class="product-item__body pb-xl-2">
                        <div class="mb-2">
                          <router-link
                            :to="{
                              name: 'single_product',
                              params: { slug: flas_sale_product.slug },
                            }"
                            class="d-block text-center"
                          >
                            <img
                              class="img-fluid"
                              alt="Image Description"
                              style="min-width: 100%"
                              :src="$imageBaseUrl + flas_sale_product.thumnail"
                          /></router-link>
                          <h5 class="mb-1 product-item__title">
                            <router-link
                              :to="{
                                name: 'single_product',
                                params: { slug: flas_sale_product.slug },
                              }"
                              class="text-blue font-weight-bold"
                            >
                              {{ flas_sale_product.name }}
                            </router-link>
                          </h5>
                        </div>
                        <div class="flex-center-between mb-1">
                          <div class="font-weight-bold">
                            <del class="font-size-13 text-gray-9"
                              >৳{{ flas_sale_product.sale_price }}</del
                            >
                            <span
                              class="saletag"
                              v-if="
                                flas_sale_product.price <
                                flas_sale_product.sale_price
                              "
                            >
                              {{ discount_percent(flas_sale_product) }}
                            </span>
                          </div>

                          <div class="prodcut-price">
                            <div class="font-size-15 text-gray-100">
                              ৳{{ flas_sale_product.price }}
                            </div>
                          </div>

                          <div class="d-none d-xl-block prodcut-add-cart">
                            <a
                              style="cursor: pointer"
                              onclick="addtocart()"
                              class="btn-add-cart btn-primary transition-3d-hover addtocart"
                              ><i class="ec ec-add-to-cart"></i
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getALlFalshSale();
  },
  data() {
    return {
      flas_sale_products: "",
    };
  },
  methods: {
    getALlFalshSale() {
      this.$axios
        .get("products/flash/deals", {
          headers: this.$apiHeader,
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.flash_deals_products.length > 0) {
            this.flas_sale_products = resp.data.flash_deals_products;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>