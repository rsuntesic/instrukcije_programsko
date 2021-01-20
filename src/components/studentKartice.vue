<template>
  <tbody>
    <tr>
      <th scope="row">{{ info.brojac }}</th>
      <td>{{ info.ime }}</td>
      <td>{{ info.prezime }}</td>
      <td>{{ info.email }}</td>
      <td>{{ info.jmbag }}</td>
    </tr>
  </tbody>
</template>
<script>
export default {
  props: ["info"],
  name: "studentKartice",
};
</script>
