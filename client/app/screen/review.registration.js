import React, {useState} from 'react';
import axios from 'axios';
import {isAuth} from '../_middleware/auth';
import {Redirect} from 'react-router-dom';
import {Link} from "react-router-dom";

const ReviewRegistration = () => {

    //현재값, 업데이트값.
    const [formData, setFormData] = useState({
        rate: 0,
        comment: '',
        user: '',
        product: '',
        uploadFile: null,
        textChange: 'SUBMIT' //btn text
    });

    const {rate, comment, user, product, textChange} = formData; // const name = formData.name

    const handleChange = text => e => { //값이 들어오면 form 바뀐다. text:사용자입력값. e: each value
        setFormData({...formData, [text]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (rate && comment) {
            setFormData({...formData, textChange: 'Submitting'});
            axios
                .post('http://localhost:5000/reviews/post', {
                    rate,
                    comment,
                    user,
                    product
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
            console.log('please rate and leave some comment for others!');
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            {isAuth() ? <Redirect to='/'/> : null}
            <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-xl xl:text-2xl font-extrabold'>
                            LEAVE YOUR COMMENT
                        </h1>

                        <form
                            className='w-full flex-1 mt-5 text-indigo-500'
                            onSubmit={handleSubmit}
                        >
                            <div className='mx-auto max-w-xs relative '>

                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                    type='text'
                                    placeholder='Comment'
                                    onChange={handleChange('comment')}
                                    value={comment}
                                />

                                {/*file upload*/}
                                <div>
                                    <input type="file" name="file" onChange={null} />
                                    <button onClick={null} className='flex justify-end w-30 rounded-lg hover:bg-gray-100 hover:text-indigo-400'>
                                        < i className='mt-10 far fa-images w-10'/>
                                    </button>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button
                                        className="font-semibold px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">Close
                                    </button>
                                    <button
                                        className="font-semibold modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400 hover:bg-indigo-700">
                                        <i className='fal fa-comment fa 1x w-6  -ml-1'/>
                                        <span className='ml-3'>{textChange}</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewRegistration;


/*
//여기다 복붙
  const productId = props.match.params.id;
  const [productData, setProductData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const product = await axios(
        `http://localhost:5000/products/${productId}`
      );
      setData(result.data);
      console.log(result);
    };

    fetchData();
  }, {});

*/
