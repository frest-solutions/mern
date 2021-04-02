import './Search.scss'
import searchIcon from '../../assets/images/icons/search/search.svg'

function Search(props) {
  return (
    <>
      <div className={'search-form'}>
        <input className={'input'} placeholder={'Поиск услуг...'} type='text' />
        <img className={'icon'} src={searchIcon} alt='search-icon' />
        <p className='error-message'>

        </p>
      </div>
      <div className='search-result'>

      </div>
    </>


  )
}

export default Search