import Link from "next/link"

export default function NotFound() {
    return (
        <div>
            <div className="font-mono text-4xl">
                <div>404</div>
                <h1>Sorry, page not found</h1>
            </div>

            <div className="mt-10">
                <Link href='/' className="link">Get back home</Link>
            </div>
        </div>
    )
}