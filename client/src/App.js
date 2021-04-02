import Navbar from './shared/layouts/client/BaseLayout/components/Navbar'
import Loading from "./shared/components/Loading";

import {BrowserRouter} from 'react-router-dom'
import useWindowWidth from './shared/hooks'
import {useRoutes} from "./shared/hooks/useRoutes";
import {useAuth} from "./shared/hooks/useAuth";
import {AuthContext} from "./shared/contexts/AuthContext/AuthContext";
import {useEffect} from "react";

const App = () => {
  const {token, login, logout, userId, role, ready} = useAuth()
  const isAuthenticated = !!token
  const route = useRoutes(isAuthenticated, role)
  const windowWidth = useWindowWidth()

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
