<template>
    <v-container>
        <v-divider></v-divider>
        <v-list-item @click="dialog=true">
            <v-list-item-content>
                <v-list-item-title>Rescate en espacios cofinados. </v-list-item-title>
                <v-list-item-subtitle> Familiarización de los trabajadores de la empresa con los
                    riesgos derivados de los espacios confinados. Click para saber más.</v-list-item-subtitle>
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
                        src="https://www.sorik.es/incefor/src/c7.png"
                        height="240"
                ></v-img>

                <v-card-title>
                    Rescate en interior
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
                            Familiarización de los trabajadores de la empresa con los
                            riesgos derivados de los espacios confinados existentes en
                            las instalaciones del cliente. Manejo de situaciones de emergencia
                            en espacios confinados y rescate de compañeros. Reconocimiento de
                            los riesgos potenciales en las áreas de trabajo y capacitación
                            para afrontar cualquier situación de emergencia en espacios confinados.
                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        name: "RescateConfinados",
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
