export function getUserInfo() {
  return sessionStorage.getItem('userInfo')
}

export function setUserInfo(userInfo) {
  sessionStorage.setItem('userInfo', userInfo)
}

export function removeUserInfo() {
  sessionStorage.removeItem('userInfo')
}
