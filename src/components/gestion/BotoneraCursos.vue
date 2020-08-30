<template>
    <v-container fluid>
        <MostrarCursos></MostrarCursos>
        <IntroducirCurso></IntroducirCurso>
        <ModificarCurso></ModificarCurso>
        <EliminarCurso></EliminarCurso>
    </v-container>
</template>

<script>
    import EliminarCurso from "./botones/EliminarCurso";
    import ModificarCurso from "./botones/ModificarCurso";
    import MostrarCursos from "./botones/MostrarCursos";
    import IntroducirCurso from "./botones/IntroducirCurso";
    export default {
        name: "BotoneraCursos",
        components: {
            MostrarCursos,
            IntroducirCurso,
            EliminarCurso,
            ModificarCurso
        }
    }
</script>

<style scoped>

</style>