import connectDB from '@/connectDB/db'
import { getUserDetailsFromToken } from '@/helpers/getUserDetailsFromToken'
import postModel from '@/models/postModel'
import { NextResponse } from 'next/server'

connectDB()
export async function POST(request){
    try {
        const user = await getUserDetailsFromToken(request)

        const { _id } = await request.json()

        const post = await postModel.findOne({ _id : _id })

        /*checkin user id is availabe in like array*/
        if(post.like.includes(user.id)){
            const updatePost = await postModel.updateOne({ _id : _id },{
               $pull : { like : user._id}
            })

            const postData = await postModel.findOne({ _id : _id })
            return NextResponse.json({
                message : "Like",
                data : postData.like,
                success : true
            })
        }

        const updataPost = await postModel.updateOne({ _id : _id },{
            $push : { like : user._id}
         })

        const postData = await postModel.findOne({ _id : _id })

        return NextResponse.json({
            message : 'Liked',
            data : postData.like,
            success : true
        })

    } catch (error) {
        return NextResponse.json({
            message  : error.message || error,
            error : true
        })
    }
}