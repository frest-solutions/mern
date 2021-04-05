import ListItem from '../ListItem'
import './Accordion.scss'
import arrow from '../../assets/images/icons/arrow.svg'
import {Accordion, Card} from "react-bootstrap";
// import {useContext} from 'react'
// import {AuthContext} from "../../contexts/AuthContext/AuthContext";

function AccordionUI({config, item, subItems}) {

  // const {role} = useContext(AuthContext)

  const bootstrap = true

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

  if (bootstrap) {
    return (
      <Accordion defaultActiveKey={item._id ? item._id : 1}>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={item._id ? item._id : 1}>

            {item.title || ''}
            <span className={'count'}>{subItems.length}
              <img className={'arrow'} src={arrow} alt='arrow'/>
            </span>


          </Accordion.Toggle>
          <Accordion.Collapse eventKey={item._id ? item._id : 1}>
            <Card.Body>
              {
                // config?.clientProfile
                //   ? subItems.map(o => <ListItem key={o.id} config={config} item={o}/>)
                //   : subItems.filter(o => o.subCategoryId === item.id)
                //     .map(o => <ListItem key={o.id} config={config} item={o}/>)
                subItems.map(o => <ListItem key={o._id} config={config} item={o}/>)
              }
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
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

export default AccordionUI
