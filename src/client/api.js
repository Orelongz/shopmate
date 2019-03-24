import axios from 'axios';

const basePath = '/api';

export default {
  user: {
    signup: credentials => axios.post(
      `${basePath}/auth/signup`,
      { ...credentials }
    )
      .then(res => res.data.customer),

    login: credentials => axios.post(
      `${basePath}/auth/login`,
      { ...credentials }
    )
      .then(res => res.data.customer),

    userDetails: () => axios.get(`${basePath}/auth/user`)
      .then(res => res.data.customer),
  },
  product: {
    fetchProducts: query => axios.get(`${basePath}/products?${query}`)
      .then(res => res.data),

    getProduct: id => axios.get(`${basePath}/products/${id}`)
      .then(res => res.data),
  },
  category: {
    fetchCategories: id => axios.get(`${basePath}/departments/${id}/categories`)
      .then(res => res.data)
  },
  shipping: {
    getShippingTypes: () => axios.get(`${basePath}/shipping`)
      .then(res => res.data)
  },
  order: {
    checkout: credentials => axios.post(
      `${basePath}/checkout`,
      { ...credentials }
    )
      .then(res => res.data)
  },
  department: {
    fetchDepartments: () => axios.get(`${basePath}/departments`)
      .then(res => res.data)
  },
  cart: {
    cartAddProduct: credentials => axios.post(
      `${basePath}/carts`,
      { ...credentials }
    )
      .then(res => res.data),

    getCart: cartId => axios.get(`${basePath}/carts/${cartId}`)
      .then(res => res.data),

    updateProductInCart: (credentials, cartId) => axios.put(
      `${basePath}/carts/${cartId}`,
      { ...credentials }
    )
      .then(res => res.data),

    removeProduct: (cartId, itemId) => axios.delete(`${basePath}/carts/${cartId}/items/${itemId}`)
      .then(res => res.data),

    clearProductsFromCart: cartId => axios.delete(`${basePath}/carts/${cartId}`)
      .then(res => res.data),
  },
};
