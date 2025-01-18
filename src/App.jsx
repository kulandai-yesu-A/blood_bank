import './App.css';
import './Home.css';
import './Sample.css';
import './Example.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';

import HomePage from './HomeLayouts.jsx/HomePage'
import Home from './c1/Home'
import Login1 from './c1/Login1'
import Login2 from './c2/Login2'
import DonorForm from './c2/DonorForm'
// import AdminDashboard from './AdminDashboard/Admindashboard';
// import PatientRequestForm from './AdminDashboard/PatientRequestForm';
import DonorTable from './sidebar/DonorDetails';
// import PatientRequestForm from './sidebar/PatientRequest';
import MainPage2 from './pages2/MainPage2';
import MainPage3 from './pages3/MainPage3';
import PatientRequest from './sidebar/PatientRequest';
import RequestHistory from './sidebar/RequestHistory';
import About from './c1/About';
import PatientRegister from './c3/PatientRegister';
import PatientLogin from './c3/PatientLogin';
import Bloodbank from './sidebar/Bloodbank';
import DonorHistory from './c2/DonorHistory';
import Bloodbank2 from './c2/Bloodbank2';
import DonorPatient from './c3/DonorPatient';
import PatientRequestForm from './c3/PatientRequestForm';
// import Stock12 from './simply/Stock12';
// import BloodRequestManager from './c3/BloodRequestManager';






function App() {
  return (
    <Router>
      <Routes>
        <Route path='' element={<HomePage />} >
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login1' element={<Login1 />} />
          <Route path='/patientlogin' element={<PatientLogin />} />
          <Route path='/login2' element={<Login2 />} />
          <Route path='/patient' element={<PatientRegister />} />
          <Route path='/donorform' element={<DonorForm />} />
          {/* <Route path='/patient' element={<DonorPatient />} /> */}
        </Route>


        <Route path="/mainpage" element={<MainPage />}>
          <Route path="table" element={<DonorTable />} />
          {/* <Route path="bank" element={<BloodBank />} /> */}
          <Route path="bank" element={<Bloodbank />} />
          <Route path="donorhistory" element={<DonorHistory />} />
          <Route path="profile" element={<div>Profile Page</div>} />
        </Route>

        {/* <Route path='/d' element={<AdminDashboard />} /> */}
        {/* <Route path='/p' element={<PatientRequestForm />} /> */}
        <Route path='/mainpage2' element={<MainPage2 />}>
          <Route path="table" element={<DonorTable />} />
          <Route path="donorhistory" element={<DonorHistory />} />
          <Route path="bank2" element={<Bloodbank2 />} />



        </Route>
        <Route path='/mainpage3' element={<MainPage3 />} >
          <Route path="table" element={<DonorTable />} />
          <Route path="pre" element={<PatientRequestForm />} />
          <Route path="donorrequest" element={<DonorPatient />} />
          {/* <Route path="requestmanager" element={<BloodRequestManager />} /> */}
        </Route>

        {/* <Route path="/history" element={<RequestHistory />} /> */}
        
        {/* <Route path='/simply' element = {<Stock12 />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
