import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is required').max(100, 'Max length is 100 characters'),
  text:Yup.string().required(),
  last_name: Yup.string().required('Last Name is required').max(100, 'Max length is 100 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  phone: Yup.string().required('Phone is required').matches(/^[0-9]+$/, 'Phone must contain only numbers').min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number cannot exceed 15 digits'),
  aadhar_id: Yup.string().required('Aadhar ID is required').matches(/^[0-9]{12}$/, 'Aadhar ID must be exactly 12 digits'),
  address: Yup.string().required('Address is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  // agree: Yup.bool().oneOf([true], 'You must agree to the terms and conditions')
});

const DonorForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log('form data', data);
      
      const response = await axios.post('http://127.0.0.1:8000/api/register/donor/', data, {
        headers: { 'Content-Type': 'application/json' }
    });
    
      console.log('Response:', response.data);
      toast.success("Registration successful");

      navigate('/login2');
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      toast.error("Registration failed");
      console.log(error.response?.data);
      
    
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
      <form onSubmit={handleSubmit(onSubmit)} className='donorform card shadow-lg' style={{ width: '700px' }}>
        <div className='donorcard card-body'>
          <h4 className='text-center mb-4'>Donor Registration Form</h4>
          
          <div className='row'>
            <div className='form-group col-md-6'>
              <label>First Name</label>
              <input
                type='text'
                className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                {...register('first_name')}
              />
              <div className='invalid-feedback'>{errors.first_name?.message}</div>
            </div>
            
            <div className='form-group col-md-6'>
              <label>Last Name</label>
              <input
                type='text'
                className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                {...register('last_name')}
              />
              <div className='invalid-feedback'>{errors.last_name?.message}</div>
            </div>
          </div>

          <div className='row'>
            <div className='form-group col-md-6'>
              <label>Email</label>
              <input
                type='email'
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                {...register('email')}
              />
              <div className='invalid-feedback'>{errors.email?.message}</div>
            </div>
            <div className='form-group col-md-6'>
              <label>Phone</label>
              <input
                type='text'
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                {...register('phone')}
              />
              <div className='invalid-feedback'>{errors.phone?.message}</div>
            </div>
          </div>

          <div className='row'>
            <div className='form-group col-md-6'>
              <label>Aadhar ID</label>
              <input
                type='text'
                className={`form-control ${errors.aadhar_id ? 'is-invalid' : ''}`}
                {...register('aadhar_id')}
              />
              <div className='invalid-feedback'>{errors.aadhar_id?.message}</div>
            </div>
            <div className='form-group col-md-6'>
              <label>Password</label>
              <input
                type='password'
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                {...register('password')}
              />
              <div className='invalid-feedback'>{errors.password?.message}</div>
            </div>
          </div>

          <div className='form-group'>
            <label>Address</label>
            <textarea
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              {...register('address')}
            />
            <div className='invalid-feedback'>{errors.address?.message}</div>
          </div>

          {/* <div className='form-group form-check mb-4'>
            <input
              type='hidden'
              className={`form-check-input ${errors.agree ? 'is-invalid' : ''}`}
              {...register('agree')}
            />
            <label className='form-check-label'>
              I agree to the terms and conditions
            </label>
            <div className='invalid-feedback'>{errors.agree?.message}</div>
          </div> */}

          <div className='d-flex justify-content-between'>
            {/* <div className='form-group'>
              <label>Terms and Conditions</label>
            </div> */}
            <button type='submit' className='btn btn-primary'>Register</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DonorForm;
