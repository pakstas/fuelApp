<template>
  <div>
    <div class="page-title">
      <h1 class="title">> {{ this.$route.name }}</h1>
    </div>

    <div class="add-fuel">
      <div class="column is-one-third-desktop is-half-tablet">
        <form v-on:submit.prevent="addFuel()">
          <div class="field">
            <label class="label">Date</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="date"
                placeholder="e.g. 2022-05-05"
                minlength="12"
                maxlength="12"
                disabled
                required
              />
            </div>
            <p class="help">
              Last date:
              {{
                lastlog.length !== 0
                  ? translateDate(lastlog[0].date)
                  : "No records yet"
              }}
            </p>
          </div>

          <div class="field">
            <label class="label">Odometer</label>
            <div class="field has-addons">
              <div class="control">
                <input
                  class="input"
                  type="number"
                  v-model="odometer"
                  placeholder="e.g. 2500"
                  min="0"
                  required
                />
              </div>
              <div class="control">
                <a class="button is-static">km</a>
              </div>
            </div>
            <p class="help">
              Last odometer: {{ lastlog.length !== 0 ? lastlog[0].km : "0" }} km
            </p>
          </div>

          <div class="field">
            <label class="label">Fuel Quantity</label>
            <div class="field has-addons">
              <div class="control">
                <input
                  class="input"
                  type="number"
                  step="0.01"
                  min="0"
                  v-model="fuelqty"
                  placeholder="e.g. 42.24"
                  required
                />
              </div>
              <div class="control">
                <a class="button is-static">ltr</a>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Fuel Price</label>
            <div class="field has-addons">
              <div class="control">
                <input
                  class="input"
                  type="number"
                  step="0.01"
                  min="0"
                  v-model="price"
                  placeholder="e.g. 42.24"
                  required
                />
              </div>
              <div class="control">
                <a class="button is-static">&euro;</a>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Filled tank</label>
            <div class="control">
              <div class="select">
                <select v-model="tank" required>
                  <option value="full">Full</option>
                  <option value="partial">Part full</option>
                </select>
              </div>
            </div>
          </div>

          <div class="control">
            <button class="button is-dark" type="submit">Add Fuel!</button>
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
  name: "AddFuel",
  data() {
    return {
      useruid: "",
      carid: "",
      fuelqty: "",
      odometer: "",
      date: "",
      price: "",
      tank: "",
      lastlog: [],
    };
  },
  methods: {
    translateDate(item) {
      return item.slice(0, 4) + "-" + item.slice(4, 6) + "-" + item.slice(6, 8);
    },
    todayDate() {
      let a = new Date();
      let year = a.getFullYear().toString();
      let month =
        a.getMonth().toString().length === 1
          ? "0" + a.getMonth().toString()
          : a.getMonth().toString();
      let day =
        a.getDate().toString().length === 1
          ? "0" + a.getDate().toString()
          : a.getDate().toString();
      let hours =
        a.getHours().toString().length === 1
          ? "0" + a.getHours().toString()
          : a.getHours().toString();
      let minutes =
        a.getMinutes().toString().length === 1
          ? "0" + a.getMinutes().toString()
          : a.getMinutes().toString();
      return year + month + day + hours + minutes;
    },
    addFuel() {
      firebase
        .firestore()
        .collection("users")
        .doc(this.useruid)
        .collection("cars")
        .doc(this.carid)
        .collection("fuel")
        .add({
          date: this.date,
          fuelqty: Number(this.fuelqty).toFixed(2),
          price: Number(this.price).toFixed(2),
          tank: this.tank,
          odometer: Number(this.odometer).toFixed(0),
        })
        .then(() => {
          alert("Fuel added");
          this.$router.push("/viewfuel/" + this.carid);
        })
        .catch((error) => alert(error));
    },
  },
  beforeMount() {
    this.date = this.todayDate();
    this.useruid = localStorage.getItem("userid");
    this.carid = this.$route.params.id;
    firebase
      .firestore()
      .collection("users")
      .doc(this.useruid)
      .collection("cars")
      .doc(this.carid)
      .collection("fuel")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) => {
          this.lastlog.push({
            id: doc.id,
            km: doc.data().odometer,
            date: doc.data().date,
          });
        })
      )
      .then(() => {
        let lastlogSort = this.lastlog.sort((a, b) => b.km - a.km);
        this.lastlog = lastlogSort;
      });
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
.add-fuel {
  display: flex;
  justify-content: space-evenly;
}
</style>
