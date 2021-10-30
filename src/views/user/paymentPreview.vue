<template>
  <main id="content" role="main" class="height">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <!-- user sidebar start frome here           -->
          <sidebar> </sidebar>
          <!-- user sidebar end frome here           -->
        </div>
        <div class="col-md-8">
          <div class="thumbnail">
            <div class="card text-center bg-white round shadow">
              <div class="card-header">Payment Preview</div>
                <div
                  class="row justify-content-center"
                  v-if="Object.keys(order).length <= 0"
                >
                  <div class="col-lg-12 text-center">
                    <div
                      class="spinner-border text-primary"
                      role="status"
                    ></div>
                  </div>
                </div>
              <div v-else class="card-body">
                <h5 class="card-title">Order Summary</h5>
                <table class="table table-striped payment_tble">
                  <tbody>
                    <p>
                      Order Invoice
                      <span class="o_value"> {{ order.invoice_no }} </span>
                    </p>
                    <p>
                      Sub Total
                      <span class="o_value"> &#2547; {{ order.total }} </span>
                    </p>

                      <p>
                    Shipping Cost
                      <span class="o_value"> &#2547; {{ order.shipping_cost }} </span>
                    </p>

                    <p>
                      Total
                      <span class="o_value">
                        &#2547;
                        {{
                          parseInt(order.total) + parseInt(order.shipping_cost)
                        }}
                      </span>
                    </p>
                  </tbody>
                </table>

                  <router-link  :to="{
                            name: 'order_details',
                            params: { id: order.id },
                          }" class="btn btn-secondary"> Pay Later </router-link>

                <form style="    display: inline-block;
                  width: 200px;" action="" method="POST">
                  <input type="hidden" name="orderId" :value="order.id" />

                  <button type="submit" class="btn btn-primary payment_btn">
                    Pay Now &#2547;
                    {{ parseInt(order.total) + parseInt(order.shipping_cost) }}
                  </button>
                </form>

              </div>
              <div class="card-footer text-muted">fairshop.com.bd</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import sidebar from "./Sidebar.vue";
export default {
  created() {
    this.getOrder();
  },
  data() {
    return {
      order: "",
    };
  },
  methods: {
    getOrder() {
      axios
        .get("customer/order/item/" + this.$route.params.id, {
          headers: this.$apiHeader,
        })
        .then((resp) => {
          this.order = resp.data.order;
        });
    },
  },
  components: {
    sidebar,
  },
};
</script>

<style scoped>
span.o_value{
  float: right;
}

p {
  line-height: 14px;
}

.payment_btn {
  margin-left: 10%;
}
@media screen and (max-width: 768px) {
  table {
    overflow-x: scroll;
  }
}
</style>