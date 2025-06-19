import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import { FaCheck } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { IoOpenOutline } from 'react-icons/io5'
import SeeUserData from './SeeUserData'

const AllOrders = () => {
    const [AllOrders, setAllOrders] = useState()
    const [Options, setOptions] = useState(-1)
    const [Values, setValues] = useState({ status: "" })
    const [userDiv, setuserDiv] = useState("hidden")
    const [userDivData, setuserDivData] = useState()

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ fixed
    }

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "https://booknest-c5hx.onrender.com/api/v1/get-all-orders",
                { headers }
            )
            setAllOrders(response.data.data)
        }
        fetch()
    }, [])

    const change = (e) => {
        const { value } = e.target
        setValues({ status: value })
    }

    const submitChanges = async (i) => {
        const id = AllOrders[i]?._id
        const response = await axios.put(
            `https://booknest-c5hx.onrender.com/api/v1/update-status/${id}`, // ✅ fixed
            Values,
            { headers }
        )
        alert(response.data.message)

        // ✅ Update local state so UI reflects change immediately
        const updatedOrders = [...AllOrders]
        updatedOrders[i].status = Values.status
        setAllOrders(updatedOrders)

        // ✅ Reset dropdown and options
        setOptions(-1)
        setValues({ status: "" })
    }

    return (
        <>
            {!AllOrders && (
                <div className='h-[100%] flex items-center justify-center'>
                    <Loader />
                </div>
            )}

            {AllOrders?.length > 0 && (
                <div className='p-0 md:p-4 text-zinc-100'>
                    <h1 className='ml-5 text-3xl md:text-4xl font-semibold text-yellow-50 mb-2'>
                        All Orders
                    </h1>

                    <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
                        <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
                            <div className='w-[3%]'><h1 className='text-center font-semibold'>S.No</h1></div>
                            <div className='w-[22%] font-semibold'><h1>Books</h1></div>
                            <div className='w-[45%] font-semibold'><h1>Description</h1></div>
                            <div className='w-[9%] font-semibold'><h1>Price</h1></div>
                            <div className='w-[16%] font-semibold'><h1>Status</h1></div>
                            <div className='w-none md:w-[5%] hidden md:block font-semibold'><h1>Mode</h1></div>
                        </div>
                    </div>

                    {AllOrders.map((items, i) => (
                        <div key={items?._id || i}
                            className='w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300'>
                            <div className='w-[3%]'>
                                <h1 className='text-center'>{i + 1}</h1>
                            </div>
                            <div className='w-[40%] md:w-[22%]'>
                                <Link to={`/view-book-details/${items?.book?._id}`} className='hover:text-blue-300'> {/* ✅ fixed */}
                                    {items?.book?.title || "Unknown Title"}
                                </Link>
                            </div>
                            <div className='w-0 md:w-[45%] hidden md:block'>
                                <h1>{items?.book?.desc?.slice(0, 50) || "No Description"}...</h1>
                            </div>
                            <div className='w-[17%] md:w-[9%]'>
                                <h1>Rs. {items?.book?.price ?? "N/A"}</h1>
                            </div>
                            <div className='w-[30%] md:w-[16%]'>
                                <h1 className='font-semibold'>
                                    <button className='hover:scale-105 transition-all duration-300' onClick={() => setOptions(i)}>
                                        {items?.status === 'Delivered' ? (
                                            <div className='text-green-500'>{items.status}</div>
                                        ) : items?.status === 'Canceled' ? (
                                            <div className='text-red-500'>{items.status}</div>
                                        ) : (
                                            <div className='text-yellow-500'>{items?.status}</div>
                                        )}
                                    </button>

                                    <div className={`${Options === i ? "block" : "hidden"} flex mt-4`}> {/* ✅ fixed */}
                                        <select
                                            name="status"
                                            className='bg-gray-800'
                                            onChange={change}
                                            value={Values.status}
                                        >
                                            {["Order Placed", "Out for delivery", "Delivered", "Canceled"].map((option, idx) => (
                                                <option value={option} key={idx}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className='text-green-500 hover:text-pink-600 mx-2'
                                            onClick={() => {
                                                submitChanges(i)
                                            }}>
                                            <FaCheck />
                                        </button>
                                    </div>
                                </h1>
                            </div>
                            <div className='w-[10%] md:w-[5%]'>
                                <button
                                    className='text-xl hover:text-orange-500'
                                    onClick={() => {
                                        setuserDiv("fixed")
                                        setuserDivData(items?.user)
                                    }}>
                                    <IoOpenOutline />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {userDivData && (
                <SeeUserData
                    userDivData={userDivData}
                    userDiv={userDiv}
                    setuserDiv={setuserDiv}
                />
            )}
        </>
    )
}

export default AllOrders
