<template>
  <div class="register-page">
    <div class="form-block">
      <div class="title">
        <h2>Register</h2>
      </div>
      <div class="form">
        <Notification
          v-on:close="error = false"
          v-if="error"
          :type="errorType"
          :message="errorMessage"
        />
        <form v-on:submit.prevent="register">
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left">
              <input
                class="input"
                type="email"
                v-model="email"
                placeholder="e.g. alexsmith@gmail.com"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left">
              <input
                class="input"
                v-model="password"
                type="password"
                placeholder="Password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button
                class="button is-dark is-fullwidth"
                :class="loading && 'is-loading'"
                type="submit"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Notification from "../components/Notification.vue";
export default {
  /* eslint-disable */
  name: "Register",
  components: { Notification },
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMessage: "",
      errorType: "",
      loading: false,
    };
  },
  methods: {
    register() {
      this.loading = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch((error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.errorType = "is-danger";
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-height: calc(100vh - 100px);
}
.form-block {
  width: 360px;
  margin: 5vh auto;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 5px 5px 5px 5px;
}

.title {
  background: rgba(7, 7, 7, 0.76);
  color: white;
  padding: 10px 20px 10px 20px;
  margin-bottom: 5px;
  border-radius: 5px 5px 0px 0px;
}

.form {
  padding: 5px 20px 20px 20px;
}

@media screen and (max-width: 560px) {
  .form-block {
    width: 320px;
  }
}
</style>
