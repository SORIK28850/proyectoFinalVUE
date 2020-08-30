<template>
    <v-container fluid>
        <MostrarEmpresas></MostrarEmpresas>
        <IntroducirEmpresa v-if="usuarioCorrecto"></IntroducirEmpresa>
        <ModificarEmpresa v-if="usuarioCorrecto"></ModificarEmpresa>
        <EliminarEmpresa v-if="usuarioCorrecto"></EliminarEmpresa>
    </v-container>
</template>

<script>
    import IntroducirEmpresa from "./botones/IntroducirEmpresa";
    import MostrarEmpresas from "./botones/MostrarEmpresas";
    import EliminarEmpresa from "./botones/EliminarEmpresa";
    import ModificarEmpresa from "./botones/ModificarEmpresa";
    import { mapState } from "vuex";
    export default {
        name: "BotoneraEmpresas",
        components: {
            MostrarEmpresas,
            IntroducirEmpresa,
            EliminarEmpresa,
            ModificarEmpresa,
        },
        computed: {
            ...mapState(['usuario']),
            /*
           * esta funcion valida el usuairo, que es el administrador el que esta iniciando sesion y modificando los datos
            */
            usuarioCorrecto(){
                let usuarioMaestro = false;
                if(this.usuario.email === "ncreador@gmail.com"){
                    usuarioMaestro = true;
                }
                return usuarioMaestro;
            },
        }
    }
</script>

<style scoped>

</style>