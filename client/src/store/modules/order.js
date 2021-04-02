import {categoriesAPI} from '../../api'
import {tasksAPI} from '../../api'

const order = {}

order.types = {
  LOADING: 'order/LOADING',
  SET_SERVICE: 'order/SET_SERVICE',
  CREATE: 'order/CREATE',
  ERROR: 'order/ERROR'
}

const initialState = {
  service: null,
  item: null,
  loading: false,
  error: null
}

order.reducer = (state = initialState, action) => {
  switch (action.type) {
    case order.types.LOADING:
      return {
        ...state, loading: action.payload
      }

    case order.types.SET_SERVICE:
      return {
        ...state, service: action.payload
      }

    case order.types.CREATE:
      return {
        ...state, item: action.payload, error: null
      }

    case order.types.ERROR:
      return {
        ...state, loading: false, error: action.payload
      }

    default:
      return state
  }
}

order.actions = {
  loading(item) {
    return {
      type: order.types.LOADING,
      payload: item
    }
  },
  create(item) {
    return {
      type: order.types.CREATE,
      payload: item
    }
  },
  error(item) {
    return {
      type: order.types.ERROR,
      payload: item
    }
  },
  setService(service) {
    return {
      type: order.types.SET_SERVICE,
      payload: service
    }
  },
  createOrder(value) {
    return (dispatch, getState) => {
      try {
        dispatch(order.actions.loading(true))
        const {item} = getState().order
        const task = {...item, ...value}
        dispatch(order.actions.create(task))
        dispatch(order.actions.loading(false))
      } catch (e) {
        dispatch(order.actions.error(e))
      }
    }
  },

  getService(id) {
    return async (dispatch) => {
      try {
        dispatch(order.actions.loading(true))
        const response = await categoriesAPI.getService(id)
        if (response.statusText !== 'OK') {
          throw new Error(response.message || 'Что-то пошло не так')
        }
        dispatch(order.actions.setService(response.data))
        dispatch(order.actions.loading(false))
      } catch (e) {
        dispatch(order.actions.error(e))
      }
    }
  },
  postTask() {
    return async (dispatch, getState) => {
      try {
        dispatch(order.actions.loading(true))
        const {item, service} = getState().order
        const response = await tasksAPI.create(item)
        if (response.statusText !== 'OK') {
          throw new Error(response.message || 'Что-то пошло не так')
        }
        dispatch(order.actions.setService(null))
        dispatch(order.actions.create(null))
        dispatch(order.actions.loading(false))
      } catch (e) {
        dispatch(order.actions.error(e))
      }
    }
  }
}

export default order
