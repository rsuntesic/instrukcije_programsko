<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="pohrana_podataka.trenutni_korisnik" to="/"
        >Home</router-link
      >
      |
      <router-link v-if="pohrana_podataka.trenutni_korisnik" to="/profesor"
        >Profesor</router-link
      >
      <router-link v-if="pohrana_podataka.trenutni_korisnik" to="/student"
        >Student</router-link
      >
      <router-link v-if="pohrana_podataka.trenutni_korisnik" to="/predmet"
        >Predmet</router-link
      >

      <router-link v-if="!pohrana_podataka.trenutni_korisnik" to="/registracija"
        >Registracija</router-link
      >

      <router-link v-if="!pohrana_podataka.trenutni_korisnik" to="/prijava"
        >Prijava</router-link
      >
      |

      <a
        href="#"
        v-if="pohrana_podataka.trenutni_korisnik"
        @click.prevent="odjava"
        class="nav-link"
        >Logout
      </a>
    </div>
    <router-view />
  </div>
</template>

<script>
import pohrana_podataka from "@/pohrana_podataka.js";
import { firebase } from "@/firebase";
import router from "@/router";

firebase.auth().onAuthStateChanged((user) => {
  const currentRoute = router.currentRoute;

  if (user) {
    //user is signed in.
    console.log("***" + user.email);
    pohrana_podataka.trenutni_korisnik = user.email;

    /* if (!currentRoute.meta.needsUser) {
      router.push({ name: "Home" });
    } */
  } else {
    //user is not signed in.
    console.log("***No user");
    pohrana_podataka.trenutni_korisnik = null;

    if (currentRoute.meta.needsUser) {
      router.push({ name: "prijava" });
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
          this.$router.push({ name: "prijava" });
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
