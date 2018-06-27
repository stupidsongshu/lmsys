import { getUserInfo, setUserInfo, removeUserInfo } from '@/utils/auth'
import { login } from '@/api/login'

const user = {
  state: {
    userInfo: getUserInfo()
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => state.userInfo = userInfo,
    DEL_USERINFO: _ => {
      removeUserInfo()
    }
  },
  actions: {
    Login: ({ commit }, userInfo) => {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          if (res.returnCode === '000000') {
            let data = res.response
            setUserInfo(JSON.stringify(data))
            commit('SET_USERINFO', JSON.stringify(data))
            resolve(res)
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
        commit('DEL_USERINFO')
        resolve()
      })
    }
  }
}

export default user
