'use client'

import React, {  useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'

const Login = () => {
  const [data,setData] = useState({
    email : "",
    password : "",
  })
  const [loading,setLoading] = useState(false)
  const router = useRouter()

  const handleOnChange =  (e) =>{
    const {name , value } = e.target

    setData((preve)=>{
      return{
          ...preve,
           [name] : value
      }
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()

    const response = await axios.post('/api/login',data)
    toast(response.data.message)


    if(response.data.success){
      setData({
        email : "",
        password : "",
      })
      router.push("/")
    }
    
  }


  return (
    <section className='container w-full mx-auto p-1 mt-5'>
    <div className='w-full max-w-md bg-white shadow border p-4 mx-auto'>
        <p>Welcome to facepedia!</p>

        <form className='mt-4 grid gap-4' onSubmit={handleSubmit}>
          
          <div className='flex flex-col gap-1'>
                <label htmlFor='email'>Email:</label>
                <input
                  type='email'
                  name="email"
                  id='email'
                  value={data.email}
                  placeholder='enter email'
                  onChange={handleOnChange}
                  disabled={loading}
                  className='bg-slate-100 w-full py-2 px-2 focus:outline-blue-700 rounded'
                />
          </div>


          <div className='flex flex-col gap-1'>
                <label htmlFor='password'>Password:</label>
                <input
                  type='password'
                  name="password"
                  id='password'
                  value={data.password}
                  placeholder='enter password'
                  onChange={handleOnChange}
                  disabled={loading}
                  className='bg-slate-100 w-full py-2 px-2 focus:outline-blue-700 rounded'
                />
          </div>

          <button className='bg-blue-700 hover:bg-blue-800 py-2 px-4 font-semibold text-white rounded'>Login</button>
        </form>

        <div className='my-5'>
          <p>Create new account ? <Link href={'/register'} className='text-blue-700 hover:text-blue-800 hover:underline'>Register</Link></p>
        </div>
    </div>
</section>
  )
}

export default Login
