import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const PatientLogin = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    
    navigate('/mainpage3');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/donor/', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Login successful:', response.data);
      toast.success('Login successful');
      
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response) {
        const errorMessage = error.response.data.detail || 'Login failed';
        toast.error(errorMessage);
      } else {
        toast.error('Login failed, please try again later.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-89 mt-5">
      <div className="cform card shadow-lg p-4" style={{ width: '400px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="text-center mb-4">Patient Login</h4>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email')}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password')}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
          <p className="text-center">
            Don't have an account?{' '}
            <Link to={'/patient'}>Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PatientLogin;
