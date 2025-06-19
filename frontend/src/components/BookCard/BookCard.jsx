import React from "react"
import { Link } from "react-router-dom";
import axios from 'axios'

const BookCard = ({data, favourite, onRemove}) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: data._id,
    }
    const handleRemoveBook = async () => {
        try {
            const response = await axios.delete("https://booknest-c5hx.onrender.com/api/v1/delete-book-from-favourites", { headers });
            console.log(response.data);
            if (onRemove) {
                onRemove(data._id); // ✅ Notify parent to update list
            }
        } catch (error) {
            console.error("Error removing book from favourites:", error);
        }
    };
    
  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
        <Link to={`/view-book-details/${data._id}`}>
            <div className="">
                <div className="bg-zinc-900 rounded flex items-center justify-center">
                    <img src={data.url} alt="/" className="h-[25vh]"></img>
                </div>
                <h2 className="mt-4 text-xl text-white font-semibold"> {data.title} </h2>
                <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
                <p className="mt-2 text-zinc-200 font-semibold text-xl">
                    Rs. {data.price}
                </p>
            </div>
        </Link>
        {favourite && (
            <button className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4" onClick={handleRemoveBook}>Remove from favourites</button> 
        )}
    </div>
  )
}

export default BookCard