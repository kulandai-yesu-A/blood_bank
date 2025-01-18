import React from 'react';
import { FaDonate, FaHandHoldingHeart } from 'react-icons/fa';
import { BsFillDropletFill } from 'react-icons/bs';

const Home = () => {
  return (
    <div className='homepage' style={{ display: 'flex', flexDirection: 'column', height: '86vh' }}>

      <div style={{ height: '80px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Lifeline Blood Bank</h1>
      </div>

      <div style={{ flex: 1, padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        <p style={{ fontSize: '1.25rem', marginBottom: '40px' }}>
          Helping save lives by connecting donors with hospitals and patients in need.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
          <div>
            <BsFillDropletFill size={50} style={{ color: 'red', marginBottom: '10px' }} />
            <h4>Donate Blood</h4>
            <p>Be a hero! Your blood donation can save lives in emergency situations.</p>
          </div>
          <div>
            <FaHandHoldingHeart size={50} style={{ color: 'green', marginBottom: '10px' }} />
            <h4>Join Our Mission</h4>
            <p>Be a part of our life-saving mission and help us improve health outcomes.</p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h3>Join Our Community</h3>
          <p style={{ marginTop: '20px' }}>
            Your contribution can make a world of difference to someone in need.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
