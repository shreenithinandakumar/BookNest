import React from "react"
import { useSelector } from "react-redux"
import {Link} from "react-router-dom"
import { FaGripLines } from "react-icons/fa6"

const Navbar = () => {
  
  let links = [
    {
      "title": "Home",
      "link": "/"
    },
    {
      "title": "All Books",
      "link": "/all-books"
    },
    {
      "title": "Cart",
      "link": "/cart"
    },
    {
      "title": "Profile",
      "link": "/profile"
    },
    {
      "title": "Admin Profile",
      "link": "/profile"
    }
    
  ]

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  const role = useSelector((state)=> state.auth.role)
  
  links = links.filter(item => {
    if (!isLoggedIn) {
      // Only allow Home and All Books when not logged in
      return item.title === "Home" || item.title === "All Books";
    }

    if (role === 'user') {
      return item.title !== "Admin Profile";
    }

    if (role === 'admin') {
      return (item.title !== "Profile" && item.title !== "Cart");
    }

    return true;
  });

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img className="h-10 me-4" src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
          <h1 className="text-2xl font-semibold"> BookNest </h1>
        </Link>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
                <div className="flex items-center" key={i}>
                  {items.title === 'Profile' || items.title === 'Admin Profile' ? (
                    <Link 
                      to = {items.link}
                      className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    >
                      {items.title}
                    </Link>
                  ) : (
                    <Link
                      to = {items.link}
                      className="hover:text-blue-500 transition-all duration-300"
                    >
                      {items.title}
                    </Link>
                  )}
                </div>
              ))}
          </div>
          <div className="flex gap-4">
            {isLoggedIn===false && <>
              <Link to= "/login" className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">Login</Link>
              <Link to= "/sign-up" className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">Signup</Link>
            </>}
          </div>
        </div>
      </nav>
    </>
  )
  
}

export default Navbar