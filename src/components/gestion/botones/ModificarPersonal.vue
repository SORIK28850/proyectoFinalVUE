<!-- Componente que crea un dialog con un formulario de registro de nuevo usuario -->
<template>
    <v-container fluid>
        <v-btn
                light
                block
                @click="abrirDialog()"
        >
            Modificar personal
        </v-btn>
        <v-dialog v-model="dialog" max-width="1024">
            <v-card>
                <v-card-title>
                    <span class="headline">Modificación del personal</span>
                </v-card-title>
                <v-card-text><!-- aqui comienza el formualrio que llama a la funcion getapi que es la encargada de grabar datos en la BD -->
                    <v-form @submit.prevent="getAPI()">
                        <v-container>
                            <v-row>
                                <v-col cols="12" lg="10">
                                    <v-select
                                            v-model="dniViejo"
                                            :items="dnis"
                                            label="Seleccione el DNI de la persona a modificar"
                                            required
                                    ></v-select>
                                    <v-text-field
                                            v-model="dni"
                                            label="* dni"
                                            solo
                                            dense
                                            required
                                    ></v-text-field>
                                    <p v-if="!dniCorrecto && this.dni!==''">
                                        {{errorDni}}
                                    </p>
                                    <v-text-field
                                            v-model="nombre"
                                            label="* nombre completo"
                                            solo
                                            dense
                                            required
                                    ></v-text-field>
                                    <p v-if="!tieneNumeros && this.nombre!==''">
                                        {{errorNombre}}
                                    </p>
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
                                    <v-select
                                            v-if="dnisAyudantes.length>1"
                                            v-model="dniCambioCategoria"
                                            :items="dnisAyudantes"
                                            label="cambiar de ayudante a instructor"
                                            required
                                    ></v-select>
                                    <v-btn v-if="dniCambioCategoria !== '' && usuarioCorrecto"
                                           @click="cambiarAInstructor()"
                                    >Cambiar a instructor</v-btn>
                                    <v-btn type="submit"
                                           v-if="dniCorrecto && tieneNumeros && validarEmail && validarTelefono && this.tipo!=='' && usuarioCorrecto
                                                    && this.nombre!=='' && this.email!=='' && this.dni!=='' && this.telefono!=='' && this.dniViejo!==''"
                                           @click="dialog = false"
                                    >Modificar</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" lg="10">
                                    <v-data-table
                                            :headers="headers"
                                            :items="desserts"
                                            :items-per-page="5"
                                            class="elevation-1"
                                    ></v-data-table>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                    <small></small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="cerrarBoton()">
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    /**
     * importamos el mapstate para controlar que el usuario es el administrador
     * y axios apra la conexion a la BD
     */
    import { mapState} from "vuex";
    import axios from "axios";
    export default {
        name: "ModificarPersonal",
        //aqui tenemos los datos del usuario a trgistrar que se actualizan de manera reactiva con el formulario
        data: ()=>({
            dniViejo: '',//contiene el dni de la persona a cambiar
            dni: '',//contiene el nuevo dni de la persona
            nombre: '',//contiene el nuevo nombre de la persona
            telefono: '',//contiene el nuevo telefono de la persona
            email: '',//contiene el nuevo email de la persona
            dniCambioCategoria: '',//contiene la nueva categoria si es que se cambia
            headers: [//aqui se almacenan las cabeceras de la tabla que muestra al personal
                {
                    text: 'DNI',
                    align: 'start',
                    sortable: false,
                    value: 'dni',
                },
                { text: 'Nombre', value: 'nombre' },
                { text: 'Teléfono', value: 'telefono' },
                { text: 'Email', value: 'email' },
            ],
            desserts: [//aqui se almacenan los datos de la tabla que muestra al personal
            ],
            dnis: [],//array que contiene los dnis de la BD
            errorTelefono: 'Teléfono no válido',//contiene el error si se mete un telefono mal
            errorNombre: 'Nombre no válido',//contiene el error si se mete mal el nombre del personal
            errorDni: 'DNI o NIE no válidos',//contie el error so el dni no es correcto
            errorEmail: 'Email no válido',//contiene el error si el email es incorrecto
            dialog: false,//abre o cierra el dialog dependiendo de su valer
            resultado: null,//contiene un boolean que indica si se ha cambido no el personal
            dnisAyudantes:[],//contiene los dnis de los ayudantes
        }),
        methods:{

            /*
            *esta funcion recibe losd atos del personal de la empresa
            */
            async getPersonal(){
                //un objeto Formdata nos sirve para hacer la llamada a la api ya que puede guardar varios
                //parametros dentro de si.
                let funcion = new FormData;
                funcion.append('func','mostrarPersonal');
                let datos = await axios.post(this.APIExterna,funcion);
                this.desserts = await datos.data;
                //con esta llamada recibimos los dnis del personal para meterlos en un select que se
                //encargara de borrar al personal selccionado
                let funcionDNIS = new FormData;
                funcionDNIS.append('func','mostrarDniPersonal');
                let datosDNIS = await axios.post(this.APIExterna,funcionDNIS);
                this.dnis = await datosDNIS.data;
                let funcionDNISAyudantes = new FormData;
                funcionDNISAyudantes.append('func','mostrarDNIAyudantes');
                let datosDNISAyudantes = await axios.post(this.APIExterna,funcionDNISAyudantes);
                this.dnisAyudantes = await datosDNISAyudantes.data;
            },
            /*
            *esta funcion abre el dialog y carga los datos de la BD
            */
            abrirDialog(){
                this.getPersonal();
                this.dialog = true;
            },
            /*
            *esta funcion registra en la base de datyos al nuevo usuario
            */
            async getAPI(){
                if(this.tipo === 'instructor'){
                    this.tipo = 1;
                }else{
                    this.tipo = 2;
                }
                let funcion = new FormData;
                //en el formdata cargamos los datos que vamos rellenando en el formualrio
                funcion.append('func','modificarPersonal');
                funcion.append('dniViejo',this.dniViejo);
                funcion.append('dni',this.dni);
                funcion.append('nombre',this.nombre);
                funcion.append('telefono',this.telefono);
                funcion.append('email',this.email);
                let datos = await axios.post(this.APIExterna,funcion);
                this.resultado = await datos.data;
                //volvemos a poner los datos de la aplicacion en cadenas vacias para no registrar dos veces a la misma persona
                this.nombre = "";
                this.dniViejo = "";
                this.dni = "";
                this.tipo = "";
                this.telefono = "";
                this.email = "";
                this.resultado = "";
                this.dniCambioCategoria = "";
                await this.getPersonal();
            },
            /*
            *esta funcion cambia a un ayudante a instructor usando axios en la abse de datos
            */
            async cambiarAInstructor(){
                let funcion = new FormData;
                funcion.append('func','cambiarAyudanteAInstructor');
                funcion.append('dniCambiar',this.dniCambioCategoria);
                let datos = await axios.post(this.APIExterna,funcion);
                this.resultado = datos.data;
                this.dniCambioCategoria = '';
                this.resultado = '';
                await this.getPersonal();
            },
            /*
            *esta funcion ciera el dialog y pone los valores a cadenas vacias
            */
            cerrarBoton(){
                this.dniViejo = '';
                this.nombre = '';
                this.dni = "";
                this.tipo = "";
                this.telefono = "";
                this.dniCambioCategoria = "";
                this.email = "";
                this.resultado = "";
                this.getPersonal();
                this.dialog = false;
            }

        },
        computed: {
            /*
             * Importamos el usuario para validar si es administrador o usuario normal el logueado
             * Importamos las APIS del state para variar entre la del servidor externo y el interno
             */
            ...mapState(['APIExterna','APIXampp','usuario']),
            /**
             * esta funcion valida tanto los dni como los nie para registrarlos correctamente en la base de datos
             * @returns {boolean}
             */
            dniCorrecto(){
                let validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
                let nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
                let nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
                let str = this.dni.toString().toUpperCase();

                if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

                let nie = str
                    .replace(/^[X]/, '0')
                    .replace(/^[Y]/, '1')
                    .replace(/^[Z]/, '2');

                let letter = str.substr(-1);
                let charIndex = parseInt(nie.substr(0, 8)) % 23;
                return validChars.charAt(charIndex) === letter;
            },
            /*
            *Esta funcion va a revisar que el nombre del personal no contenga numeros ni simbolos
             */
            tieneNumeros(){
                let correcto = true;
                for(let i=0; i<this.nombre.length; i++){
                    let numeros = "0123456789";
                    if (numeros.indexOf(this.nombre.charAt(i),0)!==-1){
                        correcto = false;
                    }
                }
                return correcto;
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
            * esta funcion valida el telefono, que esta formado correctamente
             */
            validarTelefono(){
                let validado = true;
                if(isNaN(this.telefono)){
                    validado = false;
                }
                return validado;
            },
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
    p{
        color: rgba(168,17,12,0.65);
    }
</style>
