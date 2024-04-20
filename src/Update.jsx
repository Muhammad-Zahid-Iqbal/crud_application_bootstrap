import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Update = () => {
  const [data, setData] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    username:'',
    email: '',
    phone: '',
    website:''
})

  useEffect(()=>{
    axios.get(`http://localhost:3000/users/${id}`)
    .then(res=>setValues(res?.data))
    .catch(err => console.log(err));
},[]);

const handleSubmit = (event) => {
  event.preventDefault();
  try {
    axios.put(`http://localhost:3000/users/${id}`, values)
  .then(res=>{console.log(res)
      navigate('/')
      })  
  } catch (error) {
      console.log(error)
  }
}

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
        <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
           <h1>Add a User</h1> 
           <form onSubmit={handleSubmit}>
            <div className='mb-2'>
                <label htmlFor='name'>Name:</label>
                <input type='text' name='name' className='form-control' placeholder='Enter Name'
                value={values?.name} onChange={e=>setValues({...values, name: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor='username'>User Name:</label>
                <input type='text' name='username' className='form-control' placeholder='User Name'
                value={values?.username} onChange={e=>setValues({...values, username: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor='email'>Email:</label>
                <input type='email' name='email' className='form-control' placeholder='Email'
                value={values?.email} onChange={e=>setValues({...values, email: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor='phone'>Phone:</label>
                <input type='number' name='phone' className='form-control' placeholder='Phone Number'
                value={values?.phone} onChange={e=>setValues({...values, phone: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor='website'>Website:</label>
                <input type='text' name='website' className='form-control' placeholder='Website'
                value={values?.website} onChange={e=>setValues({...values, website: e.target.value})}/>
            </div>
            <button className='btn btn-success'>Update</button>
            <Link to="/" className="btn btn-primary ms-3">Back</Link>
           </form>
        </div>
        
    </div>
  )
}

export default Update