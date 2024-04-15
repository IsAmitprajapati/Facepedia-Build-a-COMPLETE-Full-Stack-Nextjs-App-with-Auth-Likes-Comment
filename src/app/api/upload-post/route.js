import connectDB from '@/connectDB/db'
import { NextResponse } from 'next/server'
import postModel from '@/models/postModel'
import { getUserDetailsFromToken } from '@/helpers/getUserDetailsFromToken'
import uploadImage from '@/helpers/uploadImage'


connectDB()
export async function POST(request){
    try {
        const user = await getUserDetailsFromToken(request)

        if(!user){
            return NextResponse.json({
                message : "Please login",
                error : true
            })
        }

        const formdata = await request.formData()
        const description = formdata.get("description")
        const image = formdata.get("image")

        let postUpload = ''
        if(image){
            postUpload = await uploadImage(image)
        } 

        const payload =  {
            image : postUpload.url,
            description : description,
            userId : user._id
        }

        const post = new postModel(payload)
        const savePost = await post.save()

        return NextResponse.json({
            message : "Upload successfully",
            success : true,
            data : savePost
        })

    } catch (error) {
        return NextResponse.json({ message : error.message || message })
    }   
}