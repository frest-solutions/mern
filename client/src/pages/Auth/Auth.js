import './Auth.scss'
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import Loading from "../../shared/components/Loading";
import {useContext} from "react";
import {AuthContext} from "../../shared/contexts/AuthContext/AuthContext";
import auth from "../../store/modules/auth";
import {useEffect, useState} from "react";
import {roles} from "../../shared/constants";
import BaseLayout from "../../shared/layouts/client/BaseLayout";

const ValidateSchema = Yup.object().shape({
  email: Yup.string()
    .email('Введите корректный email')
    .required('Email не может быть пустым'),
  password: Yup.string()
    .required('Пароль не может быть пустым')
    .min(8, 'Минимальная длина пароля 8 символов'),
  role: Yup.string()
})

function Auth() {
  const dispatch = useDispatch()
  const {loading, error, authData} = useSelector(state => state.auth, shallowEqual)
  const authContext = useContext(AuthContext);
  const [isLoginPage, setLoginPage] = useState(true)
  const header = {title: 'Frest', text: ''}

  useEffect(() => {
    if (!authData?.token) {
      authContext.logout()
    } else {
      authContext.login(authData?.token || null, authData?.userId || null, authData?.role || null)
    }
  }, [authData, authContext])

  const handleSubmit = async (value) => {
    if (isLoginPage) {
      dispatch(auth.actions.login(value))
    } else {
      await dispatch(auth.actions.register(value))
      await dispatch(auth.actions.login(value))
    }
  }

  const handleChangePage = () => {
    setLoginPage(!isLoginPage)
  }

  if (loading) {
    return <Loading/>
  }
  return (
    <BaseLayout header={header}>
      <div className='Auth'>
        <h3 className="title">
          {isLoginPage ? 'Вход' : 'Регистрация'}
        </h3>
        <div className='auth-form'>
          {
            !isLoginPage
              ?
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  role: roles.CLIENT
                }}
                validationSchema={ValidateSchema}
                validateOnMount={true}
                onSubmit={(values) => {
                  if (!values.role) {
                    values.role = roles.CLIENT
                  }
                  handleSubmit(values)
                }}
              >
                {
                  props => {
                    const {isValid, errors, touched} = props
                    return (
                      <Form>

                        <div className='input-group'>
                          <Field as='select' name='role' className='input-item order-info'>
                            <option value='CLIENT'>Я Заказчик</option>
                            <option value='SPECIALIST'>Я Исполнитель</option>
                          </Field>

                        </div>

                        <div className='input-group'>
                          <Field id='email' name='email'
                                 className={
                                   errors.email && touched.email
                                     ? 'input-item order-info error'
                                     : 'input-item order-info'
                                 }
                                 placeholder='Ваш email'/>
                          <ErrorMessage component='p' className={'error'} name='email'/>
                        </div>

                        <div className='input-group'>
                          <Field id='password' name='password' type='password' suggested='current-password'
                                 className={errors.password && touched.password ? 'input-item white error' : 'input-item white'}
                                 placeholder='Ваш пароль'/>
                          <ErrorMessage component='p' name='password'/>
                        </div>

                        <div className='error-items'>
                          <p className="error">{error && error.message}</p>
                        </div>

                        <button disabled={!isValid} className={`btn-regular fill${!isValid ? ' disabled' : ''}`}
                                type='submit'>Регистрация
                        </button>

                      </Form>)
                  }
                }
              </Formik>

              : <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={ValidateSchema}
                validateOnMount={true}
                onSubmit={(values) => {
                  handleSubmit(values)
                }}
              >
                {
                  props => {
                    const {isValid, errors, touched} = props
                    return (
                      <Form>
                        <div className='input-group'>
                          <Field id='email' name='email'
                                 className={
                                   errors.email && touched.email
                                     ? 'input-item order-info error'
                                     : 'input-item order-info'
                                 }
                                 placeholder='Ваш email'/>
                          <ErrorMessage component='p' className={'error'} name='email'/>
                        </div>

                        <div className='input-group'>
                          <Field id='password' name='password' type='password' suggested='current-password'
                                 className={errors.password && touched.password ? 'input-item white error' : 'input-item white'}
                                 placeholder='Ваш пароль'/>
                          <ErrorMessage component='p' name='password'/>
                        </div>

                        <div className='error-items'>
                          <p className="error">{error && error.message}</p>
                        </div>

                        <button disabled={!isValid} className={`btn-regular fill${!isValid ? ' disabled' : ''}`}
                                type='submit'>Войти
                        </button>
                      </Form>)
                  }
                }
              </Formik>
          }

        </div>
        <div className="items">
          <p className="text">
            {isLoginPage ? 'Нет регистрации?' : 'Уже есть аккаунт?'}
          </p>
          <button className='btn-regular fill'
                  onClick={handleChangePage}>{isLoginPage ? 'Регистрация' : 'Вход'}
          </button>
        </div>


      </div>
    </BaseLayout>


  )
}

export default Auth;
