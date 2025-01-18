import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const DonorHistory = () => {
    const [donorData, setDonorData] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            name: 'Donor Name', 
            selector: row => row.donor_name,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.gender,
            sortable: true,
        },
        {
            name: 'Date of Birth',
            selector: row => new Date(row.dob).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Blood Group',
            selector: row => row.blood_group==1?"A+":row.blood_group==2?"A-":row.blood_group==3?"B+":row.blood_group==4?"B-":row.blood_group==5?"AB+":row.blood_group==6?"AB-":row.blood_group==7?"O+":row.blood_group==8?"O-":"NA",
            sortable: true,
        },
        {
            name: 'Place',
            selector: row => row.place,
            sortable: true,
        },
    ];

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/donation/')
            .then(response => {
                setDonorData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching donor data:', error);
                setLoading(false);
            });
    }, []);

    const customStyles = {
        headCells: {
          style: {
            backgroundColor: '#4CAF50',  
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
            <div className='row'>
                <div className='col-sm-2'></div>
                <div className='col-sm-8'>
                    <h2>Donor Details</h2>
                    <DataTable
                        columns={columns}
                        data={donorData}
                        progressPending={loading}
                        pagination
                        highlightOnHover
                        customStyles={customStyles}
                    />
                </div>
                <div className='col-sm-2'></div>
            </div>

        </div>
    );
};

export default DonorHistory;
