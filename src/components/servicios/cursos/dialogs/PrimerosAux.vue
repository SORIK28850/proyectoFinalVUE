<template>
    <v-container>
        <v-divider></v-divider>
        <v-list-item @click="dialog=true">
            <v-list-item-content>
                <v-list-item-title>Primeros auxilios</v-list-item-title>
                <v-list-item-subtitle>Conocer los principios básicos de los primeros auxilios. Click para saber más.</v-list-item-subtitle>
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
                        src="https://www.sorik.es/incefor/src/socorristas2.jpg"
                        height="240"
                ></v-img>

                <v-card-title>
                    Primeros auxilios
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
                            Conocer los principios básicos de los primeros auxilios.
                            Reconocer los síntomas en una víctima para llevar a cabo
                            una actuación correcta y ser capaz de utilizar las técnicas
                            de actuación para asistir a un accidentado o enfermo repentino.
                            Adquirir las habilidades y técnicas necesarias para la
                            correcta realización de maniobras RCP.
                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        name: "PrimerosAux",
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
