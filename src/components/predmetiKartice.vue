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
  </div>
</template>

<script>
import moment from "moment";
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
    };
  },

  computed: {
    postedFromNow() {
      return moment(this.info.vrijeme_dodavanja).fromNow();
    },
  },
};
</script>
