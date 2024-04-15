import { NextResponse } from 'next/server'
import connectDB from '@/connectDB/db'
import { getUserDetailsFromToken } from '@/helpers/getUserDetailsFromToken'
import userModel from '@/models/userModel'


connectDB()
export async function GET(request){
    try {
        const user = await getUserDetailsFromToken(request)

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

        return NextResponse.json({
            message : 'friend list',
            data :friends,
            success :true
        })

    } catch (error) {
        return NextResponse.json({
            message : error.message || error,
            error : true
        })
    }
}