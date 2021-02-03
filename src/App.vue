<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-sm navbar-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="pohrana_podataka.trenutni_korisnik"
              to="/naslovna"
              >Naslovna stranica</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="pohrana_podataka.profesor"
              to="/zahtjevi_instrukcija"
              >Zahtjevi za instrukcije</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="pohrana_podataka.profesor"
              to="/profesor"
              >Profesor</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="pohrana_podataka.profesor"
              to="/student"
              >Student</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="pohrana_podataka.trenutni_korisnik"
              to="/predmeti"
              >Predmeti</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="!pohrana_podataka.trenutni_korisnik"
              to="/registracija"
              >Registracija</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="!pohrana_podataka.trenutni_korisnik"
              to="/prijava"
              >Prijava</router-link
            >
          </li>
          <li class="nav-item">
            <a
              href="#"
              v-if="pohrana_podataka.trenutni_korisnik"
              @click.prevent="odjava"
              class="nav-link"
              >Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import pohrana_podataka from "@/pohrana_podataka.js";
import { firebase } from "@/firebase";
import router from "@/router";
import { db } from "@/firebase";

firebase.auth().onAuthStateChanged((user) => {
  const currentRoute = router.currentRoute;

  if (user) {
    //user is signed in.
    console.log("***" + user.email);
    pohrana_podataka.trenutni_korisnik = user.email;
    db.collection("profesor")
      .where("email", "==", pohrana_podataka.trenutni_korisnik)
      .get()
      .then((query) => {
        query.forEach((doc) => {
          const data = doc.data();
          pohrana_podataka.profesor = pohrana_podataka.trenutni_korisnik;
          console.log(pohrana_podataka.profesor);
        });
      });
    db.collection("student")
      .where("email", "==", pohrana_podataka.trenutni_korisnik)
      .get()
      .then((query) => {
        query.forEach((doc) => {
          const data = doc.data();
          pohrana_podataka.student = pohrana_podataka.trenutni_korisnik;
          console.log(pohrana_podataka.student);
        });
      });

    if (!currentRoute.meta.needsUser) {
      router.push({ name: "naslovna" });
    }
  } else {
    //user is not signed in.
    console.log("***No user");
    pohrana_podataka.trenutni_korisnik = null;
    pohrana_podataka.profesor = null;
    pohrana_podataka.student = null;

    if (currentRoute.meta.needsUser) {
      router.push({ name: "Prijava" });
    }
  }
});

export default {
  name: "app",
  data() {
    //funkcija
    return {
      //objekt
      pohrana_podataka: pohrana_podataka,
    };
  },

  methods: {
    odjava() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Prijava" });
          pohrana_podataka.profesor = null;
          pohrana_podataka.student = null;
        });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
