<template>
    <v-container><!-- Este componente es un dialog o pop up que carga una tabla con las empresas de la BD -->
        <v-btn
                light
                block
                @click="abrirDialog()"
        >
            Eliminar curso
        </v-btn>
        <v-dialog
                v-model="dialog"
                max-width="1024"
        >
            <v-card>
                <v-card-title class="headline">Cursos</v-card-title>

                <v-card-text>
                    <v-form @submit.prevent="eliminarCurso()">
                        <v-data-table
                                :headers="headers"
                                :items="desserts"
                                :items-per-page="5"
                                class="elevation-1"
                        ></v-data-table>
                        <v-select
                                v-model="cursoEliminar"
                                :items="codigosCursos"
                                label="Seleccione el curso a eliminar"
                                required
                        ></v-select>
                        <v-btn type="submit"
                               v-if="usuarioCorrecto"
                               @click="dialog = false"
                        >Eliminar</v-btn>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="botonCerrar()"
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
        name: "EliminarCurso",
        data: ()=>({
            dialog: false,
            cursoEliminar: '',
            headers: [//aqui se almacenan las cabeceras de la tabla que muestra los cursos
                {
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
            ],
            desserts: [//aqui se almacenan los datos de la tabla que muestra los cursos
            ],
            resultado: '',
            codigosCursos: [],
        }),
        methods:{

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
                let funcionCodigosCursos = new FormData;
                funcionCodigosCursos.append('func','mostrarCodigosCursos');
                let datosCodigos = await axios.post(this.APIExterna,funcionCodigosCursos);
                this.codigosCursos = await datosCodigos.data;
                },
            /**
             *con esta funcio se elimina los datos de una empresa, se le psa al elemento formdata los datos de la funcion y
             * en cuanto se borran se actualiza la base de datos para cargar la ultima verrsion
             * @type {FormData}
             */
            async eliminarCurso(){
                let funcion = new FormData;
                funcion.append('func','eliminarCursoPorCurso');
                funcion.append('curso',this.cursoEliminar);
                let datos = await axios.post(this.APIExterna,funcion);
                this.resultado = await datos.data;
                this.cursoEliminar = '';
                await this.getAPI();

            },
            /*
             * esta funcion abre el dialog y carga los datos de la BD
             */
            abrirDialog(){
                this.cursoEliminar = '';
                this.getAPI();
                this.dialog = true;
            },
            /*
            *esta funcion cierra el dialog y coloca los parametros en su modo de inicio
            */
            botonCerrar(){
                this.cursoEliminar = '';
                this.getAPI();
                this.dialog = false;
            },
        },
        computed: {
            /*
             * con esta funcion nos aseguramos de que el usuario que utiliza este menu es el administrador
             * Importamos las APIS del state para variar entre la del servidor externo y el interno
             */
            ...mapState(['APIExterna','APIXampp','usuario']),
            /*
              * esta funcion valida el usuairo, que es el administrador el que esta iniciando sesion y modificando los datos
               */
            usuarioCorrecto(){
                let usuarioMaestro = false;
                if(this.usuario.email === "ncreador@gmail.com"){
                    usuarioMaestro = true;
                }
                return usuarioMaestro;
            },
        },
    }
</script>

<style scoped>

</style>