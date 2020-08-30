<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <NuevoUsuario></NuevoUsuario>
            </v-col>
            <v-col cols="12" lg="4">
               <BotoneraPersonal></BotoneraPersonal>
            </v-col>
            <v-col cols="12" lg="4">
                <BotoneraEmpresas></BotoneraEmpresas>
            </v-col>
            <v-col cols="12" lg="4">
                <BotoneraCursos></BotoneraCursos>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    import NuevoUsuario from "../components/gestion/botones/NuevoUsuario";
    import BotoneraCursos from "../components/gestion/BotoneraCursos";
    import BotoneraEmpresas from "../components/gestion/BotoneraEmpresas";
    import BotoneraPersonal from "../components/gestion/BotoneraPersonal";
    export default {
        name: "Gestion",
        components: {
            NuevoUsuario,
            BotoneraEmpresas,
            BotoneraPersonal,
            BotoneraCursos,
        }
    }
</script>

<style scoped>

</style>