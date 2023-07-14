import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { validate } from '../../components/constants/RegistrationValidation'
import RegistrationForm from '../../forms/RegistrationForm'
import AuthLayout from '../../components/auth/AuthLayout'

export default function Register() {
  const [errors, setErrors] = useState({})
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setErrors({})
    const data = new FormData(event.currentTarget)
    data.append('role', 'user')
    const { isValid, updatedErrors: errors } = validate(data)
    if (isValid) {
      axios
        .post('/register', data)
        .then((res) => {
          if (res.status === 201) {
            localStorage.setItem('userId', res.data.id)
            localStorage.setItem('userAuthToken', res.data.token)
            navigate('/')
          }
        })
        .catch((err) => {
          const errRes = err.response.data
          if (errRes.type) {
            errRes.type === 'username' && setErrors({ username: [errRes.message] })
            errRes.type === 'email' && setErrors({ email: [errRes.message] })
            errRes.type === 'phone' && setErrors({ phone: [errRes.message] })
          } else setErrors({ general: errRes.message })
        })
        .finally(() => setLoading(false))
    } else {
      setErrors(errors)
      setLoading(false)
    }
  }
  return (
    <AuthLayout label='User Registration' isLoading={isLoading} error={errors?.general}>
      <RegistrationForm {...{ handleSubmit, isLoading, errors }} />
    </AuthLayout>
  )
}
