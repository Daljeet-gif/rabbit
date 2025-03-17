import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import register from "./../assets/register.webp"
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/slices/authSlice'
const Register = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const { user, guestId,loading } = useSelector((state) => state.auth)
    const { cart } = useSelector((state) => state.cart)

    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout")

    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user })).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "")
                })
            } else {
                navigate(isCheckoutRedirect ? "/checkout" : "/")
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault(); console.log("User Registered", { name, email, password });
        dispatch(registerUser({ name, email, password }))
    }
    return (
        <div className='flex'>
            <div className='w-full md:w-1/2 flex-col justify-center items-center p-8 md:p-12'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm '>
                    <div className='flex justify-center'>
                        <h2 className='text-xl font-medium'>Rabbit</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6'>Hey there!</h2>
                    <p className='text-center mb-6'>
                        Enter your email and password to Register
                    </p>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Name</label>
                        <input
                            className='w-full p-2 border rounded'
                            type='name'
                            value={name}
                            placeholder='Enter your name '
                            onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Email</label>
                        <input
                            className='w-full p-2 border rounded'
                            type='email'
                            value={email}
                            placeholder='Enter your email address'
                            onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Password</label>
                        <input
                            className='w-full p-2 border rounded'
                            type='password'
                            value={password}
                            placeholder='Enter your password'
                            onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>{loading ? "Loading" : "Sign Up"}</button>

                    <p className='mt-6 text-center text-sm'>
                        Already have an account?

                        <Link className='text-blue-500'to={`/login?redirect=${encodeURIComponent(redirect)}`}> Login</Link>
                    </p>
                </form>
            </div>

            <div className='hidden md:block w-1/2 bg-gray-800'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src={register} alt='Register to Account' className='h-[750px] w-full object-cover'></img></div></div>
        </div>
    )
}

export default Register