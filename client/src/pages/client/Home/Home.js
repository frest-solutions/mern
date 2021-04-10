import {useEffect} from 'react'
// import {StickyContainer, Sticky} from 'react-sticky'
import {useDispatch, useSelector} from 'react-redux'
import {routes} from '../../../shared/constants'
import home from '../../../store/modules/home'
import './Home.scss'
// import filterIcon from '../../../shared/assets/images/icons/filter/filterIcon.svg'
import Search from '../../../shared/components/Search'
import ListItem from '../../../shared/components/ListItem'
import BaseLayout from '../../../shared/layouts/client/BaseLayout'
// import Filter from '../../../shared/components/Filter'
import Loading from '../../../shared/components/Loading'
import Error from '../../../shared/components/Error'
import {Navbar} from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch()
  const {items, loading, error} = useSelector(state => state.home)
  const listItemConfig = {
    itemRoute: routes.ORDER,
  }
  const header = {title: 'Frest', text: ''}
  // const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    dispatch(home.actions.getAllServices())
  }, [dispatch])

  // const handleShowFilterModal = () => {
  //   setIsActive(!isActive)
  // }
  const handleReload = () => {
    dispatch(home.actions.getAllServices())
  }

  if (loading) {
    return <Loading/>
  }
  if (error) {
    return <Error error={error.toString()} handleReload={handleReload}/>
  }
  return (
    <BaseLayout header={header}>
      <div className='Home'>
        <>

          <Navbar sticky="top">
            {({style, isSticky}) => (
              <section className={`search-container ${isSticky ? 'sticky' : ''}`} style={style}>
                <Search/>
              </section>
            )}
          </Navbar>

          {/*<section onClick={handleShowFilterModal} className='filter-container'>*/}
          {/*  <img className={'filter-icon'} src={filterIcon} alt='filterIcon'/>*/}
          {/*  <p className={'filter-text'}>Фильтры</p>*/}
          {/*</section>*/}
          {/*<Filter handleShowFilterModal={handleShowFilterModal} isActive={isActive}/>*/}

          <section className={'list-container'}>
            {!items
              ? <Loading/>
              : items.map(o => <ListItem key={o._id} config={listItemConfig} item={o}/>)
            }
          </section>

        </>

      </div>
    </BaseLayout>
  )
}

export default Home
