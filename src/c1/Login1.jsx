import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const schema = yup.object().shape({
  username: yup.string()
    .required('Name is Required')
    .matches(/^[a-zA-Z]+$/, "Enter valid username"),
  password: yup.string()
    .required('Password is required'),
})

function Login1() {
  const navigate = useNavigate()
  const [login, setLogin] = useState()
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema), });
  const Data = (user) => {
    console.log(user);
    setLogin(user);
    axios.post('http://127.0.0.1:8000/api/login/', user, {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      console.log(response, "res");

      toast.success("Login successfully")
      navigate('/mainpage')

    }).catch(error => {
      console.log(error, "err");

      toast.error('Login failed')

    });
  }

  return (
    <div className='login-page'>
      <div className='container-fluid d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
        
        <form onSubmit={handleSubmit(Data)} className='cform card shadow-lg' style={{ width: '400px', padding: '20px', borderRadius: '10px' }}>
          
          <div className='card-header text-center'>
            <h3 className='card-title'>Admin Login</h3>
          </div>

          <div className='card-body'>
            <div className='mb-3'>
              <label className='form-label'>Username</label>
              <input
                type='text'
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                {...register("username")}
                placeholder='Enter your username'
              />
              {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
            </div>

            <div className='mb-3'>
              <label className='form-label'>Password</label>
              <input
                type='password'
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                {...register("password")}
                placeholder='Enter your password'
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>
          </div>

          <div className='card-footer d-flex justify-content-center'>
            <button type='submit' className='btn btn-primary btn-block' style={{ width: '100%' }}>
              Login
            </button>
          </div>
        </form>
      </div>

      
    </div>
  )
}

export default Login1














// first_name: yup
//     .string()
//     .required("This is required")
//     .matches(/^[a-zA-Z]+$/, "enter valid username"),
//   last_name: yup
//     .string()
//     .required("")
//     .matches(/^[a-zA-Z]+$/, "enter valid username"),
//   user_name: yup
//     .string()
//     .required("")
//     .matches(/^[a-zA-Z]+$/, "enter valid username"),
//   email: yup
//     .string()
//     .email("Enter valid email")
//     .matches('^[^@]+@[^@]+.com+$', "Enter valid email"),
//   password: yup
//     .string()
//     .required("")
//     // .min(8, "Password at least 8 characters")
//     .matches(/[a-z]/, "")
//     // .matches(/[A-Z]/, "")
//     .matches(/[0-9]/, "")
//     .matches(/[@$!%*?&#]/, ""),

//   confirm_password: yup
//     .string()
//     .required()
//     .oneOf([yup.ref('password'), null], "Passwords must match"),

// })
