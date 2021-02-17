<template>
  <div class="card text-center">
    <div class="card-header">{{ info.odaberipredmet }}</div>
    <div class="card-body p-0">
      <template v-if="info.odaberipredmet === 'Fizika'">
        <img src="@/assets/fizika.jpg" />
      </template>

      <template v-else-if="info.odaberipredmet === 'Matematika'">
        <img src="@/assets/matematika.jpg" />
      </template>

      <template v-else-if="info.odaberipredmet === 'Kemija'">
        <img src="@/assets/kemija.jpg" />
      </template>

      <template v-else-if="info.odaberipredmet === 'Informatika'">
        <img src="@/assets/informatika.jpg" />
      </template>

      <template v-else-if="info.odaberipredmet === 'Engleski jezik'">
        <img src="@/assets/engleski.jpg" />
      </template>

      <template v-else-if="info.odaberipredmet === 'Njemacki jezik'">
        <img src="@/assets/njemacki.jpg" />
      </template>

      <template v-else> <img src="@/assets/logo.png" /> </template>
    </div>
    <div class="card-body p-0">
      {{ "Vrijeme: " + info.vrijeme }}
    </div>
    <div class="card-body p-0">
      {{ "Datum: " + info.datum }}
    </div>
    <div class="card-footer text-muted">
      {{ postedFromNow }}
      <br />
      {{ info.korisnik }}
    </div>
    <button
      v-on:click="potvdriInstrukcije"
      v-if="info.potvrda == false"
      type="submit"
      class="btn btn-primary"
    >
      Potvrdi
    </button>
  </div>
</template>

<script>
import moment from "moment";
import { db } from "@/firebase";
import pohrana_podataka from "@/pohrana_podataka";
import router from "@/router";
export default {
  props: ["info"],
  name: "PredmetiKartice",
  data() {
    return {
      fizika: "Fizika",
      matematika: "Matematika",
      kemija: "Kemija",
      informatika: "Informatika",
      engleski: "Engleski",
      njemacki: "Njemacki",
      korisnik: pohrana_podataka.trenutni_korisnik,
    };
  },
  methods: {
    potvdriInstrukcije() {
      if (pohrana_podataka.student != "") {
        db.collection("predmeti")
          .doc(this.info.id)
          .update({
            student: this.korisnik,
            potvrda: true,
          })
          .then(function() {
            alert("Poslan je zahtjev");
            location.reload();
          })
          .catch(function(error) {
            console.log("Greška kod zahtjeva: " + error);
          });
      } else {
        db.collection("zahtjevi")
          .doc(this.info.id)
          .update({
            profesor: this.korisnik,
            potvrda: true,
          })
          .then(function() {
            alert("Poslan je zahtjev");
            location.reload();
          })
          .catch(function(error) {
            console.log("Greška kod zahtjeva: " + error);
          });
      }
    },
  },

  computed: {
    postedFromNow() {
      return moment(this.info.vrijeme_dodavanja).fromNow();
    },
  },
};
</script>
