// import React, { useEffect, useState } from 'react';
// import api from '../services/api'; // Axios instance
// import { toast } from 'react-toastify';
// // import PatientRequestForm from './PatientRequestForm';

// const AdminDashboard = () => {
//   const [donors, setDonors] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const [bloodBanks, setBloodBanks] = useState([]);

//   useEffect(() => {
//     api.get('/donors/')
//       .then(response => setDonors(response.data))
//       .catch(error => toast.error('Failed to load donors'));

//     api.get('/patient-requests/')
//       .then(response => setRequests(response.data))
//       .catch(error => toast.error('Failed to load requests'));

//     api.get('/blood-banks/')
//       .then(response => setBloodBanks(response.data))
//       .catch(error => toast.error('Failed to load blood banks'));
//   }, []);

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <div>
//         <h2>Donors</h2>
//         <ul>{donors.map(d => <li key={d.id}>{d.user.username} - {d.blood_group}</li>)}</ul>
//       </div>
//       <div>
//         <h2>Blood Requests</h2>
//         <ul>{requests.map(r => <li key={r.id}>{r.patient.username} - {r.blood_group}</li>)}</ul>
//       </div>
//       <div>
//         <h2>Blood Banks</h2>
//         <ul>{bloodBanks.map(b => <li key={b.id}>{b.name} - {b.location}</li>)}</ul>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;














// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DataTable from 'react-data-table-component';
// import { toast } from 'react-toastify';
// import { DateTime } from 'luxon';

// const DonorPatient = () => {
//     const [donors, setDonors] = useState([]);
//     const [requests, setRequests] = useState([]);
//     const [showForm, setShowForm] = useState(false);

//     const API_DONOR_URL = 'http://127.0.0.1:8000/api/donation/';
//     const API_REQUEST_URL = 'http://127.0.0.1:8000/api/blood-requests/';

//     // Fetch donors
//     const fetchDonors = async () => {
//         try {
//             const response = await axios.get(API_DONOR_URL);
//             setDonors(response.data);
//         } catch (error) {
//             console.error('Error fetching donors:', error);
//         }
//     };

//     // Fetch patient requests
//     const fetchRequests = async () => {
//         try {
//             const response = await axios.get(API_REQUEST_URL);
//             setRequests(response.data);
//         } catch (error) {
//             console.error('Error fetching requests:', error);
//         }
//     };

//     useEffect(() => {
//         fetchDonors();
//         fetchRequests();
//     }, []);

//     // Format the date using Luxon
//     const formatDate = (date) => {
//         return DateTime.fromISO(date).toLocaleString(DateTime.DATE_SHORT);
//     };

//     // Handle blood request creation
//     const handleBloodRequest = async (donor) => {
//         try {
//             const requestPayload = {
//                 donor_id: donor.id,
//                 blood_type: donor.blood_group,
//                 status: 'pending',  // Status starts as pending
//             };

//             const response = await axios.post(API_REQUEST_URL, requestPayload);
//             toast.success('Blood request sent!');
//             fetchRequests();  // Refresh requests
//         } catch (error) {
//             console.error('Error making blood request:', error);
//             toast.error('Error sending blood request.');
//         }
//     };

//     // Accept patient request
//     const handleAcceptRequest = async (request) => {
//         try {
//             const updatePayload = { status: 'accepted' };
//             await axios.put(`${API_REQUEST_URL}${request.id}/`, updatePayload);
//             toast.success('Request accepted!');
//             fetchRequests();  // Refresh requests after status update
//         } catch (error) {
//             console.error('Error accepting request:', error);
//             toast.error('Error accepting the request.');
//         }
//     };

//     // Columns for Donor Management Table
//     const donorColumns = [
//         { name: 'Donor Name', selector: (row) => row.donor_name, sortable: true },
//         { name: 'Gender', selector: (row) => row.gender },
//         { name: 'DOB', selector: (row) => formatDate(row.dob) },
//         { name: 'Blood Group', selector: (row) => row.blood_group },
//         { name: 'Place', selector: (row) => row.place },
//         {
//             name: 'Actions',
//             cell: (row) => (
//                 <button onClick={() => handleBloodRequest(row)} className="btn btn-info">
//                     Request Blood
//                 </button>
//             ),
//         },
//     ];

//     // Columns for Patient Requests Table
//     const requestColumns = [
//         { name: 'Request ID', selector: (row) => row.id },
//         { name: 'Donor Name', selector: (row) => row.donor_name },
//         { name: 'Blood Type', selector: (row) => row.blood_type },
//         { name: 'Status', selector: (row) => row.status },
//         {
//             name: 'Actions',
//             cell: (row) => (
//                 row.status === 'pending' && (
//                     <button onClick={() => handleAcceptRequest(row)} className="btn btn-success">
//                         Accept Request
//                     </button>
//                 )
//             ),
//         },
//     ];

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-sm-2"></div>
//                 <div className="col-sm-9">
//                     <h2>Donor Management</h2>

//                     {/* Donor List */}
//                     <DataTable
//                         title="Available Donors"
//                         columns={donorColumns}
//                         data={donors}
//                         pagination
//                         className="table table-striped"
//                     />

//                     {/* Pending Requests */}
//                     <h2 className="mt-4">Pending Requests</h2>
//                     <DataTable
//                         title="Blood Requests"
//                         columns={requestColumns}
//                         data={requests}
//                         pagination
//                         className="table table-striped"
//                     />
//                 </div>
//                 <div className="col-sm-1"></div>
//             </div>
//         </div>
//     );
// };

// export default DonorPatient;





// # models.py
// class BloodRequest(models.Model):
//     donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
//     blood_type = models.CharField(max_length=10)
//     status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('accepted', 'Accepted')], default='pending')
//     request_date = models.DateTimeField(auto_now_add=True)

//     def __str__(self):
//         return f"Request {self.id} for {self.donor.donor_name}"






// # views.py
// from rest_framework import status
// from rest_framework.response import Response
// from rest_framework.views import APIView
// from .models import BloodRequest
// from .serializers import BloodRequestSerializer

// class BloodRequestView(APIView):
//     def get(self, request):
//         requests = BloodRequest.objects.all()
//         serializer = BloodRequestSerializer(requests, many=True)
//         return Response(serializer.data)

//     def post(self, request):
//         serializer = BloodRequestSerializer(data=request.data)
//         if serializer.is_valid():
//             serializer.save()
//             return Response(serializer.data, status=status.HTTP_201_CREATED)
//         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

//     def put(self, request, pk):
//         request_obj = BloodRequest.objects.get(pk=pk)
//         serializer = BloodRequestSerializer(request_obj, data=request.data, partial=True)
//         if serializer.is_valid():
//             serializer.save()
//             return Response(serializer.data)
//         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



// # serializers.py
// from rest_framework import serializers
// from .models import BloodRequest

// class BloodRequestSerializer(serializers.ModelSerializer):
//     class Meta:
//         model = BloodRequest
//         fields = '__all__'
