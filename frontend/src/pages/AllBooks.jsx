import React, {useState, useEffect} from "react"
import axios from 'axios'
import Loader from "../components/Loader/Loader"
import BookCard from "../components/BookCard/BookCard"
const AllBooks = () => {
  const [Data, setData] = useState();
  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get('https://booknest-c5hx.onrender.com/api/v1/get-all-books')
      setData(response.data.data)
    }
    fetch()
  }, [])
  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
          {!Data && (
            <div className="w-full h-[100%] flex items-center justify-center"><Loader />{" "}</div>
          )}
          <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

export default AllBooks