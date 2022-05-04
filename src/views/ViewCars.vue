<template>
  <div class="columns is-multiline">
    <div v-if="cars.length !== 0">
      <div
        class="column is-one-third-desktop is-half-tablet"
        v-for="car in cars"
        :key="car.id"
      >
        <div class="card">
          <div class="card-content car-title">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">
                  {{
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
                    car.fueltype.toUpperCase().slice(0, 1) +
                    car.fueltype.toLowerCase().slice(1)
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="car.image" :alt="car.brand" />
            </figure>
          </div>

          <footer class="card-footer">
            <router-link :to="'/viewfuel/' + car.id" class="card-footer-item"
              >Fuel Log</router-link
            >
            <router-link :to="'/editCar/' + car.id" class="card-footer-item"
              >Edit Car</router-link
            >
          </footer>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="addcar-rows">
        <span>You haven't added any cars, please start by adding one.</span>
        <router-link to="/addcar"
          ><button class="button is-dark">Add Car</button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  name: "ViewCars",
  components: {},
  data() {
    return {
      cars: [],
      useruid: "",
    };
  },
  methods: {},
  beforeMount() {
    this.useruid = localStorage.getItem("userid");

    firebase
      .firestore()
      .collection("users")
      .doc(this.useruid)
      .collection("cars")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) => {
          this.cars.push({
            id: doc.id,
            image: doc.data().image,
            brand: doc.data().brand,
            model: doc.data().model,
            year: doc.data().year,
            fueltype: doc.data().fueltype,
          });
        })
      )
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped>
.columns {
  justify-content: space-evenly;
  margin: 0px;
}

div > .card {
  border-radius: 10px;
}

.columns:last-child {
  margin-bottom: 0px;
}

.card-content > div.content {
  margin-bottom: 0px;
}

.addcar-rows {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.addcar-rows > span {
  margin-bottom: 32px;
}
</style>
