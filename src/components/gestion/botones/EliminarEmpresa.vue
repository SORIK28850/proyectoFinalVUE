<template>
    <v-container><!-- Este componente es un dialog o pop up que carga una tabla con las empresas de la BD -->
        <v-btn
                light
                block
                @click="abrirDialog()"
        >
            Eliminar empresa
        </v-btn>
        <v-dialog
                v-model="dialog"
                max-width="1024"
        >
            <v-card>
                <v-card-title class="headline">Empresas</v-card-title>

                <v-card-text>
                    <v-form @submit.prevent="eliminarEmpresa()">
                        <v-data-table
                                :headers="headers"
                                :items="desserts"
                                :items-per-page="5"
                                class="elevation-1"
                        ></v-data-table>
                        <v-select
                                v-model="empresaEliminar"
                                :items="nombresEmpresas"
                                label="Seleccione la empresa a eliminar"
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
    import { mapState} from "vuex";
    export default {
        name: "EliminarEmpresa",
        data: ()=>({
            dialog: false,
            empresaEliminar: '',//aqui se guarda el nombre de la empresa a eliminar
            headers: [//aqui se almacenan las cabeceras de la tabla que muestra las emoresas
                {
                    text: 'Cod',
                    align: 'start',
                    sortable: false,
                    value: 'cod',
                },
                { text: 'Nombre', value: 'nombre' },
            ],
            desserts: [//aqui se almacenan lis datos de la tabla que muestra las empresas
            ],
            nombresEmpresas: [],//array que contiene llos nomrbes de las empresas
            resultado: '',//boolean con el resuoltado del borrado de  la empresa
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
                funcion.append('func','mostrarEmpresas');
                let datos = await axios.post(this.APIExterna,funcion);
                this.desserts = await datos.data;
                let funcion2 = new FormData;
                //creamos un array con los nombres de las empresas para usarlos en la eliminacion
                funcion2.append('func','mostrarEmpresasPorNombre')
                let datos2 = await axios.post(this.APIExterna,funcion2);
                this.nombresEmpresas = await datos2.data;
            },
            /**
             *con esta funcio se elimina los datos de una empresa, se le psa al elemento formdata los datos de la funcion y
             * en cuanto se borran se actualiza la base de datos para cargar la ultima verrsion
             * @type {FormData}
             */
            async eliminarEmpresa(){
                let funcion = new FormData;
                funcion.append('func','eliminarEmpresa');
                funcion.append('nombre',this.empresaEliminar);
                let datos = await axios.post(this.APIExterna,funcion);
                this.resultado = await datos.data;
                this.empresaEliminar = '';
                await this.getAPI();

            },
            /*
            *esta funcion abre el dialog y carga los datos de la base de datos necesarios para el formulario de borrado
            */
            abrirDialog(){
                this.empresaEliminar = '';
                this.getAPI();
                this.dialog = true;
            },
            /*
            *esta funcion cierra el dialog y devuelve a cadenas vacias los elementos del formulario
            */
            botonCerrar(){
                this.empresaEliminar = '';
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
                if(this.usuario.email === "@gmail.com"){
                    usuarioMaestro = true;
                }
                return usuarioMaestro;
            },
        },
    }
</script>

<style scoped>

</style>
