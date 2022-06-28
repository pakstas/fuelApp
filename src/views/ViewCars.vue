<template>
  <div>
    <div class="page-title">
      <h1 class="title">> {{ this.$route.name }}</h1>
    </div>
    <div class="cars-search">
      <div
        class="field has-addons has-addons-centered"
        v-if="carsData.length !== 0"
      >
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Find a car by name"
            v-model="searchQuery"
            v-on:keyup.enter="searchCar(searchQuery)"
          />
        </div>
        <div class="control">
          <a class="button is-dark" v-on:click="searchCar(searchQuery)">
            Search
          </a>
        </div>
      </div>
    </div>

    <div class="section" v-if="cars.length !== 0">
      <div
        class="card"
        v-for="car in cars"
        :key="car.id"
        v-show="cars.indexOf(car) < carsBreakpoint"
      >
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
            <img
              :src="
                car.image
                  ? car.image
                  : 'https://images.unsplash.com/photo-1498887960847-2a5e46312788?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3869&q=80'
              "
              :alt="car.brand"
            />
          </figure>
        </div>

        <footer class="card-footer">
          <router-link :to="'/viewfuel/' + car.id" class="card-footer-item"
            ><i class="fas fa-pull-left fa-gas-pump"></i> Fuel Log</router-link
          >
          <router-link :to="'/editcar/' + car.id" class="card-footer-item"
            ><i class="fas fa-pull-left fa-edit"></i> Edit Car</router-link
          >
        </footer>
      </div>
    </div>

    <div class="show-more" v-if="carsBreakpoint < cars.length">
      <button
        class="button is-dark"
        type="button"
        v-on:click="carsBreakpoint += 6"
      >
        Show more cars..
      </button>
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
      carsData: [],
      cars: [],
      carsImported: false,
      useruid: "",
      carsBreakpoint: 6,
      searchQuery: "",
    };
  },
  methods: {
    searchCar(search) {
      let searchLowerCase = search.toLowerCase();
      this.cars = this.carsData.filter(
        (car) =>
          car.brand.toLowerCase().search(searchLowerCase) === 0 ||
          car.model.toLowerCase().search(searchLowerCase) === 0
      );
    },
  },
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
          this.carsData.push({
            id: doc.id,
            image: doc.data().image,
            brand: doc.data().brand,
            model: doc.data().model,
            year: doc.data().year,
            fueltype: doc.data().fueltype,
          });
        })
      )
      .then(() => {
        this.carsImported = true;
        this.cars = this.carsData;
      })
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
}

h1 {
  text-transform: uppercase;
  font-weight: bolder;
  text-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.section {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0px;
}

.card {
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  transition: 0.25s;
}

.card:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.card:hover > .delete-button {
  display: block;
}

.card-footer > a {
  color: rgb(68, 68, 68);
  transition: 0.25s;
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
  padding-bottom: 2rem;
}

.section {
  padding: 0.75rem;
}

.cars-page {
  padding-bottom: 2rem;
}

.show-more {
  text-align: center;
  padding: 0rem 2rem 2rem;
}

.cars-search {
  margin-bottom: 2rem;
}

.cars-search input,
input:hover {
  border: none;
  outline: none;
}

.cars-search input:focus {
  box-shadow: none;
}

@media screen and (max-width: 768px) {
  .media-content {
    height: 100px;
  }
  .card {
    width: 100%;
  }
}

@media screen and (min-width: 769px) {
  .card {
    width: calc((100% - 2rem) / 2);
  }
}

@media screen and (min-width: 1081px) {
  .card {
    width: calc((100% - 4rem) / 3);
  }
}
</style>
