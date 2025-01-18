// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DataTable from 'react-data-table-component';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

// const BloodRequestManager = () => {
//     // Blood Requests State
//     const [requests, setRequests] = useState([]);
//     const [showRequestForm, setShowRequestForm] = useState(false);

//     // Blood Banks State
//     const [bloodBanks, setBloodBanks] = useState([]);
//     const [showBankForm, setShowBankForm] = useState(false);
//     const [editingBank, setEditingBank] = useState(null);

//     // API URLs
//     const BLOOD_REQUEST_API_URL = 'http://127.0.0.1:8000/api/bloodrequests/';
//     const BLOOD_BANK_API_URL = 'http://127.0.0.1:8000/api/bloodbanks/';

//     // Validation Schema for Blood Requests
//     const requestValidationSchema = Yup.object().shape({
//         patient_name: Yup.string().required('Patient name is required'),
//         blood_type: Yup.string().required('Blood type is required'),
//         quantity: Yup.number().required('Quantity is required'),
//         blood_bank: Yup.string().required('Blood bank is required'),
//     });

//     // Validation Schema for Blood Banks
//     const bankValidationSchema = Yup.object().shape({
//         name: Yup.string().required('Blood bank name is required'),
//         district: Yup.string().required('District is required'),
//         phone: Yup.string().required('Phone number is required').matches(/^\d{10,15}$/, 'Phone number must be 10-15 digits'),
//     });

//     // Form Hook for Blood Requests
//     const { register: registerRequest, handleSubmit: handleRequestSubmit, reset: resetRequest, formState: { errors: requestErrors } } = useForm({
//         resolver: yupResolver(requestValidationSchema),
//     });

//     // Form Hook for Blood Banks
//     const { register: registerBank, handleSubmit: handleBankSubmit, reset: resetBank, formState: { errors: bankErrors } } = useForm({
//         resolver: yupResolver(bankValidationSchema),
//     });

//     // Fetch Blood Requests
//     const fetchRequests = async () => {
//         try {
//             const response = await axios.get(BLOOD_REQUEST_API_URL);
//             setRequests(response.data);
//         } catch (error) {
//             console.error('Error fetching blood requests:', error);
//         }
//     };

//     // Fetch Blood Banks
//     const fetchBloodBanks = async () => {
//         try {
//             const response = await axios.get(BLOOD_BANK_API_URL);
//             setBloodBanks(response.data);
//         } catch (error) {
//             console.error('Error fetching blood banks:', error);
//         }
//     };

//     useEffect(() => {
//         fetchRequests();
//         fetchBloodBanks();
//     }, []);

//     // Add or Update Blood Request
//     const addBloodRequest = async (data) => {
//         try {
//             const response = await axios.post(BLOOD_REQUEST_API_URL, data);
//             setRequests([...requests, response.data]);
//             toast.success('Blood request added successfully!');
//             resetRequest();
//             setShowRequestForm(false);
//         } catch (error) {
//             console.error('Error adding blood request:', error);
//             toast.error('Error adding blood request.');
//         }
//     };

//     // Add or Update Blood Bank
//     const handleAddOrUpdateBank = async (data) => {
//         try {
//             if (editingBank) {
//                 const response = await axios.put(`${BLOOD_BANK_API_URL}${editingBank.id}/`, data);
//                 setBloodBanks(bloodBanks.map((bank) => (bank.id === editingBank.id ? response.data : bank)));
//                 toast.success('Blood bank updated successfully!');
//             } else {
//                 const response = await axios.post(BLOOD_BANK_API_URL, data);
//                 setBloodBanks([...bloodBanks, response.data]);
//                 toast.success('Blood bank added successfully!');
//             }
//             resetBank();
//             setShowBankForm(false);
//             setEditingBank(null);
//         } catch (error) {
//             console.error('Error saving blood bank:', error);
//             toast.error('Error saving blood bank.');
//         }
//     };

//     // Delete Blood Bank
//     const deleteBloodBank = async (id) => {
//         try {
//             await axios.delete(`${BLOOD_BANK_API_URL}${id}/`);
//             setBloodBanks(bloodBanks.filter((bank) => bank.id !== id));
//             toast.success('Blood bank deleted successfully!');
//         } catch (error) {
//             console.error('Error deleting blood bank:', error);
//             toast.error('Error deleting blood bank.');
//         }
//     };

//     // Blood Request Table Columns
//     const requestColumns = [
//         { name: 'Patient Name', selector: (row) => row.patient_name, sortable: true },
//         { name: 'Blood Type', selector: (row) => row.blood_type },
//         { name: 'Quantity', selector: (row) => row.quantity },
//         { name: 'Request Date', selector: (row) => new Date(row.request_date).toLocaleDateString() },
//         { name: 'Status', selector: (row) => row.status === 1 ? 'Pending' : row.status === 2 ? 'Approved' : 'Rejected' },
//     ];

