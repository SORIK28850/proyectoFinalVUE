
<template>
    <v-container>
        <v-btn
                light
                block
                @click="iniciarDialog()"
        >
            Experimento
        </v-btn>
        <v-dialog
                v-model="dialog"
                max-width="1280"
        >
            <v-card>
                <v-card-title class="headline">Experimento</v-card-title>

                <v-card-text>
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
                            @click="dialog = false"
                    >
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>


<script>
    import axios from "axios";

    export default {
        name: "Experimento",
        data: ()=>({
            dialog: false,//abre o cierra el dialog dependeiendo de su valor
            headers: [
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
            desserts: [
            ],
        }),
        methods: {
            iniciarDialog(){
                this.dialog = true;
                this.getAPI();
            },
            async getAPI(){
                //un objeto Formdata nos sirve para hacer la llamada a la api ya que puede guardar varios
                //parametros dentro de si.
                let funcion = new FormData;
                funcion.append('func','mostrarPersonal');
                //let datos = await axios.post('http://localhost/Vue.JS/API/API.php',funcion);
                let datos = await axios.post('https://www.sorik.es/incefor/src/API/API.php',funcion);
                this.desserts = await datos.data;
            },
        },
        components: {

        },
    }
</script>


<style scoped>

</style>