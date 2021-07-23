import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    currency: {}
  },
  actions: {
      async fetchCurrency() {
//        const key = process.env.VUE_APP_FIXER
    //    let res = (await fetch(`https://www.nbrb.by/api/exrates/rates?periodicity=0`)).json()
    let res = await fetch(`https://www.nbrb.by/api/exrates/rates?periodicity=0`)
      .then((response) => {
        return response.json()
      })
      .then(data => {
        let curses = {}
        for (let key in data) {
          curses[data[key].Cur_Abbreviation] = {
            id: data[key].Cur_Abbreviation,
            date: data[key].Date,
            curs: data[key].Cur_OfficialRate / data[key].Cur_Scale,
            name: data[key].Cur_Name
          }
        }
        return curses
      })
      return await res
        }
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },

  modules: {
    auth,
    info,
    category,
    record
  }
})
