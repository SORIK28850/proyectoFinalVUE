<!--  -->
<template>
    <v-container fluid>
        <v-dialog v-model="dialog" persistent max-width="600px" v-if="!existeUsuario">
            <template v-slot:activator="{ on }">
                <v-row class="text-center">
                    <v-col cols="12"><v-btn light v-on="on">Acceder</v-btn></v-col>
                </v-row>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Inicio de sesión</span>
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="ingresoUsuario({email:email,pass:pass1})">
                        <v-container>
                            <v-row>
                                <v-col cols="12" lg="10">
                                    <v-text-field style="display: none"
                                            v-model="email"
                                            label="email"
                                            solo
                                            dense
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="email"
                                            label="email"
                                            solo
                                            dense
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="pass1"
                                            label="contraseña"
                                            solo
                                            dense
                                    ></v-text-field>
                                    <v-btn type="submit"
                                           @click="dialog = false"
                                    >Acceder</v-btn>
                                    <v-btn @click="dialog = false"
                                    >Cerrar</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
    import { mapActions, mapState, mapGetters} from "vuex";
    export default {
        name: "FormSesion",
        data: ()=>({
            email: '',
            pass1: '',
            pass2: '',
            dialog: false,
        }),
        methods:{
            ...mapActions(['ingresoUsuario','cerrarSesion']),
        },
        computed: {
            ...mapState(['error','usuario']),
            ...mapGetters(['existeUsuario'])
        }
    }
</script>
