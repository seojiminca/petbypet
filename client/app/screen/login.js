import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from 'axios';
import {authenticate, isAuth} from '../_middleware/auth';
import MainLayout from '../components/mainlayout';
import '../style/login.css';

const Login = () => {

    const history = useHistory();

    //현재값, 업데이트값.
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        textChange: 'Login' //btn text
    });

    const {email, password, textChange} = formData; // const name = formData.name

    const handleChange = text => e => { //값이 들어오면 form 바뀐다. text:사용자입력값. e: each value
        setFormData({...formData, [text]: e.target.value});
    };

    const handleSubmit = e => {
       e.preventDefault();

        if (email && password) {
            axios
                .post(`http://localhost:5000/users/login`, formData)
                .then(res => {
                    setFormData({
                        ...formData,
                        show: false
                    });
                    localStorage.setItem('user', res);
                    history.goBack();
                })
                .catch(err => {
                    alert(err);
                });
        } else {
           alert('Please fill all fields');
        }
    };

    return (
        <MainLayout top={{ title: 'Login', isSign: true }} footer>
            <form onSubmit={handleSubmit}>
            <div className='form'>
                <input type="email" placeholder="email" onChange={handleChange('email')} required/>
                <input type="password" placeholder="password" onChange={handleChange('password')} required/>
                <Link to="/"
                    className='forgot-password'
                >forgot password?</Link>
                <button>LOGIN</button>
                <p>or continue with</p>
                <div className='google-img'>
                    <img
                     src='https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip'
                     alt="google"
                    />
                </div>
                <div className="line"></div>
            </div>
            <div className='register-wrapper'>
                <text>Don't have account?</text>
                <Link to="/register"
                    className='register'
                >Signup Now</Link>
            </div>
            </form>
        </MainLayout>
    );
};

export default Login;
