'use client'

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ContextData = createContext(null)

export const Provider = ({children}) =>{
    const [user,setData] = useState(null)

    const fetchCurrentUserDetails = async() =>{
        const response = await axios.get("api/current-user")
        setData(response.data.data)
    }

    useEffect(()=>{
        fetchCurrentUserDetails()
    },[])

    return(
        <ContextData.Provider value={{ user, fetchCurrentUserDetails }}>
            { children }
        </ContextData.Provider>
    )
}
