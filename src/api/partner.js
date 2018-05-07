import httpSign from '../utils/http'

export function getPartnerList() {
	let url = '/lm/c/i'
	let call = 'Partner.list'
	return httpSign(url, call)
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
