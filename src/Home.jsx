import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    console.log("data", data)

    useEffect(()=>{
        axios.get('http://localhost:3000/users')
        .then(res=>setData(res?.data))
        .catch(err => console.log(err));
    },[]);

    const handleDelete = (id) => {
        const confirm = window.confirm("Would you like to delete?");
        if(confirm){
            axios.delete(`http://localhost:3000/users/${id}`)
            .then(res => {
                window.location.reload();
            }).catch(error =>console.log(error));
        }
    }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
        <h1>List of Users</h1>
        <div className='w-95 rounded bg-white border shadow p-4'>
            <div className='d-flex justify-content-end'>
                <Link to="/create" className='btn btn-success'>Add +</Link></div>
            <table className='table table-stipend'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>website</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((value, index) => (
                            <tr key={index}>
                                <td>{value?.id}</td>
                                <td>{value?.name}</td>
                                <td>{value?.username}</td>
                                <td>{value?.email}</td>
                                <td>{value?.phone}</td>
                                <td>{value?.website}</td>
                                <td>
                                    <Link to={`/read/${value?.id}`} className='btn btn-sm btn-info me-2'>Read</Link>
                                    <Link to={`/update/${value?.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                    <button onClick={e => handleDelete(value?.id)} className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home