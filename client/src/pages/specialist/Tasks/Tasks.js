import {useDispatch, useSelector} from 'react-redux'
import Loading from '../../../shared/components/Loading'
import Error from '../../../shared/components/Error'
import profile from '../../../store/modules/profile'
import {useEffect, useState} from 'react'
import './Tasks.scss'
import BaseLayout from '../../../shared/layouts/client/BaseLayout'
import {getPaidTime} from "../../../shared/utils";
import ListItem from "../../../shared/components/ListItem";

function Tasks() {
  const dispatch = useDispatch()
  const {loading, item, specTasks, error, paidUntil} = useSelector(state => state.profile)
  const header = {title: 'Frest', text: ''}

  useEffect(() => {
  const newTime = getPaidTime(item?.paidUntil)
    dispatch(profile.actions.setPaidUntil(newTime))
  }, [item])

  useEffect(() => {
    dispatch(profile.actions.getProfile())
    dispatch(profile.actions.getSpecTasks())//todo: need get another tasks for spec
  }, [dispatch])

  const handleReload = () => {
    dispatch(profile.actions.getProfile())
    dispatch(profile.actions.getSpecTasks())
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

        <p>{paidUntil?.paidUntil}</p>
        {paidUntil?.isPaid
          ? specTasks.map(t => <ListItem item={t} key={t._id}/>)
          : 'Пожалуйста активируйте ваш пакет'}
      </div>
    </BaseLayout>

  )
}

export default Tasks
