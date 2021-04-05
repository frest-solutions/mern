import './CategoryDetail.scss'
import BaseLayout from '../../../shared/layouts/client/BaseLayout'
import AccordionUI from '../../../shared/components/Accordion'
import { useParams } from 'react-router-dom'
import { routes } from '../../../shared/constants'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loading from '../../../shared/components/Loading'
import Error from '../../../shared/components/Error'
import subCategories from '../../../store/modules/subCategories'

function CategoryDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { items, services, category, loading, error } = useSelector(state => state.subCategories, shallowEqual)
  const layoutConfig = {
    fixed: true,
    needReturnText: 'Назад'
  }
  const accordionConfig = {
    itemRoute: routes.ORDER
  }

  useEffect(() => {
    dispatch(subCategories.actions.getSubCategory(id))
  }, [dispatch, id])

  const handleReload = () => {
    dispatch(subCategories.actions.getSubCategory(id))
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error.toString()} handleReload={handleReload} />
  }
  return (
    <>
      {
        category && category.title &&
        <BaseLayout header={category} config={layoutConfig}>
          <div className='CategoryDetail'>
            {
              items.map(o => <AccordionUI item={o} config={accordionConfig} key={o._id}
                                          subItems={services}
              />)
            }
          </div>
        </BaseLayout>
      }
    </>

  )
}

export default CategoryDetail
