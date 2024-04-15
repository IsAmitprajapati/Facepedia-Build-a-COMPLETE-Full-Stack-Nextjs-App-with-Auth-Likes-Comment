import { getUserDetailsFromToken } from "@/helpers/getUserDetailsFromToken";
import { NextResponse } from "next/server";
import connectDB from "@/connectDB/db";

connectDB()
export async function GET(request){
    try {
        const user =  await getUserDetailsFromToken(request)
        
        return NextResponse.json({
            message : "Current user Details",
            data : user
        })
    } catch (error) {
        return NextResponse.json({
            message : error.message || error,
            error : true
        })
    }
}