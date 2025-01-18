import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateTime } from 'luxon';

const PatientRequest = ({ fetchRequests }) => {
    const [bloodInventory, setBloodInventory] = useState([]);
    const [bloodBanks, setBloodBanks] = useState([]);

    const validationSchema = Yup.object().shape({
        patient_name: Yup.string().required('Patient name is required'),
        blood_type: Yup.string().required('Blood type is required'),
        quantity: Yup.number().required('Quantity is required'),
        blood_bank: Yup.string().required('Blood bank is required'),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const fetchBloodInventory = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/bloodinventory/');
            setBloodInventory(response.data);
        } catch (error) {
            console.error('Error fetching blood inventory:', error);
            // toast.error('Error fetching blood inventory.');
        }
    };

    const fetchBloodBanks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/bloodbanks/');
            setBloodBanks(response.data);
        } catch (error) {
            console.error('Error fetching blood banks:', error);
            // toast.error('Error fetching blood banks.');
        }
    };

    useEffect(() => {
        fetchBloodInventory();
        fetchBloodBanks();
    }, []);

    const onSubmit = async (data) => {
        try {
            const formattedData = {
                ...data,
                request_date: DateTime.local().toISO(),
                status: 1,
            };
            await axios.post('http://127.0.0.1:8000/api/bloodrequests/', formattedData);
            toast.success('Blood request submitted successfully!');
            reset();
            fetchRequests();
        } catch (error) {
            console.error('Error submitting blood request:', error);
            // toast.error('Error submitting blood request.');
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '80vh' }}>
            <div className="card shadow mb-4" style={{ width: 300 }}>
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Submit Blood Request</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label>Patient Name</label>
                            <input type="text" {...register('patient_name')} className="form-control" />
                            {errors.patient_name && <p className="text-danger">{errors.patient_name.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label>Blood Group</label>
                            <select {...register('blood_type')} className="form-select">
                                <option value="">Select Blood Type</option>
                                {bloodInventory.map(blood => (
                                    <option key={blood.id} value={blood.id}>
                                        {blood.blood_type}
                                    </option>
                                ))}
                            </select>
                            {errors.blood_type && <p className="text-danger">{errors.blood_type.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label>Quantity</label>
                            <input type="number" {...register('quantity')} className="form-control" />
                            {errors.quantity && <p className="text-danger">{errors.quantity.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label>Blood Bank</label>
                            <select {...register('blood_bank')} className="form-select">
                                <option value="">Select Blood Bank</option>
                                {bloodBanks.map(bank => (
                                    <option key={bank.id} value={bank.id}>
                                        {bank.name}
                                    </option>
                                ))}
                            </select>
                            {errors.blood_bank && <p className="text-danger">{errors.blood_bank.message}</p>}
                        </div>

                        <button type="submit" className="btn btn-success w-100">Submit Request</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PatientRequest;
