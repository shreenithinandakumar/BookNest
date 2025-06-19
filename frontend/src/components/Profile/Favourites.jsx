import React, { useEffect, useState } from "react";
import axios from 'axios'
import BookCard from "../BookCard/BookCard"
const Favourites = ()=>{
    const [FavouriteBooks, setFavouriteBooks] = useState()
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
    useEffect(()=>{
        const fetch = async() =>{
            const response = await axios.get("https://booknest-c5hx.onrender.com/api/v1/get-favourite-books", {headers})
            setFavouriteBooks(response.data.data)
        }
        fetch()
    }, [])

    // ✅ Function to update UI after removal
    const handleRemove = (idToRemove) => {
        const updatedBooks = FavouriteBooks.filter(book => book._id !== idToRemove);
        setFavouriteBooks(updatedBooks);
    };

    return (
        <>
            {FavouriteBooks && FavouriteBooks.length ===0 && (
                <div className="text-5xl h-[100%] font-semibold text-zinc-500 flex flex-col items-center justify-center w-full "> No Favourite Books </div>
            )}

            <div className="ml-4 grid grid-cols-3 gap-4">
                {FavouriteBooks && FavouriteBooks.map((items, i)=>(
                    <div key={i}>
                        <BookCard data={items} favourite={true} onRemove={handleRemove}/>
                    </div>
                ))}
            </div>
        </>
        
    )
}

export default Favourites