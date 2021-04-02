import './OrderPubic.scss'
import { Link } from 'react-router-dom'
import { routes } from '../../../shared/constants'
import orderPublic from '../../../shared/assets/images/icons/orderPublic/orderPublic.svg'

function OrderPubic(props) {
  return (
    <div className={'OrderPubic'}>
      <h2 className={'OrderPubic-title'}>Ваша завка опубликована</h2>
      <div className='circle'>
        <div className='circle-2'>
          <img src={orderPublic} alt='order-public-icon' />
        </div>
      </div>
      <Link to={routes.HOME} className='btn-confirm white'>На главную</Link>
    </div>
  )
}

export default OrderPubic
