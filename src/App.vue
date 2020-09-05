<!-- template que contiene la app completa  -->
<template>
  <v-app id="inspire">  <!-- elemento navBar -->
    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            color="#f5f5f5"
    >
      <v-img src="https://" class="logoMenu"></v-img>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link style="text-decoration: none;" :to="{name:'servicios'}">
              <v-list-item-title class="tituloSeccion">
                Servicios
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-comment-processing</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="tituloSeccion">Contacto</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account-key</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link style="text-decoration: none;" :to="{name:'personal'}">
              <v-list-item-title class="tituloSeccion">
                Personal
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-if="existeUsuario" >
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link style="text-decoration: none" :to="{name:'gestion'}">
              <v-list-item-title class="tituloSeccion">
                Gestión interna
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content v-if="existeUsuario" style="color: rgba(36,36,36,0.65)">
              {{usuario.email}}
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-app-bar
            app
            clipped-left
            color="#EEEEEE"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <router-link style="text-decoration: none; color: black" :to="{name:'Home'}">
        <v-toolbar-title><b style="color: black">Ince</b><b style="color: red">for</b> España</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn v-if=existeUsuario @click="cerrarSesion" light>Salir</v-btn>
    </v-app-bar>


    <v-content>
      <v-container
              class="fill-height"
              fluid
      >
        <router-view></router-view> <!-- Contenido de la vista -->
        <v-footer
                app
                color="#EEEEEE"
                height="70px"
                class="sombraFooter"
        >
          <v-card
                  class="flex"
                  flat
                  tile
                  color="#EEEEEE"

          >
            <v-card-title>
              <v-row>
                <v-col cols="12" md="5" class="text-left">
                  <v-btn
                          class="mx-5"
                          icon
                          href="https://www.linkedin.com//"

                  >
                    <v-icon size="30px">mdi-linkedin-box</v-icon>
                  </v-btn>
                  <v-btn
                          class="mx-5"
                          icon
                          href="https://www.facebook.com"

                  >
                    <v-icon size="30px">mdi-facebook-box</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>
          </v-card>
        </v-footer>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  //importacion de elementos de la aplicacion que se utilizan en la raiz de la app
  import {mapState , mapGetters, mapActions} from "vuex";

  // exportacion de la aplicacion con sus parámetros y elementos
  export default {
    name: 'App',
    props: {
      source: String,
    },
    data: () => ({
      drawer: false,
      icons: [
        'mdi-twitter',
        'mdi-linkedin-box',
        'mdi-facebook-box',
        'mdi-instagram',
      ],
      hrefs: [
        'https://twitter.com/',
        'https://www.linkedin.com/',
        'https://www.facebook.com/',
        'https://www.instagram.com/',

      ],
    }),
    computed: {
      ...mapState(['usuario']),
      ...mapGetters(['existeUsuario']),
    },
    methods: {
      ...mapActions(['cerrarSesion']),
    },
    created () {
      this.$vuetify.theme.dark = false;
    },
  }
</script>
<style>
  /*
  CSS personalizado para la parte raiz de la app
   */
  #inspire{
    font-family: Merriweather-Regular, serif;
  }
  .logoMenu{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .sombraFooter{
    box-shadow: 0px -4px 6px -1px rgba(0,0,0,0.55);
  }
  .tituloSeccion{
    color: rgba(17,17,17,0.65);
  }
</style>
