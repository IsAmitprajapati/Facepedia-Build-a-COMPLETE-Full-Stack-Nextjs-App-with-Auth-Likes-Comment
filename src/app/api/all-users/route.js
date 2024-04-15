import { NextResponse } from "next/server";
import connectDB from "@/connectDB/db";
import userModel from "@/models/userModel";

connectDB()
export async function GET(){
   try {
        const users = await userModel.find()

        const usersDetailsList = users.map(user =>{
            return {
                _id : user._id,
                firstName : user.firstName,
                lastName : user.lastName,
                occupation : user.occupation,
                profile_pic : user.profile_pic
            }
        })

        return NextResponse.json({
            message : "all users",
            data : usersDetailsList,
            success : true
        })
   } catch (error) {
     return NextResponse.json({
        message : error.message || error,
        error : true
     })
   } 
}