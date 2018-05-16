import httpSign from '../utils/http'

let url = '/lm/c/i'

export function productList() {
	let call = 'Product.list'
	return httpSign({url, call})
}

export function productUpdateStatus(data) {
	let call = 'Product.updateStatus'
	return httpSign({url, call, data})
}

export function productUpdateShow(data) {
	let call = 'Product.updateShow'
	return httpSign({url, call, data})
}

export function productFind(data) {
	let call = 'Product.find'
	return httpSign({url, call, data})
}

export function productCreate(data) {
	let call = 'Product.create'
	return httpSign({url, call, data})
}

export function productUpdateFee(data) {
	let call = 'Product.updateFee'
	return httpSign({url, call, data})
}

export function propertyConfigGet() {
	let call = 'Property.config'
	return httpSign({url, call})
}

export function propertyConfigAdd(data) {
	let call = 'Property.addPropertyValue'
	return httpSign({url, call, data})
}

export function productUpdateCharacter(data) {
	let call = 'Product.updateCharacter'
	return httpSign({url, call, data})
}
