<template>
  <main id="content" role="main" class="height">
    <div class="login" style="width: 350px; margin: 0px auto; padding: 10px">
      <div id="loginOtp" class="login_with_otp">
        <!-- Title -->
        <header class="text-center mb-5" style="margin-top: 17%">
          <p style="font-size: 20px">{{ headerText }}</p>
        </header>
        <!-- End Title -->
        <!-- Form Group -->
        <div id="numberForm" class="form-group">
          <div class="col js-form-message js-focus-state">
            <form @submit.prevent="sendOtpCode()" v-if="mode == 1">
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
                  v-model="mobile_number"
                  placeholder="Mobile Number"
                  required
                />
                <div class="input-group-prepend">
                  <button
                    type="submit"
                    :disabled="mobile_number.length != 11"
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
                  v-model="mobile_number"
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
                    :disabled="mobile_number.length != 11"
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
              <form @submit.prevent="verifi_code" id="otp-login">
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
                <div id="message2" class="mb-2 text-center text-success">
                  4 digit otp sent to your mobile number
                </div>
                <div id="message" class="mb-2 text-center text-danger"></div>
                <div class="mb-4 mt-2">
                  <button
                    name="passLogin"
                    type="submit"
                    :disabled="code.length != 4 || mobile_number.length != 11"
                    id="loginBtn"
                    class="btn btn-block btn-sm btn-primary transition-3d-hover"
                    style="color: rgb(255, 255, 255)"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="text-center mt-4" style="font-size: 16px">
          <a
            id="with_password"
            @click.prevent="displayPasswordLogin"
            style="background: rgb(10 98 162)"
            href="#"
            class="btn btn-block btn-sm btn-primary transition-3d-hover"
          >
            Login With Password
          </a>
          <br />
        </div>

        <div
          class="mb-4"
          style="margin-bottom: 35% !important; font-size: 16px"
        >
          <h4
            style="
              color: #77838f !important;
              text-align: center;
              font-size: 19px;
            "
          >
            Do not have an account?
          </h4>

          <router-link
            :to="{ name: 'register' }"
            class="btn btn-block btn-sm btn-primary transition-3d-hover"
            >Sign Up
          </router-link>
        </div>
      </div>

      <div id="logWithPass" class="login_with_password">
        <header
          class="text-center mb-5"
          style="margin-top: 17%; font-size: 15px"
        >
          <p style="font-size: 20px">Login With Password</p>
        </header>
        <div id="otpForm">
          <form id="pass-login" @submit.prevent="loginWithPassowrd">
            <div class="form-group">
              <div class="col js-form-message js-focus-state">
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
                    id="mobile"
                    v-model="mobile_number"
                    placeholder="01xxxxxxxxx"
                    maxlength="11"
                    required
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="js-form-message js-focus-state">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="signinPasswordLabel">
                      <span class="fa fa-lock"></span>
                    </span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    id="pass"
                    v-model="password"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="mb-4">
              <button
                type="submit"
                id="loginBtn"
                class="btn btn-block btn-sm btn-primary transition-3d-hover"
              >
                Login
              </button>
              <button
                type="sybmit"
                class="btn btn-block btn-sm btn-primary transition-3d-hover"
                style="background: rgb(10 98 162)"
                @click.prevent="displayOtpLogin"
              >
                Login with OTP
              </button>
            </div>
          </form>
        </div>

        <!-- <div class="text-center mt-4" style="font-size: 16px">
          <span class="small text-secondary">Login With</span>
          <a id="with_otp" @click="displayOtpLogin" style="cursor: pointer"
            >OTP
          </a>
        </div> -->

        <div
          class="mb-4"
          style="margin-bottom: 35% !important; font-size: 16px"
        >
          <h4
            style="
              color: #77838f !important;
              text-align: center;
              font-size: 19px;
            "
          >
            Do not have an account?
          </h4>

          <router-link
            :to="{ name: 'register' }"
            class="btn btn-block btn-sm btn-primary transition-3d-hover"
            >Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  created() {
    if (Object.keys(this.$store.state.user).length > 0) {
      this.$router.push({ name: "checkout" });
    }
  },
  data() {
    return {
      mode: 1,
      headerText: "Login With OTP",
      mobile_number: "",
      busy: false,
      limit: 60,
      code: "",
      password: "",
    };
  },
  methods: {
    sendOtpCode() {
      if (this.mobile_number.length != 11) {
        this.$toast.open({
          message: `Phone Number Must Be 11 Digits`,
          type: "warning",
          position: "bottom",
          duration: 4000,
        });
        return;
      }
      this.busy = true;
      this.$axios
        .get("send/otp", {
          headers: this.$apiHeader,
          params: {
            mobile_number: this.mobile_number,
          },
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.success == "OK") {
            this.$toast.open({
              message: `${resp.data.message}`,
              type: "success",
              position: "bottom",
              duration: 4000,
            });
          }
          this.mode = 2;
          this.busy = false;
          this.limit = 60;
          this.time_count();
        });
    },

    time_count() {
      setInterval(() => {
        this.limit -= 1;
      }, 1000);
    },
    verifi_code() {
      if (this.mobile_number.length != 11) {
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
        .post("verify/otp", {
          headers: this.$apiHeader,
          code: this.code,
          mobile_number: this.mobile_number,
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
            if (this.$store.state.cart.item_count > 0) {
              // this.$router.push({ name: "checkout" });
              this.$router.push({ name: "checkout" });
            } else {
              this.$router.push({ name: "checkout" });
            }
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

    displayPasswordLogin() {
      document.getElementById("loginOtp").style.display = "none";
      document.getElementById("logWithPass").style.display = "block";
    },

    displayOtpLogin() {
      document.getElementById("loginOtp").style.display = "block";
      document.getElementById("logWithPass").style.display = "none";
    },

    loginWithPassowrd() {
      if (this.mobile_number.length != 11) {
        this.$toast.open({
          message: `Phone Number Must Be 11 Digits`,
          type: "warning",
          position: "bottom",
          duration: 4000,
        });
        return;
      }
      this.$axios
        .get("login/using/password", {
          headers: this.$apiHeader,
          params: {
            mobile_number: this.mobile_number,
            password: this.password,
          },
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.status == "SUCCESS") {
            this.$toast.open({
              message: `${resp.data.message}`,
              type: "success",
              position: "bottom",
              duration: 4000,
            });
            localStorage.setItem("user_token", resp.data.user.token);
            this.$store.dispatch("user");
            if (this.$store.state.cart.item_count > 0) {
              this.$router.push({ name: "checkout" });
            } else {
              this.$router.push({ name: "checkout" });
            }
          } else {
            this.$toast.open({
              message: `${resp.data.message}`,
              type: "error",
              position: "bottom",
              duration: 3000,
            });
          }
        });
    },
  },
};
</script>
<style>
.spinner-border {
  width: 1rem;
  height: 1rem;
}

.login_with_password {
  display: block;
}
#loginOtp {
  display: none;
}
</style>