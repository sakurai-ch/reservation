import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    auth: "",
    user_id: "",
    user_name: "",
    email: "",
    token: "",
    manager: null,
    administrator: null,
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    user_id(state, payload) {
      state.user_id = payload;
    },
    user_name(state, payload) {
      state.user_name = payload;
    },
    email(state, payload) {
      state.email = payload;
    },
    token(state, payload) {
      state.token = payload;
    },
    manager(state, payload) {
      state.manager = payload;
    },
    administrator(state, payload) {
      state.administrator = payload;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const responseLogin = await axios.post(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/login", {
        email: email,
        password: password,
      });
      console.log(responseLogin);
      
      commit("token", responseLogin.data.access_token);
      commit("auth", responseLogin.data.auth);
      commit("user_id", responseLogin.data.user_data.id);
      commit("user_name", responseLogin.data.user_data.user_name);
      commit("email", responseLogin.data.user_data.email);
      commit("manager", responseLogin.data.user_data.manager);
      commit("administrator", responseLogin.data.user_data.administrator);
    },     

    async logout({ commit }) {
      const responseLogout = await axios.post(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/logout",
        // { auth: this.state.auth },
        { data: ""},
        { headers: { Authorization: 'Bearer ' + this.state.token } }
      );
      console.log(responseLogout);
      commit("auth", responseLogout.data.auth);
      commit("user_id", "");
      commit("user_name", "");
      commit("email", "");
      commit("token", "");
      commit("manager", null);
      commit("administrator", null);
    },
  },
  modules: {
  }
})
