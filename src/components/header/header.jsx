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
        // <div className="w-full h-30 bg-black flex flex-begin">
        //     <img className="w-44 h-33 text-lg shadow-lg" src="theblogs-high-resolution-logo-bg-dark-1.svg" alt="logo" />
        // </div>
        <header>
            <Container>
                {/* Navbar  */}
                <nav className='flex'>  
                    {/* Div for Logo  */}
                    <div className='mr-4'>
                        <Link to="/">
                            <Logo width='70px' />
                        </Link>
                    </div>
                    {/* Div for NavItems which is a unorder list */}
                    <ul className='flex ml-auto'>
                        {/* Navitems  */}
                        {navItems.map((item) => 
                            item.active ? (
                             <li key={item.name}>
                                <button onClick={navigate(item.slug)}
                                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                                    {item.name}
                                </button>
                             </li>   
                            ) : null
                        )}
                        {/* Logout Button  */}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
