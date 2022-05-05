<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <Header />
        <router-view />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
body {
  background-image: url("./assets/img/bg_car.jpg");
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
}
</style>
<style scoped>
.container > .main {
  min-height: calc(100vh - 50px);
  width: 100%;
  /* background: rgb(255, 255, 255, 0.8); */
}
</style>
