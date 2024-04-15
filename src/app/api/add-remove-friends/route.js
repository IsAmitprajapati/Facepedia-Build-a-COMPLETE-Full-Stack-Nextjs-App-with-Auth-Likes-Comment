import connectDB from "@/connectDB/db";
import { getUserDetailsFromToken } from "@/helpers/getUserDetailsFromToken";
import userModel from "@/models/userModel";
import { NextResponse } from 'next/server'

connectDB()
export async function POST(request){
    try {
        const user  = await getUserDetailsFromToken(request)

        const { friendId } = await request.json()

        const currentUserFriendList = user.friends || []
        /**add friends */
        if(!currentUserFriendList.includes(friendId)){
             await userModel.updateOne({ _id : user._id },{
                $push : { friends : friendId }
            })


            await userModel.updateOne({ _id : friendId },{
                $push : { friends : user._id?.toString() }
            })

            return NextResponse.json({
                message : "friend added",
                success : true
            })
        }

        //remove friend 
        await userModel.updateOne({ _id : user._id },{
            $pull : { friends : friendId }
        })


        await userModel.updateOne({ _id : friendId },{
            $pull : { friends : user._id?.toString() }
        })

        return NextResponse.json({
            message : "friend remove",
            success : true
        })
    } catch (error) {
        return NextResponse.json({
            message : error.message || error,
            error : true
        })
    }
}