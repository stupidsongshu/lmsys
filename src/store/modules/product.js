import { productList, productUpdateStatus, productUpdateShow, productFind, productCreate, productUpdateFee, propertyConfig } from '@/api/product'

const product = {
	state: {
		productId: sessionStorage.getItem('productId')
	},
	mutations: {
		SET_PRODUCTID(state, productId) {
			sessionStorage.setItem('productId', productId)
			state.productId = productId
		}
	},
	actions: {
		ProductList() {
			return new Promise((resolve, reject) => {
				productList().then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		},
		ProductUpdateStatus({ commit }, data) {
			return new Promise((resolve, reject) => {
				productUpdateStatus(data).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		},
		ProductUpdateShow({ commit }, data) {
			return new Promise((resolve, reject) => {
				productUpdateShow(data).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		},
		ProductFind({ commit }, data) {
			return new Promise((resolve, reject) => {
				productFind(data).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		},
		ProductCreate({ commit }, data) {
			return new Promise((resolve, reject) => {
				productCreate(data).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		},
		SetProductId({ commit }, data) {
			commit('SET_PRODUCTID', data)
		},
		ProductUpdateFee({ commit }, data) {
			return new Promise((resolve, reject) => {
				productUpdateFee(data).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		},
		PropertyConfig({ commit }) {
			return new Promise((resolve, reject) => {
				propertyConfig().then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}

export default product
