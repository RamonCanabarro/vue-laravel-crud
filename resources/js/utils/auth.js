const token_key = 'BACKOFFICE-ITAJUBA-TOKEN'

export function localStorageExpires() {
  const toRemove = []
  const currentDate = new Date().getTime()

  for (let i = 0, j = localStorage.length; i < j; i++) {
    const key = localStorage.key(i)
    let current = localStorage.getItem(key)

    if (current && /^\{(.*?)\}$/.test(current)) {
      current = JSON.parse(current)
      if (current.expires && current.expires <= currentDate) {
        toRemove.push(key)
      }
    }
  }
  for (let i = toRemove.length - 1; i >= 0; i--) {
    localStorage.removeItem(toRemove[i])
  }
}

export async function setToken(user, exp) {
  if (user.token) {
    const expires = exp * 1000

    localStorage.setItem(token_key, JSON.stringify({
      'value': user.token,
      'expires': expires,
      'user': user
    }))
  }
  return user.token
}

export function getToken() {
  // localStorageExpires()
  const tokenValid = localStorage.getItem(token_key)

  if (tokenValid && /^\{(.*?)\}$/.test(tokenValid)) {
    const token = JSON.parse(tokenValid)
    return token.value
  }
  return false
}

export function getUser() {
  // localStorageExpires()
  const tokenValid = localStorage.getItem(token_key)

  if (tokenValid && /^\{(.*?)\}$/.test(tokenValid)) {
    const token = JSON.parse(tokenValid)
    return token.user
  }
  return false
}

export function removeToken() {
  return localStorage.removeItem(token_key)
}
