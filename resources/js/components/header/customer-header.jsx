import { Link } from '@inertiajs/react'

export default function CustomerHeader() {
    return (
        <header className="border-bottom border border-gray-200 px-10 py-3">
            <h1 className="container m-auto text-center text-3xl font-extrabold md:text-start">
                <Link href={route('customer.home')}>Brand</Link>
            </h1>
        </header>
    )
}
