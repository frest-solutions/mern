import {combineReducers} from 'redux'
import categories from './categories'
import subCategories from './subCategories'
import home from './home'
import order from './order'
import profile from './profile'
import auth from "./auth";
import chats from "./chats";

export default combineReducers({
  auth: auth.reducer,
  chats: chats.reducer,
  home: home.reducer,
  categories: categories.reducer,
  subCategories: subCategories.reducer,
  order: order.reducer,
  profile: profile.reducer
})
