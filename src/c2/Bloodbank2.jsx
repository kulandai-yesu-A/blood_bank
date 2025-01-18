import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Bloodbank2 = () => {
    const [bloodBanks, setBloodBanks] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Blood bank name is required'),
        district: Yup.string().required('District is required'),
        phone: Yup.string().required('Phone number is required').matches(/^\d{10,15}$/, 'Phone number must be 10-15 digits')
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const API_URL = 'http://127.0.0.1:8000/api/bloodbanks/';

    const fetchBloodBanks = async () => {
        try {
            const response = await axios.get(API_URL);
            setBloodBanks(response.data);
            
        } catch (error) {
            console.error('Error fetching blood banks:', error);
        }
    };

    useEffect(() => {
        fetchBloodBanks();
    }, []);

    
    

    const columns = [
        { name: 'Name', selector: (row) => row.name, sortable: true },
        { name: 'District', selector: (row) => row.district },
        { name: 'Phone', selector: (row) => row.phone },
        
    ];
    const customStyles = {
        headCells: {
          style: {
            backgroundColor: 'red',  
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

                    {showForm && (
                        <form onSubmit={handleSubmit(handleAddOrUpdateBank)} className="mb-4">
                            <div className="mb-3">
                                <label>Blood Bank Name</label>
                                <input type="text" {...register('name')} className="form-control" />
                                {errors.name && <p className="text-danger">{errors.name.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label>District</label>
                                <input type="text" {...register('district')} className="form-control" />
                                {errors.district && <p className="text-danger">{errors.district.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label>Phone</label>
                                <input type="text" {...register('phone')} className="form-control" />
                                {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                            </div>

                            
                        </form>
                    )}

                    <DataTable
                        title="Blood Bank List"
                        columns={columns}
                        data={bloodBanks}
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

export default Bloodbank2;
