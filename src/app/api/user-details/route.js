import { NextResponse } from 'next/server'
import connectDB from '@/connectDB/db'
import userModel from '@/models/userModel'
import postModel from '@/models/postModel'

connectDB()

export async function POST(request){
    try {
        const { userId } = await request.json()

        //user
        const user   = await userModel.findOne({ _id : userId})


        //friends
        const friendListId = user.friends || []
        const friendslist = await userModel.find({
            _id : { $in : friendListId }
        })
        const friends =  friendslist.map((userData)=>{
            return{
                _id : userData._id,
                firstName : userData.firstName,
                lastName : userData.lastName,
                occupation : userData.occupation,
                profile_pic : userData.profile_pic
            }
        })

        //post
        const post = await postModel.find({ userId : userId }).populate('userId').sort({ createdAt : -1})

        return NextResponse.json({
            data : user,
            friends : friends,
            post : post,
            message : 'user details',
            success : true
        })
    } catch (error) {
        return NextResponse.json({
            message : error.message || error,
            error : true
        })
    }
}