<template>
    <v-container fluid>
        <MostrarPersonal></MostrarPersonal>
        <IntroduccionPersonal v-if="usuarioCorrecto"></IntroduccionPersonal>
        <ModificarPersonal v-if="usuarioCorrecto"></ModificarPersonal>
        <EliminarPersonal v-if="usuarioCorrecto"></EliminarPersonal>
    </v-container>
</template>

<script>
    import IntroduccionPersonal from "./botones/IntroduccionPersonal";
    import MostrarPersonal from "./botones/MostrarPersonal";
    import EliminarPersonal from "./botones/EliminarPersonal";
    import ModificarPersonal from "./botones/ModificarPersonal";
    import { mapState } from "vuex";
    export default {
        name: "BotoneraPersonal",
        components: {
            IntroduccionPersonal,
            ModificarPersonal,
            EliminarPersonal,
            MostrarPersonal,
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