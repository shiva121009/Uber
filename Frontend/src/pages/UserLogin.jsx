import React, { useContext } from 'react'
import { useState } from 'react'
import {Link} from "react-router-dom"
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const UserLogin = () => {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [userData, setUserData] = useState({})
    
    const {user, setUser} = useContext(UserDataContext)
    const navigate = useNavigate();

    const submitHandler= async (e)=>{
       e.preventDefault()
       const userData={
        email:email,
        password:password
       }
       const response = await axios.post(`${import.meta.env.VITE_BASEURL}/users/login`,
        userData
       )
       if(response.status ===200){
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
       navigate('/home')
       }
       setPassword('');
       setEmail('')
     }
  return (
    <div  className='px-7 h-screen py-5 flex  flex-col justify-between'>
       <div>
         <form onSubmit={(e)=>{
           submitHandler(e);
         }}>
        <img  className=" w-15 mb-7" src="https://imgs.search.brave.com/jQAXcA-jwF9WjMCNgG6gIWqWiEdLIcx_flI3LBMTcvw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Y2l0eXBuZy5jb20v/cHVibGljL3VwbG9h/ZHMvcHJldmlldy91/YmVyLXRleHQtd29y/ZC13aGl0ZS1sb2dv/LXBuZy03MDE3NTE2/OTQ3MDcyMjFyMG5l/dWJuZ204LnBuZw" alt="uber-logo" />
            <h3 className='text-lg font-semibold  mb-2'>What's your email</h3>
            <input

            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
            type="email"
            required 
        value={email}
        onChange={(e)=>{
            setEmail(e.target.value)
        }}
            placeholder='Youremail@example.com' 
            />
            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
            type="password" 
            required 
            value={password}
            onChange={(e)=>{
            setPassword(e.target.value)
            }}
            placeholder='Password' />
            <button
            className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
            >Login</button>
            <p className='text-center'>New here? <Link to='/signup' className="text-blue-600">Create new Account</Link></p>

        </form>
 
       </div>
      <div >
        <Link to='/captain-login'
            className='bg-[#10b461] flex justify-center items-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin