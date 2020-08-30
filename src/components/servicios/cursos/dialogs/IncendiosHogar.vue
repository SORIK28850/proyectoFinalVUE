<template>
    <v-container>
        <v-divider></v-divider>
        <v-list-item @click="dialog=true">
            <v-list-item-content>
                <v-list-item-title>Incendios dentro del hogar y comunidad</v-list-item-title>
                <v-list-item-subtitle>Aprender acerca de como se inicia un incedio y su extinción. Click para saber más.</v-list-item-subtitle>
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
                        src="https://www.sorik.es/incefor/src/c3.jpg"
                        height="240"
                ></v-img>

                <v-card-title>
                    Incendios en el hogar
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
                            Comprender el desarrollo de los incendios interiores.
                            Identificar los peligros y tomar conciencia de las
                            recomendaciones de precaución. Poner en práctica el
                            manejo de los equipos de extinción para combatir un
                            conato de incendio. Conocer la metodología de actuación
                            en caso de incendio y evacuación.
                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        name: "IncendiosHogar",
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
