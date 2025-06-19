import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from "../Loader/Loader"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GrLanguage } from 'react-icons/gr'
import { FaHeart } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { FaEdit } from 'react-icons/fa'
import { MdOutlineDelete } from 'react-icons/md'

const ViewBookDetails = ()=>{
        const { id } = useParams()
        const navigate = useNavigate()
        const [data, setData] = useState()
        const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
        const role = useSelector((state)=> state.auth.role)
        
        useEffect(()=>{
            const fetch = async ()=>{
                const response = await axios.get(`https://booknest-c5hx.onrender.com/api/v1/get-book-by-id/${id}`)
                setData(response.data.data)
            }
            fetch()
        }, [])

        const headers = {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
            bookid:  id
        }
        const handleFavourite = async ()=>{
            const response = await axios.put("https://booknest-c5hx.onrender.com/api/v1/add-book-to-favourites", {}, {headers})
            alert(response.data.message)
        }

        const handleCart = async ()=>{
            const response = await axios.put("https://booknest-c5hx.onrender.com/api/v1/add-to-cart", {}, {headers})
            alert(response.data.message)
        }
         
        const deleteBook = async() => {
            const response = await axios.delete(
                "https://booknest-c5hx.onrender.com/api/v1/delete-book",
                {headers}
            )
            alert(response.data.message)
            navigate("/all-books")
        }
    return (
    <div>
        {data && (
            <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 itms-start'>
                <div className='w-full lg:w-3/6'>
                    {" "}
                    <div className='flex justify-around bg-zinc-800 p-12 rounded'>
                        {" "}
                        <img src={data.url} alt="/" className="h-[50vh] lg:h-[70vh] rounded object-cover"/>
                        {isLoggedIn===true && role==="user" &&(
                            <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8'>
                            <button className='bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 text-red-500 flex items-center jsutify-center' onClick={handleFavourite}>
                                <FaHeart /> {" "}
                                <span className='ms-4 block lg:hidden'>Favourties</span>
                            </button>
                            <button className='text-white rounded mt-8 md:mt-0 lg:rounded-full text-4xl lg:text-3xl p-3 lg:mt-8 bg-blue-500 flex items-center justify-center' onClick={handleCart}>
                                <FaShoppingCart />{" "}
                                <span className='ms-4 block lg:hidden'>Add to cart</span>
                            </button>
                        </div>
                        )}
                        {isLoggedIn===true && role==="admin" &&(
                            <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'>
                            <Link to = {`/updateBook/${id}`} className='bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 flex items-center justify-center'>
                                <FaEdit /> {" "}
                                <span className='ms-4 block lg:hidden'>Edit</span>
                            </Link>
                            <button className='text-red-500 rounded lg:rounded-full text-4xl lg:text-3xl p-3 mt-8 md:mt-0 lg:mt-8 bg-white flex items-center justify-center' onClick={deleteBook}>
                                <MdOutlineDelete />
                                <span className='ms-4 block lg:hidden'>Delete Book</span>
                            </button>
                        </div>
                        )}
                    </div>
                </div>
                <div className='p-4 w-full lg:w-3/6'>
                    <h1 className='text-4xl text-zinc-300 font-semibold'> {data.title} </h1>
                    <p className='text-zinc-400 mt-1'> by {data.author} </p>
                    <p className='text-zinc-500 mt-4 text-xl'>{data.desc}</p>
                    <p className='flex mt-4 items-center justify-start text-zinc-400'>
                        <GrLanguage className="me-3" /> {data.language}
                    </p>
                    <p className='mt-4 text-zinc-100 text-3xl font-semibold'> Price: Rs. {data.price}{" "} </p>
                </div>
            </div>
        )}
        {!data && (
            <div className='h-screen bg-zinc-900 flex items-center justify-center'>
            <Loader /> {" "}
            </div>
        )}
    </div>
    )
}

export default ViewBookDetails