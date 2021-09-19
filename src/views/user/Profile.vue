<template>
  <main id="content" role="main" class="height">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <!-- user sidebar start frome here           -->
          <sidebar> </sidebar>
          <!-- user sidebar end frome here           -->
        </div>
        <!-- <div class="col-md-8">
          <div class="thumbnail">
            <div class="card mycard">
              <div class="mt-2 p-5">
                <form
                  @submit.prevent="updateUserInfo"
                  enctype="multipart/form-data"
                >
                  <div class="form-group col-md-4">
                    <div class="js-form-message">
                      <input
                        type="text"
                        name="name"
                        v-model="form.name"
                        :class="{ 'is-invalid': form.errors.has('name') }"
                        placeholder="Name"
                      />
                      <has-error :form="form" field="name"></has-error>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <div class="js-form-message">
                      <input
                        type="email"
                        name="email"
                        v-model="form.email"
                        :class="{ 'is-invalid': form.errors.has('email') }"
                        id="signinEmail"
                      />
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <div class="js-form-message">
                      <input
                        type="text"
                        name="mobile_no"
                        id="mobile"
                        v-model="form.mobile_no"
                        :class="{ 'is-invalid': form.errors.has('mobile_no') }"
                        aria-label="Mobile"
                        required
                      />
                      <has-error :form="form" field="mobile_no"> </has-error>
                    </div>
                  </div>
                  <div class="form-group col-md-4">
                    <div class="js-form-message">
                      <div class="js-form-message">
                        <input
                          type="text"
                          name="address"
                          v-model="form.address"
                          :class="{ 'is-invalid': form.errors.has('address') }"
                        />
                        <has-error :form="form" field="address"> </has-error>
                      </div>
                    </div>
                  </div>

                  <div
                    id="message"
                    class="col-md-4 mb-2 font-size-12"
                    style="color: red"
                  ></div>
                  <div class="col-md-4">
                    <button
                      type="submit"
                      name="dataUp"
                      value="dataUp"
                      class="btn info-btn"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> -->

        <div class="col-md-8">
          <div class="thumbnail">
            <div class="card mycard mb-5 p-5">
              <div class="mb-2">
                <i><h5 class="font-weight-bold">Your Personal Info</h5></i>
              </div>

              <form @submit.prevent="updateUserInfo">
                <div class="mt-2">
                  <div class="form-group col-md-4">
                    <div class="js-form-message">
                      <input
                        type="text"
                        name="name"
                        v-model="form.name"
                        :class="{ 'is-invalid': form.errors.has('name') }"
                        placeholder="Name"
                      />
                      <has-error :form="form" field="name"> </has-error>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <div class="js-form-message">
                      <input
                        type="email"
                        name="email"
                        v-model="form.email"
                        :class="{ 'is-invalid': form.errors.has('email') }"
                        id="signinEmail"
                        placeholder="Email"
                      />
                      <has-error :form="form" field="email"></has-error>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <div class="js-form-message">
                      <input
                        type="text"
                        name="mobile_no"
                        id="mobile"
                        v-model="form.mobile_no"
                        :class="{ 'is-invalid': form.errors.has('mobile_no') }"
                        aria-label="Mobile"
                        required
                        placeholder="Mobile Number"
                      />
                      <has-error :form="form" field="mobile_no"> </has-error>
                    </div>
                  </div>
                  <div class="form-group col-md-4">
                    <div class="js-form-message">
                      <div class="js-form-message">
                        <input
                          type="text"
                          name="address"
                          v-model="form.address"
                          :class="{ 'is-invalid': form.errors.has('address') }"
                          placeholder="Address"
                        />
                        <has-error :form="form" field="address"> </has-error>
                      </div>
                    </div>
                  </div>

                  <!-- <div class="form-group col-md-4">
                  <div class="js-form-message">
                    <input
                      placeholder="Birth Date"
                      class="textbox-n"
                      type="text"
                      onfocus="(this.type='date')"
                      name="bday"
                    />
                  </div>
                </div> -->

                  <!-- <div
                  id="message"
                  class="col-md-4 mb-2 font-size-12"
                  style="color: red"
                ></div> -->
                  <div class="col-md-4">
                    <button
                      type="submit"
                      name="dataUp"
                      value="dataUp"
                      class="btn-info"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div class="card mycard p-5">
              <div class="mb-2">
                <i><h5 class="font-weight-bold">Your Password Info</h5></i>
                <p class="text-success">
                  Please set your password if you are not set yet before. If you
                  want to change or reset your password then click
                  <b>"Reset Password"</b> button and enter your new password.
                </p>
              </div>
              <div class="mt-2">
                <form
                 @submit.prevent="setNewPassword"
                  style=""
                  class="col-md-9 mb-3 float-left"
                  
                >
                  <div class="form-group col-md-4">
                    <div class="js-form-message">
                      <input
                        type="password"
                        v-model="set_form.new_password"
                        :class="{
                          'is-invalid': set_form.errors.has('new_password'),
                        }"
                        name="new_paasword"
                        minlength="6"
                        placeholder="New Password"
                        required
                      />
                      <has-error :form="set_form" field="new_password ">
                      </has-error>
                    </div>
                  </div>
                  <div class="form-group col-md-4">
                    <div class="js-form-message">
                      <input
                        type="password"
                        v-model="set_form.retype_password"
                        :class="{
                          'is-invalid': set_form.errors.has('retype_password'),
                        }"
                        name="new_paasword"
                        minlength="6"
                        placeholder="Confirm Password"
                        required
                      />
                      <has-error :form="set_form" field="retype_password ">
                      </has-error>
                    </div>
                  </div>

                  <div
                    id="message"
                    class="col-md-4 mb-2 font-size-12"
                    style="color: red"
                  ></div>
                  <div class="col-md-4">
                    <button type="submit" class="btn-info">
                      Update Password
                    </button>
                  </div>
                </form>
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
import { Form } from "vform";

