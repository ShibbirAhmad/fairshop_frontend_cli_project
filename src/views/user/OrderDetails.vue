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
            <div class="card mycard">
              <div class="container"></div>
              <div class="container mt-4" style="padding-bottom: 3%">
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
                <div v-else class=" ">
                  <div>
                    <span
                      ><b>Order Invoice: </b>
                      <span> {{ order.invoice_no }} </span></span
                    ><br />
                    <span
                      ><b>Name: </b>
                      <span>
                        {{ order.customer_name ? order.customer_name : "" }}
                      </span></span
                    ><br />
                    <span
                      ><b>Phone: </b>
                      <span>
                        {{
                          order.customer_phone ? order.customer_phone : ""
                        }}</span
                      ></span
                    ><br />
                    <span
                      ><b>Date: </b>
                      <span>
                        {{ order.created_at }}
                      </span></span
                    >
                  </div>

                  <div class="row mt-4" style="font-size: 12px">
                    <a href="#">
                      <!-- <img src="../icon/print-button.png" width="30px" height="30px" style="float: right;cursor: pointer"> -->
                    </a>

                    <table class="table table-striped">
                      <thead class="bg-warning">
                        <tr>
                          <th>#</th>
                          <th>SKU</th>
                          <th>Product</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(order, index) in order_items" :key="index">
                          <td>{{ index + 1 }}</td>
                          <td>{{ order.product.product_code }}</td>
                          <td>{{ order.product.name }}</td>
                          <td>{{ order.quantity }}</td>
                          <td>{{ order.price }}</td>
                          <td>
                            ৳
                            {{
                              parseFloat(order.price) *
                              parseFloat(order.quantity)
                            }}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="5"><b>Total</b></td>
                          <td>
                            <span>৳ {{ order.total }}</span>
                            <br />
                            <span>+ {{ order.shipping_cost }} </span
                            ><span> (shipping)</span><br />
                            <hr />
                            <span id="total"
                              ><b id="total"
                                >৳
                                {{
                                  parseInt(order.total) +
                                  parseInt(order.shipping_cost)
                                }}
                              </b></span
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <button
                  v-if="order.status=='Pending'" 
                    @click="cancelOrder(order.id)"
                    type="submit"
                    class="btn btn-secondary btn-sm"
                  >
                    Cancel Order
                  </button>

                  <router-link
                  v-if="order.payment_status !='Paid' && order.status !='Cancel'  && order.status != 'Canceled'"
                    :to="{
                      name: 'payment_preview',
                      params: { id: order.id },
                    }"
                    class="btn btn-primary btn-sm"
                    ><span class="spinner-grow spinner-grow-sm"></span> Pay Now
                  </router-link>
                </div>
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
export default {
  name: "order_details",
  created() {
    this.getorder_items();
  },
  data() {
    return {
      customer: "",
      order_items: "",
      order: "",
    };
  },
  methods: {
    getorder_items() {
      axios
        .get("customer/order/details/" + this.$route.params.id, {
          headers: this.$apiHeader,
          params: {
            user_token: localStorage.getItem("user_token"),
          },
        })
        .then((resp) => {
          console.log(resp);
          this.customer = resp.data.customer;
          this.order = resp.data.order;
          this.order_items = resp.data.order_items;
        });
    },

    cancelOrder($id) {
      axios.get("customer/order/cancler/" + $id).then((resp) => {
        console.log(resp);
        if (resp.data.status == "SUCCESS") {
          this.$toast.open({
            type: "success",
            message: resp.data.message,
            position: "top-center",
            duration: 4000,
          });

          this.$router.push({name:'order'})
        }
      });
    },
  },
  components: {
    sidebar,
  },
};
</script>
<style scoped>
.btn-primary {
  margin-left: 10px;
}
ul.timeline {
  list-style-type: none;
  position: relative;
}
ul.timeline:before {
  content: " ";
  background: #d4d9df;
  display: inline-block;
  position: absolute;
  left: 29px;
  width: 2px;
  height: 100%;
  z-index: 400;
}
ul.timeline > li {
  margin: 20px 0;
  padding-left: 20px;
}
ul.timeline > li:before {
  content: " ";
  background: white;
  display: inline-block;
  position: absolute;
  border-radius: 50%;
  border: 3px solid #368ec9;
  left: 20px;
  width: 20px;
  height: 20px;
  z-index: 400;
}
</style>