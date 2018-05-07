import { partnerAdd, partnerFind, partnerUpdate } from '@/api/partner'

const partner = {
  state: {

  },
  mutations: {

  },
  actions: {
    PartnerAdd({ commit }, data) {
      return new Promise((resolve, reject) => {
        partnerAdd(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    PartnerFind({ commit }, data) {
      return new Promise((resolve, reject) => {
        partnerFind(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    PartnerUpdate({ commit }, data) {
      return new Promise((resolve, reject) => {
        partnerUpdate(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default partner
