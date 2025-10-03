import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(
    () => {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: '70%',
          padding: 24,
          duration: 0.5,
        })
        gsap.to(panelCloseRef.current, {
          opacity: 1,
          duration: 0.3,
        })
      } else {
        gsap.to(panelRef.current, {
          height: '0%',
          padding: 0,
          duration: 0.5,
        })
        gsap.to(panelCloseRef.current, {
          opacity: 0,
          duration: 0.3,
        })
      }
    },
    { dependencies: [panelOpen] }
  )

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="logo"
      />

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 right-6 top-6 text-2xl cursor-pointer"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className="text-2xl font-semibold">Find a trip</h4>

          <form className="relative py-3" onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>

            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />

            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>

        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel/>
        </div>
      </div>
  <div className='fixed w-full z-10 bg-white bottom-0 px-3 py-6 shadow-lg'>
  <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

  <div className='flex border active:border-gray-200 rounded-xl items-center justify-between p-3 mb-2 cursor-pointer hover:border-black'>
    <img className='h-[40px]' src='/pngegg.png' alt='UberGo' />
    <div className='flex-1 mx-3'>
      <h4 className='font-medium text-lg'>
        UberGo <span><i className='ri-user-3-fill' />4</span>
      </h4>
      <h5 className='font-medium text-sm'>2 mins away</h5>
      <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
    </div>
    <h2 className='text-lg font-semibold'>₹192.20</h2>
  </div>

  <div className='flex border active:border-gray-200 rounded-xl items-center justify-between p-3 mb-2 cursor-pointer hover:border-black'>
    <img className='h-[40px]' src='/Uber_Motopng.webp' alt='Moto' />
    <div className='flex-1 mx-3'>
      <h4 className='font-medium text-lg'>
        Moto <span><i className='ri-user-3-fill' />1</span>
      </h4>
      <h5 className='font-medium text-sm'>3 mins away</h5>
      <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
    </div>
    <h2 className='text-lg font-semibold'>₹65</h2>
  </div>

  <div className='flex border active:border-gray-200 rounded-xl items-center justify-between p-3 cursor-pointer hover:border-black'>
    <img className='h-[50px]' src='https://imgs.search.brave.com/2i_mg-__WgSFtIvaaG-JTeSDBEBAM48BsdvUtzDpIQw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yOS8yMi8wNS90/dWstdHVrLTE4NzE0/NTZfNjQwLmpwZw' alt='UberAuto' />
    <div className='flex-1 mx-3'>
      <h4 className='font-medium text-lg'>
        UberAuto <span><i className='ri-user-3-fill' />3</span>
      </h4>
      <h5 className='font-medium text-sm'>3 mins away</h5>
      <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
    </div>
    <h2 className='text-lg font-semibold'>₹118.44</h2>
  </div>
</div>

      
    </div>
  )
}

export default Home
