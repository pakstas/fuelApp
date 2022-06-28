<template>
  <div>
    <div class="page-title">
      <h1 class="title">> {{ this.$route.name }}</h1>
    </div>
    <div class="column is-full" v-if="error">
      <Notification
        v-on:close="error = false"
        v-if="error"
        :type="errorType"
        :message="errorMessage"
      />
    </div>

    <div class="column is-full" v-if="informationTip">
      <Notification
        v-on:close="informationTip = false"
        v-if="informationTip"
        :type="tipBgColor"
        :message="tipMessage"
      />
    </div>

    <div :class="load" class="columns is-multiline fuel-page">
      <div class="column is-full">
        <div class="card">
          <div class="card-content car-title">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">
                  {{
                    car.brand &&
                    car.brand.toUpperCase().slice(0, 1) +
                      car.brand.toLowerCase().slice(1) +
                      " " +
                      car.model.toUpperCase().slice(0, 1) +
                      car.model.toLowerCase().slice(1)
                  }}
                </p>
                <div class="tags are-large">
                  <span class="tag">{{ car.year }}</span>
                  <span class="tag">{{
                    car.fueltype &&
                    car.fueltype.toUpperCase().slice(0, 1) +
                      car.fueltype.toLowerCase().slice(1)
                  }}</span>
                  <span v-if="this.fuelDisplay" class="tag">{{
                    "Fuel average: " + this.fuelAvg() + " l/km"
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-full">
        <div class="card">
          <div class="card-content">
            <h2 class="subtitle">Fuel log</h2>

            <button
              class="button is-dark"
              v-on:click="
                () => {
                  this.$router.push('/addfuel/' + this.carid);
                }
              "
            >
              Add Fuel
            </button>
          </div>
          <div class="card-content">
            <div class="table-container">
              <table class="table is-striped is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Odometer</th>
                    <th>Fuel Filled</th>
                    <th>Price</th>
                    <th>Price/l</th>
                    <th>Trip distance</th>
                    <th>Tank filled</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="gas in allfuelSort" :key="gas.id">
                    <td>{{ translateDate(gas.date) }}</td>
                    <td>{{ gas.odometer + " km" }}</td>
                    <td>{{ gas.fuelqty + " ltr" }}</td>
                    <td>{{ gas.price + " &euro;" }}</td>
                    <td>
                      {{ (gas.price / gas.fuelqty).toFixed(2) + " &euro;" }}
                    </td>
                    <td>{{ getTrip(gas.id) }}</td>
                    <td>{{ gas.tank }}</td>
                    <td>
                      <button
                        class="button is-warning is-small"
                        v-on:click="remFuel(gas.id)"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
  name: "ViewFuel",
  components: { Notification },
  data() {
    return {
      useruid: "",
      carid: "",
      car: "",
      load: "is-loading",
      allfuel: [],
      allfuelSort: [],
      fuelDisplay: false,
      error: false,
      errorMessage: "",
      errorType: "",
      loading: false,
      informationTip: false,
      tipMessage:
        "In order to show fuel consumption average you must have at least 2 full tanks filled.",
      tipBgColor: "is-warning",
    };
  },
  methods: {
    translateDate(item) {
      return item.slice(0, 4) + "-" + item.slice(4, 6) + "-" + item.slice(6, 8);
    },
    fuelAvg() {
      let s = this.allfuelSort;
      let sl = s.filter((t) => t.tank === "full").length;
      let result;
      if (sl > 1) {
        let a = Number(s.findIndex((a) => a.tank === "full"));
        let b = Number(
          s
            .map((t, index) => (t.tank === "full" ? index : ""))
            .filter((x) => x)
            .reverse()[0]
        );
        result = Number(
          (s.slice(a, b).reduce((ac, va) => ac + Number(va.fuelqty), 0) * 100) /
            (s[a].odometer - s[b].odometer)
        ).toFixed(2);
        result.toLowerCase() === result.toUpperCase()
          ? (this.fuelDisplay = true)
          : (this.fuelDisplay = false);
        return result;
      } else if (sl === 1) {
        this.fuelDisplay = false;
        this.informationTip = true;
      } else {
        this.fuelDisplay = false;
        this.informationTip = true;
      }
    },
    getTrip(gid) {
      let tempA = this.allfuelSort.findIndex((a) => a.id === gid);
      let tempB =
        tempA < this.allfuelSort.length - 1
          ? tempA + 1
          : tempA; /* check if index is not the first full tank */
      let tempC =
        Number(this.allfuelSort[tempA].odometer) -
        Number(this.allfuelSort[tempB].odometer);
      return tempC + " km";
    },
    remFuel(item) {
      firebase
        .firestore()
        .collection("users")
        .doc(this.useruid)
        .collection("cars")
        .doc(this.carid)
        .collection("fuel")
        .doc(item)
        .delete()
        .then(() => {
          this.error = true;
          this.errorType = "is-danger";
          this.errorMessage = "Fuel log entry was successfully removed.";
          this.loading = false;
          this.allfuelSort = this.allfuelSort.filter((a) => a.id !== item);
        })
        .catch((error) => {
          this.error = true;
          this.errorType = "is-danger";
          this.errorMessage = error.message;
          this.loading = false;
        });
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
      .then((doc) => {
        this.car = doc.data();
      })
      .then(() => {
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
              this.allfuel.push({
                id: doc.id,
                odometer: doc.data().odometer,
                fueltype: doc.data().fueltype,
                fuelqty: doc.data().fuelqty,
                price: doc.data().price,
                date: doc.data().date,
                tank: doc.data().tank,
              });
            })
          )
          .then(() => {
            this.allfuelSort = this.allfuel.sort(
              (a, b) => b.odometer - a.odometer
            );
          })
          .then(() => this.fuelAvg());
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

.columns {
  justify-content: space-evenly;
  margin: 0px;
}

div .card {
  border-radius: 5px;
}

.columns:last-child {
  margin-bottom: 0px;
}

.fuel-page {
  padding-bottom: 32px;
}

.media-content {
  min-height: 100px;
}
</style>
