import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const navigate = useNavigate()   // ✅ Correct hook

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      email: email,
      password: password,
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/captains/login`,
        captainData
      )

      if (response.status === 200) {   // ✅ response not Response
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token) // ✅ fixed token
        navigate('/captain-home') // ✅ will navigate now
      }

      setPassword('')
      setEmail('')
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message)
      alert('Login failed. Please check your credentials.')
    }
  }

  return (
    <div className='px-7 h-screen py-5 flex flex-col justify-between'>
      <div>
        <form onSubmit={submitHandler}>
          <img
            className='w-15 mb-7'
            src='https://imgs.search.brave.com/jQAXcA-jwF9WjMCNgG6gIWqWiEdLIcx_flI3LBMTcvw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Y2l0eXBuZy5jb20v/cHVibGljL3VwbG9h/ZHMvcHJldmlldy91/YmVyLXRleHQtd29y/ZC13aGl0ZS1sb2dv/LXBuZy03MDE3NTE2/OTQ3MDcyMjFyMG5l/dWJuZ204LnBuZw'
            alt='uber-logo'
          />
          <h3 className='text-lg font-semibold mb-2'>What's your email</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type='email'
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            placeholder='Youremail@example.com'
          />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type='password'
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            placeholder='Password'
          />
          <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>
            Login
          </button>
          <p className='text-center'>
            Join as Captain{' '}
            <Link to='/captain-signup' className='text-blue-600'>
              Signup as Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to='/login'
          className='bg-[#ad5225] flex justify-center items-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
