import React, {useState} from 'react';
import axios from 'axios';
import {isAuth} from '../_middleware/auth';
import {Redirect} from 'react-router-dom';
import {Link} from "react-router-dom";
import MainLayout from '../components/mainlayout';
import '../style/review.registration';

const ReviewRegistration = () => {

    const { productId } = useState();

    //현재값, 업데이트값.
    const [formData, setFormData] = useState({
        rate: 0,
        comment: '',
        textChange: 'SUBMIT' //btn text
    });

    const {rate, comment, user, product, textChange} = formData; // const name = formData.name

    const handleChange = text => e => { //값이 들어오면 form 바뀐다. text:사용자입력값. e: each value
        console.log(e.target.value);
        setFormData({...formData, [text]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();

        if ( comment) {
            setFormData({...formData, textChange: 'Submitting'});
            axios
                .post('http://localhost:5000/reviews', {
                    rate,
                    comment,
                    user,
                    productId
                })
                .then(res => {
                    setFormData({
                        ...formData,//초기화. 왜 사용하는건지??
                        rate: 0,
                        comment: '',
                        user: '',
                        product: '',
                        textChange: 'Submitting'
                    });

                })
                .catch(err => { //초기화.
                    setFormData({
                        ...formData,
                        rate: 0,
                        comment: '',
                        user: '',
                        product: '',
                        textChange: 'Submitted'
                    });
                    console.log(err.response);
                });
        } else {
            alert('please rate and leave some comment for others!');
        }
    };

    return (
        <MainLayout top={{ title: 'Reviews', isBackButton: true }} footer>
            <div>
                {isAuth() ? <Redirect to='/'/> : null}
                <div></div>
                <h1>
                    LEAVE YOUR COMMENT
                </h1>
                <form onSubmit={handleSubmit}>
                    <ul className='face_list'>
                        <li><button type="button" onClick={handleChange('rate')} value="1">😄</button></li>
                        <li><button type="button" onClick={handleChange('rate')} value="2">🙂</button></li>
                        <li><button type="button" onClick={handleChange('rate')} value="3">😣</button></li>
                    </ul>   
                    <textarea onChange={handleChange('comment')}></textarea>
                    <button type="submit">SAVE</button>
                </form>
            </div>
        </MainLayout>
    );
};

export default ReviewRegistration;


