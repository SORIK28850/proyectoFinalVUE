<!-- componeten que contiene el carrusell de la página de inicio incefor.com
    el carrusel tiene una elevación de 10, es ciclico, no muestra las flechas de cambiar de fotografía
    no tiene bordes, y tiene un ancho de 300px, los elementos se muestran mediante un bucle que va
    recogiendo las imágenes de un array de direcciones http, las imágenes ocupan todo el ancho
    y están alineadas en el centro -->
<template>
    <v-row justify="center">
        <v-col cols="12" md="8">
            <v-card
                    elevation="10"
                    class="mx-auto"
            >
                <v-carousel
                        :continuous="continuous"
                        :cycle="cycle"
                        :show-arrows="false"
                        hide-delimiter-background
                        delimiter-icon="mdi-minus"
                        height="300"
                >
                    <v-carousel-item
                            v-for="(item, i) in items"
                            :key="i"
                    >
                        <v-img
                                :src="item.src"
                                height="100%"
                                tile
                        >
                            <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center"
                            >
                            </v-row>
                        </v-img>
                    </v-carousel-item>
                </v-carousel>
                <v-list two-line>
                    <v-list-item>

                        <v-list-item-content>
                            <v-list-item-title><b style="color: black">Ince</b><b style="color: red">for</b></v-list-item-title>
                            <v-list-item-subtitle><b>Formación en lucha contra incendios</b></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    /*
    Exportacion de los datos del componente y array de direcciones con las imágenes
    */

    export default {
        name: "CarruselHome",
        data () {
            return {
                items: [
                    {
                        src: 'https://www.sorik.es/incefor/src/1.jpg',
                    },
                    {
                        src: 'https://www.sorik.es/incefor/src/2.jpg',
                    },
                    {
                        src: 'https://www.sorik.es/incefor/src/3.jpg',
                    },
                ],
                cycle: true,
                continuous: true,
            }
        },
    }
</script>

<style scoped>

</style>