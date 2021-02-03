<template>
  <div class="card text-center">
    <div class="card-header">{{ info.odaberipredmet }}</div>
    <div class="card-body p-0">
      {{ info.vrijeme + " " + info.datum }}
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
  computed: {
    postedFromNow() {
      return moment(this.info.vrijeme_dodavanja).fromNow();
    },
  },
};
</script>
