// import axios from 'axios'
// import React, { useState } from 'react'

// function Stock12() {
//     const [card, setCard] = useState()


//     const Data =()=>{
//         axios.get(`http://127.0.0.1:8000/api/donation/`,
//         ).then(res =>{
//             alert("Successfully saved")
//             setCard(res)
//           })
//     }

//     return (
//         <>
//             <div className='containeer' >
//                 <div className='row mb-3' style={{minHeight:'80vh'}} >
//                     <form onClick={Data}>
//                         <div className='card  d-flex justify-content-center align-items-center'>
//                             <div className='card-body bg-primary' style={{ width: 70, height: 70 }}>
//                                 {card}
//                             </div>
//                         <button type='submit'>Card</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Stock12