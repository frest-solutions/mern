import { categoriesAPI } from '../../api'

const categories = {}

categories.types = {
  LOADING: 'categories/LOADING',
  SET_CATEGORIES: 'categories/SET_CATEGORIES',
  ERROR: 'categories/ERROR'
}

const initialState = {
  items: [],
  loading: false,
  error: null
}

categories.reducer = (state = initialState, action) => {
  switch (action.type) {

    case categories.types.LOADING:
      return {
        ...state, loading: action.payload, error: null
      }

    case categories.types.SET_CATEGORIES:
      return {
        ...state, items: action.payload, error: null
      }

    case categories.types.ERROR:
      return {
        ...state, loading: false, error: action.payload
      }

    default:
      return state
  }
}

categories.actions = {
  loading: (item) => {
    return {
      type: categories.types.LOADING,
      payload: item
    }
  },
  setCategories: (items) => {
    return {
      type: categories.types.SET_CATEGORIES,
      payload: items
    }
  },
  error: (error) => {
    return {
      type: categories.types.ERROR,
      payload: error
    }
  },
  getCategories: () => {
    return async (dispatch) => {
      try {
        dispatch(categories.actions.loading(true))
        const response = await categoriesAPI.getCategories()

        if (response.statusText !== 'OK') {
          throw new Error(response.message || 'Что-то пошло не так')
        }

        dispatch(categories.actions.setCategories(response.data))
        dispatch(categories.actions.loading(false))
      } catch (e) {
        dispatch(categories.actions.error(e))
      }
    }
  }
}

export default categories
