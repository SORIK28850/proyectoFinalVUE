<!-- Componente que crea un dialog con un formulario de registro de nuevo usuario -->
<template>
    <v-container fluid>
        <v-btn
                light
                block
                @click="iniciarDialog()"
        >
            Introducir curso
        </v-btn>
        <v-dialog v-model="dialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Registro de curso</span>
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="registrarCurso()">
                        <v-container>
                            <v-row>
                                <v-col cols="12" lg="10">
                                    <!-- Elemento que carga de la BD los nombres de las empresas registradas -->
                                    <v-select
                                            v-model="nombreEmpresa"
                                            :items="empresas"
                                            label="Seleccione empresa"
                                            required
                                    ></v-select>
                                    <!-- elemento que carga un input type date -->
                                    <v-date-picker
                                            v-model="fecha"
                                            color="red lighten-1"
                                    >
                                        Fecha del curso
                                    </v-date-picker>
                                    <!-- este y los dos inferiores cargan los dnis de la base de datos de personal-->
                                    <v-select
                                            v-model="dniConductor"
                                            :items="dnis"
                                            label="Seleccione DNI del conductor"
                                            required
                                    ></v-select>
                                    <v-select
                                            v-model="dniInstructor"
                                            :items="dnisInstructores"
                                            label="Seleccione DNI del Instructor"
                                            required
                                    ></v-select>
                                    <v-select
                                            v-model="dniAyudante"
                                            :items="dnis"
                                            label="Seleccione DNI del ayudante"
                                            required
                                    ></v-select>
                                    <!-- este elemento carga los os tupos de trayecto ida y vuelta -->
                                    <v-select
                                            v-model="trayecto"
                                            :items="trayectos"
                                            label="Seleccione trayecto- ida o vuelta"
                                            required
                                    ></v-select>
                                    <!-- este input carga los kilometros que tenia el vehiculo al salir -->
                                    <v-text-field
                                            v-model="kmIda"
                                            label="* kilometros a la salida"
                                            solo
                                            dense
                                            required
                                    ></v-text-field>
                                    <p v-if="!revisionKMIda">
                                        {{errorKm}}
                                    </p>
                                    <!-- este input carga los la hora a la que se incia el viaje -->
                                    <v-time-picker v-model="horaIda"
                                                   color="red lighten-1"
                                                   format="24hr"
                                    >
                                        Seleccione hora de salida
                                    </v-time-picker>
                                    <p></p>
                                    <!-- este input carga los kilometros que tiene el vehiculo al llegar -->
                                    <v-text-field
                                            v-model="kmLLegada"
                                            label="* kilometros a la llegada"
                                            solo
                                            dense
                                            required
                                    ></v-text-field>
                                    <p v-if="!revisionKmLLegada">
                                        {{errorKm}}
                                    </p>
                                    <!-- este input carga los la hora a la que se acaba el viaje -->
                                    <v-time-picker v-model="horaLLegada"
                                                   color="red lighten-1"
                                                   format="24hr"
                                    >
                                        Seleccione hora de llegada
                                    </v-time-picker>
                                </v-col>
                            </v-row>
                            <!-- el boton solo se activa si los datos estan rellenados correctamente-->
                            <v-btn type="submit"
                                   v-if="cursoCorrecto"
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
    //se importa axios para poder conectar a la base de datos
    import axios from "axios";
    import {mapState} from "vuex";
    export default {
        name: "IntroducirCurso",
        //aqui debajo estan todos los elementos que contendran los datos del formulario que se enviara a la API
        //se van actualizando de manera reactiva con el formulario
        data: ()=>({
            nombreEmpresa: '', // contiene el nombre de la empresa que va a recibir el curso
            fecha: '', // contiene la fecha del curso
            dniConductor: '', //contiene el dni del conductor
            dniInstructor: '',//contiene el dni del instructor
            dniAyudante: '',// contiene el dni del ayudante
            trayecto: '',//contiene el trayecto que se va a realizar ida o vuelta
            kmIda: '',//contiene los km del vehiculo a la salida
            horaIda: '',//contiene la hora de la salida del viaje
            kmLLegada: '',//contiene los km que tiene el vehiculo a la llegada
            horaLLegada: '',//contiene la hroa de la llegada
            resultado: '',//contiene un boolean que indica si se guarda o no el curso
            dialog: false,//cierra o abre el dialog dependiendo del valor que se le asigne
            errorKm: 'Introduzca los kiómetros en número sin letras', //contiene el error si se introducen letras en los km
            dnis: [],//contiene un array con tosos los dnis del personal
            dnisAyudantes: [],//es un array con los dnis de los ayudantes
            dnisInstructores: [],//es un array cpon los dnis de lons instructores
            empresas: [],//contiene los nombres de las empresas
            trayectos: [//array que contiene los dos trayectos posibles
                'ida',
                'vuelta',
            ],
        }),
        methods:{

            /*
            * esta funcion carga los datos introducidps en el formulario en la base de datos
             */
            async getAPI(){
                //esta priemra funcion carga lso dnis de todo el personal para ser ultuliados en el señect de conductores
                let funcion = new FormData;
                funcion.append('func','mostrarDniPersonal');
                let datos = await axios.post(this.APIExterna,funcion);
                this.dnis = await datos.data;
                //esta segunda funcion carga los dnis de los ayudantes para ser usados en el select de los ayudantes
                let funcionDNISAyudantes = new FormData;
                funcionDNISAyudantes.append('func','mostrarDNIAyudantes');
                let datosDNIAyudantes = await axios.post(this.APIExterna,funcionDNISAyudantes);
                this.dnisAyudantes = await datosDNIAyudantes.data;
                //esta funcion carga los dnis de los instructores para ser usados en el select de los instructores
                let funcionDNISInstructores = new FormData;
                funcionDNISInstructores.append('func','mostrarDNISInstructores');
                let datosDNIInstructores = await axios.post(this.APIExterna,funcionDNISInstructores);
                this.dnisInstructores = await datosDNIInstructores.data;
                //etsa fucion carga los nombres de las empresas apra ser utilziados en el select de las empresas
                let funcionEmpresas = new FormData;
                funcionEmpresas.append('func','mostrarEmpresasPorNombre');
                let datos2 = await axios.post(this.APIExterna,funcionEmpresas);
                this.empresas = await datos2.data;
            },
            /*
             * esta funcion asincrona regsitra cursos en la base de datos recibiendo todos los parametros de
             * un formulario
            */
            async registrarCurso(){
                    let funcion = new FormData;
                    funcion.append('func','registrarCurso');
                    funcion.append('empresa',this.nombreEmpresa);
                    funcion.append('fecha',this.fecha);
                    funcion.append('conductor',this.dniConductor);
                    funcion.append('instructor',this.dniInstructor);
                    funcion.append('ayudante',this.dniAyudante);
                    funcion.append('trayecto',this.trayecto);
                    funcion.append('kmIda',this.kmIda);
                    funcion.append('horaIda',this.horaIda);
                    funcion.append('kmLLegada',this.kmLLegada);
                    funcion.append('horaLlegada',this.horaLLegada);
                    let datos = await axios.post(this.APIExterna,funcion);
                    // ponemos todos los parametros a cadena vacia para evitar registrar dos veces el mismo curso
                    this.resultado = datos.data;
                    this.nombreEmpresa = "";
                    this.dniAyudante = "";
                    this.fecha = "";
                    this.dniInstructor = "";
                    this.dniConductor = "";
                    this.horaIda = "";
                    this.horaLLegada= "";
                    this.kmIda = "";
                    this.kmLLegada = "";
                    this.trayecto = "";

            },
            /*
            *esta funcion cierra el dialog y pone todos los valores a cero o cadena vacia
            */
            cerrarBoton(){
                this.resultado = "";
                this.nombreEmpresa = "";
                this.dniAyudante = "";
                this.fecha = "";
                this.dniInstructor = "";
                this.dniConductor = "";
                this.horaIda = "";
                this.horaLLegada= "";
                this.kmIda = "";
                this.kmLLegada = "";
                this.trayecto = "";
                this.dialog = false;
            },
            /*
            * esta funcion abre el dialog y carga lso datos de la base de datos para que esten disponicles
            * en el formulario que le corresponda
            */
            iniciarDialog(){
                this.getAPI();
                this.dialog = true;
            },
        },
        computed: {
            /*
             * Importamos el usuario para validar si es administrador o usuario normal el logueado
             * Importamos las APIS del state para variar entre la del servidor externo y el interno
             */
            ...mapState(['APIExterna','APIXampp','usuario']),
            /**
             * esta funcion valida que todos los parametros necesarios para registrar un curso estan debidabemte rellenados
             * y si es correcto activa el boton de registro de curso
             * @returns {boolean}
             */
            cursoCorrecto(){
                return this.nombreEmpresa !== "" && this.dniConductor !== "" && this.dniInstructor !== "" && this.dniAyudante !== ""
                    && this.fecha !== "" && this.horaIda !== "" && this.kmIda !== "" && this.horaLLegada !== "" && this.kmLLegada !== ""
                    && this.trayecto !== "" && !isNaN(this.kmLLegada) && !isNaN(this.kmIda);

            },
            /*
            * esta funcion valida los kilometros, que esta formado correctamente
             */
            revisionKMIda(){
                return !isNaN(this.kmIda);
            },
            /*
            * esta funcion valida los kilometros, que esta formado correctamente
             */
            revisionKmLLegada(){
                return !isNaN(this.kmLLegada)
            }

        },
        /**
         * cargamoos esta funcion al crear la pagina para tener disponible en el formulario tanto los dnis de la base de datos
         * como los nombres de las empresas
         */
        created() {
            this.getAPI();
        }
    }
</script>

<style scoped>
    p{
        color: rgba(168,17,12,0.65);
    }
</style>