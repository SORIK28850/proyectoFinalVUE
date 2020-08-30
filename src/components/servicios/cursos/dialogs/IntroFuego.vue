<template>
    <v-container>
        <v-divider></v-divider>
        <v-list-item @click="dialog=true">
            <v-list-item-content>
                <v-list-item-title>Introducción al fuego y manejo de extintores</v-list-item-title>
                <v-list-item-subtitle>Aprenderemos a utilizar extintores, y las herramientas necesarias para combatir el fuego. Click para saber más.</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-dialog
                v-model="dialog"
                max-width="400"
        >
            <v-card
                    class="mx-auto"
                    max-width="400"
            >
                <v-img
                        src="https://www.sorik.es/incefor/src/c1.jpg"
                        height="240"
                ></v-img>

                <v-card-title>
                    Introducción al fuego
                </v-card-title>

                <v-card-actions>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false"
                    >
                        Cerrar
                    </v-btn>
                    <v-spacer></v-spacer>

                    <v-btn
                            icon
                            @click="show = !show"
                    >
                        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>

                        <v-card-text>
                            Comprender el desarrollo de los incendios en el lugar de trabajo.
                            Identificar los peligros y tomar conciencia de las recomendaciones
                            de precaución. Dotar de los conocimientos necesarios para poder utilizar,
                            con seguridad, los medios de primera intervención existentes en el
                            lugar de trabajo (extintores portátiles y bocas de incendio equipadas).
                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        name: "IntroFuego",
        data () {
            return {
                dialog: false,
                show: false,
            }
        },
    }
</script>

<style scoped>
</style>
