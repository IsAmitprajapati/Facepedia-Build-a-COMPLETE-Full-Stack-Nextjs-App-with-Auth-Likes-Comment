'use client'
import React from 'react'
import Avatar from './Avatar'
import Image from 'next/image'
import Link from 'next/link'

const ProfileCard = ({_id, firstName, lastName, occupation, location, profile_pic, friends = [], profileViews = 0 , profileImpressions = 0  }) => {
  return (
    <div className='p-2'>
      {/**image  */}
        <div className='bg-slate-200 h-16 mb-10'>
            <div className='w-16 h-16 rounded-full bg-white mx-auto translate-y-8 shadow-md'>
                <Avatar
                    userId={_id}
                    imageURL={profile_pic}
                    width={64}
                    height={64}
                />
            </div>
        </div>

        {/**name and occupation */}
        <div className='text-center'>
            <p className='font-bold text-lg'>{firstName +" "+lastName}</p> 
            <p className='text-sm'>{occupation}</p>
        </div>

        <div className='p-[0.5px] bg-slate-200 my-2'></div>

          {/**name and friends */}
         <div className='grid gap-1'>
              <div className='flex items-center gap-3'>
                <Image
                  src={'/assets/icons/location.svg'}
                  width={20}
                  height={20}
                  alt='location'
                />
                <p>{location}</p>
              </div>
              <div  className='flex items-center gap-3'>
                <Image
                  src={'/assets/icons/users.svg'}
                  width={20}
                  height={20}
                  alt='location'
                />
                <p >Friends <span className='text-xs'>({friends.length})</span></p>
              </div>
         </div>


         <div className='p-[0.5px] bg-slate-200 my-2'></div>

        {/****profile views and profile impresss */}
        <div className='grid gap-1'>
            <div className='flex justify-between items-center gap-3'>
                <p>Profile views</p>
                <p>{profileViews}</p>
            </div>

            <div className='flex justify-between items-center gap-3'>
                <p>Profile impressions</p>
                <p>{profileImpressions}</p>
            </div>

        </div>

     
    </div>
  )
}

export default ProfileCard
