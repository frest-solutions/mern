import BaseLayout from '../../../shared/layouts/client/BaseLayout'
import './Profile.scss'
import avatar from '../../../shared/assets/images/icons/avatar/avatar.svg'
import AccordionUI from '../../../shared/components/Accordion/AccordionUI'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useContext} from 'react'
import profile from '../../../store/modules/profile'
import Loading from '../../../shared/components/Loading'
import Error from '../../../shared/components/Error'
import {imgApiUrl} from '../../../api'
import {roles} from '../../../shared/constants'
import {AuthContext} from "../../../shared/contexts/AuthContext/AuthContext";
import auth from "../../../store/modules/auth";

function Profile() {
  const dispatch = useDispatch()
  const {item, tasks, loading, error} = useSelector(state => state.profile)
  const {items} = useSelector(state => state.home)
  const {role, logout} = useContext(AuthContext)
  const accordionConfig = {
    profilePage: true
  }

  const header = {title: 'Frest', text: ''}
  const data = {
    title: role === roles.CLIENT ? 'Мои заказы' : 'Мои задачи',
    count: tasks && tasks.length
  }
  // const changeRoleText = `Стать ${role === 'client' ? 'исполнителем' : 'заказчиком'}`

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

  // const handleChangeRole = () => {
  //   dispatch(profile.actions.changeRole())
  // }

  if (loading) {
    return <Loading/>
  }
  if (error) {
    return <Error error={error.toString()} handleReload={handleReload}/>
  }

  if (role === roles.CLIENT) {
    return (
      <BaseLayout header={header}>
        <div className={'Profile'}>
          <div className='profile-name'>
            <img className={'avatar'} src={item?.userImg ? imgApiUrl + item.userImg : avatar} alt='avatar'/>
            <div className='profile-name-item'>
              <h2 className='title'>{(item?.name || 'Пользователь') + ' ' + (item?.surname || '')}</h2>
              <p className='text'>Заказчик</p>
              {/*<button className={'btn-regular'}*/}
              {/*        onClick={handleChangeRole}>{changeRoleText}</button>*/}
              <button className='btn-regular' onClick={handleLogOut}>Выйти</button>
            </div>
          </div>
          <h3 className={'profile-items-title'}>Моя активность</h3>

          {tasks && <AccordionUI config={accordionConfig} item={data} subItems={tasks}/>}

        </div>
      </BaseLayout>
    )
  } else {
    return (
      <BaseLayout header={header}>
        <div className={'Profile'}>
          <div className='profile-name'>
            <img className={'avatar'} src={item?.userImg ? imgApiUrl + item.userImg : avatar} alt='avatar'/>
            <div className='profile-name-item'>
              <h2 className='title'>{item?.name || 'Пользователь' + ' ' + item?.surname || ''}</h2>
              <p className='text'>Исполнитель</p>
              {/*<button className={'btn-regular'}*/}
              {/*        onClick={handleChangeRole}>{changeRoleText}</button>*/}
              <button className='btn-regular' onClick={handleLogOut}>Выйти</button>
            </div>
          </div>
          <h3 className={'profile-items-title'}>Моя активность</h3>
          {/*{tasks && <Accordion item={data} subItems={tasks} />}*/}
        </div>
      </BaseLayout>
    )
  }


}

export default Profile
