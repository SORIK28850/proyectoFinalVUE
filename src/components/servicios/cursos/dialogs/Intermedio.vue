<template>
    <v-container>
        <v-divider></v-divider>
        <v-list-item @click="dialog=true">
            <v-list-item-content>
                <v-list-item-title>Intermedio de extinción de incendios</v-list-item-title>
                <v-list-item-subtitle> Comprender el desarrollo de los incendios en el lugar de trabajo. Click para saber más.</v-list-item-subtitle>
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
                        src="https://www.sorik.es/incefor/src/trajeAzul.jpg"
                        height="240"
                ></v-img>

                <v-card-title>
                    Intermedio de extinción
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
                            de precaución. Capacitar de las técnicas y habilidades necesarias
                            para combatir o controlar un incendio hasta la llegada de los servicios
                            de emergencias.
                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        name: "Intermedio",
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
