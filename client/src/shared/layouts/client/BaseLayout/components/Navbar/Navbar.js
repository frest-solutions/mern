import React from 'react'
import './Navbar.scss'
import {NavLink} from 'react-router-dom'
import {routes} from '../../../../../constants'

import home from '../../../../../assets/images/icons/navbar/home.svg'
import category from '../../../../../assets/images/icons/navbar/category.svg'
import messages from '../../../../../assets/images/icons/navbar/messages.svg'
import profile from '../../../../../assets/images/icons/navbar/profile.svg'

function Navbar() {
  return (
    <nav className='mobile-navbar'>
      <NavLink to={routes.HOME} exact>
        <img className={'navbar-item'} src={home} alt='home'/>
        <span className='title'>Главная</span>
      </NavLink>
      <NavLink to={routes.CATEGORIES}>
        <img className={'navbar-item'} src={category} alt='category'/>
        <span className='title'>Категории</span>
      </NavLink>
      <NavLink to={routes.CHATS}>
        <img className={'navbar-item'} src={messages} alt='messages'/>
        <span className='title'>Сообщения</span>
      </NavLink>
      <NavLink to={routes.PROFILE}>
        <img className={'navbar-item'} src={profile} alt='profile'/>
        <span className='title'>Профиль</span>
      </NavLink>
    </nav>
  )
}

export default Navbar
