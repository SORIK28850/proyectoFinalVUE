<template>
    <v-container><!-- Este componente es un dialog o pop up que carga una tabla con las empresas de la BD -->
        <v-btn
                light
                block
                @click="iniciarDialog()"
        >
            Mostrar empresas
        </v-btn>
        <v-dialog
                v-model="dialog"
                max-width="1024"
        >
            <v-card>
                <v-card-title class="headline">Empresas</v-card-title>

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
        name: "MostrarEmpresas",
        data: ()=>({
            dialog: false,//abre o cierra el dialog dependiendo de su valor
            headers: [
                {//aqui se almacenan las cabeceras de la tabla que muestra las empresas
                    text: 'Cod',
                    align: 'start',
                    sortable: false,
                    value: 'cod',
                },
                { text: 'Nombre', value: 'nombre' },
                { text: 'Teléfono', value: 'telefono' },
                { text: 'Provincia', value: 'provincia' },
                { text: 'Dirección', value: 'direccion' },
                { text: 'Email', value: 'email' },
            ],
            desserts: [//aqui se almacenan las cabeceras de la tabla que muestra las emoresas
            ],
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
            },
            /*
            *esta funcion abre el dialog
            */
            iniciarDialog(){
                this.getAPI();
                this.dialog = true;
            }
        },
        computed:{
            /*
               * Importamos el usuario para validar si es administrador o usuario normal el logueado
               * Importamos las APIS del state para variar entre la del servidor externo y el interno
               */
            ...mapState(['APIExterna','APIXampp','usuario']),
        },
    }
</script>

<style scoped>

</style>