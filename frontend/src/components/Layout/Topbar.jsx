import React from 'react'
import {TbBrandMeta} from "react-icons/tb"
import {IoLogoInstagram} from "react-icons/io"
import {RiTwitterXLine} from "react-icons/ri"
const Topbar = () => {
  return (
    <div className='bg-[#ea2e0e] text-white'>
        <div className='container mx-auto flex item-center py-3 px-4  justify-between'>

            <div className=' hidden md:flex items-center space-x-4'>
                <a href='#' className='hover:text-gray-300'>
                    <TbBrandMeta className='h-5 w-5'></TbBrandMeta>
                </a>
                <a href='#' className='hover:text-gray-300'>
                    <IoLogoInstagram className='h-5 w-5'></IoLogoInstagram>
                </a>
                <a href='#' className='hover:text-gray-300'>
                    <RiTwitterXLine className='h-4 w-4'></RiTwitterXLine>
                </a>
            </div>
            <div className='text-sm text-center flex-grow'>
                <span>We Ship worldwide -Fast and reliable shipping!</span>
            </div>
            <div className='text-sm hidden md:block'>
                <a href='lel:+123445677'  className='hover:text-gray-300'>
                    +1 (223) 323 3242
                </a>
            </div>
        </div>
    </div>
  )
}

export default Topbar