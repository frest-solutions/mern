import './DesktopHeader.scss'
import logo from '../../../../../assets/images/logos/logo.png'
import {NavLink} from 'react-router-dom'
import {routes} from '../../../../../constants'

function DesktopHeader({
                         config = {fixed: false, blur: false, needReturnText: null},
                         header = {title: '', text: '', imgUrl: ''}
                       }) {
  return (
    <div className={'DesktopHeader'}>
      <div className={'DesktopHeader-title'}>
        <NavLink to={routes.HOME} exact>
          <img className={'logo'} src={logo} alt='logo'/>
          <h1 className={'title'}>Frest</h1>
        </NavLink>
      </div>

      <nav className='DesktopNavbar'>
        <ul className={'DesktopNavbar-items'}>
          <NavLink to={routes.HOME} exact>
            <li className={'navbar-item'}>Главная</li>
          </NavLink>
          <NavLink to={routes.CATEGORIES}>
            <li className={'navbar-item'}>Категории</li>
          </NavLink>
          <NavLink to={routes.CHATS}>
            <li className={'navbar-item'}>Сообщения</li>
          </NavLink>
          <NavLink to={routes.PROFILE}>
            <li className={'navbar-item'}>Профиль</li>
          </NavLink>
        </ul>
      </nav>

    </div>
  )
}

export default DesktopHeader
