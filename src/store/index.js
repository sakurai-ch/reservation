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
  },
  actions: {
    async login({ commit }, {email, password}) {
      const responseLogin = await axios.post(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/login",
        {
          email: email,
          password: password,
        });
      console.log(responseLogin);
      
      const token = responseLogin.data.access_token;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      commit("auth", responseLogin.data.auth);
      commit("user_id", responseLogin.data.id);

      const responseUser = await axios.get(
        "https://mysterious-fjord-19119.herokuapp.com/api/v1/user", {
          params: { user_id : this.state.user_id }
      });
      commit("user_name", responseUser.data.data.user_name);
      commit("email", responseUser.data.data.email);
    },

    async logout({ commit }) {
      const responseLogout = await axios.post("https://mysterious-fjord-19119.herokuapp.com/api/v1/logout", {
        auth: this.state.auth
      });
      console.log(responseLogout);
      commit("auth", responseLogout.data.auth);
      commit("user_id", "");
      commit("user_name", "");
      commit("email", "");
    },
  },
  modules: {
  }
})
