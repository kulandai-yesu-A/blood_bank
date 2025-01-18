import React, { useEffect, useState } from 'react';
import axios, { formToJSON } from 'axios';
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { DateTime } from 'luxon';

const PatientRequest2 = () => {
    const [donors, setDonors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingDonor, setEditingDonor] = useState(null);

    const validationSchema = Yup.object().shape({
        donor_name: Yup.string().required('Donor name is required'),
        gender: Yup.string().required('Gender is required'),
        dob: Yup.date().required('Date of birth is required'),
        blood_group: Yup.string().required('Blood group is required'),
        place: Yup.string().required('Place is required'),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const API_URL = 'http://127.0.0.1:8000/api/bloodrequests/';

    const fetchDonors = async () => {
        try {
            const response = await axios.get(API_URL);
            setDonors(response.data);
        } catch (error) {
            console.error('Error fetching donors:', error);
        }
    };

    useEffect(() => {
        fetchDonors();
    }, []);

    
    const addDonor = async (data) => {
        try {
            const response = await axios.post(API_URL, formattedData);
            setDonors([...donors, response.data]);
            toast.success('Donor added successfully!');
            reset();
            setShowForm(false);
        } catch (error) {
            console.error('Error adding donor:', error);
            toast.error('Error adding donor.');
        }
    };

    

    const deleteDonor = async (id) => {
        try {
            await axios.delete(`${API_URL}${id}/`);
            setDonors(donors.filter((donor) => donor.id !== id));
            toast.success('Donor deleted successfully!');
        } catch (error) {
            console.error('Error deleting donor:', error);
            toast.error('Error deleting donor.');
        }
    };

    

    
    const columns = [
        {
            name: 'Donor Name',
            selector: (row) => row.donor_name,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: (row) => row.gender,
        },
        {
            name: 'DOB',
            selector: (row) => row.dob,
        },
        {
            name: 'Blood Group',
            selector: (row) => row.blood_group==1?"A+":row.blood_group==2?"A-":row.blood_group==3?"B+":row.blood_group==4?"B-":row.blood_group==5?"AB+":row.blood_group==6?"AB-":row.blood_group==7?"O+":row.blood_group==8?"O-":"NA",
        },
        {
            name: 'Place',
            selector: (row) => row.place,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <>
                    <button onClick={() => handleEdit(row)} className="btn btn-warning btn-sm">Accept</button>
                    <button onClick={() => deleteDonor(row.id)} className="btn btn-danger btn-sm">Reject</button>
                </>
            ),
        },
    ];

    const customStyles = {
        headCells: {
          style: {
            backgroundColor: 'blue',  
            color: 'white',               
            fontSize: '16px',
            fontWeight: 'bold',
          },
        },
        rows: {
          style: {
            fontSize: '14px', 
          },
        },
      };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-2"></div>

                <div className="col-sm-9">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Donor Management</h2>
                        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                            Add Donor
                        </button>
                    </div>

                    {showForm && (
                        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                            <div className="mb-3">
                                <label>Donor Name</label>
                                <input type="text" {...register('donor_name')} className="form-control" />
                                {errors.donor_name && <p className="text-danger">{errors.donor_name.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label>Gender</label>
                                <input type="text" {...register('gender')} className="form-control" />
                                {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label>Date of Birth</label>
                                <input type="date" {...register('dob')} className="form-control" />
                                {errors.dob && <p className="text-danger">{errors.dob.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label>Blood Group</label>
                                <select type="text" {...register('blood_group')} className="form-select">
                                    <option>Select Blood</option>
                                    <option value="1">A+</option>
                                    <option value="2">A-</option>
                                    <option value="3">B+</option>
                                    <option value="4">B-</option>
                                    <option value="5">AB+</option>
                                    <option value="6">AB-</option>
                                    <option value="7">O+</option>
                                    <option value="8">O-</option>
                                </select>
                                {errors.blood_group && <p className="text-danger">{errors.blood_group.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label>Place</label>
                                <input type="text" {...register('place')} className="form-control" />
                                {errors.place && <p className="text-danger">{errors.place.message}</p>}
                            </div>

                            <button type="submit" className="btn btn-success">
                                {editingDonor ? 'Update Donor' : 'Add Donor'}
                            </button>
                        </form>
                    )}

                    <DataTable
                        title="Donor List"
                        columns={columns}
                        data={donors}
                        pagination
                        className="table table-striped"
                        customStyles={customStyles}
                    />
                </div>

                <div className="col-sm-1"></div>
            </div>
        </div>
    );
};

export default PatientRequest2;
