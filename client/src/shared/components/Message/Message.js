import './Message.scss'
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext/AuthContext";

function Message({message}) {
  const {userId} = useContext(AuthContext)
  return (
    <div className={`Message ${message.sender === userId ? 'my' : ''}`}>
      <p className={'message-item'}>
        {message.message}
      </p>
      <span className={'time'}>
        {`${message.status ? message.status : 'sent'} ${message.time} ${message.status ? '√' : ''}`}
      </span>
    </div>
  )
}

export default Message
