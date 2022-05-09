<template>
  <div>
    <div class="page-title">
      <h1 class="title">> {{ this.$route.name }}</h1>
    </div>
    <div class="add-car">
      <div class="column is-full" v-if="error">
        <Notification
          v-on:close="error = false"
          v-if="error"
          :type="errorType"
          :message="errorMessage"
        />
      </div>
      <div
        class="column is-half-desktop is-two-thirds-tablet is-four-fifths-mobile"
      >
        <form v-on:submit.prevent="addCar()">
          <div class="field">
            <div class="field-body">
              <div class="field">
                <label class="label">Car Brand</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="brand"
                    placeholder="e.g. Audi"
                    required
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Car model</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="model"
                    placeholder="e.g. A6"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="field-body">
              <div class="field">
                <label class="label">Car year</label>
                <div class="control">
                  <input
                    class="input"
                    type="number"
                    v-model="year"
                    min="1900"
                    max="2050"
                    placeholder="e.g. 1997"
                    required
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Fuel type</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="fueltype">
                      <option value="diesel">Diesel</option>
                      <option value="petrol" selected>Petrol</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Car image</label>
            <div class="control">
              <input
                class="input"
                type="url"
                v-model="image"
                placeholder="e.g. http://www.google.lt/images/audi.jpg"
                required
              />
            </div>
          </div>

          <div class="control">
            <button
              class="button is-dark"
              :class="loading && 'is-loading'"
              type="submit"
            >
              Add Car!
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Notification from "../components/Notification";

export default {
  name: "AddCar",
  components: { Notification },
  data() {
    return {
      fueltype: "petrol",
      brand: "",
      model: "",
      image: "",
      year: "",
      error: false,
      errorMessage: "",
      errorType: "",
      loading: false,
    };
  },
  methods: {
    addCar() {
      this.loading = true;
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("cars")
        .add({
          brand: this.brand,
          model: this.model,
          year: Number(this.year),
          fueltype: this.fueltype,
          image: this.image,
        })
        .then(() => {
          this.loading = false;
          this.$router.push("/");
        })
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
.page-title {
  height: 200px;
  padding: 10px;
  display: flex;
  align-items: center;
}

h1 {
  text-transform: uppercase;
  font-weight: bolder;
  text-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
form {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
}
.add-car {
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 32px;
}
</style>
