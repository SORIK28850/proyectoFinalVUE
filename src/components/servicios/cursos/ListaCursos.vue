<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" md="10">
                <v-card class="mx-auto">
                    <v-toolbar
                            color="#F5F5F5"
                            dark
                    >
                        <v-toolbar-title class="titulos">Cursos</v-toolbar-title>
                    </v-toolbar>
                    <v-list three-line>
                        <PrimerosAux></PrimerosAux>
                        <ManejoEra></ManejoEra>
                        <Intermedio></Intermedio>
                        <IntroFuego></IntroFuego>
                        <IncendiosHogar></IncendiosHogar>
                        <RescateConfinados></RescateConfinados>
                        <SoporteVital></SoporteVital>
                        <Mercancias></Mercancias>
                        <Avanzado></Avanzado>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    import PrimerosAux from "./dialogs/PrimerosAux";
    import ManejoEra from "./dialogs/ManejoEra";
    import Intermedio from "./dialogs/Intermedio";
    import IntroFuego from "./dialogs/IntroFuego";
    import RescateConfinados from "./dialogs/RescateConfinados";
    import IncendiosHogar from "./dialogs/IncendiosHogar";
    import Mercancias from "./dialogs/Mercancias";
    import Avanzado from "./dialogs/Avanzado";
    import SoporteVital from "./dialogs/SoporteVital";

    export default {
        name: "ListaCursos",
        components: {
            PrimerosAux,
            ManejoEra,
            Intermedio,
            IntroFuego,
            RescateConfinados,
            IncendiosHogar,
            Mercancias,
            Avanzado,
            SoporteVital,
        },

    }
</script>

<style scoped>
    .titulos{
        font-size: 40px;
        color: black;
    }
</style>