import './Filter.scss'

function Filter({ handleShowFilterModal, isActive }) {

  return (
    <div className={`Filter ${isActive ? 'show' : ''}`}>
      <div className={'Filter-modal'}>
        <div className='modal-header'>
          Фильтры
        </div>
        <div className='price'>
          <span className='price-title'>Цена</span>


          <div className='block'>

            <div className='column'>
              <button className='btn-regular'>
                от 20 смн
              </button>
              <button className='btn-regular'>
                от 50 смн
              </button>
            </div>

            <div className='column'>
              <button className='btn-regular'>
                от 100 смн
              </button>
              <button className='btn-regular'>
                от 200 смн
              </button>
            </div>
          </div>


        </div>
        <div className='sort'>
          <span className='sort-title'>Сортировка</span>
          <button className='btn-regular'>
            По популярности
          </button>
          <button className='btn-regular'>
            По количеству заказов
          </button>
        </div>
      </div>
      <div onClick={handleShowFilterModal} className='Filter-modal-overlay'></div>
    </div>
  )
}

export default Filter