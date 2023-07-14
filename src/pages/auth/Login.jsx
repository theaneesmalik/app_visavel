import { useNavigate } from 'react-router-dom'
import LoginForm from '../../forms/LoginForm'
import { useState } from 'react'
import AuthLayout from '../../components/auth/AuthLayout'
import { loginValidate } from '../../components/constants/RegistrationValidation'
import axios from 'axios'

export default function Login() {
  const [errors, setErrors] = useState({})
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setErrors({})
    const data = new FormData(event.currentTarget)
    data.append('role', 'user')
    const { isValid, updatedErrors: errors, isEmail } = loginValidate(data)
    if (isValid) {
      data.append('isEmail', isEmail)
      axios
        .post('/auth', data)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('userId', res.data.id)
            localStorage.setItem('userAuthToken', res.data.token)
            navigate('/')
          }
        })
        .catch((err) => {
          const errRes = err.response.data
          if (errRes.type) errRes.type === 'password' && setErrors({ password: [errRes.message] })
          else setErrors({ general: errRes.message })
        })
        .finally(() => setLoading(false))
    } else {
      setErrors(errors)
      setLoading(false)
    }
    // localStorage.setItem('agentId', 5)
    // navigate('/')
  }

  return (
    <AuthLayout label='User Login' isLoading={isLoading} error={errors?.general}>
      <LoginForm {...{ handleSubmit, isLoading, errors }} />
    </AuthLayout>
  )
}
