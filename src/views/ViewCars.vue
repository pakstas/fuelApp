<template>
  <div>
    <div class="page-title">
      <h1 class="title">> {{ this.$route.name }}</h1>
    </div>
    <div class="columns is-multiline cars-page" v-if="cars.length !== 0">
      <div
        class="column is-one-third-desktop is-half-tablet"
        v-for="car in cars"
        :key="car.id"
      >
        <div class="card">
          <div class="card-content car-title">
            <div class="media-content">
              <!-- <div class="media-content"> -->
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
              <!-- </div> -->
            </div>
          </div>

          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="car.image" :alt="car.brand" />
            </figure>
          </div>

          <footer class="card-footer">
            <router-link :to="'/viewfuel/' + car.id" class="card-footer-item"
              ><i class="fas fa-pull-left fa-gas-pump"></i> Fuel
              Log</router-link
            >
            <router-link :to="'/editCar/' + car.id" class="card-footer-item"
              ><i class="fas fa-pull-left fa-edit"></i> Edit Car</router-link
            >
          </footer>
        </div>
      </div>
    </div>
    <div v-if="cars.length === 0 && carsImported">
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
      carsImported: false,
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
      .then(() => (this.carsImported = true))
      .catch((error) => console.log(error));
  },
  computed: {},
};
</script>

<style scoped>
.page-title {
  height: 200px;
  padding: 10px;
  display: flex;
  align-items: center;

  /* background-color: rgba(147, 224, 243, 1); */
}
.cars-page {
  /* background-color: rgba(255, 255, 255, 0.75); */
  min-height: calc(100vh - 309px);
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

div > .card {
  border-radius: 10px;
}

.card:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.columns:last-child {
  margin-bottom: 0px;
}

.card-footer > a {
  color: rgb(68, 68, 68);
}
.card-footer > a:hover {
  color: black;
  background-color: rgba(0, 0, 0, 0.05);
}

.addcar-rows {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.addcar-rows > span {
  margin-bottom: 32px;
}

@media screen and (max-width: 768px) {
  .media-content {
    height: 100px;
  }
}
</style>
