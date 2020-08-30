<template>
    <v-container fluid>
        <v-container class="separacionPequeñaAlquiler"></v-container>
        <v-container fluid class="alquilerFondo">
            <p class="text-sm-justify">
                Disponemos de varios equipos que ofrecemos en alquiler para empresas que
                deseen hacer sus practicas o cubrir cualquier necesidad que puedan tener,
                tales como máquina de humos, bandeja de simulación de fuego, mangueras y
                todo tipo de material contra incendios así como ropa ignífuga, cascos de
                protección y un largo etcétera.
            </p>
            <v-row justify="center">
                <v-col cols="12" lg="10">
                    <v-img src="https://www.sorik.es/incefor/src/alquiler.png"></v-img>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        name: "TarjetaAlquiler"
    }
</script>

<style scoped>
 .separacionPequeñaAlquiler{
     height: 50px;
 }
.alquilerFondo{
    background-color: #F5F5F5;
}
</style>