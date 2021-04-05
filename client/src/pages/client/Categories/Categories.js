import List from '../../../shared/components/List'
import BaseLayout from '../../../shared/layouts/client/BaseLayout'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import categories from '../../../store/modules/categories'
import Loading from '../../../shared/components/Loading'
import { useEffect } from 'react'
import Error from '../../../shared/components/Error'
import './Categories.scss'
import { routes } from '../../../shared/constants'

function Categories() {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector(state => state.categories, shallowEqual)
  const header = { title: 'Frest', text: '' }
  const itemConfig = {
    itemRoute: routes.CATEGORY
  }
  useEffect(() => {
    dispatch(categories.actions.getCategories())
  }, [dispatch])

  const handleReload = () => {
    dispatch(categories.actions.getCategories())
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error.toString()} handleReload={handleReload} />
  }

  return (
    <BaseLayout header={header}>
      <div className='Categories'>
        {
          items.map(o => <List item={o} config={itemConfig} key={o._id} />)
        }
      </div>
    </BaseLayout>
  )
}

export default Categories
