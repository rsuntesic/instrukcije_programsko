<template>
  <div class="login">
    <h1>Logiranje korisnika</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="email1">Email adresa</label>
              <input
                type="email"
                v-model="korisnik"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
              <small id="emailHelp" class="form-text text-muted"
                >Vaš email je siguran s nama.</small
              >
            </div>
            <div class="form-group">
              <label for="lozinka1">Lozinka</label>
              <input
                type="password"
                v-model="lozinka"
                class="form-control"
                id="lozinka1"
                placeholder="Lozinka"
              />
            </div>
            <button type="button" @click="prijava" class="btn btn-primary">
              Potvrdi
            </button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { firebase } from "@/firebase.js";
export default {
  name: "prijava",
  data() {
    return {
      korisnik: "",
      lozinka: "",
    };
  },

  methods: {
    prijava() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.korisnik, this.lozinka)
        .then((resault) => {
          console.log("Uspješna prijava", resault);
        })
        .catch(function(e) {
          console.error("Došlo je do pogreške", e);
        });

      console.log("Nastavak");
    },
  },
};
</script>
