<template>
  <header>
    <div class="wrapper">
      <div class="nav">
        <img src="../assets/img/Fuel_Logo.png" alt="Company logo" />

        <nav>
          <span>
            <router-link to="/register">Register</router-link>
            <router-link to="/login">Login</router-link>
          </span>
        </nav>
      </div>
      <div class="page-title">
        <h1 class="title">{{ this.$route.name }}</h1>
      </div>
    </div>
  </header>
</template>

<script>
/* eslint-disable */
export default {
  name: "Header",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  background: rgb(147, 224, 243);
  border-radius: 0px 0px 5px 5px;
}

.nav img {
  height: 40px;
}

.nav a {
  text-decoration: none;
  color: rgb(0, 0, 0);
  margin-right: 5px;
  margin-left: 10px;
}
.nav a:hover {
  text-decoration: underline;
}

.nav a:last-child {
  margin-right: 0px;
}

nav {
  display: flex;
  justify-content: space-between;
}

.wrapper .page-title {
  height: 200px;
  padding: 5px;
  display: flex;
  align-items: center;
}
</style>
