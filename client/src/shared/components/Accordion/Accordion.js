import ListItem from '../ListItem'
import './Accordion.scss'
import arrow from '../../assets/images/icons/arrow.svg'
import {useContext} from 'react'
import {AuthContext} from "../../contexts/AuthContext/AuthContext";

function Accordion({config, item, subItems}) {

  const {role} = useContext(AuthContext)

  if (config?.order) {
    return (
      <div className='Accordion'>

        <div className='tab'>

          <input type='checkbox' id={1} name='tab-group'/>
          <label htmlFor={1} className='tab-title'>{item.title || ''}
            <span className={'count'}>
            {subItems.price + ' смн'}
              <img className={'arrow'} src={arrow} alt='arrow'/>
            </span>
          </label>
          <section className='tab-content description'>
            <p className='text'>{subItems.description}</p>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className='Accordion'>
      <div className='tab'>
        <input type='checkbox' id={item._id ? item._id : 1} name='tab-group'/>
        <label htmlFor={item._id ? item._id : 1} className='tab-title'>{item.title || ''}
          <span className={'count'}>
            {subItems.length}
            <img className={'arrow'} src={arrow} alt='arrow'/>
            </span>
        </label>
        <section className='tab-content'>
          {
            // config?.clientProfile
            //   ? subItems.map(o => <ListItem key={o.id} config={config} item={o}/>)
            //   : subItems.filter(o => o.subCategoryId === item.id)
            //     .map(o => <ListItem key={o.id} config={config} item={o}/>)
            subItems.map(o => <ListItem key={o._id} config={config} item={o}/>)
          }
        </section>
      </div>
    </div>
  )
}

export default Accordion
