import React from 'react';
import axios from 'axios';
import Top from '../components/top';
import Footer from '../components/footer';


const Main = () => {
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        flavour: '',
        item_form: '',
        age: ''
    });


    const {email, password, textChange} = formData; // const name = formData.name

    const handleChange = text => e => { //값이 들어오면 form 바뀐다. text:사용자입력값. e: each value
        setFormData({...formData, [text]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(name || desc || flavour || item_form || age){
            axios.post(`http://localhost:5000/products`) //????
        }
    }

    return (
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
            <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                <div className='mt-12 flex flex-col items-center'>
                    <h1 className='text-xl xl:text-2xl font-extrabold'>
                        PET BY PET
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

                            <button
                                className='flex justify-end w-30 rounded-lg hover:bg-gray-100 hover:text-indigo-400'>
                                < i className='mt-10 far fa-images w-10'/>
                            </button>

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

    )

}

export default Main;
