import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice.js';
import { Button, Input, Logo } from './index.js';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth.js';
import { useForm } from 'react-hook-form';


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const signin = async (data) => {
        setError("")
        try {
            // console.log(data)
            const session = await authService.loginAccount(data)
            // console.log(session)
            if(session) {
                const userData = await authService.getCurrentUser();
                // console.log(userData)
                if(userData) {
                    dispatch(login({userData}))
                    // console.log(useSelector((state) => state.userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo classname='w-auto' theme="light"/>
                        </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                            Don&apos;t have any account?&nbsp;
                            <Link
                                to="/signup"
                                className="font-medium text-primary transition-all duration-200 hover:underline"
                            >
                                Sign Up
                            </Link>
                </p>
                {error && <p className='text-red-500 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(signin)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input label="Email" placeholder="Enter your email" type="email" 
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address", 
                            }
                        })}/>
                        <Input label="Password: " type="password" placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}/>
                        <Button type="submit" className="w-full border-orange hover:bg-white" bgColor='bg-orange' textColor='text-black'>
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
