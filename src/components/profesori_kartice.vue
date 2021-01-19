<template>
  <tbody>
    <tr>
      <th scope="row">{{ info.brojac }}</th>
      <td>{{ info.ime }}</td>
      <td>{{ info.prezime }}</td>
      <td>{{ info.email }}</td>
      <td>{{ info.predmet }}</td>
      <td>{{ info.telefon }}</td>
      <td>{{ info.adresa }}</td>
    </tr>
  </tbody>
</template>
<script>
export default {
  props: ["info"],
  name: "profesori_kartice",
};
</script>
