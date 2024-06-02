import React from 'react'
import { LogoutBtn, Container, Logo } from '../index.js';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
      ]

    return (
            <section className='flex justify-center items-center'>
                {/* Navbar  */}
                <nav className="w-full h-30 bg-black flex items-center justify-between px-4">
                    {/* Div for Logo  */}
                    <div className='flex-shrink-0'>
                        <Link to="/">
                            <Logo classname={`w-44 h-33 text-lg shadow-lg`} theme='dark'/>
                        </Link>
                    </div>
                    {/* Div for NavItems which is a unorder list */}
                    <div>
                        <ul className="hidden md:flex items-center justify-center flex-grow">
                            {/* Navitems  */}
                            {navItems.map((item) => 
                                item.active ? (
                                <li key={item.name}>
                                    <button onClick={() => navigate(item.slug)}
                                    className='inline-block px-6 py-4 text-lg duration-200 text-bold text-orange hover:text-white rounded-full'>
                                        {item.name}
                                    </button>
                                </li>   
                                ) : null
                            )}
                        </ul>
                    </div>
                    <div>
                        <ul>
                            {/* Logout Button  */}
                            {authStatus && (
                                <div className='ml-auto'>
                                    <li>
                                        <LogoutBtn />
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                </nav>
            </section>
        // </header>
    )
}

export default Header
