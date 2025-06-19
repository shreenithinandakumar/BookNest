import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  })
  const navigate = useNavigate()
  const change = (e)=>{
    const {name, value} = e.target
    setValues({...values, [name]: value })
  }
  const submit = async ()=>{
    try{
      if(values.username==="" || values.email==="" || values.password==="" || values.address==="") {
        alert("All fields are required")
      } else {
        const response = await axios.post(
          'https://booknest-c5hx.onrender.com/api/v1/sign-up',
          values
        )
        console.log(response.data.message)
        navigate('/login')
      }
    } catch(error){
      alert(error.response.data.message)
    }
  }
  return (
    <div className="h-screen bg-zinc-900 px-4 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-6 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl text-center">Sign Up</p>
        <div className="mt-6">
          <div className="mt-4">
            <label htmlFor="username" className="text-zinc-400 block mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-1 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="username"
              name="username"
              required
              value={values.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="text-zinc-400 block mb-2">
              Email
            </label>
            <input
              type="text"
              className="w-full mt-1 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="xyz@example.com"
              name="email"
              required
              value={values.email}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="text-zinc-400 block mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-1 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="password"
              name="password"
              required
              value={values.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="address" className="text-zinc-400 block mb-2">
              Address
            </label>
            <textarea
              className="w-full mt-1 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              rows="5"
              placeholder="address"
              name="address"
              required
              value={values.address}
              onChange={change}
            />
          </div>
          <div className="mt-6">
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300" onClick={submit}>
              SignUp
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">Or</p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Already have an account? &nbsp;
            <Link to="/login" className="hover:text-blue-500">
              <u>LogIn</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
