<template>
  <div>
    <div class="page-title">
      <h1 class="title">> {{ this.$route.name }}</h1>
    </div>
    <div class="edit-car">
      <div class="column is-one-third-desktop is-half-tablet">
        <form v-on:submit.prevent="editCar()">
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
              <div class="select">
                <select v-model="fueltype">
                  <option value="diesel">Diesel</option>
                  <option value="petrol" selected>Petrol</option>
                </select>
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
            <button class="button is-dark" type="submit">Save Changes</button>
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

export default {
  name: "EditCar",
  data() {
    return {
      fueltype: "petrol",
      brand: "",
      model: "",
      image: "",
      year: "",
      carid: "",
      useruid: "",
    };
  },
  methods: {
    editCar() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("cars")
        .doc(this.carid)
        .update({
          brand: this.brand,
          model: this.model,
          year: Number(this.year),
          fueltype: this.fueltype,
          image: this.image,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => alert(error));
    },
  },
  beforeMount() {
    this.useruid = localStorage.getItem("userid");
    this.carid = this.$route.params.id;
    firebase
      .firestore()
      .collection("users")
      .doc(this.useruid)
      .collection("cars")
      .doc(this.carid)
      .get()
      .then((snapshot) => {
        this.brand = snapshot.data().brand;
        this.fueltype = snapshot.data().fueltype;
        this.image = snapshot.data().image;
        this.model = snapshot.data().model;
        this.year = snapshot.data().year;
      })
      .catch((error) => console.log(error));
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
.edit-car {
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 32px;
}
</style>
