// import React, { useState } from 'react';
// import axios from 'axios';
// import DataTable from 'react-data-table-component';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

// const BloodBank = () => {
//     const [banks, setBanks] = useState([]);
//     const [showForm, setShowForm] = useState(true);

//     const validationSchema = Yup.object().shape({
//         name: Yup.string().required('Name is required'),
//         district: Yup.string().required('District is required'),
//         phone: Yup.string().required('Phone is required').min(10, 'Phone number must be at least 10 characters'),
//     });

//     const { register, handleSubmit, reset, formState: { errors } } = useForm({
//         resolver: yupResolver(validationSchema),
//     });

//     const fetchBanks = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/bloodbanks/');
//             setBanks(response.data);
//         } catch (error) {
//             console.error('Error fetching banks:', error);
//             toast.error('Error fetching blood banks.');
//         }
//     };

//     const onSubmit = async (data) => {
//         try {
//             await axios.post('http://127.0.0.1:8000/api/bloodbanks/', data);
//             toast.success('Blood bank added successfully!');
//             reset();
//             setShowForm(true);
//             fetchBanks();  
//         } catch (error) {
//             console.error('Error adding blood bank:', error);
//             toast.error('Error adding blood bank.');
//         }
//     };

//     const columns = [
//         {
//             name: 'Name',
//             selector: row => row.name,
//             sortable: true,
//         },
//         {
//             name: 'District',
//             selector: row => row.district,
//             sortable: true,
//         },
//         {
//             name: 'Phone',
//             selector: row => row.phone,
//             sortable: true,
//         }
//     ];

//     return (
//         <div className="container mt-5" style={{width:600}}>
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h2>Blood Banks</h2>
//                 <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
//                     {showForm ? 'Close Form' : 'Add Blood Bank'}
//                 </button>
//             </div>

//             {showForm && (
//                 <div className="card mb-4">
//                     <div className="card-body">
//                         <h5 className="card-title">Add Blood Bank</h5>
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div className="mb-3">
//                                 <label>Name</label>
//                                 <input
//                                     type="text"
//                                     {...register('name')}
//                                     className="form-control"
//                                 />
//                                 {errors.name && <p className="text-danger">{errors.name.message}</p>}
//                             </div>

//                             <div className="mb-3">
//                                 <label>District</label>
//                                 <input
//                                     type="text"
//                                     {...register('district')}
//                                     className="form-control"
//                                 />
//                                 {errors.district && <p className="text-danger">{errors.district.message}</p>}
//                             </div>

//                             <div className="mb-3">
//                                 <label>Phone</label>
//                                 <input id='txtPhoneNo'
//                                     type="text"
//                                     {...register('phone')}
//                                     className="form-control"
//                                 />
//                                 {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
//                             </div>

//                             <button id='btnSubmit' type="submit"  className="btn btn-success w-100">Submit</button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             <DataTable
//                 columns={columns}
//                 data={banks}
//                 pagination
//                 highlightOnHover
//                 responsive
//                 className="table table-striped"
//             />
//         </div>
//     );
// };

// export default BloodBank;
