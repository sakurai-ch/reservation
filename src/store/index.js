import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    auth: "",
    user_id: "",
    user_name: "",
    email: ""
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
    async login({ commit }) {
      const responseLogin = await axios.post(
        "http://localhost:3000/login",
        {
          auth: true,
          id: 1,
        }
      );
      commit("auth", responseLogin.data.auth);
      commit("user_id", responseLogin.data.id);
      const responseUser = await axios.get(
        "http://localhost:3000/user_data_" + this.state.user_id
      );
      commit("user_name", responseUser.data.user_name);
      commit("email", responseUser.data.email);
    },

    logout({ commit }) {
      axios.post("http://localhost:3000/logout",{
        auth: false
      })
      .then((response) => {
        console.log(response);
        commit("auth", response.data.auth);
        router.replace("/");
      })
    },
  },
  modules: {
  }
})
