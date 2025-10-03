import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogout = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    })
    .catch((error) => {
      console.error("Logout failed:", error)
      navigate('/login') 
    })
  }, [navigate, token])

  return (
    <div>Logging out...</div>
  )
}

export default UserLogout
