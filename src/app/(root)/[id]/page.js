'use client'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Avatar from '@/components/Avatar'
import { ContextData } from '@/providers/provider'
import PostDisplay from '@/components/PostDisplay'
import handleAddRemoveFriends from '@/helpers/handleAddRemoveFriends'
import Divider from '@/components/Divider'

const UserProfileDetails = ({ params }) => {
    const [data,setData] = useState(null)
    const [friendslist,setFirendsList] = useState([])
    const [postData,setPostData] = useState([])
    const {user, fetchCurrentUserDetails} = useContext(ContextData)
    const [loading,setLoading] = useState(false)
    
    const fetchUserDetails  = async()=>{
      const payload  = {
        userId : params.id
      }
      setLoading(true)
      const response  = await axios.post("/api/user-details",payload)

      setData(response.data.data)
      setFirendsList(response.data.friends)
      setPostData(response.data.post)
      setLoading(false)
    }

    const handleAddFriend = async(friendId)=>{
      const response = await handleAddRemoveFriends(friendId)
      fetchUserDetails()
    }

    useEffect(()=>{
      fetchUserDetails()
    },[])

    const isDisplayAddFriend = user?.friends?.includes(data?._id) || user?._id === data?._id
  return (
    <div className='container mx-auto'>

        <div className='mt-5 grid gap-10 lg:grid-cols-[2fr,1fr] items-start'>
            {/**user information and post */}
            <div className=''>
                {/**user information */}
                <div className='bg-white p-4'>
                      <div className='h-36 bg-slate-200 rounded mb-14'>
                          <div className='bg-white h-36 w-36 rounded-full translate-x-8 translate-y-1/3 p-1 flex justify-center items-center'>
                              <Avatar
                                imageURL={data?.profile_pic}
                                userId={data?._id}
                                width={130}
                                height={130}
                              />
                          </div>
                      </div>
                      <p className='font-bold text-lg lg:text-2xl capitalize'>{data?.firstName} {data?.lastName}</p>
                      <p className='text-base lg:text-lg'>{data?.occupation}</p>

                      {
                        !isDisplayAddFriend && (
                          <button className='bg-blue-800 hover:bg-blue-700 text-white font-semibold px-5 rounded-full my-3 py-2'>Add Friend</button>
                        )
                      }
                </div>

                {/***post */}
                    <div className='w-full'>
                    {
                      postData.map((post,index)=>{
                        return(
                          <PostDisplay data={post} key={post._id} handleAddFriend={handleAddFriend}/>
                        )
                      })
                    }
                  </div> 
            </div>

            {/**friends list */}
            {/*** ads and friend list*/}
         <section className="bg-white rounded p-4 lg:sticky lg:top-20">
              
              <h1 className="font-bold mb-3">Friends List:</h1>
              <div>
                {
                  friendslist.map((friend,index)=>{
                    return(
                      <div key={friend?._id}>
                        <div className="flex items-center gap-3 justify-between">
                          <div className="flex items-center gap-3">
                              <Avatar
                                userId={friend._id}
                                width={40}
                                height={40}
                                imageURL={friend?.profile_pic}
                              />
                              <div>
                                <p className="font-semibold">{friend?.firstName} {friend?.lastName}</p>  
                                <p className="text-xs">{friend.occupation}</p>
                              </div>
                          </div>
                          <button className="border-blue-800 border text-blue-800 rounded-full text-xs px-1 hover:bg-blue-800 hover:text-white py-1" onClick={()=>handleAddFriend(friend._id)}>Unfriend</button>
                        </div>

                        <Divider/>
                      </div>
                    )
                  })
                }
              </div>
  
          </section>


        </div>


        {
          loading && (
            <div className='fixed top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-25 flex justify-center items-center'>
              <p className='bg-white px-6 py-2 text-lg'>Loading...</p>
            </div>
          )
        }
    </div>
  )
}

export default UserProfileDetails
