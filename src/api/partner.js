import httpSign from '../utils/http'
import api from '../api/api'

export function partnerList() {
  let url = api.partner.partnerList
	let call = 'Partner.list'
	return httpSign({url, call})
}

export function partnerFind(data) {
  let url = api.partner.partnerFind
	let call = 'Partner.find'
	return httpSign({url, call, data})
}

export function partnerAdd(data) {
  let url = api.partner.partnerAdd
	let call = 'Partner.add'
	return httpSign({url, call, data})
}

export function partnerUpdate(data) {
  let url = api.partner.partnerUpdate
	let call = 'Partner.update'
	return httpSign({url, call, data})
}
