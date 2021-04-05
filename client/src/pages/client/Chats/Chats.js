import List from '../../../shared/components/List'
import avatar from './temp/Avatar.png'
import BaseLayout from '../../../shared/layouts/client/BaseLayout'
import './Chats.scss'
import { routes } from '../../../shared/constants'

function Chats() {

  const chats = [
    {
      id: 1,
      title: 'Alex Marchal',
      text: 'UX Designer',
      imgUrl: avatar
    }
  ]

  const listConfig = {
    isUser: true,
    itemRoute: routes.CHAT
  }

  const header = { title: 'Frest', text: '' }
  const headerConfig = {
    fixed: true
  }

  return (
    <BaseLayout config={headerConfig} header={header}>
      <div className='Chats'>
        {
          chats.map(o => <List key={o.id} item={o} config={listConfig} />)
        }
      </div>
    </BaseLayout>
  )
}

export default Chats
