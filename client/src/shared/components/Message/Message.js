import './Message.scss'

function Message({ message }) {
  return (
    <div className={`Message ${message.isMy ? 'my' : ''}`}>
      <p className={'message-item'}>
        {message.message}
      </p>
      <span className={'time'}>
        {`${message.status ? message.status : ''} ${message.time} ${message.status ? '√' : ''}`}
      </span>
    </div>
  )
}

export default Message