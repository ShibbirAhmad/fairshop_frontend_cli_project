<template>
  <main id="content" role="main" class="height">
    <div class="login" style="width: 350px; margin: 0px auto; padding: 10px">
      <div id="login">
        <!-- Title -->
        <header class="text-center mb-7" style="margin-top: 5%">
          <h2 class="h4 mb-0">Welcome to Chahida Eshop</h2>
          <p>Sign Up for the next step of processing</p>
        </header>
        <!-- End Title -->
        <!-- Form Group -->
        <div id="numberForm" class="form-group">
          <div class="col js-form-message js-focus-state">
            <form @submit.prevent="sendOtpCode" v-if="mode == 1">
              <div class="form-group">
                <div class="row">
                  <div class="col js-form-message js-focus-state">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="signinEmailLabel">
                          <span class="fa fa-user"></span>
                        </span>
                      </div>
                      <input
                        type="text"
                        id="name"
                        v-model="form.name"
                        class="form-control"
                        :class="{ 'is-invalid': form.errors.has('name') }"
                        placeholder="Ex:Mohammad"
                      />
                      <has-error :form="form" field="name"></has-error>
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text"
                    style="font-size: 0.875rem; padding: 0.6rem"
                  >
                    +88
                  </span>
                </div>

                <input
                  type="text"
                  class="form-control"
                  v-model="form.mobile_no"
                  placeholder="Mobile Number"
                  :class="{ 'is-invalid': form.errors.has('mobile_no') }"
                  required
                  maxlength="11"
                  name="mobile_no"
                />
                <HasError :form="form" field="mobile_no"></HasError>
                <div class="input-group-prepend">
                  <button
                    type="submit"
                    :disabled="form.mobile_no.length != 11"
                    class="input-group-text"
                    style="
                      margin-left: -1px;
                      font-size: 0.875rem;
                      color: #b5b9bd;
                    "
                  >
                    <div
                      v-if="busy"
                      class="spinner-border text-primary"
                      role="status"
                    ></div>

                    <span v-else>Send OTP</span>
                  </button>
                </div>
              </div>
            </form>

            <div v-if="mode == 2">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text"
                    style="font-size: 0.875rem; padding: 0.6rem"
                  >
                    +88
                  </span>
                </div>

                <input
                  type="text"
                  class="form-control"
                  v-model="form.mobile_no"
                  placeholder="Mobile Number"
                  required
                />
                <div class="input-group-prepend">
                  <div
                    v-if="limit > 0"
                    class="input-group-text"
                    style="
                      margin-left: -1px;
                      font-size: 0.875rem;
                      color: #b5b9bd;
                    "
                  >
                    <span>{{ limit + " Sec" }}</span>
                  </div>
                  <div
                    v-else
                    :disabled="form.mobile_no.length != 11"
                    class="input-group-text"
                    style="
                      margin-left: -1px;
                      font-size: 0.875rem;
                      color: #b5b9bd;
                    "
                    @click="sendOtpCode"
                  >
                    <div
                      v-if="busy"
                      class="spinner-border text-primary"
                      role="status"
                    ></div>

                    <span v-else> Send Again </span>
                  </div>
                </div>
              </div>
              <br />
              <form @submit.prevent="verifi_code_and_register" id="otp-login">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    maxlength="4"
                    minlength="4"
                    name="otp"
                    v-model="code"
                    placeholder="Enter 4 digit Otp"
                    required=""
                  />
                </div>

                <br />

                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    name="password"
                    v-model="password"
                    placeholder="Password"
                    required
                  />
                </div>

                <div id="message2" class="mb-2 text-center text-success">
                  4 digit otp sent to your mobile number
                </div>
                <div id="message" class="mb-2 text-center text-danger"></div>
                <div class="mb-4 mt-2">
                  <button
                    name="passLogin"
                    type="submit"
                    :disabled="
                      code.length != 4 ||
                      form.mobile_no.length != 11 ||
                      password.length <= 0
                    "
                    id="loginBtn"
                    class="btn btn-block btn-sm btn-primary transition-3d-hover"
                    style="color: rgb(255, 255, 255)"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4" style="margin-bottom: 35% !important; font-size: 16px">
<h4 style="
    color: #77838f!important;
    text-align: center;
    font-size: 19px;
">Already have an account?</h4>        
        <router-link
          :to="{ name: 'login' }"
          style="background: rgb(10 98 162)"
          class="btn btn-block btn-sm text-white transition-3d-hover"
          >Login Here</router-link
        >
      </div>
    </div>
  </main>
</template>


<script>
import Vue from "vue";
import axios from "axios";
//import { Form } from "vform";
import { Form, HasError } from "vform";

import ObjectToFD from "vue-object-to-formdata";
Vue.use(ObjectToFD);
export default {
  data() {
    return {
      mode: 1,
      busy: false,
      limit: 10,
      code: "",
      password: "",
      form: new Form({
        mobile_no: "",
        name: "",
      }),
    };
  },
  methods: {
    sendOtpCode() {
      if (this.form.mobile_no.length != 11) {
        this.$toast.open({
          message: `Phone Number Must Be 11 Digits`,
          type: "warning",
          position: "bottom",
          duration: 4000,
        });
        return;
      }
      this.busy = true;
      axios
        .post("check/user/send/verify/code", this.$objectToFD(this.form))
        .then((resp) => {
          console.log(resp);
          if (resp.data.status == "OK") {
            this.$toast.open({
              message: `${resp.data.message}`,
              type: "success",
              position: "bottom",
              duration: 4000,
            });
            this.mode = 2;
            this.busy = false;
            this.limit = 60;
            this.time_count();
          } else {
            this.$toast.open({
              message: `${resp.data.errors[0]}`,
              type: "error",
              position: "bottom",
              duration: 4000,
            });
            this.busy = false;
          }
        });
    },

    time_count() {
      setInterval(() => {
        this.limit -= 1;
      }, 1000);
    },
    verifi_code_and_register() {
      if (this.form.mobile_no.length != 11) {
        this.$toast.open({
          message: `Mobile Number Must Be 11 Digits`,
          type: "info",
          position: "bottom",
          duration: 4000,
        });

        return;
      }

      if (this.code.length != 4) {
        this.$toast.open({
          message: `Code 4 Digtis`,
          type: "info",
          position: "bottom",
          duration: 4000,
        });

        return;
      }

      this.$axios
        .post("verified/user/register", {
          headers: this.$apiHeader,
          code: this.code,
          mobile_no: this.form.mobile_no,
          name: this.form.name,
          password: this.password,
        })
        .then((resp) => {
          if (resp.data.status == "SUCCESS") {
            this.$toast.open({
              message: `${resp.data.message}`,
              type: "success",
              position: "bottom",
              duration: 4000,
            });
            localStorage.setItem("user_token", resp.data.token);
            this.$store.dispatch("user");
            this.$router.push({ name: "profile" });
          } else {
            this.$toast.open({
              message: `${resp.data.message}`,
              type: "error",
              position: "bottom",
              duration: 4000,
            });
          }
        });
    },
  },
  components: {
    HasError,
  },
};
</script>
<style>
.spinner-border {
  width: 1rem;
  height: 1rem;
}
</style>