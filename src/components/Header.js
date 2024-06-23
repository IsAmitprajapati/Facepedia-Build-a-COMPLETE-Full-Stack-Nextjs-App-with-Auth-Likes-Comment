'use client'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { headerNavLink } from '@/contants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { ContextData } from '@/providers/provider'
import Avatar from './Avatar'

const Header = () => {
    const path = usePathname()
    const router = useRouter()
    const [openUserMenu,setOpenUserMenu] = useState(false)
    const {user, fetchCurrentUserDetails} = useContext(ContextData)

    const handleOpenClose = ()=>{
        setOpenUserMenu((preve) => !preve)
    }

    const handleUserLogout = async()=>{
        const response = await axios.get('/api/logout')
        setOpenUserMenu(false)
        toast(response?.data.message)
        router.push("/login")
    }

  return (
    <header className='h-16 bg-white sticky z-40 shadow top-0'>
        <div className='container mx-auto h-full flex items-center px-4 justify-between'>
                <div className='grid grid-cols-[170px,1fr] items-center'>
                    <Link href={"/"}>
                        <Image 
                            src={'/assets/logo.png'}
                            width={150}
                            height={64}
                            alt='logo'
                        />
                    </Link>

                    {/**seach input */}
                    <div className='w-full items-center gap-2 border bg-slate-100 px-1 rounded hidden lg:flex'>
                        <input 
                            type='text' 
                            placeholder='search here...'
                            className='w-full  max-w-52 bg-slate-100 py-1 px-2 outline-none'
                        />
                        <Image 
                            src={'/assets/icons/search.svg'}
                            width={20}
                            height={20}
                            alt='search'
                        />
                    </div>
                </div>

                <div className='flex items-center gap-10 h-full '>
                    {/**navbar */}
                    <nav className='hidden lg:flex items-center gap-4 h-full'>
                        {
                            headerNavLink.map((navlink)=>{ 
                                const isActive = path === navlink.route
                                return(
                                    <Link 
                                        href={navlink.route}
                                        className={`flex flex-col justify-center items-center gap-1 h-full px-4 ${isActive && 'bg-slate-100'}`}
                                    >
                                        <Image 
                                            src={navlink.iconUrl}
                                            width={20}
                                            height={20}
                                            alt={navlink.label}
                                        />
                                        <p className='text-sm'>{navlink.label}</p>
                                    </Link>
                                )
                            })
                        }
                    </nav>

                    <div>
                        {/**current user login image */}
                        <div className='flex flex-col justify-center items-center cursor-pointer relative'>
                            <div onClick={handleOpenClose} className='flex flex-col justify-center items-center'>
                                
                                <Avatar
                                    userId={user?._id}
                                    imageURL={user?.profile_pic}
                                    width={28}
                                    height={28}
                                    disable={true}
                                    
                                />
                                <p className='text-sm'>Me</p>
                            </div>
                            
                            {/**user menu  */}
                            {
                                openUserMenu && (
                                    <div className='shadow absolute top-14 right-0 min-w-60 p-4 rounded bg-white'>
                                        <div className='font-semibold text-center flex flex-col justify-center items-center'>
                                            
                                        <Avatar
                                            userId={user?._id}
                                            imageURL={user?.profile_pic}
                                            width={45}
                                            height={45}
                                            extraWidth={20}
                                            extraHeight={20}
                                        />
                                        <p className='text-lg'>
                                            { user?.firstName +" " + user?.lastName}
                                        </p>
                                        <p className='text-sm'>
                                            {user?.occupation}
                                        </p>
                                        </div>

                                        <div className='p-[0.5px] my-1 bg-slate-200'></div>

                                        {/**mobile responsive */}
                                        <nav className='flex lg:hidden justify-center flex-col gap-2 h-full'>
                                            {
                                                headerNavLink.map((navlink)=>{ 
                                                    const isActive = path === navlink.route
                                                    return(
                                                        <Link 
                                                            href={navlink.route}
                                                            className={`flex flex-row gap-2 h-full px-4 py-3 ${isActive && 'bg-slate-100'}`}
                                                            onClick={handleOpenClose}
                                                        >
                                                            <Image 
                                                                src={navlink.iconUrl}
                                                                width={20}
                                                                height={20}
                                                                alt={navlink.label}
                                                            />
                                                            <p className='text-sm'>{navlink.label}</p>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </nav>

                                        <button className=' bg-red-600  text-white rounded hover:bg-red-700  w-full py-1' onClick={handleUserLogout}>Logout</button>
                                    </div>
                                )
                            }
                            
                        </div>
                    </div>
                </div>

        </div>
    </header>
  )
}

export default Header
