<template>
  <main id="content" role="main" class="height" style="margin-bottom: 200px">
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-3">
          <!-- user sidebar start frome here           -->
          <sidebar> </sidebar>
          <!-- user sidebar end frome here           -->
        </div>
        <div class="col-md-9">
          <div class="thumbnail">
            <div class="card mycard">
              <b class="mt-3 ml-3" for="">Your Order</b>

              <div class="p-2 __hide_resp">
                <table class="table table-responsive table-striped text-center">
                  <thead class="bg-warning" style="color: white">
                    <tr>
                      <th scope="col">Invoice</th>
                      <th width="30%" scope="col">Date</th>
                      <th width="30%" scope="col">Payment</th>
                      <th width="20%" scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(order, index) in orders.data" :key="index">
                      <td>
                        <router-link
                          :to="{
                            name: 'order_details',
                            params: { id: order.id },
                          }"
                        >
                          {{ order.invoice_no }}
                        </router-link>
                      </td>
                      <td>{{ order.created_at }}</td>
                      <!-- <td>
                        {{
                          parseInt(order.total) + parseInt(order.shipping_cost)
                        }}
                        &#2547;
                      </td> -->
                      <td>
                        <div v-if="order.payment_status != 'Paid'">
                          <span class="badge badge-pill badge-danger"
                            >Unpaid</span
                          >
                          <router-link
                            v-if="order.status != 'Cancel' && order.status !='Canceled'"
                            :to="{
                              name: 'payment_preview',
                              params: { id: order.id },
                            }"
                            ><span class="badge badge-pill badge-success ml-2">
                              <span class="spinner-grow spinner-grow-sm"></span
                              >Pay Now</span
                            ></router-link
                          >
                        </div>
                        <div v-else>
                          <span class="badge badge-pill badge-success"
                            >paid</span
                          >
                        </div>
                      </td>
                      <td>
                        <span class="badge status">{{ order.status }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <pagination
                  :limit="3"
                  :data="orders"
                  @pagination-change-page="getOrders"
                ></pagination>
              </div>

              <div class="mt-2 p-2 __showChahida">
                <table
                  class="table table-striped"
                  style="width: 100%; font-size: 15px"
                >
                  <tbody>
                    <tr v-for="(order, index) in orders.data" :key="index">
                      <td>
                        <router-link
                          :to="{
                            name: 'order_details',
                            params: { id: order.id },
                          }"
                        >
                          {{ order.invoice_no }}
                        </router-link>
                        <br />
                        {{ order.created_at }}
                      </td>

                      <td>
                        <div v-if="order.payment_status != 'Paid'">
                          <span class="badge badge-pill badge-danger"
                            >Unpaid</span
                          >
                          <router-link
                           v-if="order.status != 'Cancel' && order.status !='Canceled'"
                            :to="{
                              name: 'payment_preview',
                              params: { id: order.id },
                            }"
                            ><span class="badge badge-pill badge-success ml-2">
                              <span class="spinner-grow spinner-grow-sm"></span
                              >Pay Now</span
                            ></router-link
                          >
                        </div>
                        <div v-else>
                          <span class="badge badge-pill badge-danger"
                            >paid</span
                          >
                        </div>
                      </td>
                      <td>
                        <span class="badge status">{{ order.status }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <pagination
                  :limit="3"
                  :data="orders"
                  @pagination-change-page="getOrders"
                ></pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";
import sidebar from "../user/Sidebar.vue";
import pagination from "laravel-vue-pagination";
export default {
  created() {
    this.getOrders();
  },
  data() {
    return {
      orders: {},
    };
  },
  methods: {
    getOrders(page = 1) {
      axios
        .get("customer/order/list?page=" + page, {
          headers: this.$apiHeader,
          params: {
            user_token: localStorage.getItem("user_token"),
          },
        })
        .then((resp) => {
          console.log(resp);
          this.orders = resp.data.orders;
        });
    },
  },
  components: {
    sidebar,
    pagination,
  },
};
</script>

<style scoped>
.status {
  font-size: 13px;
  font-style: bold;
}
@media screen and (max-width: 768px) {
  table {
    overflow-x: scroll;
  }
}
</style>