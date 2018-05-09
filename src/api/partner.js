import httpSign from '../utils/http'

let url = '/lm/c/i'

export function partnerList() {
	let call = 'Partner.list'
	return httpSign({url, call})
}

export function partnerFind(data) {
	let call = 'Partner.find'
	return httpSign({url, call, data})
}

export function partnerAdd(data) {
	let call = 'Partner.add'
	return httpSign({url, call, data})
}

export function partnerUpdate(data) {
	let call = 'Partner.update'
	return httpSign({url, call, data})
}
