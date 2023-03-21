import Link from "next/link"

export const Layout = (props) => {
    ;<div className="text-center p-2">
        <Link href={`/register`}>Register</Link>
        <Link href={`/login`}>Login</Link>
        <Link href={`/`}>Home</Link>
    </div>
}
