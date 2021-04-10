import './Profile.scss'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useContext} from 'react'
import profile from '../../store/modules/profile'
import Loading from '../../shared/components/Loading'
import Error from '../../shared/components/Error'
import {roles} from '../../shared/constants'
import {AuthContext} from "../../shared/contexts/AuthContext/AuthContext";
import auth from "../../store/modules/auth";
import ClientProfile from "../client/ClientProfile";
import SpecProfile from "../specialist/SpecProfile";

function Profile() {
  const dispatch = useDispatch()
  const {loading, error} = useSelector(state => state.profile)
  const {role, logout} = useContext(AuthContext)

  useEffect(() => {
    dispatch(profile.actions.getProfile())
    dispatch(profile.actions.getTasks())
  }, [dispatch])

  const handleReload = () => {
    dispatch(profile.actions.getProfile())
    dispatch(profile.actions.getTasks())
  }

  const handleLogOut = () => {
    logout()
    dispatch(auth.actions.setAuth(null))
  }

  if (loading) {
    return <Loading/>
  }
  if (error) {
    return <Error error={error.toString()} handleReload={handleReload}/>
  }
  if (role === roles.CLIENT) {
    return <ClientProfile handleLogOut={handleLogOut}/>
  }
  if (role === roles.SPECIALIST) {
    return <SpecProfile handleLogOut={handleLogOut}/>
  }
}

export default Profile
