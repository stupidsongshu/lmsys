let BASE_API = process.env.BASE_API
let isDev = process.env.NODE_ENV === 'development'

export default {
  fileUpload:               isDev ? BASE_API + '/lm/c/f': BASE_API,
  login:                    isDev ? BASE_API + '/lm/c/i': BASE_API,
  product: {
    productList:            isDev ? BASE_API + '/lm/c/i': BASE_API,
    productUpdateStatus:    isDev ? BASE_API + '/lm/c/i': BASE_API,
    productUpdateShow:      isDev ? BASE_API + '/lm/c/i': BASE_API,
    productFind:            isDev ? BASE_API + '/lm/c/i': BASE_API,
    productCreate:          isDev ? BASE_API + '/lm/c/i': BASE_API,
    productUpdateFee:       isDev ? BASE_API + '/lm/c/i': BASE_API,
    propertyConfigGet:      isDev ? BASE_API + '/lm/c/i': BASE_API,
    propertyConfigAdd:      isDev ? BASE_API + '/lm/c/i': BASE_API,
    productUpdateCharacter: isDev ? BASE_API + '/lm/c/i': BASE_API,
  },
  partner: {
    partnerList:            isDev ? BASE_API + '/lm/c/i': BASE_API,
    partnerFind:            isDev ? BASE_API + '/lm/c/i': BASE_API,
    partnerAdd:             isDev ? BASE_API + '/lm/c/i': BASE_API,
    partnerUpdate:          isDev ? BASE_API + '/lm/c/i': BASE_API,
  }
}
