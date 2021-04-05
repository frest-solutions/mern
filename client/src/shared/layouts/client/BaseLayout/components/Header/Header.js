import React from 'react'
import './Header.scss'
import returnIcon from '../../../../../assets/images/icons/header/returnIcon.svg'
import {useHistory} from 'react-router-dom'
import logo from '../../../../../assets/images/logos/logo.png'
import {imgApiUrl} from '../../../../../../api'

function Header({
                  config = {fixed: false, blur: false, needReturnText: null},
                  header = {title: '', text: '', imgUrl: ''}
                }) {

  const history = useHistory()
  const handleBackClick = () => {
    history.goBack()
  }

  if (!!config.needReturnText) {
    return (
      <header className={`Header with-return ${config.blur ? 'blur' : ''}`}>
        <div className={`header-inner ${config.fixed ? 'fixed' : ''}`}>

          <div className={'header-item'}>
            <img onClick={handleBackClick} className={'return-icon'} src={returnIcon}
                 alt='return-icon'/>
            <span>
            {config.needReturnText}
            </span>
          </div>

          <div className={'header-item'}>
            {header.imgUrl ?
              <img className={'image'} src={imgApiUrl + header.imgUrl} alt='logo'/> : ''}
            <h1 className={'title'}>{header.title}</h1>
          </div>
        </div>

      </header>
    )
  }

  return (
    <header className={'Header'}>
      <div className={`header-title ${config.fixed ? 'fixed' : ''}`}>
        <img className={'logo'} src={logo} alt='logo'/>
        <h1 className={'title'}>{header.title}</h1>
      </div>
      {/*<p className={'text'}>{header.text}</p>*/}
    </header>
  )
}

export default Header
