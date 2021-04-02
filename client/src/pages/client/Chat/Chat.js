import './Chat.scss'
import BaseLayout from '../../../shared/layouts/client/BaseLayout'
import ava from '../Chats/temp/Avatar.png'
import Message from '../../../shared/components/Message'
import sendIcon from '../../../shared/assets/images/icons/message/sendIcon.svg'
import { animateScroll as scroll } from 'react-scroll'
import { useEffect } from 'react'

function Chat(props) {


  const messages = [
    { id: 1, message: 'Hello Bro, it`s message, for testing component', time: '08:34' },
    { id: 1, message: 'Very nice', time: '08:34', status: 'Read', isMy: true },
    { id: 1, message: 'Hello Bro, it`s message, for testing component', time: '08:34' },
    { id: 1, message: 'Very nice', time: '08:34', status: 'Read', isMy: true },
    { id: 1, message: 'Hello Bro, it`s message, for testing component', time: '08:34' },
    {
      id: 1,
      message: 'Very nice Hello Bro, it`s message, for testing component Hello Bro, it`s message, for testing component Hello Bro, it`s message, for testing component',
      time: '08:34',
      status: 'Read',
      isMy: true
    },
    { id: 1, message: 'Hello Bro, it`s message, for testing component', time: '08:34' }
  ]

  const scrollToBottom = () => {
    scroll.scrollToBottom()
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  const header = { title: 'Alex Marchal', text: '', tel: '992909009999', imgUrl: ava }
  const config = {
    needReturnText: 'Назад',
    fixed: true,
    blur: true
  }

  return (
    <BaseLayout header={header} config={config}>
      <div className='Chat'>
        <section className='message-item'>
          {
            messages.map(o => <Message key={o.id} message={o} />)
          }
        </section>
        <section className='input'>
          <input placeholder={'Type a message'} className={'input-item'} type='text' />
          <button className='send-button'>
            <img src={sendIcon} alt='send-button' />
          </button>
        </section>
      </div>
    </BaseLayout>
  )
}

export default Chat
