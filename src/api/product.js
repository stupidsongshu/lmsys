import httpSign from '../utils/http'
import api from '../api/api'

export function productList() {
  let url = api.product.productList
	let call = 'Product.list'
	return httpSign({url, call})
}

export function productUpdateStatus(data) {
  let url = api.product.productUpdateStatus
	let call = 'Product.updateStatus'
	return httpSign({url, call, data})
}

export function productUpdateShow(data) {
  let url = api.product.productUpdateShow
	let call = 'Product.updateShow'
	return httpSign({url, call, data})
}

export function productFind(data) {
  let url = api.product.productFind
	let call = 'Product.find'
	return httpSign({url, call, data})
}

export function productCreate(data) {
  let url = api.product.productCreate
	let call = 'Product.create'
	return httpSign({url, call, data})
}

export function productUpdateFee(data) {
  let url = api.product.productUpdateFee
	let call = 'Product.updateFee'
	return httpSign({url, call, data})
}

export function propertyConfigGet() {
  let url = api.product.propertyConfigGet
	let call = 'Property.config'
	return httpSign({url, call})
}

export function propertyConfigAdd(data) {
  let url = api.product.propertyConfigAdd
	let call = 'Property.addPropertyValue'
	return httpSign({url, call, data})
}

export function productUpdateCharacter(data) {
  let url = api.product.productUpdateCharacter
	let call = 'Product.updateCharacter'
	return httpSign({url, call, data})
}
