import userModel from '@/models/userModel'
import  { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import uploadImage from '@/helpers/uploadImage'
import connectDB from '@/connectDB/db'

connectDB()

export async function POST(request){
    try {
        const formData = await request.formData()
        const firstName = formData.get('firstName')
        const lastName = formData.get('lastName')
        const location = formData.get('location')
        const occupation = formData.get('occupation')
        const email  = formData.get('email')
        const password = formData.get('password')
        const profilePic = formData.get('profile_pic')

        //checking email id
        const checkEmailid = await userModel.findOne({ email })
        if(checkEmailid){
            return NextResponse.json({ message  : "Already exits user"})
        }

        //password into hash format
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password , salt)

        //upload profile pic in cloudinary
        let uploadProfilePic = ''
        if(profilePic?.name){
            uploadProfilePic = await uploadImage(profilePic)
        } 
        
        const payload = {
            firstName,
            lastName,
            location,
            occupation,
            email,
            password : hashPassword,
            profile_pic : uploadProfilePic.url,
            profileViews : Math.floor(Math.random() * 1000),  
            profileImpressions : Math.floor(Math.random() * 1000),
        }

        const user  = new userModel(payload)
        const saveUserData = await user.save()

        return NextResponse.json({message : "User created successfully", data : saveUserData, success : true })

    } catch (error) {
        return NextResponse.json({ message : error.message || error })
    }
}