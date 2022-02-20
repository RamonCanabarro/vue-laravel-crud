import { http } from '../config/http'

const createProduct = (payload) => {
  return http({
    url: `products`,
    method: 'POST',
    data: payload
  })
}

export const productService = {
    createProduct
  }