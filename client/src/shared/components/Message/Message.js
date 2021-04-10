import './Message.scss'
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext/AuthContext";
import {getCreatedTime} from "../../utils";

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
          ? `${getCreatedTime(message.date)} ${message.status > 1 ? '√√' : '√'}`
          : getCreatedTime(message.date)}
      </span>
      </div>
    </div>

  )
}

export default Message
