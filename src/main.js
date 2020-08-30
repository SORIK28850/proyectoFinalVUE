//importacion de plugins y elementos de Vue
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import axios from "axios";
import VueAxios from "vue-axios";
import Vuelidate from "vuelidate";

//archivos  de google firebase
var firebase = require("firebase/app");
require ("firebase/auth");
//require("firebase/database");
//require("firebase/firestore");
//require("firebase/messaging");
//require("firebase/functions");

//llamada a los productos de firebase

var firebaseConfig = {
  apiKey: "",
  authDomain: ".firebaseapp.com",
  databaseURL: "https://.firebaseio.com",
  projectId: "",
  storageBucket: ".appspot.com",
  messagingSenderId: "",
  appId: "1::web:e7fe19323441d70d9cf2d3",
  measurementId: "G-"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

//inicialización de carrusel 3d y otros complementos
Vue.use(VueAxios,axios,Vuelidate);

//discriminacion de usuarios registrados para el acceso a las rutas protegidas

Vue.config.productionTip = false
firebase.auth().onAuthStateChanged((user) =>{
  if(user){
    store.dispatch('detectarUsuario',{email:user.email,id:user.uid});
  }else {
    store.dispatch('detectarUsuario',null);
  }

  //inicialización de la aplicación Vue
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app');
});


