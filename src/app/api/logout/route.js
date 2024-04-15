import { NextResponse } from 'next/server'

export async function GET(){
    try {
        const response = NextResponse.json({
            message : "Logout successfull",
            success : true
        })

        const cookiesOption = {
            httpOnly : true,
            secure : true,
        }

        response.cookies.set('token','',cookiesOption)

        return response
    } catch (error) {
        return NextResponse.json({
            message : error.message || error,
            error : true
        })
    }
}