<template>
    <v-container>
        <v-container class="separacionPequeña"></v-container>
        <v-card
                class="mx-auto"
                max-width="950"
        >
            <v-img
                    class="white--text align-end img-fluid"

                    src="https://www.sorik.es/incefor/src/simulacro.png"
            >
            </v-img>

            <v-card-text class="text--primary" style="background-color: #F5F5F5" @click="dialog=true">
                <div>
                    Mediante la recreación de una emergencia se pretende familiarizar al personal
                    de las diferentes instituciones con la metodología más adecuada para actuar,
                    con los mejores resultados y en el menor tiempo, ante este tipo de situaciones y,
                    de este modo, conseguir minimizar riesgos y daños, además de comprobar el correcto
                    funcionamiento de los diferentes equipos de protección. Click para saber más.
                </div>
                <div>
                </div>
            </v-card-text>
        </v-card>
        <v-dialog
                v-model="dialog"
                max-width="900"
        >
            <v-card
                    class="mx-auto"
                    max-width="900"
            >
                <v-img
                        class="img-thumbnail"
                        src="https://www.sorik.es/incefor/src/simulacro.png"
                        height="300"
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
                            Mediante la recreación de una emergencia se pretende familiarizar al personal
                            de las diferentes instituciones con la metodología más adecuada para actuar,
                            con los mejores resultados y en el menor tiempo, ante este tipo de situaciones y,
                            de este modo, conseguir minimizar riesgos y daños, además de comprobar el correcto
                            funcionamiento de los diferentes equipos de protección.
                            Por lo tanto, conseguiremos los siguientes objetivos:
                            Poner a prueba la capacidad de respuesta del público objetivo en situación de emergencia.
                            Detectar errores u omisiones en las actuaciones a realizar para establecer protocolos de mejora.
                            Habituar al personal a los protocolos del Plan de Autoprotección. Comprobar la adecuación
                            de equipos y medios de extinción, comunicación, alarma, señalización, etc.
                            Adquirir experiencia en el manejo de equipos. Control de tiempos de evacuación,
                            de intervención de equipos propios y de ayudas externas. Durante el ejercicio nuestro equipo observará
                            y analizará la actuación del personal y el funcionamiento de los equipos involucrados en la
                            emergencia (alarmas, sistemas de detección, sistemas de extinción, etc.).
                            Al finalizar, se hará entrega de un informe detallado sobre las actuaciones realizadas en
                            el ejercicio y propuestas de mejora pertinentes. Para todo ello,
                            <b style="color: black">Ince</b><b style="color: red">for</b> pone a su disposición los medios
                            técnicos y humanos necesarios.
                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
    export default {
        name: "TarjetaSimulacros",
        data () {
            return {
                dialog: false,
                show: false,
            }
        },
    }
</script>

<style scoped>
    .separacionPequeña{
        height: 50px;
    }
</style>