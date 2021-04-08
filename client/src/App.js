import Navbar from './shared/layouts/client/BaseLayout/components/Navbar'
import Loading from "./shared/components/Loading";

import {BrowserRouter} from 'react-router-dom'
import useWindowWidth from './shared/hooks'
import {useRoutes} from "./shared/hooks/useRoutes";
import {useAuth} from "./shared/hooks/useAuth";
import {AuthContext} from "./shared/contexts/AuthContext/AuthContext";
import {useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import ioClient from "socket.io-client";
import chats from "./store/modules/chats";

const App = () => {
  const {token, login, logout, userId, role, ready} = useAuth()
  const isAuthenticated = !!token
  const route = useRoutes(isAuthenticated, role)
  const windowWidth = useWindowWidth()
  const dispatch = useDispatch();

  const ENDPOINT = 'http://localhost:5000/'
  const socket = ioClient(ENDPOINT)
  useEffect(() => {
    socket.on('msg', data => {
      dispatch(chats.actions.onLoadMessage(data));
    })
    socket.on('msgUser', data => {
      dispatch(chats.actions.onLoadUserMessages(data));
    })
  }, [])

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, role
    }}>
      <BrowserRouter>
        {windowWidth < 768 && <Navbar/>}
        {!ready ? <Loading/> : route}
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App

export class instance {
}
