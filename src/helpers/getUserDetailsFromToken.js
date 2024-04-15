import connectDB from '@/connectDB/db'
import userModel from '@/models/userModel'
import jwt from 'jsonwebtoken'

connectDB()
export const getUserDetailsFromToken = async(request) =>{
    try {
        const token = request.cookies.get('token')?.value || ''
        if(token){
            const userData = await jwt.verify(token,process.env.SECREAT_KEY_TOKEN)

            const user = await userModel.findOne({ _id : userData.id })
            return user
        }

        return token

    } catch (error) {
        return error
    }
}