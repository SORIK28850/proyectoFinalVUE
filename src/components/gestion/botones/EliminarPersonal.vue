<template>
    <v-container><!-- Este componente es un dialog o pop up que carga una tabla con las empresas de la BD -->
        <v-btn
                light
                block
                @click="abrirDialog()"
        >
            Eliminar personal
        </v-btn>
        <v-dialog
                v-model="dialog"
                max-width="1024"
        >
            <v-card>
                <v-card-title class="headline">Personal</v-card-title>

                <v-card-text>
                    <v-form @submit.prevent="eliminarPersonal()">
                        <v-data-table
                                :headers="headers"
                                :items="desserts"
                                :items-per-page="5"
                                class="elevation-1"
                        ></v-data-table>
                        <v-select
                                v-model="dniEliminar"
                                :items="dnis"
                                label="Seleccione el DNI a eliminar"
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
        name: "EliminarPersonal",
        data: ()=>({
            dialog: false,
            dniEliminar: '',//contiene el dni de la persona que se va a elimianr de la base de datos
            headers: [
                {//aqui se almacenan las cabeceras de la tabla que muestra al personal
                    text: 'DNI',
                    align: 'start',
                    sortable: false,
                    value: 'dni',
                },
                { text: 'Nombre', value: 'nombre' },
            ],
            desserts: [//aqui se almacenan los datos de la tabla que muestra al personal
            ],
            dnis: [],//contiene los dnis de tod el perosnal
            resultado: '',//contiene u boolean que indica si se borra o no la persona de la bd
        }),
        methods:{

            /**Esta es la funcion que carga la BD, se le pasa el parámetro de la funcion requerida por la API
             * y el nombre de dicha funcion devuelve una promesa a la espera de recibir los datos
             * @returns {Promise<void>}
             */
            async getAPI(){
                //con esta llamada recibimos los dnis del personal para meterlos en un select que se
                //encargara de borrar al personal selccionado
                let funcionDNIS = new FormData;
                funcionDNIS.append('func','mostrarDniPersonal');
                let datosDNIS = await axios.post(this.APIExterna,funcionDNIS);
                this.dnis = await datosDNIS.data;
                //un objeto Formdata nos sirve para hacer la llamada a la api ya que puede guardar varios
                //parametros dentro de si.
                let funcion = new FormData;
                funcion.append('func','mostrarPersonal');
                let datos = await axios.post(this.APIExterna,funcion);
                this.desserts = await datos.data;
            },
            async eliminarPersonal(){
                let funcion = new FormData;
                funcion.append('func','borrarPersonal');
                funcion.append('dni',this.dniEliminar);
                let datos = await axios.post(this.APIExterna,funcion);
                this.resultado = await datos.data;
                this.dniEliminar= '';
                await this.getAPI();

            },
            /*
            *esta funcion incia el dialog y carga los datos de la base de datos
            */
            abrirDialog(){
                this.dniEliminar= '';
                this.getAPI();
                this.dialog = true;
            },
            /*
            * esta funcion cierra el dialog y devuelve los valores a cadenas vacias
             */
            botonCerrar(){
                this.dniEliminar= '';
                this.getAPI();
                this.dialog = false;
            }
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
