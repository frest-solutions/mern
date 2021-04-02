import './Error.scss'

function Error({ error, handleReload }) {
  return (
    <div className={'Error'}>
      <h4 className='title'>Произошла ошибка.</h4>
      <p className='text'>{error.toString()}</p>
      <button className='btn-regular' onClick={handleReload}>Повторить запрос?</button>
    </div>
  )
}

export default Error