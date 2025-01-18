// from rest_framework import serializers
//   from django.contrib.auth.models import User
//   from django.core.exceptions import ValidationError

// class UserRegisterSerializer(serializers.ModelSerializer):
// class Meta:
// model = User
// fields = ['first_name', 'last_name', 'email', 'password']

//     def create(self, validated_data):
// user = User(
//   first_name = validated_data['first_name'],
//   last_name = validated_data['last_name'],
//   email = validated_data['email']
// )
// user.set_password(validated_data['password'])  # Hash the password
// user.save()
// return user

// class UserLoginSerializer(serializers.Serializer):
// email = serializers.EmailField()
// password = serializers.CharField()

//     def validate(self, attrs):
// email = attrs.get('email')
// password = attrs.get('password')

// if email and password:
// try:
// user = User.objects.get(email = email)
// if not user.check_password(password):
//                     raise ValidationError('Invalid credentials')
//             except User.DoesNotExist:
//                 raise ValidationError('User not found')
//         else:
//             raise ValidationError('Email and password are required')

// return attrs





// from rest_framework import generics
// from rest_framework.response import Response
// from rest_framework.permissions import AllowAny
// from rest_framework_simplejwt.tokens import RefreshToken
// from .serializers import UserRegisterSerializer, UserLoginSerializer

// class UserRegisterView(generics.CreateAPIView):
//     serializer_class = UserRegisterSerializer
//     permission_classes = (AllowAny,)

// class UserLoginView(generics.GenericAPIView):
//     serializer_class = UserLoginSerializer
//     permission_classes = (AllowAny,)

//     def post(self, request, *args, **kwargs):
//         serializer = self.get_serializer(data=request.data)
//         serializer.is_valid(raise_exception=True)

//         # User login logic
//         user = User.objects.get(email=serializer.validated_data['email'])
//         refresh = RefreshToken.for_user(user)

//         return Response({
//             'refresh': str(refresh),
//             'access': str(refresh.access_token),
//             'message': 'Login successful'
//         })






//         from django.urls import path
// from .views import UserRegisterView, UserLoginView

// urlpatterns = [
//     path('register/', UserRegisterView.as_view(), name='register'),
//     path('login/', UserLoginView.as_view(), name='login'),
// ]




// from django.contrib import admin
// from django.urls import path, include

// urlpatterns = [
//     path('admin/', admin.site.urls),
//     path('api/', include('your_app_name.urls')),  # Update with your app's name
// ]






























// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const schema = yup.object().shape({
//   donorname: yup
//     .string()
//     .required('Name is required')
//     .matches(/^[a-zA-Z]+$/, 'Enter a valid username'),
//   gender: yup
//     .string()
//     .required('Gender is required')
//     .matches(/^[a-zA-Z]+$/, 'Enter a valid gender'),
//   dob: yup.date().required('Date of birth is required'),
//   bloodgroup: yup
//     .string()
//     .matches(/^(A|B|AB|O)[+-]$/, 'Invalid blood group')
//     .required('Blood group is required'),
//   lastdonationdate: yup.date().nullable(),
// });

// function RegisterDonor() {
//   const navigate = useNavigate();
//   const [donor, setDonor] = useState(null);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });

//   const reg = (inner) => {
//     setDonor(inner);
//     console.log(inner);

//     axios
//       .post('http://127.0.0.1:8000/api/donors/', inner)
//       .then((response) => {
//         console.log(response, 'res');
//         toast.success('Registration successful');

//       })
//       .catch((error) => {
//         console.log(error, 'err');
//         toast.error('Registration failed');

//       });

//   };

//   return (
//     <div>
//       <div className='d-flex justify-content-center align-items-center' style={{ Height: 300 }}>
//         <form onSubmit={handleSubmit(reg)}>
//           <div className='cform card' style={{ width: 450 }}>
//             <div className='card-body'>
//               <label>Name</label>
//               <input
//                 type='text'
//                 className='form-control'
//                 {...register('donorname')}
//                 placeholder='Username'
//               />
//               {errors.donorname && <p className='text-danger'>{errors.donorname.message}</p>}
//             </div>
//             <div className='card-body'>
//               <label>Gender</label>
//               <input
//                 type='text'
//                 className='form-control'
//                 {...register('gender')}
//                 placeholder='Gender'
//               />
//               {errors.gender && <p className='text-danger'>{errors.gender.message}</p>}
//             </div>
//             <div className='card-body'>
//               <label>Date of Birth</label>
//               <input
//                 type='date'
//                 className='form-control'
//                 {...register('dob')}
//                 placeholder='Date of Birth'
//               />
//               {errors.dob && <p className='text-danger'>{errors.dob.message}</p>}
//             </div>
//             <div className='card-body'>
//               <label>Blood Group</label>
//               <input
//                 type='text'
//                 className='form-control'
//                 {...register('bloodgroup')}
//                 placeholder='Blood Group'
//               />
//               {errors.bloodgroup && <p className='text-danger'>{errors.bloodgroup.message}</p>}
//             </div>
//             <div className='card-body'>
//               <label>Last Donation Date</label>
//               <input
//                 type='date'
//                 className='form-control'
//                 {...register('lastdonationdate')}
//                 placeholder='Last Donation Date'
//               />
//               {errors.lastdonationdate && (
//                 <p className='text-danger'>{errors.lastdonationdate.message}</p>
//               )}
//             </div>
//             <div className='card-body'>
//               <button type='submit' className='btn btn-primary'>
//                 Register
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default RegisterDonor;
