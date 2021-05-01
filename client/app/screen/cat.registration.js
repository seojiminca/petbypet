import React, { useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const CatRegistration = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    DOB: "",
    species: "",
    statusChange: "",
  });

  const { name, gender, DOB, species, statusChange } = formData;

  const onChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //validation

    setFormData({ ...formData, statusChange: "Submitting..." });
    try {
      const response = await Axios.post("http://localhost:5000/cats", formData);
      console.log(response);
      setFormData({
        //...formData 왜 필요한지?
        name: "",
        gender: "",
        DOB: "",
        species: "",
        statusChange: "Submitted!",
      });
      props.history.push("/catProfile");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <section>
      <h1>Cat Registration</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>name</label>
          <input
            type='text'
            id='name'
            className='form-control'
            onChange={onChange("name")}
            required
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='gender'>gender</label>
          <select
            id='gender'
            className='form-control'
            onChange={onChange("gender")}
            required
          >
            <option></option>
            <option value='neutered-female'>암컷(중성화)</option>
            <option value='female'>암컷</option>
            <option value='neutered-male'>수컷(중성화)</option>
            <option value='male'>수컷</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='DOB'>DOB</label>
          <input
            type='date'
            id='DOB'
            className='form-control'
            onChange={onChange("DOB")}
            required
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='species'>species</label>
          <select
            id='species'
            className='form-control'
            onChange={onChange("species")}
            required
          >
            <option></option>
            <option>아메리칸숏헤어</option>
            <option>코리안숏헤어</option>
            <option>먼치킨</option>
            <option>러시안블루</option>
            <option>랙돌</option>
            <option>샴</option>
            <option>뱅갈</option>
            <option>아비니시안</option>
            <option>기타</option>
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>
          submit
        </button>
      </form>
      <span>{statusChange}</span>
    </section>
  );
};
export default CatRegistration;




// <form
//                                 onSubmit={handleSubmit}
//                             >
//                                 <div>
//                                     <input
//                                         type='text'
//                                         placeholder='Comment'
//                                         onChange={handleChange('comment')}
//                                         value={comment}
//                                     />

//                                     {/*file upload*/}
//                                     <div>
//                                         <input type="file" name="file" onChange={null} />
//                                         <button onClick={null}>
//                                         </button>
//                                     </div>

//                                     <div>
//                                         <button>Cancel
//                                         </button>
//                                         <button>
//                                             <span>{textChange}</span>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </form>