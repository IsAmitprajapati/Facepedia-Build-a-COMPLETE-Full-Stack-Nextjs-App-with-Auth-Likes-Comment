import React, { useContext, useEffect, useState } from 'react'
import Avatar from './Avatar'
import Image from 'next/image'
import Divider from './Divider'
import { ContextData } from '@/providers/provider'
import axios from 'axios'

const PostDisplay = ({ data ,handleAddFriend }) => {
    const [likeData,setLikeData] = useState(data?.like || [])
    const [commentData,setCommentData] = useState(data?.comment || [])
    const [openComment,setOpenComment] = useState(false)
    const [comment,setComment] = useState('')

    const {user, fetchCurrentUserDetails} = useContext(ContextData)


    const handleLikePost = async()=>{
        const payload = {
            _id : data?._id
        }
        const response = await axios.post('/api/post/like',payload)

        setLikeData(response.data.data)
    }


    const handleOpenCloseComment = () =>{
        setOpenComment(preve => !preve)
    }

    const fetchCommentData = async() =>{
        const payload  = {
            postId : data?._id
        }
        const response = await axios.post("api/post/get-comment-for-post",payload)

        setCommentData(response.data.data.comment || [])
    }

    useEffect(()=>{
        if(openComment){
            fetchCommentData()
        }
    },[openComment])


    const handleuploadComment = async() =>{
        const payload = {
            description : comment,
            postId : data?._id
        }
        if(comment){
            const response  = await axios.post("api/post/comment",payload)
            setComment('')
            fetchCommentData()
        }
        
    }
    


    const currentUserLiked = likeData.includes(user?._id)
    const isDisplayAddFriend = user?.friends?.includes(data?.userId?._id) || user?._id === data?.userId?._id
  return (
    <div className='bg-white p-4 my-6'>
        <div className='flex gap-3 items-center justify-between'>
            <div className='flex gap-3 items-center'>
                <Avatar
                    userId={data.userId._id}
                    imageURL={data.userId.profile_pic}
                    width={40}
                    height={40}
                />
                <div>
                    <p className='font-bold'>{data.userId.firstName} {data.userId.lastName}</p>
                    <p className='text-xs'>{data.userId.occupation}</p>
                </div>
            </div>

            {
                !isDisplayAddFriend && (
                    <div className='bg-white shadow-md p-2 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-700' onClick={()=>handleAddFriend(data?.userId?._id)}>
                        <Image
                        src={"/assets/icons/user-plus.svg"}
                        width={20}
                        height={20}
                        alt='add friends'
                        />
                    </div>
                )
            }
           
        </div>

        <p className='py-3'>
            {data.description}
        </p>

        <div className='w-full h-full'>
            {
                data.image && (
                    <Image 
                        src={data.image}
                        width={1000}
                        height={1000}
                        alt='post'
                    />
                )
            }
        </div>


        <div className='text-sm flex items-center justify-between mt-3'>
             {/**like count */}
            <div>
                {likeData.length  === 0 ? "You're first to like" : likeData.length + " Likes"  }
            </div>

            {/**comment count */}
            <div>
                {commentData.length} comment
            </div>

        </div>

        <div className='p-[0.5px] bg-slate-200'></div>

        
        <div className='py-1 flex justify-between gap-3'>
             {/**like */}
             <div className='flex items-center gap-1 cursor-pointer' onClick={handleLikePost}>
                {
                    currentUserLiked ? (
                        <Image
                            src={'/assets/icons/liked.svg'}
                            width={20}
                            height={20}
                            alt='like' 
                        />
                    ) : (
                        <Image
                        src={'/assets/icons/like.svg'}
                        width={20}
                        height={20}
                        alt='like' 
                        />
                    )
                }
                
                <p  className={currentUserLiked && 'text-blue-800 font-semibold'}>Like</p>
             </div>


              {/**comment */}
              <div className='flex items-center gap-1 cursor-pointer hover:text-blue-700' onClick={handleOpenCloseComment}>
                    <Image
                        src={'/assets/icons/comment.svg'}
                        width={20}
                        height={20}
                        alt='comment' 
                    />
                    <p>Comment</p>  
              </div>


            {/**share */}
            <div>
                <div className='flex items-center gap-1 cursor-pointer'>
                        <Image
                            src={'/assets/icons/share.svg'}
                            width={20}
                            height={20}
                            alt='share' 
                        />
                        <p>Share</p>  
                </div>
            </div>
        </div>


        {/****display all the comment */}
        {
            openComment && (
                <div className='p-4 bg-white w-full'>
                     <div className='flex items-center gap-4 w-full'>
                        <Avatar
                            userId={user._id}
                            imageURL={user.profile_pic}
                            width={40}
                            height={40}
                            alt={user.firstName}
                        />
                        <div className='w-full flex gap-1'>
                            <input 
                                type='text' 
                                placeholder='type comment here...' 
                                className='bg-slate-100 rounded-full px-4 py-2 w-full outline-none' 
                                onChange={(e)=>setComment(e.target.value)}
                                value={comment}
                            />
                            <button className='bg-blue-700 text-white text-sm px-3 py-1 rounded-full' onClick={handleuploadComment}>Send</button>
                        </div>
                    </div>


                    {/**list of comment */}
                    <div className='mt-3'>
                        {
                            commentData.map((comment,index)=>{
                                return(
                                    <div className='ml-5 p-2 border-b' key={comment?._id}>
                                        <div className='flex gap-3 items-center'>
                                            <Avatar
                                                userId={comment?.userId?._id}
                                                imageURL={comment?.userId?.profile_pic}
                                                width={30}
                                                height={30}
                                                alt={comment?.userId?.firstName}
                                            />
                                            <div className='flex flex-col'>
                                                <p className='font-semibold text-sm'>{comment?.userId?.firstName} {comment?.userId?.lastName}</p>
                                                <p className='text-xs -mt-1'>{comment?.userId?.occupation}</p>
                                            </div>
                                        </div> 
                                        <div className='text-sm py-1 px-2'>
                                            {comment.description}
                                        </div>   
                                    </div>
                                )
                            })
                        }
                    </div>

                    
                </div>
            )
        }
    </div>
  )
}

export default PostDisplay
