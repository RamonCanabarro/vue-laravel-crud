import { productService } from '../../services'

const actions = {
    createProduct: underLoadingFunction(async({ commit }, payload) => {
      try {
        const { data } = await productService.createProduct(payload)
        console.log(data)
        return data.data
      } catch (error) {
        return false
      }
    })
  }