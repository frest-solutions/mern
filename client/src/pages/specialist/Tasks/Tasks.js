import {useDispatch, useSelector} from 'react-redux'
import Loading from '../../../shared/components/Loading'
import Error from '../../../shared/components/Error'
import profile from '../../../store/modules/profile'
import {useEffect} from 'react'
import ListItem from '../../../shared/components/ListItem'
import './Tasks.scss'
import BaseLayout from '../../../shared/layouts/client/BaseLayout'

function Tasks(props) {
  const dispatch = useDispatch()
  const {tasks, loading, error} = useSelector(state => state.profile)
  const header = {title: 'Frest', text: ''}

  useEffect(() => {
    // dispatch(profile.actions.getTasks())//todo: need get another tasks for spec
  }, [dispatch])

  const handleReload = () => {
    dispatch(profile.actions.getTasks())
  }

  if (loading) {
    return <Loading/>
  }
  if (error) {
    return <Error error={error.toString()} handleReload={handleReload}/>
  }
  return (
    <BaseLayout header={header}>
      <div className={'Tasks'}>
        <h2>Tasks for specialists</h2>
        {/*{tasks.map(t => <ListItem item={t} key={t.id} />)}*/}
      </div>
    </BaseLayout>

  )
}

export default Tasks
