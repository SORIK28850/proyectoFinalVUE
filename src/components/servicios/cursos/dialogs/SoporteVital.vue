<template>
    <v-container>
        <v-divider></v-divider>
        <v-list-item @click="dialog=true">
            <v-list-item-content>
                <v-list-item-title>S.V.B y DESA</v-list-item-title>
                <v-list-item-subtitle>Disminuir la mortalidad y las secuelas que ocasionan las paradas cardíacas. Click para saber más.</v-list-item-subtitle>
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
                        src="https://www.sorik.es/incefor/src/jef.jpg"
                        height="240"
                ></v-img>

                <v-card-title>
                    S.V.B y DESA
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
                            Disminuir la mortalidad y las secuelas que ocasionan las paradas cardíacas.
                            Difundir las técnicas de soporte vital entre personal sanitario,
                            familiares de enfermos de alto riesgo y población en general.
                            Contribuir a impulsar estrategias dirigidas a la desfibrilación temprana.
                            Difundir las normas básicas para la prevención de la enfermedad coronaria
                            y de la muerte súbita cardíaca.
                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        name: "SoporteVital",
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
