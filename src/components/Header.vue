<template>
  <header>
    <div class="wrapper">
      <div class="nav">
        <img src="../assets/img/Fuel_Logo.png" alt="Company logo" />

        <nav>
          <div v-if="userAuth">
            <router-link to="/addcar"
              ><i class="fas fa-plus fa-pull-left nav-link-icon"></i> Add
              Car</router-link
            >

            <router-link to="/"
              ><i class="fas fa-car fa-pull-left nav-link-icon"></i> View
              Cars</router-link
            >

            <a v-on:click="signOut()"
              ><i class="fas fa-sign-out fa-pull-left nav-link-icon"></i> Sign
              Out {{ "(" + email + ")" }}</a
            >
          </div>
          <div v-else>
            <span>
              <router-link to="/register"
                ><i class="fas fa-user-plus fa-pull-left nav-link-icon"></i
                >Register</router-link
              >
            </span>
            <span
              ><router-link to="/login"
                ><i class="fas fa-user fa-pull-left nav-link-icon"></i
                >Login</router-link
              ></span
            >
          </div>
        </nav>
      </div>
      <!-- <div class="page-title">
        <h1 class="title">> {{ this.$route.name }}</h1>
        <img src="../assets/img/login.svg" alt="Driver" />
      </div> -->
    </div>
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
    };
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push("/login");
      this.userAuth = false;
      localStorage.removeItem("userid");
      this.uid = "";
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
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: rgb(147, 224, 243);
}

.nav img {
  height: 40px;
}

.nav a {
  text-decoration: none;
  color: rgb(0, 0, 0);
  margin-right: 5px;
  margin-left: 10px;
  box-sizing: border-box;
  padding: 4px;
  border: 2px dotted rgba(0, 0, 0, 0);
}
.nav a:hover {
  text-decoration: none;
  border-radius: 8px;
  box-sizing: border-box;
  border: 2px solid rgb(67, 193, 224);
  background-color: rgb(67, 193, 224);
}

.nav a:last-child {
  margin-right: 0px;
}

nav div {
  display: flex;
  flex-direction: row;
  height: 100%;
}

nav a {
  display: flex;
  align-items: center;
}

.wrapper .page-title {
  height: 200px;
  padding: 10px;
  display: flex;
  align-items: center;
}

.page-title {
  /* background-color: rgba(147, 224, 243, 1); */

  justify-content: space-between;
}
h1 {
  text-transform: uppercase;
  font-weight: bolder;
  text-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.page-title img {
  width: 20%;
  /* opacity: 50%; */
}
</style>
