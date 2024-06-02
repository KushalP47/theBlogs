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
        <button className='inline-block px-6 py-4 text-lg duration-200 text-bold text-orange hover:text-white rounded-full' onClick={logoutHandler}>
            Logout
        </button>
    )
}

export default LogoutBtn
