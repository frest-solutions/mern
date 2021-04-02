import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './modules'

export default createStore(rootReducer, applyMiddleware(thunk))