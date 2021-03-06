import './List.scss'
import {NavLink} from 'react-router-dom'
import arrow from '../../assets/images/icons/arrow.svg'
import {imgApiUrl} from '../../../api'
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext/AuthContext";
import {getStatus} from "../../utils";

function List({item, config}) {
  const {userId} = useContext(AuthContext)

  console.log(item, config)
  return (
    <div className={'List'}>
      <NavLink to={config?.itemRoute.replace(':id', item._id)}>
        <div className='list-img'>
          {
            config?.isUser
              ? <img className={'avatar'} src={imgApiUrl + item.imgUrl || ''} alt='avatar'/>
              : <img className={'icon'} src={imgApiUrl + item.imgUrl || ''} alt='icon'/>
          }
        </div>
        <div className='item'>
          <h3 className='title'>{item._id === userId ? 'Мои сообщения' : item.title}</h3>
          <p className='text'>{item.text}</p>
          {config?.isUser &&
          <p className={`text ${getStatus(item?.lastSeen) === 'Онлайн' && 'green'}`}>{getStatus(item?.lastSeen)}</p>}
        </div>
        <img className={'arrow'} src={arrow} alt='arrow'/>
      </NavLink>
    </div>
  )
}

export default List
