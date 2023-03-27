import React from "react"
import Link from "next/link"
import { NavBar } from "./components/Navbar"

export const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    )
}
