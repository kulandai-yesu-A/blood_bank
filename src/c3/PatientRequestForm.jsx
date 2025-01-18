import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

const PatientRequestForm = () => {
  const [formData, setFormData] = useState({});

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    patient_name: Yup.string().required('Patient name is required'),
    blood_type: Yup.string().required('Blood type is required'),
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('Quantity must be positive')
      .integer('Quantity must be an integer'),
    blood_bank: Yup.string().required('Blood bank is required'),
    request_date: Yup.date().required('Request date is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/bloodrequests/', data);
      alert('Blood request submitted successfully');
    } catch (error) {
      console.error('There was an error submitting the request:', error);
    }
  };

  return (
    <div className="container my-5">
      <h2>Patient Blood Request Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <label htmlFor="patient_name" className="form-label">Patient Name</label>
            <input
              type="text"
              id="patient_name"
              className={`form-control ${errors.patient_name ? 'is-invalid' : ''}`}
              {...register('patient_name')}
            />
            <div className="invalid-feedback">{errors.patient_name?.message}</div>
          </div>
          <div className="col-sm-2"></div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <label htmlFor="blood_type" className="form-label">Blood Type</label>
            <input
              type="text"
              id="blood_type"
              className={`form-control ${errors.blood_type ? 'is-invalid' : ''}`}
              {...register('blood_type')}
            />
            <div className="invalid-feedback">{errors.blood_type?.message}</div>
          </div>
          <div className="col-sm-2"></div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <label htmlFor="quantity" className="form-label">Quantity (Units)</label>
            <input
              type="number"
              id="quantity"
              className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
              {...register('quantity')}
            />
            <div className="invalid-feedback">{errors.quantity?.message}</div>
          </div>
          <div className="col-sm-2"></div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <label htmlFor="blood_bank" className="form-label">Blood Bank</label>
            <input
              type="text"
              id="blood_bank"
              className={`form-control ${errors.blood_bank ? 'is-invalid' : ''}`}
              {...register('blood_bank')}
            />
            <div className="invalid-feedback">{errors.blood_bank?.message}</div>
          </div>
          <div className="col-sm-2"></div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <label htmlFor="request_date" className="form-label">Request Date</label>
            <input
              type="date"
              id="request_date"
              className={`form-control ${errors.request_date ? 'is-invalid' : ''}`}
              {...register('request_date')}
            />
            <div className="invalid-feedback">{errors.request_date?.message}</div>
          </div>
          <div className="col-sm-2"></div>
        </div>

        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <button type="submit" className="btn btn-primary">Submit Request</button>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </form>
    </div>
  );
};

export default PatientRequestForm;
