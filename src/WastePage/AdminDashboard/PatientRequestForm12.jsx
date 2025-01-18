// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';

// const schema = Yup.object().shape({
//   blood_group: Yup.string().required('Blood group is required'),
//   quantity: Yup.number().required('Quantity is required').min(1, 'At least 1 unit is required'),
// });

// const PatientRequestForm12 = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = data => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register('blood_group')} placeholder="Blood Group" />
//       {errors.blood_group && <p>{errors.blood_group.message}</p>}

//       <input type="number" {...register('quantity')} placeholder="Quantity" />
//       {errors.quantity && <p>{errors.quantity.message}</p>}

//       <button type="submit">Submit Request</button>
//     </form>
//   );
// };

// export default PatientRequestForm12;
