<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-5">
      <predmeti-kartice
        v-for="predmet in predmeti"
        :key="predmet.id"
        :info="predmet"
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
  name: "naslovna",
  data: function() {
    return {
      predmeti: [],
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

      db.collection("predmet")
        .orderBy("vrijeme_unosa", "asc")
        .get()
        .then((query) => {
          this.predmeti = [];
          query.forEach((doc) => {
            const data = doc.data();

            this.predmeti.push({
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
