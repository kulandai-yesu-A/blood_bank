// BloodRequestTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

const RequestHistory = () => {
    const [requests, setRequests] = useState([]);
    const API_URL = 'http://127.0.0.1:8000/api/blood-requests/';

    const fetchRequests = async () => {
        try {
            const response = await axios.get(API_URL);
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching blood requests:', error);
            toast.error('Error fetching blood requests.');
        }
    };

    const deleteRequest = async (id) => {
        try {
            await axios.delete(`${API_URL}${id}/`);
            setRequests(requests.filter(request => request.id !== id));
            toast.success('Blood request deleted successfully!');
        } catch (error) {
            console.error('Error deleting blood request:', error);
            toast.error('Error deleting blood request.');
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const columns = [
        { name: 'Patient Name', selector: (row) => row.patient_name, sortable: true },
        { name: 'Blood Type', selector: (row) => row.blood_type.blood_group, sortable: true },
        { name: 'Quantity', selector: (row) => row.quantity, sortable: true },
        { name: 'Request Date', selector: (row) => new Date(row.request_date).toLocaleString(), sortable: true },
        {
            name: 'Actions',
            cell: (row) => (
                <button onClick={() => deleteRequest(row.id)} className="btn btn-danger btn-sm">Delete</button>
            ),
        },
    ];

    return (
        <DataTable
            title="Blood Request List"
            columns={columns}
            data={requests}
            pagination
            className="table table-striped"
        />
    );
};

export default RequestHistory;
