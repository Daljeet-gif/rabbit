import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2"
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'
import { IoIosClose } from 'react-icons/io'
import { useSelector } from 'react-redux'
const Navbar = () => {
    const [cartDrawer, setCartDrawer] = useState(false)
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const { cart } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)

    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0

    const toggleNavigation = () => {
        setNavDrawerOpen(!navDrawerOpen)
    }


    const toggleCart = () => {
        setCartDrawer(!cartDrawer)
    }
    return (
        <>

            <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
                <div>
                    <Link to="/" className='text-2xl font-bold'>
                        Rabbit
                    </Link>
                </div>
                <div className='hidden md:flex space-x-6'>
                    <Link to="/collections/all?gender=Men" className='text-gray-700 hover:text-black text-sm font-medium uppercase' >MEN</Link>
                </div>
                <div className='hidden md:flex space-x-6'>
                    <Link to="/collections/all?gender=Women" className='text-gray-700 hover:text-black text-sm font-medium uppercase' >WOMEN</Link>
                </div>
                <div className='hidden md:flex space-x-6'>
                    <Link to="/collections/all?cateogry=Top Wear" className='text-gray-700 hover:text-black text-sm font-medium uppercase' >TOP WEAR</Link>
                </div>
                <div className='hidden md:flex space-x-6'>
                    <Link to="/collections/all?category=Bottom Wear" className='text-gray-700 hover:text-black text-sm font-medium uppercase' >BOTTOM WEAR</Link>
                </div>
                <div className='flex items-center space-x-4'>

                    {user && user.role==="admin" && (                    <Link to="/admin" className='block bg-black px-2 rounded  text-sm text-white'>Admin</Link>)}

                    <Link to="/profile" className='hover:text-black'>
                        <HiOutlineUser className='h-6 w-6  text-gray-700' />
                    </Link>
                    <button onClick={toggleCart} className='relative hover:text-black'>
                        <HiOutlineShoppingBag className='h-6 w-6 text-gray-700'></HiOutlineShoppingBag>
                        <span className='absolute  -top-1 -right-1 text-white text-xs rounded-full px-2 py-0.5'>{cartItemCount > 0 && <span className='absolute -top-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5'>{cartItemCount}</span>}</span>
                    </button>

                    <div className='overflow-hidden'>
                        <SearchBar></SearchBar>
                    </div>
                    <button onClick={toggleNavigation} className='md:hidden'>
                        <HiBars3BottomRight className='h-6 w-6 text-gray-700'></HiBars3BottomRight>
                    </button>
                </div>

            </nav>
            <CartDrawer cartDrawer={cartDrawer} toggleCart={toggleCart} ></CartDrawer>


            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50  ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className='flex justify-end p-4'>

                    <button onClick={toggleNavigation}>
                        <IoIosClose className='h-6 w-6 text-gray-600'></IoIosClose>
                    </button>
                </div>
                <div className='p-4'>
                    <h2 className='text-xl font-semibold mb-4'>Menu</h2>
                    <nav className='space-y-4 '>
                        <Link to="/collections/all?gender=Men" onClick={toggleNavigation} className='block text-gray-600 hover:text-black' >

                            Men
                        </Link>

                        <Link to="/collections/all?gender=Women" onClick={toggleNavigation} className='block text-gray-600 hover:text-black' >

                            Women
                        </Link>

                        <Link to="/collections/all?cateogry=Top Wear" onClick={toggleNavigation} className='block text-gray-600 hover:text-black' >

                            Top Wear
                        </Link>
                        <Link to="/collections/all?category=Bottom Wear" onClick={toggleNavigation} className='block text-gray-600 hover:text-black' >

                            Bottom Wear
                        </Link>

                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar