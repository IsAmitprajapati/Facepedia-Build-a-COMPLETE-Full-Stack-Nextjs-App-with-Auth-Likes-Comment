import connectDB from '@/connectDB/db'
import postModel from '@/models/postModel'
import { NextResponse } from 'next/server'

connectDB()
export async function GET(){
    try {
        const post = await postModel.find().populate('userId').sort({ createdAt : -1})

        return NextResponse.json({
            data : post,
            message : "post",
            success : true
        })
    } catch (error) {
        return NextResponse.json({
            message : error.message || error,
            error : true
        })
    }
}