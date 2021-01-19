<template>
  <div class="profesor">
    <div class="container.fluid">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-sm">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Ime</th>
                <th scope="col">Prezime</th>
                <th scope="col">Email</th>
                <th scope="col">Predmet</th>
                <th scope="col">Telefon</th>
                <th scope="col">Adresa</th>
              </tr>
            </thead>
            <profesori-kartice
              v-for="profesor in profesor"
              :key="profesor.id"
              :info="profesor"
            />
          </table>
        </div>

        <div class="col-sm">
          <form @submit.prevent="dodajProfesora">
            <div class="form-group">
              <label for="ime">Ime</label>
              <input
                type="text"
                v-model="ime"
                class="form-control"
                id="imeProfesora"
                placeholder="Ime"
              />
            </div>
            <div class="form-group">
              <label for="prezime">Prezime</label>
              <input
                type="text"
                v-model="prezime"
                class="form-control"
                id="prezime"
                placeholder="Prezime"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email adresa</label>
              <input
                type="email"
                v-model="emailProfesora"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <label for="predmet">Predmet</label>
              <input
                type="text"
                v-model="predmet"
                class="form-control"
                id="predmet"
                placeholder="predmet"
              />
            </div>
            <div class="form-group">
              <label for="telefon">Telefon</label>
              <input
                type="number"
                v-model="telefon"
                class="form-control"
                id="telefon"
                placeholder="Telefon"
              />
            </div>
            <div class="form-group">
              <label for="adresa">Adresa</label>
              <input
                type="text"
                v-model="adresa"
                class="form-control"
                id="adresa"
                placeholder="Adresa"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Potvrdi
            </button>
          </form>
        </div>
        <div class="col-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import pohrana_podataka from "@/pohrana_podataka";
import profesori_kartice from "@/components/profesori_kartice";

let brojac = 0;

export default {
  name: "profesor",
  data() {
    return {
      profesor: [],
      korisnik: pohrana_podataka.trenutni_korisnik,
      ime: "",
      prezime: "",
      emailProfesora: "",
      predmet: "",
      telefon: "",
      adresa: "",
      brojac,
    };
  },

  methods: {
    dodajProfesora() {
      db.collection("profesor")
        .add({
          korisnik: this.korisnik,
          ime: this.ime,
          prezime: this.prezime,
          email: this.emailProfesora,
          predmet: this.predmet,
          telefon: this.telefon,
          adresa: this.adresa,
          vrijeme_unosa: Date.now(),
        })
        .then(() => {
          alert("Spremljeno");
          this.ime = "";
          this.prezime = "";
          this.emailProfesora = "";
          this.predmet = "";
          this.telefon = "";
          this.adresa = "";
        })
        .catch(function(e) {
          console.error(e);
        });
    },
  },

  mounted() {
    //dohvat iz Firebasea
    this.dohvati_profesora;
  },
  computed: {
    dohvati_profesora() {
      db.collection("profesor")
        .orderBy("ime", "asc")
        .limit(10)
        .get()
        .then((query) => {
          this.profesor = [];
          brojac = 0;
          query.forEach((doc) => {
            const data = doc.data();
            brojac++;

            this.profesor.push({
              id: doc.id,
              ime: data.ime,
              prezime: data.prezime,
              predmet: data.predmet,
              telefon: data.telefon,
              email: data.email,
              adresa: data.adresa,
              brojac: brojac,
            });
          });
        });
    },
  },
  components: {
    profesori_kartice,
  },
};
</script>
