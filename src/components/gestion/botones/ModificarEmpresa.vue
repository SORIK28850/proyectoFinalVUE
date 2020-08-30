<template>
    <v-container><!-- Este componente es un dialog o pop up que carga una tabla con las empresas de la BD -->
        <v-btn
                light
                block
                @click="iniciarDialog()"
        >
            Modificar empresas
        </v-btn>
        <v-dialog
                v-model="dialog"
                max-width="1024"
        >
            <v-card><!-- este componente es la tarjeta que salta con el menu y la tabla con las empresas -->
                <v-card-title class="headline">Modificar empresas</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="modificarEmpresa()"><!-- aqui llamamos a la funcion que cambia los datos -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" lg="10"><!-- aqui cargamos los nombres de las empresas antiguas -->
                                    <v-select
                                            v-model="empresaVieja"
                                            :items="nombresEmpresas"
                                            label="Seleccione la empresa a modificar"
                                            required
                                    ></v-select><!--  aqui debajo esta el formulario de cambio de datos con sus funciones de validacion -->
                                    <v-text-field
                                            v-model="nombre"
                                            label="* nombre de la empresa"
                                            solo
                                            dense
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="telefono"
                                            label="* telefono"
                                            solo
                                            dense
                                            required
                                    ></v-text-field>
                                    <p v-if="!validarTelefono && this.telefono!==''">
                                        {{errorTelefono}}
                                    </p>
                                    <v-select
                                            v-model="provincia"
                                            :items="provincias"
                                            label="seleccione provincia"
                                            required
                                    ></v-select>
                                    <v-text-field
                                            v-model="direccion"
                                            label="* direccion de la empresa"
                                            solo
                                            dense
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="email"
                                            label="* email"
                                            solo
                                            dense
                                            required
                                    ></v-text-field>
                                    <p v-if="!validarEmail && this.email!==''">
                                        {{errorEmail}}
                                    </p>
                                    <v-btn type="submit"
                                           v-if="validarTelefono && validarEmail && usuarioCorrecto && this.telefono!=='' && this.provincia!==''
                                            && this.nombre!=='' && this.email!==''"
                                           @click="dialog = false"
                                    >Modificar</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
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
                            @click="cerrarBoton()"
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
    import { mapState } from "vuex";
    export default {
        name: "ModificarEmpresas",
        data: ()=>({
            empresaVieja: '', //contiene el nombre de la empresa que se va a cambiar
            nombresEmpresas: [], // array con todos los nombres de empresas
            headers: [//aqui se almacenan las cabeceras de la tabla que muestra ls empresas
                {
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
            desserts: [//aqui se almacenan lis datos de la tabla que muestra las emoresas
            ],
            nombre: '', // contiene el nombre nuevo de la empresa
            telefono: '', // contiene el telefono nuevo de la empresa
            provincia: '', // contiene la provincia nueva de la empresa
            direccion: '', // contioene la nueva direccion de la empresa
            email: '', //contieen el nuevo email de la empresa
            errorTelefono: 'Teléfono no válido', //contiene el error si metemos mal el telefono
            errorEmail: 'Email no válido', //contiene el error si metemos mal el email
            provincias : [ // carray que contiene todas las privincias españolas
                'Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
                'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
                'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
                'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
                'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'
            ],
            dialog: false, //cierra el dialog o lo abre dependiendo del valor que tenga

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
            *Esta funcion inicia el dialog y carga los datos de la base de datos
            */
            iniciarDialog(){
                this.getAPI();
                this.dialog = true;
                this.obtenerNombresEmpresas();
            },
            /*
            *Esta funcion recoge los nombres de todas las empresas de la base de datos
            */
            async obtenerNombresEmpresas(){
                //un objeto Formdata nos sirve para hacer la llamada a la api ya que puede guardar varios
                //parametros dentro de si.
                let funcion = new FormData;
                funcion.append('func','mostrarEmpresasPorNombre');
                let datos = await axios.post(this.APIExterna,funcion);
                this.nombresEmpresas = await datos.data;
            },
            /*
            *Esta funcion cierra el dialog y pone todos los datos del formulario a cadenas vacias
            */
            cerrarBoton(){
                this.empresaVieja = '';
                this.nombre="";
                this.telefono="";
                this.direccion="";
                this.provincia="";
                this.email="";
                this.dialog = false;
            },
            /*
            *Esta funcion modifica la base de datos con los datos pasados por el formulario
            */
            async modificarEmpresa(){
                //un objeto Formdata nos sirve para hacer la llamada a la api ya que puede guardar varios
                //parametros dentro de si.
                let funcion = new FormData;
                funcion.append('func','modificarEmpresa');
                funcion.append('nombreViejo',this.empresaVieja);
                funcion.append('nombre',this.nombre);
                funcion.append('telefono',this.telefono);
                funcion.append('provincia',this.provincia);
                funcion.append('direccion',this.direccion);
                funcion.append('email',this.email);
                let datos = await axios.post(this.APIExterna,funcion);
                this.resultado = await datos.data;
                //volvemos a poner los datos de la aplicacion en cadenas vacias para no registrar dos veces a la misma persona
                this.empresaVieja = '';
                this.nombre = '';
                this.telefono = '';
                this.direccion = '';
                this.provincia = '';
                this.email = '';
                //llamaos a la funcion de recargar datos para que esten acutalizados
                await this.getAPI();
                await this.obtenerNombresEmpresas();
            },
        },
        computed:{
            /*
             * Importamos el usuario para validar si es administrador o usuario normal el logueado
             * Importamos las APIS del state para variar entre la del servidor externo y el interno
             */
            ...mapState(['APIExterna','APIXampp','usuario']),
            /**
             * esta funcion valida que el usuario es el administrador para modificar la BD
             * y que los datos que se almacenan no son cadenas vacias. asi como que el telefono esta compuesto por numeros
             * @returns {boolean}
             */
            usuarioCorrecto(){
                let usuarioMaestro = false;
                if(this.usuario.email === "ncreador@gmail.com"){
                    usuarioMaestro = true;
                }
                return usuarioMaestro;
            },
            /*
            * esta funcion valida el email, que esta formado correctamente
             */
            validarEmail(){
                let correcto = false;
                let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                //Se muestra un texto a modo de ejemplo, luego va a ser un icono
                if (emailRegex.test(this.email)) {
                    correcto = true;
                }
                return correcto;
            },
            /*
             * esta funcion valida el telefono para que solo contenga numeros
             */
            validarTelefono(){
                let validado = true;
                if(isNaN(this.telefono)){
                    validado = false;
                }
                return validado;
            },
        }
    }
</script>

<style scoped>
    p{
        color: rgba(168,17,12,0.65);
    }
</style>