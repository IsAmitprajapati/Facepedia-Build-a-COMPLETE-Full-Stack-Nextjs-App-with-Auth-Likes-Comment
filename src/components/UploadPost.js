'use client'
import React, { useRef, useState } from 'react'
import Avatar from './Avatar'
import Divider from './Divider'
import Image from 'next/image'
import toast from 'react-hot-toast'
import axios from 'axios'

const UploadPost = ({ _id, profile_pic,callApi }) => {
    const [data, setData] = useState({
        description: "",
        image: ""
    })
    const inputFileRef = useRef()
    const [loading,setLoading] = useState(false)

    const handleOpenFileExplore = () =>{
        inputFileRef.current.click()
    }

    const handleOnChange = (e) => {
        const { value, name } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadFile = (e)=>{
        const file = e.target.files[0]

        setData((preve)=>{
            return{
                ...preve,
                image : file
            }
        })
    }
    const handleClearUpload = (e)=>{
        setData((preve)=>{
            return{
                ...preve,
                image : ""
            }
        })
    }

    const handlePost = async(e)=>{
        e.preventDefault()

        if(!data.description){
            toast("Please type something....")
            return
        }

        const formData = new FormData()
        formData.set("description",data.description)
        formData.set("image",data.image)
        setLoading(true)
        const response = await axios.post('/api/upload-post',formData)
        setLoading(false)
        toast(response.data.message)
        if(response.data.success){
            setData({
                description: "",
                image: ""
            })
            callApi()
        }


    }

    return (
        <div className='bg-white p-4 rounded'>
            <div className='flex gap-4 items-start'>
                <Avatar
                    imageURL={profile_pic}
                    width={50}
                    height={50}
                    userId={_id}
                />

                <div className='w-full'>
                    <textarea
                        name='description'
                        placeholder='type here...'
                        className='bg-slate-100 px-4 py-2 w-full outline-none rounded resize-none'
                        value={data.description}
                        onChange={handleOnChange}
                    />
                    {
                        data?.image && (
                            <div className='bg-slate-100 border text-center relative py-2 px-4'>
                                <div className='w-5 h-5 text-sm hover:text-red-600 cursor-pointer rounded-full absolute right-0 top-0' onClick={handleClearUpload}>
                                    X
                                </div>
                                {data?.image?.name}
                            </div>
                        )
                    }
                    
                </div>
            </div>



            <Divider />

            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2 cursor-pointer' onClick={handleOpenFileExplore}>
                    <Image
                        src={"/assets/icons/image.svg"}
                        width={20}
                        height={20}
                        alt={'upload'}
                    />
                    <p className='hover:text-blue-700'>Image</p>

                    <input type='file' className='hidden' ref={inputFileRef} onChange={handleUploadFile}/>
                </div>

                <button className='bg-blue-700 px-5 py-1 text-white rounded-full' onClick={handlePost}>Post</button>
            </div>



            {/***loading state */}
            {
                loading && (
                <div className='fixed bg-slate-200 bg-opacity-60 top-0 right-0 left-0 bottom-0 w-full h-full flex justify-center items-center'>
                    <p className='bg-white p-4'>Loading....</p>
                </div>
                )
            }
            
        </div>
    )
}

export default UploadPost
