import {categoriesAPI} from '../../api'
import {tasksAPI} from '../../api'

const order = {}

order.types = {
  LOADING: 'order/LOADING',
  SET_SERVICE: 'order/SET_SERVICE',
  CREATE: 'order/CREATE',
  ADD_PHOTOS: 'order/ADD_PHOTOS',
  ERROR: 'order/ERROR',
  IS_CREATED: 'order/IS_CREATED',
}

const initialState = {
  service: null,
  item: {
    photos: []
  },
  loading: false,
  error: null,
  isCreated: false,
}

order.reducer = (state = initialState, action) => {
  switch (action.type) {
    case order.types.LOADING:
      return {
        ...state, loading: action.payload, error: null
      }

    case order.types.SET_SERVICE:
      return {
        ...state, service: action.payload, error: null
      }

    case order.types.CREATE:
      return {
        ...state, item: {...state.item, ...action.payload}, error: null
      }

    case order.types.ADD_PHOTOS:
      return {
        ...state, item: {...state.item, photos: [...state.item.photos, action.payload]}, error: null
      }

    case order.types.IS_CREATED:
      return {
        ...state, isCreated: action.payload, error: null
      }

    case order.types.ERROR:
      return {
        ...state, item: {photos: []}, service: null, loading: false, error: action.payload, isCreated: false
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
  isCreated(bool) {
    return {
      type: order.types.IS_CREATED,
      payload: bool
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
  addPhotos(url) {
    return {
      type: order.types.ADD_PHOTOS,
      payload: url
    }
  },
  createOrder(value) {
    return (dispatch, getState) => {
      try {
        dispatch(order.actions.loading(true))
        const {item} = getState().order
        const task = {...item, ...value, photos: [...item.photos]}
        dispatch(order.actions.create(task))
        dispatch(order.actions.loading(false))
      } catch (e) {
        dispatch(order.actions.error(e))
      }
    }
  },

  uploadPhotos(photo) {
    return async (dispatch) => {
      try {
        dispatch(order.actions.loading(true))
        const formData = new FormData()
        await formData.append('file', photo)
        const response = await tasksAPI.uploadPhoto(formData)
        dispatch(order.actions.addPhotos(response.data.url))
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
        dispatch(order.actions.isCreated(false))
        const response = await categoriesAPI.getService(id)
        // if (response.statusText !== 'OK') {
        //   throw new Error(response.message || 'Что-то пошло не так')
        // }
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
        const {item} = getState().order
        const response = await tasksAPI.create(item)
        if (response.statusText !== 'Created') {
          throw new Error(response.message || 'Что-то пошло не так')
        }
        dispatch(order.actions.loading(false))
      } catch (e) {
        dispatch(order.actions.error(e))
      }
    }
  },
  isCreatedTask() {
    return async (dispatch) => {
      try {
        dispatch(order.actions.loading(true))
        dispatch(order.actions.create(null))
        dispatch(order.actions.isCreated(true))
        dispatch(order.actions.loading(false))
      } catch (e) {
        dispatch(order.actions.error(e))
      }
    }
  }
}

export default order
