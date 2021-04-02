import './List.scss'
import { NavLink } from 'react-router-dom'
import arrow from '../../assets/images/icons/arrow.svg'
import { imgApiUrl } from '../../../api'


function List({ item, config }) {
  return (
    <div className={'List'}>

      <NavLink to={config?.itemRoute.replace(':id', item._id)}>
        <div className='list-img'>
          {
            config?.isUser
              ? <img className={'avatar'} src={imgApiUrl + item.imgUrl || ''} alt='avatar' />
              : <img className={'icon'} src={imgApiUrl + item.imgUrl || ''} alt='icon' />
          }
        </div>
        <div className='item'>
          <h3 className='title'>{item.title}</h3>
          <p className='text'>{item.text}</p>
        </div>
        <img className={'arrow'} src={arrow} alt='arrow' />
      </NavLink>
    </div>
  )
}

export default List
