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
      <div
        class="
          d-flex
          justify-content-between
          border-bottom border-color-1
          flex-lg-nowrap flex-wrap
          border-md-down-top-0 border-md-down-bottView
          om-
          mb-3
          mt-2
        "
      >
        <h3
          class="section-title section-title__full mb-0 pb-2 font-size-22"
        ></h3>
      </div>
      <div
        id="demo"
        class="collapse"
        style="background: #fff; padding: 1rem; border-radius: 0.5rem"
      ></div>

      <div id="post-data">
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade pt-2 show active"
            id="pills-one-example1"
            role="tabpanel"
            aria-labelledby="pills-one-example1-tab"
            data-target-group="groups"
          >
            <ul
              class="row list-unstyled products-group no-gutters"
              v-if="products.length > 0"
            >
              <li
                class="col-6 col-md-2 col-wd-2 gdot4 product-item"
                v-for="(product, idx) in products"
                :key="idx"
              >
                <div class="product-item__outer h-100">
                  <div class="product-item__inner px-xl-2 p-3">
                    <div class="product-item__body pb-xl-2">
                      <div class="mb-2">
                        <router-link
                          :to="{
                            name: 'single_product',
                            params: { slug: product.slug },
                          }"
                          class="d-block text-center"
                        >
                          <img
                            class="img-fluid"
                            :src="$imageBaseUrl + product.thumnail"
                            alt="Image Description"
                            style="min-width: 100%"
                        /></router-link>
                        <h5 class="mb-1 product-item__title">
                          <router-link
                            :to="{
                              name: 'single_product',
                              params: { slug: product.slug },
                            }"
                            class="text-blue font-weight-bold"
                            >{{ product.name.substring(0.15) }}   <span v-if="product.name.length > 15"> ... </span> </router-link
                          >
                        </h5>
                      </div>
                      <div class="flex-center-between mb-1">
                        <div class="font-weight-bold">
                          <del
                            v-if="
                              product.discount_price < product.regular_price
                            "
                            class="font-size-13 text-gray-9"
                            >৳ {{ product.regular_price }}</del
                          >
                          <span
                            class="saletag"
                            v-if="
                              product.discount_price < product.regular_price
                            "
                          >
                            {{ $discount_percent(product) }}
                          </span>
                        </div>

                        <div class="prodcut-price">
                          <div class="font-size-15 text-gray-100">
                            ৳ {{ product.discount_price }}
                          </div>
                        </div>

                        <div class="d-none d-xl-block prodcut-add-cart">
                          <a
                            class="
                              btn-add-cart btn-primary
                              transition-3d-hover
                              addtocart
                            "
                            @click.prevent="$add_to_cart($event, product)"
                            ><i class="fa fa-ellipsis-v"></i
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
      </div>
      <InfiniteLoading @infinite="allProducts">
        <div slot="no-more"></div>
      </InfiniteLoading>
    </div>
  </main>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";

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
        .get(
          "products/search/" + this.$route.params.search + "?page=" + this.page,
          {
            headers: this.$apiHeader,
          }
        )
        .then((resp) => {
          if (resp.data.products.data.length) {
            this.page += 1;
            this.products.push(...resp.data.products.data);

            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
  },
  components: {
    InfiniteLoading,
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
};
</script>