import { getUserInfo } from '@/utils/auth'

const user = {
  state: {
    userInfo: getUserInfo()
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => state.userInfo = userInfo
  },
  actions: {
    Login: ({commit, state}, userInfo) => {
      return new Promise((resolve, reject) => {
        
      })
    }
  }
}

export default user
