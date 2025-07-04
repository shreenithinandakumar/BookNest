import React, { useState, useEffect } from "react"
import axios from "axios"
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";
const RecentlyAdded = () => {

  const [Data, setData] = useState();
  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get('https://booknest-c5hx.onrender.com/api/v1/get-recent-books')
      setData(response.data.data)
    }
    fetch()
  }, [])
  
  return(
    <div className="h-[80vh] mt-8 px-4">
        <h4 className="text-3xl text-yellow-100">Recently added books</h4>
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {!Data && (
            <div className="flex items-center justify-center my-8">
              <Loader />{" "}
            </div>
          )}
          {Data && 
            Data.map((items, i) => (
                <div key={i}> 
                  <BookCard data={items} />{""}
                </div>
            ))}
        </div> 
    </div>
  )
}

export default RecentlyAdded 