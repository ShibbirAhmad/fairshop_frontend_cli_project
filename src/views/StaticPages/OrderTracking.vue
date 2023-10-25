<template>
  <div class="about container mb-5 ">
      <div class="col-lg-12 col-xs-12 text-center mt-5 ">
        <div class="container order_tracking_container">
            <div class="row">
                <div class="col-md-12">
                    <div class="order_tracking_content">
                        <div class="order_tracking_header_top">
                            <div class="order_tracking_header_left">
                                <span>TRACK YOUR CONSIGNMENT</span>
                            </div>
                            <div class="order_tracking_header_right">
                                <span>Now you can easily track your consignment</span>
                            </div>
                        </div>
                        <div class="order_tracking_header_bottom">
                            <div class="row">
                                <div class="col-sm-7 col-xs-7 col_right_padding_zero">
                                    <div class="order_tracking_header_bottom_left">
                                        <input v-model="invoice_no" @keyup="searchOrder" type="text" class="form-control" placeholder="Enter your tracking code">
                                    </div>
                                </div>
                                <div class="col-sm-4 col-xs-4">
                                    <div class="order_tracking_header_bottom_right">
                                        <button class="order_tracking_header_search_btn"><i class="fa fa-search"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="order_tracking_details" v-if="get_order_info">
                            <div class="row">
                                <div class="col-sm-5">
                                    <div class="order_tracking_details_left">
                                        <p class="order_tracking_details_list">{{ order.created_at }}</p>
                                        <p class="order_tracking_details_list">Invoice No: {{ order.invoice_no }}</p>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="order_tracking_details_right">
                                        <h5 class="order_tracking_order_amount">COD: ৳ {{ order.total }}</h5>
                                        <a href="#" v-if="order.status == 1" class="order_tracking_order_cancel">New</a>
                                        <a href="#" v-if="order.status == 2" class="order_tracking_order_cancel">Pending</a>
                                        <a href="#" v-if="order.status == 3" class="order_tracking_order_cancel">Approved</a>
                                        <a href="#" v-if="order.status == 4" class="order_tracking_order_cancel">Shipment</a>
                                        <a href="#" v-if="order.status == 5" class="order_tracking_order_cancel">Delivered</a>
                                        <a href="#" v-if="order.status == 6" class="order_tracking_order_cancel">Cancelled</a>
                                        <a href="#" v-if="order.status == 7" class="order_tracking_order_cancel">Return</a>
                                        <a href="#" v-if="order.status == 8" class="order_tracking_order_cancel">Packaging</a>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="order_tracking_customer_details">
                                        <h6>{{order.customer.name}}</h6>
                                        <p>
                                            <span>Address:</span>
                                            {{ order.customer.address }}
                                        </p>
                                        <p class="order_tracking_details_list">Phone Number: {{ order.customer.phone }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="order_tracking_send_info">
                                        <h5>Sender Info</h5>
                                    </div>
                                    <div class="order_tracking_organization">
                                        <h5>{{ general_setting.title }}</h5>
                                    </div>

                                    <div class="order_tracking_organization">
                                        <h5 v-html="general_setting.invoice_address_details"></h5>
                                    </div>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12" v-if="order.courier">
                                    <div class="order_tracking_send_info">
                                        <h5>Courier</h5>
                                    </div>
                                    <div class="order_tracking_organization" >
                                        <div class="order_tracking_organization">
                                            <h5>{{ order.courier.name }}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </div>


  
</template>
<script>
export default {
    created() {
    },
    data() {
        return {
            invoice_no: '',
            order: '',
            get_order_info: false,
            general_setting: '',
        };
    },
    methods: {
        searchOrder() {
            console.log(this.invoice_no);
            if (this.invoice_no.length > 3) {
                this.$axios.get('/tracking/order', {
                    params: {
                        invoice_no : this.invoice_no,
                    },
                }).then(resp => {
                    console.log(resp);
                    if (resp.data.success == true) {
                        this.order = resp.data.order;
                        this.general_setting = resp.data.general_setting;
                        this.get_order_info = true;
                    } else {
                        this.$toasted.show(resp.data.message, {
                            position: 'top-center',
                            type: 'success',
                            duration: 2000,
                        });
                    }
                    this.$Progress.finish();
                });
            }
        },
    },
};
</script>

<style scoped>
   /* order tracking start */
   .col_right_padding_zero{
        padding-right: 0px;
    }
    .order_tracking_content {
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 1px 49.98px 1.02px rgba(0,0,0,.19);
        padding: 15px 40px 25px 40px;
    }
    .order_tracking_header_top {
        display: flex;
        gap: 20px;
    }
    .order_tracking_header_left span {
        font-weight: 500;
        color: #212529;
    }
    .order_tracking_header_right span {
        color: #979797;
        font-size: 14px;
    }
    .order_tracking_header_bottom {
        margin-top: 10px;
    }
    .order_tracking_header_bottom_left input {
        border: 1px solid #199eff;
        padding: 10px 12px;
        width: 100%;
        border-radius: 3px;
        font-size: 14px;
        outline: none;
    }
    .order_tracking_header_search_btn {
        border: none;
        background-color: #199eff;
        color: #ffffff;
        text-align: center;
        display: block;
        width: 100%;
        padding: 10px;
        border-radius: 3px;
        font-size: 18px;
    }
    .order_tracking_details {
        border-top: 1px solid #dddddd;
        margin-top: 30px;
        padding-top: 30px;
    }
    .order_tracking_details_right {
        float: right;
    }
    .order_tracking_order_cancel {
        background-color: #fa6969;
        color: #ffffff;
        text-decoration: none;
        padding: 3px 15px;
        border-radius: 50px;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
        display: inline-block;
    }
    .order_tracking_order_cancel:hover {
        color: #ffffff;
    }
    .order_tracking_details_list {
        margin-bottom: 5px;
        color: #545454;
        font-weight: 400;
    }
    .order_tracking_customer_details {
        margin-top: 15px;
        text-align: left;
    }
    .order_tracking_customer_details h6 {
        color: #636363;
        font-size: 17px;
    }
    .order_tracking_customer_details p {
        margin: 0;
        color: #545454;
    }
    .order_tracking_customer_details p span {
        color: #545454;
        font-weight: 500;
    }
    .order_tracking_send_info {
        text-align: center;
        background-color: #f3f3f3;
    }
    .order_tracking_send_info h5 {
        font-weight: 500;
        font-size: 16px;
        padding: 5px 0px;
        margin: 0px;
    }
    .order_tracking_organization {
        margin-top: 15px;
    }
    .order_tracking_organization h5 {
        font-size: 17px;
        color: #636363;
        font-weight: 600;
    }
    .order_tracking_phone_link {
        border: 1px solid #14bf7d;
        font-size: 13px;
        text-decoration: none;
        padding: 3px 9px;
        border-radius: 30px;
        color: #14bf7d;
        font-weight: 500;
        margin-left: 5px;
    }
    .order_tracking_update_title {
        text-align: center;
    }
    .order_tracking_update_title h5 {
        color: #404040;
        margin-bottom: 0px;
        border-bottom: 1px solid #dddddd;
        padding-bottom: 10px;
        font-size: 20px;
    }




    .order_tracking_menu{
        position: relative;
    }
    .order_tracking_list {
        position: sticky;
    }
    .order_tracking_list ul {
        position: relative;
        margin: 0;
        padding: 0;
    }
    .order_tracking_list ul::before {
        content: '';
        position: absolute;
        background: #1dc68c;
        width: 3px;
        height: calc(100% - 70px);
        top: 0px;
        left: 107px;
        z-index: -1;
        margin-top: 50px;
    }
    .order_tracking_list ul li {
        padding: 30px 0px;
        /* padding-left: 20px; */
        position: relative;
        list-style: none;
    }
    .order_tracking_list ul li::before{
        content: '';
        position: absolute;
    }
    .order_tracking_list ul li::before {
        content: '';
        position: absolute;
        background-color: #ffffff;
        width: 18px;
        height: 18px;
        left: 100px;
        top: 53%;
        transform: translateY(20%);
        border-radius: 100%;
        border: 2px solid #1dc68c;
    }
    .order_tracking_list ul li.order_tracking_active::before{
        background-color: #1dc68c;

    }





    .order_tracking_time {
        float: left;
        width: 15%;
        display: block;
        overflow: hidden;
    }
    .order_tracking_condition {
        float: left;
        width: 85%;
        display: block;
        overflow: hidden;
        margin-top: 3px;
        padding-left: 50px;
    }
    .order_tracking_time p {
        margin: 0;
        color: #14bf7d;
        font-size: 14px;
        font-weight: 500;
    }
    .order_tracking_condition p {
        color: #14bf7d;
        font-weight: 500;
        font-size: 14px;
    }


    .order_tracking_container{
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .order_tracking_details_left{
      text-align: left;
    }
</style>