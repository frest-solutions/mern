import './ListItem.scss'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {roles} from '../../constants'
import {AuthContext} from "../../contexts/AuthContext/AuthContext";

const ListItem = ({config, item}) => {
  const {role} = useContext(AuthContext)

  if (role === roles.CLIENT) {
    return (
      <div className={'ListItem'}>
        <Link className={'router-link'} to={config?.itemRoute ? config.itemRoute.replace(':id', item._id) : '#'}>
          <h3 className={'title'}>{item.title ? item.title : item.category?.subCategoryItemTitle}</h3>

          {item.count || item.price &&
          <p className={'text'}>{item.count ? item.count + ' специалистов' : item.price + ' смн'}</p>}
        </Link>
      </div>
    )
  } else {
    return (
      <div className={'ListItem'}>
        <Link className={'router-link'} to={config?.itemRoute ? config.itemRoute.replace(':id', item.id) : '#'}>
          <h3 className={'title'}>{item.title ? item.title : item.category.subCategoryItemTitle}</h3>
          <p className={'text'}>{item.price + ' смн'}</p>
        </Link>
      </div>
    )
  }
}

export default ListItem
