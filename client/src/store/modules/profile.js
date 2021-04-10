import {profileAPI, tasksAPI} from '../../api'
import {roles} from '../../shared/constants'

const profile = {}

profile.types = {
  LOADING: 'profile/LOADING',
  SET_PROFILE: 'profile/SET_PROFILE',
  SET_TASKS: 'profile/SET_TASKS',
  SET_TASK: 'profile/SET_TASK',
  SET_SPEC_TASKS: 'profile/SET_SPEC_TASKS',
  SET_SPEC_TASK: 'profile/SET_SPEC_TASK',
  SET_PAID_UNTIL: 'profile/SET_PAID_UNTIL',
  ERROR: 'profile/ERROR'
}

const initialState = {
  tasks: [],
  specTasks: [],
  paidUntil: null,
  item: null,
  loading: false,
  error: null
}

profile.reducer = (state = initialState, action) => {
  switch (action.type) {
    case profile.types.LOADING:
      return {
        ...state, loading: action.payload
      }

    case profile.types.SET_PROFILE:
      return {
        ...state, item: action.payload, error: null
      }

    case profile.types.SET_SPEC_TASKS:
      return {
        ...state, specTasks: action.payload, error: null
      }

    case profile.types.SET_SPEC_TASK:
      return {
        ...state, tasks: [...state.specTasks, action.payload], error: null
      }

    case profile.types.SET_TASKS:
      return {
        ...state, tasks: action.payload, error: null
      }

    case profile.types.SET_TASK:
      return {
        ...state, tasks: [...state.tasks, action.payload], error: null
      }

    case profile.types.SET_PAID_UNTIL:
      return {
        ...state, paidUntil: action.payload, error: null
      }

    case profile.types.ERROR:
      return {
        ...state, loading: false, error: action.payload
      }

    default:
      return state
  }
}

profile.actions = {
  loading(item) {
    return {
      type: profile.types.LOADING,
      payload: item
    }
  },
  setProfile(item) {
    return {
      type: profile.types.SET_PROFILE,
      payload: item
    }
  },

  setTasks(item) {
    return {
      type: profile.types.SET_TASKS,
      payload: item
    }
  },
  setTask(item) {
    return {
      type: profile.types.SET_TASK,
      payload: item
    }
  },
  setSpecTasks(item) {
    return {
      type: profile.types.SET_SPEC_TASKS,
      payload: item
    }
  },
  setSpecTask(item) {
    return {
      type: profile.types.SET_SPEC_TASK,
      payload: item
    }
  },
  setPaidUntil(data) {
    return {
      type: profile.types.SET_PAID_UNTIL,
      payload: data
    }
  },
  error(item) {
    return {
      type: profile.types.ERROR,
      payload: item
    }
  },
  getProfile() {
    return async (dispatch) => {
      try {
        dispatch(profile.actions.loading(true))
        const response = await profileAPI.getProfile()
        if (response.statusText !== 'OK') {
          throw new Error(response.message || 'Что-то пошло не так')
        }
        dispatch(profile.actions.setProfile(response.data))
        dispatch(profile.actions.loading(false))
      } catch (e) {
        dispatch(profile.actions.error(e))
      }
    }
  },
  getTasks() {
    return async (dispatch) => {
      try {
        dispatch(profile.actions.loading(true))
        const response = await tasksAPI.getTasks()
        if (response.statusText !== 'OK') {
          throw new Error(response.message || 'Что-то пошло не так')
        }
        // dispatch(profile.actions.setTasks(response.data))
        dispatch(profile.actions.loading(false))
      } catch (e) {
        dispatch(profile.actions.error(e))
      }
    }
  },

  getSpecTasks() {
    return async (dispatch) => {
      try {
        dispatch(profile.actions.loading(true))
        const response = await tasksAPI.getSpecTasks()
        // if (response.statusText !== 'OK') {
        //   throw new Error(response.message || 'Что-то пошло не так')
        // }

        // dispatch(profile.actions.setSpecTasks(response.data))
        dispatch(profile.actions.loading(false))
      } catch (e) {
        dispatch(profile.actions.error(e))
      }
    }
  },

  deleteTask(id) {
    return async (dispatch, getState) => {
      try {
        dispatch(profile.actions.loading(true))
        const {tasks} = getState().profile

        const newTasks = tasks.filter(t => t._id !== id)
        const response = await tasksAPI.deleteTask(id)
        console.log(response)
        if (response.statusText !== 'OK') {
          throw new Error(response.message || 'Что-то пошло не так')
        }
        dispatch(profile.actions.setTasks(newTasks))
        dispatch(profile.actions.loading(false))
      } catch (e) {
        dispatch(profile.actions.error(e))
      }
    }
  },

  changeRole() {
    return async (dispatch, getState) => {
      try {
        const {item} = getState().profile
        const role = item.role === roles.CLIENT ? roles.SPECIALIST : roles.CLIENT
        dispatch(profile.actions.loading(true))
        const newItem = {...item, role}
        const response = await tasksAPI.changeRole(newItem)
        dispatch(profile.actions.setProfile(response.data))

        dispatch(profile.actions.loading(false))
      } catch (e) {
        dispatch(profile.actions.error(e))
      }
    }
  }
}

export default profile
