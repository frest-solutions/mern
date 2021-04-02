import {authAPI, instance} from "../../api";

const auth = {}

auth.types = {
  LOADING: 'auth/LOADING',
  // SET_FORM: 'auth/SET_FORM',
  SET_AUTH: 'auth/SET_AUTH',
  ERROR: 'auth/ERROR'
}

const initialState = {
  // form: [],
  authData: null,
  loading: false,
  error: null
}

auth.reducer = (state = initialState, action) => {
  switch (action.type) {

    case auth.types.LOADING:
      return {
        ...state, loading: action.payload, error: null
      }

    // case auth.types.SET_FORM:
    //   return {
    //     ...state, form: action.payload, error: null
    //   }

    case auth.types.SET_AUTH:
      return {
        ...state, authData: action.payload, error: null
      }

    case auth.types.ERROR:
      return {
        ...state, loading: false, error: action.payload
      }

    default:
      return state
  }
}

auth.actions = {
  loading: (item) => {
    return {
      type: auth.types.LOADING,
      payload: item
    }
  },
  // setForm: (form) => {
  //   return {
  //     type: auth.types.SET_FORM,
  //     payload: form
  //   }
  // },
  setAuth: (item) => {
    return {
      type: auth.types.SET_AUTH,
      payload: item
    }
  },
  error: (error) => {
    return {
      type: auth.types.ERROR,
      payload: error
    }
  },
  register: (form) => {
    return async (dispatch) => {
      try {
        dispatch(auth.actions.loading(true))

        const response = await authAPI.register(form)
        if (response.statusText !== 'OK') {
          throw new Error(response.message || 'Что-то пошло не так')
        }

        // const authRes = await authAPI.login(form)
        // if (authRes.statusText !== 'OK') {
        //   throw new Error(response.message || 'Что-то пошло не так')
        // }
        // dispatch(auth.actions.setAuth(authRes.data))

        dispatch(auth.actions.loading(false))
      } catch (e) {
        dispatch(auth.actions.loading(false))
        dispatch(auth.actions.error(e))
      }
    }
  },

  login: (form) => {
    return async (dispatch) => {
      try {
        dispatch(auth.actions.loading(true))
        const response = await authAPI.login(form)

        if (response.statusText !== 'OK') {
          throw new Error(response.message || 'Что-то пошло не так')
        }

        dispatch(auth.actions.setAuth(response.data))
        dispatch(auth.actions.loading(false))
      } catch (e) {
        dispatch(auth.actions.loading(false))
        dispatch(auth.actions.error(e))
      }
    }
  }
}

export default auth
