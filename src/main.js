import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./services/firebase";
import "normalize.css";
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
