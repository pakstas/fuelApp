<template>
  <header>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img
            src="../assets/img/Fuel_Logo.png"
            alt="Fuel Logo"
            height="40"
            v-on:click="activeBurger === 'is-active' && toggleBurger()"
          />
        </router-link>

        <a
          role="button"
          class="navbar-burger"
          :class="activeBurger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          v-on:click="toggleBurger()"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="activeBurger"
        v-on:click="toggleBurger()"
      >
        <div class="navbar-end" v-if="userAuth">
          <router-link class="navbar-item" to="/addcar">
            <i class="fas fa-plus fa-pull-left nav-link-icon"></i> Add
            Car</router-link
          >
          <router-link class="navbar-item" to="/"
            ><i class="fas fa-car fa-pull-left nav-link-icon"></i> View
            Cars</router-link
          >

          <a class="navbar-item" v-on:click="signOut()"
            ><i class="fas fa-sign-out fa-pull-left nav-link-icon"></i> Sign Out
            {{ "(" + email + ")" }}</a
          >
        </div>
        <div class="navbar-end" v-else>
          <div>
            <router-link class="navbar-item" to="/register"
              ><i class="fas fa-user-plus fa-pull-left nav-link-icon"></i
              >Register</router-link
            >
          </div>

          <div>
            <router-link class="navbar-item" to="/login"
              ><i class="fas fa-user fa-pull-left nav-link-icon"></i
              >Login</router-link
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

/* eslint-disable */
export default {
  name: "Header",
  data() {
    return {
      userAuth: "",
      email: "",
      uid: "",
      activeBurger: "",
    };
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.userAuth = false;
      localStorage.removeItem("userid");
      this.uid = "";
    },
    toggleBurger() {
      this.activeBurger === ""
        ? (this.activeBurger = "is-active")
        : (this.activeBurger = "");
    },
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userAuth = true;
        this.email = firebase.auth().currentUser.email;
        this.uid = firebase.auth().currentUser.uid;
        localStorage.setItem("userid", this.uid);
      } else {
        this.userAuth = false;
        localStorage.removeItem("userid");
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar,
.navbar-burger,
.navbar-menu {
  background: rgb(147, 224, 243);
}

.navbar-item {
  display: flex;
  align-items: center;
  justify-content: right;
  height: 100%;
}

.navbar-item:hover {
  background-color: rgb(67, 193, 224);
  color: rgb(255, 255, 255);
}

.navbar-item:focus {
  background-color: rgb(67, 193, 224);
  color: rgb(255, 255, 255);
}

.navbar-brand {
  align-items: center;
}
</style>
