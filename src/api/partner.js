import httpSign from '../utils/http'

export function partnerList() {
	let url = '/lm/c/i'
	let call = 'Partner.list'
	return httpSign(url, call)
}

export function partnerFind(data) {
	let url = '/lm/c/i'
	let call = 'Partner.find'
	return httpSign(url, call, data)
}

export function partnerAdd(data) {
	let url = '/lm/c/i'
	let call = 'Partner.add'
	return httpSign(url, call, data)
}

export function partnerUpdate(data) {
	let url = '/lm/c/i'
	let call = 'Partner.update'
	return httpSign(url, call, data)
}
