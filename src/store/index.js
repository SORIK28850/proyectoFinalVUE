import Vue from 'vue';
import Vuex from 'vuex';
import router from "../router";
var firebase = require("firebase/app");

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: '',
    error: '',
    APIExterna: 'https://www.sorik.es/incefor/src/API/API.php',
    APIXampp: 'http://localhost/Vue.JS/API/API.php',
  },
  mutations: {
    setUsuario(state,payload){
      state.usuario = payload;
    },
    setError(state, payload){
      state.error = payload;
    }
  },
  actions: {
    crearUsuario({commit},payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email,payload.pass)
          .then(res => {
            commit('setUsuario',{email:res.user.email,id:res.user.uid})
          })
          .catch( err => {
            commit('setError',err.message);
          });
    },
    ingresoUsuario({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email,payload.pass)
          .then( res => {
            commit('setUsuario',{email:res.user.email,id:res.user.uid});
            router.push('gestion');
          })
          .catch( err => {
            commit('setError',err.message);
          })
    },
    detectarUsuario({commit}, payload){
        if(payload !== null){
            commit ('setUsuario',{email:payload.email,id:payload.uid});
        }else{
            commit ('setUsuario', null);
        }

    },
    cerrarSesion({commit}){
        firebase.auth().signOut();
        commit('setUsuario', '');
        router.push('/');
    }
  },
    getters: {
      existeUsuario(state){
          return !(state.usuario === null || state.usuario === '' || state.usuario === undefined);
      }
    },
})
