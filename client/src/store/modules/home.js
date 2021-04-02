import {categoriesAPI} from '../../api'

const home = {}

home.types = {
  LOADING: 'home/LOADING',
  SET_SERVICES: 'home/SET_SERVICES',
  ERROR: 'home/ERROR'
}

const initialState = {
  items: [],
  loading: false,
  error: null
}

home.reducer = (state = initialState, action) => {
  switch (action.type) {

    case home.types.LOADING:
      return {
        ...state, loading: action.payload, error: null
      }

    case home.types.SET_SERVICES:
      return {
        ...state, items: action.payload, error: null
      }

    case home.types.ERROR:
      return {
        ...state, loading: false, error: action.payload
      }

    default:
      return state
  }
}

home.actions = {
  loading: (item) => {
    return {
      type: home.types.LOADING,
      payload: item
    }
  },
  setServices: (items) => {
    return {
      type: home.types.SET_SERVICES,
      payload: items
    }
  },
  error: (error) => {
    return {
      type: home.types.ERROR,
      payload: error
    }
  },
  getAllServices: () => {
    return async (dispatch) => {
      try {
        dispatch(home.actions.loading(true))
        const response = await categoriesAPI.getServices()

        if (response.statusText !== 'OK') {
          throw new Error(response.message || 'Что-то пошло не так')
        }
        dispatch(home.actions.setServices(response.data))
        dispatch(home.actions.loading(false))
      } catch (e) {
        dispatch(home.actions.error(e))
      }
    }
  },
}

export default home
