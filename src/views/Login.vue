<template>
  <div class="login-page">
    <div class="login">
      <div class="title">
        <h2>Login</h2>
      </div>
      <div class="form">
        <Notification
          v-on:close="error = false"
          v-if="error"
          :type="errorType"
          :message="errorMessage"
        />
        <form v-on:submit.prevent="login">
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
                Login
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
import "firebase/auth";
import Notification from "../components/Notification";
/* eslint-disable */
export default {
  name: "Login",
  components: { Notification },
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMessage: "",
      loading: false,
      errorType: "",
    };
  },
  methods: {
    login() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
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
.login-page {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-height: 75vh;
}

.login {
  width: 360px;
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
  .login {
    width: 320px;
  }
}
</style>
