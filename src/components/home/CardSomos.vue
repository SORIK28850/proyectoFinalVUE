<!-- componente con dos tarjetas que muestran la información báscica de incefor.com-->
<template>
    <v-container>
        <v-card
                class="mx-auto merryweather"
                max-width="1000"
                elevation="10"
        >
            <v-img
                    class="white--text align-end"
                    height="400"
                    src="https://www.sorik.es/incefor/src/Foto-portada.png"
            >
                <v-card-title style="color: black; font-size: 40px"></v-card-title>
            </v-img>


            <v-card-text class="text--primary">
                <div>
                    <b style="color: black">Ince</b><b style="color: red">for</b> está constituido por un equipo de profesionales en activo con amplia y
                    reconocida experiencia en el sector de emergencias. Estamos especializados en formación
                    in company y proporcionamos soluciones óptimas a las necesidades de formación en
                    Lucha Contra Incendios, Rescate y Primeros Auxilios , entre otros, adaptándonos siempre
                    a las necesidades propias de cada cliente.
                </div>
            </v-card-text>
        </v-card>
        <v-container class="separacionBlancaHome"></v-container>
    </v-container>
</template>

<script>
    /*
    exportacion con sus parámetros de salida de módulos y css personalizado
     */
    export default {
        name: "CardSomos"
    }
</script>

<style scoped>
    .merryweather{
        font-family: Merriweather-Regular, serif;
    }
    .separacionBlancaHome{
        height: 150px;
    }
</style>