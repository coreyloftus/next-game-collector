import Link from "next/link"
import { useState, useEffect } from "react"
import { getAuth } from "firebase/auth"

export const NavBar = (props) => {
    const [userEmail, setUserEmail] = useState("")

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("Logged in as:", user.email)
                setUserEmail(user.email)
            } else {
                setUserEmail(null)
                console.log("Not logged in")
            }
        })
        return unsubscribe
    }, [])

    return (
        <div className="p-2 dark:bg-gray-700 bg-slate-400">
            <div className="flex justify-between">
                <div>
                    <Link href={`/`}>Logo</Link>
                </div>
                <div className="flex">
                    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                        <Link href={`/register`}>Register</Link>
                    </button>
                    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                        <Link href={`/login`}>Login</Link>
                    </button>
                    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                        <Link href={`/`}>{userEmail}</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
