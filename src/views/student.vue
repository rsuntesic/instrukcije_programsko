<template>
  <div class="student">
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
                <th scope="col">Jmbag</th>
              </tr>
            </thead>
            <student-kartice
              v-for="student in student"
              :key="student.id"
              :info="student"
            />
          </table>
          <button
            v-on:click="dohvati_iz_baze"
            type="submit"
            class="btn btn-primary"
          >
            Osvježi
          </button>
        </div>

        <div class="col-sm">
          <form @submit.prevent="dodajStudenta">
            <div class="form-group">
              <label for="ime">Ime</label>
              <input
                type="text"
                v-model="ime"
                class="form-control"
                id="imeStudenta"
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
                v-model="emailStudent"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <label for="Jmbag">Jmbag</label>
              <input
                type="number"
                v-model="jmbag"
                class="form-control"
                id="Jmbag"
                placeholder="Jmbag"
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
import studentKartice from "@/components/studentKartice";

let brojac = 0;

export default {
  name: "student",
  data() {
    return {
      student: [],
      korisnik: pohrana_podataka.trenutni_korisnik,
      ime: "",
      prezime: "",
      emailStudent: "",
      jmbag: "",
      brojac,
    };
  },

  methods: {
    dohvati_iz_baze() {
      db.collection("student")
        .orderBy("ime", "asc")
        .limit(50)
        .get()
        .then((query) => {
          this.student = [];
          brojac = 0;
          query.forEach((doc) => {
            const data = doc.data();
            brojac++;

            this.student.push({
              id: doc.id,
              ime: data.ime,
              prezime: data.prezime,
              email: data.email,
              jmbag: data.jmbag,
              brojac: brojac,
            });
          });
        });
    },
    dodajStudenta() {
      if (
        this.ime != "" &&
        this.prezime != "" &&
        this.email != "" &&
        this.predmet != "" &&
        this.jmbag != ""
      ) {
        db.collection("student")
          .add({
            korisnik: this.korisnik,
            ime: this.ime,
            prezime: this.prezime,
            email: this.emailStudent,
            jmbag: this.jmbag,
            vrijeme_unosa: Date.now(),
          })
          .then(() => {
            alert("Spremljeno");
            this.ime = "";
            this.prezime = "";
            this.emailStudent = "";
            this.jmbag = "";
          })
          .catch(function(e) {
            console.error(e);
          });
      } else {
        alert("Neki od obaveznih podataka nije unesen!!");
      }
    },
  },

  mounted() {
    //dohvat iz Firebasea
    this.dohvati_studenta;
  },
  computed: {
    dohvati_studenta() {
      db.collection("student")
        .orderBy("ime", "asc")
        .limit(10)
        .get()
        .then((query) => {
          this.student = [];
          brojac = 0;
          query.forEach((doc) => {
            const data = doc.data();
            brojac++;

            this.student.push({
              id: doc.id,
              ime: data.ime,
              prezime: data.prezime,
              jmbag: data.jmbag,
              email: data.email,
              brojac: brojac,
            });
          });
        });
    },
  },
  components: {
    studentKartice,
  },
};
</script>
