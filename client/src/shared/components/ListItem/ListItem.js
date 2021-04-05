import './ListItem.scss'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {roles} from '../../constants'
import {AuthContext} from "../../contexts/AuthContext/AuthContext"
import {useDispatch} from "react-redux"
import profile from "../../../store/modules/profile"
import editIcon from '../../assets/images/icons/edit.svg'
import deleteIcon from '../../assets/images/icons/delete.svg'


const ListItem = ({config, item}) => {
  const {role} = useContext(AuthContext)
  const dispatch = useDispatch()

  const handleRemoveTask = () => {
    dispatch(profile.actions.deleteTask(item._id))
  }

  if (role === roles.CLIENT) {
    return (
      <div className={'ListItem'}>
        <Link className={'router-link'} to={config?.itemRoute ? config.itemRoute.replace(':id', item._id) : '#'}>
          <h3 className={'title'}>{item.title ? item.title : item.category?.subCategoryItemTitle}</h3>

          {item.count || item.price &&
          <p className={'text'}>{item.count ? item.count + ' специалистов' : item.price + ' смн'}</p>}
          {config?.profilePage &&
          <div className='listItem-controls'>
            <button className='btn-icon' onClick={handleRemoveTask}><img src={deleteIcon} alt="delete"/></button>
            <button className='btn-icon'><img src={editIcon} alt="edit"/></button>
          </div>}

        </Link>
      </div>
    )
  } else if (role === roles.SPECIALIST){
    return (
      <div className={'ListItem'}>
        <Link className={'router-link'} to={config?.itemRoute ? config.itemRoute.replace(':id', item.id) : '#'}>
          <h3 className={'title'}>{item.title ? item.title : item.category.subCategoryItemTitle}</h3>
          <p className={'text'}>{item.price + ' смн'}</p>
        </Link>
      </div>
    )
  }
  return (
    <div className={'ListItem'}>
      <Link className={'router-link'} to={config?.itemRoute ? config.itemRoute.replace(':id', item.id) : '#'}>
        <h3 className={'title'}>{item.title ? item.title : item.category.subCategoryItemTitle}</h3>
        {/*<p className={'text'}>{item.price + ' смн'}</p>*/}
      </Link>
    </div>
  )
}

export default ListItem
