// import React, { useState } from 'react'
// import * as FaIcons from 'react-icons/fa'
// import * as AiIcons from 'react-icons/ai'
// import { Link } from 'react-router-dom';
// import { SidebarData } from './SidebarData'
// import './Navbar.css'
// import {IconContext} from 'react-icons'


// function Navbar() {
//     const [sidebar, setSidebar] = useState(false)

//     const showSidebar = ()=> setSidebar(!sidebar)

//     return (
//         <>
//         <IconContext.Provider  value={{color:'#fff'}}>
//             <div className='navbar'>
//                 <Link to={'#'} className='menu-bars'>
//                     <FaIcons.FaBars onClick={showSidebar}/>
//                 </Link>
//             </div>
//             <nav className= {sidebar ? 'nav-menu active': 'nav-menu'} >
//                 <ul className='nav-menu-items'>
//                     <li className='navbar-toggle'>

//                         <Link to={'#'} className='menu-bars'>
//                         <AiIcons.AiOutlineClose />
                        
//                         </Link>
//                     </li>
//                     {SidebarData.map((item, index) =>{
//                         return(
//                             <li key= {index} className={item.cName}>
//                                 <Link to={item.path}>
//                                     {item.icon}
//                                     <span> { item.title } </span>
//                                 </Link>
//                             </li>
//                         )
//                     })}
//                 </ul>
//             </nav>
//             </IconContext.Provider>
//         </>
//     )
// }

// export default Navbar








// <div>
//   <div className='d-flex justify-content-center align-items-center' style={{ minHeight: 300 }}>
//     <form onSubmit={handleSubmit(reg)}>
//       <div className='cform card' style={{ height: 300, width: 500, overflowY: 'auto' }}>
//         <div className='card-body'>
//           <label>ID</label>
//           <input
//             type='text'
//             className='form-control'
//             {...register("donor_id")}
//             placeholder='ID'
//           />
//           {errors.donor_id && <p className="text-danger">{errors.donor_id.message}</p>}
//         </div>

//         <div className='card-body'>
//           <label>Name</label>
//           <input
//             type='text'
//             className='form-control'
//             {...register("donor_name")}
//             placeholder='Name'
//           />
//           {errors.donor_name && <p className="text-danger">{errors.donor_name.message}</p>}
//         </div>

//         <div className='card-body'>
//           <label>Gender</label>
//           <select
//             className='form-control'
//             {...register("gender")}
//             placeholder='Gender'
//           >
//             <option>Select Gender</option>
//             <option value={"Male"}>Male</option>
//             <option value={"Female"}>Female</option>
//             <option value={"Others"}>Others</option>
//           </select>
//           {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
//         </div>

//         <div className='card-body'>
//           <label>Date of Birth</label>
//           <input
//             type='date'
//             className='form-control'
//             {...register("dob")}
//             placeholder='Date of Birth'
//           />
//           {errors.dob && <p className="text-danger">{errors.dob.message}</p>}
//         </div>

//         <div className='card-body'>
//           <label>Blood Group</label>
//           <input
//             type='text'
//             className='form-control'
//             {...register("blood_group")}
//             placeholder='Blood Group'
//           />
//           {errors.blood_group && <p className="text-danger">{errors.blood_group.message}</p>}
//         </div>

//         <div className='card-body'>
//           <label>Last Donation Date</label>
//           <input
//             type='date'
//             className='form-control'
//             {...register("last_donation_date")}
//             placeholder='Last Donation Date'
//           />
//           {errors.last_donation_date && <p className="text-danger">{errors.last_donation_date.message}</p>}
//         </div>

//         <div className='card-body'>
//           <button type='submit' className='btn btn-primary'>Register</button>
//         </div>
//       </div>
//     </form>
//   </div>
// </div>