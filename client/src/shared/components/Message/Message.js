import './Message.scss'
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext/AuthContext";

function Message({message}) {
  const {userId} = useContext(AuthContext)
  return (
    <div className='block'>
      <div className={`Message ${message.sender === userId ? 'my' : ''}`}>
        <p className={'message-item'}>
          {message.message}
        </p>
        <span className={'time'}>
        {message.sender === userId
          ? `${message.status
            ? message.status
            : 'static_status'} ${message.date.slice(11, 16)} ${message.status ? '√' : ''}`
          : message.date.slice(11, 16)}
      </span>
      </div>
    </div>

  )
}

export default Message
