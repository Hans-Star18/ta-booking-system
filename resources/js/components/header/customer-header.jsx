import { Link } from '@inertiajs/react'

export default function CustomerHeader({ hotel }) {
    return (
        <header className="border-bottom border border-gray-200 px-10 py-3">
            <h1 className="container m-auto text-center text-3xl font-extrabold md:max-w-7xl md:text-start">
                <Link
                    href={route('customer.reservation.index', {
                        hotel: hotel.uuid,
                    })}
                >
                    {hotel.name}
                </Link>
            </h1>
        </header>
    )
}
