import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaHospital, FaHandHoldingHeart, FaTint, FaHandHoldingMedical } from 'react-icons/fa';

const MainPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHomepageContent, setShowHomepageContent] = useState(true); 

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleLinkClick = () => {
    setSidebarOpen(false);
    setShowHomepageContent(false); 
  };

  return (
    <div className="app-container">
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          &times;
        </button>
        <ul>
          <li><Link className='sidebarlk' to="table" onClick={handleLinkClick}>Donor Details</Link></li>
          <li><Link className='sidebarlk' to="donorhistory" onClick={handleLinkClick}>Donation History</Link></li>
          <li><Link className='sidebarlk' to="form" onClick={handleLinkClick}>Patient Request</Link></li>
          <li><Link className='sidebarlk' to="request" onClick={handleLinkClick}>Request history</Link></li>
          <li><Link className='sidebarlk' to="bank" onClick={handleLinkClick}>Blood Bank</Link></li>
          <li><Link className='sidebarlk' to="stock" onClick={handleLinkClick}>Stock</Link></li>
        </ul>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <button className="menu-icon" onClick={toggleSidebar}>
            ☰
          </button>
          <h1>Blood Bank Donor</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* {showHomepageContent && (
          <div className="container my-5">
            <div className="text-center">
              <h1 className="display-4">Blood Bank Management System</h1>
              <p className="lead">Save Lives, Donate Blood</p>
            </div>

            <div className="row text-center my-4">
              <div className="col-sm-6 col-md-3 my-3">
                <FaHospital size={80} className="text-primary" />
                <h3 className="my-3">Find Hospitals</h3>
                <p>Find nearby hospitals for blood donation and requests.</p>
              </div>

              <div className="col-sm-6 col-md-3 my-3">
                <FaHandHoldingHeart size={80} className="text-danger" />
                <h3 className="my-3">Donate Blood</h3>
                <p>Be a hero. Donate blood and save lives today.</p>
              </div>

              <div className="col-sm-6 col-md-3 my-3">
                <FaTint size={80} className="text-info" />
                <h3 className="my-3">Blood Banks</h3>
                <p>Locate blood banks and check available blood types.</p>
              </div>

              <div className="col-sm-6 col-md-3 my-3">
                <FaHandHoldingMedical size={80} className="text-success" />
                <h3 className="my-3">Get Help</h3>
                <p>Request blood for emergencies quickly and easily.</p>
              </div>
            </div>

            <div className="text-center mt-5">
              <button className="btn btn-primary btn-lg mx-2">Register as a Donor</button>
              <button className="btn btn-danger btn-lg mx-2">Request Blood</button>
            </div>
          </div>
        )} */}

        <div className="content-section">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
