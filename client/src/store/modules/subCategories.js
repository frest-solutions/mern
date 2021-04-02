import { categoriesAPI } from '../../api'

const subCategories = {}

subCategories.types = {
  LOADING: 'subCategories/LOADING',
  SET_SUBCATEGORY: 'subCategories/SET_SUBCATEGORY',
  SET_SERVICES: 'subCategories/SET_SERVICES',
  SET_CATEGORY: 'subCategories/SET_CATEGORY',
  ERROR: 'subCategories/ERROR'
}

const initialState = {
  loading: false,
  items: [],
  services: [],
  category: null,
  error: null
}

subCategories.reducer = (state = initialState, action) => {
  switch (action.type) {

    case subCategories.types.LOADING:
      return {
        ...state, loading: action.payload, error: null
      }

    case subCategories.types.SET_SUBCATEGORY:
      return {
        ...state, items: action.payload, error: null
      }

    case subCategories.types.SET_SERVICES:
      return {
        ...state, services: action.payload, error: null
      }

    case subCategories.types.SET_CATEGORY:
      return {
        ...state, category: action.payload, error: null
      }

    case subCategories.types.ERROR:
      return {
        ...state, loading: false, error: action.payload
      }

    default:
      return state
  }
}

subCategories.actions = {
  loading: (item) => {
    return {
      type: subCategories.types.LOADING,
      payload: item
    }
  },
  setSubCategory: (items) => {
    return {
      type: subCategories.types.SET_SUBCATEGORY,
      payload: items
    }
  },
  setServices: (subItems) => {
    return {
      type: subCategories.types.SET_SERVICES,
      payload: subItems
    }
  },
  setCategory: (item) => {
    return {
      type: subCategories.types.SET_CATEGORY,
      payload: item
    }
  },
  error: (error) => {
    return {
      type: subCategories.types.ERROR,
      payload: error
    }
  },
  getSubCategory: (id) => {
    return async (dispatch) => {
      try {
        dispatch(subCategories.actions.loading(true))
        const response = await categoriesAPI.getCategory(id)

        if (response.statusText !== 'OK') {
          throw new Error(response.message || 'Что-то пошло не так')
        }
        dispatch(subCategories.actions.setCategory(response.data.category))
        dispatch(subCategories.actions.setServices(response.data.services))
        dispatch(subCategories.actions.setSubCategory(response.data.subcategories))

        dispatch(subCategories.actions.loading(false))
      } catch (e) {
        dispatch(subCategories.actions.error(e))
      }
    }
  }
}

export default subCategories
