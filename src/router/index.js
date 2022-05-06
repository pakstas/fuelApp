import Vue from "vue";
import VueRouter from "vue-router";
import ViewCars from "../views/ViewCars.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "View Cars",
    component: ViewCars,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      requiresAnon: true,
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      requiresAnon: true,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/addcar",
    name: "Add Car",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "addcar" */ "../views/AddCar.vue"),
  },
  {
    path: "/editcar/:id",
    name: "Edit Car",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "editcar" */ "../views/EditCar.vue"),
  },
  {
    path: "/viewfuel/:id",
    name: "View Fuel",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "viewfuel" */ "../views/ViewFuel.vue"),
  },
  {
    path: "/addfuel/:id",
    name: "Add Fuel",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "addfuel" */ "../views/AddFuel.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && to.matched.some((route) => route.meta.requiresAuth)) {
      next({ path: "/login" });
    } else if (user && to.matched.some((route) => route.meta.requiresAnon)) {
      next({ path: "/" });
    } else {
      next();
    }
  });
});

export default router;
