<!-- Componente que crea un dialog con un formulario de registro de nuevo usuario -->
<template>
    <v-container fluid>
        <v-btn
                light
                block
                @click.stop="dialog = true"
        >
            Introducir personal
        </v-btn>
        <v-dialog v-model="dialog" max-width="1024">
            <v-card>
                <v-card-title>
                    <span class="headline">Registro personal</span>
                </v-card-title>
                <v-card-text><!-- aqui comienza el formualrio que llama a la funcion getapi que es la encargada de grabar datos en la BD -->
                    <v-form @submit.prevent="getAPI()">
                        <v-container>
                            <v-row>
                                <v-col cols="12" lg="10">
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
                                            v-model="tipo"
                                            :items="items"
                                            label="instructor o ayudante"
                                            required
                                    ></v-select>
                                    <v-btn type="submit"
                                           v-if="dniCorrecto && tieneNumeros && validarEmail && validarTelefono && this.tipo!=='' && usuarioCorrecto
                                                    && this.nombre!=='' && this.email!=='' && this.dni!=='' && this.telefono!==''"
                                           @click="dialog = false"
                                    >Registrar</v-btn>
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
        name: "IntroduccionPersonal",
        //aqui tenemos los datos del usuario a trgistrar que se actualizan de manera reactiva con el formulario
        data: ()=>({
            dni: '',//contiene el dni a guardar en la base de datos
            nombre: '',//contiene el nombre del usuairo
            telefono: '',//contiene el telefono de la persona
            email: '',//co9nteiene el emial de la persona
            tipo: '',//contiene si es un instructor o ayudante
            errorTelefono: 'Teléfono no válido',//contiene el mensaje de error de telefono mal introducido
            errorNombre: 'Nombre no válido',//contiene el mensaje de error del nombre mal introducido
            errorDni: 'DNI o NIE no válidos',//contiener el mensaje de error del dni mal introducido
            errorEmail: 'Email no válido',//contiene el nesaje de error del email mal introducido
            dialog: false,//cierra o abre el dialgoig dependendiendo de su valor
            resultado: null,//contiene el resultado de si se fuarda o no la persona en al bd
            items:[//array con los dos tipos de personal qie puede haber
                'instructor',
                'ayudante',
            ]
        }),
        methods:{

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
                funcion.append('func','registrarPersonal');
                funcion.append('dni',this.dni);
                funcion.append('nombre',this.nombre);
                funcion.append('telefono',this.telefono);
                funcion.append('email',this.email);
                funcion.append('tipo',this.tipo);
                let datos = await axios.post(this.APIExterna,funcion);
                this.resultado = await datos.data;
                //volvemos a poner los datos de la aplicacion en cadenas vacias para no reghistrar dos veces a la misma persona
                this.nombre="";
                this.dni="";
                this.tipo="";
                this.telefono="";
                this.email="";
                this.resultado="";
            },
            /*
            *esta funcion ciera el dialog y pone los valores a cadenas vacias
            */
            cerrarBoton(){
                this.nombre="";
                this.dni="";
                this.tipo="";
                this.telefono="";
                this.email="";
                this.resultado="";
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
