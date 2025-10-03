// pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return(
     <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] h-screen pt-8  flex justify-between flex-col w-full ">
        <img  className=" w-15 ml-8  " src="https://imgs.search.brave.com/jQAXcA-jwF9WjMCNgG6gIWqWiEdLIcx_flI3LBMTcvw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Y2l0eXBuZy5jb20v/cHVibGljL3VwbG9h/ZHMvcHJldmlldy91/YmVyLXRleHQtd29y/ZC13aGl0ZS1sb2dv/LXBuZy03MDE3NTE2/OTQ3MDcyMjFyMG5l/dWJuZ204LnBuZw" alt="uber-logo" />
        <div className="bg-white pb-7 py-5 px-4">
            <h2 className="text-2xl font-bold">
                Get Started with Uber
            </h2>
          <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
        </div>
     </div>
  )

};

export default Start;
