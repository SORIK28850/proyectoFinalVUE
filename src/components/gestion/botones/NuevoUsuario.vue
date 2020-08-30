<!-- Componente que crea un dialog con un formulario de registro de nuevo usuario -->
<template>
    <v-container fluid>
        <v-dialog v-model="dialog" persistent max-width="600px"> <!-- Se trata de una ventana tipo popup que contiene un formulario -->
            <template v-slot:activator="{ on }">
                <v-btn light block v-on="on">REGISTRO NUEVO USUARIO</v-btn><!-- Este boton carga el dialog-->
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Registro de usuario</span>
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="crearUsuario({email:email,pass:pass1})"> <!-- esta funcion esta declarada en store -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" lg="10">
                                    <v-text-field
                                            v-model="email"
                                            label="* email"
                                            solo
                                            dense
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="pass1"
                                            label="* contraseña"
                                            solo
                                            dense
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="pass2"
                                            label="* repite contraseña"
                                            solo
                                            dense
                                    ></v-text-field>
                                    <v-btn type="submit" :disabled="!passCoinciden"
                                           @click="dialog = false"
                                    >Registrar</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                    <small>{{error}}</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    /*
    importacion de los modulos de Vue que se utilizan en este componente, exportacion con sus condiciones
    y elementos, y css personalizado
     */
    import { mapActions, mapState } from "vuex";
    export default {
        name: "NuevoUsuario",
        data: ()=>({ // mediante la opcion v-model de los text-fields se actualizan de manera reactiva los datos
            email: '', //el email se va actualizando cada ver que se cambia una letra en la caja de texto
            pass1: '', //el pass1 se va actualizando cada ver que se cambia una letra en la caja de texto
            pass2: '', //el pass2 se va actualizando cada ver que se cambia una letra en la caja de texto
            dialog: false, //mientras está en false el dialog no se ve, si registramos o cerramos vuelve a false
        }),
        methods:{
            //se importa la funcion crearUsuario que esta ne el store para ser utilizada aqui
            ...mapActions(['crearUsuario']),
        },
        computed: {
            ...mapState(['error']),
            /**
             * Esta funcion se encarga de ir comprobando tanto el email como los password,
             * y no activa el boton registrar hasta que esten ambas correctas.
             * @returns {boolean}
             */
            passCoinciden(){
                let emailValidado = false;
                //la expresion regular de aqui abajo sirve para comprobar el email
                let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                if(emailRegex.test(this.email)){ //este if cambia a true si pasa el test de la expresion regular el email
                    emailValidado = true;
                }
                //devolvemos true si tanto el email como los password pasan los filtros
                return this.pass1 === this.pass2 && this.pass1 !== '' && emailValidado;
            }
        },
    }
</script>