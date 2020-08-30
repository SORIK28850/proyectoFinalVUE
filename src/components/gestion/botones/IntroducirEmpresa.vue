<!-- Componente que crea un dialog con un formulario de registro de nuevo empresa -->
<template>
    <v-container fluid>
        <v-btn
                light
                block
                @click.stop="dialog = true"
        >
            Introducir empresa
        </v-btn>
        <v-dialog
                v-model="dialog"
                max-width="1024px"
        >
            <v-card>
                <v-card-title>
                    <span class="headline">Registro de empresa</span>
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="getAPI()">
                        <v-container>
                            <v-row>
                                <v-col cols="12" lg="10">
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
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" lg="10">
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
                                </v-col>
                            </v-row>
                            <v-btn type="submit"
                                   v-if="validarTelefono && validarEmail && usuarioCorrecto && this.telefono!=='' && this.provincia!==''
                                            && this.nombre!=='' && this.email!==''"
                                   @click="dialog = false"
                            >Registrar</v-btn>
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
    import { mapState } from "vuex";
    import axios from "axios";
    export default {
        name: "IntroducirEmpresa",
        //aqui debajo estan todos los elementos que contendran los datos del formulario que se enviara a la API
        //se van actualizando de manera reactiva con el formulario
        data: ()=>({
            nombre: '',//contiene el  nombre de la empresa a fguardar en  la base de datos
            telefono: '',//contiene el telefono de la emrpesa
            provincia: '',//contiene la privincia de la empresa
            direccion: '',//contiene la direccionde  la empresa
            email: '',//contiene el email de la empresa
            errorTelefono: 'Teléfono no válido',//contiene el error si se mete un telefono invalido
            errorEmail: 'Email no válido',//contiene el error siu se mete un email no valido
            dialog: false,//abre o cuerra el dialog dependiendo de su valor
            resultado: null,//contiene el resultado de si se guarda o no el curso en a BD
            provincias : [//array que contiene las privincias de españa
                'Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
                'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
                'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
                'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
                'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'
            ],
        }),
        methods:{
            /**
             * este metodo asincrono crea el formdata que se manda a la API para regustrar los datos en la base de datos
             */
            async getAPI(){
                let funcion = new FormData;
                funcion.append('func','introducirEmpresa');
                funcion.append('nombre',this.nombre);
                funcion.append('telefono',this.telefono);
                funcion.append('provincia',this.provincia);
                funcion.append('direccion',this.direccion);
                funcion.append('email',this.email);
                let datos = await axios.post(this.APIExterna,funcion);
                this.resultado = await datos.data;
                this.nombre="";
                this.telefono="";
                this.direccion="";
                this.provincia="";
                this.email="";
            },
            /*
            *esta funcion ciera el dialog y pone los valores a cadenas vacias
            */
            cerrarBoton(){
                this.nombre="";
                this.telefono="";
                this.direccion="";
                this.provincia="";
                this.email="";
                this.dialog = false;
            }
        },
        computed: {
            /*
             * con esta funcion nos aseguramos de que el usuario que utiliza este menu es el administrador
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
                if(this.usuario.email === "@gmail.com"){
                    usuarioMaestro = true;
                }
                return usuarioMaestro;
            },
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
            *esta funcion valida que el telefono solo esta formado por numeros
            */
            validarTelefono(){
                let validado = true;
                if(isNaN(this.telefono)){
                    validado = false;
                }
                return validado;
            },


        },
    }
</script>

<style scoped>
    p{
        color: rgba(168,17,12,0.65);
    }
</style>