export default {
  name: "profile",
  created() {
    this.$store.dispatch("user");
    this.getUserInfo();
  },
  data() {
    return {
      form: new Form({
        name: "",
        email: "",
        mobile_no: "",
        address: "",
      }),
      set_form: new Form({
        new_password: "",
        retype_password: "",
      }),
      user_id: "",
    };
  },
  methods: {
    getUserInfo() {
      if (localStorage.getItem("user_token")) {
        axios
          .get("user", {
            headers: this.$apiHeader,
            params: {
              user_token: localStorage.getItem("user_token"),
            },
          })
          .then((resp) => {
            //  console.log(resp);
            this.user_id = resp.data.user.id;
            this.form.name = resp.data.user.name
              ? resp.data.user.name
              : "add name";
            this.form.mobile_no = resp.data.user.mobile_no;
            this.form.email = resp.data.user.email
              ? resp.data.user.email
              : "add email";
            this.form.address = resp.data.user.address
              ? resp.data.user.address
              : "add address";
          });
      }
    },
    updateUserInfo() {
      this.form.post("user/infor/update/" + this.user_id).then((resp) => {
        // console.log(resp);
        if (resp.data.status == "SUCCESS") {
          this.$toast.open({
            message: resp.data.message,
            type: "success",
            position: "bottom",
            duration: 4000,
          });
        }
      });
    },
    setNewPassword() {
      this.set_form
        .post("set/user/new/password/" + this.user_id)
        .then((resp) => {
          console.log(resp);
          if (resp.data.status == "SUCCESS") {
            this.$toast.open({
              message: resp.data.message,
              type: "success",
              position: "bottom",
              duration: 4000,
            });
            this.set_form.new_password = "";
            this.set_form.retype_password = "";
          } else {
            this.$toast.open({
              message: resp.data.message,
              type: "error",
              position: "bottom",
              duration: 4000,
            });
          }
        });
    },
  },
  components: {
    sidebar,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>