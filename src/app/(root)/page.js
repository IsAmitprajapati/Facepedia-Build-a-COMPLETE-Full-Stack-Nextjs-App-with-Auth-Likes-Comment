'use client'
import ProfileCard from "@/components/ProfileCard";
import UploadPost from "@/components/UploadPost";
import { ContextData } from "@/providers/provider";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import PostDisplay from "@/components/PostDisplay";
import Avatar from "@/components/Avatar";
import Divider from "@/components/Divider";
import handleAddRemoveFriends from "@/helpers/handleAddRemoveFriends";
import toast from 'react-hot-toast'

export default function Home() {
  const {user, fetchCurrentUserDetails} = useContext(ContextData)
  const [postData,setPostData] = useState([])
  const [friendsList,setFriendsList] = useState([])

  const fetchPost = async()=>{
    const response = await axios.get("/api/post")
    setPostData(response.data.data || [])
  }

  const fetchFriendsList = async()=>{
    const response = await axios.get('/api/friends')
    setFriendsList(response.data.data)
  }

  useEffect(()=>{
    fetchPost()
    fetchFriendsList()
  },[])

  const handleAddFriend = async(friendId)=>{
    const response = await handleAddRemoveFriends(friendId)
    fetchCurrentUserDetails()
    fetchFriendsList()
    toast(response.message)
  }

  return (
   <div className="container mx-auto p-4 lg:grid grid-cols-[280px,1fr,280px] gap-7 h-full items-start">
        {/*** current user profile*/}
        <section className="bg-white rounded p-2 lg:sticky lg:top-20">
          <ProfileCard
            _id={user?._id}
            profile_pic={user?.profile_pic}
            firstName={user?.firstName || ''}
            lastName={user?.lastName || ''}
            location={user?.location || ''}
            occupation={user?.occupation || ''}
            friends = {user?.friends || []}
          />
        </section>


        {/*** upload post and see post*/}
        <section className="rounded mt-5 lg:mt-0">
            <UploadPost
               _id={user?._id}
               profile_pic={user?.profile_pic}
               callApi={fetchPost}
            />

            <div>
                {
                  postData.map((post,index)=>{
                    return(
                      <PostDisplay data={post} key={post._id} handleAddFriend={handleAddFriend}/>
                    )
                  })
                }
            </div>

        </section>


         {/*** ads and friend list*/}
         <section className="bg-white rounded p-4 lg:sticky lg:top-20">
            <h1 className="font-bold mb-3">Friends List:</h1>
            <div>
              {
                friendsList.map((friend,index)=>{
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
  );
}
