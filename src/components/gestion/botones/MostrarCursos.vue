<template>
    <v-container fluid><!-- Este componente es un dialog o pop up que carga una tabla con los cursos de la BD -->
        <v-btn
                light
                block
                @click="iniciarDialog()"
        >
            Mostrar cursos
        </v-btn>
        <v-dialog
                v-model="dialog"
                max-width="1280"
        >
            <v-card>
                <v-card-title class="headline">Cursos</v-card-title>

                <v-card-text>
                    <v-data-table
                            :headers="headers"
                            :items="desserts"
                            :items-per-page="5"
                            class="elevation-1"
                    ></v-data-table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false"
                    >
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    /**
     * Importamos axios que es el complemento que nos va a hacer la conexion con la base de datos
     */
    import axios from "axios";
    import {mapState} from "vuex";
    export default {
        name: "MostrarCursos",
        data: ()=>({
            dialog: false,//abre o cierra el dialog dependeiendo de su valor
            headers: [
                {//aqui se almacenan las cabeceras de la tabla que muestra los cursos
                    text: 'Curso',
                    align: 'start',
                    sortable: false,
                    value: 'curso',
                },
                { text: 'Empresa', value: 'empresa' },
                { text: 'Fecha', value: 'fecha' },
                { text: 'Conductor', value: 'conductor' },
                { text: 'Instructor', value: 'instructor' },
                { text: 'Ayudante', value: 'ayudante' },
                { text: 'Trayecto', value: 'trayecto' },
                { text: 'Km Ida', value: 'kmida' },
                { text: 'Hora Ida', value: 'horaida' },
                { text: 'Km Llegada', value: 'kmllegada' },
                { text: 'Hora Llegada', value: 'horallegada' },
            ],
            desserts: [//aqui se almacenan las cabeceras de la tabla que muestra los cursos
            ],
        }),
        methods: {

            /**Esta es la funcion que carga la BD, se le pasa el parámetro de la funcion requerida por la API
             * y el nombre de dicha funcion devuelve una promesa a la espera de recibir los datos
             * @returns {Promise<void>}
             */
            async getAPI(){
                //un objeto Formdata nos sirve para hacer la llamada a la api ya que puede guardar varios
                //parametros dentro de si.
                let funcion = new FormData;
                funcion.append('func','mostrarCursos');
                let datos = await axios.post(this.APIExterna,funcion);
                this.desserts = await datos.data;

            },
            /*
            *esta funcion incia el dialog
            */
            iniciarDialog(){
                this.getAPI();
                this.dialog = true;
            }
        },
        computed: {
            /*
             * Importamos el usuario para validar si es administrador o usuario normal el logueado
             * Importamos las APIS del state para variar entre la del servidor externo y el interno
             */
            ...mapState(['APIExterna','APIXampp','usuario']),
        }
    }
</script>