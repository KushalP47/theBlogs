import React from 'react'
import {login, logout} from '../../store/authSlice.js';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth.js';

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout() // logging out in backend
        .then(() => {
            dispatch(logout()) // logging out in redux state
        })
    }
    return (
        <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
            Logout
        </button>
    )
}

export default LogoutBtn
