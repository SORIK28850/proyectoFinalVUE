<template>
  <v-container>
    <carrusel-home></carrusel-home>
    <v-container style="height: 100px"></v-container>
    <CardSomos></CardSomos>
  </v-container>
</template>

<script>
// @ is an alias to /src

import CarruselHome from "../components/home/CarruselHome";
import CardSomos from "../components/home/CardSomos";

export default {

  name: 'Home',
  components: {
      CarruselHome,
      CardSomos,
  }
}
</script>
