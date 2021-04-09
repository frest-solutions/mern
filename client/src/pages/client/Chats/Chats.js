import List from '../../../shared/components/List'

import BaseLayout from '../../../shared/layouts/client/BaseLayout'
import './Chats.scss'
import {routes} from '../../../shared/constants'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import chats from "../../../store/modules/chats";
import Loading from "../../../shared/components/Loading";


function Chats() {
  const dispatch = useDispatch()
  const {users, loading, error} = useSelector(state => state.chats)
  useEffect(() => {
    dispatch(chats.actions.getUsers())
  }, [dispatch])

  const listConfig = {
    isUser: true,
    itemRoute: routes.CHAT
  }
  const header = {title: 'Frest', text: ''}
  const headerConfig = {
    fixed: true
  }

  if (loading) {
    return <Loading/>
  }

  return (
    <BaseLayout config={headerConfig} header={header}>
      <div className='Chats'>
        {users && users.map(u => ({_id: u._id, title: u.name + ' ' + u.surname, text: u.role, imgUrl: u.imgUrl}))
          .map(o => <List key={o._id} item={o} config={listConfig}/>)
        }
      </div>
    </BaseLayout>
  )
}

export default Chats
