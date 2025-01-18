import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FaHome, FaInfoCircle} from 'react-icons/fa'
import { MdAdminPanelSettings } from "react-icons/md";
import { MdLocalHospital } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import img from '../assets/shadow_icon.png'



function HomePage() {
    return (
        <div className='pic container-fluid'>
            <header className='hd row d-flex justify-content-center align-items-center'>
                <div className='col-sm-1 h3 d-flex justify-content-end align-items-center'>
                    <img className='image' src={img} ></img>
                </div>
                <div className='col-sm-6 h4 d-flex justify-content-start align-items-center'>
                    Optimized Blood Donation and Distribution System
                </div>
                <div className='icon col-sm-1 h6 d-flex justify-content-center align-items-center'><FaHome size={25} style={{color:'green'}} /><Link to={'/'} className='hlk'>Home</Link></div>
                <div className='icon col-sm-1 h6 d-flex justify-content-center align-items-center'><FaInfoCircle size={25} style={{color:'silver'}}/><Link to={'/about'} className='hlk'>About</Link></div>
                <div className='icon col-sm-1 h6 d-flex justify-content-center align-items-center'><BiSolidDonateBlood size={25} style={{color:'blue'}}/><Link to={'/login2'} className='hlk'>Donor</Link></div>
                <div className='icon col-sm-1 h6 d-flex justify-content-center align-items-center'><MdLocalHospital size={25} style={{color:'darkred'}}/><Link to={'/patientlogin'} className='hlk'>Patient</Link></div>
                <div className='icon col-sm-1 h6 d-flex justify-content-center align-items-center'><MdAdminPanelSettings size={25} style={{color:'green'}}/><Link to={'/login1'} className='hlk'>Admin</Link></div>
            </header>
            <div className='hdblack row'></div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default HomePage