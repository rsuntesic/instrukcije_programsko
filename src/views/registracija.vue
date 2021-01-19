<template>
  <div class="signUp">
    <h1>Registriraj se</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="email">Email adresa</label>
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
            <div class="form-group">
              <label for="lozinka2">Ponovi lozinku</label>
              <input
                type="password"
                v-model="ponoviLozinku"
                class="form-control"
                id="lozinka2"
                placeholder="Lozinka"
              />
            </div>
            <button type="button" @click="registracija" class="btn btn-primary">
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
  name: "registracija",
  data() {
    return {
      korisnik: "",
      lozinka: "",
      ponoviLozinku: "",
    };
  },

  methods: {
    registracija() {
      if (this.lozinka === this.ponoviLozinku) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.korisnik, this.lozinka)
          .then(function() {
            console.log("Uspješna registracija");
          })
          .catch(function(error) {
            alert(error);
          });
      } else {
        alert("Lozinka i ponovljena lozinka moraju biti identične.");
      }

      console.log("Nastavak");
    },
  },
};
</script>
