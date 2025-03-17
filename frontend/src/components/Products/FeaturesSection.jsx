import React from 'react'
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi2"
const FeaturesSection = () => {
    return (
        <section className='py-16 px-4 bg-white'>

            <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiShoppingBag className='text-xl'></HiShoppingBag>
                </div>
                <h4 className='tracking-tighter mb-2'>FREE INTERNATIONAL SHIPPING</h4>
                <p className='text-gray-600 tex-sm tracking-tighter'>On all orders over $100.00</p>
            </div>


            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiArrowPathRoundedSquare className='text-xl'></HiArrowPathRoundedSquare>
                </div>
                <h4 className='tracking-tighter mb-2'>45 DAYS RETURN</h4>
                <p className='text-gray-600 tex-sm tracking-tighter'>Money back guarantee</p>
            </div>

            
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiOutlineCreditCard className='text-xl'></HiOutlineCreditCard>
                </div>
                <h4 className='tracking-tighter mb-2'>SECURE CHECKOUT</h4>
                <p className='text-gray-600 tex-sm tracking-tighter'>100% secured checkout process </p>
            </div>


            </div>

        </section>
    )
}

export default FeaturesSection