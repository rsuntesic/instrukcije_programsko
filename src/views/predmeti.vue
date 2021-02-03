<template>
  <div class="predemti">
    <div class="container.fluid">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form @submit.prevent="dodajZahtjev">
            <div class="form-group">
              <label for="odaberipredmet"><h2>Odaberi predmet</h2></label>
              <select
                class="form-control"
                id="odaberipredmet"
                type="text"
                v-model="odaberiPredmet"
              >
                <option> Fizika </option>
                <option> Matematika </option>
                <option> Kemija </option>
                <option> Infromatika </option>
                <option> Engleski jezik </option>
                <option> Njemacki jezik </option>
              </select>
            </div>
            <div class="form-group">
              <label for="razinaZnanja"><h3>Razina znanja</h3></label>
              <select
                class="form-control"
                id="razinaZnanja"
                type="text"
                v-model="razinaZnanja"
              >
                <option> Pocetni </option>
                <option> Srednji </option>
                <option> Napredni </option>
              </select>
            </div>
            <div class="form-group">
              <label for="Datum">Datum</label>
              <input
                type="date"
                v-model="Datum"
                class="form-control"
                id="Datum"
                placeholder="Datum"
              />
            </div>
            <div class="form-group">
              <label for="Vrijeme">Vrijeme</label>
              <input
                type="time"
                v-model="Vrijeme"
                class="form-control"
                id="Vrijeme"
                placeholder="Vrijeme"
              />
            </div>
            <button type="submit" class="btn btn-primary">
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
import { db } from "@/firebase";
import pohrana_podataka from "@/pohrana_podataka";

export default {
  name: "predemti",
  data() {
    return {
      korisnik: pohrana_podataka.trenutni_korisnik,
      odaberiPredmet: "",
      razinaZnanja: "",
      Datum: "",
      Vrijeme: "",
    };
  },

  methods: {
    dodajZahtjev() {
      if (
        this.odaberiPredmet != "" &&
        this.razinaZnanja != "" &&
        this.Datum != "" &&
        this.Vrijeme != ""
      ) {
        db.collection("zahtjevi")
          .add({
            korisnik: this.korisnik,
            odaberiPredmet: this.odaberiPredmet,
            razinaZnanja: this.razinaZnanja,
            Datum: this.Datum,
            Vrijeme: this.Vrijeme,
            vrijeme_unosa: Date.now(),
          })
          .then(() => {
            alert("Spremljeno");
            this.odaberiPredmet = "";
            this.razinaZnanja = "";
            this.Datum = "";
            this.Vrijeme = "";
          })
          .catch(function(e) {
            console.error(e);
          });
      } else {
        alert("Neki od obaveznih podataka nije unesen!!");
      }
    },
  },
};
</script>
