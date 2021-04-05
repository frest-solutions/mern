import './Order.scss'
import BaseLayout from '../../../shared/layouts/client/BaseLayout'
import {useHistory, useParams} from 'react-router-dom'
import {routes} from '../../../shared/constants'
import {useEffect} from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import order from '../../../store/modules/order'
import Loading from '../../../shared/components/Loading'
import Error from '../../../shared/components/Error'
import {imgApiUrl} from "../../../api";

const ValidateSchema = Yup.object().shape({
  description: Yup.string()
    .min(15, 'Заполните не менее 15 символов')
    .max(200, 'Превышено максимальное число символов')
    .required('Поле не может быть пустым'),
  price: Yup.number('Введите числовое значение цены')
    .required('Поле не может быть пустым')
})

function Order() {
  const header = {title: 'Создать заявку', text: ''}
  const config = {
    needReturnText: 'Отмена',
    fixed: true
  }
  const router = useHistory()
  const {id} = useParams()
  const dispatch = useDispatch()
  const {service, loading, error, item} = useSelector(state => state.order, shallowEqual)
  console.log(service, 'and', item)
  setInterval(() => {
    console.log(service, 'and', item)
  }, 10000)
  const date = new Date
  const getCreatedDate = (d) => {
    return `${d.getDate()}/${(d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : (d.getMonth() + 1)}/${d.getFullYear()}`
  }

  useEffect(() => {
    dispatch(order.actions.getService(id))
  }, [dispatch, id])

  const handleReload = () => {
    dispatch(order.actions.getService(id))
  }

  const handleSubmit = (value) => {
    dispatch(order.actions.createOrder(value))
    router.push(routes.ORDERCONFIRM.replace(':id', id))
  }

  const handleUpload = (file) => {
    dispatch(order.actions.uploadPhotos(file))
  }

  if (loading) {
    return <Loading/>
  }
  if (error) {
    return <Error error={error.toString()} handleReload={handleReload}/>
  }

  return (
    <BaseLayout config={config} header={header}>
      <div className={'Order'}>
        {service
          ? <div className='category'>
            <h3 className='title'>{service?.title}</h3>
            {/*<p className='text'>{service.category.title}</p>*/}
            <span className='text date'>
                {getCreatedDate(date)}
            </span>
          </div>
          : ''}
        <div className={'order-form'}>
          <Formik
            initialValues={{
              description: '',
              price: '',
              serviceId: service?._id,
              title: service?.title,
              photos: item?.photos
            }}
            validationSchema={ValidateSchema}
            validateOnMount={true}
            onSubmit={(values) => {
              handleSubmit(values)
            }}
          >
            {
              props => {
                const {isValid, values, setFieldValue, errors, touched} = props
                return (
                  <Form>

                    <div className='input-group'>
                      <Field as='textarea' id='description' name='description'
                             className={
                               errors.description && touched.description
                                 ? 'input-item order-info error'
                                 : 'input-item order-info'
                             }
                             placeholder='Описание'/>
                      <ErrorMessage component='p' className={'error'} name='description'/>
                    </div>

                    <div className='input-group'>
                      <label htmlFor='photos' className='upload-file__label input-item '>
                        <span className='upload-file__text'>Фотография</span>
                        <svg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M0.231934 14.6383H15.7519V16.272H0.231934V14.6383ZM8.85416 3.87887V13.0046H7.12971V3.87887L1.89516 8.83874L0.675978 7.68372L7.99193 0.752003L15.3079 7.68291L14.0887 8.83792L8.85416 3.88051V3.87887Z'
                            fill='#99879D'/>
                        </svg>
                      </label>

                      <input
                        className='upload-file__input'
                        id='photos'
                        placeholder='Фотография'
                        type="file"
                        name="photos"
                        onChange={(event) => {
                          handleUpload(event.target.files[0])
                        }}
                      />
                      {item?.photos.length !== 0 ? <div className='uploaded-photos'>
                        {item?.photos.map(o => <img key={o} src={imgApiUrl + o} alt={o}/>)}
                      </div> : ''}

                    </div>

                    <div className='input-group'>
                      <Field id='price' name='price' type={'number'}
                             className={errors.price && touched.price ? 'input-item white error' : 'input-item white'}
                             placeholder='Цена, которую вы предлагаете'/>
                      <ErrorMessage component='p' name='price'/>
                    </div>

                    <button disabled={!isValid} className={`btn-confirm${!isValid ? ' disabled' : ''}`} type='submit'>
                      Далее
                    </button>

                  </Form>)
              }
            }
          </Formik>

        </div>
      </div>
    </BaseLayout>
  )
}

export default Order
