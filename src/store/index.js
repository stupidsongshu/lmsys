import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import partner from './modules/partner'
import sort from './modules/sort'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    partner,
    sort
  },
  getters
})

export default store
