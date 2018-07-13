// const app = {
//   state: {
//     sidebar: {
//       opened: !sessionStorage.getItem('sidebarStatus')
//     }
//   },
//   mutations: {
//     TOGGLE_SIDEBAR: state => {
//       if (state.sidebar.opened) {
//         sessionStorage.setItem('sidebarStatus', 1)
//       } else {
//         sessionStorage.setItem('sidebarStatus', 0)
//       }
//       state.sidebar.opened = !state.sidebar.opened
//     }
//   },
//   actions: {
//     ToggleSideBar: ({ commit }) => {
//       commit('TOGGLE_SIDEBAR')
//     }
//   }
// }

// export default app

import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+sessionStorage.getItem('sidebarStatus')
    },
    language: Cookies.get('language') || 'en'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        sessionStorage.setItem('sidebarStatus', 1)
      } else {
        sessionStorage.setItem('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    SetLanguage: ({commit}, language) => {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
