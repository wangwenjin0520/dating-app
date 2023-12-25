import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userid: ""
  },
  mutations: {
    setUserid(state, value) {
      state.userid = value;
    }
  },

  getters: {
    getUserid(state) {
      return state.userid;
    }
  }
});
