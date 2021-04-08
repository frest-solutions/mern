import './Chat.scss'
import BaseLayout from '../../../shared/layouts/client/BaseLayout'
import Message from '../../../shared/components/Message'
import sendIcon from '../../../shared/assets/images/icons/message/sendIcon.svg'
import {animateScroll as scroll} from 'react-scroll'
import chats from '../../../store/modules/chats';
import {useEffect, useState} from "react";
import ioClient from "socket.io-client";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import profile from "../../../store/modules/profile";
import Loading from "../../../shared/components/Loading";

function Chat(props) {
  const {id} = useParams()//userId
  const [msg, setMsg] = useState('');
  const {userMessages, users} = useSelector(state => state.chats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chats.actions.getMessagesById(id));
  }, [dispatch])

  useEffect(()=>{
    return function cleanup() {
      chats.actions.cleanUserMessage();
    }
  },[])

  useEffect(() => {
    scroll.scrollToBottom()
  }, [userMessages])

  const handleChange = e => {
    const {value} = e.target;
    setMsg(value);
  }

  const handleSend = () => {
    dispatch(chats.actions.sendMessage(msg, id))
  }
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
