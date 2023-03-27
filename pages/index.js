import React from "react"
import { useEffect } from "react"
import { useRouter } from "next/router"

const index = () => {
    // pushes user to Login page if they are not logged in
    const router = useRouter()
    useEffect(() => {
        let token = sessionStorage.getItem("Token")
        if (token) {
            getData()
        }
        if (!token) {
            router.push("/login")
        }
    }, [])
    return <div>index</div>
}

export default index
