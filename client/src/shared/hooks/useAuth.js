import {useState, useCallback, useEffect} from "react";
import profile from "../../store/modules/profile";
import home from "../../store/modules/home";

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [role, setRole] = useState(null)
  const [ready, setReady] = useState(false)

  const login = useCallback((jwtToken, id, role) => {
    setToken(jwtToken)
    setUserId(id)
    setRole(role)
    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, role: role
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setRole(null)
    profile.actions.setProfile(null)
    profile.actions.setTasks(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const dataLocal = JSON.parse(localStorage.getItem(storageName))
    if (dataLocal && dataLocal.token) {
      login(dataLocal.token, dataLocal.userId, dataLocal.role)
    }
    setReady(true)
  }, [login])

  return {login, logout, token, userId, role, ready}
}
