import { getUserInfo, setUserInfo, removeUserInfo } from '@/utils/auth'
import { login } from '@/api/login'

const user = {
  state: {
    userInfo: getUserInfo()
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => state.userInfo = userInfo
  },
  actions: {
    Login: ({ commit }, userInfo) => {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          if (res.returnCode === '000000') {
            setUserInfo(JSON.stringify(res.response))
            commit('SET_USERINFO', JSON.stringify(res.response))
            resolve()
          } else {
            reject(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_USERINFO', '')
        removeUserInfo()
        resolve()
      })
    }
  }
}

export default user
