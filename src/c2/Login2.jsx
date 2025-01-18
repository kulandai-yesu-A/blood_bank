import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

function Login2() {
    const [login2, setLogin2] = useState();
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const Data2 = async (user) => {
        try {
            console.log('Form data being sent:', user); 
            const response = await axios.post('http://127.0.0.1:8000/api/login/donor/', user, {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log('Response:', response.data);
            toast.success("Login successful");
            navigate('/mainpage2');
        } catch (error) {
            console.error('Error submitting the form:', error.response?.data);  
            toast.error("Login failed");
        }
    };

    // const handleClick = ()=>{
    //     navigate('/mainpage2')
    // }

    return (
        <div className=''>
            <div className='container-fluid d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
                <form onSubmit={handleSubmit(Data2)} className='cform card' style={{ width: 350, boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.5)' }}>
                    <div className='card-body d-flex justify-content-center align-items-center flex-column'>

                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input
                                type='email'
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id='email'
                                {...register("email")}
                                placeholder='Enter email'
                            />
                            <div className='invalid-feedback'>{errors.email?.message}</div>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <input
                                type='password'
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id='password'
                                {...register("password")}
                                placeholder='Enter password'
                            />
                            <div className='invalid-feedback'>{errors.password?.message}</div>
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-sm-12 d-flex justify-content-center'>
                            <button type='submit' className='btn btn-success'>Login</button>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center mb-4'>
                        <p>Don't have an account? Click <Link to={'/donorform'}>Register</Link></p>
                    </div>

                    <Outlet />
                </form>
            </div>
        </div>
    );
}

export default Login2;
