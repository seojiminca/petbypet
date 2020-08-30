import React, {useState} from 'react';
import axios from 'axios';
import {isAuth} from '../helpers/auth';
import {Redirect} from 'react-router-dom';

const UserRegistration = () => { 

    //현재값, 업데이트값.
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password1: '',
        password2: '',
        textChange: 'Sign up' //btn text
    });

    const {name, email, password1, password2, textChange} = formData; // const name = formData.name 

    const handleChange = text => e => { //값이 들어오면 form 바뀐다. text:사용자입력값. e: each value
        setFormData({...formData, [text]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (name && email && password1) {
            if (password1 === password2) {
                setFormData({...formData, textChange: 'Submitting'});
                axios
                    .post('http://localhost:5000/users', {
                        name,
                        email,
                        password: password1
                    })
                    .then(res => {
                        setFormData({
                            ...formData,//초기화. 왜 사용하는건지??
                            name: '',
                            email: '',
                            password1: '',
                            password2: '',
                            textChange: 'Submitted'
                        });

                        toast.success(res.data.message);
                    })
                    .catch(err => { //초기화.
                        setFormData({
                            ...formData,
                            name: '',
                            email: '',
                            password1: '',
                            password2: '',
                            textChange: 'Sign Up'
                        });
                        console.log(err.response);
                    });
            } else {
                console.log("Passwords don't matches");
            }
        } else {
            console.log('Please fill all fields');
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            {isAuth() ? <Redirect to='/' /> : null}
            <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            PET BY PET
                        </h1>

                        <form
                            className='w-full flex-1 mt-8 text-indigo-500'
                            onSubmit={handleSubmit}
                        >
                            <div className='mx-auto max-w-xs relative '>
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                    type='text'
                                    placeholder='Name'
                                    onChange={handleChange('name')}
                                    value={name}
                                />
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                    type='email'
                                    placeholder='Email'
                                    onChange={handleChange('email')}
                                    value={email}
                                />
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                    type='password'
                                    placeholder='Password'
                                    onChange={handleChange('password1')}
                                    value={password1}
                                />
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                    type='password'
                                    placeholder='Confirm Password'
                                    onChange={handleChange('password2')}
                                    value={password2}
                                />
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                                    <span className='ml-3'>{textChange}</span>
                                </button>
                            </div>
                            <div className='my-12 border-b text-center'>
                                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                    Or sign with email or social login
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>
                                <a
                                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                    href='/login'
                                    target='_self'
                                >
                                    <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                                    <span className='ml-4'>Sign In</span>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>  
        </div>
    );
};

export default UserRegistration;
