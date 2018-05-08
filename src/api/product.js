import httpSign from '../utils/http'

export function productList() {
	let url = '/lm/c/i'
	let call = 'Product.list'
	return httpSign(url, call)
}

export function productUpdateStatus(data) {
    let url = '/lm/c/i'
    let call ='Product.updateStatus'
    return httpSign(url, call, data)
}

export function productUpdateShow(data) {
    let url = '/lm/c/i'
    let call = 'Product.updateShow'
    return httpSign(url, call, data)
}

export function productFind(data) {
    let url = '/lm/c/i'
    let call = 'Product.find'
    return httpSign(url, call, data)
}
