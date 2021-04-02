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
  email: Yup.string().email('Введите корректный email')
    .required('Email не может быть пустым'),
  password: Yup.string()
    .required('Пароль не может быть пустым')
    .min(8, 'Минимальная длина пароля 8 символов'),
  role: Yup.string()
})

function Auth(props) {
  const dispatch = useDispatch()
  const {loading, error, authData} = useSelector(state => state.auth, shallowEqual)
  const authContext = useContext(AuthContext);
  const [isLoginPage, setLoginPage] = useState(true)
  const header = {title: 'Frest', text: isLoginPage ? 'Авторизация' : 'Регистрация'}


  const handleChangePage = () => {
    setLoginPage(!isLoginPage)
  }

  useEffect(() => {
    authData && authContext.login(authData.token, authData.userId, authData.role)
  }, [authData])

  const handleSubmit = async (value) => {
    if (isLoginPage) {
      dispatch(auth.actions.login(value))
    } else {
      await dispatch(auth.actions.register(value))
      dispatch(auth.actions.login(value))
    }
  }

  if (loading) {
    return <Loading/>
  }
  return (
    <BaseLayout header={header}>
      <div className='Auth'>

        <button className='btn-regular'
                onClick={handleChangePage}>{isLoginPage ? 'Регистрация' : 'Уже есть аккаунт?'}
        </button>

        <div className='auth-form'>

          <Formik
            initialValues={!isLoginPage
              ? {
                email: '',
                password: '',
                role: roles.CLIENT
              }
              : {
                email: '',
                password: '',
              }}
            validationSchema={ValidateSchema}
            validateOnMount={true}
            onSubmit={(values) => {
              if (!isLoginPage && !values.role) {
                values.role = roles.CLIENT
              }
              handleSubmit(values)
            }}
          >
            {
              props => {
                const {isValid, setFieldValue, values, errors, touched} = props
                return (
                  <Form>

                    {!isLoginPage && <div className='input-group'>
                      <Field as={'select'} id='role' name='role'
                             className={
                               errors.role && touched.role
                                 ? 'input-item order-info error'
                                 : 'input-item order-info'
                             }
                      >
                        <option value={roles.CLIENT}>Я Заказчик</option>
                        <option value={roles.SPECIALIST}>Я Исполнитель</option>
                      </Field>
                      <ErrorMessage component='p' className={'error'} name='role'/>
                    </div>}

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

                    <button disabled={!isValid} className={`btn-confirm${!isValid ? ' disabled' : ''}`} type='submit'>
                      {!isLoginPage ? 'Регистрация' : 'Войти'}
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

export default Auth;
