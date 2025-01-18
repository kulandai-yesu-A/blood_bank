import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('First Name is required')
    .max(100, 'Max length is 100 characters'),
  last_name: Yup.string()
    .required('Last Name is required')
    .max(100, 'Max length is 100 characters'),
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  phone: Yup.string()
    .required('Phone is required')
    .matches(/^[0-9]+$/, 'Phone must contain only numbers')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits'),
  aadhar_id: Yup.string()
    .required('Aadhar ID is required')
    .matches(/^[0-9]{12}$/, 'Aadhar ID must be exactly 12 digits'),
  address: Yup.string().required('Address is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const PatientRegister = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/donor/', data, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Response:', response.data);
      toast.success("Registration successful");

      navigate('/patientlogin');
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      if (error.response) {
        const errorMessage = error.response.data.detail || 'Registration failed';
        toast.error(errorMessage);
      } else {
        toast.error("Registration failed, please try again later.");
      }
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

          <div className='d-flex justify-content-between'>
            <button type='submit' className='btn btn-primary'>Register</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientRegister;









// import React, { useState } from 'react';
// import axios from 'axios';

// const PatientRequestForm = () => {
//   const [formData, setFormData] = useState({
//     patient_name: '',
//     blood_type: '',
//     quantity: '',
//     blood_bank: '',
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/bloodrequests/', formData);
//       alert('Blood request submitted successfully');
//       setFormData({
//         patient_name: '',
//         blood_type: '',
//         quantity: '',
//         blood_bank: '',
//       });
//     } catch (error) {
//       console.error('There was an error submitting the request:', error);
//     }
//   };

//   return (
//     <div className="container my-5">
//       <h2>Patient Blood Request Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="patient_name" className="form-label">Patient Name</label>
//           <input
//             type="text"
//             id="patient_name"
//             name="patient_name"
//             className="form-control"
//             value={formData.patient_name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="blood_type" className="form-label">Blood Type</label>
//           <input
//             type="text"
//             id="blood_type"
//             name="blood_type"
//             className="form-control"
//             value={formData.blood_type}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="quantity" className="form-label">Quantity (Units)</label>
//           <input
//             type="number"
//             id="quantity"
//             name="quantity"
//             className="form-control"
//             value={formData.quantity}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="blood_bank" className="form-label">Blood Bank</label>
//           <input
//             type="text"
//             id="blood_bank"
//             name="blood_bank"
//             className="form-control"
//             value={formData.blood_bank}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">Submit Request</button>
//       </form>
//     </div>
//   );
// };

// export default PatientRequestForm;










































