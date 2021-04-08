import AccordionUI from '../../../shared/components/Accordion/AccordionUI'
import BaseLayout from '../../../shared/layouts/client/BaseLayout'
import './OrderConfirm.scss'
import {routes} from '../../../shared/constants'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {useHistory, useParams} from 'react-router-dom'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import order from '../../../store/modules/order'
import Loading from '../../../shared/components/Loading'
import MaskedInput from 'react-text-mask'
import {AuthContext} from "../../../shared/contexts/AuthContext/AuthContext";
import {useContext} from "react";

const ValidateSchema = Yup.object().shape({
  address: Yup.string()
    .max(200, 'Превышено максимальное число символов')
    .required('Поле не может быть пустым'),
  phone: Yup.string()
    .test('len', 'Введите корректный номер телефона', (val) => {
      const val_length_without_dashes = val?.replace(/ |_/g, '').length
      return val_length_without_dashes === 12
    })
    .required('Поле не может быть пустым')

})
const phoneNumberMask = [
  '9', '9', '2', ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/
]

function OrderConfirm() {

  const router = useHistory()
  const {id} = useParams()
  const dispatch = useDispatch()
  const {service, isCreated, loading, error, item} = useSelector(state => state.order, shallowEqual)
  const data = service && service.subCategoryItem && service.subCategoryItem
  const header = {title: 'Подтверждение заявки', text: ''}
  const layoutConfig = {
    needReturnText: 'Шаг назад',
    fixed: true
  }
  const accordionConfig = {
    order: true
  }

  const handleSubmit = async (value) => {
    value.phone.replace(/[\s-+_]/g, "")
    await dispatch(order.actions.createOrder(value))
    await dispatch(order.actions.postTask())
    !error && dispatch(order.actions.isCreatedTask())
  }
  if (isCreated) {
    router.push(routes.ORDERPUBLIC)
  }
  if (loading) {
    return <Loading/>
  }
  if (!service) {
    router.push(routes.ORDER.replace(':id', id))
  }
  return (
    <BaseLayout config={layoutConfig} header={header}>
      {service && service.category
        ? <AccordionUI config={accordionConfig} item={data} subItems={item}/>
        : ''}
      <div className={'OrderConfirm'}>
        <Formik
          initialValues={{
            address: '',
            phone: '',
            isCanCall: true,
            isCanText: true
          }}
          validationSchema={ValidateSchema}
          validateOnMount={true}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
        >
          {props => {
            const {isValid, values, handleBlur, handleChange, errors, touched} = props
            return (
              <Form className='OrderConfirm-form'>

                <div className='input-group'>
                  <Field id='address' name='address'
                         className={errors.address && touched.address ? 'input-item white error' : 'input-item white'}
                         placeholder='Адрес'/>
                  <ErrorMessage component='p' className={'error'} name='address'/>
                </div>

                <div className='input-group'>
                  <Field name='phone'>{({field}) => (
                    <MaskedInput
                      {...field}
                      mask="+\9\92 99 999-99-99"
                      type="tel"
                      id='phone'
                      value={values.phone}
                      placeholder="+992 __ ___-__-__"
                      alwaysShowMask={false}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.phone && touched.phone
                          ? 'input-item white error'
                          : 'input-item white'
                      }
                    />
                  )}
                  </Field>
                  <ErrorMessage component='p' className={'error'} name='phone'/>
                </div>

                <label className={`btn-regular ${values.isCanCall ? 'active' : ''}`}>
                  <Field style={{visibility: 'hidden'}} type='checkbox' name='isCanCall'/>
                  {values.isCanCall ? 'Позвоните мне' : 'Не звоните мне'}
                </label>

                <label className={`btn-regular ${values.isCanText ? 'active' : ''}`}>
                  <Field style={{visibility: 'hidden'}} type='checkbox' name='isCanText'/>
                  {values.isCanText ? 'Напишите мне' : 'Не пишите мне'}
                </label>

                <button disabled={!isValid} className={`btn-confirm${!isValid ? ' disabled' : ''}`}
                        type='submit'>Опубликовать
                </button>

              </Form>
            )
          }}

        </Formik>
      </div>

    </BaseLayout>

  )
}

export default OrderConfirm
