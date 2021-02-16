<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-5">
      <predmeti-kartice
        v-for="zahtjev in zahtjevi"
        :key="zahtjev.id"
        :info="zahtjev"
        class="card"
      />
    </div>
    <div class="col-5"></div>
    <div class="col-1"></div>
  </div>
</template>

<script>
import pohrana_podataka from "@/pohrana_podataka";
import { db } from "@/firebase";
import predmetiKartice from "@/components/predmetiKartice";

export default {
  name: "zahtjevi_instrukcija",
  data: function() {
    return {
      zahtjevi: [],
      pohrana_podataka,
    };
  },
  mounted() {
    //dohvat iz Firebasea
    this.dohvati_predmete;
  },
  computed: {
    dohvati_predmete() {
      console.log("Firebase dohvat");

      db.collection("zahtjevi")
        .orderBy("vrijeme_unosa", "asc")
        .get()
        .then((query) => {
          this.zahtjevi = [];
          query.forEach((doc) => {
            const data = doc.data();

            this.zahtjevi.push({
              potvrda: data.potvrda,
              id: doc.id,
              datum: data.Datum,
              vrijeme: data.Vrijeme,
              korisnik: data.korisnik,
              odaberipredmet: data.odaberiPredmet,
              razinaznanja: data.razinaZnanja,
              vrijeme_dodavanja: data.vrijeme_unosa,
            });
          });
        });
    },
  },
  components: {
    predmetiKartice,
  },
};
</script>
