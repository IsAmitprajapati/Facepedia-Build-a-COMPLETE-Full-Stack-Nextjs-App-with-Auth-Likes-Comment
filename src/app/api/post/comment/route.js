import connectDB from '@/connectDB/db'
import { getUserDetailsFromToken } from '@/helpers/getUserDetailsFromToken'
import postModel from '@/models/postModel'
import { NextResponse } from 'next/server'

connectDB()


/***save commment */
export async function POST(request){
    try {
        const user  = await getUserDetailsFromToken(request)

        if(!user){
            return NextResponse.json({
                message : "Please login",
                error : true
            })
        }

        const { description , postId } = await request.json()

        const payload  = {
            description :  description,
            userId : user._id
        }

        const commentPost = await postModel.updateOne({ _id : postId},{
            $push : { comment : payload }
        })

        const commentList = await postModel.find({ _id : postId}).populate({
            path : 'comment',
            populate : {
                path : 'userId'
            }
        })

        return NextResponse.json({
            message : "Comment",
            data : commentList,
            success : true
        })

    } catch (error) {
        return NextResponse.json({
            message : error.message || error,
            error : true
        })
    }
}
