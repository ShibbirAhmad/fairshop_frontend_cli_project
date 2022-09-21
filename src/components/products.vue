<template>
  <div class="tab-content" id="pills-tabContent" style="padding-bottom: 0.5rem">
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

          </div>
        </div>
      </ul>
    </div>
    <div class="row">
       <div
                    class="width-20"
                    v-for="product in products"
                    :key="product.id"
                  >
                    <div class="__product_card">
                      <!-- product image -->
                      <div class="__product_card_img">
                        <router-link
                          :to="{
                            name: 'single_product',
                            params: { slug: product.slug },
                          }"
                          class="d-block text-center"
                        >
                          <img
                            :alt="product.thumbnail_img"
                            :src="$imageBaseUrl2 + product.thumbnail_img"
                          />
                        </router-link>
                      </div>
                      <!-- product details -->
                      <div class="__product_details">
                         <router-link
                          :to="{
                            name: 'single_product',
                            params: { slug: product.slug },
                          }"
                          class="d-block"
                        >
                        <h4>
                          {{ product.name.substring(0,18) }}
                             <span v-if="product.name.length > 18"> ... </span>
                          </h4>
                          </router-link>
                        <p class="price">
                          <span
                            >৳<del>{{ product.price }}</del></span
                          >
                           ৳{{ product.price }}
                        </p>
                      </div>
                      <!-- order Now Button -->
                      <div class="__product_order_btn">
                        <router-link
                          :to="{name:'single_product',params:{slug:product.slug},} "
                          class="d-block text-center"
                        >
                          <button>Order Now</button>
                        </router-link>
                      </div>
                    </div>
                  </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Products",
  props: ["products"],
};
</script>