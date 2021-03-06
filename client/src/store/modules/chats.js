import {chatsAPI, profileAPI} from "../../api";

const chats = {}

chats.types = {
  LOADING: 'chats/LOADING',
  SET_USERS: 'chats/SET_USERS',
  ERROR: 'chats/ERROR',
  ON_LOAD_USER_MESSAGE: 'chats/ON_LOAD_USER_MESSAGE',
  ON_LOAD_USER_MESSAGES: 'chats/ON_LOAD_USER_MESSAGES',
  CLEAN_USER_MESSAGE: 'chats/CLEAN_USER_MESSAGE',
}

const initialState = {
  users: null,
  loading: false,
  error: null,
  messages: [],
  userMessages: [],
}

chats.reducer = (state = initialState, action) => {
  switch (action.type) {

    case chats.types.LOADING:
      return {
        ...state, loading: action.payload, error: null
      }

    case chats.types.SET_USERS:
      return {
        ...state, users: action.payload, error: null
      }

    case chats.types.ERROR:
      return {
        ...state, loading: false, error: action.payload
      }

    case chats.types.ON_LOAD_USER_MESSAGE:
      return {
        ...state, userMessages: [...state.userMessages, action.payload]
      }

    case chats.types.ON_LOAD_USER_MESSAGES:
      return {
        ...state, userMessages: action.payload
      }

    case chats.types.CLEAN_USER_MESSAGE:
      return {
        ...state, userMessages: action.payload
      }

    default:
      return state
  }
}

chats.actions = {
  loading: (item) => {
    return {
      type: chats.types.LOADING,
      payload: item
    }
  },
  setUsers: (item) => {
    return {
      type: chats.types.SET_USERS,
      payload: item
    }
  },
  error: (error) => {
    return {
      type: chats.types.ERROR,
      payload: error
    }
  },
  onLoadUserMessage: (data) => {
    return {
      type: chats.types.ON_LOAD_USER_MESSAGE,
      payload: data
    }
  },
  onLoadUserMessages: (data) => {
    return {
      type: chats.types.ON_LOAD_USER_MESSAGES,
      payload: data
    }
  },
  cleanUserMessages: () => {
    return {
      type: chats.types.CLEAN_USER_MESSAGE,
      payload: []
    }
  },

  getUsers: () => {
    return async (dispatch) => {
      try {
        dispatch(chats.actions.loading(true))
        const response = await profileAPI.getUsers()
        // if (response.statusText !== 'OK') {
        //   throw new Error(response.message || '??????-???? ?????????? ???? ??????')
        // }
        dispatch(chats.actions.setUsers(response.data))
        dispatch(chats.actions.loading(false))
      } catch (e) {
        dispatch(chats.actions.loading(false))
        dispatch(chats.actions.error(e))
      }
    }
  },

  getMessagesById: (id) => {
    return async (dispatch) => {
      try {
        dispatch(chats.actions.loading(true))
        dispatch(chats.actions.cleanUserMessages())
        await chatsAPI.getUserMessages(id)
        dispatch(chats.actions.loading(false))
      } catch (e) {
        dispatch(chats.actions.loading(false))
        dispatch(chats.actions.error(e))
      }
    }
  },

  sendMessage: (msg, userId) => {
    return async (dispatch) => {
      try {
        await chatsAPI.sendMessage(msg, userId);
      } catch (e) {
        dispatch(chats.actions.error(e))
      }
    }
  },

  setRead: (id) => {
    return async (dispatch, getState) => {
      try {
        const {userMessages} = getState().chats
        const newArr = userMessages.map(m => {
          m.status = 3
          return m
        })
        await chatsAPI.setRead(userMessages, id)
        dispatch(chats.actions.onLoadUserMessages(newArr))
      } catch (e) {
        dispatch(chats.actions.error(e))
      }
    }
  },

  // getMessages: () => {
  //   return async (dispatch) => {
  //     try {
  //       dispatch(chats.actions.loading(true))
  //
  //       const response = await chatsAPI.getMessages()
  //       if (response && response.data) {
  //         dispatch(chats.actions.onLoadMessage(response.data));
  //       }
  //       dispatch(chats.actions.loading(false))
  //     } catch (e) {
  //       dispatch(chats.actions.loading(false))
  //       dispatch(chats.actions.error(e))
  //     }
  //   }
  // },
}

export default chats
