import './Chat.scss'
import BaseLayout from '../../../shared/layouts/client/BaseLayout'
import Message from '../../../shared/components/Message'
import sendIcon from '../../../shared/assets/images/icons/message/sendIcon.svg'
import {animateScroll as scroll} from 'react-scroll'
import chats from '../../../store/modules/chats';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../shared/components/Loading";

function Chat(props) {
  const {id} = useParams()//userId
  const [msg, setMsg] = useState('');
  const {userMessages, loading, users} = useSelector(state => state.chats);
  const dispatch = useDispatch();
  const user = users && users.find(u => u._id === id)
  const header = {
    title: users && user?.name + ' ' + user?.surname,
    text: '', tel: '', imgUrl: user?.imgUrl
  }
  const config = {
    needReturnText: 'Назад',
    fixed: true,
    blur: true
  }

  useEffect(() => {
    dispatch(chats.actions.setRead(id))
  }, [])

  useEffect(() => {
    dispatch(chats.actions.getMessagesById(id))
  }, [dispatch, id])

  useEffect(() => {
    scroll.scrollToBottom()
  }, [userMessages])

  const handleChange = e => {
    const {value} = e.target;
    setMsg(value);
  }

  const handleEnter = (ev) => {
    if (ev.key === 'Enter') {
      dispatch(chats.actions.sendMessage(msg, id))
      setMsg('')
    }
  }

  const handleSend = () => {
    if (msg.length === 0) {
      return
    }
    dispatch(chats.actions.sendMessage(msg, id))
    setMsg('')
  }


  if (loading) {
    return <Loading/>
  }
  return (
    <BaseLayout header={header} config={config}>
      <div className='Chat'>
        <section className='message-item'>
          {
            userMessages && userMessages.map(o => <Message key={o._id} message={o}/>)
          }
        </section>
        <section className='input'>
          <input
            placeholder={'Type a message'}
            className={'input-item'}
            type='text'
            value={msg}
            onKeyPress={handleEnter}
            onChange={handleChange}
          />
          <button
            className='send-button'
            onClick={handleSend}
          >
            <img src={sendIcon} alt='send-button'/>
          </button>
        </section>
      </div>
    </BaseLayout>
  )
}

export default Chat
