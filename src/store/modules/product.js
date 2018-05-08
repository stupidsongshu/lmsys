import { productList, productUpdateStatus, productUpdateShow, productFind } from '@/api/product'

const product = {
	state: {},
	mutations: {},
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
		}
	}
}

export default product