//     // Blood Bank Table Columns
//     const bankColumns = [
//         { name: 'Name', selector: (row) => row.name, sortable: true },
//         { name: 'District', selector: (row) => row.district },
//         { name: 'Phone', selector: (row) => row.phone },
//         { name: 'Actions', cell: (row) => (
//             <>
//                 <button onClick={() => { setEditingBank(row); resetBank(row); setShowBankForm(true); }} className="btn btn-warning btn-sm">Edit</button>
//                 <button onClick={() => deleteBloodBank(row.id)} className="btn btn-danger btn-sm">Delete</button>
//             </>
//         )}
//     ];

//     // Custom Styles for Tables
//     const customStyles = {
//         headCells: {
//             style: {
//                 backgroundColor: '#007bff',
//                 color: 'white',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//             },
//         },
//         rows: {
//             style: {
//                 fontSize: '14px',
//             },
//         },
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 {/* Blood Request Section */}
//                 <div className="col-sm-6">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h2>Blood Request Management</h2>
//                         <button className="btn btn-primary" onClick={() => setShowRequestForm(!showRequestForm)}>
//                             {showRequestForm ? 'Hide Form' : 'New Request'}
//                         </button>
//                     </div>

//                     {showRequestForm && (
//                         <form onSubmit={handleRequestSubmit(addBloodRequest)} className="mb-4">
//                             <div className="mb-3">
//                                 <label>Patient Name</label>
//                                 <input type="text" {...registerRequest('patient_name')} className="form-control" />
//                                 {requestErrors.patient_name && <p className="text-danger">{requestErrors.patient_name.message}</p>}
//                             </div>
//                             <div className="mb-3">
//                                 <label>Blood Type</label>
//                                 <select {...registerRequest('blood_type')} className="form-select">
//                                     <option value="">Select Blood Type</option>
//                                     <option value="1">A+</option>
//                                     <option value="2">A-</option>
//                                     <option value="3">B+</option>
//                                     <option value="4">B-</option>
//                                     <option value="5">AB+</option>
//                                     <option value="6">AB-</option>
//                                     <option value="7">O+</option>
//                                     <option value="8">O-</option>
//                                 </select>
//                                 {requestErrors.blood_type && <p className="text-danger">{requestErrors.blood_type.message}</p>}
//                             </div>
//                             <div className="mb-3">
//                                 <label>Quantity</label>
//                                 <input type="number" {...registerRequest('quantity')} className="form-control" />
//                                 {requestErrors.quantity && <p className="text-danger">{requestErrors.quantity.message}</p>}
//                             </div>
//                             <div className="mb-3">
//                                 <label>Blood Bank</label>
//                                 <select {...registerRequest('blood_bank')} className="form-select">
//                                     <option value="">Select Blood Bank</option>
//                                     {bloodBanks.map(bank => (
//                                         <option key={bank.id} value={bank.id}>{bank.name}</option>
//                                     ))}
//                                 </select>
//                                 {requestErrors.blood_bank && <p className="text-danger">{requestErrors.blood_bank.message}</p>}
//                             </div>
//                             <button type="submit" className="btn btn-success">Add Request</button>
//                         </form>
//                     )}

//                     <DataTable
//                         title="Blood Request List"
//                         columns={requestColumns}
//                         data={requests}
//                         pagination
//                         customStyles={customStyles}
//                     />
//                 </div>

//                 {/* Blood Bank Section */}
//                 <div className="col-sm-6">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h2>Blood Bank Management</h2>
//                         <button className="btn btn-primary" onClick={() => setShowBankForm(!showBankForm)}>
//                             {showBankForm ? 'Hide Form' : 'New Blood Bank'}
//                         </button>
//                     </div>

//                     {showBankForm && (
//                         <form onSubmit={handleBankSubmit(handleAddOrUpdateBank)} className="mb-4">
//                             <div className="mb-3">
//                                 <label>Blood Bank Name</label>
//                                 <input type="text" {...registerBank('name')} className="form-control" />
//                                 {bankErrors.name && <p className="text-danger">{bankErrors.name.message}</p>}
//                             </div>
//                             <div className="mb-3">
//                                 <label>District</label>
//                                 <input type="text" {...registerBank('district')} className="form-control" />
//                                 {bankErrors.district && <p className="text-danger">{bankErrors.district.message}</p>}
//                             </div>
//                             <div className="mb-3">
//                                 <label>Phone</label>
//                                 <input type="text" {...registerBank('phone')} className="form-control" />
//                                 {bankErrors.phone && <p className="text-danger">{bankErrors.phone.message}</p>}
//                             </div>
//                             <button type="submit" className="btn btn-success">{editingBank ? 'Update' : 'Add'} Blood Bank</button>
//                         </form>
//                     )}

//                     <DataTable
//                         title="Blood Bank List"
//                         columns={bankColumns}
//                         data={bloodBanks}
//                         pagination
//                         customStyles={customStyles}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BloodRequestManager;
