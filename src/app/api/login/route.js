import userModel from '@/models/userModel'
import  { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import connectDB from '@/connectDB/db'

connectDB() 

export async function POST(request){
    try {
        const { email , password } = await request.json()

        const user = await userModel.findOne({ email })

        if(!user){
            return NextResponse.json({message : "user not exit!"},{status : 400})
        }

        const checkPassword = await bcryptjs.compare(password,user.password)

        if(!checkPassword){
            return NextResponse.json({ message : "Check your password"})
        }

        const tokenData = {
            id : user._id,
            email : user.email
        }

        const token = await jwt.sign(tokenData,process.env.SECREAT_KEY_TOKEN,{ expiresIn : 60 * 60 * 8})

        const response =  NextResponse.json({
            token : token,
            message : "Login successfully",
            success : true
        })

        const cookiesOption = {
            httpOnly : true,
            secure : true,
        }

        response.cookies.set("token",token,cookiesOption)
        
        return response
 
    } catch (error) {
       return NextResponse.json({ message : error.message || error })
    }
}