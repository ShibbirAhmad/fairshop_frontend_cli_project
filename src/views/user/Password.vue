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
              <form @submit.prevent="changePassword">
                <div class="mt-2 p-5">
                  <div class="form-group col-md-4">
                    <div class="js-form-message">
                      <input
                        type="password"
                        v-model="form.old_password"
                        :class="{
                          'is-invalid': form.errors.has('old_password'),
                        }"
                        name="old_paasword"
                        minlength="6"
                        placeholder="Old Password"
                        required
                      />
                      <has-error :form="form" field="old_password ">
                      </has-error>
                    </div>
                  </div>
                  <div class="form-group col-md-4">
                    <div class="js-form-message">
                      <input
                        type="password"
                        v-model="form.new_password"
                        :class="{
                          'is-invalid': form.errors.has('new_password'),
                        }"
                        name="new_paasword"
                        minlength="6"
                        placeholder="New Password"
                        required
                      />
                      <has-error :form="form" field="new_password ">
                      </has-error>
                    </div>
                  </div>
                  <div class="form-group col-md-4">
                    <div class="js-form-message">
                      <input
                        type="password"
                        v-model="form.retype_password"
                        :class="{
                          'is-invalid': form.errors.has('retype_password'),
                        }"
                        name="new_paasword"
                        minlength="6"
                        id="confirm"
                        placeholder="Confirm Password"
                        required
                      />
                      <has-error :form="form" field="retype_password ">
                      </has-error>
                    </div>
                  </div>

                  <br />
                  <br />

                  <label class="text-danger" id="msg"></label>
                  <br />
                  <button
                    :disabled="form.busy"
                    class="info-btn"
                    type="submit"
                  >
                    <i class="fa fa-spiner" v-if="form.busy"></i> Change Password
                  </button>
                </div>
              </form>
               <div  v-if="!this.passwordExist">
                      <form  @submit.prevent="setNewPassword">
                <div class="mt-2 p-5">
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

                  <br />
                  <br />
                  <br />
                    <button
                    :disabled="set_form.busy"
                    class="info-btn"
                    type="submit"
                  >
                    <i class="fa fa-spiner" v-if="set_form.busy"></i>Set Password
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
  created() {
    this.$store.dispatch("user");
    this.getUserInfo();
  },
  data() {
    return {
        form: new Form({
        old_password: "",
        new_password: "",
        retype_password: "",
      }),
        set_form: new Form({
        new_password: "",
        retype_password: "",
      }),
      user_id: "",
      passwordExist:"",
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
            this.user_id=resp.data.user.id ;
            this.passwordExist=resp.data.user.password ;
          });
      }
    },
    changePassword() {
      if (this.form.new_password!=this.form.retype_password) {
        window.alert("new password and re-type password doesn't match");
        return ;
      }
      this.form.post("update/user/passowrd/"+this.user_id).then((resp) => {
        console.log(resp);
        if (resp.data.status == "SUCCESS") {
          this.$toast.open({
            type: "success",
            message: `${resp.data.message}`,
            position: "bottom",
            duration: 4000,
          });
          this.form.old_password="";
          this.form.new_password="";
          this.form.retype_password="";
        }else{
            this.$toast.open({
            message: resp.data.message,
            type: "error",
            position: "bottom",
            duration: 4000,
          });
        }
      });
    },
    setNewPassword() {
      this.set_form.post("set/user/new/password/"+this.user_id).then((resp) => {
        console.log(resp);
        if (resp.data.status == "SUCCESS") {
          this.$toast.open({
            message: resp.data.message,
            type: "success",
            position: "bottom",
            duration: 4000,
          });
          this.set_form.new_password="";
          this.set_form.retype_password="";
        }else{
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