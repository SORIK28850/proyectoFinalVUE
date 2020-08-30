<template>
    <v-container fluid>
        <TituloCursos></TituloCursos>
        <ListaCursos></ListaCursos>
        <v-container class="separacion"></v-container>
        <TituloSimulacros></TituloSimulacros>
        <TarjetaSimulacros></TarjetaSimulacros>
        <v-container class="separacion"></v-container>
        <TituloAlquiler></TituloAlquiler>
        <TarjetaAlquiler></TarjetaAlquiler>
    </v-container>
</template>

<script>
    import TituloCursos from "../components/servicios/cursos/TituloCursos";
    import ListaCursos from "../components/servicios/cursos/ListaCursos";
    import TituloSimulacros from "../components/servicios/simulacros/TituloSimulacros";
    import TarjetaSimulacros from "../components/servicios/simulacros/TarjetaSimulacros";
    import TituloAlquiler from "../components/servicios/alquiler/TituloAlquiler";
    import TarjetaAlquiler from "../components/servicios/alquiler/TarjetaAlquiler";


    export default {
        name: "Servicios",
        components: {
            TituloCursos,
            ListaCursos,
            TituloSimulacros,
            TarjetaSimulacros,
            TituloAlquiler,
            TarjetaAlquiler,

        }
    }
</script>

<style scoped>
    .separacion{
        height: 100px;
    }
</style>