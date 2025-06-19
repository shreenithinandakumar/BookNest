import React from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import Signup from "../pages/Signup"
import {useState} from "react"
import {authActions} from "../store/auth"
import { useDispatch } from "react-redux"

const Login = () => {
  const [values, setValues] = useState({
      username: "",
      password: "",
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const change = (e)=>{
    const {name, value} = e.target
    setValues({...values, [name]: value })
  }
  const submit = async ()=>{
    try{
      if(values.username==="" || values.password==="") {
        alert("All fields are required")
      } else {
        const response = await axios.post(
          'https://booknest-c5hx.onrender.com/api/v1/sign-in',
          values
        )
        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.role))
        localStorage.setItem("id", response.data.id)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("role", response.data.role)
        navigate('/profile')
      }
    } catch(error){
      alert(error.response.data.message)
    }
  }
  return (
    <div className="h-screen bg-zinc-900 px-4 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-6 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl text-center">Login</p>
        <div className="mt-6">
          <div className="mt-4">
            <label htmlFor="email" className="text-zinc-400 block mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-1 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="username"
              name="username"
              required
              value = {values.username}
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
              value = {values.password}
              onChange={change}
            />
          </div>
          <div className="mt-6">
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 trabsition-all duration-300" onClick={submit}>
              Login
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">Or</p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Don't have an account? &nbsp;
            <Link to="/sign-up" className="hover:text-blue-500">
              <u>SignUp</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
