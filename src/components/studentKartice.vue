<template>
  <tbody>
    <tr>
      <th scope="row">{{ info.brojac }}</th>
      <td>{{ info.ime }}</td>
      <td>{{ info.prezime }}</td>
      <td>{{ info.email }}</td>
      <td>{{ info.jmbag }}</td>
      <button v-on:click="obrisiStudenta" type="submit" class="btn btn-primary">
        x
      </button>
    </tr>
  </tbody>
</template>
<script>
import { db } from "@/firebase";
export default {
  props: ["info"],
  name: "studentKartice",
  data() {
    return {
      id: "",
    };
  },
  methods: {
    obrisiStudenta() {
      let n = confirm("Želite li uistinu obrisati taj podatak");
      console.log("obrisi");
      if (n == true) {
        db.collection("student")
          .doc(this.info.id)
          .delete()
          .then(function() {
            alert("Podatak je uspješno obrisan.");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      } else {
        alert("Podatak nije obrisan.");
      }
    },
  },
};
</script>
