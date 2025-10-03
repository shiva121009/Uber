import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainLogout = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token')
        navigate('/captain-login')
      }
    })
    .catch((error) => {
      console.error("Logout failed:", error.response?.data || error.message)
      localStorage.removeItem('token') // clear anyway
      navigate('/captain-login')
    })
  }, [navigate, token])

  return (
    <div>Logging out...</div>
  )
}

export default CaptainLogout
