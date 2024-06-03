import React from 'react'
import {login, logout} from '../../store/authSlice.js';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth.js';

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logoutAccount() // logging out in backend
        .then(() => {
            dispatch(logout()) // logging out in redux state
        })
    }
    return (
        <button className='inline-block border-4 border-orange px-3 py-2 font-semibold text-lg duration-200 bg-orange text-bold text-white hover:bg-white hover:text-orange rounded-xl' onClick={logoutHandler}>
            Logout
        </button>
    )
}

export default LogoutBtn
