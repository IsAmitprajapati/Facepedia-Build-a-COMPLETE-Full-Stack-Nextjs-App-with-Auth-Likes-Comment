'use client'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Avatar from '@/components/Avatar'
import handleAddRemoveFriends from '@/helpers/handleAddRemoveFriends'
import { ContextData } from '@/providers/provider'
import toast from 'react-hot-toast'

const FindFriends = () => {
  const [allUser,setAllUser] = useState([])
  const {user, fetchCurrentUserDetails} = useContext(ContextData)

  const fetchAllUser = async()=>{
    const response = await axios.get("/api/all-users")
    const friendList = user?.friends || []
    const removeFriends = response.data.data.filter(userDetails => !friendList.includes(userDetails?._id))
    const removeCurrentUser = removeFriends.filter(userDetails => userDetails?._id !== user?._id) 
    setAllUser(removeCurrentUser)
  }

  useEffect(()=>{
    fetchAllUser()
  },[user])

  const handleAddFriend = async(friendId)=>{
    const response = await handleAddRemoveFriends(friendId)
    fetchCurrentUserDetails()
    fetchAllUser()
    toast(response.message)
  }
  return (
    <div className='container mx-auto p-4'>

        <h3 className='font-semibold text-lg mb-3'>Find <span className='text-orange-500 font-extrabold'>New</span> Friends</h3>
        <div className='flex flex-wrap gap-4'>
          {
              allUser.map((user,index)=>{
                return(
                  <div className='bg-white p-4 flex justify-center flex-col items-center gap-1 min-w-[180px] min-h-[180px]'>
                      <Avatar
                        userId={user?._id}
                        imageURL={user?.profile_pic}
                        width={60}
                        height={60}
                      />
                      <p className='text-lg font-medium capitalize my-0'>{user.firstName} {user.lastName}</p>
                      <p className='text-xs my-0 -mt-2'>{user.occupation}</p>
                      <button className='bg-blue-800 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm mt-2' onClick={()=>handleAddFriend(user?._id)}>Add Friend</button>
                  </div>
                )
              })
          }
        </div>

    </div>
  )
}

export default FindFriends
