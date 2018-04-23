import axios from 'axios'
import store from '../store'
// import store from ''
import md5 from 'blueimp-md5'
// import CryptoJS from 'cryptojslib/components/aes-min.js'
import CryptoJS from 'crypto-js'
import config from '@/config'
import { Message, MessageBox } from 'element-ui'
import { getUserInfo } from '@/utils/auth'

// console.log(CryptoJS)
console.log(store)
export default function httpSign(url, call, data) {
  let ua = config.ua
  let signKey = config.signKey
  let cryptoKey = config.cryptoKey
  let cryptoIv = config.cryptoIv
  let timestamp = new Date().getTime()
  let sign =  md5(ua + "&" + call + "&" + timestamp + "&" + signKey)

  let commonArgs = {}
  let userInfo = getUserInfo()
  userInfo = JSON.parse(userInfo)
  if (userInfo && userInfo.token) {
    commonArgs = {
      account: userInfo.account,
      token: userInfo.token
    }
  }
  let args = Object.assign({}, commonArgs, data)

  let params = JSON.stringify({
    ua,
    call,
    args,
    sign,
    timestamp
  })
  console.log(JSON.parse(params))
  let key = CryptoJS.enc.Utf8.parse(cryptoKey)
  let iv  = CryptoJS.enc.Utf8.parse(cryptoIv)
  let encrypted = CryptoJS.AES.encrypt(params, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  // const service = axios.create({
  //   baseURL: process.env.BASE_API,
  //   method: 'post'
  //   // timeout: 20000
  // })

  return new Promise((resolve, reject) => {
    axios({
      url: process.env.BASE_API + url,
      method: 'post',
      data: encrypted.toString()
    }).then(res => {
      let decrypted = CryptoJS.AES.decrypt(res.data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })

      let resData = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted).toString())
      resolve(resData)
      // if (resData.returnCode === '000000') {
      //   resolve(resData.response)
      // } else {
      //   reject(resData)
      // }
  
      // return new Promise((resolve, reject) => {
      //   let resData = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted).toString())
      //   if (resData.returnCode === '000000') {
      //     console.log('success')
      //     resolve(resData)
      //   } else {
      //     console.log('error')
      //     reject(resData)
      //   }
      // })
    })
  })

  // service.interceptors.request.use(config => {
  //   return config
  // })

  // return service
}
