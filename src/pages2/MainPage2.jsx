import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaHospital, FaHandHoldingHeart, FaTint, FaHandHoldingMedical } from 'react-icons/fa';

const MainPage2 = () => {
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
          <li><Link className='sidebarlk' to="patient" onClick={handleLinkClick}>Patient Request</Link></li>
          <li><Link className='sidebarlk' to="bank" onClick={handleLinkClick}>Blood Bank</Link></li>
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

        

        <div className="content-section">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainPage2;
